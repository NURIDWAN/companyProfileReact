import LandingPageLayout from '@/layouts/landingPage-layouts';
import { usePage } from '@inertiajs/react';
import { sanitizeRichText } from '@/utils/sanitize-html';
import React, { useMemo } from 'react';
import { HeroModern } from "@/components/ui/landingPageComponent/home/HeroHome";
import { About } from "@/components/ui/landingPageComponent/home/about";
import { Services } from "@/components/ui/landingPageComponent/home/service";
import { FinalCTA } from "@/components/ui/landingPageComponent/home/finalCTA";
import { Button } from "@/components/ui/button";

type PagePayload = {
    title: string;
    body?: string | null;
    sections?: Array<{
        id: number;
        title: string;
        slug: string;
        content?: string | null;
        display_order?: number | null;
    }>;
};

interface Props {
    page: PagePayload;
}

export default function StaticPage() {
    const { page } = usePage<Props>().props;

    const safeBody = useMemo(() => sanitizeRichText(page.body ?? ''), [page.body]);
    const sections = page.sections ?? [];

    const renderSection = (section: PagePayload["sections"][number]) => {
        let parsed: any = null;
        if (section.content) {
            try {
                const json = JSON.parse(section.content);
                parsed = json && typeof json === "object" ? json : null;
            } catch (e) {
                parsed = null;
            }
        }

        const type = parsed?.__type ?? "plain";

        if (type === "hero_home") {
            return <HeroModern content={{
                heading: parsed.heading,
                subheading: parsed.description ?? parsed.subheading,
                primary_label: parsed.primary_label,
                primary_link: parsed.primary_link,
                secondary_label: parsed.secondary_label,
                secondary_link: parsed.secondary_link,
                image_url: parsed.hero_image ?? parsed.image
            }} />;
        }

        if (type === "about_intro") {
            return <About content={{
                title: parsed.heading ?? parsed.title,
                description: parsed.description,
                highlights: parsed.highlights ?? [],
                image_url: parsed.image ?? null,
            }} />;
        }

        if (type === "service_overview") {
            return <Services services={[]} heading={parsed.heading} description={parsed.description} highlights={parsed.highlights ?? []} />;
        }

        if (type === "cta_home") {
            return <FinalCTA content={{
                heading: parsed.heading,
                description: parsed.description,
                button_label: parsed.button_label,
                button_link: parsed.button_link,
            }} />;
        }

        if (type === "service_hero") {
            const primaryReady = parsed.primary_label && parsed.primary_link;
            const secondaryReady = parsed.secondary_label && parsed.secondary_link;

            return (
                <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white shadow-md">
                    <div className="grid gap-8 p-8 lg:grid-cols-2 lg:p-12">
                        <div className="space-y-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200">Layanan</p>
                            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
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
                                        <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 hover:text-white" asChild>
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
                                    alt={parsed.heading ?? "Layanan"}
                                    className="max-h-[320px] w-full rounded-2xl object-cover shadow-lg"
                                />
                            ) : (
                                <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-sm text-white/70">
                                    Ilustrasi atau gambar hero layanan akan tampil di sini.
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 -bottom-10 h-10 bg-gradient-to-b from-slate-900/40 to-white dark:to-gray-900" />
                </section>
            );
        }

        // fallback rich text
        const safe = sanitizeRichText(section.content ?? '');
        return (
            <section id={section.slug} className="mx-auto flex w-full max-w-5xl flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900/60 lg:p-8">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{section.title}</h2>
                <article className="prose max-w-none text-slate-800 dark:prose-invert dark:text-slate-200" dangerouslySetInnerHTML={{ __html: safe }} />
            </section>
        );
    };

    return (
        <LandingPageLayout>
            <div className="space-y-10 py-6">
                {safeBody && (
                    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900/60 lg:p-10">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Halaman</p>
                            <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-50">{page.title}</h1>
                        </div>
                        <article className="prose max-w-none text-slate-800 dark:prose-invert dark:text-slate-200" dangerouslySetInnerHTML={{ __html: safeBody }} />
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
