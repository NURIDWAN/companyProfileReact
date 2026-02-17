import type { PageProps } from '@inertiajs/core';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useMemo } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { JobApplication } from '@/types';

const statusColor: Record<string, string> = {
    pending: 'bg-slate-200 text-slate-800',
    reviewing: 'bg-blue-100 text-blue-700',
    shortlisted: 'bg-emerald-100 text-emerald-700',
    interview: 'bg-amber-100 text-amber-700',
    offer: 'bg-purple-100 text-purple-700',
    rejected: 'bg-rose-100 text-rose-700',
};

type StatusOption = {
    value: string;
    label: string;
};

type JobApplicationShowProps = PageProps & {
    application: JobApplication;
    availableStatuses: StatusOption[];
};

export default function JobApplicationShow() {
    const { application, availableStatuses } = usePage<JobApplicationShowProps>().props;
    const form = useForm({ status: application.status });

    const statusLabel = useMemo(() => {
        return availableStatuses.find((status) => status.value === application.status)?.label ?? application.status;
    }, [availableStatuses, application.status]);

    const submitStatus = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.patch(route('admin.job-applications.status', application.id), {
            preserveScroll: true,
        });
    };

    const deleteApplication = () => {
        if (!confirm('Hapus lamaran ini?')) {
            return;
        }

        router.delete(route('admin.job-applications.destroy', application.id));
    };

    return (
        <AppLayout>
            <Head title={`Lamaran: ${application.name}`} />
            <div className="space-y-6 p-4 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-slate-500">
                            <Link href={route('admin.job-applications.index')} className="text-blue-600">
                                &larr; Kembali ke daftar lamaran
                            </Link>
                        </p>
                        <h1 className="text-2xl font-bold text-slate-900">{application.name}</h1>
                        <p className="text-sm text-slate-500">Lamaran untuk {application.job?.title ?? 'Posisi tidak tersedia'}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Badge className={statusColor[application.status] ?? 'bg-slate-200 text-slate-800'}>{statusLabel}</Badge>
                        <Button variant="destructive" onClick={deleteApplication}>
                            Hapus
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Informasi Kandidat</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label className="text-xs text-slate-500 uppercase">Nama</Label>
                                    <p className="text-base font-medium text-slate-900">{application.name}</p>
                                </div>
                                <div>
                                    <Label className="text-xs text-slate-500 uppercase">Email</Label>
                                    <p className="text-base text-slate-700">
                                        <a href={`mailto:${application.email}`} className="text-blue-600">
                                            {application.email}
                                        </a>
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-xs text-slate-500 uppercase">Telepon</Label>
                                    <p className="text-base text-slate-700">{application.phone ?? '-'}</p>
                                </div>
                                <div>
                                    <Label className="text-xs text-slate-500 uppercase">LinkedIn</Label>
                                    {application.linkedin_url ? (
                                        <a href={application.linkedin_url} className="text-blue-600" target="_blank" rel="noreferrer">
                                            {application.linkedin_url}
                                        </a>
                                    ) : (
                                        <p className="text-base text-slate-700">-</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <Label className="text-xs text-slate-500 uppercase">Portofolio</Label>
                                {application.portfolio_url ? (
                                    <a href={application.portfolio_url} className="text-blue-600" target="_blank" rel="noreferrer">
                                        {application.portfolio_url}
                                    </a>
                                ) : (
                                    <p className="text-base text-slate-700">-</p>
                                )}
                            </div>

                            <div>
                                <Label className="text-xs text-slate-500 uppercase">Cover Letter</Label>
                                <div className="rounded-lg border bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
                                    {application.cover_letter ?? 'Kandidat tidak menyertakan cover letter.'}
                                </div>
                            </div>

                            {application.resume_url && (
                                <div>
                                    <Label className="text-xs text-slate-500 uppercase">Lampiran</Label>
                                    <div className="mt-2 flex flex-wrap gap-3">
                                        <Button asChild variant="outline">
                                            <a
                                                href={route('admin.job-applications.resume', application.id)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Unduh CV
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Ringkasan Posisi</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-slate-500">Posisi</p>
                                <p className="text-base font-medium text-slate-900">{application.job?.title ?? '-'}</p>
                                {application.job && (
                                    <Link href={route('career.show', application.job.slug)} className="text-xs text-blue-600">
                                        Lihat halaman publik &rarr;
                                    </Link>
                                )}
                            </div>
                            <div className="grid gap-3 text-sm text-slate-600">
                                <p>Departemen: {application.job?.department ?? '-'}</p>
                                <p>Lokasi: {application.job?.location ?? '-'}</p>
                                <p>Tipe: {application.job?.employment_type ?? '-'}</p>
                                <p>Rentang gaji: {application.job?.salary_range ?? '-'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-700">Pembaruan Status</p>
                                <form onSubmit={submitStatus} className="mt-2 space-y-3">
                                    <div>
                                        <Label className="text-xs text-slate-500 uppercase">Status proses</Label>
                                        <select
                                            value={form.data.status}
                                            onChange={(event) => form.setData('status', event.target.value)}
                                            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                        >
                                            {availableStatuses.map((status) => (
                                                <option key={status.value} value={status.value}>
                                                    {status.label}
                                                </option>
                                            ))}
                                        </select>
                                        {form.errors.status && <p className="mt-1 text-xs text-rose-500">{form.errors.status}</p>}
                                    </div>
                                    <Button type="submit" disabled={form.processing} className="w-full">
                                        Simpan Status
                                    </Button>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
