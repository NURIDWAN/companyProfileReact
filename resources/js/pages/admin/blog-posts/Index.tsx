import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Head, Link } from "@inertiajs/react";

type BlogPost = {
    id: number;
    title: string;
    slug: string;
    is_published: boolean;
    published_at?: string | null;
};

type Paginated<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
};

interface Props {
    posts: Paginated<BlogPost>;
}

export default function BlogPostIndex({ posts }: Props) {
    return (
        <AppLayout>
            <Head title="Manajemen Blog" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Blog & Artikel</h1>
                    <Button asChild>
                        <Link href={route("admin.blog-posts.create")}>Tulis Artikel</Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Artikel</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-border text-sm">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Judul</th>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Slug</th>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Status</th>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Publish</th>
                                        <th className="px-4 py-2" />
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {posts.data.map((post) => (
                                        <tr key={post.id}>
                                            <td className="px-4 py-2">{post.title}</td>
                                            <td className="px-4 py-2 text-muted-foreground">{post.slug}</td>
                                            <td className="px-4 py-2">
                                                <span
                                                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                                        post.is_published
                                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                                            : "bg-slate-200 text-slate-700 dark:bg-slate-500/10 dark:text-slate-300"
                                                    }`}
                                                >
                                                    {post.is_published ? "Terbit" : "Draft"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 text-muted-foreground">
                                                {post.published_at
                                                    ? new Date(post.published_at).toLocaleDateString("id-ID")
                                                    : "-"}
                                            </td>
                                            <td className="px-4 py-2 text-right">
                                                <Button asChild variant="outline" size="sm">
                                                    <Link href={route("admin.blog-posts.edit", post.id)}>Edit</Link>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {posts.links.map((link) => (
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
