import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export type FaqContent = {
    heading?: string | null;
    description?: string | null;
    items?: Array<{
        question?: string | null;
        answer?: string | null;
    }>;
};

export function FaqSection({ content }: { content: FaqContent }) {
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
                        {content.heading ?? 'Pertanyaan yang Sering Diajukan'}
                    </h2>
                    {content.description && (
                        <div className="prose prose-slate mx-auto max-w-2xl dark:prose-invert" dangerouslySetInnerHTML={{ __html: content.description }} />
                    )}
                </motion.div>

                <motion.div className="mx-auto max-w-3xl" variants={itemVariants}>
                    <Accordion type="single" collapsible className="space-y-4">
                        {items.map((item, idx) => (
                            <AccordionItem
                                key={idx}
                                value={`faq-${idx}`}
                                className="rounded-xl border border-gray-200 bg-white px-6 dark:border-gray-700 dark:bg-gray-800"
                            >
                                <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline dark:text-white">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 dark:text-gray-400">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}

export default FaqSection;
