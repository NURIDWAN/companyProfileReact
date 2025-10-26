import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Head, Link } from "@inertiajs/react";

type Position = {
    id: number;
    title: string;
    slug: string;
    department?: string | null;
    location?: string | null;
    employment_type: string;
    is_active: boolean;
    posted_at?: string | null;
};

type Paginated<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
};

interface Props {
    positions: Paginated<Position>;
}

export default function JobPositionIndex({ positions }: Props) {
    return (
        <AppLayout>
            <Head title="Manajemen Karir" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Karir</h1>
                    <Button asChild>
                        <Link href={route("admin.job-positions.create")}>Tambah Lowongan</Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Lowongan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-border text-sm">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Posisi</th>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Departemen</th>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Lokasi</th>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Tipe</th>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Status</th>
                                        <th className="px-4 py-2" />
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {positions.data.map((position) => (
                                        <tr key={position.id}>
                                            <td className="px-4 py-2">{position.title}</td>
                                            <td className="px-4 py-2 text-muted-foreground">{position.department ?? "-"}</td>
                                            <td className="px-4 py-2 text-muted-foreground">{position.location ?? "Remote"}</td>
                                            <td className="px-4 py-2 text-muted-foreground">{position.employment_type}</td>
                                            <td className="px-4 py-2">
                                                <span
                                                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                                        position.is_active
                                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                                            : "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                                                    }`}
                                                >
                                                    {position.is_active ? "Aktif" : "Ditutup"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 text-right">
                                                <Button asChild variant="outline" size="sm">
                                                    <Link href={route("admin.job-positions.edit", position.id)}>Edit</Link>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {positions.links.map((link) => (
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
