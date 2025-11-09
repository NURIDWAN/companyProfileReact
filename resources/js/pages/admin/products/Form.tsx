import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useMemo } from "react";
import { RichTextEditor } from "@/components/RichTextEditor";

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
        features: (product?.features ?? []).join("\n"),
        category: product?.category ?? "",
        price: product?.price ? String(product.price) : "",
        price_variants: initialVariants.length ? initialVariants : [
            { name: "", price: "", compare_at_price: "", sku: "", stock: "" },
        ],
        purchase_url: product?.purchase_url ?? "",
        clients: product?.clients ? String(product.clients) : "",
        rating: product?.rating ? String(product.rating) : "",
        popular: product?.popular ?? false,
        demo: product?.demo ?? false,
        is_active: product?.is_active ?? true,
    });

    const { data, setData, processing, errors } = form;
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
    const fieldError = (field: string) => (errors as Record<string, string | undefined>)[field];
    const galleryUrls = (data.gallery ?? []).length ? data.gallery ?? [] : [""];
    const variantRows =
        (data.price_variants ?? []).length
            ? data.price_variants ?? []
            : [{ name: "", price: "", compare_at_price: "", sku: "", stock: "" }];

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

    const action = useMemo(() => {
        return product
            ? route("admin.products.update", product.id)
            : route("admin.products.store");
    }, [product]);

    const submit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        form.transform((formData) => ({
            ...formData,
            cover_image_file: formData.cover_image_file ?? undefined,
            thumbnail_file: formData.thumbnail_file ?? undefined,
            gallery_files: formData.gallery_files ?? [],
        }));

        if (product) {
            form.put(action, {
                forceFormData: true,
                preserveScroll: true,
                onFinish: () => {
                    setData("cover_image_file", undefined);
                    setData("thumbnail_file", undefined);
                    setData("gallery_files", []);
                    form.transform((data) => data);
                },
            });
        } else {
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
        }
    };

    return (
        <AppLayout>
            <Head title={title} />
            <div className="p-4">
                <div className="mb-4">
                    <Link href={route("admin.products.index")} className="text-sm text-muted-foreground hover:text-foreground">
                        &larr; Kembali ke daftar produk
                    </Link>
                </div>
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
        </AppLayout>
    );
}
