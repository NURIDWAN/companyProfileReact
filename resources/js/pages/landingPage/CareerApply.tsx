import { useForm, usePage, Link } from '@inertiajs/react';
import type { PageProps } from '@inertiajs/core';
import { Briefcase, Building, MapPin } from 'lucide-react';
import { FormEventHandler, useRef } from 'react';

import LandingPageLayout from '@/layouts/landingPage-layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RecaptchaField, type RecaptchaFieldHandle } from '@/components/RecaptchaField';

type JobSummary = {
    id: number;
    title: string;
    slug: string;
    department?: string | null;
    location?: string | null;
    employment_type?: string | null;
    salary_range?: string | null;
};

type CareerApplyPageProps = PageProps & {
    position: JobSummary;
};

export default function CareerApplyPage() {
    const { position, flash } = usePage<CareerApplyPageProps & { flash?: { success?: string } }>().props;
    const recaptchaEnabled = import.meta.env.VITE_RECAPTCHA_ENABLED !== 'false';
    const recaptchaRef = useRef<RecaptchaFieldHandle>(null);

    const form = useForm({
        name: '',
        email: '',
        phone: '',
        linkedin_url: '',
        portfolio_url: '',
        cover_letter: '',
        resume: undefined as File | undefined,
        recaptcha_token: '',
    });

    const { data, setData, post, processing, errors, reset } = form;

    const submit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        post(route('career.apply.store', position.slug), {
            forceFormData: true,
            onSuccess: () => {
                reset();
            },
            onFinish: () => {
                if (recaptchaEnabled) {
                    recaptchaRef.current?.reset();
                }
                setData('recaptcha_token', '');
            },
        });
    };

    return (
        <LandingPageLayout>
            <div className="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                <Link href={route('career.show', position.slug)} className="text-sm text-blue-600">
                    &larr; Kembali ke detail posisi
                </Link>

                <header className="space-y-3">
                    <p className="text-xs uppercase tracking-wide text-blue-600">Lamaran</p>
                    <h1 className="text-3xl font-bold text-slate-900">Lamar {position.title}</h1>
                    <p className="text-slate-600">
                        Lengkapi data berikut dan unggah CV terbaik Anda. Tim People kami akan menghubungi Anda maksimal 5 hari kerja setelah
                        lamaran diterima.
                    </p>
                </header>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Ringkasan Posisi</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-3 text-sm text-slate-600 md:grid-cols-2">
                        <p className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-blue-600" />
                            {position.department ?? 'Divisi Umum'}
                        </p>
                        <p className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-blue-600" />
                            {position.location ?? 'Lokasi fleksibel'}
                        </p>
                        <p className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-blue-600" />
                            {position.employment_type ?? 'Full-time'}
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="h-4 w-4 rounded-full bg-blue-600" />
                            {position.salary_range ?? 'Kompensasi kompetitif'}
                        </p>
                    </CardContent>
                </Card>

                <form onSubmit={submit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    {flash?.success && (
                        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                            {flash.success as string}
                        </div>
                    )}

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="name">
                                Nama Lengkap
                            </label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(event) => setData('name', event.target.value)}
                                placeholder="Nama lengkap Anda"
                            />
                            {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="email">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(event) => setData('email', event.target.value)}
                                placeholder="email@domain.com"
                            />
                            {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email}</p>}
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="phone">
                                Nomor Telepon / WhatsApp
                            </label>
                            <Input
                                id="phone"
                                value={data.phone}
                                onChange={(event) => setData('phone', event.target.value)}
                                placeholder="+62 812 ..."
                            />
                            {errors.phone && <p className="mt-1 text-xs text-rose-500">{errors.phone}</p>}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="linkedin_url">
                                LinkedIn (Opsional)
                            </label>
                            <Input
                                id="linkedin_url"
                                value={data.linkedin_url}
                                onChange={(event) => setData('linkedin_url', event.target.value)}
                                placeholder="https://linkedin.com/in/username"
                            />
                            {errors.linkedin_url && <p className="mt-1 text-xs text-rose-500">{errors.linkedin_url}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="portfolio_url">
                            Portofolio (Opsional)
                        </label>
                        <Input
                            id="portfolio_url"
                            value={data.portfolio_url}
                            onChange={(event) => setData('portfolio_url', event.target.value)}
                            placeholder="https://portfolio.site"
                        />
                        {errors.portfolio_url && <p className="mt-1 text-xs text-rose-500">{errors.portfolio_url}</p>}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="cover_letter">
                            Ceritakan singkat motivasi Anda
                        </label>
                        <Textarea
                            id="cover_letter"
                            value={data.cover_letter}
                            onChange={(event) => setData('cover_letter', event.target.value)}
                            rows={5}
                            placeholder="Ceritakan pengalaman dan alasan Anda cocok untuk peran ini."
                        />
                        {errors.cover_letter && <p className="mt-1 text-xs text-rose-500">{errors.cover_letter}</p>}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="resume">
                            Unggah CV / Resume (PDF/DOC, maks 2 MB)
                        </label>
                        <Input
                            id="resume"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(event) => setData('resume', event.target.files?.[0] ?? undefined)}
                        />
                        {errors.resume && <p className="mt-1 text-xs text-rose-500">{errors.resume}</p>}
                    </div>

                    {recaptchaEnabled ? (
                        <RecaptchaField
                            ref={recaptchaRef}
                            className="mt-2"
                            onVerify={(token) => setData('recaptcha_token', token ?? '')}
                            error={errors.recaptcha_token}
                        />
                    ) : null}

                    <div className="flex flex-wrap items-center gap-4 pt-4">
                        <Button type="submit" size="lg" disabled={processing} className="rounded-xl bg-blue-600 px-6 text-white hover:bg-blue-700">
                            {processing ? 'Mengirim...' : 'Kirim Lamaran'}
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            className="text-sm"
                            onClick={() => {
                                reset();
                                if (recaptchaEnabled) {
                                    recaptchaRef.current?.reset();
                                }
                            }}
                        >
                            Bersihkan Form
                        </Button>
                    </div>
                </form>
            </div>
        </LandingPageLayout>
    );
}
