import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LandingPageLayout from '@/layouts/landingPage-layouts';
import JobList from '@/components/ui/landingPageComponent/career/joblist';
import type { JobPosition } from '@/components/ui/landingPageComponent/career/types';
import type { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { Briefcase, Building, DollarSign } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const benefits: Array<{ icon: LucideIcon; iconBg: string; iconColor: string; title: string; description: string }> = [
    {
        icon: Building,
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        title: 'Lingkungan Kerja Modern',
        description: 'Workspace yang nyaman dengan teknologi terdepan',
    },
    {
        icon: DollarSign,
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600',
        title: 'Kompensasi Kompetitif',
        description: 'Gaji menarik dengan benefit lengkap',
    },
    {
        icon: Briefcase,
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600',
        title: 'Pengembangan Karir',
        description: 'Program training dan jenjang karir yang jelas',
    },
];

function PageHeader() {
    return (
        <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold text-gray-900">Bergabung Bersama Kami</h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Temukan peluang karir yang menarik dan kembangkan potensi Anda bersama tim profesional kami. Kami mencari talenta terbaik untuk
                bergabung dalam perjalanan inovasi teknologi.
            </p>
        </div>
    );
}

function BenefitsSection() {
    return (
        <div className="mb-8 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                <Card key={benefit.title} className="p-6 text-center">
                    <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${benefit.iconBg}`}>
                        <Icon className={`h-6 w-6 ${benefit.iconColor}`} />
                    </div>
                    <h3 className="mb-2 font-semibold">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                </Card>
                );
            })}
        </div>
    );
}

function CallToAction() {
    return (
        <Card className="my-10 bg-gradient-to-r from-blue-600 to-purple-600 text-center text-white">
            <CardContent className="space-y-4">
                <h2 className="text-2xl font-bold">Tidak Menemukan Posisi yang Cocok?</h2>
                <p className="text-blue-100">
                    Kirimkan CV Anda kepada kami. Kami akan menghubungi ketika ada posisi yang sesuai dengan keahlian Anda.
                </p>
                <Button variant="secondary" size="lg">
                    Kirim CV Spontan
                </Button>
            </CardContent>
        </Card>
    );
}

function PerksSummary() {
    return (
        <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6">
                <CardHeader>
                    <CardTitle className="text-lg">Benefit Utama</CardTitle>
                    <CardDescription>Kami berinvestasi pada kesejahteraan tim.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-600">
                    <p>• Asuransi kesehatan dan tunjangan keluarga</p>
                    <p>• Subsidi pembelajaran dan sertifikasi</p>
                    <p>• Cuti fleksibel dan remote working hybrid</p>
                </CardContent>
            </Card>
            <Card className="p-6">
                <CardHeader>
                    <CardTitle className="text-lg">Kompensasi</CardTitle>
                    <CardDescription>Struktur remunerasi transparan.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-600">
                    <p>• Skema bonus berbasis kinerja</p>
                    <p>• Review gaji dua kali setahun</p>
                    <p>• Program kepemilikan saham internal</p>
                </CardContent>
            </Card>
            <Card className="p-6">
                <CardHeader>
                    <CardTitle className="text-lg">Pengembangan</CardTitle>
                    <CardDescription>Kurikulum belajar yang terarah.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-600">
                    <p>• Career coach dedicated per role</p>
                    <p>• Mentoring lintas divisi</p>
                    <p>• Akses platform kursus premium</p>
                </CardContent>
            </Card>
        </div>
    );
}

type CareerPageProps = PageProps & {
    positions?: JobPosition[];
};

export default function CareerPage(): React.ReactElement {
    const { positions = [] } = usePage<CareerPageProps>().props;

    return (
        <LandingPageLayout>
            <div className="container mx-auto mt-10 mb-20 px-4 md:px-6 lg:px-8 space-y-10">
                <PageHeader />
                <BenefitsSection />
                <PerksSummary />
                {positions.length ? (
                    <JobList jobs={positions} />
                ) : (
                    <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                        Tidak ada posisi yang tersedia saat ini. Kirimkan CV Anda dan kami akan menghubungi ketika ada kesempatan baru.
                    </div>
                )}
                <CallToAction />
            </div>
        </LandingPageLayout>
    );
}
