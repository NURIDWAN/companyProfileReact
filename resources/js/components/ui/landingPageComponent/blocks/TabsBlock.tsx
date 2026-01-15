import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { sanitizeRichText } from '@/utils/sanitize-html';
import { useState } from 'react';

export type TabsBlockContent = {
    heading?: string | null;
    description?: string | null;
    items?: Array<{
        title?: string | null;
        content?: string | null;
    }>;
};

export function TabsBlock({ content }: { content: TabsBlockContent }) {
    const items = content.items ?? [];
    const [activeTab, setActiveTab] = useState('tab-0');

    if (items.length === 0) return null;

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

                <motion.div variants={itemVariants}>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="mb-6 flex flex-wrap justify-center gap-2 bg-transparent">
                            {items.map((item, idx) => (
                                <TabsTrigger
                                    key={idx}
                                    value={`tab-${idx}`}
                                    className="rounded-full border border-gray-200 bg-white px-6 py-2 data-[state=active]:border-indigo-500 data-[state=active]:bg-indigo-500 data-[state=active]:text-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                    {item.title}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {items.map((item, idx) => (
                            <TabsContent
                                key={idx}
                                value={`tab-${idx}`}
                                className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
                            >
                                <div
                                    className="prose max-w-none dark:prose-invert"
                                    dangerouslySetInnerHTML={{ __html: sanitizeRichText(item.content ?? '') }}
                                />
                            </TabsContent>
                        ))}
                    </Tabs>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}

export default TabsBlock;
