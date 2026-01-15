import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type CareerBenefitsContent = {
    heading?: string | null;
    description?: string | null;
    items?: Array<{
        icon?: string | null;
        title?: string | null;
        description?: string | null;
    }>;
};

const iconRegistry = LucideIcons as unknown as Record<string, LucideIcon>;

export function CareerBenefits({ content }: { content: CareerBenefitsContent }) {
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
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                        {content.heading ?? 'Benefit Bergabung'}
                    </h2>
                    {content.description && (
                        <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">{content.description}</p>
                    )}
                </motion.div>

                <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" variants={containerVariants}>
                    {items.map((item, idx) => {
                        const IconComponent = item.icon ? iconRegistry[item.icon] : iconRegistry.Gift;
                        return (
                            <motion.div
                                key={idx}
                                className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800"
                                variants={itemVariants}
                                whileHover={{ y: -4 }}
                            >
                                <div className="mb-4 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/30">
                                    {IconComponent && <IconComponent className="h-7 w-7 text-teal-600 dark:text-teal-400" />}
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

export default CareerBenefits;
