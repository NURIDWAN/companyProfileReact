import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Head, Link } from "@inertiajs/react";

type TeamMember = {
    id: number;
    name: string;
    role: string;
    email?: string | null;
    is_active: boolean;
    updated_at: string;
};

type Paginated<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
};

interface Props {
    members: Paginated<TeamMember>;
}

export default function TeamMemberIndex({ members }: Props) {
    return (
        <AppLayout>
            <Head title="Tim Manajemen" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Tim Manajemen</h1>
                    <Button asChild>
                        <Link href={route("admin.team-members.create")}>Tambah Anggota</Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Anggota</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-border text-sm">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Nama</th>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Peran</th>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Email</th>
                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Status</th>
                                        <th className="px-4 py-2" />
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {members.data.map((member) => (
                                        <tr key={member.id}>
                                            <td className="px-4 py-2">{member.name}</td>
                                            <td className="px-4 py-2 text-muted-foreground">{member.role}</td>
                                            <td className="px-4 py-2 text-muted-foreground">{member.email ?? "-"}</td>
                                            <td className="px-4 py-2">
                                                <span
                                                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                                        member.is_active
                                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                                            : "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                                                    }`}
                                                >
                                                    {member.is_active ? "Aktif" : "Nonaktif"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 text-right">
                                                <Button asChild variant="outline" size="sm">
                                                    <Link href={route("admin.team-members.edit", member.id)}>Edit</Link>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {members.links.map((link) => (
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
