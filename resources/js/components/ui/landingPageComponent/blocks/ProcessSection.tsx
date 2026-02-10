import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ProcessContent = {
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

export function ProcessSection({ content }: { content: ProcessContent }) {
    const items = content.items ?? [];

    return (
        <motion.section
            className="w-full py-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
        >
            <motion.div className="container mx-auto max-w-screen-xl px-4" variants={containerVariants}>
                <motion.div className="mb-12 text-center" variants={itemVariants}>
                    {content.badge && (
                        <span className="mb-4 inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                            {content.badge}
                        </span>
                    )}
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                        {content.heading ?? 'Proses Kerja Kami'}
                    </h2>
                    {content.description && (
                        <div className="prose prose-slate mx-auto max-w-2xl dark:prose-invert" dangerouslySetInnerHTML={{ __html: content.description }} />
                    )}
                </motion.div>

                <motion.div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4" variants={containerVariants}>
                    {items.map((item, idx) => {
                        const IconComponent = item.icon ? iconRegistry[item.icon] : null;
                        return (
                            <motion.div
                                key={idx}
                                className="relative text-center"
                                variants={itemVariants}
                            >
                                <div className="mb-4 flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                                    {IconComponent ? <IconComponent className="h-8 w-8" /> : (idx + 1).toString().padStart(2, '0')}
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>
        </motion.section>
    );
}

export default ProcessSection;
