import { useMemo, useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import type { PageProps } from '@inertiajs/core';
import { Calendar, Clock, Search, User, ArrowUpRight } from 'lucide-react';

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

type SectionCopy = {
    badge?: string | null;
    heading?: string | null;
    description?: string | null;
};

type BlogPageProps = PageProps & {
    articles?: ArticleItem[];
    blogHero?: SectionCopy;
};

const coverFallback = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop';

const formatDate = (value?: string | null) => {
    if (!value) return 'Segera hadir';
    return new Date(value).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

function FeaturedArticle({ article }: { article: ArticleItem }) {
    const cover = article.cover_image ?? coverFallback;
    return (
        <Link
            href={`/blog/${article.slug}`}
            className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-[32px] bg-slate-900 shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
            <img src={cover} alt={article.title} className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
            <div className="relative mt-auto space-y-4 p-8 text-white">
                <Badge className="bg-white/20 text-xs uppercase tracking-[0.3em] text-white">Highlight</Badge>
                <h2 className="text-3xl font-semibold leading-tight">{article.title}</h2>
                <p className="line-clamp-2 text-slate-200">{article.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-slate-300">
                    <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(article.published_at)}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-white/80" />
                </div>
            </div>
        </Link>
    );
}

function SpotlightCard({ article }: { article: ArticleItem }) {
    return (
        <Card className="flex flex-col justify-between rounded-3xl border border-slate-200/70 bg-white/90 p-4 shadow-sm transition hover:-translate-y-1 dark:border-white/10 dark:bg-slate-900/60">
            <div>
                <Badge variant="outline" className="mb-3 text-xs uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-300">
                    Insight
                </Badge>
                <CardTitle className="line-clamp-2 text-lg dark:text-white">{article.title}</CardTitle>
                <CardDescription className="mt-2 line-clamp-3 text-sm text-muted-foreground dark:text-slate-300">{article.excerpt}</CardDescription>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground dark:text-slate-400">
                <span>{formatDate(article.published_at)}</span>
                <Link href={`/blog/${article.slug}`} className="text-indigo-600 dark:text-indigo-300">
                    Baca
                </Link>
            </div>
        </Card>
    );
}

function ArticleCard({ article }: { article: ArticleItem }) {
    const cover = article.cover_image ?? coverFallback;
    const readTime = article.excerpt ? Math.max(3, Math.round(article.excerpt.length / 420)) : 3;

    return (
        <Card className="flex h-full flex-col overflow-hidden border border-slate-200/60 bg-white/95 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
            <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                <img src={cover} alt={article.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                <div className="absolute left-4 top-4">
                    <Badge className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-900 dark:bg-black/60 dark:text-white">Insight</Badge>
                </div>
            </div>
            <CardHeader className="space-y-3">
                <CardTitle className="line-clamp-2 text-xl text-slate-900 dark:text-white">{article.title}</CardTitle>
                <CardDescription className="line-clamp-3 text-sm text-muted-foreground dark:text-slate-300">
                    {article.excerpt ?? 'Insight terbaru dari tim kami mengenai strategi bisnis dan operasional.'}
                </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto space-y-4 text-sm text-muted-foreground dark:text-slate-400">
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(article.published_at)}
                    </span>
                    <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {readTime} min read
                    </span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-white/5">
                    <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <User className="h-4 w-4" />
                        {article.author ?? 'Tim Konten'}
                    </span>
                    <Link href={`/blog/${article.slug}`} className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-200">
                        Baca selengkapnya
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}

export default function BlogPage() {
    const { articles = [], blogHero } = usePage<BlogPageProps>().props;
    const [search, setSearch] = useState('');

    const filteredArticles = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return articles;
        return articles.filter(
            (article) =>
                article.title.toLowerCase().includes(term) ||
                (article.excerpt ?? '').toLowerCase().includes(term) ||
                (article.author ?? '').toLowerCase().includes(term),
        );
    }, [articles, search]);

    const featuredArticle = filteredArticles[0] ?? articles[0];
    const spotlightArticles = filteredArticles.filter((article) => article.id !== featuredArticle?.id).slice(0, 2);
    const otherArticles = filteredArticles.filter(
        (article) => article.id !== featuredArticle?.id && !spotlightArticles.some((spot) => spot.id === article.id),
    );
    const lastUpdated = articles.find((article) => article.published_at)?.published_at ?? new Date().toISOString();

    const heroBadge = blogHero?.badge ?? 'Insight';
    const heroHeading = blogHero?.heading ?? 'Insight Bisnis & Industri';
    const heroDescription =
        blogHero?.description ??
        'Dapatkan insight terbaru, studi kasus, dan tips praktis untuk mengelola perubahan serta mengembangkan bisnis Anda.';

    return (
        <LandingPageLayout>
            <div className="mx-auto max-w-7xl space-y-12 px-4 pb-20 pt-10 sm:px-6 lg:px-8">
                <section className="space-y-6 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 px-4 py-1 text-xs uppercase tracking-[0.4em] text-slate-500 dark:border-white/10 dark:text-slate-300">
                        {heroBadge}
                        <span className="text-slate-900 dark:text-white">Harmony Console</span>
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white">{heroHeading}</h1>
                    <p className="mx-auto max-w-3xl text-base text-muted-foreground dark:text-slate-300">{heroDescription}</p>
                </section>

                <section className="rounded-[32px] border border-slate-200/70 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-1 items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-2 shadow-sm dark:border-white/10 dark:bg-slate-900/60">
                            <Search className="h-5 w-5 text-slate-400" />
                            <Input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Cari artikel bisnis..."
                                className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                            />
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground dark:text-slate-300">
                            <Badge variant="secondary" className="rounded-full bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-white">
                                {filteredArticles.length} artikel
                            </Badge>
                            <span className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
                                Update {formatDate(lastUpdated)}
                            </span>
                        </div>
                    </div>
                </section>

                {featuredArticle ? (
                    <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
                        <FeaturedArticle article={featuredArticle} />
                        <div className="space-y-4">
                            {spotlightArticles.length ? (
                                spotlightArticles.map((article) => <SpotlightCard key={article.id} article={article} />)
                            ) : (
                                <div className="rounded-3xl border border-dashed border-slate-200/80 p-8 text-sm text-muted-foreground dark:border-white/10 dark:text-slate-300">
                                    Artikel spotlight akan muncul di sini ketika tersedia.
                                </div>
                            )}
                        </div>
                    </section>
                ) : null}

                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Artikel Terbaru</h2>
                            <p className="text-sm text-muted-foreground dark:text-slate-400">
                                {filteredArticles.length ? 'Kurasi ide dan studi kasus terbaru.' : 'Tidak ditemukan artikel dengan kata kunci tersebut.'}
                            </p>
                        </div>
                        <Button variant="outline" className="rounded-full border-slate-200 text-sm dark:border-white/20 dark:text-white" asChild>
                            <a href="/contact">Diskusikan Insight</a>
                        </Button>
                    </div>
                    {otherArticles.length ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {otherArticles.map((article) => (
                                <ArticleCard key={article.id} article={article} />
                            ))}
                        </div>
                    ) : !featuredArticle ? (
                        <div className="rounded-3xl border border-dashed border-slate-200/80 p-10 text-center text-sm text-muted-foreground dark:border-white/10 dark:text-slate-300">
                            Artikel blog belum tersedia. Tambahkan melalui panel admin untuk mulai berbagi insight.
                        </div>
                    ) : null}
                </section>
            </div>
        </LandingPageLayout>
    );
}
