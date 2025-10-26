import LandingPageLayout from '@/layouts/landingPage-layouts';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePage } from '@inertiajs/react';
import type { PageProps } from '@inertiajs/core';
import {
    Cloud,
    Code,
    LayoutTemplate,
    Layers,
    LifeBuoy,
    Rocket,
    Search,
    Shield,
    Smartphone,
    Paintbrush,
    Users,
    type LucideIcon,
} from 'lucide-react';

type ServiceItem = {
    id: number;
    title: string;
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
};

type HighlightCard = {
    title?: string | null;
    description?: string | null;
    iconName?: string | null;
    icon?: string | null;
};

type OfferingsSection = SectionCopy & {
    items?: HighlightCard[];
};

type TechStackItem = {
    name?: string | null;
    logo?: string | null;
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

type ServicePageProps = PageProps & {
    services?: ServiceItem[];
    hero?: ServiceHero;
    summarySection?: SectionCopy;
    offeringsSection?: OfferingsSection;
    techStackSection?: TechStackSection;
    processSection?: ProcessSection;
    advantagesSection?: AdvantagesSection;
    faqSection?: FaqSection;
};

const iconRegistry: Record<string, LucideIcon> = {
    Cloud,
    Code,
    LayoutTemplate,
    Layers,
    LifeBuoy,
    Rocket,
    Search,
    Shield,
    Smartphone,
    Paintbrush,
    Users,
};

const FALLBACK_HERO: ServiceHero = {
    heading: 'Solusi Digital Inovatif untuk',
    highlight: 'Masa Depan Bisnis Anda',
    subheading:
        'Kami membantu bisnis bertransformasi secara digital dengan layanan pengembangan web, aplikasi mobile, dan desain UI/UX kelas dunia.',
    primary_label: 'Lihat Layanan Kami',
    primary_link: '/service',
    secondary_label: 'Hubungi Kami',
    secondary_link: '/contact',
    background_image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&auto=format&fit=crop',
};

const FALLBACK_SUMMARY: SectionCopy = {
    badge: 'Portofolio Layanan',
    heading: 'Solusi yang Kami Tawarkan',
    description: 'Rangkaian layanan teknologi terintegrasi untuk membantu organisasi tumbuh dengan percaya diri.',
};

const FALLBACK_OFFERINGS: OfferingsSection = {
    badge: 'Layanan Kami',
    heading: 'Apa yang Kami Tawarkan',
    description: 'Solusi lengkap untuk memenuhi semua kebutuhan digital dan teknologi perusahaan Anda.',
};

const FALLBACK_TECH_STACK: TechStackSection = {
    heading: 'Teknologi yang Kami Gunakan',
    description: 'Kami mengandalkan teknologi modern dan teruji untuk hasil terbaik.',
    items: [
        { name: 'Laravel', logo: 'https://cdn.worldvectorlogo.com/logos/laravel-2.svg' },
        { name: 'React', logo: 'https://cdn.worldvectorlogo.com/logos/react-2.svg' },
        { name: 'Next.js', logo: 'https://cdn.worldvectorlogo.com/logos/next-js.svg' },
        { name: 'Vue.js', logo: 'https://cdn.worldvectorlogo.com/logos/vue-9.svg' },
        { name: 'Node.js', logo: 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg' },
        { name: 'Tailwind CSS', logo: 'https://cdn.worldvectorlogo.com/logos/tailwindcss.svg' },
        { name: 'Figma', logo: 'https://cdn.worldvectorlogo.com/logos/figma-1.svg' },
        { name: 'AWS', logo: 'https://cdn.worldvectorlogo.com/logos/aws-logo.svg' },
    ],
};

const FALLBACK_PROCESS: ProcessSection = {
    badge: 'Metodologi Kami',
    heading: 'Proses Kerja Kami',
    items: [
        {
            step: '01',
            title: 'Konsultasi & Analisis',
            description: 'Memformulasikan kebutuhan dan tujuan bisnis Anda secara mendalam.',
            icon: 'Search',
        },
        {
            step: '02',
            title: 'Perencanaan & Desain',
            description: 'Merancang solusi yang tepat dengan arsitektur dan desain optimal.',
            icon: 'LayoutTemplate',
        },
        {
            step: '03',
            title: 'Development & Testing',
            description: 'Pengembangan dengan quality assurance dan testing menyeluruh.',
            icon: 'Code',
        },
        {
            step: '04',
            title: 'Deployment & Support',
            description: 'Go-live dan dukungan berkelanjutan untuk kesuksesan jangka panjang.',
            icon: 'Rocket',
        },
    ],
};

const FALLBACK_ADVANTAGES: AdvantagesSection = {
    badge: 'Keunggulan Kami',
    heading: 'Mengapa Memilih Kami?',
    items: [
        {
            title: 'Tim Berpengalaman',
            description: 'Didukung oleh tim profesional dengan pengalaman lebih dari 10 tahun di industri teknologi.',
            icon: 'Users',
        },
        {
            title: 'Teknologi Terdepan',
            description: 'Menggunakan framework modern seperti Laravel, React, dan Next.js untuk produk yang up-to-date.',
            icon: 'Layers',
        },
        {
            title: 'Support 24/7',
            description: 'Dukungan teknis dan maintenance berkelanjutan dengan respons time yang cepat.',
            icon: 'LifeBuoy',
        },
        {
            title: 'Keamanan Terjamin',
            description: 'Implementasi standar keamanan tertinggi untuk melindungi data dan aplikasi Anda.',
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
            question: 'Berapa lama waktu yang dibutuhkan untuk membuat sebuah proyek?',
            answer:
                'Waktu pengerjaan bergantung pada kompleksitas dan skala proyek. Proyek sederhana memakan waktu 4-6 minggu sementara proyek kompleks bisa beberapa bulan.',
        },
        {
            question: 'Apakah saya bisa melihat progres pengerjaan proyek?',
            answer:
                'Kami menerapkan proses kerja transparan dengan akses ke project management tool sehingga Anda dapat memantau progres dan memberikan feedback.',
        },
        {
            question: 'Bagaimana dengan support setelah proyek selesai?',
            answer:
                'Kami menyediakan paket maintenance dan support berkelanjutan untuk memastikan aplikasi berjalan lancar setelah peluncuran.',
        },
        {
            question: 'Berapa biaya untuk layanan Anda?',
            answer:
                'Biaya ditentukan oleh ruang lingkup, fitur, dan teknologi. Setelah analisis awal kami akan memberikan penawaran harga yang transparan.',
        },
    ],
};

const highlightIconNames = ['Layers', 'Smartphone', 'Paintbrush', 'Cloud'] as const;
const highlightIconCycle: LucideIcon[] = highlightIconNames.map((name) => iconRegistry[name] ?? Layers);

function resolveIcon(name: string | null | undefined, fallback: LucideIcon): LucideIcon {
    return (name && iconRegistry[name]) || fallback;
}

function ServicesHeroSection({ hero }: { hero: ServiceHero }) {
    const backgroundImage = hero.background_image ?? FALLBACK_HERO.background_image;
    const primaryReady = hero.primary_label && hero.primary_link;
    const secondaryReady = hero.secondary_label && hero.secondary_link;

    return (
        <section
            className="relative py-32 bg-cover bg-center text-white"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative container mx-auto px-6 text-center">
                <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                    <span>{hero.heading ?? FALLBACK_HERO.heading}</span>
                    {hero.highlight ? (
                        <span className="block text-indigo-200">{hero.highlight}</span>
                    ) : null}
                </h1>
                {hero.subheading ? (
                    <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-200 md:text-xl">{hero.subheading}</p>
                ) : null}
                {(primaryReady || secondaryReady) && (
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        {primaryReady ? (
                            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700" asChild>
                                <a href={hero.primary_link ?? '#'}>{hero.primary_label}</a>
                            </Button>
                        ) : null}
                        {secondaryReady ? (
                            <Button size="lg" variant="secondary" asChild>
                                <a href={hero.secondary_link ?? '#'}>{hero.secondary_label}</a>
                            </Button>
                        ) : null}
                    </div>
                )}
            </div>
        </section>
    );
}

function DynamicServicesSummary({ services, copy }: { services: ServiceItem[]; copy: SectionCopy }) {
    if (!services.length) {
        return null;
    }

    return (
        <section className="bg-white py-16 dark:bg-gray-900">
            <div className="container mx-auto max-w-6xl px-6">
                <div className="mb-10 text-center">
                    {copy.badge ? (
                        <Badge variant="outline" className="mb-4 text-sm">
                            {copy.badge}
                        </Badge>
                    ) : null}
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{copy.heading ?? FALLBACK_SUMMARY.heading}</h2>
                    {copy.description ? (
                        <p className="mx-auto mt-3 max-w-3xl text-base text-muted-foreground">{copy.description}</p>
                    ) : null}
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {services.map((service) => (
                        <Card key={service.id} className="border border-muted bg-card text-left shadow-sm">
                            <CardHeader>
                                <CardTitle>{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm text-muted-foreground">
                                <p>
                                    {service.excerpt ??
                                        service.description ??
                                        'Solusi teknologi yang disesuaikan dengan kebutuhan organisasi Anda.'}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

function OurServicesSection({ copy, items }: { copy: SectionCopy; items: HighlightCard[] }) {
    const cards = items.filter((item) => item.title);

    return (
        <section className="bg-slate-50 py-20 dark:bg-slate-900">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center">
                    {copy.badge ? (
                        <Badge variant="outline" className="mb-4 text-sm">
                            {copy.badge}
                        </Badge>
                    ) : null}
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
                        {copy.heading ?? FALLBACK_OFFERINGS.heading}
                    </h2>
                    {copy.description ? (
                        <p className="mx-auto mt-3 max-w-3xl text-lg text-gray-600 dark:text-gray-400">{copy.description}</p>
                    ) : null}
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
                                    className="text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
                                >
                                    <CardHeader>
                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/40">
                                            <Icon className="h-8 w-8 text-indigo-600 dark:text-indigo-300" />
                                        </div>
                                        <CardTitle className="dark:text-white">{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {item.description ??
                                                'Detail layanan akan segera tersedia untuk memberikan gambaran menyeluruh.'}
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
    const items = data.items?.filter((item) => item.name) ?? [];

    return (
        <section className="bg-white py-20 dark:bg-gray-900">
            <div className="container mx-auto px-6">
                <div className="mb-12 text-center">
                    {data.badge ? (
                        <Badge variant="outline" className="mb-4 text-sm">
                            {data.badge}
                        </Badge>
                    ) : null}
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{data.heading ?? FALLBACK_TECH_STACK.heading}</h2>
                    {data.description ? (
                        <p className="mx-auto mt-3 max-w-3xl text-lg text-gray-600 dark:text-gray-400">{data.description}</p>
                    ) : null}
                </div>
                {items.length ? (
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                        {items.map((tech) => (
                            <div key={tech.name} className="group flex flex-col items-center gap-2">
                                {tech.logo ? (
                                    <img
                                        src={tech.logo}
                                        alt={tech.name ?? ''}
                                        className="h-12 w-12 object-contain grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 dark:invert dark:group-hover:invert-0"
                                    />
                                ) : (
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed text-sm text-muted-foreground">
                                        {tech.name?.charAt(0) ?? '?'}
                                    </div>
                                )}
                                <span className="text-sm text-gray-500 opacity-0 transition-opacity group-hover:opacity-100 dark:text-gray-400">
                                    {tech.name}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                        Daftar teknologi belum dikonfigurasi.
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
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
                        {data.heading ?? FALLBACK_PROCESS.heading}
                    </h2>
                    <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-indigo-500" />
                </div>
                {items.length ? (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {items.map((item, index) => {
                            const fallbackIcon = iconRegistry[FALLBACK_PROCESS.items?.[index]?.icon ?? 'Search'] ?? Search;
                            const Icon = resolveIcon(item.icon, fallbackIcon);

                            return (
                                <Card key={`${item.step}-${item.title}`} className="border-t-4 border-t-indigo-500 text-center">
                                    <CardHeader>
                                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                                            <Icon className="h-8 w-8 text-indigo-600 dark:text-indigo-300" />
                                        </div>
                                        <CardTitle className="dark:text-white">{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                                    </CardContent>
                                </Card>
                            );
                        })}
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
                        <Badge variant="secondary" className="mb-4 text-sm bg-white/10 text-white">
                            {data.badge}
                        </Badge>
                    ) : null}
                    <h2 className="text-3xl font-bold md:text-4xl">{data.heading ?? FALLBACK_ADVANTAGES.heading}</h2>
                    {data.description ? (
                        <p className="mx-auto mt-3 max-w-3xl text-indigo-100">{data.description}</p>
                    ) : null}
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
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
                        {data.heading ?? FALLBACK_FAQ.heading}
                    </h2>
                    {data.description ? (
                        <p className="mx-auto mt-3 max-w-3xl text-lg text-gray-600 dark:text-gray-400">{data.description}</p>
                    ) : null}
                    <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-indigo-500" />
                </div>
                {items.length ? (
                    <div className="mx-auto max-w-4xl">
                        <Accordion type="single" collapsible className="w-full">
                            {items.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index + 1}`}>
                                    <AccordionTrigger className="text-left text-lg">{faq.question}</AccordionTrigger>
                                    <AccordionContent className="text-base text-gray-600 dark:text-gray-400">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                ) : (
                    <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                        FAQ belum tersedia.
                    </div>
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
    } = usePage<ServicePageProps>().props;

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
        offeringsSection?.items?.filter((item) => item?.title)?.map((item) => ({
            title: item.title,
            description: item.description,
            iconName: item.iconName ?? item.icon,
        })) ?? [];

    const fallbackHighlightItems = services.map((service, index) => ({
        title: service.title,
        description: service.excerpt ?? service.description ?? 'Detail layanan akan segera tersedia.',
        iconName: highlightIconNames[index % highlightIconNames.length],
    }));

    const highlightItems = configuredHighlightItems.length ? configuredHighlightItems : fallbackHighlightItems;

    return (
        <LandingPageLayout>
            <ServicesHeroSection hero={heroContent} />
            <DynamicServicesSummary services={services} copy={summaryCopy} />
            <OurServicesSection copy={offeringsCopy} items={highlightItems} />
            <TechStackSection data={techStackData} />
            <OurProcessSection data={processData} />
            <WhyChooseUsSection data={advantagesData} />
            <FaqSection data={faqData} />
        </LandingPageLayout>
    );
}
