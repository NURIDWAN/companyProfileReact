import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Head, Link } from "@inertiajs/react";
import { DeleteButton } from "@/components/DeleteButton";

type Project = {
    id: number;
    name: string;
    slug: string;
    client_name?: string | null;
    status: string;
    updated_at: string;
};

type Paginated<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
};

interface Props {
    projects: Paginated<Project>;
}

export default function ProjectIndex({ projects }: Props) {
    return (
        <AppLayout>
            <Head title="Manajemen Proyek" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Proyek</h1>
                    <Button asChild>
                        <Link href={route("admin.projects.create")}>Tambah Proyek</Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Proyek</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-border text-sm">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Nama</th>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Klien</th>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Status</th>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Update Terakhir</th>
                                        <th className="px-4 py-2" />
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {projects.data.map((project) => (
                                        <tr key={project.id}>
                                            <td className="px-4 py-2">{project.name}</td>
                                            <td className="px-4 py-2 text-muted-foreground">{project.client_name ?? "-"}</td>
                                            <td className="px-4 py-2">
                                                <span className="inline-flex rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-500 dark:text-blue-400">
                                                    {project.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 text-muted-foreground">
                                                {new Date(project.updated_at).toLocaleDateString("id-ID")}
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="flex justify-end gap-2">
                                                    <Button asChild variant="outline" size="sm">
                                                        <Link href={route("admin.projects.edit", project.id)}>Edit</Link>
                                                    </Button>
                                                    <DeleteButton
                                                        url={route("admin.projects.destroy", project.id)}
                                                        confirmMessage={`Hapus proyek "${project.name}"?`}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {projects.links.map((link) => (
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
