import { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import type { PageProps } from '@inertiajs/core';

type Role = {
    id: number;
    name: string;
    slug: string;
};

type UserItem = {
    id: number;
    name: string;
    email: string;
    roles: Role[];
    can_be_deleted: boolean;
};

interface Props extends PageProps {
    users: UserItem[];
    roles: Role[];
}

export default function UsersIndex({ users, roles }: Props) {
    const { props } = usePage<{ flash?: { success?: string }; errors: Record<string, string> }>();
    const flash = props.flash ?? {};

    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);

    const createForm = useForm({
        name: '',
        email: '',
        password: '',
        roles: [] as number[],
    });

    const editForm = useForm({
        name: '',
        email: '',
        password: '',
        roles: [] as number[],
    });

    const deleteForm = useForm({});

    const toggleRole = (form: typeof createForm | typeof editForm, roleId: number) => {
        const current = form.data.roles;
        if (current.includes(roleId)) {
            form.setData('roles', current.filter((id) => id !== roleId));
        } else {
            form.setData('roles', [...current, roleId]);
        }
    };

    const submitCreate: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        createForm.post(route('admin.users.store'), {
            onSuccess: () => {
                createForm.reset();
                setCreateOpen(false);
            },
        });
    };

    const submitEdit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        if (!selectedUser) {
            return;
        }

        editForm.put(route('admin.users.update', selectedUser.id), {
            preserveScroll: true,
            onSuccess: () => {
                editForm.reset('password');
                setEditOpen(false);
            },
        });
    };

    const submitDelete = (user: UserItem) => {
        deleteForm.delete(route('admin.users.destroy', user.id), {
            preserveScroll: true,
        });
    };

    const openEdit = (user: UserItem) => {
        setSelectedUser(user);
        editForm.setData({
            name: user.name,
            email: user.email,
            password: '',
            roles: user.roles.map((role) => role.id),
        });
        setEditOpen(true);
    };

    return (
        <AppLayout>
            <Head title="Manajemen Pengguna" />

            <div className="space-y-4 p-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Pengguna</h1>
                        <p className="text-sm text-muted-foreground">Kelola akun dan peran pengguna dalam sistem.</p>
                    </div>
                    <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                        <DialogTrigger asChild>
                            <Button>Tambah Pengguna</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                                <DialogTitle>Tambah Pengguna Baru</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={submitCreate} className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="create-name">Nama</Label>
                                    <Input
                                        id="create-name"
                                        value={createForm.data.name}
                                        onChange={(event) => createForm.setData('name', event.target.value)}
                                    />
                                    <InputError message={createForm.errors.name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="create-email">Email</Label>
                                    <Input
                                        id="create-email"
                                        type="email"
                                        value={createForm.data.email}
                                        onChange={(event) => createForm.setData('email', event.target.value)}
                                    />
                                    <InputError message={createForm.errors.email} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="create-password">Password (opsional)</Label>
                                    <Input
                                        id="create-password"
                                        type="password"
                                        value={createForm.data.password}
                                        onChange={(event) => createForm.setData('password', event.target.value)}
                                        placeholder="Minimal 8 karakter"
                                    />
                                    <InputError message={createForm.errors.password} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Peran</Label>
                                    <div className="grid gap-2">
                                        {roles.map((role) => {
                                            const checked = createForm.data.roles.includes(role.id);
                                            return (
                                                <label key={role.id} className="flex items-center gap-3 text-sm">
                                                    <Checkbox
                                                        checked={checked}
                                                        onCheckedChange={() => toggleRole(createForm, role.id)}
                                                    />
                                                    <span>
                                                        <span className="font-medium">{role.name}</span>
                                                        <span className="ml-2 text-xs uppercase text-muted-foreground">{role.slug}</span>
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                    <InputError message={createForm.errors.roles} />
                                </div>
                                <DialogFooter className="justify-end gap-2">
                                    <Button type="button" variant="secondary" onClick={() => setCreateOpen(false)}>
                                        Batal
                                    </Button>
                                    <Button type="submit" disabled={createForm.processing}>
                                        {createForm.processing ? 'Menyimpan…' : 'Simpan'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {flash.success ? (
                    <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                        {flash.success}
                    </div>
                ) : null}

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Pengguna</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-border text-sm">
                                <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Nama</th>
                                        <th className="px-4 py-2 text-left">Email</th>
                                        <th className="px-4 py-2 text-left">Peran</th>
                                        <th className="px-4 py-2 text-right" />
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-4 py-2 font-medium">{user.name}</td>
                                            <td className="px-4 py-2 text-muted-foreground">{user.email}</td>
                                            <td className="px-4 py-2">
                                                <div className="flex flex-wrap gap-2">
                                                    {user.roles.map((role) => (
                                                        <span
                                                            key={role.id}
                                                            className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium"
                                                        >
                                                            {role.name}
                                                        </span>
                                                    ))}
                                                    {user.roles.length === 0 ? (
                                                        <span className="text-xs text-muted-foreground">Tidak ada peran</span>
                                                    ) : null}
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="sm" onClick={() => openEdit(user)}>
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        disabled={!user.can_be_deleted || deleteForm.processing}
                                                        onClick={() => submitDelete(user)}
                                                    >
                                                        Hapus
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                    <CardFooter className="text-xs text-muted-foreground">
                        Perubahan peran dapat mengubah akses pengguna secara instan.
                    </CardFooter>
                </Card>

                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                    <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Edit Pengguna</DialogTitle>
                        </DialogHeader>
                        {selectedUser ? (
                            <form onSubmit={submitEdit} className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-name">Nama</Label>
                                    <Input
                                        id="edit-name"
                                        value={editForm.data.name}
                                        onChange={(event) => editForm.setData('name', event.target.value)}
                                    />
                                    <InputError message={editForm.errors.name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-email">Email</Label>
                                    <Input
                                        id="edit-email"
                                        type="email"
                                        value={editForm.data.email}
                                        onChange={(event) => editForm.setData('email', event.target.value)}
                                    />
                                    <InputError message={editForm.errors.email} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-password">Password baru (opsional)</Label>
                                    <Input
                                        id="edit-password"
                                        type="password"
                                        value={editForm.data.password}
                                        onChange={(event) => editForm.setData('password', event.target.value)}
                                        placeholder="Biarkan kosong jika tidak diubah"
                                    />
                                    <InputError message={editForm.errors.password} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Peran</Label>
                                    <div className="grid gap-2">
                                        {roles.map((role) => {
                                            const checked = editForm.data.roles.includes(role.id);
                                            return (
                                                <label key={role.id} className="flex items-center gap-3 text-sm">
                                                    <Checkbox
                                                        checked={checked}
                                                        onCheckedChange={() => toggleRole(editForm, role.id)}
                                                    />
                                                    <span>
                                                        <span className="font-medium">{role.name}</span>
                                                        <span className="ml-2 text-xs uppercase text-muted-foreground">{role.slug}</span>
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                    <InputError message={editForm.errors.roles} />
                                </div>
                                <DialogFooter className="justify-end gap-2">
                                    <Button type="button" variant="secondary" onClick={() => setEditOpen(false)}>
                                        Batal
                                    </Button>
                                    <Button type="submit" disabled={editForm.processing}>
                                        {editForm.processing ? 'Menyimpan…' : 'Simpan perubahan'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        ) : null}
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
