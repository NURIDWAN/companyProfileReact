import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Circle } from 'lucide-react';

export type TimelineContent = {
    heading?: string | null;
    description?: string | null;
    items?: Array<{
        date?: string | null;
        title?: string | null;
        description?: string | null;
        icon?: string | null;
    }>;
};

const iconRegistry = LucideIcons as unknown as Record<string, LucideIcon>;

export function Timeline({ content }: { content: TimelineContent }) {
    const items = content.items ?? [];

    return (
        <motion.section
            className="w-full py-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
        >
            <motion.div className="container mx-auto max-w-screen-xl px-4" variants={containerVariants}>
                {(content.heading || content.description) && (
                    <motion.div className="mb-12 text-center" variants={itemVariants}>
                        {content.heading && (
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                                {content.heading}
                            </h2>
                        )}
                        {content.description && (
                            <div className="prose prose-slate mx-auto max-w-2xl dark:prose-invert" dangerouslySetInnerHTML={{ __html: content.description }} />
                        )}
                    </motion.div>
                )}

                <div className="relative mx-auto max-w-3xl">
                    {/* Vertical line */}
                    <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 md:left-1/2 md:-translate-x-1/2" />

                    <div className="space-y-8">
                        {items.map((item, idx) => {
                            const IconComponent = item.icon ? iconRegistry[item.icon] : Circle;
                            const isEven = idx % 2 === 0;

                            return (
                                <motion.div
                                    key={idx}
                                    className="relative pl-12 md:pl-0"
                                    variants={itemVariants}
                                >
                                    {/* Icon circle */}
                                    <div className={`absolute left-0 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-indigo-500 text-white shadow-lg dark:border-gray-900 md:left-1/2 md:-translate-x-1/2`}>
                                        {IconComponent && <IconComponent className="h-4 w-4" />}
                                    </div>

                                    {/* Content */}
                                    <div className={`md:w-[calc(50%-2rem)] ${isEven ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8 md:text-right'}`}>
                                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                            {item.date && (
                                                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                                                    {item.date}
                                                </span>
                                            )}
                                            <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                                                {item.title}
                                            </h3>
                                            {item.description && (
                                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </motion.section>
    );
}

export default Timeline;
