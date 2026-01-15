import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';

export type MetricsContent = {
    heading?: string | null;
    description?: string | null;
    items?: Array<{
        value?: string | null;
        label?: string | null;
    }>;
};

export function MetricsSection({ content }: { content: MetricsContent }) {
    const items = content.items ?? [];

    return (
        <motion.section
            className="w-full rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 py-12 text-white"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.div
                className="container mx-auto grid max-w-screen-xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4"
                variants={containerVariants}
            >
                {items.map((item, idx) => (
                    <motion.div
                        key={idx}
                        className="text-center"
                        variants={itemVariants}
                    >
                        <div className="text-4xl font-bold md:text-5xl">{item.value}</div>
                        <div className="mt-2 text-sm text-white/80">{item.label}</div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
}

export default MetricsSection;
