import { About } from "@/components/ui/landingPageComponent/home/about";
import { LatestArticles } from "@/components/ui/landingPageComponent/home/article";
import { FinalCTA } from "@/components/ui/landingPageComponent/home/finalCTA";
import { HeroModern } from "@/components/ui/landingPageComponent/home/HeroHome";
import { Services } from "@/components/ui/landingPageComponent/home/service";
import { Testimonial } from "@/components/ui/landingPageComponent/home/testimonial";
import LandingPageLayout from "@/layouts/landingPage-layouts";
import { usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import type { PageProps } from "@inertiajs/core";

type HomePageProps = PageProps & {
    services?: Array<{
        id: number;
        title: string;
        slug: string;
        excerpt?: string | null;
        description?: string | null;
    }>;
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
};

export default function HomePage() {
    const { services, articles, testimonials, hero, about, finalCta, metrics } = usePage<HomePageProps>().props;

    return (
        <LandingPageLayout>
            <motion.div 
                initial="hidden"
                animate="show"
                className="space-y-16"
            >
                <HeroModern content={hero} />
                <About content={about} />
                <Services services={services} />
                <Testimonial testimonials={testimonials} metrics={metrics} />
                <LatestArticles articles={articles} />
                <FinalCTA content={finalCta} />
            </motion.div>
        </LandingPageLayout>
    );
}
