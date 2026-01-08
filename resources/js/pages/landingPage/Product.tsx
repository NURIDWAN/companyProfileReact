import { useMemo, useState } from 'react';
import { usePage } from '@inertiajs/react';
import type { PageProps } from '@inertiajs/core';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CTASection from '@/components/ui/landingPageComponent/product/CTASection';
import { ProductsGrid } from '@/components/ui/landingPageComponent/product/productsGrid';
import LandingPageLayout from '@/layouts/landingPage-layouts';
import { Category, Product } from '@/types';

type ProductCtaContact = {
    icon?: string | null;
    title?: string | null;
    detail?: string | null;
};

type ProductCtaData = {
    badge?: string | null;
    heading?: string | null;
    description?: string | null;
    primary?: { label?: string | null; link?: string | null };
    secondary?: { label?: string | null; link?: string | null };
    contacts?: ProductCtaContact[];
};

type SectionCopy = {
    badge?: string | null;
    heading?: string | null;
    description?: string | null;
};

type ProductPageProps = PageProps & {
    products?: Product[];
    categories?: Category[];
    productCta?: ProductCtaData;
    productHero?: SectionCopy;
};

export default function ProductPage() {
    const { products = [], categories = [], productCta, productHero } = usePage<ProductPageProps>().props;

    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sort, setSort] = useState('latest');

    const basePrice = (product: Product) => {
        if (product.price !== null && product.price !== undefined) {
            return Number(product.price);
        }

        return Number(product.price_range?.min ?? 0);
    };

    const filteredProducts = useMemo(() => {
        return products
            .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
            .filter((product) => (selectedCategory === 'All' ? true : product.category === selectedCategory))
            .filter((product) => (minPrice ? basePrice(product) >= Number(minPrice) : true))
            .filter((product) => (maxPrice ? basePrice(product) <= Number(maxPrice) : true))
            .sort((a, b) => {
                const priceA = basePrice(a);
                const priceB = basePrice(b);
                const ratingA = Number(a.rating ?? 0);
                const ratingB = Number(b.rating ?? 0);
                const clientsA = Number(a.clients ?? 0);
                const clientsB = Number(b.clients ?? 0);

                switch (sort) {
                    case 'priceLow':
                        return priceA - priceB;
                    case 'priceHigh':
                        return priceB - priceA;
                    case 'rating':
                        return ratingB - ratingA;
                    case 'popular':
                        return clientsB - clientsA;
                    case 'oldest':
                        return a.id - b.id;
                    case 'latest':
                    default:
                        return b.id - a.id;
                }
            });
    }, [products, search, selectedCategory, minPrice, maxPrice, sort]);

    const totalClients = products.reduce((sum, product) => sum + Number(product.clients ?? 0), 0);
    const averageRating = products.length
        ? (products.reduce((sum, product) => sum + Number(product.rating ?? 0), 0) / products.length).toFixed(1)
        : '0.0';

    const formatNumber = (value: number) => new Intl.NumberFormat('id-ID').format(value);

    const categoryStats = useMemo(() => {
        const counts = new Map<string, number>();

        products.forEach((product) => {
            const key = product.category ?? 'Lainnya';
            counts.set(key, (counts.get(key) ?? 0) + 1);
        });

        return Array.from(counts.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);
    }, [products]);

    const displayedCount = filteredProducts.length;
    const totalCount = products.length;

    const resetFilters = () => {
        setSelectedCategory('All');
        setMinPrice('');
        setMaxPrice('');
        setSort('latest');
        setSearch('');
    };

    const heroImage =
        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80';

    const heroBadge = productHero?.badge ?? 'Produk lintas industri';
    const heroHeading =
        productHero?.heading ?? 'Lihat produk terbaik kami untuk mendorong transformasi bisnis Anda';
    const heroDescription =
        productHero?.description ??
        'Pilih solusi siap pakai yang dirancang untuk mempercepat digitalisasi, menyempurnakan proses operasional, dan menghadirkan pengalaman pelanggan yang konsisten di berbagai sektor.';

    return (
        <LandingPageLayout>
            <div className="mx-auto max-w-7xl space-y-12 px-4 pb-16 pt-6 font-sans sm:px-6 lg:px-8">
                <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900 text-white shadow-2xl">
                    <img
                        src={heroImage}
                        alt="Produk unggulan Harmony"
                        className="absolute inset-0 h-full w-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/70 to-slate-900/30" />
                    <div className="relative z-10 flex flex-col gap-8 p-8 sm:p-12 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl space-y-4">
                            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-sm font-medium uppercase tracking-wide text-emerald-300">
                                {heroBadge}
                            </span>
                            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{heroHeading}</h1>
                            <p className="text-base text-slate-200 sm:text-lg">{heroDescription}</p>
                        </div>
                        <div className="grid gap-4 rounded-2xl border border-white/20 bg-white/10 p-6 text-left backdrop-blur-lg sm:grid-cols-2 lg:w-[420px]">
                            <div>
                                <p className="text-sm text-slate-200">Produk aktif</p>
                                <p className="text-3xl font-semibold">{formatNumber(products.length)}+</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-200">Kategori</p>
                                <p className="text-3xl font-semibold">{formatNumber(categoryStats.length)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-200">Klien aktif</p>
                                <p className="text-3xl font-semibold">{formatNumber(totalClients)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-200">Rating rata-rata</p>
                                <p className="text-3xl font-semibold">{averageRating}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl ring-1 ring-slate-200/60 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 dark:ring-slate-800/70">
                    <form onSubmit={(event) => event.preventDefault()} className="grid gap-5 lg:grid-cols-6">
                        <div className="lg:col-span-2">
                            <label className="mb-2 block text-sm font-semibold text-slate-600 dark:text-slate-200">
                                Cari Produk
                            </label>
                            <Input
                                type="text"
                                placeholder="Nama produk atau brand..."
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                className="h-11 rounded-xl border-slate-200 bg-white/70 text-base placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/60"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-600 dark:text-slate-200">
                                Kategori
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(event) => setSelectedCategory(event.target.value as Category | 'All')}
                                className="h-11 w-full rounded-xl border border-slate-200 bg-white/70 px-3 text-sm text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
                            >
                                <option value="All">Semua Kategori</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-600 dark:text-slate-200">
                                    Harga Minimum
                                </label>
                                <Input
                                    type="number"
                                    min={0}
                                    placeholder="Min"
                                    value={minPrice}
                                    onChange={(event) => setMinPrice(event.target.value)}
                                    className="h-11 rounded-xl border-slate-200 bg-white/70 text-sm placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/60"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-600 dark:text-slate-200">
                                    Harga Maksimum
                                </label>
                                <Input
                                    type="number"
                                    min={0}
                                    placeholder="Max"
                                    value={maxPrice}
                                    onChange={(event) => setMaxPrice(event.target.value)}
                                    className="h-11 rounded-xl border-slate-200 bg-white/70 text-sm placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/60"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-600 dark:text-slate-200">
                                Urutkan
                            </label>
                            <select
                                value={sort}
                                onChange={(event) => setSort(event.target.value)}
                                className="h-11 w-full rounded-xl border border-slate-200 bg-white/70 px-3 text-sm text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
                            >
                                <option value="latest">Terbaru</option>
                                <option value="oldest">Terlama</option>
                                <option value="priceLow">Harga Terendah</option>
                                <option value="priceHigh">Harga Tertinggi</option>
                                <option value="rating">Rating Tertinggi</option>
                                <option value="popular">Paling Laris</option>
                            </select>
                        </div>

                        <div className="flex items-end gap-3 lg:flex-col lg:items-stretch">
                            <Button
                                type="submit"
                                className="h-11 w-full rounded-xl bg-blue-600 text-sm font-semibold hover:bg-blue-700"
                            >
                                Tampilkan Produk
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="h-11 w-full rounded-xl border-slate-300 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                                onClick={resetFilters}
                            >
                                Reset
                            </Button>
                        </div>
                    </form>
                </section>

                <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/60 p-6 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/60 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm font-semibold text-slate-600 dark:text-slate-200">
                            Menampilkan {formatNumber(displayedCount)} dari {formatNumber(totalCount)} produk yang tersedia
                        </p>
                        {selectedCategory !== 'All' && (
                            <p className="text-xs text-slate-500 dark:text-slate-400">Filter kategori aktif: {selectedCategory}</p>
                        )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">Kualitas terkurasi</span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">Pendampingan implementasi</span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">Support lokal 24/7</span>
                    </div>
                </div>

                <ProductsGrid products={filteredProducts} />



                {productCta && (
                    <CTASection
                        badge={productCta.badge}
                        heading={productCta.heading}
                        description={productCta.description}
                        primaryButton={productCta.primary}
                        secondaryButton={productCta.secondary}
                        contacts={productCta.contacts}
                    />
                )}
            </div>
        </LandingPageLayout>
    );
}
