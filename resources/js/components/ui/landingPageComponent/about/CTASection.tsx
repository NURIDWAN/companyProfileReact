import React from 'react';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants, scaleUp } from '@/utils/animations';

type ContactInfoProps = {
    icon: React.ReactNode;
    title: string;
    detail: string;
};

const ContactInfo = ({ icon, title, detail }: ContactInfoProps) => (
    <motion.div className="flex items-center justify-center md:justify-start" variants={itemVariants}>
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-4 backdrop-blur-sm border border-white/10">
            <div className="text-indigo-300 transform scale-110">{icon}</div>
        </div>
        <div>
            <h5 className="font-bold text-white text-left text-lg">{title}</h5>
            <p className="text-indigo-200/80 text-left text-sm">{detail}</p>
        </div>
    </motion.div>
);

export type AboutCtaContent = {
    badge: string;
    heading: string;
    description: string;
    primary_label: string;
    primary_link: string;
    secondary_label?: string | null;
    secondary_link?: string | null;
    background_image?: string | null;
    contacts: {
        icon: string;
        title: string;
        detail: string;
    }[];
};

const iconMapping: Record<string, React.ReactNode> = {
    phone: <Phone className="text-blue-600 dark:text-blue-400" />,
    mail: <Mail className="text-purple-600 dark:text-purple-400" />,
    clock: <Clock className="text-green-600 dark:text-green-400" />,
    'map-pin': <MapPin className="text-amber-600 dark:text-amber-400" />,
};

const CTASection = ({ content }: { content: AboutCtaContent }) => (
    <motion.section
        className="py-20 relative bg-indigo-900 overflow-hidden"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
    >
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -left-[10%] -top-[30%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[100px]" />
            <div className="absolute -bottom-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-[100px]" />
            <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[80px]" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
        </div>

        <motion.div className="container mx-auto px-6 text-center relative z-10" variants={containerVariants}>
            <span className="text-indigo-200 font-semibold bg-indigo-800/50 backdrop-blur-sm border border-indigo-700/50 px-4 py-1.5 rounded-full text-sm">
                {content.badge ?? 'Mari Berdiskusi'}
            </span>
            <motion.h2 className="text-3xl md:text-5xl font-extrabold text-white mt-6 drop-shadow-sm" variants={itemVariants}>
                {content.heading ?? 'Siap Bekerja Sama Dengan Kami?'}
            </motion.h2>
            <motion.p className="text-indigo-100/90 max-w-2xl mx-auto mt-4 mb-10 text-lg leading-relaxed" variants={itemVariants}>
                {content.description}
            </motion.p>
            <motion.div className="flex justify-center flex-wrap gap-4 mb-16" variants={itemVariants}>
                <motion.a
                    href={content.primary_link ?? '/contact'}
                    className="bg-white text-indigo-900 font-bold px-8 py-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-indigo-50 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all transform hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                >
                    {content.primary_label ?? 'Hubungi Kami Sekarang'}
                </motion.a>
                {content.secondary_label && content.secondary_link ? (
                    <motion.a
                        href={content.secondary_link}
                        className="bg-transparent text-white font-bold px-8 py-4 rounded-full border-2 border-white/20 hover:bg-white/10 transition-colors"
                        whileHover={{ scale: 1.05 }}
                    >
                        {content.secondary_label}
                    </motion.a>
                ) : null}
            </motion.div>
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-indigo-500/30" variants={containerVariants}>
                {(content.contacts?.length
                    ? content.contacts
                    : [
                        { icon: 'phone', title: 'Telepon', detail: '+62 877 1696 7890' },
                        { icon: 'mail', title: 'Email', detail: 'info@example.com' },
                        { icon: 'clock', title: 'Jam Kerja', detail: 'Senin - Jumat, 09:00 - 18:00' },
                    ]
                ).map((item, index) => (
                    <ContactInfo
                        key={`cta-contact-${index}`}
                        icon={iconMapping[item.icon] ?? iconMapping.phone}
                        title={item.title}
                        detail={item.detail}
                    />
                ))}
            </motion.div>
        </motion.div>
    </motion.section>
);

export default CTASection;
