import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export type ContactInfoContent = {
    heading?: string | null;
    description?: string | null;
    address?: string | null;
    phone?: string | null;
    email?: string | null;
    hours?: string | null;
    map_embed?: string | null;
};

export function ContactInfo({ content }: { content: ContactInfoContent }) {
    const contactItems = [
        { icon: MapPin, label: 'Alamat', value: content.address },
        { icon: Phone, label: 'Telepon', value: content.phone },
        { icon: Mail, label: 'Email', value: content.email },
        { icon: Clock, label: 'Jam Operasional', value: content.hours },
    ].filter(item => item.value);

    return (
        <motion.section
            className="w-full rounded-3xl bg-white py-16 dark:bg-gray-900"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
        >
            <motion.div className="container mx-auto max-w-screen-xl px-4" variants={containerVariants}>
                <motion.div className="mb-12 text-center" variants={itemVariants}>
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                        {content.heading ?? 'Hubungi Kami'}
                    </h2>
                    {content.description && (
                        <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">{content.description}</p>
                    )}
                </motion.div>

                <motion.div className="grid gap-8 lg:grid-cols-2" variants={containerVariants}>
                    <motion.div className="space-y-6" variants={itemVariants}>
                        {contactItems.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                                    <item.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.label}</p>
                                    <p className="text-gray-900 dark:text-white">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {content.map_embed && (
                        <motion.div
                            className="aspect-video overflow-hidden rounded-2xl"
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
                    )}
                </motion.div>
            </motion.div>
        </motion.section>
    );
}

export default ContactInfo;
