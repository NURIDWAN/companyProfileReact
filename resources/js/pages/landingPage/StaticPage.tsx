import { Button } from '@/components/ui/button';
import { HeroModern } from '@/components/ui/landingPageComponent/home/HeroHome';
import { About } from '@/components/ui/landingPageComponent/home/about';
import { LatestArticles } from '@/components/ui/landingPageComponent/home/article';
import { FinalCTA } from '@/components/ui/landingPageComponent/home/finalCTA';
import { Services } from '@/components/ui/landingPageComponent/home/service';
import { Testimonial } from '@/components/ui/landingPageComponent/home/testimonial';
import LandingPageLayout from '@/layouts/landingPage-layouts';
import { sanitizeRichText } from '@/utils/sanitize-html';
import { usePage } from '@inertiajs/react';
import { useMemo } from 'react';

// About components
import CTASection from '@/components/ui/landingPageComponent/about/CTASection';
import CoreValuesSection from '@/components/ui/landingPageComponent/about/CoreValues';
import ManagementTeamSection from '@/components/ui/landingPageComponent/about/ManagementTeam';
import StatisticsSection from '@/components/ui/landingPageComponent/about/Statistics';
import AboutCompany from '@/components/ui/landingPageComponent/about/aboutCompany';
import VisionMissionSection from '@/components/ui/landingPageComponent/about/visionmision';

// Block components
import {
    AccordionBlock,
    AdvantagesSection,
    BannerAlert,
    CareerBenefits,
    CareerHero,
    CareerPositions,
    ContactInfo,
    ContactMap,
    CounterSection,
    FaqSection,
    FeatureCards,
    Gallery,
    MetricsSection,
    PartnersSection,
    PricingTable,
    ProcessSection,
    ProductFeatures,
    ProductGallery,
    ProductHero,
    ServiceSummary,
    SliderCarousel,
    TabsBlock,
    TechStackSection,
    Timeline,
    VideoEmbed,
    WhyChooseUs,
} from '@/components/ui/landingPageComponent/blocks';

type SectionItem = {
    id: number;
    title: string;
    slug: string;
    content?: string | null;
    display_order?: number | null;
};

type PagePayload = {
    title: string;
    body?: string | null;
    sections?: SectionItem[];
};

interface Props {
    page: PagePayload;
    [key: string]: unknown;
}

