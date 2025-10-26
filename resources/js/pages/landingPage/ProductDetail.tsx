import { Link, usePage } from '@inertiajs/react';
import type { PageProps } from '@inertiajs/core';
import { CheckCircle2, Star, Users } from 'lucide-react';

import LandingPageLayout from '@/layouts/landingPage-layouts';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/landingPageComponent/product/productCard';
import type { Product } from '@/types';

type ProductDetailPageProps = PageProps & {
    product: Product;
    relatedProducts?: Product[];
};

export default function ProductDetailPage() {
    const { product, relatedProducts = [] } = usePage<ProductDetailPageProps>().props;
    const cover = product.cover_image ?? product.thumbnail ?? 'https://images.unsplash.com/photo-1527427337751-fdca2f128e8b?w=900';
    const ratingValue = Number(product.rating ?? 0);

    const features = product.features && product.features.length ? product.features : ['Integrasi cepat', 'Skalabilitas tinggi', 'Analytics real-time'];

    return (
        <LandingPageLayout>
            <div className="mx-auto max-w-6xl space-y-10 p-6">
                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-4">
                        <p className="text-sm uppercase text-blue-600">Produk Digital</p>
                        <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
                        <p className="text-lg text-gray-600">
                            {product.description ?? 'Solusi digital siap pakai untuk mendukung transformasi operasi bisnis Anda.'}
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
                        <div className="flex flex-wrap gap-3">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                                <Link href="/contact">Hubungi Sales</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="border-blue-200 text-blue-600" asChild>
                                <Link href={product.demo ? '/contact' : '/product'}>Minta Demo</Link>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <img src={cover} alt={product.name} className="w-full rounded-2xl object-cover shadow-lg" />
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
