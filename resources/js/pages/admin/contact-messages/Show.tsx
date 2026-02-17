import type { PageProps } from '@inertiajs/core';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Calendar, Mail, Phone } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';

type ContactMessage = {
    id: number;
    name: string;
    email: string;
    phone?: string | null;
    subject?: string | null;
    message: string;
    status: string;
    notes?: string | null;
    created_at?: string | null;
};

type StatusOption = {
    value: string;
    label: string;
};

type ContactMessageShowProps = PageProps & {
    message: ContactMessage;
    availableStatuses: StatusOption[];
};

const statusColor: Record<string, string> = {
    new: 'bg-sky-100 text-sky-700',
    in_progress: 'bg-amber-100 text-amber-700',
    resolved: 'bg-emerald-100 text-emerald-700',
    archived: 'bg-slate-200 text-slate-700',
};

export default function ContactMessageShow(): React.ReactElement {
    const { message, availableStatuses, flash } = usePage<ContactMessageShowProps & { flash?: { success?: string } }>().props;
    const form = useForm({
        status: message.status,
        notes: message.notes ?? '',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.put(route('admin.contact-messages.update', message.id), {
            preserveScroll: true,
        });
    };

    const statusLabel = availableStatuses.find((status) => status.value === message.status)?.label ?? message.status;

    return (
        <AppLayout>
            <Head title={`Pesan dari ${message.name}`} />
            <div className="space-y-6 p-4 sm:p-6">
                <div className="flex flex-col gap-2">
                    <Link href={route('admin.contact-messages.index')} className="text-sm text-blue-600">
                        &larr; Kembali ke daftar kontak
                    </Link>
                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="text-2xl font-bold text-slate-900">{message.name}</h1>
                        <Badge className={statusColor[message.status] ?? 'bg-slate-200 text-slate-700'}>{statusLabel}</Badge>
                    </div>
                    <p className="text-sm text-slate-500">
                        Pesan diterima pada{' '}
                        {message.created_at ? new Date(message.created_at).toLocaleDateString('id-ID') : 'tanggal tidak diketahui'}.
                    </p>
                </div>

                {flash?.success && (
                    <Alert className="border-emerald-200 bg-emerald-50 text-emerald-700">
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}

                <div className="grid gap-6 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Detail Pesan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-slate-700">
                            <div>
                                <p className="text-xs text-slate-500 uppercase">Subjek</p>
                                <p className="text-base font-medium text-slate-900">{message.subject ?? 'Tanpa subjek'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase">Pesan</p>
                                <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700">{message.message}</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Tindak Lanjut</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2 text-sm text-slate-600">
                                <p className="font-semibold text-slate-900">Kontak</p>
                                <p className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-slate-500" />
                                    <a href={`mailto:${message.email}`} className="text-blue-600">
                                        {message.email}
                                    </a>
                                </p>
                                {message.phone && (
                                    <p className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-slate-500" />
                                        {message.phone}
                                    </p>
                                )}
                                <p className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-slate-500" />
                                    {message.created_at
                                        ? new Date(message.created_at).toLocaleString('id-ID', {
                                              day: 'numeric',
                                              month: 'long',
                                              year: 'numeric',
                                              hour: '2-digit',
                                              minute: '2-digit',
                                          })
                                        : '-'}
                                </p>
                            </div>

                            <form onSubmit={submit} className="space-y-3">
                                <div>
                                    <Label className="text-xs text-slate-500 uppercase">Status</Label>
                                    <select
                                        value={form.data.status}
                                        onChange={(event) => form.setData('status', event.target.value)}
                                        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                    >
                                        {availableStatuses.map((status) => (
                                            <option key={status.value} value={status.value}>
                                                {status.label}
                                            </option>
                                        ))}
                                    </select>
                                    {form.errors.status && <p className="mt-1 text-xs text-rose-500">{form.errors.status}</p>}
                                </div>
                                <div>
                                    <Label className="text-xs text-slate-500 uppercase">Catatan</Label>
                                    <Textarea
                                        value={form.data.notes}
                                        onChange={(event) => form.setData('notes', event.target.value)}
                                        rows={4}
                                        className="mt-1"
                                        placeholder="Catatan internal atau hasil tindak lanjut"
                                    />
                                    {form.errors.notes && <p className="mt-1 text-xs text-rose-500">{form.errors.notes}</p>}
                                </div>
                                <Button type="submit" disabled={form.processing} className="w-full">
                                    Simpan
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
