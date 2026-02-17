import { DeleteButton } from '@/components/DeleteButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { FileText } from 'lucide-react';

type PageItem = {
    id: number;
    title: string;
    slug: string;
    status: string;
    published_at?: string | null;
    parent?: { id: number; title: string } | null;
};

type Paginated<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
};

interface Props {
    pages: Paginated<PageItem>;
}

/**
 * Decode HTML entities safely for pagination labels.
 * Laravel pagination returns labels like "&laquo;" and "&raquo;".
 */
function decodeHtmlEntities(html: string): string {
    const entities: Record<string, string> = {
        '&laquo;': '\u00AB',
        '&raquo;': '\u00BB',
        '&lt;': '<',
        '&gt;': '>',
        '&amp;': '&',
        '&nbsp;': ' ',
    };
    return html.replace(/&[a-zA-Z]+;/g, (match) => entities[match] ?? match);
}

export default function PageIndex({ pages }: Props) {
    return (
        <AppLayout>
            <Head title="Manajemen Halaman" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Halaman Statis</h1>
                    <Button asChild>
                        <Link href={route('admin.pages.create')}>Tambah Halaman</Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Halaman</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {pages.data.length === 0 ? (
                            <div className="rounded-lg border-2 border-dashed py-12 text-center">
                                <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                <h3 className="mt-4 text-lg font-medium">Belum ada halaman</h3>
                                <p className="mt-2 text-sm text-muted-foreground">Buat halaman statis pertama Anda untuk website.</p>
                                <Button asChild className="mt-4">
                                    <Link href={route('admin.pages.create')}>Tambah Halaman Pertama</Link>
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-border text-sm">
                                        <thead className="bg-muted/50">
                                            <tr>
                                                <th className="px-4 py-2 text-left font-medium text-muted-foreground">Judul</th>
                                                <th className="px-4 py-2 text-left font-medium text-muted-foreground">Slug</th>
                                                <th className="px-4 py-2 text-left font-medium text-muted-foreground">Induk</th>
                                                <th className="px-4 py-2 text-left font-medium text-muted-foreground">Status</th>
                                                <th className="px-4 py-2 text-left font-medium text-muted-foreground">Publish</th>
                                                <th className="px-4 py-2" />
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {pages.data.map((page) => (
                                                <tr key={page.id}>
                                                    <td className="px-4 py-2">{page.title}</td>
                                                    <td className="px-4 py-2 text-muted-foreground">{page.slug}</td>
                                                    <td className="px-4 py-2 text-muted-foreground">{page.parent?.title ?? '-'}</td>
                                                    <td className="px-4 py-2">
                                                        <span
                                                            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                                                page.status === 'published'
                                                                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                                    : 'bg-slate-200 text-slate-700 dark:bg-slate-500/10 dark:text-slate-300'
                                                            }`}
                                                        >
                                                            {page.status === 'published' ? 'Terbit' : 'Draft'}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-2 text-muted-foreground">
                                                        {page.published_at ? new Date(page.published_at).toLocaleDateString('id-ID') : '-'}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <div className="flex justify-end gap-2">
                                                            <Button asChild variant="outline" size="sm">
                                                                <Link href={route('admin.pages.edit', page.id)}>Edit</Link>
                                                            </Button>
                                                            <DeleteButton
                                                                url={route('admin.pages.destroy', page.id)}
                                                                confirmMessage={`Hapus halaman "${page.title}"?`}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {pages.links.map((link) => (
                                        <Button
                                            key={link.label}
                                            variant={link.active ? 'default' : 'outline'}
                                            disabled={!link.url}
                                            size="sm"
                                            asChild={!!link.url}
                                        >
                                            {link.url ? (
                                                <Link href={link.url}>{decodeHtmlEntities(link.label)}</Link>
                                            ) : (
                                                <span>{decodeHtmlEntities(link.label)}</span>
                                            )}
                                        </Button>
                                    ))}
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
