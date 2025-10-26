import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

type Service = {
    id: number;
    name: string;
    slug: string;
    icon?: string | null;
    excerpt?: string | null;
    description?: string | null;
    display_order: number;
    is_active: boolean;
};

interface Props {
    service?: Service;
}

export default function ServiceForm({ service }: Props) {
    const title = service ? "Edit Layanan" : "Tambah Layanan";

    const { data, setData, post, put, processing, errors } = useForm({
        name: service?.name ?? "",
        slug: service?.slug ?? "",
        icon: service?.icon ?? "",
        excerpt: service?.excerpt ?? "",
        description: service?.description ?? "",
        display_order: service?.display_order ?? 0,
        is_active: service?.is_active ?? true,
    });
    const generalError = (errors as typeof errors & { general?: string }).general;

    const submit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        if (service) {
            put(route("admin.services.update", service.id), {
                preserveScroll: true,
            });
        } else {
            post(route("admin.services.store"), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout>
            <Head title={title} />

            <div className="p-4">
                <div className="mb-4">
                    <Link href={route("admin.services.index")} className="text-sm text-muted-foreground hover:text-foreground">
                        &larr; Kembali ke daftar layanan
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
                                <Label htmlFor="icon">Ikon (opsional)</Label>
                                <Input
                                    id="icon"
                                    value={data.icon ?? ""}
                                    onChange={(event) => setData("icon", event.target.value)}
                                />
                                {errors.icon && <p className="text-xs text-rose-500">{errors.icon}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="excerpt">Ringkasan</Label>
                                <Input
                                    id="excerpt"
                                    value={data.excerpt ?? ""}
                                    onChange={(event) => setData("excerpt", event.target.value)}
                                />
                                {errors.excerpt && <p className="text-xs text-rose-500">{errors.excerpt}</p>}
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
                                <Label htmlFor="display_order">Urutan Tampil</Label>
                                <Input
                                    id="display_order"
                                    type="number"
                                    min={0}
                                    value={data.display_order}
                                    onChange={(event) => setData("display_order", Number(event.target.value))}
                                />
                                {errors.display_order && <p className="text-xs text-rose-500">{errors.display_order}</p>}
                            </div>
                            <label className="flex items-center gap-2">
                                <Checkbox
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData("is_active", Boolean(checked))}
                                />
                                <span>Aktif</span>
                            </label>
                            {errors.is_active && <p className="text-xs text-rose-500">{errors.is_active}</p>}
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button type="submit" disabled={processing}>
                                {service ? "Simpan Perubahan" : "Simpan"}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
