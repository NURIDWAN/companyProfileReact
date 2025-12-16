import AppLayout from "@/layouts/app-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/RichTextEditor";
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
        if ((slug.includes("service") || name.includes("layanan")) && slug.includes("hero")) return "service_hero";
        if (slug.includes("hero") || name.includes("hero")) return "hero_home";
        if (slug.includes("about") || name.includes("tentang")) return "about_intro";
        if (slug.includes("highlight") && (slug.includes("about") || name.includes("tentang"))) return "about_highlight";
        if (slug.includes("service") || slug.includes("layanan")) return "service_overview";
        if (slug.includes("faq")) return "service_faq";
        if (slug.includes("cta")) return "cta_home";
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
        { value: "plain", label: "Konten Biasa" },
        { value: "hero_home", label: "Hero - Home" },
        { value: "about_intro", label: "Tentang Kami - Intro" },
        { value: "about_highlight", label: "Tentang Kami - Highlight" },
        { value: "service_hero", label: "Hero - Service" },
        { value: "service_overview", label: "Service Overview" },
        { value: "service_faq", label: "FAQ - Service" },
        { value: "cta_home", label: "CTA - Home" },
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
                                                            <div className="space-y-1">
                                                                <Label className="text-xs">Gambar Hero (URL)</Label>
                                                                <Input value={dataSection.hero_image ?? ""} onChange={(e) => updateData({ hero_image: e.target.value })} placeholder="https://..." />
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                if (type === "about_intro") {
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
                                                            <div className="space-y-1">
                                                                <Label className="text-xs">Highlight (satu per baris)</Label>
                                                                <Textarea
                                                                    value={(dataSection.highlights ?? []).join("\n")}
                                                                    onChange={(e) => updateData({ highlights: e.target.value.split("\n").filter((v: string) => v.trim() !== "") })}
                                                                />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <Label className="text-xs">Gambar (URL)</Label>
                                                                <Input value={dataSection.image ?? ""} onChange={(e) => updateData({ image: e.target.value })} placeholder="https://..." />
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                if (type === "about_highlight") {
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
                                                            <div className="space-y-1">
                                                                <Label className="text-xs">Highlight (satu per baris)</Label>
                                                                <Textarea
                                                                    value={(dataSection.highlights ?? []).join("\n")}
                                                                    onChange={(e) =>
                                                                        updateData({
                                                                            highlights: e.target.value
                                                                                .split("\n")
                                                                                .map((v: string) => v.trim())
                                                                                .filter((v: string) => v !== ""),
                                                                        })
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <Label className="text-xs">Gambar (URL)</Label>
                                                                <Input value={dataSection.image ?? ""} onChange={(e) => updateData({ image: e.target.value })} placeholder="https://..." />
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                if (type === "service_overview") {
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
                                                            <div className="space-y-1">
                                                                <Label className="text-xs">Highlight (satu per baris)</Label>
                                                                <Textarea
                                                                    value={(dataSection.highlights ?? []).join("\n")}
                                                                    onChange={(e) =>
                                                                        updateData({
                                                                            highlights: e.target.value
                                                                                .split("\n")
                                                                                .map((v: string) => v.trim())
                                                                                .filter((v: string) => v !== ""),
                                                                        })
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                if (type === "service_hero") {
                                                    return (
                                                        <div className="mt-2 space-y-3">
                                                            <div className="space-y-1">
                                                                <Label className="text-xs">Judul</Label>
                                                                <Input value={dataSection.heading ?? ""} onChange={(e) => updateData({ heading: e.target.value })} />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <Label className="text-xs">Highlight</Label>
                                                                <Input value={dataSection.highlight ?? ""} onChange={(e) => updateData({ highlight: e.target.value })} />
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
                                                            <div className="space-y-1">
                                                                <Label className="text-xs">Gambar Hero (URL)</Label>
                                                                <Input value={dataSection.hero_image ?? ""} onChange={(e) => updateData({ hero_image: e.target.value })} placeholder="https://..." />
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                if (type === "service_faq") {
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
                                                            <div className="space-y-1">
                                                                <Label className="text-xs">FAQ (format: pertanyaan|jawaban, satu per baris)</Label>
                                                                <Textarea
                                                                    value={(dataSection.items ?? [])
                                                                        .map((item: any) => `${item.question ?? ""}|${item.answer ?? ""}`.trim())
                                                                        .join("\n")}
                                                                    onChange={(e) => {
                                                                        const items = e.target.value
                                                                            .split("\n")
                                                                            .map((line) => line.trim())
                                                                            .filter((line) => line !== "")
                                                                            .map((line) => {
                                                                                const [question, answer] = line.split("|");
                                                                                return { question: question?.trim() ?? "", answer: answer?.trim() ?? "" };
                                                                            })
                                                                            .filter((item) => item.question || item.answer);
                                                                        updateData({ items });
                                                                    }}
                                                                />
                                                            </div>
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

                                                return (
                                                    <div className="mt-2 space-y-1">
                                                        <Label className="text-xs">Konten</Label>
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
