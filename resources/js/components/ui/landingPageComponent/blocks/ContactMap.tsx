import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';

export type ContactMapContent = {
    heading?: string | null;
    map_embed?: string | null;
    height?: number;
};

export function ContactMap({ content }: { content: ContactMapContent }) {
    const height = content.height ?? 400;

    if (!content.map_embed) {
        return null;
    }

    return (
        <motion.section
            className="w-full rounded-3xl overflow-hidden"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
        >
            <motion.div variants={containerVariants}>
                {content.heading && (
                    <motion.h2
                        className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white"
                        variants={itemVariants}
                    >
                        {content.heading}
                    </motion.h2>
                )}
                <motion.div
                    className="overflow-hidden rounded-2xl"
                    style={{ height: `${height}px` }}
                    variants={itemVariants}
                >
                    <iframe
                        src={content.map_embed}
                        className="h-full w-full border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </motion.div>
            </motion.div>
        </motion.section>
    );
}

export default ContactMap;
