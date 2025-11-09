import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Head, Link } from "@inertiajs/react";
import { DeleteButton } from "@/components/DeleteButton";

type Product = {
    id: number;
    name: string;
    slug: string;
    price?: string | null;
    price_variants?: Array<{ price?: number | null }> | null;
    is_active: boolean;
    updated_at: string;
};

type Paginated<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
};

interface Props {
    products: Paginated<Product>;
}

export default function ProductIndex({ products }: Props) {
    const formatPrice = (product: Product) => {
        const numericPrice = product.price ? Number(product.price) : null;
        const variantPrices = (product.price_variants ?? [])
            .map((variant) => (variant?.price != null ? Number(variant.price) : null))
            .filter((value): value is number => value !== null);

        const priceCandidate = numericPrice ?? (variantPrices.length ? Math.min(...variantPrices) : null);

        if (priceCandidate === null) {
            return "-";
        }

        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(priceCandidate);
    };

    return (
        <AppLayout>
            <Head title="Manajemen Produk" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Produk</h1>
                    <Button asChild>
                        <Link href={route("admin.products.create")}>Tambah Produk</Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Produk</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-border text-sm">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Nama</th>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Slug</th>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Harga</th>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Status</th>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Update Terakhir</th>
                                        <th className="px-4 py-2" />
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {products.data.map((product) => (
                                        <tr key={product.id}>
                                            <td className="px-4 py-2">{product.name}</td>
                                            <td className="px-4 py-2 text-muted-foreground">{product.slug}</td>
                                            <td className="px-4 py-2 text-muted-foreground">{formatPrice(product)}</td>
                                            <td className="px-4 py-2">
                                                <span
                                                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                                        product.is_active
                                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                                            : "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                                                    }`}
                                                >
                                                    {product.is_active ? "Aktif" : "Nonaktif"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 text-muted-foreground">
                                                {new Date(product.updated_at).toLocaleDateString("id-ID")}
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="flex justify-end gap-2">
                                                    <Button asChild variant="outline" size="sm">
                                                        <Link href={route("admin.products.edit", product.id)}>Edit</Link>
                                                    </Button>
                                                    <DeleteButton
                                                        url={route("admin.products.destroy", product.id)}
                                                        confirmMessage={`Hapus produk "${product.name}"?`}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {products.links.map((link) => (
                                <Button
                                    key={link.label}
                                    variant={link.active ? "default" : "outline"}
                                    disabled={!link.url}
                                    size="sm"
                                    asChild
                                >
                                    <Link href={link.url ?? "#"} dangerouslySetInnerHTML={{ __html: link.label }} />
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
