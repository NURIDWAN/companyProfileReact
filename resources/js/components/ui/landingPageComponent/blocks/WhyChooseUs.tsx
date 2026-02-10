import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type WhyChooseUsContent = {
    heading?: string | null;
    description?: string | null;
    items?: Array<{
        icon?: string | null;
        title?: string | null;
        description?: string | null;
    }>;
};

const iconRegistry = LucideIcons as unknown as Record<string, LucideIcon>;

export function WhyChooseUs({ content }: { content: WhyChooseUsContent }) {
    const heading = content.heading ?? 'Mengapa Memilih Kami?';
    const description = content.description ?? 'Kami berkomitmen memberikan solusi terbaik untuk kebutuhan bisnis Anda.';
    const items = content.items ?? [];

    return (
        <motion.section
            className="w-full rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 py-16 text-white"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
        >
            <motion.div className="container mx-auto max-w-screen-xl px-4" variants={containerVariants}>
                <motion.div className="mb-12 text-center" variants={itemVariants}>
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">{heading}</h2>
                    {description && <div className="prose prose-lg mx-auto max-w-2xl prose-invert" dangerouslySetInnerHTML={{ __html: description }} />}
                </motion.div>

                <motion.div
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                    variants={containerVariants}
                >
                    {items.map((item, idx) => {
                        const IconComponent = item.icon ? iconRegistry[item.icon] : null;
                        return (
                            <motion.div
                                key={idx}
                                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10"
                                variants={itemVariants}
                                whileHover={{ y: -4 }}
                            >
                                {IconComponent && (
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20">
                                        <IconComponent className="h-6 w-6 text-indigo-400" />
                                    </div>
                                )}
                                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                                <p className="text-sm text-slate-300">{item.description}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>
        </motion.section>
    );
}

export default WhyChooseUs;
