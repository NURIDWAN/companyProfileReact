import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useMemo } from "react";

type Project = {
    id: number;
    name: string;
    slug: string;
    client_name?: string | null;
    cover_image?: string | null;
    summary?: string | null;
    description?: string | null;
    started_at?: string | null;
    completed_at?: string | null;
    status: string;
};

interface Props {
    project?: Project;
}

export default function ProjectForm({ project }: Props) {
    const title = project ? "Edit Proyek" : "Tambah Proyek";
    const form = useForm({
        name: project?.name ?? "",
        slug: project?.slug ?? "",
        client_name: project?.client_name ?? "",
        cover_image: project?.cover_image ?? "",
        summary: project?.summary ?? "",
        description: project?.description ?? "",
        started_at: project?.started_at ? project.started_at.slice(0, 10) : "",
        completed_at: project?.completed_at ? project.completed_at.slice(0, 10) : "",
        status: project?.status ?? "draft",
    });

    const { data, setData, processing, errors } = form;
    const generalError = (errors as typeof errors & { general?: string }).general;

    const action = useMemo(() => {
        return project
            ? route("admin.projects.update", project.id)
            : route("admin.projects.store");
    }, [project]);

    const submit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        if (project) {
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
                    <Link href={route("admin.projects.index")} className="text-sm text-muted-foreground hover:text-foreground">
                        &larr; Kembali ke daftar proyek
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
                            <Label htmlFor="name">Nama</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(event) => setData("name", event.target.value)}
                                required
                            />
                            {errors.name && <p className="text-xs text-rose-500">{errors.name}</p>}
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
                            <Label htmlFor="client_name">Nama Klien</Label>
                            <Input
                                id="client_name"
                                value={data.client_name ?? ""}
                                onChange={(event) => setData("client_name", event.target.value)}
                            />
                            {errors.client_name && <p className="text-xs text-rose-500">{errors.client_name}</p>}
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
                        <div className="grid gap-2">
                            <Label htmlFor="summary">Ringkasan</Label>
                            <Input
                                id="summary"
                                value={data.summary ?? ""}
                                onChange={(event) => setData("summary", event.target.value)}
                            />
                            {errors.summary && <p className="text-xs text-rose-500">{errors.summary}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Deskripsi</Label>
                            <textarea
                                id="description"
                                className="min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                value={data.description ?? ""}
                                onChange={(event) => setData("description", event.target.value)}
                            />
                            {errors.description && <p className="text-xs text-rose-500">{errors.description}</p>}
                        </div>
                        <div className="grid gap-2 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="started_at">Mulai</Label>
                                <Input
                                    id="started_at"
                                    type="date"
                                    value={data.started_at ?? ""}
                                    onChange={(event) => setData("started_at", event.target.value)}
                                />
                                {errors.started_at && <p className="text-xs text-rose-500">{errors.started_at}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="completed_at">Selesai</Label>
                                <Input
                                    id="completed_at"
                                    type="date"
                                    value={data.completed_at ?? ""}
                                    onChange={(event) => setData("completed_at", event.target.value)}
                                />
                                {errors.completed_at && <p className="text-xs text-rose-500">{errors.completed_at}</p>}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Input
                                id="status"
                                value={data.status}
                                onChange={(event) => setData("status", event.target.value)}
                                required
                            />
                            {errors.status && <p className="text-xs text-rose-500">{errors.status}</p>}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button type="submit" disabled={processing}>
                            {project ? "Simpan Perubahan" : "Simpan"}
                        </Button>
                    </CardFooter>
                </Card>
                </form>
            </div>
        </AppLayout>
    );
}