export default function StaticPage() {
    const { page } = usePage<Props>().props;

    const safeBody = useMemo(() => sanitizeRichText(page.body ?? ''), [page.body]);
    const sections = page.sections ?? [];

    const renderSection = (section: SectionItem) => {
        let parsed: any = null;
        if (section.content) {
            try {
                const json = JSON.parse(section.content);
                parsed = json && typeof json === 'object' ? json : null;
            } catch (e) {
                parsed = null;
            }
        }

        const type = parsed?.__type ?? 'plain';

        // ==================== HOME SECTIONS ====================
        if (type === 'hero_home') {
            return (
                <HeroModern
                    content={{
                        heading: parsed.heading,
                        subheading: parsed.description ?? parsed.subheading,
                        primary_label: parsed.primary_label,
                        primary_link: parsed.primary_link,
                        secondary_label: parsed.secondary_label,
                        secondary_link: parsed.secondary_link,
                        image_url: parsed.hero_image ?? parsed.image,
                    }}
                />
            );
        }

        if (type === 'about_intro') {
            return (
                <About
                    content={{
                        title: parsed.heading ?? parsed.title,
                        description: parsed.description,
                        highlights: parsed.highlights ?? [],
                        image_url: parsed.image ?? null,
                    }}
                />
            );
        }

        if (type === 'service_overview') {
            return <Services services={[]} heading={parsed.heading} description={parsed.description} />;
        }

        if (type === 'why_us') {
            return <WhyChooseUs content={parsed} />;
        }

        if (type === 'testimonials_home') {
            return <Testimonial testimonials={parsed.items ?? []} metrics={parsed.metrics ?? []} />;
        }

        if (type === 'metrics_home') {
            return <MetricsSection content={parsed} />;
        }

        if (type === 'blog_preview') {
            return <LatestArticles articles={[]} />;
        }

        if (type === 'cta_home') {
            return (
                <FinalCTA
                    content={{
                        heading: parsed.heading,
                        description: parsed.description,
                        button_label: parsed.button_label,
                        button_link: parsed.button_link,
                    }}
                />
            );
        }

        // ==================== ABOUT SECTIONS ====================
        if (type === 'about_overview') {
            return <AboutCompany content={parsed} />;
        }

        if (type === 'about_vision') {
            return <VisionMissionSection content={parsed} />;
        }

        if (type === 'about_values') {
            return <CoreValuesSection values={parsed.items ?? []} />;
        }

        if (type === 'about_statistics') {
            return <StatisticsSection content={parsed} />;
        }

        if (type === 'about_team') {
            return <ManagementTeamSection content={parsed} />;
        }

        if (type === 'about_cta') {
            return <CTASection content={parsed} />;
        }

        // ==================== SERVICE SECTIONS ====================
        if (type === 'service_hero') {
            const primaryReady = parsed.primary_label && parsed.primary_link;
            const secondaryReady = parsed.secondary_label && parsed.secondary_link;

            return (
                <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white shadow-md">
                    <div className="grid gap-8 p-8 lg:grid-cols-2 lg:p-12">
                        <div className="space-y-4">
                            <p className="text-xs font-semibold tracking-[0.3em] text-indigo-200 uppercase">Layanan</p>
                            <h2 className="text-3xl leading-tight font-semibold sm:text-4xl">
                                {parsed.heading}
                                {parsed.highlight ? <span className="text-indigo-200"> {parsed.highlight}</span> : null}
                            </h2>
                            {parsed.description ? <p className="text-slate-100/80">{parsed.description}</p> : null}
                            {(primaryReady || secondaryReady) && (
                                <div className="flex flex-wrap gap-3">
                                    {primaryReady ? (
                                        <Button size="lg" className="rounded-full bg-white text-slate-900 hover:bg-slate-100" asChild>
                                            <a href={parsed.primary_link}>{parsed.primary_label}</a>
                                        </Button>
                                    ) : null}
                                    {secondaryReady ? (
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="border-white/40 text-white hover:bg-white/10 hover:text-white"
                                            asChild
                                        >
                                            <a href={parsed.secondary_link}>{parsed.secondary_label}</a>
                                        </Button>
                                    ) : null}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center justify-center">
                            {parsed.hero_image ? (
                                <img
                                    src={parsed.hero_image}
                                    alt={parsed.heading ?? 'Layanan'}
                                    className="max-h-[320px] w-full rounded-2xl object-cover shadow-lg"
                                />
                            ) : (
                                <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-sm text-white/70">
                                    Ilustrasi atau gambar hero layanan akan tampil di sini.
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            );
        }

        if (type === 'service_summary') {
            return <ServiceSummary content={parsed} />;
        }

        if (type === 'service_offerings') {
            return <AdvantagesSection content={parsed} />;
        }

        if (type === 'service_tech_stack') {
            return <TechStackSection content={parsed} />;
        }

        if (type === 'service_process') {
            return <ProcessSection content={parsed} />;
        }

        if (type === 'service_advantages') {
            return <AdvantagesSection content={parsed} />;
        }

        if (type === 'service_faqs') {
            return <FaqSection content={parsed} />;
        }

        // ==================== PRODUCT SECTIONS ====================
        if (type === 'product_hero') {
            return <ProductHero content={parsed} />;
        }

        if (type === 'product_features') {
            return <ProductFeatures content={parsed} />;
        }

        if (type === 'product_gallery') {
            return <ProductGallery content={parsed} />;
        }

        // ==================== CAREER SECTIONS ====================
        if (type === 'career_hero') {
            return <CareerHero content={parsed} />;
        }

        if (type === 'career_benefits') {
            return <CareerBenefits content={parsed} />;
        }

        if (type === 'career_positions') {
            return <CareerPositions content={parsed} />;
        }

        // ==================== CONTACT SECTIONS ====================
        if (type === 'contact_info') {
            return <ContactInfo content={parsed} />;
        }

        if (type === 'contact_map') {
            return <ContactMap content={parsed} />;
        }

        // ==================== GENERAL UI SECTIONS ====================
        if (type === 'gallery') {
            return <Gallery content={parsed} />;
        }

        if (type === 'accordion') {
            return <AccordionBlock content={parsed} />;
        }

        if (type === 'tabs') {
            return <TabsBlock content={parsed} />;
        }

        if (type === 'timeline') {
            return <Timeline content={parsed} />;
        }

        // ==================== NEW BLOCKS ====================
        if (type === 'slider') {
            return <SliderCarousel content={parsed} />;
        }

        if (type === 'video_embed') {
            return <VideoEmbed content={parsed} />;
        }

        if (type === 'pricing_table') {
            return <PricingTable content={parsed} />;
        }

        if (type === 'partners') {
            return <PartnersSection content={parsed} />;
        }

        if (type === 'counter') {
            return <CounterSection content={parsed} />;
        }

        if (type === 'feature_cards') {
            return <FeatureCards content={parsed} />;
        }

        if (type === 'banner') {
            return <BannerAlert content={parsed} />;
        }

        // ==================== FALLBACK: Plain HTML ====================
        const safe = sanitizeRichText(section.content ?? '');
        return (
            <section
                id={section.slug}
                className="mx-auto flex w-full max-w-5xl flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm lg:p-8 dark:bg-gray-900/60"
            >
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{section.title}</h2>
                <article
                    className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200"
                    dangerouslySetInnerHTML={{ __html: safe }}
                />
            </section>
        );
    };

    return (
        <LandingPageLayout>
            <div className="space-y-10 py-6">
                {safeBody && (
                    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm lg:p-10 dark:bg-gray-900/60">
                        <div>
                            <p className="text-sm font-semibold tracking-wide text-primary uppercase">Halaman</p>
                            <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-50">{page.title}</h1>
                        </div>
                        <article
                            className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200"
                            dangerouslySetInnerHTML={{ __html: safeBody }}
                        />
                    </div>
                )}

                {sections.map((section) => (
                    <div key={section.id ?? section.slug} id={section.slug}>
                        {renderSection(section)}
                    </div>
                ))}
            </div>
        </LandingPageLayout>
    );
}
