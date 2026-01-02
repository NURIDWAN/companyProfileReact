import LandingPageLayout from '@/layouts/landingPage-layouts';
import JobList from '@/components/ui/landingPageComponent/career/joblist';
import type { JobPosition } from '@/components/ui/landingPageComponent/career/types';
import type { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';

type SectionCopy = {
    badge?: string | null;
    heading?: string | null;
    description?: string | null;
};

type CareerPageProps = PageProps & {
    positions?: JobPosition[];
    careerHero?: SectionCopy;
};

const metrics = [
    { label: 'Tim Profesional', value: '150+', description: 'Konsultan & engineers lintas industri.' },
    { label: 'Klien Aktif', value: '90+', description: 'Perusahaan dari sektor publik & privat.' },
    { label: 'Lokasi Kerja', value: '12 kota', description: 'Hybrid & remote-friendly environment.' },
    { label: 'Program Career', value: '30+', description: 'Program training tersertifikasi tiap tahun.' },
];

const viewportConfig = { once: true, amount: 0.3 };

function HeroSection({ copy }: { copy?: SectionCopy }) {
    const heroBadge = copy?.badge ?? '#LifeAtHarmony';
    const heroHeading = copy?.heading ?? 'Bangun Masa Depan Industri Bersama Kami';
    const heroDescription =
        copy?.description ??
        'Kami memberdayakan talenta untuk memimpin perubahan industri melalui proyek transformasi digital, akses program pengembangan terkurasi, dan budaya yang mendukung work-life rhythm.';

    return (
        <motion.section
            className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-[#F7FAFF] via-white to-[#EEF4FF] p-10 text-slate-900 shadow-xl dark:border-white/10 dark:from-[#060B1D] dark:via-[#101C3F] dark:to-[#0B1227] dark:text-white dark:shadow-2xl"
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            variants={containerVariants}
        >
            <div className="relative flex flex-col gap-6">
                <div className="space-y-4 text-center">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-xs tracking-[0.3em] text-blue-700 dark:bg-white/10 dark:text-white/70">
                        {heroBadge}
                    </span>
                    <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl dark:text-white">{heroHeading}</h1>
                    <p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-white/70">{heroDescription}</p>
                </div>
                <motion.div
                    className="grid gap-4 rounded-3xl border border-white/60 bg-white/80 p-6 backdrop-blur md:grid-cols-4 dark:border-white/5 dark:bg-white/5"
                    variants={containerVariants}
                >
                    {metrics.map((metric) => (
                        <motion.div key={metric.label} className="space-y-1 text-center" variants={itemVariants}>
                            <p className="text-3xl font-semibold text-slate-900 dark:text-white">{metric.value}</p>
                            <p className="text-sm font-medium text-slate-600 dark:text-white/90">{metric.label}</p>
                            <p className="text-xs text-slate-500 dark:text-white/70">{metric.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}

export default function CareerPage(): ReactElement {
    const { positions = [], careerHero } = usePage<CareerPageProps>().props;

    return (
        <LandingPageLayout>
            <div className="bg-[#F5F7FB] py-16 text-slate-900 dark:bg-[#050A1A] dark:text-white">
                <div className="container mx-auto flex max-w-6xl flex-col gap-12 px-4 md:px-6">
                    <HeroSection copy={careerHero} />

                    {positions.length ? (
                        <JobList jobs={positions} />
                    ) : (
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={viewportConfig}
                            variants={containerVariants}
                            className="rounded-[32px] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600 dark:border-white/20 dark:bg-[#080F26] dark:text-white/70"
                        >
                            Saat ini belum ada posisi terbuka. Kirimkan CV Anda dan kami akan menghubungi ketika ada kesempatan baru.
                        </motion.div>
                    )}
                </div>
            </div>
        </LandingPageLayout>
    );
}
