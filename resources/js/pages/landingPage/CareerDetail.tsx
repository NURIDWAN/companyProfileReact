import { usePage, Link } from '@inertiajs/react';
import type { PageProps } from '@inertiajs/core';
import { Briefcase, Building, Clock, MapPin } from 'lucide-react';

import LandingPageLayout from '@/layouts/landingPage-layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import JobCard from '@/components/ui/landingPageComponent/career/jobcard';
import type { JobPosition } from '@/components/ui/landingPageComponent/career/types';

type CareerDetailProps = PageProps & {
    position: JobPosition;
    relatedPositions?: JobPosition[];
};

export default function CareerDetailPage() {
    const { position, relatedPositions = [] } = usePage<CareerDetailProps>().props;
    const requirements = position.requirements && position.requirements.length
        ? position.requirements
        : ['Komitmen tinggi terhadap kualitas kerja', 'Mampu bekerja secara kolaboratif'];

    return (
        <LandingPageLayout>
            <div className="mx-auto max-w-4xl space-y-8 p-6">
                <Link href="/career" className="text-sm text-blue-600">&larr; Kembali ke daftar karier</Link>
                <div className="space-y-4">
                    <p className="text-xs uppercase tracking-wide text-blue-600">Lowongan</p>
                    <h1 className="text-4xl font-bold text-gray-900">{position.title}</h1>
                    <p className="text-lg text-gray-600">
                        {position.description ?? 'Kami mencari talenta terbaik untuk memperkuat tim dan menghadirkan solusi digital berdampak.'}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-2"><Building className="h-4 w-4" />{position.department ?? 'Semua Divisi'}</span>
                        <span className="flex items-center gap-2"><MapPin className="h-4 w-4" />{position.location ?? 'Jakarta / Remote'}</span>
                        <span className="flex items-center gap-2"><Briefcase className="h-4 w-4" />{position.employment_type ?? 'Full-time'}</span>
                        {position.posted_at && (
                            <span className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />Posting {new Date(position.posted_at).toLocaleDateString('id-ID')}
                            </span>
                        )}
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Persyaratan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-gray-600">
                        {requirements.map((req) => (
                            <div key={req} className="flex items-start gap-2">
                                <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                                <p>{req}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h2 className="text-2xl font-semibold text-gray-900">Siap bergabung?</h2>
                    <p className="mt-2 text-gray-600">Kirim CV dan portofolio terbaik Anda. Tim People akan meninjau dalam 5 hari kerja.</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Lamar Sekarang</Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="mailto:career@nusantaradigital.id">Tanyakan Detail</Link>
                        </Button>
                    </div>
                </div>

                {relatedPositions.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-2xl font-semibold text-gray-900">Posisi lainnya</h3>
                        <div className="grid gap-4">
                            {relatedPositions.map((job) => (
                                <JobCard key={job.id} job={job} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </LandingPageLayout>
    );
}
