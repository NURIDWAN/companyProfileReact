import AppLayout from "@/layouts/app-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { RichTextEditor } from "@/components/RichTextEditor";
import { IconPicker } from "@/components/ui/IconPicker";
import InputError from "@/components/input-error";
import { FormEventHandler, useMemo, useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";

type PagePayload = {
    id: number;
    parent_id?: number | null;
    title: string;
    slug: string;
    status: string;
    meta_title?: string | null;
    meta_description?: string | null;
    meta_keywords?: string[] | null;
    published_at?: string | null;
    display_order?: number | null;
    sections?: SectionPayload[];
};

type ParentOption = {
    id: number;
    title: string;
};

type SectionPayload = {
    id?: number;
    title: string;
    slug?: string;
    content?: string | null;
    display_order?: number;
    is_active?: boolean;
    type?: string | null;
    data?: Record<string, any>;
};

interface Props {
    page?: PagePayload;
    parents?: ParentOption[];
}

function slugify(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

export default function PageForm({ page, parents = [] }: Props) {
    const title = page ? "Edit Halaman" : "Tambah Halaman";

    const inferType = (section: SectionPayload): string => {
        const slug = (section.slug ?? "").toLowerCase();
        const name = (section.title ?? "").toLowerCase();

        // Home
        if (slug === 'hero' || slug === 'hero_home') return 'hero_home';
        if (slug.includes('about') && slug.includes('summary')) return 'about_intro';
        if (slug.includes('service') && slug.includes('highlight')) return 'service_overview';
        if (slug.includes('why') && slug.includes('us')) return 'why_us';
        if (slug.includes('testimonial')) return 'testimonials_home';
        if (slug.includes('metric')) return 'metrics_home';
        if (slug.includes('blog') && slug.includes('preview')) return 'blog_preview';
        if (slug.includes('cta') && slug.includes('home')) return 'cta_home';

        // About
        if (slug === 'overview' || slug === 'about_overview') return 'about_overview';
        if (slug.includes('visi') || slug.includes('misi')) return 'about_vision';
        if (slug.includes('value') || slug.includes('nilai')) return 'about_values';
        if (slug.includes('stat')) return 'about_statistics';
        if (slug.includes('team') || slug.includes('tim')) return 'about_team';
        if (slug.includes('cta') && slug.includes('about')) return 'about_cta';

        // Service
        if (slug.includes('hero') && slug.includes('service')) return 'service_hero';
        if (slug === 'summary' || slug === 'service_summary') return 'service_summary';
        if (slug === 'offerings' || slug === 'service_offerings') return 'service_offerings';
        if (slug === 'tech-stack' || slug === 'service_tech_stack') return 'service_tech_stack';
        if (slug === 'process' || slug === 'service_process') return 'service_process';
        if (slug === 'advantages' || slug === 'service_advantages') return 'service_advantages';
        if (slug === 'faq' || slug === 'service_faqs') return 'service_faqs';



        return "plain";
    };
    const parseContent = (content?: string | null) => {
        if (!content) return { type: "plain", data: {}, raw: "" };
        try {
            const parsed = JSON.parse(content);
            if (parsed && typeof parsed === "object" && parsed.__type) {
                const { __type, ...rest } = parsed;
                return { type: __type as string, data: rest, raw: content };
            }
            return { type: "plain", data: {}, raw: content };
        } catch {
            return { type: "plain", data: {}, raw: content };
        }
    };

    const serializeContent = (section: SectionPayload) => {
        if (section.type && section.type !== "plain") {
            const cleaned = { ...(section.data ?? {}) };
            delete (cleaned as any).__type;
            return JSON.stringify({ __type: section.type, ...cleaned });
        }
        return section.content ?? "";
    };

    const sectionTypes = [
        { value: "plain", label: "Konten Biasa (HTML)" },

        // Home
        { value: "hero_home", label: "Home - Hero" },
        { value: "about_intro", label: "Home - About Summary" },
        { value: "service_overview", label: "Home - Service Highlight" },
        { value: "why_us", label: "Home - Why Choose Us" },
        { value: "testimonials_home", label: "Home - Testimonials" },
        { value: "metrics_home", label: "Home - Metrics/Stats" },
        { value: "blog_preview", label: "Home - Blog Preview" },
        { value: "cta_home", label: "Home - CTA" },

        // About
        { value: "about_overview", label: "About - Overview" },
        { value: "about_vision", label: "About - Visi & Misi" },
        { value: "about_values", label: "About - Values" },
        { value: "about_statistics", label: "About - Stats" },
        { value: "about_team", label: "About - Team" },
        { value: "about_cta", label: "About - CTA" },

        // Service
        { value: "service_hero", label: "Service - Hero" },
        { value: "service_summary", label: "Service - Summary" },
        { value: "service_offerings", label: "Service - Offerings" },
        { value: "service_tech_stack", label: "Service - Tech Stack" },
        { value: "service_process", label: "Service - Process" },
        { value: "service_advantages", label: "Service - Advantages" },
        { value: "service_faqs", label: "Service - FAQ" },


    ];

    const form = useForm({
        parent_id: page?.parent_id ?? null,
        title: page?.title ?? "",
        slug: page?.slug ?? "",
        meta_title: page?.meta_title ?? "",
        meta_description: page?.meta_description ?? "",
        meta_keywords: page?.meta_keywords?.join(", ") ?? "",
        is_published: page?.status === "published",
        published_at: page?.published_at?.slice(0, 16) ?? "",
        display_order: page?.display_order ?? 0,
        sections: page?.sections?.map((section) => ({
            id: section.id,
            title: section.title,
            slug: section.slug,
            content: section.content ?? "",
            display_order: section.display_order ?? 0,
            is_active: section.is_active ?? true,
            type: parseContent(section.content).type || inferType(section),
            data: parseContent(section.content).data,
        })) ?? [],
    });

    const [slugEdited, setSlugEdited] = useState(!!page?.slug);
    const { data, setData, processing, errors } = form;

    const action = useMemo(() => {
        return page ? route("admin.pages.update", page.id) : route("admin.pages.store");
    }, [page]);

    const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        form.transform((payload) => {
            const transformed = { ...payload };
            const sections = (payload.sections ?? []).map((section) => ({
                ...section,
                content: serializeContent(section),
            }));
            return page ? { ...transformed, sections, _method: "put" } : { ...transformed, sections };
        });

        form.post(action, {
            preserveScroll: true,
        });
    };

    const handleTitleChange = (value: string) => {
        setData("title", value);
        if (!slugEdited) {
            setData("slug", slugify(value));
        }
    };

    return (
        <AppLayout>
            <Head title={title} />
            <div className="space-y-6 p-4">
                <div className="mb-2">
                    <Link href={route("admin.pages.index")} className="text-sm text-muted-foreground hover:text-foreground">
                        &larr; Kembali ke daftar halaman
                    </Link>
                </div>
                <form onSubmit={onSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>{title}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Kelola konten statis seperti Tentang, Kebijakan Privasi, atau halaman informatif lain.
                            </p>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-3 md:col-span-2">
                                <Label htmlFor="title">Judul</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => handleTitleChange(e.target.value)}
                                    placeholder="Contoh: Kebijakan Privasi"
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="slug">Slug URL</Label>
                                <Input
                                    id="slug"
                                    value={data.slug}
                                    onChange={(e) => {
                                        setSlugEdited(true);
                                        setData("slug", slugify(e.target.value));
                                    }}
                                    placeholder="kebijakan-privasi"
                                />
                                <InputError message={errors.slug} />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="parent">Halaman Induk</Label>
                                <select
                                    id="parent"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    value={data.parent_id ?? ""}
                                    onChange={(e) => setData("parent_id", e.target.value === "" ? "" : Number(e.target.value))}
                                >
                                    <option value="">(Tidak ada)</option>
                                    {parents.map((parent) => (
                                        <option key={parent.id} value={parent.id}>
                                            {parent.title}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.parent_id} />
                            </div>

                            <div className="grid gap-3">
                                <Label>Status</Label>
                                <div className="flex items-center gap-2 rounded-md border border-input bg-muted/40 px-3 py-2">
                                    <Checkbox
                                        id="is_published"
                                        checked={!!data.is_published}
                                        onCheckedChange={(checked) => setData("is_published", !!checked)}
                                    />
                                    <label htmlFor="is_published" className="text-sm leading-none">
                                        Terbitkan halaman
                                    </label>
                                </div>
                                <InputError message={errors.status} />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="published_at">Tanggal Publish (opsional)</Label>
                                <Input
                                    id="published_at"
                                    type="datetime-local"
                                    value={data.published_at ?? ""}
                                    onChange={(e) => setData("published_at", e.target.value)}
                                />
                                <InputError message={errors.published_at} />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="display_order">Urutan</Label>
                                <Input
                                    id="display_order"
                                    type="number"
                                    value={data.display_order}
                                    onChange={(e) => setData("display_order", Number(e.target.value))}
                                    min={0}
                                />
                                <InputError message={errors.display_order} />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="meta_title">Meta Title</Label>
                                <Input
                                    id="meta_title"
                                    value={data.meta_title}
                                    onChange={(e) => setData("meta_title", e.target.value)}
                                    placeholder="Judul SEO (opsional)"
                                />
                                <InputError message={errors.meta_title} />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="meta_description">Meta Description</Label>
                                <Textarea
                                    id="meta_description"
                                    value={data.meta_description}
                                    onChange={(e) => setData("meta_description", e.target.value)}
                                    placeholder="Deskripsi singkat untuk mesin pencari"
                                />
                                <InputError message={errors.meta_description} />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="meta_keywords">Meta Keywords</Label>
                                <Input
                                    id="meta_keywords"
                                    value={data.meta_keywords}
                                    onChange={(e) => setData("meta_keywords", e.target.value)}
                                    placeholder="pisahkan dengan koma, contoh: sekolah, pendidikan, kurikulum"
                                />
                                <InputError message={errors.meta_keywords} />
                            </div>

                            {/* Sections */}
                            <div className="md:col-span-2">
                                <div className="mb-2 flex items-center justify-between">
                                    <div>
                                        <Label>Sections (Anchor)</Label>
                                        <p className="text-xs text-muted-foreground">Tambahkan section yang akan menjadi anchor di halaman ini.</p>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            setData("sections", [
                                                ...(data.sections ?? []),
                                                {
                                                    title: "",
                                                    slug: "",
                                                    content: "",
                                                    display_order: (data.sections?.length ?? 0),
                                                    is_active: true,
                                                    type: "plain",
                                                    data: {},
                                                },
                                            ])
                                        }
                                    >
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Tambah Section
                                    </Button>
                                </div>
                                <div className="space-y-3">
                                    {(data.sections ?? []).map((section, index) => (
                                        <div key={section.id ?? index} className="rounded-md border border-input bg-muted/30 p-3">
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="flex items-center gap-2">
                                                    <Checkbox
                                                        checked={!!section.is_active}
                                                        onCheckedChange={(checked) => {
                                                            const updated = [...(data.sections ?? [])];
                                                            updated[index] = { ...section, is_active: !!checked };
                                                            setData("sections", updated);
                                                        }}
                                                    />
                                                    <Input
                                                        value={section.title}
                                                        onChange={(e) => {
                                                            const updated = [...(data.sections ?? [])];
                                                            updated[index] = { ...section, title: e.target.value };
                                                            setData("sections", updated);
                                                        }}
                                                        placeholder="Judul section"
                                                        className="h-9 w-48"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div className="flex rounded-md border border-input bg-background">
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                            disabled={index === 0}
                                                            onClick={() => {
                                                                const updated = [...(data.sections ?? [])];
                                                                if (index === 0) return;
                                                                [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
                                                                const normalized = updated.map((s, idx) => ({ ...s, display_order: idx }));
                                                                setData("sections", normalized);
                                                            }}
                                                        >
                                                            ↑
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                            disabled={index === (data.sections?.length ?? 1) - 1}
                                                            onClick={() => {
                                                                const updated = [...(data.sections ?? [])];
                                                                if (index === updated.length - 1) return;
                                                                [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
                                                                const normalized = updated.map((s, idx) => ({ ...s, display_order: idx }));
                                                                setData("sections", normalized);
                                                            }}
                                                        >
                                                            ↓
                                                        </Button>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => {
                                                            const updated = [...(data.sections ?? [])];
                                                            updated.splice(index, 1);
                                                            const normalized = updated.map((s, idx) => ({ ...s, display_order: idx }));
                                                            setData("sections", normalized);
                                                        }}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="mt-2 grid gap-2 md:grid-cols-2">
                                                <div className="space-y-1">
                                                    <Label className="text-xs">Slug (anchor)</Label>
                                                    <Input
                                                        value={section.slug ?? ""}
                                                        onChange={(e) => {
                                                            const updated = [...(data.sections ?? [])];
                                                            updated[index] = { ...section, slug: slugify(e.target.value) };
                                                            setData("sections", updated);
                                                        }}
                                                        placeholder="anchor-section"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label className="text-xs">Urutan</Label>
                                                    <Input
                                                        type="number"
                                                        min={0}
                                                        value={section.display_order ?? 0}
                                                        onChange={(e) => {
                                                            const updated = [...(data.sections ?? [])];
                                                            updated[index] = { ...section, display_order: Number(e.target.value) };
                                                            setData("sections", updated);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-2 space-y-1">
                                                <Label className="text-xs">Tipe Section</Label>
                                                <select
                                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                                    value={section.type ?? "plain"}
                                                    onChange={(e) => {
                                                        const updated = [...(data.sections ?? [])];
                                                        updated[index] = { ...section, type: e.target.value, data: {} };
                                                        setData("sections", updated);
                                                    }}
                                                >
                                                    {sectionTypes.map((opt) => (
                                                        <option key={opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {(() => {
                                                const type = section.type ?? "plain";
                                                const dataSection = section.data ?? {};
                                                const updateData = (payload: Record<string, any>) => {
                                                    const updated = [...(data.sections ?? [])];
                                                    updated[index] = { ...section, data: { ...(section.data ?? {}), ...payload } };
                                                    setData("sections", updated);
                                                };

                                                // --- HOME SECTIONS ---
                                                if (type === "hero_home") {
                                                    return (
                                                        <div className="mt-2 space-y-3">
                                                            <div className="space-y-1">
                                                                <Label className="text-xs">Judul</Label>
                                                                <Input value={dataSection.heading ?? ""} onChange={(e) => updateData({ heading: e.target.value })} />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <Label className="text-xs">Deskripsi</Label>
                                                                <Textarea value={dataSection.description ?? ""} onChange={(e) => updateData({ description: e.target.value })} />
                                                            </div>
                                                            <div className="grid gap-2 md:grid-cols-2">
                                                                <div className="space-y-1">
                                                                    <Label className="text-xs">Label Tombol Utama</Label>
                                                                    <Input value={dataSection.primary_label ?? ""} onChange={(e) => updateData({ primary_label: e.target.value })} />
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <Label className="text-xs">Link Tombol Utama</Label>
                                                                    <Input value={dataSection.primary_link ?? ""} onChange={(e) => updateData({ primary_link: e.target.value })} />
                                                                </div>
                                                            </div>
                                                            <div className="grid gap-2 md:grid-cols-2">
                                                                <div className="space-y-1">
                                                                    <Label className="text-xs">Label Tombol Sekunder</Label>
                                                                    <Input value={dataSection.secondary_label ?? ""} onChange={(e) => updateData({ secondary_label: e.target.value })} />
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <Label className="text-xs">Link Tombol Sekunder</Label>
                                                                    <Input value={dataSection.secondary_link ?? ""} onChange={(e) => updateData({ secondary_link: e.target.value })} />
                                                                </div>
                                                            </div>
                                                            <ImageUpload
                                                                value={dataSection.hero_image ?? null}
                                                                onChange={(url) => updateData({ hero_image: url })}
                                                                label="Gambar Hero"
                                                            />
                                                        </div>
                                                    );
                                                }

                                                if (type === "about_intro" || type === "service_overview") {
                                                    return (
                                                        <div className="mt-2 space-y-3">
                                                            <div className="space-y-1">
                                                                <Label className="text-xs">Judul</Label>
                                                                <Input value={dataSection.heading ?? ""} onChange={(e) => updateData({ heading: e.target.value })} />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <Label className="text-xs">Deskripsi</Label>
                                                                <Textarea value={dataSection.description ?? ""} onChange={(e) => updateData({ description: e.target.value })} />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label className="text-xs">Highlights</Label>
                                                                {(dataSection.highlights ?? []).map((highlight: string, idx: number) => (
                                                                    <div key={idx} className="flex gap-2">
                                                                        <Input
                                                                            value={highlight}
                                                                            onChange={(e) => {
                                                                                const updated = [...(dataSection.highlights ?? [])];
                                                                                updated[idx] = e.target.value;
                                                                                updateData({ highlights: updated });
                                                                            }}
                                                                            placeholder={`Highlight ${idx + 1}`}
                                                                        />
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            onClick={() => {
                                                                                const updated = [...(dataSection.highlights ?? [])];
                                                                                updated.splice(idx, 1);
                                                                                updateData({ highlights: updated });
                                                                            }}
                                                                        >
                                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                                        </Button>
                                                                    </div>
                                                                ))}
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => updateData({ highlights: [...(dataSection.highlights ?? []), ""] })}
                                                                >
                                                                    <PlusCircle className="mr-2 h-3 w-3" /> Tambah Highlight
                                                                </Button>
                                                            </div>
                                                            {type === 'about_intro' && (
                                                                <ImageUpload
                                                                    value={dataSection.image ?? null}
                                                                    onChange={(url) => updateData({ image: url })}
                                                                    label="Gambar"
                                                                />
                                                            )}
                                                        </div>
                                                    );
                                                }

                                                if (type === "cta_home") {
                                                    return (
                                                        <div className="mt-2 space-y-3">
                                                            <div className="space-y-1">
                                                                <Label className="text-xs">Judul</Label>
                                                                <Input value={dataSection.heading ?? ""} onChange={(e) => updateData({ heading: e.target.value })} />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <Label className="text-xs">Deskripsi</Label>
                                                                <Textarea value={dataSection.description ?? ""} onChange={(e) => updateData({ description: e.target.value })} />
                                                            </div>
                                                            <div className="grid gap-2 md:grid-cols-2">
                                                                <div className="space-y-1">
                                                                    <Label className="text-xs">Label Tombol</Label>
                                                                    <Input value={dataSection.button_label ?? ""} onChange={(e) => updateData({ button_label: e.target.value })} />
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <Label className="text-xs">Link Tombol</Label>
                                                                    <Input value={dataSection.button_link ?? ""} onChange={(e) => updateData({ button_link: e.target.value })} placeholder="/contact" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                if (type === "why_us") {
                                                    return (
                                                        <div className="mt-2 space-y-3">
                                                            <div className="grid gap-2 md:grid-cols-2">
                                                                <div className="space-y-1"><Label className="text-xs">Heading</Label><Input value={dataSection.heading ?? ""} onChange={(e) => updateData({ heading: e.target.value })} /></div>
                                                                <div className="space-y-1"><Label className="text-xs">Description</Label><Input value={dataSection.description ?? ""} onChange={(e) => updateData({ description: e.target.value })} /></div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label className="text-xs">Items</Label>
                                                                {(dataSection.items ?? []).map((item: any, idx: number) => (
                                                                    <div key={idx} className="flex flex-col gap-2 rounded-lg border p-3 bg-muted/20">
                                                                        <div className="flex gap-2 items-start">
                                                                            <div className="w-[200px] flex-shrink-0">
                                                                                <Label className="text-[10px] text-muted-foreground mb-1 block">Icon</Label>
                                                                                <IconPicker
                                                                                    value={item.icon ?? ""}
                                                                                    onChange={(val) => {
                                                                                        const updated = [...(dataSection.items ?? [])];
                                                                                        updated[idx] = { ...item, icon: val };
                                                                                        updateData({ items: updated });
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                            <div className="flex-1 space-y-2">
                                                                                <div>
                                                                                    <Label className="text-[10px] text-muted-foreground mb-1 block">Judul</Label>
                                                                                    <Input
                                                                                        value={item.title ?? ""}
                                                                                        onChange={(e) => {
                                                                                            const updated = [...(dataSection.items ?? [])];
                                                                                            updated[idx] = { ...item, title: e.target.value };
                                                                                            updateData({ items: updated });
                                                                                        }}
                                                                                        placeholder="Judul Feature"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <Button
                                                                                type="button"
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                className="mt-6"
                                                                                onClick={() => {
                                                                                    const updated = [...(dataSection.items ?? [])];
                                                                                    updated.splice(idx, 1);
                                                                                    updateData({ items: updated });
                                                                                }}
                                                                            >
                                                                                <Trash2 className="h-4 w-4 text-destructive" />
                                                                            </Button>
                                                                        </div>
                                                                        <div>
                                                                            <Label className="text-[10px] text-muted-foreground mb-1 block">Deskripsi</Label>
                                                                            <Input
                                                                                value={item.description ?? ""}
                                                                                onChange={(e) => {
                                                                                    const updated = [...(dataSection.items ?? [])];
                                                                                    updated[idx] = { ...item, description: e.target.value };
                                                                                    updateData({ items: updated });
                                                                                }}
                                                                                placeholder="Deskripsi singkat"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => updateData({ items: [...(dataSection.items ?? []), { icon: "", title: "", description: "" }] })}
                                                                >
                                                                    <PlusCircle className="mr-2 h-3 w-3" /> Tambah Item
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                if (type === "testimonials_home") {
                                                    return (
                                                        <div className="mt-2 space-y-3">
                                                            <div className="grid gap-2 md:grid-cols-2">
                                                                <div className="space-y-1"><Label className="text-xs">Heading</Label><Input value={dataSection.heading ?? ""} onChange={(e) => updateData({ heading: e.target.value })} /></div>
                                                                <div className="space-y-1"><Label className="text-xs">Description</Label><Input value={dataSection.description ?? ""} onChange={(e) => updateData({ description: e.target.value })} /></div>
                                                            </div>
                                                            <div className="space-y-3 border p-3 rounded-lg bg-muted/10">
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <Label className="text-sm font-semibold">Testimonial Items</Label>
                                                                    <p className="text-xs text-muted-foreground">Kelola daftar testimonial dari klien.</p>
                                                                </div>

                                                                {(dataSection.items ?? []).map((item: any, idx: number) => (
                                                                    <div key={idx} className="relative space-y-3 rounded-lg border border-input bg-background p-4 shadow-sm">
                                                                        <div className="absolute right-3 top-3">
                                                                            <Button
                                                                                type="button"
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                                                onClick={() => {
                                                                                    const updated = [...(dataSection.items ?? [])];
                                                                                    updated.splice(idx, 1);
                                                                                    updateData({ items: updated });
                                                                                }}
                                                                            >
                                                                                <Trash2 className="h-4 w-4" />
                                                                            </Button>
                                                                        </div>

                                                                        <div className="grid gap-4 md:grid-cols-2 pr-8">
                                                                            <div className="space-y-1">
                                                                                <Label className="text-xs text-muted-foreground">Nama Klien</Label>
                                                                                <Input
                                                                                    value={item.name ?? ""}
                                                                                    onChange={(e) => {
                                                                                        const updated = [...(dataSection.items ?? [])];
                                                                                        updated[idx] = { ...item, name: e.target.value };
                                                                                        updateData({ items: updated });
                                                                                    }}
                                                                                    placeholder="Nama Lengkap"
                                                                                />
                                                                            </div>
                                                                            <div className="space-y-1">
                                                                                <Label className="text-xs text-muted-foreground">Posisi / Perusahaan</Label>
                                                                                <Input
                                                                                    value={item.position ?? ""}
                                                                                    onChange={(e) => {
                                                                                        const updated = [...(dataSection.items ?? [])];
                                                                                        updated[idx] = { ...item, position: e.target.value };
                                                                                        updateData({ items: updated });
                                                                                    }}
                                                                                    placeholder="CEO PT Maju Jaya"
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        <div className="space-y-1">
                                                                            <Label className="text-xs text-muted-foreground">Isi Testimonial</Label>
                                                                            <Textarea
                                                                                value={item.testimonial ?? ""}
                                                                                onChange={(e) => {
                                                                                    const updated = [...(dataSection.items ?? [])];
                                                                                    updated[idx] = { ...item, testimonial: e.target.value };
                                                                                    updateData({ items: updated });
                                                                                }}
                                                                                className="min-h-[80px]"
                                                                                placeholder="Tulis pendapat klien di sini..."
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ))}

                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => updateData({ items: [...(dataSection.items ?? []), { name: "", position: "", testimonial: "" }] })}
                                                                >
                                                                    <PlusCircle className="mr-2 h-4 w-4" />
                                                                    Tambah Testimonial
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                if (type === "metrics_home") {
                                                    return (
                                                        <div className="mt-2 space-y-3">
                                                            <div className="space-y-1">
                                                                <Label className="text-xs">Metrics (Format: value|label per baris)</Label>
                                                                <Textarea
                                                                    value={(dataSection.items ?? []).map((s: any) => `${s.value}|${s.label}`).join("\n")}
                                                                    onChange={(e) => updateData({ items: e.target.value.split("\n").map((l: string) => { const [v, lb] = l.split("|"); return { value: v, label: lb }; }).filter((i: any) => i.value) })}
                                                                    placeholder="100+|Klien Puas"
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                if (type === "blog_preview") {
                                                    return (
                                                        <div className="mt-2 space-y-3">
                                                            <div className="grid gap-2 md:grid-cols-2">
                                                                <div className="space-y-1"><Label className="text-xs">Heading</Label><Input value={dataSection.heading ?? ""} onChange={(e) => updateData({ heading: e.target.value })} /></div>
                                                                <div className="space-y-1"><Label className="text-xs">Description</Label><Input value={dataSection.description ?? ""} onChange={(e) => updateData({ description: e.target.value })} /></div>
                                                            </div>
                                                            <div className="grid gap-2 md:grid-cols-2">
                                                                <div className="space-y-1"><Label className="text-xs">Link Text</Label><Input value={dataSection.link_text ?? ""} onChange={(e) => updateData({ link_text: e.target.value })} placeholder="Lihat Semua" /></div>
                                                                <div className="space-y-1"><Label className="text-xs">Link URL</Label><Input value={dataSection.link_url ?? ""} onChange={(e) => updateData({ link_url: e.target.value })} placeholder="/blog" /></div>
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                // --- ABOUT SECTIONS ---
                                                if (type === "about_overview") {
                                                    return (
                                                        <div className="mt-2 space-y-3">
                                                            <div className="grid gap-2 md:grid-cols-2">
                                                                <div className="space-y-1"><Label className="text-xs">Badge</Label><Input value={dataSection.badge ?? ""} onChange={(e) => updateData({ badge: e.target.value })} /></div>
                                                                <div className="space-y-1"><Label className="text-xs">Title (Kecil)</Label><Input value={dataSection.title ?? ""} onChange={(e) => updateData({ title: e.target.value })} /></div>
                                                            </div>
                                                            <div className="space-y-1"><Label className="text-xs">Heading (Besar)</Label><Input value={dataSection.heading ?? ""} onChange={(e) => updateData({ heading: e.target.value })} /></div>
                                                            <div className="space-y-1">
                                                                <Label className="text-xs">Paragraf (satu per baris)</Label>
                                                                <Textarea value={(dataSection.paragraphs ?? []).join("\n")} onChange={(e) => updateData({ paragraphs: e.target.value.split("\n") })} />
                                                            </div>
                                                            <div className="space-y-3 border p-3 rounded-lg bg-muted/10">
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <Label className="text-sm font-semibold">Stats</Label>
                                                                    <p className="text-xs text-muted-foreground">Statistik utama perusahaan.</p>
                                                                </div>

                                                                {(dataSection.stats ?? []).map((stat: any, idx: number) => (
                                                                    <div key={idx} className="flex gap-2 items-end">
                                                                        <div className="flex-1 space-y-1">
                                                                            <Label className="text-xs text-muted-foreground">Value</Label>
                                                                            <Input
                                                                                value={stat.value ?? ""}
                                                                                onChange={(e) => {
                                                                                    const updated = [...(dataSection.stats ?? [])];
                                                                                    updated[idx] = { ...stat, value: e.target.value };
                                                                                    updateData({ stats: updated });
                                                                                }}
                                                                                placeholder="ex: 100+"
                                                                            />
                                                                        </div>
                                                                        <div className="flex-[2] space-y-1">
                                                                            <Label className="text-xs text-muted-foreground">Label</Label>
                                                                            <Input
                                                                                value={stat.label ?? ""}
                                                                                onChange={(e) => {
                                                                                    const updated = [...(dataSection.stats ?? [])];
                                                                                    updated[idx] = { ...stat, label: e.target.value };
                                                                                    updateData({ stats: updated });
                                                                                }}
                                                                                placeholder="ex: Proyek Selesai"
                                                                            />
                                                                        </div>
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-9 w-9 text-muted-foreground hover:text-destructive mb-0.5"
                                                                            onClick={() => {
                                                                                const updated = [...(dataSection.stats ?? [])];
                                                                                updated.splice(idx, 1);
                                                                                updateData({ stats: updated });
                                                                            }}
                                                                        >
                                                                            <Trash2 className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                ))}

                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => updateData({ stats: [...(dataSection.stats ?? []), { value: "", label: "" }] })}
                                                                >
                                                                    <PlusCircle className="mr-2 h-4 w-4" />
                                                                    Tambah Stat
                                                                </Button>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label className="text-xs">Highlights</Label>
                                                                {(dataSection.highlights ?? []).map((item: any, idx: number) => (
                                                                    <div key={idx} className="flex flex-col gap-2 rounded-lg border p-3 bg-muted/20">
                                                                        <div className="flex gap-2 items-start">
                                                                            <div className="w-[200px] flex-shrink-0">
                                                                                <Label className="text-[10px] text-muted-foreground mb-1 block">Icon</Label>
                                                                                <IconPicker
                                                                                    value={item.icon ?? ""}
                                                                                    onChange={(val) => {
                                                                                        const updated = [...(dataSection.highlights ?? [])];
                                                                                        updated[idx] = { ...item, icon: val };
                                                                                        updateData({ highlights: updated });
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                            <div className="flex-1 space-y-2">
                                                                                <div>
                                                                                    <Label className="text-[10px] text-muted-foreground mb-1 block">Judul</Label>
                                                                                    <Input
                                                                                        value={item.title ?? ""}
                                                                                        onChange={(e) => {
                                                                                            const updated = [...(dataSection.highlights ?? [])];
                                                                                            updated[idx] = { ...item, title: e.target.value };
                                                                                            updateData({ highlights: updated });
                                                                                        }}
                                                                                        placeholder="Judul Highlight"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <Button
                                                                                type="button"
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                className="mt-6"
                                                                                onClick={() => {
                                                                                    const updated = [...(dataSection.highlights ?? [])];
                                                                                    updated.splice(idx, 1);
                                                                                    updateData({ highlights: updated });
                                                                                }}
                                                                            >
                                                                                <Trash2 className="h-4 w-4 text-destructive" />
                                                                            </Button>
                                                                        </div>
                                                                        <div>
                                                                            <Label className="text-[10px] text-muted-foreground mb-1 block">Deskripsi</Label>
                                                                            <Input
                                                                                value={item.description ?? ""}
                                                                                onChange={(e) => {
                                                                                    const updated = [...(dataSection.highlights ?? [])];
                                                                                    updated[idx] = { ...item, description: e.target.value };
                                                                                    updateData({ highlights: updated });
                                                                                }}
                                                                                placeholder="Deskripsi singkat"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => updateData({ highlights: [...(dataSection.highlights ?? []), { icon: "", title: "", description: "" }] })}
                                                                >
                                                                    <PlusCircle className="mr-2 h-3 w-3" /> Tambah Highlight
                                                                </Button>
                                                            </div>
                                                            <ImageUpload
                                                                value={dataSection.image ?? null}
                                                                onChange={(url) => updateData({ image: url })}
                                                                label="Gambar Overview"
                                                            />
                                                        </div>
                                                    );
                                                }

                                                if (type === "about_vision") {
                                                    return (
                                                        <div className="mt-2 space-y-3">
                                                            <div className="grid gap-2 md:grid-cols-2">
                                                                <div className="space-y-1"><Label className="text-xs">Badge</Label><Input value={dataSection.badge ?? ""} onChange={(e) => updateData({ badge: e.target.value })} /></div>
                                                                <div className="space-y-1"><Label className="text-xs">Title</Label><Input value={dataSection.title ?? ""} onChange={(e) => updateData({ title: e.target.value })} /></div>
                                                            </div>
                                                            <hr />
                                                            <div className="space-y-1"><Label className="text-xs">Judul Visi</Label><Input value={dataSection.vision_title ?? ""} onChange={(e) => updateData({ vision_title: e.target.value })} /></div>
                                                            <div className="space-y-1"><Label className="text-xs">Teks Visi</Label><Textarea value={dataSection.vision_text ?? ""} onChange={(e) => updateData({ vision_text: e.target.value })} /></div>
                                                            <hr />
                                                            <div className="space-y-1"><Label className="text-xs">Judul Misi</Label><Input value={dataSection.mission_title ?? ""} onChange={(e) => updateData({ mission_title: e.target.value })} /></div>
                                                            <div className="space-y-1"><Label className="text-xs">Teks Misi</Label><Textarea value={dataSection.mission_text ?? ""} onChange={(e) => updateData({ mission_text: e.target.value })} /></div>
                                                            <ImageUpload
                                                                value={dataSection.image ?? null}
                                                                onChange={(url) => updateData({ image: url })}
                                                                label="Gambar Vision/Mission"
                                                            />
                                                        </div>
                                                    );
                                                }

                                                if (type === "about_values") {
                                                    return (
                                                        <div className="mt-2 space-y-3">
                                                            <div className="space-y-2">
                                                                <Label className="text-xs">Values</Label>
                                                                {(dataSection.items ?? []).map((item: any, idx: number) => (
                                                                    <div key={idx} className="flex flex-col gap-2 rounded-lg border p-3 bg-muted/20">
                                                                        <div className="flex gap-2 items-start">
                                                                            <div className="w-[200px] flex-shrink-0">
                                                                                <Label className="text-[10px] text-muted-foreground mb-1 block">Icon</Label>
                                                                                <IconPicker
                                                                                    value={item.icon ?? ""}
                                                                                    onChange={(val) => {
                                                                                        const updated = [...(dataSection.items ?? [])];
                                                                                        updated[idx] = { ...item, icon: val };
                                                                                        updateData({ items: updated });
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                            <div className="flex-1 space-y-2">
                                                                                <div>
                                                                                    <Label className="text-[10px] text-muted-foreground mb-1 block">Judul</Label>
                                                                                    <Input
                                                                                        value={item.title ?? ""}
                                                                                        onChange={(e) => {
                                                                                            const updated = [...(dataSection.items ?? [])];
                                                                                            updated[idx] = { ...item, title: e.target.value };
                                                                                            updateData({ items: updated });
                                                                                        }}
                                                                                        placeholder="Nilai Inti"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <Button
                                                                                type="button"
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                className="mt-6"
                                                                                onClick={() => {
                                                                                    const updated = [...(dataSection.items ?? [])];
                                                                                    updated.splice(idx, 1);
                                                                                    updateData({ items: updated });
                                                                                }}
                                                                            >
                                                                                <Trash2 className="h-4 w-4 text-destructive" />
                                                                            </Button>
                                                                        </div>
                                                                        <div>
                                                                            <Label className="text-[10px] text-muted-foreground mb-1 block">Deskripsi</Label>
                                                                            <Input
                                                                                value={item.description ?? ""}
                                                                                onChange={(e) => {
                                                                                    const updated = [...(dataSection.items ?? [])];
                                                                                    updated[idx] = { ...item, description: e.target.value };
                                                                                    updateData({ items: updated });
                                                                                }}
                                                                                placeholder="Deskripsi singkat"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => updateData({ items: [...(dataSection.items ?? []), { icon: "", title: "", description: "" }] })}
                                                                >
                                                                    <PlusCircle className="mr-2 h-3 w-3" /> Tambah Value
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                if (type === "about_statistics") {
                                                    return (
                                                        <div className="mt-2 space-y-3">
                                                            <div className="grid gap-2 md:grid-cols-2">
                                                                <div className="space-y-1"><Label className="text-xs">Badge</Label><Input value={dataSection.badge ?? ""} onChange={(e) => updateData({ badge: e.target.value })} /></div>
                                                                <div className="space-y-1"><Label className="text-xs">Title</Label><Input value={dataSection.title ?? ""} onChange={(e) => updateData({ title: e.target.value })} /></div>
                                                            </div>
                                                            <div className="space-y-1"><Label className="text-xs">Description</Label><Textarea value={dataSection.description ?? ""} onChange={(e) => updateData({ description: e.target.value })} /></div>
                                                            <div className="space-y-3 border p-3 rounded-lg bg-muted/10">
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <Label className="text-sm font-semibold">Primary Stats</Label>
                                                                    <p className="text-xs text-muted-foreground">Statistik utama (Highlight).</p>
                                                                </div>

                                                                {(dataSection.primary ?? []).map((stat: any, idx: number) => (
                                                                    <div key={idx} className="flex gap-2 items-end">
                                                                        <div className="flex-1 space-y-1">
                                                                            <Label className="text-xs text-muted-foreground">Value</Label>
                                                                            <Input
                                                                                value={stat.value ?? ""}
                                                                                onChange={(e) => {
                                                                                    const updated = [...(dataSection.primary ?? [])];
                                                                                    updated[idx] = { ...stat, value: e.target.value };
                                                                                    updateData({ primary: updated });
                                                                                }}
                                                                                placeholder="98%"
                                                                            />
                                                                        </div>
                                                                        <div className="flex-[2] space-y-1">
                                                                            <Label className="text-xs text-muted-foreground">Label</Label>
                                                                            <Input
                                                                                value={stat.label ?? ""}
                                                                                onChange={(e) => {
                                                                                    const updated = [...(dataSection.primary ?? [])];
                                                                                    updated[idx] = { ...stat, label: e.target.value };
                                                                                    updateData({ primary: updated });
                                                                                }}
                                                                                placeholder="Kepuasan Klien"
                                                                            />
                                                                        </div>
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-9 w-9 text-muted-foreground hover:text-destructive mb-0.5"
                                                                            onClick={() => {
                                                                                const updated = [...(dataSection.primary ?? [])];
                                                                                updated.splice(idx, 1);
                                                                                updateData({ primary: updated });
                                                                            }}
                                                                        >
                                                                            <Trash2 className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                ))}

                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => updateData({ primary: [...(dataSection.primary ?? []), { value: "", label: "" }] })}
                                                                >
                                                                    <PlusCircle className="mr-2 h-4 w-4" />
                                                                    Tambah Primary Stat
                                                                </Button>
                                                            </div>

                                                            <div className="space-y-3 border p-3 rounded-lg bg-muted/10">
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <Label className="text-sm font-semibold">Secondary Stats</Label>
                                                                    <p className="text-xs text-muted-foreground">Statistik tambahan (List).</p>
                                                                </div>

                                                                {(dataSection.secondary ?? []).map((stat: any, idx: number) => (
                                                                    <div key={idx} className="flex gap-2 items-end">
                                                                        <div className="flex-1 space-y-1">
                                                                            <Label className="text-xs text-muted-foreground">Value</Label>
                                                                            <Input
                                                                                value={stat.value ?? ""}
                                                                                onChange={(e) => {
                                                                                    const updated = [...(dataSection.secondary ?? [])];
                                                                                    updated[idx] = { ...stat, value: e.target.value };
                                                                                    updateData({ secondary: updated });
                                                                                }}
                                                                                placeholder="24/7"
                                                                            />
                                                                        </div>
                                                                        <div className="flex-[2] space-y-1">
                                                                            <Label className="text-xs text-muted-foreground">Label</Label>
                                                                            <Input
                                                                                value={stat.label ?? ""}
                                                                                onChange={(e) => {
                                                                                    const updated = [...(dataSection.secondary ?? [])];
                                                                                    updated[idx] = { ...stat, label: e.target.value };
                                                                                    updateData({ secondary: updated });
                                                                                }}
                                                                                placeholder="Dukungan Teknis"
                                                                            />
                                                                        </div>
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-9 w-9 text-muted-foreground hover:text-destructive mb-0.5"
                                                                            onClick={() => {
                                                                                const updated = [...(dataSection.secondary ?? [])];
                                                                                updated.splice(idx, 1);
                                                                                updateData({ secondary: updated });
                                                                            }}
                                                                        >
                                                                            <Trash2 className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                ))}

                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => updateData({ secondary: [...(dataSection.secondary ?? []), { value: "", label: "" }] })}
                                                                >
                                                                    <PlusCircle className="mr-2 h-4 w-4" />
                                                                    Tambah Secondary Stat
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                if (type === "about_team") {
                                                    return (
                                                        <div className="mt-2 space-y-3">
                                                            <div className="grid gap-2 md:grid-cols-2">
                                                                <div className="space-y-1"><Label className="text-xs">Badge</Label><Input value={dataSection.badge ?? ""} onChange={(e) => updateData({ badge: e.target.value })} /></div>
                                                                <div className="space-y-1"><Label className="text-xs">Title</Label><Input value={dataSection.title ?? ""} onChange={(e) => updateData({ title: e.target.value })} /></div>
                                                            </div>
                                                            <div className="space-y-1"><Label className="text-xs">Description</Label><Textarea value={dataSection.description ?? ""} onChange={(e) => updateData({ description: e.target.value })} /></div>
                                                            <div className="space-y-3 border p-3 rounded-lg bg-muted/10">
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <Label className="text-sm font-semibold">Team Members</Label>
                                                                    <p className="text-xs text-muted-foreground">Kelola anggota tim.</p>
                                                                </div>

                                                                {(dataSection.members ?? []).map((member: any, idx: number) => (
                                                                    <div key={idx} className="relative space-y-4 rounded-lg border border-input bg-background p-4 shadow-sm">
                                                                        <div className="absolute right-3 top-3">
                                                                            <Button
                                                                                type="button"
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                                                onClick={() => {
                                                                                    const updated = [...(dataSection.members ?? [])];
                                                                                    updated.splice(idx, 1);
                                                                                    updateData({ members: updated });
                                                                                }}
                                                                            >
                                                                                <Trash2 className="h-4 w-4" />
                                                                            </Button>
                                                                        </div>

                                                                        <div className="flex flex-col md:flex-row gap-4">
                                                                            <div className="w-full md:w-1/3">
                                                                                <Label className="text-xs text-muted-foreground mb-1 block">Foto</Label>
                                                                                <ImageUpload
                                                                                    value={member.image ?? null}
                                                                                    onChange={(url) => {
                                                                                        const updated = [...(dataSection.members ?? [])];
                                                                                        updated[idx] = { ...member, image: url };
                                                                                        updateData({ members: updated });
                                                                                    }}
                                                                                    label="Foto Anggota"
                                                                                />
                                                                            </div>
                                                                            <div className="w-full md:w-2/3 space-y-3">
                                                                                <div className="grid gap-3 md:grid-cols-2">
                                                                                    <div className="space-y-1">
                                                                                        <Label className="text-xs text-muted-foreground">Nama</Label>
                                                                                        <Input
                                                                                            value={member.name ?? ""}
                                                                                            onChange={(e) => {
                                                                                                const updated = [...(dataSection.members ?? [])];
                                                                                                updated[idx] = { ...member, name: e.target.value };
                                                                                                updateData({ members: updated });
                                                                                            }}
                                                                                            placeholder="Nama Lengkap"
                                                                                        />
                                                                                    </div>
                                                                                    <div className="space-y-1">
                                                                                        <Label className="text-xs text-muted-foreground">Jabatan (Role)</Label>
                                                                                        <Input
                                                                                            value={member.role ?? ""}
                                                                                            onChange={(e) => {
                                                                                                const updated = [...(dataSection.members ?? [])];
                                                                                                updated[idx] = { ...member, role: e.target.value };
                                                                                                updateData({ members: updated });
                                                                                            }}
                                                                                            placeholder="ex: CEO"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="space-y-1">
                                                                                    <Label className="text-xs text-muted-foreground">Deskripsi Singkat</Label>
                                                                                    <Textarea
                                                                                        value={member.description ?? ""}
                                                                                        onChange={(e) => {
                                                                                            const updated = [...(dataSection.members ?? [])];
                                                                                            updated[idx] = { ...member, description: e.target.value };
                                                                                            updateData({ members: updated });
                                                                                        }}
                                                                                        className="min-h-[80px]"
                                                                                        placeholder="Deskripsi singkat tentang anggota tim..."
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}

                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => updateData({ members: [...(dataSection.members ?? []), { name: "", role: "", image: "", description: "" }] })}
                                                                >
                                                                    <PlusCircle className="mr-2 h-4 w-4" />
                                                                    Tambah Anggota
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                if (type === "about_cta") {
                                                    return (
                                                        <div className="mt-2 space-y-3">
                                                            <div className="grid gap-2 md:grid-cols-2">
                                                                <div className="space-y-1"><Label className="text-xs">Badge</Label><Input value={dataSection.badge ?? ""} onChange={(e) => updateData({ badge: e.target.value })} /></div>
                                                                <div className="space-y-1"><Label className="text-xs">Heading</Label><Input value={dataSection.heading ?? ""} onChange={(e) => updateData({ heading: e.target.value })} /></div>
                                                            </div>
                                                            <div className="space-y-1"><Label className="text-xs">Description</Label><Textarea value={dataSection.description ?? ""} onChange={(e) => updateData({ description: e.target.value })} /></div>
                                                            <div className="grid gap-2 md:grid-cols-2">
                                                                <div className="space-y-1"><Label className="text-xs">Primary Label</Label><Input value={dataSection.primary_label ?? ""} onChange={(e) => updateData({ primary_label: e.target.value })} /></div>
                                                                <div className="space-y-1"><Label className="text-xs">Primary Link</Label><Input value={dataSection.primary_link ?? ""} onChange={(e) => updateData({ primary_link: e.target.value })} /></div>
                                                            </div>
                                                            <div className="space-y-3 border p-3 rounded-lg bg-muted/10">
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <Label className="text-sm font-semibold">Contacts</Label>
                                                                    <p className="text-xs text-muted-foreground">Kontak (Email, Phone, etc).</p>
                                                                </div>

                                                                {(dataSection.contacts ?? []).map((contact: any, idx: number) => (
                                                                    <div key={idx} className="flex flex-col gap-2 rounded-lg border p-3 bg-muted/20">
                                                                        <div className="flex gap-2 items-start">
                                                                            <div className="w-[200px] flex-shrink-0">
                                                                                <Label className="text-[10px] text-muted-foreground mb-1 block">Icon</Label>
                                                                                <IconPicker
                                                                                    value={contact.icon ?? ""}
                                                                                    onChange={(val) => {
                                                                                        const updated = [...(dataSection.contacts ?? [])];
                                                                                        updated[idx] = { ...contact, icon: val };
                                                                                        updateData({ contacts: updated });
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                            <div className="flex-1 space-y-2">
                                                                                <div>
                                                                                    <Label className="text-[10px] text-muted-foreground mb-1 block">Title (Label)</Label>
                                                                                    <Input
                                                                                        value={contact.title ?? ""}
                                                                                        onChange={(e) => {
                                                                                            const updated = [...(dataSection.contacts ?? [])];
                                                                                            updated[idx] = { ...contact, title: e.target.value };
                                                                                            updateData({ contacts: updated });
                                                                                        }}
                                                                                        placeholder="Email"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <Button
                                                                                type="button"
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                className="mt-6"
                                                                                onClick={() => {
                                                                                    const updated = [...(dataSection.contacts ?? [])];
                                                                                    updated.splice(idx, 1);
                                                                                    updateData({ contacts: updated });
                                                                                }}
                                                                            >
                                                                                <Trash2 className="h-4 w-4 text-destructive" />
                                                                            </Button>
                                                                        </div>
                                                                        <div>
                                                                            <Label className="text-[10px] text-muted-foreground mb-1 block">Detail (Value)</Label>
                                                                            <Input
                                                                                value={contact.detail ?? ""}
                                                                                onChange={(e) => {
                                                                                    const updated = [...(dataSection.contacts ?? [])];
                                                                                    updated[idx] = { ...contact, detail: e.target.value };
                                                                                    updateData({ contacts: updated });
                                                                                }}
                                                                                placeholder="contact@company.com"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ))}

                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => updateData({ contacts: [...(dataSection.contacts ?? []), { icon: "", title: "", detail: "" }] })}
                                                                >
                                                                    <PlusCircle className="mr-2 h-3 w-3" /> Tambah Kontak
                                                                </Button>
                                                            </div>
                                                            {/* Background Image Upload removed - Using Gradient Design */}
                                                        </div>
                                                    );
                                                }

                                                // --- SERVICE SECTIONS ---
                                                if (type === "service_hero" || type === "project_hero" || type === "career_hero" || type === "blog_hero" || type === "product_hero") {
                                                    return (
                                                        <div className="mt-2 space-y-3">
                                                            {type === 'product_hero' && <div className="space-y-1"><Label className="text-xs">Badge</Label><Input value={dataSection.badge ?? ""} onChange={(e) => updateData({ badge: e.target.value })} /></div>}
                                                            <div className="space-y-1"><Label className="text-xs">Judul</Label><Input value={dataSection.heading ?? ""} onChange={(e) => updateData({ heading: e.target.value })} /></div>
                                                            {type === 'service_hero' && <div className="space-y-1"><Label className="text-xs">Highlight</Label><Input value={dataSection.highlight ?? ""} onChange={(e) => updateData({ highlight: e.target.value })} /></div>}
                                                            <div className="space-y-1"><Label className="text-xs">Deskripsi</Label><Textarea value={dataSection.description ?? ""} onChange={(e) => updateData({ description: e.target.value })} /></div>

                                                            {type === 'service_hero' && (
                                                                <div className="space-y-1 mt-4 border-t pt-4">
                                                                    <Label className="text-xs font-semibold">Statistics (Hero Bottom)</Label>
                                                                    <div className="space-y-2">
                                                                        {(dataSection.stats ?? []).map((stat: any, index: number) => (
                                                                            <div key={index} className="flex gap-2 items-start border p-2 rounded-md bg-gray-50 dark:bg-gray-800">
                                                                                <div className="grid gap-2 flex-1 md:grid-cols-3">
                                                                                    <Input
                                                                                        placeholder="Value (e.g. 120+)"
                                                                                        value={stat.value ?? ""}
                                                                                        onChange={(e) => {
                                                                                            const newStats = [...(dataSection.stats ?? [])];
                                                                                            newStats[index] = { ...newStats[index], value: e.target.value };
                                                                                            updateData({ stats: newStats });
                                                                                        }}
                                                                                    />
                                                                                    <Input
                                                                                        placeholder="Label (e.g. Projects)"
                                                                                        value={stat.label ?? ""}
                                                                                        onChange={(e) => {
                                                                                            const newStats = [...(dataSection.stats ?? [])];
                                                                                            newStats[index] = { ...newStats[index], label: e.target.value };
                                                                                            updateData({ stats: newStats });
                                                                                        }}
                                                                                    />
                                                                                    <Input
                                                                                        placeholder="Desc (e.g. Implementasi...)"
                                                                                        value={stat.desc ?? ""}
                                                                                        onChange={(e) => {
                                                                                            const newStats = [...(dataSection.stats ?? [])];
                                                                                            newStats[index] = { ...newStats[index], desc: e.target.value };
                                                                                            updateData({ stats: newStats });
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="icon"
                                                                                    className="h-8 w-8 text-red-500 hover:text-red-600"
                                                                                    onClick={() => {
                                                                                        const newStats = [...(dataSection.stats ?? [])];
                                                                                        newStats.splice(index, 1);
                                                                                        updateData({ stats: newStats });
                                                                                    }}
                                                                                >
                                                                                    <Trash2 className="h-4 w-4" />
                                                                                </Button>
                                                                            </div>
                                                                        ))}
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            onClick={() => updateData({ stats: [...(dataSection.stats ?? []), { value: "", label: "", desc: "" }] })}
                                                                        >
                                                                            <PlusCircle className="mr-2 h-3 w-3" /> Add Stat
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            <div className="grid gap-2 md:grid-cols-2">
                                                                <div className="space-y-1"><Label className="text-xs">Label Tombol Utama</Label><Input value={dataSection.primary_label ?? ""} onChange={(e) => updateData({ primary_label: e.target.value })} /></div>
                                                                <div className="space-y-1"><Label className="text-xs">Link Tombol Utama</Label><Input value={dataSection.primary_link ?? ""} onChange={(e) => updateData({ primary_link: e.target.value })} /></div>
                                                            </div>


                                                            {(type === 'service_hero' || type === 'product_hero' || type === 'project_hero' || type === 'career_hero' || type === 'blog_hero') && (
                                                                <>
                                                                    <div className="grid gap-2 md:grid-cols-2">
                                                                        <div className="space-y-1"><Label className="text-xs">Label Tombol Sekunder</Label><Input value={dataSection.secondary_label ?? ""} onChange={(e) => updateData({ secondary_label: e.target.value })} /></div>
                                                                        <div className="space-y-1"><Label className="text-xs">Link Tombol Sekunder</Label><Input value={dataSection.secondary_link ?? ""} onChange={(e) => updateData({ secondary_link: e.target.value })} /></div>
                                                                    </div>
                                                                    <ImageUpload
                                                                        value={dataSection.hero_image ?? dataSection.background_image ?? null}
                                                                        onChange={(url) => updateData({ hero_image: url, background_image: url })}
                                                                        label="Background Image / Hero Image"
                                                                    />
                                                                </>
                                                            )}
                                                        </div>
                                                    );
                                                }

                                                if (type === "service_summary") {
                                                    return (
                                                        <div className="mt-2 space-y-3">
                                                            <div className="grid gap-2 md:grid-cols-2">
                                                                <div className="space-y-1"><Label className="text-xs">Badge</Label><Input value={dataSection.badge ?? ""} onChange={(e) => updateData({ badge: e.target.value })} /></div>
                                                                <div className="space-y-1"><Label className="text-xs">Heading</Label><Input value={dataSection.heading ?? ""} onChange={(e) => updateData({ heading: e.target.value })} /></div>
                                                            </div>
                                                            <div className="space-y-1"><Label className="text-xs">Deskripsi</Label><Textarea value={dataSection.description ?? ""} onChange={(e) => updateData({ description: e.target.value })} /></div>
                                                        </div>
                                                    );
                                                }

                                                if (type === "service_advantages") {
                                                    return (
                                                        <div className="mt-2 space-y-3">
                                                            <div className="grid gap-2 md:grid-cols-2">
                                                                <div className="space-y-1"><Label className="text-xs">Badge</Label><Input value={dataSection.badge ?? ""} onChange={(e) => updateData({ badge: e.target.value })} /></div>
                                                                <div className="space-y-1"><Label className="text-xs">Heading</Label><Input value={dataSection.heading ?? ""} onChange={(e) => updateData({ heading: e.target.value })} /></div>
                                                            </div>
                                                            <div className="space-y-1"><Label className="text-xs">Deskripsi</Label><Textarea value={dataSection.description ?? ""} onChange={(e) => updateData({ description: e.target.value })} /></div>
                                                            <div className="space-y-1 mt-4 border-t pt-4">
                                                                <Label className="text-xs font-semibold">Advantage Items</Label>
                                                                <div className="space-y-2">
                                                                    {(dataSection.items ?? []).map((item: any, index: number) => (
                                                                        <div key={index} className="flex gap-2 items-start border p-2 rounded-md bg-gray-50 dark:bg-gray-800">
                                                                            <div className="grid gap-2 flex-1 md:grid-cols-[1fr,2fr,auto]">
                                                                                <div className="space-y-1">
                                                                                    <Label className="text-[10px] text-muted-foreground">Title</Label>
                                                                                    <Input
                                                                                        placeholder="Title"
                                                                                        value={item.title ?? ""}
                                                                                        onChange={(e) => {
                                                                                            const newItems = [...(dataSection.items ?? [])];
                                                                                            newItems[index] = { ...newItems[index], title: e.target.value };
                                                                                            updateData({ items: newItems });
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <div className="space-y-1">
                                                                                    <Label className="text-[10px] text-muted-foreground">Description</Label>
                                                                                    <Textarea
                                                                                        placeholder="Description"
                                                                                        className="h-10 min-h-[40px]"
                                                                                        value={item.description ?? ""}
                                                                                        onChange={(e) => {
                                                                                            const newItems = [...(dataSection.items ?? [])];
                                                                                            newItems[index] = { ...newItems[index], description: e.target.value };
                                                                                            updateData({ items: newItems });
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <div className="space-y-1">
                                                                                    <Label className="text-[10px] text-muted-foreground">Icon</Label>
                                                                                    <IconPicker
                                                                                        value={item.icon ?? item.iconName ?? ""}
                                                                                        onChange={(icon) => {
                                                                                            const newItems = [...(dataSection.items ?? [])];
                                                                                            newItems[index] = { ...newItems[index], icon: icon, iconName: icon };
                                                                                            updateData({ items: newItems });
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                className="h-8 w-8 text-red-500 hover:text-red-600 mt-6"
                                                                                onClick={() => {
                                                                                    const newItems = [...(dataSection.items ?? [])];
                                                                                    newItems.splice(index, 1);
                                                                                    updateData({ items: newItems });
                                                                                }}
                                                                            >
                                                                                <Trash2 className="h-4 w-4" />
                                                                            </Button>
                                                                        </div>
                                                                    ))}
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() => updateData({ items: [...(dataSection.items ?? []), { title: "", description: "", icon: "" }] })}
                                                                    >
                                                                        <PlusCircle className="mr-2 h-3 w-3" /> Add Item
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                if (type === "service_offerings") {
                                                    return (
                                                        <div className="mt-2 space-y-3">
                                                            <div className="grid gap-2 md:grid-cols-2">
                                                                <div className="space-y-1"><Label className="text-xs">Badge</Label><Input value={dataSection.badge ?? ""} onChange={(e) => updateData({ badge: e.target.value })} /></div>
                                                                <div className="space-y-1"><Label className="text-xs">Heading</Label><Input value={dataSection.heading ?? ""} onChange={(e) => updateData({ heading: e.target.value })} /></div>
                                                            </div>
                                                            <div className="space-y-1"><Label className="text-xs">Deskripsi</Label><Textarea value={dataSection.description ?? ""} onChange={(e) => updateData({ description: e.target.value })} /></div>

                                                            <div className="space-y-1 mt-4 border-t pt-4">
                                                                <Label className="text-xs font-semibold">Offerings Items</Label>
                                                                <div className="space-y-2">
                                                                    {(dataSection.items ?? []).map((item: any, index: number) => (
                                                                        <div key={index} className="flex gap-2 items-start border p-2 rounded-md bg-gray-50 dark:bg-gray-800">
                                                                            <div className="grid gap-2 flex-1 md:grid-cols-[1fr,2fr,auto]">
                                                                                <div className="space-y-1">
                                                                                    <Label className="text-[10px] text-muted-foreground">Title</Label>
                                                                                    <Input
                                                                                        placeholder="Title"
                                                                                        value={item.title ?? ""}
                                                                                        onChange={(e) => {
                                                                                            const newItems = [...(dataSection.items ?? [])];
                                                                                            newItems[index] = { ...newItems[index], title: e.target.value };
                                                                                            updateData({ items: newItems });
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <div className="space-y-1">
                                                                                    <Label className="text-[10px] text-muted-foreground">Description</Label>
                                                                                    <Textarea
                                                                                        placeholder="Description"
                                                                                        className="h-10 min-h-[40px]"
                                                                                        value={item.description ?? ""}
                                                                                        onChange={(e) => {
                                                                                            const newItems = [...(dataSection.items ?? [])];
                                                                                            newItems[index] = { ...newItems[index], description: e.target.value };
                                                                                            updateData({ items: newItems });
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <div className="space-y-1">
                                                                                    <Label className="text-[10px] text-muted-foreground">Icon</Label>
                                                                                    <IconPicker
                                                                                        value={item.icon ?? item.iconName ?? ""}
                                                                                        onChange={(icon) => {
                                                                                            const newItems = [...(dataSection.items ?? [])];
                                                                                            newItems[index] = { ...newItems[index], icon: icon, iconName: icon };
                                                                                            updateData({ items: newItems });
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                className="h-8 w-8 text-red-500 hover:text-red-600 mt-6"
                                                                                onClick={() => {
                                                                                    const newItems = [...(dataSection.items ?? [])];
                                                                                    newItems.splice(index, 1);
                                                                                    updateData({ items: newItems });
                                                                                }}
                                                                            >
                                                                                <Trash2 className="h-4 w-4" />
                                                                            </Button>
                                                                        </div>
                                                                    ))}
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() => updateData({ items: [...(dataSection.items ?? []), { title: "", description: "", icon: "" }] })}
                                                                    >
                                                                        <PlusCircle className="mr-2 h-3 w-3" /> Add Item
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                if (type === "service_process") {
                                                    return (
                                                        <div className="mt-2 space-y-3">
                                                            <div className="grid gap-2 md:grid-cols-2">
                                                                <div className="space-y-1"><Label className="text-xs">Badge</Label><Input value={dataSection.badge ?? ""} onChange={(e) => updateData({ badge: e.target.value })} /></div>
                                                                <div className="space-y-1"><Label className="text-xs">Heading</Label><Input value={dataSection.heading ?? ""} onChange={(e) => updateData({ heading: e.target.value })} /></div>
                                                            </div>
                                                            <div className="space-y-1"><Label className="text-xs">Deskripsi</Label><Textarea value={dataSection.description ?? ""} onChange={(e) => updateData({ description: e.target.value })} /></div>
                                                            <div className="space-y-1 mt-4 border-t pt-4">
                                                                <Label className="text-xs font-semibold">Process Steps</Label>
                                                                <div className="space-y-2">
                                                                    {(dataSection.items ?? dataSection.steps ?? []).map((item: any, index: number) => (
                                                                        <div key={index} className="flex gap-2 items-start border p-2 rounded-md bg-gray-50 dark:bg-gray-800">
                                                                            <div className="grid gap-2 flex-1 md:grid-cols-[auto,1fr,2fr,auto]">
                                                                                <div className="space-y-1 w-16">
                                                                                    <Label className="text-[10px] text-muted-foreground">Step</Label>
                                                                                    <Input
                                                                                        placeholder="01"
                                                                                        value={item.step ?? String(index + 1).padStart(2, '0')}
                                                                                        onChange={(e) => {
                                                                                            const newItems = [...(dataSection.items ?? dataSection.steps ?? [])];
                                                                                            newItems[index] = { ...newItems[index], step: e.target.value };
                                                                                            updateData({ items: newItems });
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <div className="space-y-1">
                                                                                    <Label className="text-[10px] text-muted-foreground">Title</Label>
                                                                                    <Input
                                                                                        placeholder="Title"
                                                                                        value={item.title ?? ""}
                                                                                        onChange={(e) => {
                                                                                            const newItems = [...(dataSection.items ?? dataSection.steps ?? [])];
                                                                                            newItems[index] = { ...newItems[index], title: e.target.value };
                                                                                            updateData({ items: newItems });
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <div className="space-y-1">
                                                                                    <Label className="text-[10px] text-muted-foreground">Description</Label>
                                                                                    <Textarea
                                                                                        placeholder="Description"
                                                                                        className="h-10 min-h-[40px]"
                                                                                        value={item.description ?? ""}
                                                                                        onChange={(e) => {
                                                                                            const newItems = [...(dataSection.items ?? dataSection.steps ?? [])];
                                                                                            newItems[index] = { ...newItems[index], description: e.target.value };
                                                                                            updateData({ items: newItems });
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <div className="space-y-1">
                                                                                    <Label className="text-[10px] text-muted-foreground">Icon</Label>
                                                                                    <IconPicker
                                                                                        value={item.icon ?? item.iconName ?? ""}
                                                                                        onChange={(icon) => {
                                                                                            const newItems = [...(dataSection.items ?? dataSection.steps ?? [])];
                                                                                            newItems[index] = { ...newItems[index], icon: icon, iconName: icon };
                                                                                            updateData({ items: newItems });
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                className="h-8 w-8 text-red-500 hover:text-red-600 mt-6"
                                                                                onClick={() => {
                                                                                    const newItems = [...(dataSection.items ?? dataSection.steps ?? [])];
                                                                                    newItems.splice(index, 1);
                                                                                    updateData({ items: newItems });
                                                                                }}
                                                                            >
                                                                                <Trash2 className="h-4 w-4" />
                                                                            </Button>
                                                                        </div>
                                                                    ))}
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() => updateData({ items: [...(dataSection.items ?? dataSection.steps ?? []), { title: "", description: "", icon: "", step: "" }] })}
                                                                    >
                                                                        <PlusCircle className="mr-2 h-3 w-3" /> Add Step
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                if (type === "service_tech_stack") {
                                                    return (
                                                        <div className="mt-2 space-y-3">
                                                            <div className="grid gap-2 md:grid-cols-2">
                                                                <div className="space-y-1"><Label className="text-xs">Badge</Label><Input value={dataSection.badge ?? ""} onChange={(e) => updateData({ badge: e.target.value })} /></div>
                                                                <div className="space-y-1"><Label className="text-xs">Heading</Label><Input value={dataSection.heading ?? ""} onChange={(e) => updateData({ heading: e.target.value })} /></div>
                                                            </div>
                                                            <div className="space-y-1"><Label className="text-xs">Deskripsi</Label><Textarea value={dataSection.description ?? ""} onChange={(e) => updateData({ description: e.target.value })} /></div>
                                                            <div className="space-y-1 mt-4 border-t pt-4">
                                                                <Label className="text-xs font-semibold">Tech Categories</Label>
                                                                <div className="space-y-2">
                                                                    {(dataSection.categories ?? []).map((category: any, index: number) => (
                                                                        <div key={index} className="flex gap-2 items-start border p-2 rounded-md bg-gray-50 dark:bg-gray-800">
                                                                            <div className="grid gap-2 flex-1 md:grid-cols-2">
                                                                                <div className="space-y-1">
                                                                                    <Label className="text-[10px] text-muted-foreground">Category Name</Label>
                                                                                    <Input
                                                                                        placeholder="ex: Frontend"
                                                                                        value={category.name ?? ""}
                                                                                        onChange={(e) => {
                                                                                            const newCategories = [...(dataSection.categories ?? [])];
                                                                                            newCategories[index] = { ...newCategories[index], name: e.target.value };
                                                                                            updateData({ categories: newCategories });
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <div className="space-y-1">
                                                                                    <Label className="text-[10px] text-muted-foreground">Items (Comma separated)</Label>
                                                                                    <Textarea
                                                                                        placeholder="ex: React, Vue, Tailwind"
                                                                                        className="h-10 min-h-[40px]"
                                                                                        value={(category.items ?? []).join(", ")}
                                                                                        onChange={(e) => {
                                                                                            const newCategories = [...(dataSection.categories ?? [])];
                                                                                            newCategories[index] = {
                                                                                                ...newCategories[index],
                                                                                                items: e.target.value.split(',').map(s => s.trim())
                                                                                            };
                                                                                            updateData({ categories: newCategories });
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                className="h-8 w-8 text-red-500 hover:text-red-600 mt-6"
                                                                                onClick={() => {
                                                                                    const newCategories = [...(dataSection.categories ?? [])];
                                                                                    newCategories.splice(index, 1);
                                                                                    updateData({ categories: newCategories });
                                                                                }}
                                                                            >
                                                                                <Trash2 className="h-4 w-4" />
                                                                            </Button>
                                                                        </div>
                                                                    ))}
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() => updateData({ categories: [...(dataSection.categories ?? []), { name: "", items: [] }] })}
                                                                    >
                                                                        <PlusCircle className="mr-2 h-3 w-3" /> Add Category
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                if (type === "service_faqs") {
                                                    return (
                                                        <div className="mt-2 space-y-3">
                                                            <div className="space-y-1"><Label className="text-xs">Heading</Label><Input value={dataSection.heading ?? ""} onChange={(e) => updateData({ heading: e.target.value })} /></div>
                                                            <div className="space-y-1"><Label className="text-xs">Deskripsi</Label><Textarea value={dataSection.description ?? ""} onChange={(e) => updateData({ description: e.target.value })} /></div>
                                                            <div className="space-y-1 mt-4 border-t pt-4">
                                                                <Label className="text-xs font-semibold">Questions & Answers</Label>
                                                                <div className="space-y-2">
                                                                    {(dataSection.items ?? []).map((item: any, index: number) => (
                                                                        <div key={index} className="flex gap-2 items-start border p-2 rounded-md bg-gray-50 dark:bg-gray-800">
                                                                            <div className="grid gap-2 flex-1 md:grid-cols-1 lg:grid-cols-2">
                                                                                <div className="space-y-1">
                                                                                    <Label className="text-[10px] text-muted-foreground">Question</Label>
                                                                                    <Input
                                                                                        placeholder="ex: What is the estimated timeline?"
                                                                                        value={item.question ?? ""}
                                                                                        onChange={(e) => {
                                                                                            const newItems = [...(dataSection.items ?? [])];
                                                                                            newItems[index] = { ...newItems[index], question: e.target.value };
                                                                                            updateData({ items: newItems });
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <div className="space-y-1">
                                                                                    <Label className="text-[10px] text-muted-foreground">Answer</Label>
                                                                                    <Textarea
                                                                                        placeholder="Answer here..."
                                                                                        className="h-10 min-h-[40px]"
                                                                                        value={item.answer ?? ""}
                                                                                        onChange={(e) => {
                                                                                            const newItems = [...(dataSection.items ?? [])];
                                                                                            newItems[index] = { ...newItems[index], answer: e.target.value };
                                                                                            updateData({ items: newItems });
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                className="h-8 w-8 text-red-500 hover:text-red-600 mt-6"
                                                                                onClick={() => {
                                                                                    const newItems = [...(dataSection.items ?? [])];
                                                                                    newItems.splice(index, 1);
                                                                                    updateData({ items: newItems });
                                                                                }}
                                                                            >
                                                                                <Trash2 className="h-4 w-4" />
                                                                            </Button>
                                                                        </div>
                                                                    ))}
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() => updateData({ items: [...(dataSection.items ?? []), { question: "", answer: "" }] })}
                                                                    >
                                                                        <PlusCircle className="mr-2 h-3 w-3" /> Add Question
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }



                                                return (
                                                    <div className="mt-2 space-y-1">
                                                        <Label className="text-xs">Konten (HTML)</Label>
                                                        <RichTextEditor
                                                            value={section.content ?? ""}
                                                            onChange={(value) => {
                                                                const updated = [...(data.sections ?? [])];
                                                                updated[index] = { ...section, content: value };
                                                                setData("sections", updated);
                                                            }}
                                                            placeholder="Konten singkat untuk section ini"
                                                        />
                                                    </div>
                                                );

                                            })()}
                                        </div>
                                    ))}
                                </div>
                                <InputError message={(errors as typeof errors & { sections?: string }).sections} />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                            <InputError message={(errors as typeof errors & { general?: string }).general} />
                            <div className="flex flex-wrap gap-2 sm:ml-auto">
                                <Button type="button" variant="outline" asChild>
                                    <Link href={route("admin.pages.index")}>Batal</Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {page ? "Simpan Perubahan" : "Simpan Halaman"}
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
