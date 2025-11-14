import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/RichTextEditor";

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
};

type AiFormState = {
    topic: string;
    tone: string;
    audience: string;
    keywords: string;
    call_to_action: string;
    word_count: string;
};

type GenerationPayload = {
    title?: string;
    slug?: string;
    excerpt?: string;
    body?: string;
    outline?: string[];
    keywords?: string[];
};

type GenerationMeta = {
    outline: string[];
    keywords: string[];
};

interface Props {
    post?: BlogPost;
    users?: { id: number; name: string }[];
}

export default function BlogPostForm({ post, users = [] }: Props) {
    const title = post ? "Edit Artikel" : "Tulis Artikel";
    const form = useForm({
        author_id: post?.author_id ?? "",
        title: post?.title ?? "",
        slug: post?.slug ?? "",
        excerpt: post?.excerpt ?? "",
        body: post?.body ?? "",
        cover_image: post?.cover_image ?? "",
        cover_image_file: undefined as File | undefined,
        is_published: post?.is_published ?? false,
        published_at: post?.published_at?.slice(0, 16) ?? "",
    });

    const defaultAiForm = useMemo<AiFormState>(
        () => ({
            topic: post?.title ?? "",
            tone: "Profesional dan persuasif",
            audience: "pemilik bisnis dan decision maker perusahaan",
            keywords: "",
            call_to_action: "Jadwalkan konsultasi dengan tim kami",
            word_count: "700",
        }),
        [post],
    );

    const [aiForm, setAiForm] = useState<AiFormState>(defaultAiForm);
    const [aiMeta, setAiMeta] = useState<GenerationMeta>({ outline: [], keywords: [] });
    const [aiError, setAiError] = useState<string | null>(null);
    const [aiSuccess, setAiSuccess] = useState<string | null>(null);
    const [aiLoading, setAiLoading] = useState(false);

    const { data, setData, processing, errors } = form;
    const generalError = (errors as typeof errors & { general?: string }).general;

    const action = useMemo(() => {
        return post ? route("admin.blog-posts.update", post.id) : route("admin.blog-posts.store");
    }, [post]);

    useEffect(() => {
        setAiForm({ ...defaultAiForm });
    }, [defaultAiForm]);

    const applyGeneration = (payload: GenerationPayload) => {
        if (payload.title) {
            setData("title", payload.title);
        }

        if (payload.slug) {
            setData("slug", payload.slug);
        }

        if (payload.excerpt) {
            setData("excerpt", payload.excerpt);
        }

        if (payload.body) {
            setData("body", payload.body);
        }

        setAiMeta({
            outline: payload.outline ?? [],
            keywords: payload.keywords ?? [],
        });

        setAiSuccess("Konten berhasil diisikan dari Gemini. Pastikan untuk meninjaunya sebelum disimpan.");
    };

    const handleGenerate = async () => {
        if (!aiForm.topic.trim()) {
            setAiError("Topik wajib diisi sebelum meminta Gemini.");
            return;
        }

        setAiLoading(true);
        setAiError(null);
        setAiSuccess(null);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") ?? "";
            const requestBody = {
                ...aiForm,
                word_count: aiForm.word_count ? Number(aiForm.word_count) : undefined,
            };
            const response = await fetch(route("admin.blog-posts.generate"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify(requestBody),
            });

            let payload: (GenerationPayload & { message?: string }) | null = null;

            try {
                payload = (await response.json()) as GenerationPayload & { message?: string };
            } catch (error) {
                console.error(error);
            }

            if (!response.ok || !payload) {
                throw new Error(payload?.message ?? "Gagal menghasilkan konten dari Gemini.");
            }

            applyGeneration(payload);
        } catch (error) {
            console.error(error);
            setAiError(error instanceof Error ? error.message : "Terjadi kesalahan saat menghubungi Gemini.");
        } finally {
            setAiLoading(false);
        }
    };

    const handleResetGenerator = () => {
        setAiForm({ ...defaultAiForm });
        setAiMeta({ outline: [], keywords: [] });
        setAiError(null);
        setAiSuccess(null);
    };

    const updateAiForm = <K extends keyof AiFormState>(field: K, value: AiFormState[K]) => {
        setAiForm((prev) => ({ ...prev, [field]: value }));
    };

    const submit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        form.transform((formData) => {
            const transformed = {
                ...formData,
                cover_image_file: formData.cover_image_file ?? undefined,
            };

            return post ? { ...transformed, _method: "put" } : transformed;
        });

        form.post(action, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => {
                setData("cover_image_file", undefined);
                form.transform((data) => data);
            },
        });
    };

    return (
        <AppLayout>
            <Head title={title} />
            <div className="space-y-6 p-4">
                <div className="mb-2">
                    <Link href={route("admin.blog-posts.index")} className="text-sm text-muted-foreground hover:text-foreground">
                        &larr; Kembali ke daftar artikel
                    </Link>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Generate Konten Otomatis (Gemini)</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Pilih topik dan preferensi lalu biarkan Gemini menyiapkan draft artikel. Anda tetap dapat mengedit hasilnya.
                        </p>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="md:col-span-2 grid gap-2">
                            <Label htmlFor="ai-topic">Topik Utama</Label>
                            <Input
                                id="ai-topic"
                                value={aiForm.topic}
                                onChange={(event) => updateAiForm("topic", event.target.value)}
                                placeholder="Contoh: Strategi transformasi digital untuk UMKM manufaktur"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="ai-tone">Nada Tulisan</Label>
                            <Input
                                id="ai-tone"
                                value={aiForm.tone}
                                onChange={(event) => updateAiForm("tone", event.target.value)}
                                placeholder="Profesional, meyakinkan, dan bersahabat"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="ai-audience">Audiens</Label>
                            <Input
                                id="ai-audience"
                                value={aiForm.audience}
                                onChange={(event) => updateAiForm("audience", event.target.value)}
                                placeholder="CXO perusahaan teknologi, pemilik bisnis, dsb."
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="ai-call-to-action">Call to Action</Label>
                            <Input
                                id="ai-call-to-action"
                                value={aiForm.call_to_action}
                                onChange={(event) => updateAiForm("call_to_action", event.target.value)}
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
                                onChange={(event) => updateAiForm("word_count", event.target.value)}
                            />
                        </div>
                        <div className="md:col-span-2 grid gap-2">
                            <Label htmlFor="ai-keywords">Keyword Utama</Label>
                            <Textarea
                                id="ai-keywords"
                                value={aiForm.keywords}
                                onChange={(event) => updateAiForm("keywords", event.target.value)}
                                placeholder="Pisahkan dengan koma (contoh: transformasi digital, software house, konsultasi IT)"
                            />
                            <p className="text-xs text-muted-foreground">Opsional, membantu Gemini memahami fokus SEO Anda.</p>
                        </div>
                        {(aiMeta.outline.length > 0 || aiMeta.keywords.length > 0) && (
                            <div className="md:col-span-2 rounded-lg border border-dashed border-muted p-4">
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
                            {aiSuccess && <p className="text-emerald-600 dark:text-emerald-400">{aiSuccess}</p>}
                            {!aiError && !aiSuccess && (
                                <p className="text-xs text-muted-foreground">
                                    Hasil Gemini akan langsung mengisi form artikel di bawah ini.
                                </p>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button type="button" variant="outline" onClick={handleResetGenerator} disabled={aiLoading}>
                                Reset
                            </Button>
                            <Button type="button" onClick={handleGenerate} disabled={aiLoading}>
                                {aiLoading ? "Meminta Gemini..." : "Generate via Gemini"}
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
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(event) => setData("title", event.target.value)}
                                    required
                                />
                                {errors.title && <p className="text-xs text-rose-500">{errors.title}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input
                                    id="slug"
                                    value={data.slug}
                                    onChange={(event) => setData("slug", event.target.value)}
                                    required
                                />
                                {errors.slug && <p className="text-xs text-rose-500">{errors.slug}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="author_id">Penulis</Label>
                                <select
                                    id="author_id"
                                    className="h-10 rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    value={data.author_id ?? ""}
                                    onChange={(event) => setData("author_id", event.target.value)}
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
                                <Label htmlFor="excerpt">Ringkasan</Label>
                                <Textarea
                                    id="excerpt"
                                    className="min-h-[100px]"
                                    value={data.excerpt ?? ""}
                                    onChange={(event) => setData("excerpt", event.target.value)}
                                />
                                {errors.excerpt && <p className="text-xs text-rose-500">{errors.excerpt}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="body">Konten</Label>
                                <RichTextEditor
                                    value={data.body ?? ''}
                                    onChange={(value) => setData("body", value)}
                                    placeholder="Tulis artikel dengan heading, list, dan paragraf kaya."
                                />
                                {errors.body && <p className="text-xs text-rose-500">{errors.body}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="cover_image_file">Cover Image</Label>
                                <Input
                                    id="cover_image_file"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => setData("cover_image_file", event.target.files?.[0])}
                                />
                                {errors.cover_image_file && <p className="text-xs text-rose-500">{errors.cover_image_file}</p>}
                                {post?.cover_image_url && data.cover_image !== "" && (
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={post.cover_image_url}
                                            alt={post.title}
                                            className="h-16 w-16 rounded object-cover"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setData("cover_image", "");
                                                setData("cover_image_file", undefined);
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
                                    <Checkbox
                                        checked={data.is_published}
                                        onCheckedChange={(checked) => setData("is_published", Boolean(checked))}
                                    />
                                    <span>Terbitkan</span>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="published_at">Tanggal Publish</Label>
                                    <Input
                                        id="published_at"
                                        type="datetime-local"
                                        value={data.published_at ?? ""}
                                        onChange={(event) => setData("published_at", event.target.value)}
                                    />
                                    {errors.published_at && <p className="text-xs text-rose-500">{errors.published_at}</p>}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button type="submit" disabled={processing}>
                                {post ? "Simpan Perubahan" : "Simpan"}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
