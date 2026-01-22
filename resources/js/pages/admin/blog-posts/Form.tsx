import { RichTextEditor } from '@/components/RichTextEditor';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useCallback, useEffect, useMemo, useState } from 'react';

type BlogPost = {
    id: number;
    title: string;
    slug: string;
    excerpt?: string | null;
    body?: string | null;
    cover_image?: string | null;
    cover_image_url?: string | null;
    is_published: boolean;
    published_at?: string | null;
    author_id?: number | null;
    category_id?: number | null;
    category?: { id: number; name: string; slug: string } | null;
    meta_title?: string | null;
    meta_description?: string | null;
    og_title?: string | null;
    cta_variants?: string[] | null;
};

type AiFormState = {
    topic: string;
    tone: string;
    audience: string;
    keywords: string;
    call_to_action: string;
    word_count: string;
    preset: string;
};

type GenerationPayload = {
    title?: string;
    slug?: string;
    excerpt?: string;
    body?: string;
    outline?: string[];
    keywords?: string[];
    meta_title?: string;
    meta_description?: string;
    og_title?: string;
    cta_variants?: string[];
};

type GenerationMeta = {
    outline: string[];
    keywords: string[];
};

const blogPresets: Array<{
    id: string;
    label: string;
    tone: string;
    audience: string;
    call_to_action: string;
    description: string;
}> = [
    {
        id: 'friendly-startup',
        label: 'Friendly Startup',
        tone: 'hangat, optimistis, penuh energi',
        audience: 'founder startup dan pemilik bisnis digital',
        call_to_action: 'Diskusikan ide Anda dengan tim kami',
        description: 'Cocok untuk artikel ringan dan menginspirasi dengan sentuhan storytelling.',
    },
    {
        id: 'enterprise',
        label: 'Enterprise & Korporasi',
        tone: 'formal, strategis, fokus ROI',
        audience: 'C-level dan direktur perusahaan enterprise',
        call_to_action: 'Jadwalkan sesi konsultasi strategis',
        description: 'Tekankan mitigasi risiko dan dampak bisnis terukur.',
    },
    {
        id: 'public-sector',
        label: 'Sektor Publik',
        tone: 'profesional, mengedepankan kepatuhan',
        audience: 'pejabat pemda/BUMN',
        call_to_action: 'Pelajari cara kami mendampingi instansi Anda',
        description: 'Soroti transparansi, keberlanjutan, dan manfaat sosial.',
    },
];

interface Props {
    post?: BlogPost;
    users?: { id: number; name: string }[];
    categories?: { id: number; name: string; slug: string }[];
}

