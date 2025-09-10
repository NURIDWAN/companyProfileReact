import React, { useEffect, useState } from 'react';

import CTASection from '@/components/ui/landingPageComponent/about/CTASection';
import { ProductsGrid } from '@/components/ui/landingPageComponent/product/productsGrid';
import { StatsSection } from '@/components/ui/landingPageComponent/product/statsSection';
import LandingPageLayout from '@/layouts/landingPage-layouts';
import { Category, Product } from '@/types';

interface PageProductProps {
    products?: Product[];
    categories?: Category[];
}

const PageProduct: React.FC<PageProductProps> = ({ products = [], categories = [] }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Product[]>(products);

    // State untuk filter
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const [sort, setSort] = useState('latest');

    // Simulasi fetch (kalau data dari API)
    useEffect(() => {
        if (products.length === 0) {
            setTimeout(() => {
                setData([
                    {
                        id: 1,
                        name: 'CRM System',
                        description: 'Sistem manajemen pelanggan modern untuk bisnis.',
                        category: 'Software',
                        features: ['Dashboard', 'Integrasi Email', 'Laporan Otomatis'],
                        rating: 4.8,
                        clients: 120,
                        price: 1500000,
                        popular: true,
                        demo: true,
                        thumbnail: 'https://picsum.photos/seed/crm/400/300',
                    },
                    {
                        id: 2,
                        name: 'Cloud Hosting',
                        description: 'Hosting cepat & aman untuk kebutuhan bisnis Anda.',
                        category: 'Cloud',
                        features: ['99.9% Uptime', 'SSL Gratis', 'Backup Harian'],
                        rating: 4.6,
                        clients: 90,
                        price: 500000,
                        demo: true,
                        thumbnail: 'https://picsum.photos/seed/cloud/400/300',
                    },
                    {
                        id: 3,
                        name: 'E-Commerce Template',
                        description: 'Template modern untuk toko online dengan integrasi payment.',
                        category: 'Template',
                        features: ['Responsive', 'Integrasi Payment', 'SEO Friendly'],
                        rating: 4.5,
                        clients: 75,
                        price: 800000,
                        demo: false,
                        thumbnail: 'https://picsum.photos/seed/ecommerce/400/300',
                    },
                    {
                        id: 4,
                        name: 'Project Management Tool',
                        description: 'Kelola tim dan proyek dengan mudah.',
                        category: 'Software',
                        features: ['Task Board', 'Chat Tim', 'Laporan Gantt'],
                        rating: 4.7,
                        clients: 200,
                        price: 2000000,
                        demo: true,
                        thumbnail: 'https://picsum.photos/seed/pmtool/400/300',
                    },
                    {
                        id: 5,
                        name: 'AI Chatbot',
                        description: 'Layanan chatbot pintar untuk website & aplikasi.',
                        category: 'AI',
                        features: ['24/7 Support', 'Integrasi WhatsApp', 'Natural Language'],
                        rating: 4.9,
                        clients: 150,
                        price: 2500000,
                        demo: true,
                        thumbnail: 'https://picsum.photos/seed/ai/400/300',
                    },
                    {
                        id: 6,
                        name: 'UI Kit Premium',
                        description: 'Komponen UI modern siap pakai untuk developer.',
                        category: 'Template',
                        features: ['Dark Mode', 'Tailwind Ready', 'Customizable'],
                        rating: 4.3,
                        clients: 60,
                        price: 300000,
                        demo: false,
                        thumbnail: 'https://picsum.photos/seed/uikit/400/300',
                    },
                ]);
                setLoading(false);
            }, 1000);
        } else {
            setData(products);
            setLoading(false);
        }
    }, [products]);

    // Filter data
    const filteredProducts = data
        .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
        .filter((p) => (selectedCategory === 'All' ? true : p.category === selectedCategory))
        .filter((p) => (minPrice ? p.price >= parseFloat(minPrice) : true))
        .filter((p) => (maxPrice ? p.price <= parseFloat(maxPrice) : true))
        .sort((a, b) => {
            switch (sort) {
                case 'priceLow':
                    return a.price - b.price;
                case 'priceHigh':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'popular':
                    return b.clients - a.clients;
                case 'latest':
                    return b.id - a.id;
                case 'oldest':
                    return a.id - b.id;
                default:
                    return 0;
            }
        });

    const totalClients = data.length ? data.reduce((sum, p) => sum + p.clients, 0) : 0;

    const averageRating = data.length ? (data.reduce((sum, p) => sum + p.rating, 0) / data.length).toFixed(1) : '0.0';

    if (loading) {
        return <div className="p-6 text-center">Loading produk...</div>;
    }

    return (
        <LandingPageLayout>
            <div className="mx-auto max-w-7xl space-y-8 p-6 font-sans">
                <StatsSection productsCount={data.length} totalClients={totalClients} averageRating={averageRating} awards={10} />

                {/* Filter Section */}
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="grid grid-cols-1 gap-4 rounded-lg border bg-white p-4 shadow-md md:grid-cols-5 md:items-end"
                >
                    {/* Search */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Cari Produk</label>
                        <input
                            type="text"
                            placeholder="Nama produk atau brand..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Kategori */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Kategori</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        >
                            <option value="All">Semua Kategori</option>
                            {categories.map((cat, idx) => (
                                <option key={idx} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Rentang Harga */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Rentang Harga</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="Min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="w-1/2 rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="w-1/2 rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Urutan */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Urutan</label>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
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

                    {/* Tombol */}
                    <div className="flex justify-center md:justify-start">
                        <button type="submit" className="mt-2 w-full rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
                            🔍 Filter Produk
                        </button>
                    </div>
                </form>

                {/* Produk Grid */}
                {filteredProducts.length > 0 ? (
                    <ProductsGrid products={filteredProducts} />
                ) : (
                    <div className="p-6 text-center text-gray-500">Tidak ada produk yang sesuai filter.</div>
                )}

                <CTASection />
            </div>
        </LandingPageLayout>
    );
};

export default PageProduct;
