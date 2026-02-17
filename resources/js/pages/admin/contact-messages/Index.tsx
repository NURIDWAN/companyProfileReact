import type { PageProps } from '@inertiajs/core';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Phone } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
type ContactMessage = {
    id: number;
    name: string;
    email: string;
    phone?: string | null;
    subject?: string | null;
    message: string;
    status: string;
    created_at?: string | null;
};

type StatusOption = {
    value: string;
    label: string;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginatedData<T> = {
    data: T[];
    links: PaginationLink[];
};

type ContactMessageIndexProps = PageProps & {
    messages: PaginatedData<ContactMessage>;
    filters: {
        status?: string | null;
    };
    availableStatuses: StatusOption[];
};

const statusColor: Record<string, string> = {
    new: 'bg-sky-100 text-sky-700',
    in_progress: 'bg-amber-100 text-amber-700',
    resolved: 'bg-emerald-100 text-emerald-700',
    archived: 'bg-slate-200 text-slate-700',
};

export default function ContactMessageIndex(): React.ReactElement {
    const { messages, filters, availableStatuses } = usePage<ContactMessageIndexProps>().props;

    const handleFilter = (value: string) => {
        router.get(route('admin.contact-messages.index'), value === 'all' ? {} : { status: value }, { replace: true, preserveState: true });
    };

    return (
        <AppLayout>
            <Head title="Kontak Masuk" />
            <div className="space-y-6 p-4 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900">Kontak Masuk</h1>
                        <p className="text-sm text-slate-500">Kelola pesan dari halaman kontak dan tandai progresnya.</p>
                    </div>
                    <Select defaultValue={filters.status ?? 'all'} onValueChange={handleFilter}>
                        <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="Filter status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua status</SelectItem>
                            {availableStatuses.map((status) => (
                                <SelectItem key={status.value} value={status.value}>
                                    {status.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Pesan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200 text-sm">
                                <thead className="bg-slate-50 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase">
                                    <tr>
                                        <th className="px-4 py-3">Nama</th>
                                        <th className="px-4 py-3">Kontak</th>
                                        <th className="px-4 py-3">Subjek</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Tanggal</th>
                                        <th className="px-4 py-3 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {messages.data.map((message) => (
                                        <tr key={message.id} className="hover:bg-slate-50/80">
                                            <td className="px-4 py-3">
                                                <div className="font-medium text-slate-900">{message.name}</div>
                                                <div className="text-xs text-slate-500">{message.email}</div>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-600">
                                                {message.phone ? (
                                                    <span className="flex items-center gap-1">
                                                        <Phone className="h-4 w-4" />
                                                        {message.phone}
                                                    </span>
                                                ) : (
                                                    '-'
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-600">{message.subject ?? 'Tanpa subjek'}</td>
                                            <td className="px-4 py-3">
                                                <Badge className={statusColor[message.status] ?? 'bg-slate-200 text-slate-800'}>
                                                    {availableStatuses.find((status) => status.value === message.status)?.label ?? message.status}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-600">
                                                {message.created_at ? new Date(message.created_at).toLocaleDateString('id-ID') : '-'}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <Button asChild size="sm" className="rounded-full">
                                                    <Link href={route('admin.contact-messages.show', message.id)}>Detail</Link>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {messages.links.map((link) => (
                                <Button key={link.label} size="sm" variant={link.active ? 'default' : 'outline'} disabled={!link.url} asChild>
                                    <Link href={link.url ?? '#'} dangerouslySetInnerHTML={{ __html: link.label }} />
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
