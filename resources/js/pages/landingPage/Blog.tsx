import { useMemo, useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import type { PageProps } from '@inertiajs/core';
import { Calendar, Clock, Search, User } from 'lucide-react';

import LandingPageLayout from '@/layouts/landingPage-layouts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ArticleItem {
    id: number;
    title: string;
    slug: string;
    excerpt?: string | null;
    cover_image?: string | null;
    published_at?: string | null;
    author?: string | null;
}

type BlogPageProps = PageProps & {
    articles?: ArticleItem[];
};

function ArticleCard({ article }: { article: ArticleItem }) {
    const readTime = article.excerpt ? Math.max(3, Math.round(article.excerpt.length / 400)) : 3;
    const cover = article.cover_image ?? 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200';

    return (
        <Card className="flex h-full flex-col overflow-hidden border-none shadow-md">
            <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                <img src={cover} alt={article.title} className="h-full w-full object-cover" />
                <div className="absolute left-4 top-4">
                    <Badge className="bg-white/80 text-gray-900">Insight</Badge>
                </div>
            </div>
            <CardHeader>
                <CardTitle className="line-clamp-2 text-xl">{article.title}</CardTitle>
                <CardDescription className="line-clamp-3 text-sm text-gray-600">
                    {article.excerpt ?? 'Insight terbaru dari tim kami seputar transformasi digital dan teknologi bisnis.'}
                </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto space-y-4 text-sm text-gray-500">
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {article.published_at ? new Date(article.published_at).toLocaleDateString('id-ID') : 'Segera hadir'}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {readTime} min read
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-600">
                        <User className="h-4 w-4" />
                        {article.author ?? 'Tim Konten'}
                    </span>
                    <Link href={`/blog/${article.slug}`} className="text-sm font-semibold text-blue-600">
                        Baca selengkapnya
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}

export default function BlogPage() {
    const { articles = [] } = usePage<BlogPageProps>().props;
    const [search, setSearch] = useState('');

    const filteredArticles = useMemo(() => {
        const term = search.toLowerCase();
        return term
            ? articles.filter((article) =>
                  article.title.toLowerCase().includes(term) || (article.excerpt ?? '').toLowerCase().includes(term)
              )
            : articles;
    }, [articles, search]);

    const featuredArticle = filteredArticles[0];
    const otherArticles = filteredArticles.slice(1);
    const recentArticles = articles.slice(0, 5);

    return (
        <LandingPageLayout>
            <div className="mx-auto max-w-7xl space-y-10 p-6">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gray-900">Blog & Insight Teknologi</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Dapatkan insight terbaru, tips, dan studi kasus transformasi digital langsung dari praktisi kami.
                    </p>
                </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Cari artikel teknologi..."
                        className="pl-10"
                    />
                </div>
                <div className="flex gap-2 text-sm text-gray-500">
                    <span>{filteredArticles.length} artikel</span>
                    <span className="text-gray-400">|</span>
                    <span>Update {new Date().toLocaleDateString('id-ID')}</span>
                </div>
            </div>

                {featuredArticle && (
                    <div className="grid gap-6 lg:grid-cols-2">
                        <Card className="overflow-hidden border-none shadow-lg">
                            <div className="relative aspect-video w-full overflow-hidden">
                                <img
                                    src={featuredArticle.cover_image ?? 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=900'}
                                    alt={featuredArticle.title}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                                    <Badge className="mb-3 w-fit bg-white/20 text-white">Highlight</Badge>
                                    <h2 className="text-3xl font-bold leading-tight">{featuredArticle.title}</h2>
                                    <p className="mt-2 text-sm text-white/80 line-clamp-2">
                                        {featuredArticle.excerpt ?? 'Insight terbaru dari tim kami seputar transformasi digital dan teknologi bisnis.'}
                                    </p>
                                    <div className="mt-4 flex items-center gap-4 text-sm text-white/70">
                                        <span>{featuredArticle.author ?? 'Tim Konten'}</span>
                                        <span>•</span>
                                        <span>
                                            {featuredArticle.published_at
                                                ? new Date(featuredArticle.published_at).toLocaleDateString('id-ID')
                                                : 'Segera hadir'}
                                        </span>
                                    </div>
                                    <div className="mt-4">
                                        <Link href={`/blog/${featuredArticle.slug}`} className="inline-flex items-center text-sm font-semibold text-white">
                                            Baca selengkapnya
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <div className="space-y-4">
                            {recentArticles.map((article) => (
                                <Card key={article.id} className="border-none shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="text-lg">
                                            <Link href={`/blog/${article.slug}`} className="hover:text-blue-600">
                                                {article.title}
                                            </Link>
                                        </CardTitle>
                                        <CardDescription className="text-sm text-gray-600 line-clamp-2">
                                            {article.excerpt ?? 'Insight terbaru dari tim kami seputar transformasi digital dan teknologi bisnis.'}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="text-xs text-gray-500">
                                        {article.published_at
                                            ? new Date(article.published_at).toLocaleDateString('id-ID')
                                            : 'Segera hadir'}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {otherArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>

                {!filteredArticles.length && (
                    <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground">
                        Belum ada artikel yang sesuai dengan pencarian.
                    </div>
                )}
            </div>
        </LandingPageLayout>
    );
}
