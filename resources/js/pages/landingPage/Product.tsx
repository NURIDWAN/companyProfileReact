import { useMemo, useState } from 'react';
import { usePage } from '@inertiajs/react';
import type { PageProps } from '@inertiajs/core';

import CTASection from '@/components/ui/landingPageComponent/about/CTASection';
import { ProductsGrid } from '@/components/ui/landingPageComponent/product/productsGrid';
import { StatsSection } from '@/components/ui/landingPageComponent/product/statsSection';
import LandingPageLayout from '@/layouts/landingPage-layouts';
import { Category, Product } from '@/types';

type ProductPageProps = PageProps & {
    products?: Product[];
    categories?: Category[];
};

export default function ProductPage() {
    const { products = [], categories = [] } = usePage<ProductPageProps>().props;

    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sort, setSort] = useState('latest');

    const filteredProducts = useMemo(() => {
        return products
            .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
            .filter((product) => (selectedCategory === 'All' ? true : product.category === selectedCategory))
            .filter((product) => (minPrice ? Number(product.price ?? 0) >= Number(minPrice) : true))
            .filter((product) => (maxPrice ? Number(product.price ?? 0) <= Number(maxPrice) : true))
            .sort((a, b) => {
                const priceA = Number(a.price ?? 0);
                const priceB = Number(b.price ?? 0);
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

    return (
        <LandingPageLayout>
            <div className="mx-auto max-w-7xl space-y-8 p-6 font-sans">
                <StatsSection
                    productsCount={products.length}
                    totalClients={totalClients}
                    averageRating={averageRating}
                    awards={0}
                />

                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="grid grid-cols-1 gap-4 rounded-lg border bg-white p-4 shadow-md md:grid-cols-5 md:items-end"
                >
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Cari Produk</label>
                        <input
                            type="text"
                            placeholder="Nama produk atau brand..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Kategori</label>
                        <select
                            value={selectedCategory}
                            onChange={(event) => setSelectedCategory(event.target.value as Category | 'All')}
                            className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        >
                            <option value="All">Semua Kategori</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Rentang Harga</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="Min"
                                value={minPrice}
                                onChange={(event) => setMinPrice(event.target.value)}
                                className="w-1/2 rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={(event) => setMaxPrice(event.target.value)}
                                className="w-1/2 rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Urutan</label>
                        <select
                            value={sort}
                            onChange={(event) => setSort(event.target.value)}
                            className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        >
                            <option value="latest">Terbaru</option>
                            <option value="oldest">Terlama</option>
                            <option value="popular">Terpopuler</option>
                            <option value="rating">Rating Tertinggi</option>
                            <option value="priceLow">Harga Terendah</option>
                            <option value="priceHigh">Harga Tertinggi</option>
                        </select>
                    </div>

                    <div>
                        <ButtonResetFilters
                            onReset={() => {
                                setSearch('');
                                setSelectedCategory('All');
                                setMinPrice('');
                                setMaxPrice('');
                                setSort('latest');
                            }}
                        />
                    </div>
                </form>

                {filteredProducts.length ? (
                    <ProductsGrid products={filteredProducts} />
                ) : (
                    <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                        Tidak ada produk yang memenuhi kriteria pencarian.
                    </div>
                )}

                <CTASection />
            </div>
        </LandingPageLayout>
    );
}

function ButtonResetFilters({ onReset }: { onReset: () => void }) {
    return (
        <button
            type="button"
            onClick={onReset}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:border-blue-500 focus:outline-none"
        >
            Reset Filter
        </button>
    );
}
