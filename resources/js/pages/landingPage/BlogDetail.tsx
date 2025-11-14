import { useMemo } from 'react';
import { usePage, Link } from '@inertiajs/react';
import type { PageProps } from '@inertiajs/core';
import { Calendar, ArrowLeft, User } from 'lucide-react';

import LandingPageLayout from '@/layouts/landingPage-layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ArticleItem {
    id: number;
    title: string;
    slug: string;
    excerpt?: string | null;
    cover_image?: string | null;
    published_at?: string | null;
    author?: string | null;
    body?: string | null;
}

type BlogDetailProps = PageProps & {
    article: ArticleItem;
    relatedArticles?: ArticleItem[];
};

export default function BlogDetailPage() {
    const { article, relatedArticles = [] } = usePage<BlogDetailProps>().props;
    const cover = article.cover_image ?? 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200';
    const inlineImages = useMemo(() => {
        if (!article.body) return [];
        const matches: string[] = [];
        const regex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
        let match;
        while ((match = regex.exec(article.body)) !== null) {
            const url = match[1];
            if (url && !matches.includes(url)) {
                matches.push(url);
            }
        }

        return matches;
    }, [article.body]);

    return (
        <LandingPageLayout>
            <div className="mx-auto max-w-4xl space-y-10 p-6">
                <Link href="/blog" className="text-sm text-blue-600 inline-flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke blog
                </Link>

                <div className="space-y-4 text-center">
                    <Badge className="bg-blue-50 text-blue-600">Insight</Badge>
                    <h1 className="text-4xl font-bold text-gray-900">{article.title}</h1>
                    <p className="text-lg text-gray-600">
                        {article.excerpt ?? 'Insight terbaru dari tim kami mengenai strategi bisnis, operasional, dan pengelolaan perubahan.'}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                            <User className="h-4 w-4" /> {article.author ?? 'Tim Konten'}
                        </span>
                        <span className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {article.published_at ? new Date(article.published_at).toLocaleDateString('id-ID') : 'Segera hadir'}
                        </span>
                    </div>
                </div>

                <img src={cover} alt={article.title} className="w-full rounded-2xl object-cover shadow-lg" />

                <article className="prose prose-lg max-w-none dark:prose-invert prose-img:rounded-2xl prose-img:shadow-lg prose-img:w-full">
                    <div dangerouslySetInnerHTML={{ __html: article.body ?? '<p>Konten akan segera tersedia.</p>' }} />
                </article>

                {inlineImages.length > 0 && (
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-gray-900">Galeri Artikel</h2>
                            <p className="text-sm text-gray-500">{inlineImages.length} gambar di dalam konten ini.</p>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3">
                            {inlineImages.map((src) => (
                                <div key={src} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                                    <img src={src} alt={article.title} className="h-48 w-full object-cover" loading="lazy" />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {relatedArticles.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">Artikel terkait</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            {relatedArticles.map((related) => (
                                <Card key={related.id} className="border-none shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="text-lg">
                                            <Link href={`/blog/${related.slug}`} className="hover:text-blue-600">
                                                {related.title}
                                            </Link>
                                        </CardTitle>
                                        <p className="text-sm text-gray-500 line-clamp-2">
                                            {related.excerpt ?? 'Insight terbaru mengenai strategi dan praktik bisnis lintas industri.'}
                                        </p>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </LandingPageLayout>
    );
}
