import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/utils/animations";

type TestimonialItem = {
    id: number;
    author_name: string;
    author_role?: string | null;
    company?: string | null;
    avatar?: string | null;
    quote: string;
    rating?: number | null;
};

type MetricsItem = {
    value: string;
    label: string;
};

interface TestimonialProps {
    testimonials?: TestimonialItem[];
    metrics?: MetricsItem[];
}

function TestimonialCard({ testimonial }: { testimonial: TestimonialItem }) {
    return (
        <Card className="relative h-full min-w-[320px] max-w-[360px] shrink-0 bg-white p-5 shadow-md dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-3 flex items-center justify-between">
                <div className="flex text-amber-400">
                    {Array.from({ length: testimonial.rating ?? 5 }).map((_, index) => (
                        <Star key={index} className="h-4 w-4 fill-current" />
                    ))}
                </div>
                <Quote className="h-6 w-6 text-gray-200 dark:text-gray-700" />
            </div>
            <CardContent className="mb-4 p-0 text-left">
                <p className="text-sm italic leading-relaxed text-gray-600 dark:text-gray-300">
                    "{testimonial.quote}"
                </p>
            </CardContent>
            <div className="mt-auto flex items-center gap-3">
                <Avatar className="h-10 w-10 ring-2 ring-amber-100 dark:ring-amber-900/40">
                    <AvatarImage src={testimonial.avatar ?? undefined} alt={testimonial.author_name} />
                    <AvatarFallback className="bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300">
                        {testimonial.author_name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{testimonial.author_name}</p>
                    <p className="text-xs text-gray-500">
                        {testimonial.author_role ?? testimonial.company ?? "Klien"}
                    </p>
                </div>
            </div>
        </Card>
    );
}

export function Testimonial({ testimonials, metrics }: TestimonialProps) {
    const testimonialsData = testimonials ?? [];
    const metricsData = metrics ?? [];

    // Duplicate items for seamless infinite scroll
    const duplicatedTestimonials = [...testimonialsData, ...testimonialsData];

    return (
        <motion.section
            id="testimonials"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-white py-12 sm:py-14 dark:from-gray-950 dark:to-gray-900"
        >
            <motion.div
                className="container mx-auto max-w-screen-xl px-4 text-center"
                variants={containerVariants}
            >
                <motion.div
                    className="mb-10"
                    variants={itemVariants}
                >
                    <span className="mb-3 inline-block rounded-full bg-amber-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 dark:bg-amber-900/40 dark:text-amber-300">
                        Testimoni
                    </span>
                    <h2 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                        Kata Mereka
                    </h2>
                    <p className="mx-auto max-w-xl text-base text-gray-500 dark:text-gray-400">
                        Kepuasan dan kepercayaan klien adalah prioritas utama kami
                    </p>
                </motion.div>
            </motion.div>

            {/* Infinite Scroll Container */}
            {testimonialsData.length ? (
                <div className="relative">
                    {/* Gradient Fade Left */}
                    <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-950" />
                    {/* Gradient Fade Right */}
                    <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-950" />

                    {/* Scrolling Container */}
                    <div className="flex animate-scroll-x gap-6 py-4 hover:[animation-play-state:paused]">
                        {duplicatedTestimonials.map((testimonial, index) => (
                            <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="container mx-auto max-w-screen-xl px-4">
                    <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                        Belum ada testimoni yang dipublikasikan.
                    </div>
                </div>
            )}

            {/* Metrics Section */}
            {metricsData.length ? (
                <motion.div
                    className="container mx-auto mt-12 flex max-w-screen-xl flex-col items-center justify-center gap-8 px-4 md:flex-row"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    {metricsData.map((metric) => (
                        <motion.div key={metric.label} variants={itemVariants} className="flex flex-col items-center">
                            <p className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">{metric.value}</p>
                            <p className="text-sm text-gray-500">{metric.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            ) : null}
        </motion.section>
    );
}
