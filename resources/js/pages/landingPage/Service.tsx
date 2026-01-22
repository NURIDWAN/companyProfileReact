import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LandingPageLayout from '@/layouts/landingPage-layouts';
import { serviceIconRegistry } from '@/lib/service-icons';
import type { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import {
    Activity,
    CircuitBoard,
    Cloud,
    Code,
    Handshake,
    Layers,
    LayoutTemplate,
    Leaf,
    LineChart,
    Package,
    Paintbrush,
    Rocket,
    Search,
    Smartphone,
    Trophy,
    Users,
    Workflow,
    Zap,
    type LucideIcon,
} from 'lucide-react';

type ServiceItem = {
    id: number;
    title: string;
    icon?: string | null;
    excerpt?: string | null;
    description?: string | null;
};

type SectionCopy = {
    badge?: string | null;
    heading?: string | null;
    description?: string | null;
};

type ServiceHero = SectionCopy & {
    highlight?: string | null;
    primary_label?: string | null;
    primary_link?: string | null;
    secondary_label?: string | null;
    secondary_link?: string | null;
    background_image?: string | null;
    subheading?: string | null;
    stats?: { value: string; label: string; desc: string }[];
};

type HighlightCard = {
    title?: string | null;
    description?: string | null;
    iconName?: string | null;
    icon?: string | LucideIcon | null;
};

type OfferingsSection = SectionCopy & {
    items?: HighlightCard[];
};

type TechStackItem = {
    name?: string | null;
    logo?: string | null;
    icon?: string | null;
};

type TechStackSection = SectionCopy & {
    items?: TechStackItem[];
};

type ProcessItem = {
    step?: string | null;
    title?: string | null;
    description?: string | null;
    icon?: string | null;
};

type ProcessSection = SectionCopy & {
    items?: ProcessItem[];
};

type AdvantageItem = {
    title?: string | null;
    description?: string | null;
    icon?: string | null;
};

type AdvantagesSection = SectionCopy & {
    items?: AdvantageItem[];
};

type FaqItem = {
    question?: string | null;
    answer?: string | null;
};

type FaqSection = SectionCopy & {
    items?: FaqItem[];
};

type SectionKey = 'hero' | 'summary' | 'offerings' | 'tech_stack' | 'process' | 'advantages' | 'faq';
type SectionVisibility = Partial<Record<SectionKey, boolean>>;

type ServicePageProps = PageProps & {
    services?: ServiceItem[];
    hero?: ServiceHero;
    summarySection?: SectionCopy;
    offeringsSection?: OfferingsSection;
    techStackSection?: TechStackSection;
    processSection?: ProcessSection;
    advantagesSection?: AdvantagesSection;
    faqSection?: FaqSection;
    sections?: SectionVisibility;
};

const iconRegistry: Record<string, LucideIcon> = serviceIconRegistry;

const FALLBACK_HERO: ServiceHero = {
    heading: 'Solusi Bisnis Terintegrasi untuk',
    highlight: 'Pertumbuhan Berkelanjutan',
    subheading:
        'Kami mendampingi perusahaan di berbagai industri untuk meningkatkan efisiensi operasional, kualitas layanan, dan kesiapan transformasi.',
    primary_label: 'Lihat Layanan',
    primary_link: '/service',
    secondary_label: 'Diskusikan Kebutuhan',
    secondary_link: '/contact',
    background_image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1600&auto=format&fit=crop',
};

const FALLBACK_SUMMARY: SectionCopy = {
    badge: 'Portofolio Layanan',
    heading: 'Solusi yang Kami Tawarkan',
    description: 'Pendekatan menyeluruh yang menggabungkan konsultasi bisnis, optimalisasi proses, dan program perubahan di lapangan.',
};

const FALLBACK_OFFERINGS: OfferingsSection = {
    badge: 'Layanan Kami',
    heading: 'Apa yang Kami Tawarkan',
    description: 'Rangkaian layanan fleksibel untuk organisasi jasa, manufaktur, kesehatan, pendidikan, energi, dan sektor publik.',
};

const FALLBACK_TECH_STACK: TechStackSection = {
    heading: 'Kompetensi Utama Kami',
    description: 'Tim lintas disiplin dengan keahlian strategi, operasional, pemasaran, perubahan organisasi, dan digital enablement.',
    items: [
        { name: 'Operational Excellence', logo: null },
        { name: 'Customer Experience Design', logo: null },
        { name: 'Supply Chain Optimisation', logo: null },
        { name: 'People & Change Management', logo: null },
        { name: 'Business Intelligence & Reporting', logo: null },
        { name: 'Service Quality Improvement', logo: null },
        { name: 'Digital Enablement', logo: null },
        { name: 'Sustainability Programme Advisory', logo: null },
    ],
};

const FALLBACK_PROCESS: ProcessSection = {
    badge: 'Metodologi Kami',
    heading: 'Proses Kerja Kami',
    items: [
        {
            step: '01',
            title: 'Diagnosa Bisnis',
            description: 'Menggali tantangan utama dan prioritas strategis bersama pemangku kepentingan lintas fungsi.',
            icon: 'Search',
        },
        {
            step: '02',
            title: 'Perancangan Solusi',
            description: 'Menyusun inisiatif, indikator keberhasilan, dan rencana implementasi bertahap.',
            icon: 'LayoutTemplate',
        },
        {
            step: '03',
            title: 'Eksekusi & Pilot',
            description: 'Mengawal implementasi, melakukan uji coba terkontrol, dan menyesuaikan dengan kondisi lapangan.',
            icon: 'Code',
        },
        {
            step: '04',
            title: 'Adopsi & Optimasi',
            description: 'Mengukur hasil, memperkuat kapabilitas tim internal, dan memastikan keberlanjutan program.',
            icon: 'Rocket',
        },
    ],
};

const FALLBACK_ADVANTAGES: AdvantagesSection = {
    badge: 'Keunggulan Kami',
    heading: 'Mengapa Memilih Kami?',
    items: [
        {
            title: 'Tim Lintas Industri',
            description: 'Konsultan dengan pengalaman memimpin proyek di sektor manufaktur, jasa, energi, kesehatan, dan publik.',
            icon: 'Users',
        },
        {
            title: 'Pendekatan Berbasis Hasil',
            description: 'Setiap inisiatif dikaitkan dengan indikator kinerja dan penghematan biaya yang jelas.',
            icon: 'Layers',
        },
        {
            title: 'Kemitraan Berkelanjutan',
            description: 'Pendampingan implementasi, pelatihan, dan monitoring berkala sesuai kebutuhan bisnis.',
            icon: 'LifeBuoy',
        },
        {
            title: 'Governance & Compliance',
            description: 'Memastikan program berjalan selaras dengan kebijakan perusahaan dan regulasi industri.',
            icon: 'Shield',
        },
    ],
};

const FALLBACK_FAQ: FaqSection = {
    badge: 'Butuh Bantuan?',
    heading: 'Pertanyaan Umum',
    description: 'Temukan jawaban atas pertanyaan yang paling sering diajukan oleh klien kami.',
    items: [
        {
            question: 'Berapa lama waktu rata-rata sebuah program berjalan?',
            answer: 'Durasi bergantung pada ruang lingkup. Program penguatan proses biasanya berlangsung 6-12 minggu, sementara transformasi berskala besar dapat berjalan lebih panjang dengan beberapa fase.',
        },
        {
            question: 'Apakah kami mendapatkan laporan perkembangan secara rutin?',
            answer: 'Ya. Kami menyiapkan jalur komunikasi dan dashboard monitoring agar setiap pemangku kepentingan dapat memantau status dan rekomendasi berikutnya.',
        },
        {
            question: 'Bagaimana pendampingan setelah program selesai?',
            answer: 'Kami menyediakan paket sustainment yang mencakup coaching, audit berkala, dan dukungan pengelolaan perubahan agar manfaat program tetap terjaga.',
        },
        {
            question: 'Bagaimana struktur investasi layanan?',
            answer: 'Investasi ditentukan oleh kompleksitas, lokasi, dan target hasil. Setelah asesmen awal kami menyusun proposal lengkap beserta tahapan pembayaran yang transparan.',
        },
    ],
};

const highlightIconNames = ['Layers', 'Smartphone', 'Paintbrush', 'Cloud'] as const;
const highlightIconCycle: LucideIcon[] = highlightIconNames.map((name) => iconRegistry[name] ?? Layers);
const techStackIconCycle: LucideIcon[] = [Workflow, LayoutTemplate, Package, Users, Activity, LineChart, CircuitBoard, Leaf];
const summaryIconCycle: LucideIcon[] = [LayoutTemplate, Smartphone, Paintbrush, Cloud, Rocket, Code];
const heroStats = [
    { label: 'Digital Projects', value: '120+', desc: 'Implementasi lintas industri' },
    { label: 'Client NPS', value: '4.8/5', desc: 'Rata-rata kepuasan partner' },
    { label: 'Transformation Consultants', value: '70+', desc: 'Team strategist & delivery' },
];

const serviceHighlights = [
    {
        title: 'Blueprint ↠ Launch',
        description: 'Mulai dari desain strategi sampai pendampingan go-live & change management.',
        icon: Workflow,
    },
    {
        title: 'Data-driven Decision',
        description: 'Dashboard kinerja dan ritual governance yang memastikan inisiatif tetap on-track.',
        icon: Trophy,
    },
    {
        title: 'Partnership Mindset',
        description: 'Pendampingan pasca implementasi dengan coaching tim internal dan knowledge transfer.',
        icon: Handshake,
    },
];

function resolveIcon(icon: string | LucideIcon | null | undefined, fallback: LucideIcon): LucideIcon {
    if (typeof icon === 'string') {
        return iconRegistry[icon] ?? fallback;
    }
    return icon ?? fallback;
}

function ServicesHeroSection({ hero }: { hero: ServiceHero }) {
    const backgroundImage = hero.background_image ?? FALLBACK_HERO.background_image;
    const primaryReady = hero.primary_label && hero.primary_link;
    const secondaryReady = hero.secondary_label && hero.secondary_link;
    // Use dynamic stats if available (even if empty array), otherwise ONLY fallback if undefined
    const stats = hero.stats !== undefined ? hero.stats : heroStats;

    return (
        <section className="relative overflow-hidden">
            <div className="relative bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-indigo-900/50" />
                <div className="relative container mx-auto flex min-h-[540px] flex-col items-center justify-center gap-8 px-6 py-32 text-center text-white">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs tracking-[0.3em] text-indigo-100 uppercase">
                        {hero.badge ?? 'SERVICES'}
                    </div>
                    <h1 className="max-w-4xl text-4xl leading-tight font-semibold sm:text-5xl md:text-6xl">
                        <span>{hero.heading ?? FALLBACK_HERO.heading}</span>{' '}
                        {hero.highlight ? (
                            <span className="bg-gradient-to-r from-indigo-200 to-cyan-200 bg-clip-text text-transparent">{hero.highlight}</span>
                        ) : null}
                    </h1>
                    {hero.subheading ? <p className="mx-auto max-w-3xl text-lg text-slate-200 md:text-xl">{hero.subheading}</p> : null}
                    {(primaryReady || secondaryReady) && (
                        <div className="mt-4 flex flex-wrap justify-center gap-4">
                            {primaryReady ? (
                                <Button size="lg" className="rounded-full bg-white text-slate-900 hover:bg-slate-100" asChild>
                                    <a href={hero.primary_link ?? '#'}>{hero.primary_label}</a>
                                </Button>
                            ) : null}
                            {secondaryReady ? (
                                <Button
                                    size="lg"
                                    variant="ghost"
                                    className="rounded-full border border-white/40 text-white hover:bg-white/10"
                                    asChild
                                >
                                    <a href={hero.secondary_link ?? '#'}>{hero.secondary_label}</a>
                                </Button>
                            ) : null}
                        </div>
                    )}
                    <div className="grid w-full max-w-4xl gap-4 rounded-[32px] border border-white/20 bg-white/10 p-6 text-left backdrop-blur">
                        <div className="grid gap-4 sm:grid-cols-3">
                            {stats.map((stat) => (
                                <div key={stat.label} className="rounded-2xl bg-white/5 p-4 text-center">
                                    <p className="text-3xl font-semibold text-white">{stat.value}</p>
                                    <p className="text-sm tracking-wide text-indigo-100">{stat.label}</p>
                                    <p className="text-xs text-slate-200/80">{stat.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 -bottom-20 h-40 bg-gradient-to-b from-slate-900/40 to-white dark:to-gray-900" />
        </section>
    );
}

function ServiceHighlightsSection() {
    return (
        <section className="relative overflow-hidden bg-white py-16 dark:bg-slate-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(79,70,229,0.08),_transparent_60%)] dark:opacity-60" />
            <div className="relative container mx-auto grid gap-6 px-6 md:grid-cols-3">
                {serviceHighlights.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.title}
                            className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-lg ring-1 ring-transparent transition hover:-translate-y-1 hover:ring-indigo-300 dark:border-white/10 dark:bg-slate-900/70"
                        >
                            <div className="mb-4 inline-flex rounded-2xl bg-indigo-50/80 p-3 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-200">
                                <Icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

function DynamicServicesSummary({ services, copy }: { services: ServiceItem[]; copy: SectionCopy }) {
    if (!services.length) {
        return null;
    }

    return (
        <section className="relative bg-white py-20 dark:bg-gray-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.08),_transparent_45%)]" />
            <div className="relative container mx-auto max-w-6xl px-6">
                <div className="mb-12 text-center">
                    {copy.badge ? (
                        <Badge variant="outline" className="mb-4 text-xs tracking-[0.4em] uppercase">
                            {copy.badge}
                        </Badge>
                    ) : null}
                    <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">{copy.heading ?? FALLBACK_SUMMARY.heading}</h2>
                    {copy.description ? <p className="mx-auto mt-3 max-w-3xl text-base text-muted-foreground">{copy.description}</p> : null}
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {services.map((service, index) => {
                        const Icon = (service.icon && iconRegistry[service.icon]) || summaryIconCycle[index % summaryIconCycle.length];

                        return (
                            <Card
                                key={service.id}
                                className="group border-0 bg-white/80 shadow-xl ring-1 ring-slate-200 transition hover:-translate-y-1 hover:ring-indigo-300 dark:bg-slate-900/70 dark:ring-white/10"
                            >
                                <CardHeader className="flex items-start gap-4">
                                    <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600 group-hover:bg-indigo-100 dark:bg-indigo-900/40 dark:text-indigo-200">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                                        <p className="text-xs tracking-[0.3em] text-slate-400 uppercase">service track</p>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground dark:text-slate-300">
                                    {service.description ? (
                                        <div
                                            className="richtext-view text-sm text-slate-600 dark:text-slate-300"
                                            dangerouslySetInnerHTML={{ __html: service.description }}
                                        />
                                    ) : (
                                        <p>{service.excerpt ?? 'Solusi teknologi yang disesuaikan dengan kebutuhan organisasi Anda.'}</p>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function OurServicesSection({ copy, items }: { copy: SectionCopy; items: HighlightCard[] }) {
    const cards = items.filter((item) => item.title);

    return (
        <section className="relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-900">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(79,70,229,0.08),transparent)]" />
            <div className="relative container mx-auto px-6">
                <div className="mb-16 text-center">
                    {copy.badge ? (
                        <Badge variant="outline" className="mb-4 text-sm">
                            {copy.badge}
                        </Badge>
                    ) : null}
                    <h2 className="text-3xl font-bold text-gray-800 md:text-4xl dark:text-white">{copy.heading ?? FALLBACK_OFFERINGS.heading}</h2>
                    {copy.description ? <p className="mx-auto mt-3 max-w-3xl text-lg text-gray-600 dark:text-gray-400">{copy.description}</p> : null}
                    <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-indigo-500" />
                </div>
                {cards.length ? (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {cards.map((item, index) => {
                            const fallbackIcon = highlightIconCycle[index % highlightIconCycle.length];
                            const Icon = resolveIcon(item.iconName ?? item.icon, fallbackIcon);

                            return (
                                <Card
                                    key={`${item.title}-${index}`}
                                    className="group relative overflow-hidden border-0 bg-white text-center shadow-lg transition-transform duration-300 hover:-translate-y-2 dark:bg-slate-900"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100 dark:from-indigo-500/10" />
                                    <CardHeader>
                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/40">
                                            <Icon className="h-8 w-8 text-indigo-600 dark:text-indigo-300" />
                                        </div>
                                        <CardTitle className="dark:text-white">{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {item.description ?? 'Detail layanan akan segera tersedia untuk memberikan gambaran menyeluruh.'}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                ) : (
                    <div className="rounded-lg border border-dashed p-8 text-sm text-muted-foreground">
                        Belum ada ringkasan layanan yang tersedia.
                    </div>
                )}
            </div>
        </section>
    );
}

function TechStackSection({ data }: { data: TechStackSection }) {
    const categories = data.items?.filter((item) => item.name) ?? [];

    return (
        <section className="bg-white py-20 text-center dark:bg-slate-900">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    {data.badge ? (
                        <Badge variant="outline" className="mb-4 text-sm">
                            {data.badge}
                        </Badge>
                    ) : null}
                    <h2 className="text-3xl font-bold text-gray-800 md:text-4xl dark:text-white">{data.heading ?? FALLBACK_TECH_STACK.heading}</h2>
                    {data.description ? <p className="mx-auto mt-3 max-w-3xl text-lg text-gray-600 dark:text-gray-400">{data.description}</p> : null}
                    <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-indigo-500" />
                </div>

                {categories.length ? (
                    <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {categories.map((category, index) => {
                            const Icon = techStackIconCycle[index % techStackIconCycle.length];
                            return (
                                <Card
                                    key={`cat-${index}`}
                                    className="group relative overflow-hidden border-slate-200 bg-white hover:border-indigo-200 hover:shadow-lg dark:border-gray-800 dark:bg-slate-800 dark:hover:border-indigo-900"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-indigo-900/10" />
                                    <CardHeader className="relative pb-2">
                                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                                            {category.icon ? (
                                                iconRegistry[category.icon] ? (
                                                    (() => {
                                                        const IconComp = iconRegistry[category.icon];
                                                        return <IconComp className="h-6 w-6" />;
                                                    })()
                                                ) : (
                                                    <Layers className="h-6 w-6" />
                                                )
                                            ) : (
                                                <Icon className="h-6 w-6" />
                                            )}
                                        </div>
                                        <CardTitle className="text-xl font-bold text-slate-800 dark:text-white">{category.name}</CardTitle>
                                    </CardHeader>
                                </Card>
                            );
                        })}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {/* Fallback to original flat list if no categories present (backward compatibility) */}
                        {(FALLBACK_TECH_STACK.items ?? []).map((item, index) => (
                            <div
                                key={`fallback-${index}`}
                                className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-slate-800"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/30">
                                    <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <h3 className="font-semibold text-gray-800 dark:text-white">{item.name}</h3>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

function OurProcessSection({ data }: { data: ProcessSection }) {
    const items = data.items?.filter((item) => item.title) ?? [];

    return (
        <section className="bg-slate-50 py-20 dark:bg-slate-900">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center">
                    {data.badge ? (
                        <Badge variant="outline" className="mb-4 text-sm">
                            {data.badge}
                        </Badge>
                    ) : null}
                    <h2 className="text-3xl font-bold text-gray-800 md:text-4xl dark:text-white">{data.heading ?? FALLBACK_PROCESS.heading}</h2>
                    <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-indigo-500" />
                </div>
                {items.length ? (
                    <div className="relative mx-auto max-w-5xl">
                        <div className="absolute inset-y-0 left-8 hidden w-px bg-gradient-to-b from-indigo-200 via-indigo-400 to-indigo-200 md:block dark:from-indigo-950 dark:via-indigo-700 dark:to-indigo-950" />
                        <div className="space-y-10">
                            {items.map((item, index) => {
                                const fallbackIcon = iconRegistry[FALLBACK_PROCESS.items?.[index]?.icon ?? 'Search'] ?? Search;
                                const Icon = resolveIcon(item.icon, fallbackIcon);

                                return (
                                    <div
                                        key={`${item.step}-${item.title}`}
                                        className="relative flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-md md:flex-row md:items-center dark:border-white/10 dark:bg-slate-900/60"
                                    >
                                        <div className="flex items-center gap-4 md:w-1/3">
                                            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-200">
                                                <Icon className="h-7 w-7" />
                                                <span className="absolute -bottom-3 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white dark:bg-white/15 dark:text-indigo-50">
                                                    {item.step ?? String(index + 1).padStart(2, '0')}
                                                </span>
                                            </div>
                                            <div className="md:hidden">
                                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                                                <p className="text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                                            </div>
                                        </div>
                                        <div className="hidden md:block">
                                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                        Tahapan proses kerja belum diatur.
                    </div>
                )}
            </div>
        </section>
    );
}

function WhyChooseUsSection({ data }: { data: AdvantagesSection }) {
    const items = data.items?.filter((item) => item.title) ?? [];

    return (
        <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 py-20 text-white">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center">
                    {data.badge ? (
                        <Badge variant="secondary" className="mb-4 bg-white/10 text-sm text-white">
                            {data.badge}
                        </Badge>
                    ) : null}
                    <h2 className="text-3xl font-bold md:text-4xl">{data.heading ?? FALLBACK_ADVANTAGES.heading}</h2>
                    {data.description ? <p className="mx-auto mt-3 max-w-3xl text-indigo-100">{data.description}</p> : null}
                    <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-white/50" />
                </div>
                {items.length ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {items.map((item, index) => {
                            const fallbackIcon = iconRegistry[FALLBACK_ADVANTAGES.items?.[index]?.icon ?? 'Layers'] ?? Layers;
                            const Icon = resolveIcon(item.icon, fallbackIcon);

                            return (
                                <Card
                                    key={`${item.title}-${index}`}
                                    className="border-white/10 bg-white/10 text-center text-white shadow-lg backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2"
                                >
                                    <CardHeader>
                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-white/10">
                                            <Icon className="h-8 w-8 text-white" />
                                        </div>
                                        <CardTitle className="text-white">{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-indigo-100">{item.description}</p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                ) : (
                    <div className="rounded-lg border border-dashed border-white/30 p-6 text-center text-sm text-indigo-100">
                        Keunggulan belum ditambahkan.
                    </div>
                )}
            </div>
        </section>
    );
}

function FaqSection({ data }: { data: FaqSection }) {
    const items = data.items?.filter((item) => item.question) ?? [];

    return (
        <section className="bg-white py-20 dark:bg-gray-900">
            <div className="container mx-auto px-6">
                <div className="mb-12 text-center">
                    {data.badge ? (
                        <Badge variant="outline" className="mb-4 text-sm">
                            {data.badge}
                        </Badge>
                    ) : null}
                    <h2 className="text-3xl font-bold text-gray-800 md:text-4xl dark:text-white">{data.heading ?? FALLBACK_FAQ.heading}</h2>
                    {data.description ? <p className="mx-auto mt-3 max-w-3xl text-lg text-gray-600 dark:text-gray-400">{data.description}</p> : null}
                    <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-indigo-500" />
                </div>
                {items.length ? (
                    <div className="mx-auto max-w-4xl">
                        <div className="space-y-4">
                            <Accordion type="single" collapsible className="w-full">
                                {items.map((faq, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={`item-${index + 1}`}
                                        className="mb-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-slate-800"
                                    >
                                        <AccordionTrigger className="px-6 py-4 text-left text-lg font-medium text-slate-800 hover:text-indigo-600 hover:no-underline dark:text-slate-100 dark:hover:text-indigo-400">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                                                    <span className="text-sm font-bold">{String(index + 1).padStart(2, '0')}</span>
                                                </div>
                                                {faq.question}
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="bg-slate-50/50 px-6 pt-0 pb-4 text-base leading-relaxed text-gray-600 dark:bg-slate-900/50 dark:text-gray-300">
                                            <div className="ml-11 border-t border-slate-100 pt-3 dark:border-white/5">{faq.answer}</div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">FAQ belum tersedia.</div>
                )}
            </div>
        </section>
    );
}

export default function ServicesPage() {
    const {
        services = [],
        hero,
        summarySection,
        offeringsSection,
        techStackSection,
        processSection,
        advantagesSection,
        faqSection,
        sections,
    } = usePage<ServicePageProps>().props;

    const visibility = sections ?? {};
    const isEnabled = (key: SectionKey) => visibility[key] ?? true;

    const heroContent = { ...FALLBACK_HERO, ...(hero ?? {}) };
    const summaryCopy = { ...FALLBACK_SUMMARY, ...(summarySection ?? {}) };
    const offeringsCopy = { ...FALLBACK_OFFERINGS, ...(offeringsSection ?? {}) };
    const techStackData = {
        ...FALLBACK_TECH_STACK,
        ...(techStackSection ?? {}),
        items: techStackSection?.items?.length ? techStackSection.items : FALLBACK_TECH_STACK.items,
    };
    const processData = {
        ...FALLBACK_PROCESS,
        ...(processSection ?? {}),
        items: processSection?.items?.length ? processSection.items : FALLBACK_PROCESS.items,
    };
    const advantagesData = {
        ...FALLBACK_ADVANTAGES,
        ...(advantagesSection ?? {}),
        items: advantagesSection?.items?.length ? advantagesSection.items : FALLBACK_ADVANTAGES.items,
    };
    const faqData = {
        ...FALLBACK_FAQ,
        ...(faqSection ?? {}),
        items: faqSection?.items?.length ? faqSection.items : FALLBACK_FAQ.items,
    };

    const configuredHighlightItems =
        offeringsSection?.items
            ?.filter((item) => item?.title)
            ?.map((item) => ({
                title: item.title,
                description: item.description,
                iconName: item.iconName,
                icon: item.icon,
            })) ?? [];

    const fallbackHighlightItems = serviceHighlights.map((item) => ({
        title: item.title,
        description: item.description,
        icon: item.icon as any,
    }));

    const highlightItems = configuredHighlightItems.length ? configuredHighlightItems : fallbackHighlightItems;

    return (
        <LandingPageLayout>
            {isEnabled('hero') && <ServicesHeroSection hero={heroContent} />}

            {isEnabled('offerings') && (
                <div id="konsultasi-mutu">
                    <OurServicesSection copy={offeringsCopy} items={highlightItems} />
                </div>
            )}

            {isEnabled('tech_stack') && (
                <div id="pengaduan">
                    <TechStackSection data={techStackData} />
                </div>
            )}
            {isEnabled('process') && <OurProcessSection data={processData} />}
            {isEnabled('advantages') && (
                <div id="kritik-saran">
                    <WhyChooseUsSection data={advantagesData} />
                </div>
            )}
            {isEnabled('faq') && <FaqSection data={faqData} />}
        </LandingPageLayout>
    );
}
