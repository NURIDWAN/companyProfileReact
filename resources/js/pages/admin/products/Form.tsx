import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useMemo } from "react";

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
    const form = useForm({
        name: product?.name ?? "",
        slug: product?.slug ?? "",
        cover_image: product?.cover_image ?? "",
        cover_image_file: undefined as File | undefined,
        thumbnail: product?.thumbnail ?? "",
        thumbnail_file: undefined as File | undefined,
        excerpt: product?.excerpt ?? "",
        description: product?.description ?? "",
        features: (product?.features ?? []).join("\n"),
        category: product?.category ?? "",
        price: product?.price ? String(product.price) : "",
        clients: product?.clients ? String(product.clients) : "",
        rating: product?.rating ? String(product.rating) : "",
        popular: product?.popular ?? false,
        demo: product?.demo ?? false,
        is_active: product?.is_active ?? true,
    });

    console.log(form.data);

    const { data, setData, processing, errors } = form;
    const generalError = (errors as typeof errors & { general?: string }).general;

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
        }));

        if (product) {
            form.put(action, {
                forceFormData: true,
                preserveScroll: true,
                onFinish: () => {
                    setData("cover_image_file", undefined);
                    setData("thumbnail_file", undefined);
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
                            <textarea
                                id="description"
                                className="min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                value={data.description ?? ""}
                                onChange={(event) => setData("description", event.target.value)}
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
