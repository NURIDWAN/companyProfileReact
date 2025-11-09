import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/RichTextEditor";

type BlogPost = {
    id: number;
    title: string;
    slug: string;
    excerpt?: string | null;
    body?: string | null;
    cover_image?: string | null;
    is_published: boolean;
    published_at?: string | null;
    author_id?: number | null;
};

interface Props {
    post?: BlogPost;
    users?: { id: number; name: string }[];
}

export default function BlogPostForm({ post, users = [] }: Props) {
    const title = post ? "Edit Artikel" : "Tulis Artikel";
    const form = useForm({
        author_id: post?.author_id ?? "",
        title: post?.title ?? "",
        slug: post?.slug ?? "",
        excerpt: post?.excerpt ?? "",
        body: post?.body ?? "",
        cover_image: post?.cover_image ?? "",
        is_published: post?.is_published ?? false,
        published_at: post?.published_at?.slice(0, 16) ?? "",
    });

    const { data, setData, processing, errors } = form;
    const generalError = (errors as typeof errors & { general?: string }).general;

    const action = useMemo(() => {
        return post ? route("admin.blog-posts.update", post.id) : route("admin.blog-posts.store");
    }, [post]);

    const submit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        if (post) {
            form.put(action, { preserveScroll: true });
        } else {
            form.post(action, { preserveScroll: true });
        }
    };

    return (
        <AppLayout>
            <Head title={title} />
            <div className="p-4">
                <div className="mb-4">
                    <Link href={route("admin.blog-posts.index")} className="text-sm text-muted-foreground hover:text-foreground">
                        &larr; Kembali ke daftar artikel
                    </Link>
                </div>
                <form onSubmit={submit}>
                <Card>
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {generalError && (
                            <Alert variant="destructive">
                                <AlertDescription>{generalError}</AlertDescription>
                            </Alert>
                        )}
                        <div className="grid gap-2">
                            <Label htmlFor="title">Judul</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(event) => setData("title", event.target.value)}
                                required
                            />
                            {errors.title && <p className="text-xs text-rose-500">{errors.title}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                value={data.slug}
                                onChange={(event) => setData("slug", event.target.value)}
                                required
                            />
                            {errors.slug && <p className="text-xs text-rose-500">{errors.slug}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="author_id">Penulis</Label>
                            <select
                                id="author_id"
                                className="h-10 rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                value={data.author_id ?? ""}
                                onChange={(event) => setData("author_id", event.target.value)}
                            >
                                <option value="">Pilih penulis</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                            {errors.author_id && <p className="text-xs text-rose-500">{errors.author_id}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="excerpt">Ringkasan</Label>
                            <Textarea
                                id="excerpt"
                                className="min-h-[100px]"
                                value={data.excerpt ?? ""}
                                onChange={(event) => setData("excerpt", event.target.value)}
                            />
                            {errors.excerpt && <p className="text-xs text-rose-500">{errors.excerpt}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="body">Konten</Label>
                            <RichTextEditor
                                value={data.body ?? ''}
                                onChange={(value) => setData("body", value)}
                                placeholder="Tulis artikel dengan heading, list, dan paragraf kaya."
                            />
                            {errors.body && <p className="text-xs text-rose-500">{errors.body}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="cover_image">Cover Image (URL)</Label>
                            <Input
                                id="cover_image"
                                value={data.cover_image ?? ""}
                                onChange={(event) => setData("cover_image", event.target.value)}
                            />
                            {errors.cover_image && <p className="text-xs text-rose-500">{errors.cover_image}</p>}
                        </div>
                        <div className="grid gap-2 md:grid-cols-2">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    checked={data.is_published}
                                    onCheckedChange={(checked) => setData("is_published", Boolean(checked))}
                                />
                                <span>Terbitkan</span>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="published_at">Tanggal Publish</Label>
                                <Input
                                    id="published_at"
                                    type="datetime-local"
                                    value={data.published_at ?? ""}
                                    onChange={(event) => setData("published_at", event.target.value)}
                                />
                                {errors.published_at && <p className="text-xs text-rose-500">{errors.published_at}</p>}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button type="submit" disabled={processing}>
                            {post ? "Simpan Perubahan" : "Simpan"}
                        </Button>
                    </CardFooter>
                </Card>
                </form>
            </div>
        </AppLayout>
    );
}
