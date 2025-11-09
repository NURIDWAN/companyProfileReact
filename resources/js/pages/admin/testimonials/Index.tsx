import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Head, Link } from "@inertiajs/react";
import { DeleteButton } from "@/components/DeleteButton";

type Testimonial = {
    id: number;
    author_name: string;
    company?: string | null;
    rating?: number | null;
    is_active: boolean;
    updated_at: string;
};

type Paginated<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
};

interface Props {
    testimonials: Paginated<Testimonial>;
}

export default function TestimonialIndex({ testimonials }: Props) {
    return (
        <AppLayout>
            <Head title="Manajemen Testimoni" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Testimoni</h1>
                    <Button asChild>
                        <Link href={route("admin.testimonials.create")}>Tambah Testimoni</Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Testimoni</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-border text-sm">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Nama</th>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Perusahaan</th>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Rating</th>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Status</th>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Update</th>
                                        <th className="px-4 py-2" />
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {testimonials.data.map((testimonial) => (
                                        <tr key={testimonial.id}>
                                            <td className="px-4 py-2">{testimonial.author_name}</td>
                                            <td className="px-4 py-2 text-muted-foreground">{testimonial.company ?? "-"}</td>
                                            <td className="px-4 py-2 text-muted-foreground">{testimonial.rating ?? "-"}</td>
                                            <td className="px-4 py-2">
                                                <span
                                                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                                        testimonial.is_active
                                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                                            : "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                                                    }`}
                                                >
                                                    {testimonial.is_active ? "Aktif" : "Arsip"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 text-muted-foreground">
                                                {new Date(testimonial.updated_at).toLocaleDateString("id-ID")}
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="flex justify-end gap-2">
                                                    <Button asChild variant="outline" size="sm">
                                                        <Link href={route("admin.testimonials.edit", testimonial.id)}>Edit</Link>
                                                    </Button>
                                                    <DeleteButton
                                                        url={route("admin.testimonials.destroy", testimonial.id)}
                                                        confirmMessage={`Hapus testimoni "${testimonial.author_name}"?`}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {testimonials.links.map((link) => (
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
