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

export function Testimonial({ testimonials, metrics }: TestimonialProps) {
    const testimonialsData = testimonials ?? [];
    const metricsData = metrics ?? [];

    return (
        <motion.section
            id="testimonials"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full rounded-3xl bg-gray-50 py-12 sm:py-16 lg:py-20 dark:bg-gray-950"
        >
            <motion.div
                className="container mx-auto max-w-screen-xl px-4 text-center"
                variants={containerVariants}
            >
                <motion.div
                    className="mb-12"
                    variants={itemVariants}
                >
                    <p className="mb-2 text-sm font-semibold text-gray-400">&quot; Testimoni Klien &quot;</p>
                    <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                        Kata Mereka
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-gray-500 dark:text-gray-400">
                        Kepuasan dan kepercayaan klien adalah prioritas utama kami. Berikut adalah testimoni dari
                        mereka yang telah merasakan layanan terbaik kami.
                    </p>
                </motion.div>

                {testimonialsData.length ? (
                    <motion.div
                        className="grid grid-cols-1 gap-8 md:grid-cols-3"
                        variants={containerVariants}
                    >
                        {testimonialsData.map((testimonial) => (
                            <motion.div
                                key={testimonial.id}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                className="h-full"
                            >
                                <Card className="relative h-full bg-white p-6 shadow-md dark:border-gray-800 dark:bg-gray-900">
                                    <div className="mb-4 flex items-center justify-between">
                                        <div className="flex text-yellow-500">
                                            {Array.from({ length: testimonial.rating ?? 5 }).map((_, index) => (
                                                <Star key={index} className="h-5 w-5 fill-current" />
                                            ))}
                                        </div>
                                        <Quote className="absolute right-4 top-4 h-8 w-8 text-gray-200 dark:text-gray-700" />
                                    </div>
                                    <CardContent className="mb-6 p-0 text-left">
                                        <p className="italic text-gray-700 dark:text-gray-300">
                                            <Quote className="mr-1 inline-block h-4 w-4 -mt-1 text-gray-400 dark:text-gray-600" />
                                            {testimonial.quote}
                                            <Quote className="ml-1 inline-block h-4 w-4 -mt-1 rotate-180 text-gray-400 dark:text-gray-600" />
                                        </p>
                                    </CardContent>
                                    <div className="mt-auto flex items-center">
                                        <Avatar className="mr-4 h-10 w-10">
                                            <AvatarImage src={testimonial.avatar ?? undefined} alt={testimonial.author_name} />
                                            <AvatarFallback>{testimonial.author_name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="text-left">
                                            <p className="font-semibold text-gray-900 dark:text-white">{testimonial.author_name}</p>
                                            <p className="text-sm text-gray-500">
                                                {testimonial.author_role ?? testimonial.company ?? "Klien"}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        variants={itemVariants}
                        className="rounded-lg border border-dashed p-8 text-sm text-muted-foreground"
                    >
                        Belum ada testimoni yang dipublikasikan.
                    </motion.div>
                )}

                {metricsData.length ? (
                    <motion.div
                        className="mt-16 flex flex-col items-center justify-center gap-8 md:flex-row"
                        variants={containerVariants}
                    >
                        {metricsData.map((metric) => (
                            <motion.div key={metric.label} variants={itemVariants} className="flex flex-col items-center">
                                <p className="text-4xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                                <p className="text-sm text-gray-500">{metric.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : null}
            </motion.div>
        </motion.section>
    );
}
