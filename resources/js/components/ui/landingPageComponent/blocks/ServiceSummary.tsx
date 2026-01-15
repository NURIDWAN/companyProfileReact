import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';

export type ServiceSummaryContent = {
    badge?: string | null;
    heading?: string | null;
    description?: string | null;
};

export function ServiceSummary({ content }: { content: ServiceSummaryContent }) {
    return (
        <motion.section
            className="w-full py-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.div className="container mx-auto max-w-screen-xl px-4 text-center" variants={containerVariants}>
                {content.badge && (
                    <motion.span
                        className="mb-4 inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                        variants={itemVariants}
                    >
                        {content.badge}
                    </motion.span>
                )}
                <motion.h2
                    className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl"
                    variants={itemVariants}
                >
                    {content.heading}
                </motion.h2>
                <motion.p
                    className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-400"
                    variants={itemVariants}
                >
                    {content.description}
                </motion.p>
            </motion.div>
        </motion.section>
    );
}

export default ServiceSummary;
