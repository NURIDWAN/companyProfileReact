import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export type AccordionBlockContent = {
    heading?: string | null;
    description?: string | null;
    allow_multiple?: boolean;
    items?: Array<{
        title?: string | null;
        content?: string | null;
    }>;
};

export function AccordionBlock({ content }: { content: AccordionBlockContent }) {
    const items = content.items ?? [];

    return (
        <motion.section
            className="w-full py-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
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
                            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">{content.description}</p>
                        )}
                    </motion.div>
                )}

                <motion.div className="mx-auto max-w-3xl" variants={itemVariants}>
                    <Accordion type={content.allow_multiple ? 'multiple' : 'single'} collapsible className="space-y-3">
                        {items.map((item, idx) => (
                            <AccordionItem
                                key={idx}
                                value={`item-${idx}`}
                                className="rounded-xl border border-gray-200 bg-white px-6 dark:border-gray-700 dark:bg-gray-800"
                            >
                                <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline dark:text-white">
                                    {item.title}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 dark:text-gray-400">
                                    {item.content}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}

export default AccordionBlock;
