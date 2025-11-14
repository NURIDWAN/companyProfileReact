import { useMemo, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import type { PageProps } from '@inertiajs/core';
import { CheckCircle2, Star, Users } from 'lucide-react';

import LandingPageLayout from '@/layouts/landingPage-layouts';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/landingPageComponent/product/productCard';
import type { Product } from '@/types';

const normalizeWhatsappNumber = (value?: string | null): string | null => {
    if (!value) {
        return null;
    }

    const digits = value.replace(/\D/g, '');

    if (!digits) {
        return null;
    }

    if (digits.startsWith('0')) {
        return `62${digits.slice(1)}`;
    }

    return digits;
};

type ProductDetailPageProps = PageProps & {
    product: Product;
    relatedProducts?: Product[];
};

export default function ProductDetailPage() {
    const { product, relatedProducts = [] } = usePage<ProductDetailPageProps>().props;
    const gallery = useMemo(() => {
        const images = product.gallery?.length ? product.gallery : [];
        const fallback = product.cover_image ?? product.thumbnail;
        return images.length ? images : fallback ? [fallback] : [];
    }, [product.cover_image, product.gallery, product.thumbnail]);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const variants = product.variants ?? [];
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(variants.length ? 0 : -1);
    const selectedVariant = selectedVariantIndex >= 0 ? variants[selectedVariantIndex] : undefined;

    const ratingValue = Number(product.rating ?? 0);
    const features =
        product.features && product.features.length
            ? product.features
            : ['Integrasi cepat', 'Skalabilitas tinggi', 'Analytics real-time'];

    const priceLabel = selectedVariant?.price_formatted
        ?? product.price_range?.formatted
        ?? (product.price ? formatCurrency(product.price) : 'Hubungi sales');
    const comparePrice = selectedVariant?.compare_at_price_formatted;
    const purchaseUrl = product.purchase_url;
    const marketplaceLabels = useMemo(() => {
        if (!purchaseUrl) {
            return [];
        }

        try {
            const url = new URL(purchaseUrl);
            return [url.hostname.replace(/^www\./, '')];
        } catch {
            return [];
        }
    }, [purchaseUrl]);

    const whatsappLink = useMemo(() => {
        const message = encodeURIComponent(`Halo Harmony Strategic Group, saya ingin berdiskusi tentang ${product.name}.`);
        const normalized = normalizeWhatsappNumber(product.whatsapp_number);
        const baseUrl = normalized ? `https://wa.me/${normalized}` : 'https://wa.me';
        const separator = normalized ? '?' : '/?';

        return `${baseUrl}${separator}text=${message}`;
    }, [product.name, product.whatsapp_number]);

    return (
        <LandingPageLayout>
            <div className="mx-auto max-w-6xl space-y-10 p-6">
                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-4">
                        <p className="text-sm uppercase text-blue-600">Produk Digital</p>
                        <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
                        <p className="text-lg text-gray-600">
                            {product.description ?? 'Solusi siap pakai untuk mendukung peningkatan operasi dan layanan bisnis Anda.'}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                {product.clients ?? 0} client
                            </span>
                            <span className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-yellow-500" />
                                {ratingValue.toFixed(1)} / 5
                            </span>
                            {product.category && (
                                <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-600">{product.category}</span>
                            )}
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-semibold text-gray-900">{priceLabel}</span>
                                {comparePrice && (
                                    <span className="text-sm text-muted-foreground line-through">{comparePrice}</span>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {product.demo && (
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                                        <Link href="/contact">Minta Demo</Link>
                                    </Button>
                                )}
                                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600" asChild>
                                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                        Tanya via WhatsApp
                                    </a>
                                </Button>
                                <Button size="lg" variant="outline" className="border-blue-200 text-blue-600" asChild>
                                    <Link href="/contact">Hubungi Sales</Link>
                                </Button>
                                {purchaseUrl && (
                                    <Button
                                        size="lg"
                                        className="bg-emerald-600 hover:bg-emerald-700"
                                        asChild
                                    >
                                        <a href={purchaseUrl} target="_blank" rel="noopener noreferrer">
                                            Beli Sekarang
                                        </a>
                                    </Button>
                                )}
                            </div>
                            {marketplaceLabels.length > 0 && (
                                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                                    <span className="font-semibold text-gray-600">Marketplace:</span>
                                    {marketplaceLabels.map((label) => (
                                        <span
                                            key={label}
                                            className="rounded-full bg-blue-50 px-3 py-1 font-semibold uppercase tracking-wide text-blue-600"
                                        >
                                            {label}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {variants.length > 0 && (
                            <Card>
                                <CardContent className="space-y-4 p-4">
                                    <div>
                                        <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-600">Paket Harga</h2>
                                        <p className="text-sm text-muted-foreground">
                                            Pilih paket yang sesuai dengan kebutuhan organisasi Anda.
                                        </p>
                                    </div>
                                    <div className="grid gap-2">
                                        {variants.map((variant, index) => {
                                            const isActive = index === selectedVariantIndex;

                                            return (
                                                <button
                                                    type="button"
                                                    key={`${variant.sku ?? variant.name ?? index}`}
                                                    onClick={() => setSelectedVariantIndex(index)}
                                                    className={`flex flex-col rounded-xl border p-3 text-left transition ${
                                                        isActive
                                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                            : 'border-border hover:border-blue-300'
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between gap-4">
                                                        <div>
                                                            <p className="text-sm font-semibold">{variant.name ?? 'Paket'}</p>
                                                            {variant.sku && (
                                                                <p className="text-xs text-muted-foreground">SKU: {variant.sku}</p>
                                                            )}
                                                        </div>
                                                        <div className="text-right">
                                                            {variant.price_formatted && (
                                                                <p className="text-base font-semibold">{variant.price_formatted}</p>
                                                            )}
                                                            {variant.compare_at_price_formatted && (
                                                                <p className="text-xs text-muted-foreground line-through">
                                                                    {variant.compare_at_price_formatted}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {variant.stock !== null && variant.stock !== undefined && (
                                                        <p className="text-xs text-muted-foreground">
                                                            Stok tersedia: {variant.stock}
                                                        </p>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                    <div className="space-y-4">
                        <div className="overflow-hidden rounded-2xl border">
                            <img
                                src={gallery[activeImageIndex] ?? product.cover_image ?? product.thumbnail ?? fallbackImage}
                                alt={`${product.name} preview ${activeImageIndex + 1}`}
                                className="w-full max-h-[420px] object-cover"
                            />
                        </div>
                        {gallery.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto">
                                {gallery.map((image, index) => (
                                    <button
                                        key={`${image}-${index}`}
                                        type="button"
                                        onClick={() => setActiveImageIndex(index)}
                                        className={`h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl border transition ${
                                            index === activeImageIndex ? 'border-blue-500' : 'border-transparent hover:border-blue-300'
                                        }`}
                                    >
                                        <img src={image} alt={`${product.name} ${index + 1}`} className="h-full w-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <Card>
                    <CardContent className="space-y-6 p-6">
                        <h2 className="text-2xl font-semibold text-gray-900">Fitur Utama</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            {features.map((feature) => (
                                <div key={feature} className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-1 h-5 w-5 text-green-500" />
                                    <p className="text-gray-600">{feature}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {relatedProducts.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm uppercase text-blue-600">Produk Serupa</p>
                                <h2 className="text-2xl font-semibold text-gray-900">Rekomendasi lainnya</h2>
                            </div>
                            <Link href="/product" className="text-sm font-semibold text-blue-600">
                                Lihat semua
                            </Link>
                        </div>
                        <div className="grid gap-6 md:grid-cols-3">
                            {relatedProducts.map((related) => (
                                <ProductCard key={related.id} product={related} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </LandingPageLayout>
    );
}

const fallbackImage = 'https://images.unsplash.com/photo-1527427337751-fdca2f128e8b?w=900';

const formatCurrency = (value: number): string =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
