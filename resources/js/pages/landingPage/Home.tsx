import { About } from "@/components/ui/landingPageComponent/home/about";
import { LatestArticles } from "@/components/ui/landingPageComponent/home/article";
import { FinalCTA } from "@/components/ui/landingPageComponent/home/finalCTA";
import { HeroModern } from "@/components/ui/landingPageComponent/home/HeroHome";
import { Services } from "@/components/ui/landingPageComponent/home/service";
import { Testimonial } from "@/components/ui/landingPageComponent/home/testimonial";
import { TeamShowcase } from "@/components/ui/landingPageComponent/home/team-showcase";
import LandingPageLayout from "@/layouts/landingPage-layouts";
import { usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import type { PageProps } from "@inertiajs/core";

type SectionKey = "hero" | "about" | "services" | "testimonials" | "articles" | "final_cta" | "metrics" | "team";
type SectionVisibility = Partial<Record<SectionKey, boolean>>;

type HomePageProps = PageProps & {
    services?: Array<{
        id: number;
        title: string;
        slug: string;
        icon?: string | null;
        excerpt?: string | null;
        description?: string | null;
    }>;
    servicesContent?: {
        heading?: string | null;
        description?: string | null;
        highlights?: string[];
    };
    articles?: Array<{
        id: number;
        title: string;
        slug: string;
        excerpt?: string | null;
        cover_image?: string | null;
        published_at?: string | null;
        author?: string | null;
    }>;
    testimonials?: Array<{
        id: number;
        author_name: string;
        author_role?: string | null;
        company?: string | null;
        avatar?: string | null;
        quote: string;
        rating?: number | null;
    }>;
    hero?: {
        heading?: string | null;
        subheading?: string | null;
        primary_label?: string | null;
        primary_link?: string | null;
        secondary_label?: string | null;
        secondary_link?: string | null;
        image_url?: string | null;
    };
    about?: {
        title?: string | null;
        description?: string | null;
        highlights?: string[];
        image_url?: string | null;
    };
    finalCta?: {
        heading?: string | null;
        description?: string | null;
        button_label?: string | null;
        button_link?: string | null;
    };
    metrics?: Array<{ value: string; label: string }>;
    teamMembers?: Array<{
        id: number;
        name: string;
        role?: string | null;
        photo?: string | null;
        linkedin?: string | null;
        bio?: string | null;
    }>;
    sections?: SectionVisibility;
};

export default function HomePage() {
    const { services, servicesContent, articles, testimonials, hero, about, finalCta, metrics, teamMembers, sections } =
        usePage<HomePageProps>().props;
    const visibility = sections ?? {};
    const isEnabled = (key: SectionKey) => visibility[key] ?? true;
    const metricData = isEnabled("metrics") && metrics ? metrics : [];

    return (
        <LandingPageLayout>
            <motion.div
                initial="hidden"
                animate="show"
                className="space-y-16"
            >
                {isEnabled("hero") && (
                    <div id="hero">
                        <HeroModern content={hero ?? undefined} />
                    </div>
                )}
                {isEnabled("about") && (
                    <div id="about-summary">
                        <About content={about} />
                    </div>
                )}
                {isEnabled("services") && (
                    <div id="service-highlight">
                        <Services
                            services={services}
                            heading={servicesContent?.heading}
                            description={servicesContent?.description}
                        />
                    </div>
                )}
                {isEnabled("testimonials") && (
                    <Testimonial testimonials={testimonials} metrics={metricData ?? []} />
                )}
                {isEnabled("team") && (teamMembers?.length ?? 0) > 0 && <TeamShowcase members={teamMembers} />}
                {isEnabled("articles") && <LatestArticles articles={articles} />}
                {isEnabled("final_cta") && <FinalCTA content={finalCta} />}
            </motion.div>
        </LandingPageLayout>
    );
}
