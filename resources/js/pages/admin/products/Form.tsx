import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useCallback, useEffect, useMemo, useState } from "react";
import { RichTextEditor } from "@/components/RichTextEditor";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Product = {
    id: number;
    name: string;
    slug: string;
    cover_image?: string | null;
    cover_image_url?: string | null;
    thumbnail?: string | null;
    thumbnail_url?: string | null;
    excerpt?: string | null;
    description?: string | null;
    features?: string[] | null;
    marketing_summary?: string | null;
    marketing_highlights?: string[] | null;
    faqs?: Array<{ question: string; answer: string }> | null;
    meta_title?: string | null;
    meta_description?: string | null;
    og_title?: string | null;
    cta_variants?: string[] | null;
    price?: number | null;
    price_variants?: Array<{
        name?: string | null;
        price?: number | null;
        compare_at_price?: number | null;
        sku?: string | null;
        stock?: number | null;
    }> | null;
    gallery?: string[] | null;
    purchase_url?: string | null;
    whatsapp_number?: string | null;
    category?: string | null;
    clients?: number | null;
    rating?: number | null;
    popular?: boolean | null;
    demo?: boolean | null;
    is_active: boolean;
};

interface Props {
    product?: Product;
}

type FaqItem = { question: string; answer: string };

type AiFormState = {
    target_market: string;
    tone: string;
    value_proposition: string;
    call_to_action: string;
    preset: string;
};

type EnrichmentPayload = {
    marketing_summary?: string;
    highlights?: string[];
    faqs?: FaqItem[];
    description?: string;
    meta_title?: string;
    meta_description?: string;
    cta_variants?: string[];
};

const productPresets: Array<{
    id: string;
    label: string;
    target_market: string;
    tone: string;
    value_proposition: string;
    call_to_action: string;
    description: string;
}> = [
    {
        id: "saas-scaleup",
        label: "SaaS Scale-up",
        target_market: "startup dan scale-up teknologi di Asia Tenggara",
        tone: "optimistis, data-driven, dan profesional",
        value_proposition: "implementasi kustom yang cepat dengan dukungan tim lokal",
        call_to_action: "Diskusikan kebutuhan platform Anda bersama tim kami",
        description: "Tekankan time-to-market cepat dan dukungan kustomisasi untuk produk digital.",
    },
    {
        id: "enterprise-modernization",
        label: "Modernisasi Enterprise",
        target_market: "divisi transformasi digital perusahaan enterprise",
        tone: "formal, solutif, fokus pada mitigasi risiko",
        value_proposition: "konsultasi end-to-end dengan tata kelola dan keamanan kelas enterprise",
        call_to_action: "Jadwalkan sesi konsultasi strategi modernisasi",
        description: "Soroti keandalan, compliance, dan support panjang.",
    },
    {
        id: "public-sector",
        label: "Sektor Publik",
        target_market: "pemerintah daerah / BUMN",
        tone: "tegas, akuntabel, menekankan dampak sosial",
        value_proposition: "solusi digital transparan dengan onboarding dan pelatihan tim lapangan",
        call_to_action: "Pelajari bagaimana kami membantu instansi Anda",
        description: "Fokus pada kepatuhan regulasi, pelayanan publik, dan keberlanjutan.",
    },
];

