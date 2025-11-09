import React, { useMemo } from 'react';
import { Link } from '@inertiajs/react';
import { ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { itemVariants } from '@/utils/animations';
import type { Product } from '@/types';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const detailHref = `/product/${product.slug}`;

    const priceInfo = useMemo(() => {
        const variantPrices =
            product.variants?.map((variant) => (variant.price !== null && variant.price !== undefined ? Number(variant.price) : null)) ??
            [];
        const variantCompare =
            product.variants?.map((variant) =>
                variant.compare_at_price !== null && variant.compare_at_price !== undefined
                    ? Number(variant.compare_at_price)
                    : null,
            ) ?? [];
        const variantStocks =
            product.variants
                ?.map((variant) => (typeof variant.stock === 'number' && !Number.isNaN(variant.stock) ? variant.stock : null))
                ?.filter((stock): stock is number => stock !== null) ?? [];

        const base =
            product.price !== null && product.price !== undefined
                ? Number(product.price)
                : variantPrices.filter((price): price is number => price !== null).sort((a, b) => a - b)[0] ?? null;

        const compareCandidate =
            variantCompare
                .filter((compare): compare is number => compare !== null && base !== null && compare > base)
                .sort((a, b) => a - b)[0] ?? null;

        const label =
            product.price_range?.formatted ??
            (base !== null ? formatCurrency(base) : product.price_range?.formatted ?? 'Hubungi sales');

        const compareLabel = compareCandidate !== null ? formatCurrency(compareCandidate) : null;
        const discountPercent =
            base !== null && compareCandidate !== null && compareCandidate > 0
                ? Math.round(((compareCandidate - base) / compareCandidate) * 100)
                : null;

        const stock = variantStocks.length ? Math.min(...variantStocks) : null;

        return {
            base,
            label,
            compareLabel,
            discountPercent,
            stock,
        };
    }, [product]);

    const marketplaceLabels = useMemo(() => {
        if (!product.purchase_url) {
            return [];
        }

        try {
            const url = new URL(product.purchase_url);
            const host = url.hostname.replace(/^www\./, '');
            return [host];
        } catch {
            return [];
        }
    }, [product.purchase_url]);

    const whatsappLink = useMemo(() => {
        const message = encodeURIComponent(`Halo Harmony Strategic Group, saya tertarik dengan produk ${product.name}.`);
        return `https://wa.me/?text=${message}`;
    }, [product.name]);

    const featurePreview = product.features?.slice(0, 3) ?? [];

    return (
        <motion.div variants={itemVariants} whileHover={{ y: -8 }}>
            <Card className="group flex h-full flex-col rounded-3xl border border-slate-200/70 bg-white/95 p-5 shadow-lg transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/80">
                <div className="relative">
                    <Link href={detailHref} className="block h-44 w-full overflow-hidden rounded-2xl bg-slate-100">
                        {product.thumbnail ? (
                            <img src={product.thumbnail} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                        ) : (
                            <span className="flex h-full w-full items-center justify-center text-slate-400">No Image</span>
                        )}
                    </Link>

                    <div className="absolute left-3 top-3 flex flex-col gap-2">
                        {priceInfo.discountPercent !== null && (
                            <span className="inline-flex rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold uppercase text-white shadow-sm">
                                -{priceInfo.discountPercent}%
                            </span>
                        )}
                        {product.popular && (
                            <span className="inline-flex rounded-full bg-amber-400/90 px-3 py-1 text-xs font-semibold uppercase text-amber-900 shadow-sm">
                                Unggulan
                            </span>
                        )}
                        {product.demo && (
                            <span className="inline-flex rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold uppercase text-emerald-950 shadow-sm">
                                Demo Tersedia
                            </span>
                        )}
                    </div>
                </div>

                <CardHeader className="mt-4 space-y-3 p-0">
                    <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                            <Link href={detailHref} className="text-lg font-semibold leading-tight text-slate-900 transition hover:text-blue-600 dark:text-slate-50">
                                {product.name}
                            </Link>
                            {product.category && (
                                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                                    {product.category}
                                </span>
                            )}
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">{priceInfo.label}</p>
                            {priceInfo.compareLabel && (
                                <p className="text-xs text-slate-400 line-through dark:text-slate-500">{priceInfo.compareLabel}</p>
                            )}
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                        {product.excerpt ?? product.description ?? 'Detail produk akan segera tersedia.'}
                    </p>
                    {featurePreview.length > 0 && (
                        <ul className="flex flex-wrap gap-2 text-xs">
                            {featurePreview.map((feature, index) => (
                                <li
                                    key={`${feature}-${index}`}
                                    className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                                >
                                    {feature}
                                </li>
                            ))}
                            {product.features && product.features.length > featurePreview.length && (
                                <li className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                    +{product.features.length - featurePreview.length} fitur lainnya
                                </li>
                            )}
                        </ul>
                    )}
                </CardHeader>

                <CardContent className="mt-3 flex flex-1 flex-col justify-between p-0">
                    <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1 text-sm">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                {product.rating ?? '-'} / 5
                            </span>
                            <span>{product.clients ?? 0} klien</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-slate-600 dark:text-slate-300">Status Stok</span>
                            <span>
                                {priceInfo.stock !== null ? `${priceInfo.stock} unit ready` : 'Ketersediaan konfirmasi cepat'}
                            </span>
                        </div>
                        {marketplaceLabels.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2">
                                {marketplaceLabels.map((label) => (
                                    <span
                                        key={label}
                                        className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300"
                                    >
                                        {label}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mt-5 flex flex-col gap-2">
                        <Button size="sm" className="w-full rounded-xl bg-blue-600 font-semibold hover:bg-blue-700" asChild>
                            <Link href={detailHref}>Lihat Detail</Link>
                        </Button>
                        <Button
                            size="sm"
                            className="w-full rounded-xl bg-emerald-500 font-semibold text-emerald-950 hover:bg-emerald-600"
                            asChild
                        >
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                Tanya via WhatsApp
                            </a>
                        </Button>
                        {product.purchase_url && (
                            <Button
                                size="sm"
                                variant="outline"
                                className="w-full rounded-xl border-slate-300 font-semibold text-slate-700 hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-blue-400 dark:hover:text-blue-300"
                                asChild
                            >
                                <a href={product.purchase_url} target="_blank" rel="noopener noreferrer">
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    Beli Sekarang
                                </a>
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

const formatCurrency = (value: number): string =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
