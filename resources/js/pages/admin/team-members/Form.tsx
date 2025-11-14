import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useMemo } from "react";

type TeamMember = {
    id: number;
    name: string;
    role: string;
    photo?: string | null;
    photo_url?: string | null;
    email?: string | null;
    phone?: string | null;
    linkedin?: string | null;
    display_order: number;
    is_active: boolean;
    bio?: string | null;
};

interface Props {
    member?: TeamMember;
}

export default function TeamMemberForm({ member }: Props) {
    const title = member ? "Edit Anggota Tim" : "Tambah Anggota Tim";
    const form = useForm({
        name: member?.name ?? "",
        role: member?.role ?? "",
        photo: member?.photo ?? "",
        photo_file: undefined as File | undefined,
        email: member?.email ?? "",
        phone: member?.phone ?? "",
        linkedin: member?.linkedin ?? "",
        display_order: member?.display_order ?? 0,
        is_active: member?.is_active ?? true,
        bio: member?.bio ?? "",
    });

    const { data, setData, processing, errors } = form;
    const generalError = (errors as typeof errors & { general?: string }).general;

    const action = useMemo(() => {
        return member ? route("admin.team-members.update", member.id) : route("admin.team-members.store");
    }, [member]);

    const submit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        form.transform((formData) => {
            const transformed = {
                ...formData,
                photo_file: formData.photo_file ?? undefined,
            };

            return member ? { ...transformed, _method: "put" } : transformed;
        });

        form.post(action, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => {
                setData("photo_file", undefined);
                form.transform((data) => data);
            },
        });
    };

    return (
        <AppLayout>
            <Head title={title} />
            <div className="p-4">
                <div className="mb-4">
                    <Link href={route("admin.team-members.index")} className="text-sm text-muted-foreground hover:text-foreground">
                        &larr; Kembali ke daftar tim
                    </Link>
                </div>
                <form onSubmit={submit} encType="multipart/form-data">
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
                            <Label htmlFor="role">Peran</Label>
                            <Input
                                id="role"
                                value={data.role}
                                onChange={(event) => setData("role", event.target.value)}
                                required
                            />
                            {errors.role && <p className="text-xs text-rose-500">{errors.role}</p>}
                        </div>
                        <div className="grid gap-2 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email ?? ""}
                                    onChange={(event) => setData("email", event.target.value)}
                                />
                                {errors.email && <p className="text-xs text-rose-500">{errors.email}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Telepon</Label>
                                <Input
                                    id="phone"
                                    value={data.phone ?? ""}
                                    onChange={(event) => setData("phone", event.target.value)}
                                />
                                {errors.phone && <p className="text-xs text-rose-500">{errors.phone}</p>}
                            </div>
                        </div>
                        <div className="grid gap-2 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="linkedin">LinkedIn</Label>
                                <Input
                                    id="linkedin"
                                    value={data.linkedin ?? ""}
                                    onChange={(event) => setData("linkedin", event.target.value)}
                                />
                                {errors.linkedin && <p className="text-xs text-rose-500">{errors.linkedin}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="photo_file">Foto Anggota</Label>
                                <Input
                                    id="photo_file"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => setData("photo_file", event.target.files?.[0])}
                                />
                                {errors.photo_file && <p className="text-xs text-rose-500">{errors.photo_file}</p>}
                                {member?.photo_url && data.photo !== "" && (
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={member.photo_url}
                                            alt={member?.name ?? "Foto anggota"}
                                            className="h-16 w-16 rounded-full object-cover"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setData("photo", "");
                                                setData("photo_file", undefined);
                                            }}
                                        >
                                            Hapus Foto
                                        </Button>
                                    </div>
                                )}
                                {errors.photo && <p className="text-xs text-rose-500">{errors.photo}</p>}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="display_order">Urutan Tampil</Label>
                            <Input
                                id="display_order"
                                type="number"
                                min={0}
                                value={data.display_order ?? 0}
                                onChange={(event) => setData("display_order", Number(event.target.value))}
                            />
                            {errors.display_order && <p className="text-xs text-rose-500">{errors.display_order}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="bio">Bio Singkat</Label>
                            <Textarea
                                id="bio"
                                value={data.bio ?? ""}
                                onChange={(event) => setData("bio", event.target.value)}
                            />
                            {errors.bio && <p className="text-xs text-rose-500">{errors.bio}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                checked={data.is_active}
                                onCheckedChange={(checked) => setData("is_active", Boolean(checked))}
                            />
                            <span>Aktif</span>
                        </div>
                        {errors.is_active && <p className="text-xs text-rose-500">{errors.is_active}</p>}
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button type="submit" disabled={processing}>
                            {member ? "Simpan Perubahan" : "Simpan"}
                        </Button>
                    </CardFooter>
                </Card>
                </form>
            </div>
        </AppLayout>
    );
}