export default function BlogPostForm({ post, users = [], categories = [] }: Props) {
    const title = post ? 'Edit Artikel' : 'Tulis Artikel';
    const form = useForm({
        author_id: post?.author_id ?? '',
        category_id: post?.category_id ?? '',
        title: post?.title ?? '',
        slug: post?.slug ?? '',
        excerpt: post?.excerpt ?? '',
        body: post?.body ?? '',
        cover_image: post?.cover_image ?? '',
        cover_image_file: undefined as File | undefined,
        is_published: post?.is_published ?? false,
        published_at: post?.published_at?.slice(0, 16) ?? '',
        meta_title: post?.meta_title ?? '',
        meta_description: post?.meta_description ?? '',
        og_title: post?.og_title ?? '',
        cta_variants: post?.cta_variants?.length ? post.cta_variants.join('\n') : '',
    });

    const defaultAiForm = useMemo<AiFormState>(
        () => ({
            topic: post?.title ?? '',
            tone: 'Profesional dan persuasif',
            audience: 'pemilik bisnis dan decision maker perusahaan',
            keywords: '',
            call_to_action: 'Jadwalkan konsultasi dengan tim kami',
            word_count: '700',
            preset: 'friendly-startup',
        }),
        [post],
    );

    const [aiForm, setAiForm] = useState<AiFormState>(defaultAiForm);
    const [aiMeta, setAiMeta] = useState<GenerationMeta>({ outline: [], keywords: [] });
    const [aiError, setAiError] = useState<string | null>(null);
    const [aiSuccess, setAiSuccess] = useState<string | null>(null);
    const [aiLoading, setAiLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [selectedPreset, setSelectedPreset] = useState(defaultAiForm.preset);

    const { data, setData, processing, errors } = form;
    const generalError = (errors as typeof errors & { general?: string }).general;

    const action = useMemo(() => {
        return post ? route('admin.blog-posts.update', post.id) : route('admin.blog-posts.store');
    }, [post]);

    useEffect(() => {
        setAiForm({ ...defaultAiForm });
        setSelectedPreset(defaultAiForm.preset);
    }, [defaultAiForm]);

    const applyGeneration = useCallback(
        (payload: GenerationPayload) => {
            if (payload.title) {
                setData('title', payload.title);
            }

            if (payload.slug) {
                setData('slug', payload.slug);
            }

            if (payload.excerpt) {
                setData('excerpt', payload.excerpt);
            }

            if (payload.body) {
                setData('body', payload.body);
            }

            if (payload.meta_title) {
                setData('meta_title', payload.meta_title);
            }

            if (payload.meta_description) {
                setData('meta_description', payload.meta_description);
            }

            if (payload.og_title) {
                setData('og_title', payload.og_title);
            }

            if (payload.cta_variants?.length) {
                setData('cta_variants', payload.cta_variants.join('\n'));
            }

            setAiMeta({
                outline: payload.outline ?? [],
                keywords: payload.keywords ?? [],
            });

            setAiSuccess('Konten berhasil diisikan dari Gemini. Pastikan untuk meninjaunya sebelum disimpan.');
        },
        [setData],
    );

    const handleGenerate = async () => {
        if (!aiForm.topic.trim()) {
            setAiError('Topik wajib diisi sebelum meminta Gemini.');
            return;
        }

        setAiLoading(true);
        setAiError(null);
        setAiSuccess(null);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';
            const requestBody = {
                ...aiForm,
                word_count: aiForm.word_count ? Number(aiForm.word_count) : undefined,
            };
            const response = await fetch(route('admin.blog-posts.generate'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                credentials: 'same-origin',
                body: JSON.stringify(requestBody),
            });

            const payload = (await response.json()) as {
                status?: string;
                result?: GenerationPayload;
                message?: string;
            };

            if (!response.ok || payload.status === 'failed') {
                throw new Error(payload?.message ?? 'Gagal menggenerate konten dari Gemini.');
            }

            if (payload.status === 'completed' && payload.result) {
                applyGeneration(payload.result);
            } else {
                throw new Error('Response tidak valid dari server.');
            }
        } catch (error) {
            console.error(error);
            setAiError(error instanceof Error ? error.message : 'Terjadi kesalahan saat menghubungi Gemini.');
        } finally {
            setAiLoading(false);
        }
    };

    const handleResetGenerator = () => {
        setAiForm({ ...defaultAiForm });
        setSelectedPreset(defaultAiForm.preset);
        setAiMeta({ outline: [], keywords: [] });
        setAiError(null);
        setAiSuccess(null);
        setAiLoading(false);
    };

    const updateAiForm = <K extends keyof AiFormState>(field: K, value: AiFormState[K]) => {
        setAiForm((prev) => ({ ...prev, [field]: value }));
    };

    const handlePresetChange = (value: string) => {
        setSelectedPreset(value);
        const preset = blogPresets.find((item) => item.id === value);

        setAiForm((prev) => ({
            ...prev,
            preset: value,
            tone: preset?.tone ?? prev.tone,
            audience: preset?.audience ?? prev.audience,
            call_to_action: preset?.call_to_action ?? prev.call_to_action,
        }));
    };

    const submit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        form.transform((formData) => {
            const transformed = {
                ...formData,
                cover_image_file: formData.cover_image_file ?? undefined,
            };

            return post ? { ...transformed, _method: 'put' } : transformed;
        });

        form.post(action, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => {
                setData('cover_image_file', undefined);
                form.transform((data) => data);
            },
        });
    };

    const presetInfo = blogPresets.find((preset) => preset.id === selectedPreset);
    const requestButtonLabel = aiLoading ? 'Memproses...' : 'Generate via Gemini';

    return (
        <AppLayout>
            <Head title={title} />
            <div className="space-y-6 p-4">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                    <Link href={route('admin.blog-posts.index')} className="text-sm text-muted-foreground hover:text-foreground">
                        &larr; Kembali ke daftar artikel
                    </Link>
                    <Button type="button" variant="outline" onClick={() => setPreviewOpen(true)}>
                        Preview
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Generate Konten Otomatis (Gemini)</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Pilih topik dan preferensi lalu biarkan Gemini menyiapkan draft artikel. Anda tetap dapat mengedit hasilnya.
                        </p>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Preset Nada & Audiens</Label>
                            <Select value={selectedPreset} onValueChange={handlePresetChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih preset" />
                                </SelectTrigger>
                                <SelectContent>
                                    {blogPresets.map((preset) => (
                                        <SelectItem key={preset.id} value={preset.id}>
                                            {preset.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                                {presetInfo?.description ?? 'Sesuaikan nada secara manual jika diperlukan.'}
                            </p>
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label htmlFor="ai-topic">Topik Utama</Label>
                            <Input
                                id="ai-topic"
                                value={aiForm.topic}
                                onChange={(event) => updateAiForm('topic', event.target.value)}
                                placeholder="Contoh: Strategi transformasi digital untuk UMKM manufaktur"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="ai-tone">Nada Tulisan</Label>
                            <Input
                                id="ai-tone"
                                value={aiForm.tone}
                                onChange={(event) => updateAiForm('tone', event.target.value)}
                                placeholder="Profesional, meyakinkan, dan bersahabat"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="ai-audience">Audiens</Label>
                            <Input
                                id="ai-audience"
                                value={aiForm.audience}
                                onChange={(event) => updateAiForm('audience', event.target.value)}
                                placeholder="CXO perusahaan teknologi, pemilik bisnis, dsb."
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="ai-call-to-action">Call to Action</Label>
                            <Input
                                id="ai-call-to-action"
                                value={aiForm.call_to_action}
                                onChange={(event) => updateAiForm('call_to_action', event.target.value)}
                                placeholder="Hubungi tim kami untuk konsultasi"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="ai-word-count">Target Kata</Label>
                            <Input
                                id="ai-word-count"
                                type="number"
                                min={300}
                                max={1500}
                                value={aiForm.word_count}
                                onChange={(event) => updateAiForm('word_count', event.target.value)}
                            />
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label htmlFor="ai-keywords">Keyword Utama</Label>
                            <Textarea
                                id="ai-keywords"
                                value={aiForm.keywords}
                                onChange={(event) => updateAiForm('keywords', event.target.value)}
                                placeholder="Pisahkan dengan koma (contoh: transformasi digital, software house, konsultasi IT)"
                            />
                            <p className="text-xs text-muted-foreground">Opsional, membantu Gemini memahami fokus SEO Anda.</p>
                        </div>
                        {(aiMeta.outline.length > 0 || aiMeta.keywords.length > 0) && (
                            <div className="rounded-lg border border-dashed border-muted p-4 md:col-span-2">
                                {aiMeta.outline.length > 0 && (
                                    <div className="mb-3">
                                        <p className="text-sm font-medium text-foreground">Outline yang diusulkan</p>
                                        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                                            {aiMeta.outline.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {aiMeta.keywords.length > 0 && (
                                    <div>
                                        <p className="text-sm font-medium text-foreground">Keyword terkait</p>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {aiMeta.keywords.map((keyword) => (
                                                <span
                                                    key={keyword}
                                                    className="rounded-full border border-muted bg-background px-2 py-0.5 text-xs text-muted-foreground"
                                                >
                                                    {keyword}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1 text-sm">
                            {aiError && <p className="text-rose-500">{aiError}</p>}
                            {!aiError && aiSuccess && <p className="text-emerald-600 dark:text-emerald-400">{aiSuccess}</p>}
                            {!aiError && !aiSuccess && (
                                <p className="text-xs text-muted-foreground">Hasil Gemini akan langsung mengisi form artikel di bawah ini.</p>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button type="button" variant="outline" onClick={handleResetGenerator} disabled={aiLoading}>
                                Reset
                            </Button>
                            <Button type="button" onClick={handleGenerate} disabled={aiLoading}>
                                {requestButtonLabel}
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
                <form onSubmit={submit} encType="multipart/form-data">
                    <Card>
                        <CardHeader>
                            <CardTitle>{title}</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {generalError && (
                                <Alert variant="destructive">
                                    <AlertDescription>{generalError}</AlertDescription>
                                </Alert>
                            )}
                            <div className="grid gap-2">
                                <Label htmlFor="title">Judul</Label>
                                <Input id="title" value={data.title} onChange={(event) => setData('title', event.target.value)} required />
                                {errors.title && <p className="text-xs text-rose-500">{errors.title}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input id="slug" value={data.slug} onChange={(event) => setData('slug', event.target.value)} required />
                                {errors.slug && <p className="text-xs text-rose-500">{errors.slug}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="author_id">Penulis</Label>
                                <select
                                    id="author_id"
                                    className="h-10 rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
                                    value={data.author_id ?? ''}
                                    onChange={(event) => setData('author_id', event.target.value)}
                                >
                                    <option value="">Pilih penulis</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.author_id && <p className="text-xs text-rose-500">{errors.author_id}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="category_id">Kategori</Label>
                                <select
                                    id="category_id"
                                    className="h-10 rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
                                    value={data.category_id ?? ''}
                                    onChange={(event) => setData('category_id', event.target.value)}
                                >
                                    <option value="">Pilih kategori</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && <p className="text-xs text-rose-500">{errors.category_id}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="excerpt">Ringkasan</Label>
                                <Textarea
                                    id="excerpt"
                                    className="min-h-[100px]"
                                    value={data.excerpt ?? ''}
                                    onChange={(event) => setData('excerpt', event.target.value)}
                                />
                                {errors.excerpt && <p className="text-xs text-rose-500">{errors.excerpt}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="body">Konten</Label>
                                <RichTextEditor
                                    value={data.body ?? ''}
                                    onChange={(value) => setData('body', value)}
                                    placeholder="Tulis artikel dengan heading, list, dan paragraf kaya."
                                />
                                {errors.body && <p className="text-xs text-rose-500">{errors.body}</p>}
                            </div>
                            <div className="space-y-4 rounded-lg border border-dashed border-muted p-4">
                                <div>
                                    <p className="text-sm font-medium text-foreground">SEO & CTA Otomatis</p>
                                    <p className="text-xs text-muted-foreground">
                                        Gemini mengisi bagian ini, namun Anda tetap dapat menyesuaikannya.
                                    </p>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="meta_title">Meta Title</Label>
                                    <Input
                                        id="meta_title"
                                        value={data.meta_title ?? ''}
                                        onChange={(event) => setData('meta_title', event.target.value)}
                                    />
                                    {errors.meta_title && <p className="text-xs text-rose-500">{errors.meta_title}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="meta_description">Meta Description</Label>
                                    <Textarea
                                        id="meta_description"
                                        className="min-h-[100px]"
                                        value={data.meta_description ?? ''}
                                        onChange={(event) => setData('meta_description', event.target.value)}
                                    />
                                    {errors.meta_description && <p className="text-xs text-rose-500">{errors.meta_description}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="og_title">OG Title</Label>
                                    <Input id="og_title" value={data.og_title ?? ''} onChange={(event) => setData('og_title', event.target.value)} />
                                    {errors.og_title && <p className="text-xs text-rose-500">{errors.og_title}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="cta_variants">CTA Variants (pisahkan dengan enter)</Label>
                                    <Textarea
                                        id="cta_variants"
                                        className="min-h-[80px]"
                                        value={data.cta_variants ?? ''}
                                        onChange={(event) => setData('cta_variants', event.target.value)}
                                    />
                                    {errors.cta_variants && <p className="text-xs text-rose-500">{errors.cta_variants}</p>}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="cover_image_file">Cover Image</Label>
                                <Input
                                    id="cover_image_file"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => setData('cover_image_file', event.target.files?.[0])}
                                />
                                {errors.cover_image_file && <p className="text-xs text-rose-500">{errors.cover_image_file}</p>}
                                {post?.cover_image_url && data.cover_image !== '' && (
                                    <div className="flex items-center gap-4">
                                        <img src={post.cover_image_url} alt={post.title} className="h-16 w-16 rounded object-cover" />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setData('cover_image', '');
                                                setData('cover_image_file', undefined);
                                            }}
                                        >
                                            Hapus Cover
                                        </Button>
                                    </div>
                                )}
                                {errors.cover_image && <p className="text-xs text-rose-500">{errors.cover_image}</p>}
                            </div>
                            <div className="grid gap-2 md:grid-cols-2">
                                <div className="flex items-center gap-2">
                                    <Checkbox checked={data.is_published} onCheckedChange={(checked) => setData('is_published', Boolean(checked))} />
                                    <span>Terbitkan</span>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="published_at">Tanggal Publish</Label>
                                    <Input
                                        id="published_at"
                                        type="datetime-local"
                                        value={data.published_at ?? ''}
                                        onChange={(event) => setData('published_at', event.target.value)}
                                    />
                                    {errors.published_at && <p className="text-xs text-rose-500">{errors.published_at}</p>}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button type="submit" disabled={processing}>
                                {post ? 'Simpan Perubahan' : 'Simpan'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Preview Artikel</DialogTitle>
                    </DialogHeader>
                    <div className="max-h-[70vh] space-y-4 overflow-y-auto">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Pratinjau ini menggunakan data yang belum disimpan untuk membantu proses kurasi.
                            </p>
                        </div>
                        <div className="space-y-3 rounded-2xl border bg-white/50 p-4 dark:border-white/10 dark:bg-slate-900/40">
                            <span className="text-xs font-semibold tracking-[0.3em] text-blue-500 uppercase">Blog Preview</span>
                            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{data.title || 'Judul artikel'}</h2>
                            <p className="text-muted-foreground">{data.excerpt || 'Ringkasan artikel akan tampil di sini.'}</p>
                            <div className="prose dark:prose-invert max-w-none rounded-xl border bg-background/50 p-4 dark:border-white/5">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: data.body && data.body.trim().length > 0 ? data.body : '<p>Konten artikel akan muncul di sini.</p>',
                                    }}
                                />
                            </div>
                            {data.cta_variants && data.cta_variants.trim().length > 0 && (
                                <div>
                                    <p className="text-sm font-medium text-foreground">CTA Variants</p>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {data.cta_variants
                                            .split(/\r?\n/)
                                            .filter(Boolean)
                                            .map((cta) => (
                                                <span
                                                    key={cta}
                                                    className="rounded-full border border-blue-200 px-3 py-1 text-xs text-blue-600 dark:border-blue-500/40 dark:text-blue-200"
                                                >
                                                    {cta}
                                                </span>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
