import React from 'react';
import { Briefcase, Zap, Users, Award, Handshake, Heart, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants, slideIn, scaleUp } from '@/utils/animations';

const highlightIcons: Record<string, LucideIcon> = {
    briefcase: Briefcase,
    zap: Zap,
    users: Users,
    award: Award,
    handshake: Handshake,
    heart: Heart,
};

export type AboutOverviewContent = {
    badge: string;
    title: string;
    heading: string;
    paragraphs: string[];
    stats: { value: string; label: string }[];
    image?: string | null;
    highlights: {
        icon: string;
        title: string;
        description: string;
    }[];
};

const AboutCompany = ({
    content,
}: {
    content: AboutOverviewContent;
}) => {
    const paragraphs = content.paragraphs?.length ? content.paragraphs : [
        'Sejak 2010 kami mendampingi organisasi di berbagai industri untuk meningkatkan kinerja operasional, kualitas layanan, dan kesiapan transformasi bisnis.',
        'Kami percaya keberhasilan berasal dari kolaborasi erat, eksperimen terukur, dan transfer kapabilitas kepada tim internal klien.',
    ];

    const highlights = content.highlights?.length
        ? content.highlights
        : [
              { icon: 'briefcase', title: 'Lintas Industri', description: 'Pengalaman proyek di sektor publik, jasa, manufaktur, kesehatan, dan energi.' },
              { icon: 'zap', title: 'Berbasis Data', description: 'Pengambilan keputusan dengan analisis data dan wawasan lapangan.' },
              { icon: 'users', title: 'Kemitraan Dekat', description: 'Membangun tim gabungan untuk memastikan inisiatif berjalan mulus.' },
              { icon: 'award', title: 'Fokus Impact', description: 'Setiap program dikaitkan dengan indikator keberhasilan yang terukur.' },
          ];

    const stats = content.stats?.length ? content.stats : [
        { value: '150+', label: 'Kemitraan Aktif' },
        { value: '12', label: 'Negara & Provinsi Operasi' },
    ];

    const primaryStat = stats[0];
    const secondaryStat = stats[1];

    return (
        <motion.section
            className="py-20 bg-white dark:bg-gray-900"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
        >
            <motion.div className="container mx-auto px-6" variants={containerVariants}>
                <motion.div className="text-center mb-12" variants={itemVariants}>
                    <span className="text-blue-600 font-semibold bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full text-sm">
                        {content.badge}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-4">
                        {content.title}
                    </h2>
                    <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">{content.heading}</p>
                </motion.div>
                <motion.div className="grid md:grid-cols-2 gap-12 items-center" variants={containerVariants}>
                    <motion.div variants={slideIn} className="space-y-5 text-gray-600 dark:text-gray-300">
                        {paragraphs.map((paragraph, index) => (
                            <motion.p key={`paragraph-${index}`} className="leading-relaxed" variants={itemVariants}>
                                {paragraph}
                            </motion.p>
                        ))}
                        <motion.div className="grid grid-cols-2 gap-6" variants={containerVariants}>
                            {highlights.map((highlight, index) => {
                                const Icon = highlightIcons[highlight.icon] ?? Zap;
                                return (
                                    <motion.div key={`highlight-${index}`} className="flex items-start gap-3" variants={itemVariants}>
                                        <Icon className="w-6 h-6 text-blue-600 dark:text-blue-500 mt-1" />
                                        <div>
                                            <span className="font-semibold text-gray-700 dark:text-gray-200">
                                                {highlight.title}
                                            </span>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{highlight.description}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                    <motion.div className="relative" variants={scaleUp} whileHover={{ scale: 1.02 }}>
                        <img
                            src={content.image || 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop'}
                            alt="Tim bekerja di kantor modern"
                            className="rounded-lg shadow-2xl w-full h-auto object-cover"
                        />
                        {primaryStat ? (
                            <motion.div
                                className="absolute top-4 right-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm p-4 rounded-lg shadow-lg"
                                variants={itemVariants}
                            >
                                <p className="font-bold text-2xl text-blue-600">{primaryStat.value}</p>
                                <p className="text-gray-700 dark:text-gray-300">{primaryStat.label}</p>
                            </motion.div>
                        ) : null}
                        {secondaryStat ? (
                            <motion.div
                                className="absolute bottom-4 left-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm p-4 rounded-lg shadow-lg"
                                variants={itemVariants}
                            >
                                <p className="font-bold text-2xl text-blue-600">{secondaryStat.value}</p>
                                <p className="text-gray-700 dark:text-gray-300">{secondaryStat.label}</p>
                            </motion.div>
                        ) : null}
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default AboutCompany;
