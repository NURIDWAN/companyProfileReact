import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Check } from 'lucide-react';

export type AdvantagesContent = {
    badge?: string | null;
    heading?: string | null;
    description?: string | null;
    items?: Array<{
        icon?: string | null;
        title?: string | null;
        description?: string | null;
    }>;
};

const iconRegistry = LucideIcons as unknown as Record<string, LucideIcon>;

export function AdvantagesSection({ content }: { content: AdvantagesContent }) {
    const items = content.items ?? [];

    return (
        <motion.section
            className="w-full rounded-3xl bg-white py-16 dark:bg-gray-900"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
        >
            <motion.div className="container mx-auto max-w-screen-xl px-4" variants={containerVariants}>
                <motion.div className="mb-12 text-center" variants={itemVariants}>
                    {content.badge && (
                        <span className="mb-4 inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300">
                            {content.badge}
                        </span>
                    )}
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                        {content.heading ?? 'Keunggulan Kami'}
                    </h2>
                    {content.description && (
                        <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">{content.description}</p>
                    )}
                </motion.div>

                <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" variants={containerVariants}>
                    {items.map((item, idx) => {
                        const IconComponent = item.icon ? iconRegistry[item.icon] : Check;
                        return (
                            <motion.div
                                key={idx}
                                className="flex gap-4 rounded-xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800"
                                variants={itemVariants}
                                whileHover={{ y: -4 }}
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                                    <IconComponent className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>
        </motion.section>
    );
}

export default AdvantagesSection;
