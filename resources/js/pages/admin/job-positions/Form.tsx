import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useMemo } from "react";

type JobPosition = {
    id: number;
    title: string;
    slug: string;
    department?: string | null;
    location?: string | null;
    employment_type: string;
    salary_range?: string | null;
    description?: string | null;
    requirements?: string | null;
    is_active: boolean;
    posted_at?: string | null;
};

interface Props {
    position?: JobPosition;
}

export default function JobPositionForm({ position }: Props) {
    const title = position ? "Edit Lowongan" : "Tambah Lowongan";
    const form = useForm({
        title: position?.title ?? "",
        slug: position?.slug ?? "",
        department: position?.department ?? "",
        location: position?.location ?? "",
        employment_type: position?.employment_type ?? "full_time",
        salary_range: position?.salary_range ?? "",
        description: position?.description ?? "",
        requirements: position?.requirements ?? "",
        is_active: position?.is_active ?? true,
        posted_at: position?.posted_at?.slice(0, 10) ?? "",
    });

    const { data, setData, processing, errors } = form;
    const generalError = (errors as typeof errors & { general?: string }).general;

    const action = useMemo(() => {
        return position
            ? route("admin.job-positions.update", position.id)
            : route("admin.job-positions.store");
    }, [position]);

    const submit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        if (position) {
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
                    <Link href={route("admin.job-positions.index")} className="text-sm text-muted-foreground hover:text-foreground">
                        &larr; Kembali ke daftar lowongan
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
                            <Label htmlFor="title">Posisi</Label>
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
                        <div className="grid gap-2 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="department">Departemen</Label>
                                <Input
                                    id="department"
                                    value={data.department ?? ""}
                                    onChange={(event) => setData("department", event.target.value)}
                                />
                                {errors.department && <p className="text-xs text-rose-500">{errors.department}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="location">Lokasi</Label>
                                <Input
                                    id="location"
                                    value={data.location ?? ""}
                                    onChange={(event) => setData("location", event.target.value)}
                                />
                                {errors.location && <p className="text-xs text-rose-500">{errors.location}</p>}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="employment_type">Tipe Pekerjaan</Label>
                            <Input
                                id="employment_type"
                                value={data.employment_type}
                                onChange={(event) => setData("employment_type", event.target.value)}
                                required
                            />
                            {errors.employment_type && <p className="text-xs text-rose-500">{errors.employment_type}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="salary_range">Range Gaji</Label>
                            <Input
                                id="salary_range"
                                value={data.salary_range ?? ""}
                                onChange={(event) => setData("salary_range", event.target.value)}
                            />
                            {errors.salary_range && <p className="text-xs text-rose-500">{errors.salary_range}</p>}
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
                        <div className="grid gap-2">
                            <Label htmlFor="requirements">Kualifikasi</Label>
                            <textarea
                                id="requirements"
                                className="min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                value={data.requirements ?? ""}
                                onChange={(event) => setData("requirements", event.target.value)}
                            />
                            {errors.requirements && <p className="text-xs text-rose-500">{errors.requirements}</p>}
                        </div>
                        <div className="grid gap-2 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="posted_at">Tanggal Posting</Label>
                                <Input
                                    id="posted_at"
                                    type="date"
                                    value={data.posted_at ?? ""}
                                    onChange={(event) => setData("posted_at", event.target.value)}
                                />
                                {errors.posted_at && <p className="text-xs text-rose-500">{errors.posted_at}</p>}
                            </div>
                            <div className="flex items-center gap-2 pt-7">
                                <Checkbox
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData("is_active", Boolean(checked))}
                                />
                                <span>Aktif</span>
                                {errors.is_active && <p className="text-xs text-rose-500">{errors.is_active}</p>}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button type="submit" disabled={processing}>
                            {position ? "Simpan Perubahan" : "Simpan"}
                        </Button>
                    </CardFooter>
                </Card>
                </form>
            </div>
        </AppLayout>
    );
}
