import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type TechStackContent = {
    heading?: string | null;
    description?: string | null;
    items?: Array<{
        name?: string | null;
        category?: string | null;
        icon?: string | null;
    }>;
};

const iconRegistry = LucideIcons as unknown as Record<string, LucideIcon>;

export function TechStackSection({ content }: { content: TechStackContent }) {
    const items = content.items ?? [];

    return (
        <motion.section
            className="w-full rounded-3xl bg-gray-50 py-16 dark:bg-gray-900"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
        >
            <motion.div className="container mx-auto max-w-screen-xl px-4" variants={containerVariants}>
                <motion.div className="mb-12 text-center" variants={itemVariants}>
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                        {content.heading ?? 'Tech Stack'}
                    </h2>
                    {content.description && (
                        <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">{content.description}</p>
                    )}
                </motion.div>

                <motion.div
                    className="flex flex-wrap justify-center gap-4"
                    variants={containerVariants}
                >
                    {items.map((item, idx) => {
                        const IconComponent = item.icon ? iconRegistry[item.icon] : iconRegistry.Code;
                        return (
                            <motion.div
                                key={idx}
                                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                            >
                                {IconComponent && <IconComponent className="h-4 w-4 text-indigo-500" />}
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
                                {item.category && (
                                    <span className="text-xs text-gray-400">({item.category})</span>
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>
        </motion.section>
    );
}

export default TechStackSection;
