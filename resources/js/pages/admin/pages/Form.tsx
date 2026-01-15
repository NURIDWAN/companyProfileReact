import InputError from '@/components/input-error';
import { SectionBlock, SectionFormData } from '@/components/SectionBlock';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Layers, PlusCircle, Settings2 } from 'lucide-react';
import { FormEventHandler, useMemo, useState } from 'react';

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

type MenuItemOption = {
    id: number;
    title: string;
};

type MenuItemsByPosition = {
    main: MenuItemOption[];
    header: MenuItemOption[];
    footer: MenuItemOption[];
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
    menuItems?: MenuItemsByPosition;
}

type PageFormData = {
    parent_id: number | null;
    title: string;
    slug: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    is_published: boolean;
    published_at: string;
    display_order: number;
    sections: SectionFormData[];
    add_to_menu: boolean;
    menu_position: string;
    menu_parent_id: number | null;
};

function slugify(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

const sectionTypes = [
    { value: 'plain', label: 'Konten Biasa (HTML)' },

    // Home
    { value: 'hero_home', label: 'Home - Hero' },
    { value: 'about_intro', label: 'Home - About Summary' },
    { value: 'service_overview', label: 'Home - Service Highlight' },
    { value: 'why_us', label: 'Home - Why Choose Us' },
    { value: 'testimonials_home', label: 'Home - Testimonials' },
    { value: 'metrics_home', label: 'Home - Metrics/Stats' },
    { value: 'blog_preview', label: 'Home - Blog Preview' },
    { value: 'cta_home', label: 'Home - CTA' },

    // About
    { value: 'about_overview', label: 'About - Overview' },
    { value: 'about_vision', label: 'About - Visi & Misi' },
    { value: 'about_values', label: 'About - Values' },
    { value: 'about_statistics', label: 'About - Stats' },
    { value: 'about_team', label: 'About - Team' },
    { value: 'about_cta', label: 'About - CTA' },

    // Service
    { value: 'service_hero', label: 'Service - Hero' },
    { value: 'service_summary', label: 'Service - Summary' },
    { value: 'service_offerings', label: 'Service - Offerings' },
    { value: 'service_tech_stack', label: 'Service - Tech Stack' },
    { value: 'service_process', label: 'Service - Process' },
    { value: 'service_advantages', label: 'Service - Advantages' },
    { value: 'service_faqs', label: 'Service - FAQ' },

    // Product
    { value: 'product_hero', label: 'Product - Hero' },
    { value: 'product_features', label: 'Product - Features' },
    { value: 'product_gallery', label: 'Product - Gallery' },

    // Career
    { value: 'career_hero', label: 'Career - Hero' },
    { value: 'career_benefits', label: 'Career - Benefits' },
    { value: 'career_positions', label: 'Career - Positions' },

    // Contact
    { value: 'contact_info', label: 'Contact - Info' },
    { value: 'contact_map', label: 'Contact - Map' },

    // General UI
    { value: 'gallery', label: 'UI - Gallery' },
    { value: 'accordion', label: 'UI - Accordion' },
    { value: 'tabs', label: 'UI - Tabs' },
    { value: 'timeline', label: 'UI - Timeline' },
];

export default function PageForm({ page, parents = [], menuItems }: Props) {
    const title = page ? 'Edit Halaman' : 'Tambah Halaman';
    const isEditing = !!page;

    const inferType = (section: SectionPayload): string => {
        const slug = (section.slug ?? '').toLowerCase();

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

        return 'plain';
    };

    const parseContent = (content?: string | null) => {
        if (!content) return { type: 'plain', data: {}, raw: '' };
        try {
            const parsed = JSON.parse(content);
            if (parsed && typeof parsed === 'object' && parsed.__type) {
                const { __type, ...rest } = parsed;
                return { type: __type as string, data: rest, raw: content };
            }
            return { type: 'plain', data: {}, raw: content };
        } catch {
            return { type: 'plain', data: {}, raw: content };
        }
    };

    const serializeContent = (section: SectionPayload) => {
        if (section.type && section.type !== 'plain') {
            const cleaned = { ...(section.data ?? {}) };
            delete (cleaned as any).__type;
            return JSON.stringify({ __type: section.type, ...cleaned });
        }
        return section.content ?? '';
    };

    const form = useForm<PageFormData>({
        parent_id: page?.parent_id ?? null,
        title: page?.title ?? '',
        slug: page?.slug ?? '',
        meta_title: page?.meta_title ?? '',
        meta_description: page?.meta_description ?? '',
        meta_keywords: page?.meta_keywords?.join(', ') ?? '',
        is_published: page?.status === 'published',
        published_at: page?.published_at?.slice(0, 16) ?? '',
        display_order: page?.display_order ?? 0,
        sections:
            page?.sections?.map((section) => ({
                id: section.id,
                title: section.title,
                slug: section.slug,
                content: section.content ?? '',
                display_order: section.display_order ?? 0,
                is_active: section.is_active ?? true,
                type: parseContent(section.content).type || inferType(section),
                data: parseContent(section.content).data,
            })) ?? [],
        // Menu options (only for new pages)
        add_to_menu: false,
        menu_position: 'main',
        menu_parent_id: null,
    });

    const [slugEdited, setSlugEdited] = useState(!!page?.slug);
    const { data, processing, errors } = form;
    const setData = form.setData as (key: keyof PageFormData, value: any) => void;

    const action = useMemo(() => {
        return page ? route('admin.pages.update', page.id) : route('admin.pages.store');
    }, [page]);

    const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        form.transform((payload) => {
            const transformed = { ...payload };
            const sections = (payload.sections ?? []).map((section) => ({
                ...section,
                content: serializeContent(section),
            }));
            return page ? { ...transformed, sections, _method: 'put' } : { ...transformed, sections };
        });

        form.post(action, {
            preserveScroll: true,
        });
    };

    const handleTitleChange = (value: string) => {
        setData('title', value);
        if (!slugEdited) {
            setData('slug', slugify(value));
        }
    };

    const addSection = () => {
        setData('sections', [
            ...(data.sections ?? []),
            {
                id: undefined,
                title: '',
                slug: '',
                content: '',
                display_order: data.sections?.length ?? 0,
                is_active: true,
                type: 'plain',
                data: {},
            },
        ]);
    };

    const updateSection = (index: number, section: SectionFormData) => {
        const updated = [...(data.sections ?? [])];
        updated[index] = section;
        setData('sections', updated);
    };

    const deleteSection = (index: number) => {
        const updated = [...(data.sections ?? [])];
        updated.splice(index, 1);
        const normalized = updated.map((s, idx) => ({ ...s, display_order: idx }));
        setData('sections', normalized);
    };

    const moveSection = (index: number, direction: 'up' | 'down') => {
        const updated = [...(data.sections ?? [])];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= updated.length) return;
        [updated[index], updated[targetIndex]] = [updated[targetIndex], updated[index]];
        const normalized = updated.map((s, idx) => ({ ...s, display_order: idx }));
        setData('sections', normalized);
    };

    return (
        <AppLayout>
            <Head title={title} />
            <div className="space-y-6 p-4">
                <div className="mb-2">
                    <Link href={route('admin.pages.index')} className="text-sm text-muted-foreground hover:text-foreground">
                        &larr; Kembali ke daftar halaman
                    </Link>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="space-y-6 lg:col-span-2">
                            {/* Page Title Card */}
                            <Card>
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center gap-2">
                                        <Layers className="h-5 w-5" />
                                        {title}
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                        Kelola konten statis seperti Tentang, Kebijakan Privasi, atau halaman informatif lain.
                                    </p>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Judul Halaman</Label>
                                            <Input
                                                id="title"
                                                value={data.title}
                                                onChange={(e) => handleTitleChange(e.target.value)}
                                                placeholder="Contoh: Kebijakan Privasi"
                                                className="h-10"
                                            />
                                            <InputError message={errors.title} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="slug">Slug URL</Label>
                                            <Input
                                                id="slug"
                                                value={data.slug}
                                                onChange={(e) => {
                                                    setSlugEdited(true);
                                                    setData('slug', slugify(e.target.value));
                                                }}
                                                placeholder="kebijakan-privasi"
                                                className="h-10"
                                            />
                                            <InputError message={errors.slug} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Sections */}
                            <Card>
                                <CardHeader className="pb-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>Sections / Blocks</CardTitle>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Tambahkan section yang akan menjadi konten halaman ini.
                                            </p>
                                        </div>
                                        <Button type="button" onClick={addSection} size="sm">
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            Tambah Section
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {(data.sections ?? []).length === 0 ? (
                                        <div className="rounded-lg border-2 border-dashed py-12 text-center">
                                            <Layers className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                            <h3 className="mt-4 text-lg font-medium">Belum ada section</h3>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Klik tombol "Tambah Section" untuk menambahkan konten ke halaman ini.
                                            </p>
                                            <Button type="button" onClick={addSection} className="mt-4" variant="outline">
                                                <PlusCircle className="mr-2 h-4 w-4" />
                                                Tambah Section Pertama
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {data.sections.map((section, index) => (
                                                <SectionBlock
                                                    key={section.id ?? index}
                                                    section={section}
                                                    index={index}
                                                    totalSections={data.sections.length}
                                                    sectionTypes={sectionTypes}
                                                    onUpdate={(updated) => updateSection(index, updated)}
                                                    onDelete={() => deleteSection(index)}
                                                    onMoveUp={() => moveSection(index, 'up')}
                                                    onMoveDown={() => moveSection(index, 'down')}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Publish Settings */}
                            <Card>
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <Settings2 className="h-4 w-4" />
                                        Pengaturan
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
                                        <Checkbox
                                            id="is_published"
                                            checked={!!data.is_published}
                                            onCheckedChange={(checked) => setData('is_published', !!checked)}
                                        />
                                        <div>
                                            <label htmlFor="is_published" className="cursor-pointer text-sm font-medium">
                                                Terbitkan Halaman
                                            </label>
                                            <p className="text-xs text-muted-foreground">Halaman akan ditampilkan di website</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="parent">Halaman Induk</Label>
                                        <select
                                            id="parent"
                                            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
                                            value={data.parent_id ?? ''}
                                            onChange={(e) => setData('parent_id', e.target.value === '' ? null : Number(e.target.value))}
                                        >
                                            <option value="">(Tidak ada)</option>
                                            {parents.map((parent) => (
                                                <option key={parent.id} value={parent.id}>
                                                    {parent.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="published_at">Tanggal Publish</Label>
                                        <Input
                                            id="published_at"
                                            type="datetime-local"
                                            value={data.published_at ?? ''}
                                            onChange={(e) => setData('published_at', e.target.value)}
                                            className="h-9"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="display_order">Urutan</Label>
                                        <Input
                                            id="display_order"
                                            type="number"
                                            value={data.display_order}
                                            onChange={(e) => setData('display_order', Number(e.target.value))}
                                            min={0}
                                            className="h-9"
                                        />
                                    </div>

                                    {/* Add to Menu Option - Only show for new pages */}
                                    {!isEditing && menuItems && (
                                        <div className="space-y-3 rounded-lg border bg-muted/30 p-3">
                                            <div className="flex items-center gap-3">
                                                <Checkbox
                                                    id="add_to_menu"
                                                    checked={!!data.add_to_menu}
                                                    onCheckedChange={(checked) => setData('add_to_menu', !!checked)}
                                                />
                                                <div>
                                                    <label htmlFor="add_to_menu" className="cursor-pointer text-sm font-medium">
                                                        Tambahkan ke Menu
                                                    </label>
                                                    <p className="text-xs text-muted-foreground">Otomatis buat menu item untuk halaman ini</p>
                                                </div>
                                            </div>

                                            {data.add_to_menu && (
                                                <div className="space-y-3 border-t pt-2">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="menu_position" className="text-xs">
                                                            Posisi Menu
                                                        </Label>
                                                        <select
                                                            id="menu_position"
                                                            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
                                                            value={data.menu_position}
                                                            onChange={(e) => {
                                                                setData('menu_position', e.target.value);
                                                                setData('menu_parent_id', null);
                                                            }}
                                                        >
                                                            <option value="main">Menu Utama</option>
                                                            <option value="header">Header</option>
                                                            <option value="footer">Footer</option>
                                                        </select>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="menu_parent" className="text-xs">
                                                            Parent Menu (opsional)
                                                        </Label>
                                                        <select
                                                            id="menu_parent"
                                                            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
                                                            value={data.menu_parent_id ?? ''}
                                                            onChange={(e) =>
                                                                setData('menu_parent_id', e.target.value === '' ? null : Number(e.target.value))
                                                            }
                                                        >
                                                            <option value="">(Root level)</option>
                                                            {(menuItems[data.menu_position as keyof MenuItemsByPosition] ?? []).map((item) => (
                                                                <option key={item.id} value={item.id}>
                                                                    {item.title}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit" className="w-full" disabled={processing}>
                                        {processing ? 'Menyimpan...' : page ? 'Simpan Perubahan' : 'Buat Halaman'}
                                    </Button>
                                </CardFooter>
                            </Card>

                            {/* SEO Settings */}
                            <Card>
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-base">SEO & Meta</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="meta_title">Meta Title</Label>
                                        <Input
                                            id="meta_title"
                                            value={data.meta_title}
                                            onChange={(e) => setData('meta_title', e.target.value)}
                                            placeholder="Judul SEO (opsional)"
                                            className="h-9"
                                        />
                                        <InputError message={errors.meta_title} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="meta_description">Meta Description</Label>
                                        <Textarea
                                            id="meta_description"
                                            value={data.meta_description}
                                            onChange={(e) => setData('meta_description', e.target.value)}
                                            placeholder="Deskripsi singkat untuk mesin pencari"
                                            rows={3}
                                        />
                                        <InputError message={errors.meta_description} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="meta_keywords">Meta Keywords</Label>
                                        <Input
                                            id="meta_keywords"
                                            value={data.meta_keywords}
                                            onChange={(e) => setData('meta_keywords', e.target.value)}
                                            placeholder="keyword1, keyword2"
                                            className="h-9"
                                        />
                                        <InputError message={errors.meta_keywords} />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