export default function ProductForm({ product }: Props) {
    const title = product ? "Edit Produk" : "Tambah Produk";
    const initialVariants = (product?.price_variants ?? []).map((variant) => ({
        name: variant?.name ?? "",
        price: variant?.price != null ? String(variant.price) : "",
        compare_at_price: variant?.compare_at_price != null ? String(variant.compare_at_price) : "",
        sku: variant?.sku ?? "",
        stock: variant?.stock != null ? String(variant.stock) : "",
    }));
    const initialGallery = product?.gallery?.length ? product.gallery : [""];
    const form = useForm({
        name: product?.name ?? "",
        slug: product?.slug ?? "",
        cover_image: product?.cover_image ?? "",
        cover_image_file: undefined as File | undefined,
        thumbnail: product?.thumbnail ?? "",
        thumbnail_file: undefined as File | undefined,
        gallery: initialGallery,
        gallery_files: [] as File[],
        excerpt: product?.excerpt ?? "",
        description: product?.description ?? "",
        marketing_summary: product?.marketing_summary ?? "",
        marketing_highlights: (product?.marketing_highlights ?? []).join("\n"),
        meta_title: product?.meta_title ?? "",
        meta_description: product?.meta_description ?? "",
        og_title: product?.og_title ?? "",
        cta_variants: product?.cta_variants?.length ? product.cta_variants.join("\n") : "",
        features: (product?.features ?? []).join("\n"),
        category: product?.category ?? "",
        price: product?.price ? String(product.price) : "",
        price_variants: initialVariants.length ? initialVariants : [
            { name: "", price: "", compare_at_price: "", sku: "", stock: "" },
        ],
        purchase_url: product?.purchase_url ?? "",
        whatsapp_number: product?.whatsapp_number ?? "",
        clients: product?.clients ? String(product.clients) : "",
        rating: product?.rating ? String(product.rating) : "",
        popular: product?.popular ?? false,
        demo: product?.demo ?? false,
        is_active: product?.is_active ?? true,
        faqs: product?.faqs?.length ? product.faqs : [{ question: "", answer: "" }],
    });

    const { data, setData, processing, errors } = form;
    const defaultAiForm = useMemo<AiFormState>(
        () => ({
            target_market: product?.category ?? "Perusahaan lintas industri di Indonesia",
            tone: "Profesional dan meyakinkan",
            value_proposition: "Layanan digital end-to-end yang fleksibel",
            call_to_action: "Diskusikan kebutuhan Anda bersama tim kami",
            preset: "saas-scaleup",
        }),
        [product],
    );
    const [aiForm, setAiForm] = useState<AiFormState>(defaultAiForm);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState<string | null>(null);
    const [aiSuccess, setAiSuccess] = useState<string | null>(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [selectedPreset, setSelectedPreset] = useState(defaultAiForm.preset);
    const [geminiStatus, setGeminiStatus] = useState<{ status: string; message?: string } | null>(null);
    const [pollingId, setPollingId] = useState<string | null>(null);
    const generalError = (errors as typeof errors & { general?: string }).general;

    useEffect(() => {
        if (!product) {
            const trimmed = data.name.trim();
            const slug = trimmed
                ? trimmed
                      .toLowerCase()
                      .replace(/[^a-z0-9\s-]/g, "")
                      .replace(/\s+/g, "-")
                      .replace(/-+/g, "-")
                : "";
            setData("slug", slug);
        }
    }, [data.name, product, setData]);
    useEffect(() => {
        setAiForm(defaultAiForm);
        setSelectedPreset(defaultAiForm.preset);
    }, [defaultAiForm]);
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch(route("admin.gemini.status"), {
                    headers: {
                        Accept: "application/json",
                    },
                });

                if (response.ok) {
                    const payload = (await response.json()) as { status: string; message?: string };
                    setGeminiStatus(payload);
                }
            } catch (error) {
                console.warn("Tidak dapat memuat status Gemini", error);
            }
        };

        fetchStatus();
    }, []);
    const fieldError = (field: string) => (errors as Record<string, string | undefined>)[field];
    const galleryUrls = (data.gallery ?? []).length ? data.gallery ?? [] : [""];
    const variantRows =
        (data.price_variants ?? []).length
            ? data.price_variants ?? []
            : [{ name: "", price: "", compare_at_price: "", sku: "", stock: "" }];
    const faqRows: FaqItem[] =
        Array.isArray(data.faqs) && data.faqs.length ? (data.faqs as FaqItem[]) : [{ question: "", answer: "" }];

    const handleGalleryChange = (index: number, value: string) => {
        const updated = [...galleryUrls];
        updated[index] = value;
        setData("gallery", updated);
    };

    const addGalleryRow = () => {
        setData("gallery", [...galleryUrls, ""]);
    };

    const removeGalleryRow = (index: number) => {
        const updated = galleryUrls.filter((_, idx) => idx !== index);
        setData("gallery", updated.length ? updated : [""]);
    };

    const updateVariant = (index: number, field: string, value: string) => {
        const updated = variantRows.map((variant, idx) =>
            idx === index ? { ...variant, [field]: value } : variant,
        );

        setData("price_variants", updated);
    };

    const addVariantRow = () => {
        setData("price_variants", [
            ...variantRows,
            { name: "", price: "", compare_at_price: "", sku: "", stock: "" },
        ]);
    };

    const removeVariantRow = (index: number) => {
        const updated = variantRows.filter((_, idx) => idx !== index);
        setData(
            "price_variants",
            updated.length ? updated : [{ name: "", price: "", compare_at_price: "", sku: "", stock: "" }],
        );
    };

    const updateFaq = (index: number, field: keyof FaqItem, value: string) => {
        const updated = faqRows.map((faq, idx) =>
            idx === index ? { ...faq, [field]: value } : faq,
        );

        setData("faqs", updated);
    };

    const addFaqRow = () => {
        setData("faqs", [...faqRows, { question: "", answer: "" }]);
    };

    const removeFaqRow = (index: number) => {
        const updated = faqRows.filter((_, idx) => idx !== index);
        setData("faqs", updated.length ? updated : [{ question: "", answer: "" }]);
    };

    const applyEnrichment = useCallback((payload: EnrichmentPayload) => {
        if (payload.description) {
            setData("description", payload.description);
        }

        if (payload.marketing_summary) {
            setData("marketing_summary", payload.marketing_summary);
        }

        if (payload.highlights?.length) {
            setData("marketing_highlights", payload.highlights.join("\n"));
        }

        if (payload.faqs?.length) {
            setData("faqs", payload.faqs);
        }

        if (payload.meta_title) {
            setData("meta_title", payload.meta_title);
        }

        if (payload.meta_description) {
            setData("meta_description", payload.meta_description);
        }

        if (payload.cta_variants?.length) {
            setData("cta_variants", payload.cta_variants.join("\n"));
        }

        setAiSuccess("Konten berhasil diisikan dari Gemini. Silakan tinjau sebelum disimpan.");
        setAiError(null);
    }, [setData]);

    const pollGeminiRequest = useCallback((requestId: string) => {
        const poll = async () => {
            try {
                const response = await fetch(route("admin.gemini-requests.show", requestId), {
                    headers: {
                        Accept: "application/json",
                    },
                });

                const payload = (await response.json()) as {
                    status: string;
                    result?: EnrichmentPayload;
                    error_message?: string;
                };

                if (payload.status === "completed" && payload.result) {
                    applyEnrichment(payload.result);
                    setAiLoading(false);
                    setPollingId(null);
                } else if (payload.status === "failed") {
                    setAiError(payload.error_message ?? "Permintaan Gemini gagal diproses.");
                    setAiLoading(false);
                    setPollingId(null);
                } else {
                    setTimeout(poll, 1500);
                }
            } catch (error) {
                console.error(error);
                setAiError("Gagal memeriksa status permintaan Gemini.");
                setAiLoading(false);
                setPollingId(null);
            }
        };

        poll();
    }, [applyEnrichment]);

    const handleGenerateGemini = async () => {
        if (!data.name.trim()) {
            setAiError("Nama produk wajib diisi sebelum meminta Gemini.");
            return;
        }

        setAiLoading(true);
        setAiError(null);
        setAiSuccess(null);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") ?? "";
            const featureList = data.features
                ? data.features
                      .split(/\r?\n/)
                      .map((item) => item.trim())
                      .filter((item) => item.length > 0)
                : [];

            const response = await fetch(route("admin.products.enrich"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify({
                    ...aiForm,
                    name: data.name,
                    category: data.category,
                    description: data.description,
                    price: data.price ? Number(data.price) : undefined,
                    features: featureList,
                }),
            });

            const payload = (await response.json()) as { request_id?: string; message?: string };

            if (!response.ok || !payload?.request_id) {
                throw new Error(payload?.message ?? "Gagal mengantrekan permintaan ke Gemini.");
            }

            setPollingId(payload.request_id);
            pollGeminiRequest(payload.request_id);
        } catch (error) {
            console.error(error);
            setAiError(error instanceof Error ? error.message : "Terjadi kesalahan saat menghubungi Gemini.");
            setAiLoading(false);
        }
    };

    const handleResetGenerator = () => {
        setAiForm(defaultAiForm);
        setSelectedPreset(defaultAiForm.preset);
        setAiError(null);
        setAiSuccess(null);
        setPollingId(null);
        setAiLoading(false);
    };

    const updateAiForm = <K extends keyof AiFormState>(field: K, value: AiFormState[K]) => {
        setAiForm((prev) => ({ ...prev, [field]: value }));
    };

    const handlePresetChange = (value: string) => {
        setSelectedPreset(value);
        const preset = productPresets.find((item) => item.id === value);

        setAiForm((prev) => ({
            ...prev,
            preset: value,
            target_market: preset?.target_market ?? prev.target_market,
            tone: preset?.tone ?? prev.tone,
            value_proposition: preset?.value_proposition ?? prev.value_proposition,
            call_to_action: preset?.call_to_action ?? prev.call_to_action,
        }));
    };

    const action = useMemo(() => {
        return product
            ? route("admin.products.update", product.id)
            : route("admin.products.store");
    }, [product]);

    const submit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        form.transform((formData) => {
            const transformed = {
                ...formData,
                cover_image_file: formData.cover_image_file ?? undefined,
                thumbnail_file: formData.thumbnail_file ?? undefined,
                gallery_files: formData.gallery_files ?? [],
            };

            return product ? { ...transformed, _method: "put" } : transformed;
        });

        form.post(action, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => {
                setData("cover_image_file", undefined);
                setData("thumbnail_file", undefined);
                setData("gallery_files", []);
                form.transform((data) => data);
            },
        });
    };

    const presetInfo = productPresets.find((preset) => preset.id === selectedPreset);
    const requestButtonLabel = aiLoading ? (pollingId ? "Memproses..." : "Meminta Gemini...") : "Perkaya via Gemini";
    const highlightList = data.marketing_highlights
        ? data.marketing_highlights
              .split(/\r?\n/)
              .map((item) => item.trim())
              .filter((item) => item.length > 0)
        : [];
    const ctaList = data.cta_variants
        ? data.cta_variants
              .split(/\r?\n/)
              .map((item) => item.trim())
              .filter((item) => item.length > 0)
        : [];
    const previewFaqs = faqRows.filter(
        (faq) => faq.question.trim().length > 0 || faq.answer.trim().length > 0,
    );

    return (
        <AppLayout>
            <Head title={title} />
            <div className="p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <Link href={route("admin.products.index")} className="text-sm text-muted-foreground hover:text-foreground">
                        &larr; Kembali ke daftar produk
                    </Link>
                    <Button type="button" variant="outline" onClick={() => setPreviewOpen(true)}>
                        Preview
                    </Button>
                </div>
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Perkaya Konten Produk (Gemini)</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Gunakan ringkasan otomatis untuk mengisi highlight pemasaran dan FAQ. Anda masih bisa mengubah hasilnya sebelum menyimpan.
                        </p>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        {geminiStatus?.status === "error" && (
                            <div className="md:col-span-2">
                                <Alert variant="destructive">
                                    <AlertDescription>
                                        Gemini tidak dapat diakses. {geminiStatus.message ?? "Pastikan API key/kuota masih tersedia."}
                                    </AlertDescription>
                                </Alert>
                            </div>
                        )}
                        <div className="grid gap-2 md:col-span-2">
                            <Label>Preset</Label>
                            <Select value={selectedPreset} onValueChange={handlePresetChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih preset" />
                                </SelectTrigger>
                                <SelectContent>
                                    {productPresets.map((preset) => (
                                        <SelectItem key={preset.id} value={preset.id}>
                                            {preset.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">{presetInfo?.description ?? "Sesuaikan parameter manual bila diperlukan."}</p>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="ai-target-market">Target Market</Label>
                            <Input
                                id="ai-target-market"
                                value={aiForm.target_market}
                                onChange={(event) => updateAiForm("target_market", event.target.value)}
                                placeholder="Contoh: perusahaan jasa keuangan di Indonesia"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="ai-tone">Nada Tulisan</Label>
                            <Input
                                id="ai-tone"
                                value={aiForm.tone}
                                onChange={(event) => updateAiForm("tone", event.target.value)}
                                placeholder="Profesional, persuasif, dan bersahabat"
                            />
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label htmlFor="ai-value-prop">Nilai Utama</Label>
                            <textarea
                                id="ai-value-prop"
                                className="min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                value={aiForm.value_proposition}
                                onChange={(event) => updateAiForm("value_proposition", event.target.value)}
                                placeholder="Contoh: implementasi cepat, dukungan konsultasi strategis, dan tim kustom development lokal."
                            />
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label htmlFor="ai-cta">Call to Action</Label>
                            <Input
                                id="ai-cta"
                                value={aiForm.call_to_action}
                                onChange={(event) => updateAiForm("call_to_action", event.target.value)}
                                placeholder="Diskusikan kebutuhan Anda bersama tim kami"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1 text-sm">
                            {aiError && <span className="text-rose-500">{aiError}</span>}
                            {!aiError && aiSuccess && <span className="text-emerald-600">{aiSuccess}</span>}
                            {!aiError && !aiSuccess && pollingId && (
                                <span className="text-xs text-muted-foreground">Permintaan sedang diproses di antrean Gemini...</span>
                            )}
                            {!aiError && !aiSuccess && !pollingId && (
                                <span className="text-xs text-muted-foreground">
                                    Hasil Gemini akan otomatis mengisi ringkasan pemasaran, highlight, dan FAQ.
                                </span>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button type="button" variant="outline" onClick={handleResetGenerator} disabled={aiLoading}>
                                Reset
                            </Button>
                            <Button type="button" onClick={handleGenerateGemini} disabled={aiLoading}>
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
                            <Label htmlFor="name">Nama</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(event) => setData("name", event.target.value)}
                                required
                            />
                            {errors.name && <p className="text-xs text-rose-500">{errors.name}</p>}
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
                            <Label htmlFor="cover_image">Cover Image (URL)</Label>
                            <Input
                                id="cover_image"
                                value={data.cover_image ?? ""}
                                onChange={(event) => setData("cover_image", event.target.value)}
                            />
                            {errors.cover_image && <p className="text-xs text-rose-500">{errors.cover_image}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="cover_image_file">Upload Cover Image</Label>
                            <Input
                                id="cover_image_file"
                                type="file"
                                accept="image/*"
                                onChange={(event) => setData("cover_image_file", event.target.files?.[0] ?? undefined)}
                            />
                            {errors.cover_image_file && <p className="text-xs text-rose-500">{errors.cover_image_file}</p>}
                            {product?.cover_image_url && (
                                <img src={product.cover_image_url} alt={product.name} className="h-24 w-24 rounded object-cover" />
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="thumbnail">Thumbnail (URL)</Label>
                            <Input
                                id="thumbnail"
                                value={data.thumbnail ?? ""}
                                onChange={(event) => setData("thumbnail", event.target.value)}
                            />
                            {errors.thumbnail && <p className="text-xs text-rose-500">{errors.thumbnail}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="thumbnail_file">Upload Thumbnail</Label>
                            <Input
                                id="thumbnail_file"
                                type="file"
                                accept="image/*"
                                onChange={(event) => setData("thumbnail_file", event.target.files?.[0] ?? undefined)}
                            />
                            {errors.thumbnail_file && <p className="text-xs text-rose-500">{errors.thumbnail_file}</p>}
                            {product?.thumbnail_url && (
                                <img src={product.thumbnail_url} alt={product.name} className="h-24 w-24 rounded object-cover" />
                            )}
                        </div>
                        <div className="space-y-3 rounded-lg border border-dashed border-border p-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">Galeri Produk (URL)</Label>
                                <Button type="button" size="sm" variant="outline" onClick={addGalleryRow}>
                                    Tambah URL
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Isi dengan tautan gambar tambahan atau unggah file langsung. Urutan pertama akan tampil sebagai gambar utama.
                            </p>
                            <div className="space-y-2">
                                {galleryUrls.map((url, index) => (
                                    <div key={`gallery-${index}`} className="flex gap-2">
                                        <Input
                                            value={url}
                                            placeholder="https://..."
                                            onChange={(event) => handleGalleryChange(index, event.target.value)}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeGalleryRow(index)}
                                            disabled={galleryUrls.length === 1 && url === ""}
                                        >
                                            Hapus
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="gallery_files">Upload Gambar Galeri</Label>
                                <Input
                                    id="gallery_files"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(event) => setData("gallery_files", Array.from(event.target.files ?? []))}
                                />
                                {fieldError("gallery_files") && (
                                    <p className="text-xs text-rose-500">{fieldError("gallery_files")}</p>
                                )}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="excerpt">Ringkasan</Label>
                            <Input
                                id="excerpt"
                                value={data.excerpt ?? ""}
                                onChange={(event) => setData("excerpt", event.target.value)}
                            />
                            {errors.excerpt && <p className="text-xs text-rose-500">{errors.excerpt}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Deskripsi</Label>
                            <RichTextEditor
                                value={data.description ?? ''}
                                onChange={(value) => setData("description", value)}
                                placeholder="Paparkan fitur utama, manfaat, dan konteks penggunaan produk."
                            />
                            {errors.description && <p className="text-xs text-rose-500">{errors.description}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="features">Fitur (pisahkan dengan enter)</Label>
                            <textarea
                                id="features"
                                className="min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                value={data.features}
                                onChange={(event) => setData("features", event.target.value)}
                            />
                            {errors.features && <p className="text-xs text-rose-500">{errors.features}</p>}
                        </div>
                        <div className="space-y-4 rounded-lg border border-dashed border-border p-4">
                            <div>
                                <p className="text-sm font-semibold text-foreground">Konten Pemasaran & FAQ</p>
                                <p className="text-xs text-muted-foreground">
                                    Bagian ini dapat diisi secara manual atau menggunakan tombol Gemini di atas.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="marketing_summary">Ringkasan Pemasaran</Label>
                                <textarea
                                    id="marketing_summary"
                                    className="min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    value={data.marketing_summary ?? ""}
                                    onChange={(event) => setData("marketing_summary", event.target.value)}
                                />
                                {errors.marketing_summary && (
                                    <p className="text-xs text-rose-500">{errors.marketing_summary}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="marketing_highlights">Highlight (pisahkan dengan enter)</Label>
                                <textarea
                                    id="marketing_highlights"
                                    className="min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    value={data.marketing_highlights ?? ""}
                                    onChange={(event) => setData("marketing_highlights", event.target.value)}
                                />
                                {errors.marketing_highlights && (
                                    <p className="text-xs text-rose-500">{errors.marketing_highlights}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="meta_title">Meta Title</Label>
                                <Input
                                    id="meta_title"
                                    value={data.meta_title ?? ""}
                                    onChange={(event) => setData("meta_title", event.target.value)}
                                />
                                {errors.meta_title && <p className="text-xs text-rose-500">{errors.meta_title}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="meta_description">Meta Description</Label>
                                <textarea
                                    id="meta_description"
                                    className="min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    value={data.meta_description ?? ""}
                                    onChange={(event) => setData("meta_description", event.target.value)}
                                />
                                {errors.meta_description && <p className="text-xs text-rose-500">{errors.meta_description}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="og_title">OG Title</Label>
                                <Input
                                    id="og_title"
                                    value={data.og_title ?? ""}
                                    onChange={(event) => setData("og_title", event.target.value)}
                                />
                                {errors.og_title && <p className="text-xs text-rose-500">{errors.og_title}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="cta_variants">CTA Variants (pisahkan dengan enter)</Label>
                                <textarea
                                    id="cta_variants"
                                    className="min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    value={data.cta_variants ?? ""}
                                    onChange={(event) => setData("cta_variants", event.target.value)}
                                />
                                {errors.cta_variants && <p className="text-xs text-rose-500">{errors.cta_variants}</p>}
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm font-medium">FAQ Produk</Label>
                                    <Button type="button" size="sm" variant="outline" onClick={addFaqRow}>
                                        Tambah FAQ
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Minimal 1 pertanyaan. Pastikan jawaban ringkas agar mudah dibaca calon klien.
                                </p>
                                <div className="space-y-3">
                                    {faqRows.map((faq, index) => (
                                        <div key={`faq-${index}`} className="space-y-3 rounded-xl border border-border p-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor={`faq-question-${index}`}>Pertanyaan</Label>
                                                <Input
                                                    id={`faq-question-${index}`}
                                                    value={faq.question}
                                                    onChange={(event) => updateFaq(index, "question", event.target.value)}
                                                    placeholder="Contoh: Apakah layanan ini bisa dikustom?"
                                                />
                                                {fieldError(`faqs.${index}.question`) && (
                                                    <p className="text-xs text-rose-500">
                                                        {fieldError(`faqs.${index}.question`)}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor={`faq-answer-${index}`}>Jawaban</Label>
                                                <textarea
                                                    id={`faq-answer-${index}`}
                                                    className="min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                                    value={faq.answer}
                                                    onChange={(event) => updateFaq(index, "answer", event.target.value)}
                                                    placeholder="Tuliskan jawaban singkat namun meyakinkan."
                                                />
                                                {fieldError(`faqs.${index}.answer`) && (
                                                    <p className="text-xs text-rose-500">
                                                        {fieldError(`faqs.${index}.answer`)}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex justify-end">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeFaqRow(index)}
                                                    disabled={faqRows.length === 1}
                                                >
                                                    Hapus FAQ
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">Kategori</Label>
                            <Input
                                id="category"
                                value={data.category ?? ""}
                                onChange={(event) => setData("category", event.target.value)}
                            />
                            {errors.category && <p className="text-xs text-rose-500">{errors.category}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="price">Harga</Label>
                            <Input
                                id="price"
                                value={data.price ?? ""}
                                onChange={(event) => setData("price", event.target.value)}
                            />
                            {errors.price && <p className="text-xs text-rose-500">{errors.price}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="purchase_url">Link Pembelian e-Commerce</Label>
                            <Input
                                id="purchase_url"
                                placeholder="https://tokopedia.com/..."
                                value={data.purchase_url ?? ""}
                                onChange={(event) => setData("purchase_url", event.target.value)}
                            />
                            {errors.purchase_url && <p className="text-xs text-rose-500">{errors.purchase_url}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="whatsapp_number">Nomor WhatsApp Produk</Label>
                            <Input
                                id="whatsapp_number"
                                value={data.whatsapp_number ?? ""}
                                onChange={(event) => setData("whatsapp_number", event.target.value)}
                                placeholder="Contoh: 628123456789"
                            />
                            <p className="text-xs text-muted-foreground">
                                Gunakan format internasional tanpa spasi atau tanda baca (misal 628123456789).
                            </p>
                            {errors.whatsapp_number && <p className="text-xs text-rose-500">{errors.whatsapp_number}</p>}
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">Variasi Harga</Label>
                                <Button type="button" size="sm" variant="outline" onClick={addVariantRow}>
                                    Tambah Variasi
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Tambahkan paket harga berbeda (misalnya Basic, Standard, atau Premium). Jika dikosongkan, sistem akan menggunakan harga utama.
                            </p>
                            <div className="space-y-3">
                                {variantRows.map((variant, index) => (
                                    <div key={`variant-${index}`} className="space-y-3 rounded-xl border border-border p-3">
                                        <div className="grid gap-3 md:grid-cols-2">
                                            <div className="grid gap-2">
                                                <Label>Nama Paket</Label>
                                                <Input
                                                    value={variant.name ?? ""}
                                                    onChange={(event) => updateVariant(index, "name", event.target.value)}
                                                />
                                                {fieldError(`price_variants.${index}.name`) && (
                                                    <p className="text-xs text-rose-500">
                                                        {fieldError(`price_variants.${index}.name`)}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="grid gap-2">
                                                <Label>Harga</Label>
                                                <Input
                                                    value={variant.price ?? ""}
                                                    onChange={(event) => updateVariant(index, "price", event.target.value)}
                                                    placeholder="4500000"
                                                />
                                                {fieldError(`price_variants.${index}.price`) && (
                                                    <p className="text-xs text-rose-500">
                                                        {fieldError(`price_variants.${index}.price`)}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="grid gap-3 md:grid-cols-3">
                                            <div className="grid gap-2">
                                                <Label>Harga Coret (Opsional)</Label>
                                                <Input
                                                    value={variant.compare_at_price ?? ""}
                                                    onChange={(event) =>
                                                        updateVariant(index, "compare_at_price", event.target.value)
                                                    }
                                                    placeholder="5000000"
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label>SKU</Label>
                                                <Input
                                                    value={variant.sku ?? ""}
                                                    onChange={(event) => updateVariant(index, "sku", event.target.value)}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label>Stok</Label>
                                                <Input
                                                    value={variant.stock ?? ""}
                                                    onChange={(event) => updateVariant(index, "stock", event.target.value)}
                                                    placeholder="50"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeVariantRow(index)}
                                                disabled={variantRows.length === 1}
                                            >
                                                Hapus Variasi
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid gap-2 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="clients">Jumlah Klien</Label>
                                <Input
                                    id="clients"
                                    type="number"
                                    min="0"
                                    value={data.clients ?? ""}
                                    onChange={(event) => setData("clients", event.target.value)}
                                />
                                {errors.clients && <p className="text-xs text-rose-500">{errors.clients}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="rating">Rating</Label>
                                <Input
                                    id="rating"
                                    type="number"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    value={data.rating ?? ""}
                                    onChange={(event) => setData("rating", event.target.value)}
                                />
                                {errors.rating && <p className="text-xs text-rose-500">{errors.rating}</p>}
                            </div>
                        </div>
                        <label className="flex items-center gap-2">
                            <Checkbox
                                checked={data.is_active}
                                onCheckedChange={(checked) => setData("is_active", Boolean(checked))}
                            />
                            <span>Aktif</span>
                        </label>
                        {errors.is_active && <p className="text-xs text-rose-500">{errors.is_active}</p>}
                        <label className="flex items-center gap-2">
                            <Checkbox
                                checked={data.popular}
                                onCheckedChange={(checked) => setData("popular", Boolean(checked))}
                            />
                            <span>Tandai sebagai produk populer</span>
                        </label>
                        {errors.popular && <p className="text-xs text-rose-500">{errors.popular}</p>}
                        <label className="flex items-center gap-2">
                            <Checkbox
                                checked={data.demo}
                                onCheckedChange={(checked) => setData("demo", Boolean(checked))}
                            />
                            <span>Sediakan demo</span>
                        </label>
                        {errors.demo && <p className="text-xs text-rose-500">{errors.demo}</p>}
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button type="submit" disabled={processing}>
                            {product ? "Simpan Perubahan" : "Simpan"}
                        </Button>
                    </CardFooter>
                </Card>
                </form>
            </div>
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Preview Produk</DialogTitle>
                    </DialogHeader>
                    <div className="max-h-[70vh] overflow-y-auto space-y-4">
                        <div className="space-y-2 rounded-2xl border bg-white/60 p-4 dark:border-white/10 dark:bg-slate-900/50">
                            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-500">Product Preview</span>
                            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{data.name || "Nama produk"}</h2>
                            <p className="text-muted-foreground">{data.excerpt || "Ringkasan produk akan tampil di sini."}</p>
                            <div className="prose max-w-none rounded-xl border border-dashed bg-background/60 p-4 text-sm dark:prose-invert dark:border-white/10">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: data.description && data.description.trim().length > 0 ? data.description : "<p>Deskripsi produk akan tampil di sini.</p>",
                                    }}
                                />
                            </div>
                            {data.marketing_summary && (
                                <div className="prose max-w-none rounded-xl bg-blue-50/70 p-4 text-sm dark:prose-invert dark:bg-blue-950/40">
                                    <div dangerouslySetInnerHTML={{ __html: data.marketing_summary }} />
                                </div>
                            )}
                            {highlightList.length > 0 && (
                                <div>
                                    <p className="text-sm font-medium text-foreground">Highlight</p>
                                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                                        {highlightList.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {ctaList.length > 0 && (
                                <div>
                                    <p className="text-sm font-medium text-foreground">CTA Variants</p>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {ctaList.map((cta) => (
                                            <span key={cta} className="rounded-full border border-emerald-200 px-3 py-1 text-xs text-emerald-600 dark:border-emerald-500/40 dark:text-emerald-200">
                                                {cta}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {previewFaqs.length > 0 && (
                                <div className="space-y-3">
                                    <p className="text-sm font-medium text-foreground">FAQ</p>
                                    {previewFaqs.map((faq, index) => (
                                        <div key={`${faq.question}-${index}`} className="rounded-xl border border-muted p-3 text-sm">
                                            <p className="font-semibold text-foreground">{faq.question || "Pertanyaan"}</p>
                                            <p className="text-muted-foreground">{faq.answer || "Jawaban akan muncul di sini."}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
