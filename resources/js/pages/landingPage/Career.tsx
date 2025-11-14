import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LandingPageLayout from '@/layouts/landingPage-layouts';
import JobList from '@/components/ui/landingPageComponent/career/joblist';
import type { JobPosition } from '@/components/ui/landingPageComponent/career/types';
import type { PageProps } from '@inertiajs/core';
import { Link, usePage } from '@inertiajs/react';
import { Briefcase, Building, Clock, DollarSign, GraduationCap, MapPin, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
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

const insights = [
    { title: '1. Deep Collaboration', description: 'Ritme kerja mengandalkan squad lintas fungsi dengan akses langsung ke stakeholders.' },
    { title: '2. Clear Career Map', description: 'Setiap role didampingi career coach & framework skill untuk leveling.' },
    { title: '3. Work-Life Rhythm', description: 'Model kerja hybrid dengan fleksibilitas hari remote dan wellness day.' },
];

const benefits: Array<{ icon: LucideIcon; iconBg: string; iconColor: string; title: string; description: string }> = [
    {
        icon: Building,
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-600',
        title: 'Lingkungan Kerja Modern',
        description: 'Workspace nyaman dengan dukungan teknologi terdepan bagi tim lintas fungsi.',
    },
    {
        icon: DollarSign,
        iconBg: 'bg-emerald-50',
        iconColor: 'text-emerald-600',
        title: 'Kompensasi Kompetitif',
        description: 'Skema remunerasi transparan dengan bonus dan program saham internal.',
    },
    {
        icon: Briefcase,
        iconBg: 'bg-purple-50',
        iconColor: 'text-purple-600',
        title: 'Pengembangan Karir',
        description: 'Career coach dedicated per role, mentoring lintas divisi, dan akses kursus premium.',
    },
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

function InsightsSection() {
    return (
        <motion.section
            className="rounded-[32px] border border-slate-200 bg-white p-8 text-slate-900 shadow-xl dark:border-white/10 dark:bg-white/5 dark:text-white dark:backdrop-blur"
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            variants={containerVariants}
        >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                    <p className="text-sm uppercase tracking-[0.4em] text-slate-500 dark:text-white/80">Budaya Kerja</p>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Mengapa Talenta Memilih Harmony Strategic Group</h2>
                </div>
                <p className="max-w-xl text-sm text-slate-600 dark:text-white/70">
                    Kami membangun lingkungan yang kolaboratif, adaptif, dan fokus pada pertumbuhan berkelanjutan. Setiap squad memiliki otonomi tinggi,
                    namun tetap mendapat dukungan leadership dan tool kelas enterprise.
                </p>
            </div>
            <motion.div className="mt-6 grid gap-4 lg:grid-cols-3" variants={containerVariants}>
                {insights.map((insight) => (
                    <motion.div key={insight.title} variants={itemVariants}>
                        <Card className="border border-slate-100 bg-slate-50 text-slate-900 dark:border-white/10 dark:bg-[#101B3B] dark:text-white">
                            <CardHeader>
                                <CardTitle className="text-sm uppercase tracking-wide text-blue-600 dark:text-blue-200">{insight.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-slate-600 dark:text-white/80">{insight.description}</CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
}

function BenefitsSection() {
    return (
        <motion.section
            className="grid gap-6 md:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            variants={containerVariants}
        >
            {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                    <motion.div key={benefit.title} variants={itemVariants}>
                        <Card className="border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-white/10 dark:bg-[#0F1836] dark:text-white dark:shadow-lg">
                            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${benefit.iconBg} dark:bg-white/10`}>
                                <Icon className={`h-6 w-6 ${benefit.iconColor} dark:text-white`} />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold">{benefit.title}</h3>
                            <p className="text-sm text-slate-600 dark:text-white/70">{benefit.description}</p>
                        </Card>
                    </motion.div>
                );
            })}
        </motion.section>
    );
}

function ExperienceStrip() {
    const highlights = [
        { icon: MapPin, label: 'Hybrid-first', desc: 'Pilihan base di Jakarta, Bandung, Surabaya, dengan remote days fleksibel.' },
        { icon: Clock, label: 'Ritme Agile', desc: 'Sprint dua mingguan dengan ritual squad yang ringan dan produktif.' },
        { icon: GraduationCap, label: 'Learning Fund', desc: 'Subsidi sertifikasi, conference, dan coaching session personal.' },
        { icon: TrendingUp, label: 'Growth Review', desc: 'Performance review transparan dua kali setahun bersama career coach.' },
    ];

    return (
        <motion.section
            className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-inner dark:border-white/5 dark:bg-[#060C1F]"
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            variants={containerVariants}
        >
            <motion.div className="grid gap-4 md:grid-cols-2" variants={containerVariants}>
                {highlights.map(({ icon: Icon, label, desc }) => (
                    <motion.div key={label} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-slate-900 dark:bg-white/5 dark:text-white" variants={itemVariants}>
                        <Icon className="mt-1 h-5 w-5 text-blue-600 dark:text-blue-300" />
                        <div>
                            <p className="text-sm font-semibold">{label}</p>
                            <p className="text-xs text-slate-600 dark:text-white/70">{desc}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
}

function CallToAction() {
    return (
        <motion.div initial="hidden" whileInView="show" viewport={viewportConfig} variants={containerVariants}>
            <Card className="my-12 overflow-hidden border-none bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500 text-center text-white shadow-2xl">
                <CardContent className="space-y-4 py-10">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/80">Masih mencari?</p>
                    <h2 className="text-3xl font-bold">Tidak Menemukan Posisi yang Cocok?</h2>
                    <p className="mx-auto max-w-2xl text-lg text-white/80">
                        Kirimkan CV terbaru Anda. Tim People kami akan menghubungi ketika ada posisi yang sesuai dengan keahlian dan passion Anda.
                    </p>
                    <Button variant="secondary" size="lg" className="rounded-full px-8" asChild>
                        <Link href="mailto:talent@harmonygroup.id?subject=Lamaran%20Spontan%20Harmony%20Strategic%20Group">
                            Kirim CV Spontan
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
}

function PerksSummary() {
    const items = [
        {
            title: 'Benefit Utama',
            desc: 'Kami berinvestasi pada kesejahteraan tim.',
            points: ['Asuransi kesehatan & tunjangan keluarga', 'Subsidi pembelajaran dan sertifikasi', 'Cuti fleksibel serta hybrid working'],
        },
        {
            title: 'Kompensasi',
            desc: 'Struktur remunerasi transparan.',
            points: ['Skema bonus berbasis kinerja', 'Review gaji dua kali setahun', 'Program kepemilikan saham internal'],
        },
        {
            title: 'Pengembangan',
            desc: 'Kurikulum belajar yang terarah.',
            points: ['Career coach dedicated per role', 'Mentoring lintas divisi', 'Akses platform kursus premium'],
        },
    ];

    return (
        <motion.section
            className="grid gap-6 md:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            variants={containerVariants}
        >
            {items.map((item) => (
                <motion.div key={item.title} variants={itemVariants}>
                    <Card className="border border-slate-200 bg-white text-slate-900 dark:border-white/10 dark:bg-[#0F1836] dark:text-white">
                        <CardHeader>
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                            <CardDescription className="text-slate-600 dark:text-white/70">{item.desc}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-slate-600 dark:text-white/80">
                            {item.points.map((point) => (
                                <p key={point}>• {point}</p>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </motion.section>
    );
}

function HiringTimeline() {
    const steps = [
        { title: 'Submit Lamaran', desc: 'Unggah CV, portfolio, dan highlight pengalaman Anda.' },
        { title: 'People Interview', desc: 'Diskusi culture-fit, motivasi, dan preferensi kerja.' },
        { title: 'Case Discussion', desc: 'Simulation session dengan user / lead squad terkait.' },
        { title: 'Final Alignment', desc: 'Bahas kompensasi, area pengembangan, dan target onboarding.' },
    ];

    return (
        <motion.section
            className="rounded-[32px] border border-slate-200 bg-white p-8 text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white"
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            variants={containerVariants}
        >
            <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
                <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-white/80">Hiring Journey</p>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Transparan & Supportive</h2>
                </div>
                <p className="max-w-xl text-sm text-slate-600 dark:text-white/70">
                    Setiap kandidat mendapatkan buddy dari tim People untuk membantu persiapan. Kami menjaga proses tetap cepat dan transparan supaya Anda
                    selalu tahu progresnya.
                </p>
            </div>
            <motion.div className="mt-8 grid gap-4 md:grid-cols-4" variants={containerVariants}>
                {steps.map((step, index) => (
                    <motion.div key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-[#0C142F]" variants={itemVariants}>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 dark:bg-white/10 dark:text-white">
                            {index + 1}
                        </span>
                        <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">{step.title}</h3>
                        <p className="mt-2 text-xs text-slate-600 dark:text-white/70">{step.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
}

function JobSpotlight({ positions }: { positions: JobPosition[] }) {
    const featured = positions.slice(0, 3);

    if (!featured.length) {
        return null;
    }

    return (
        <motion.section
            className="rounded-[32px] border border-slate-200 bg-white p-8 text-slate-900 dark:border-white/10 dark:bg-[#091028] dark:text-white"
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            variants={containerVariants}
        >
            <div className="flex flex-col gap-2">
                <p className="text-sm uppercase tracking-[0.4em] text-blue-600 dark:text-blue-200">Spotlight Roles</p>
                <h2 className="text-2xl font-semibold">Prioritas Rekrutmen Q4</h2>
            </div>
            <motion.div className="mt-6 grid gap-4 md:grid-cols-3" variants={containerVariants}>
                {featured.map((role) => (
                    <motion.div key={role.id} variants={itemVariants}>
                        <Card className="border border-slate-200 bg-slate-50 dark:border-white/15 dark:bg-white/5">
                            <CardHeader>
                                <CardTitle className="text-lg text-slate-900 dark:text-white">{role.title}</CardTitle>
                                <CardDescription className="text-slate-500 dark:text-white/70">{role.department ?? 'Team Strategis'}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm text-slate-600 dark:text-white/80">
                                <p>{role.description ?? 'Peran kunci untuk memperkuat tim delivery lintas industri.'}</p>
                                <div className="flex flex-wrap gap-2 text-xs text-slate-600 dark:text-white/70">
                                    <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-white/10">{role.location ?? 'Hybrid'}</span>
                                    <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-white/10">{role.employment_type ?? 'Full-time'}</span>
                                    <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-white/10">{role.salary_range ?? 'Diskusi bersama'}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-500 dark:text-white/60">
                                    <span>
                                        Target mulai {role.posted_at ? new Date(role.posted_at).toLocaleDateString('id-ID') : 'segera'}
                                    </span>
                                    <Link
                                        href={route('career.show', role.slug)}
                                        className="text-[13px] font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-200 dark:hover:text-white"
                                    >
                                        Lihat detail →
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
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
                    <InsightsSection />
                    <BenefitsSection />
                    <ExperienceStrip />
                    <HiringTimeline />
                    <JobSpotlight positions={positions} />
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
                    <PerksSummary />
                    <CallToAction />
                </div>
            </div>
        </LandingPageLayout>
    );
}
