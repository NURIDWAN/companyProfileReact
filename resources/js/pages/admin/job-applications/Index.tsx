import type { PageProps } from '@inertiajs/core';
import { Head, Link, router, usePage } from '@inertiajs/react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { JobApplication } from '@/types';

type StatusOption = {
    value: string;
    label: string;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginatedApplications = {
    data: JobApplication[];
    links: PaginationLink[];
};

type JobApplicationIndexProps = PageProps & {
    applications: PaginatedApplications;
    filters: {
        status?: string | null;
    };
    availableStatuses: StatusOption[];
};

const statusColor: Record<string, string> = {
    pending: 'bg-slate-200 text-slate-800',
    reviewing: 'bg-blue-100 text-blue-700',
    shortlisted: 'bg-emerald-100 text-emerald-700',
    interview: 'bg-amber-100 text-amber-700',
    offer: 'bg-purple-100 text-purple-700',
    rejected: 'bg-rose-100 text-rose-700',
};

export default function JobApplicationIndex(): React.ReactElement {
    const { applications, filters, availableStatuses } = usePage<JobApplicationIndexProps>().props;

    const handleFilterChange = (value: string) => {
        router.get(route('admin.job-applications.index'), value === 'all' ? {} : { status: value }, { preserveState: true, replace: true });
    };

    return (
        <AppLayout>
            <Head title="Lamaran Karir" />
            <div className="space-y-6 p-4 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Lamaran Karir</h1>
                        <p className="text-sm text-slate-500">Kelola lamaran kandidat dan tindak lanjuti proses rekrutmen dari satu tempat.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Select onValueChange={handleFilterChange} defaultValue={filters.status ?? 'all'}>
                            <SelectTrigger className="w-[220px]">
                                <SelectValue placeholder="Semua status" />
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
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Lamaran</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200 text-sm">
                                <thead>
                                    <tr className="bg-slate-50 text-left font-semibold text-slate-500">
                                        <th className="px-4 py-3">Kandidat</th>
                                        <th className="px-4 py-3">Posisi</th>
                                        <th className="px-4 py-3">Kontak</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Diajukan</th>
                                        <th className="px-4 py-3 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {applications.data.map((application) => (
                                        <tr key={application.id} className="hover:bg-slate-50/60">
                                            <td className="px-4 py-3">
                                                <div className="font-medium text-slate-900">{application.name}</div>
                                                <div className="text-xs text-slate-500">{application.email}</div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="text-sm font-medium text-slate-800">
                                                    {application.job?.title ?? 'Posisi tidak tersedia'}
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    {application.job?.department} • {application.job?.location}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-600">{application.phone ?? '-'}</td>
                                            <td className="px-4 py-3">
                                                <Badge className={statusColor[application.status] ?? 'bg-slate-200 text-slate-800'}>
                                                    {availableStatuses.find((status) => status.value === application.status)?.label ??
                                                        application.status}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-600">
                                                {application.created_at ? new Date(application.created_at).toLocaleDateString('id-ID') : '-'}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex flex-wrap justify-end gap-2">
                                                    {application.resume_url && (
                                                        <Button size="sm" variant="outline" asChild>
                                                            <a
                                                                href={route('admin.job-applications.resume', application.id)}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                Unduh CV
                                                            </a>
                                                        </Button>
                                                    )}
                                                    <Button size="sm" asChild>
                                                        <Link href={route('admin.job-applications.show', application.id)}>Detail</Link>
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            {applications.links.map((link) => (
                                <Button key={link.label} variant={link.active ? 'default' : 'outline'} size="sm" disabled={!link.url} asChild>
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
