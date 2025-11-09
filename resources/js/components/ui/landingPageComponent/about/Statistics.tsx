import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';

type StatItemProps = {
    value: string;
    label: string;
};

const StatItem = ({ value, label }: StatItemProps) => (
    <motion.div className="text-center bg-white/10 backdrop-blur-sm p-6 rounded-lg" variants={itemVariants}>
        <h3 className="text-4xl font-bold">{value}</h3>
        <p className="opacity-80 mt-1">{label}</p>
    </motion.div>
);

const StatItemSmall = ({ value, label }: StatItemProps) => (
    <motion.div className="text-center" variants={itemVariants}>
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="opacity-80 text-sm mt-1">{label}</p>
    </motion.div>
);

export type StatisticsContent = {
    badge: string;
    title: string;
    description: string;
    primary: StatItemProps[];
    secondary: StatItemProps[];
};

const StatisticsSection = ({ content }: { content: StatisticsContent }) => {
    const primaryItems = content.primary?.length
        ? content.primary
        : [
              { value: '500+', label: 'Proyek Selesai' },
              { value: '200+', label: 'Klien Puas' },
              { value: '8+', label: 'Tahun Pengalaman' },
              { value: '50+', label: 'Tim Profesional' },
          ];

    const secondaryItems = content.secondary?.length
        ? content.secondary
        : [
              { value: '99.9%', label: 'Uptime Server' },
              { value: '24/7', label: 'Support System' },
              { value: '100%', label: 'Garansi Kepuasan' },
          ];

    return (
        <motion.section
            className="py-20 bg-gray-800 text-white"
            style={{ background: 'linear-gradient(to right, #4f46e5, #818cf8)' }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
        >
            <motion.div className="container mx-auto px-6" variants={containerVariants}>
                <motion.div className="text-center mb-12" variants={itemVariants}>
                    <span className="text-white font-semibold bg-white/20 px-3 py-1 rounded-full text-sm">
                        {content.badge ?? 'Pencapaian Kami'}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-4">{content.title ?? 'Angka Berbicara'}</h2>
                    <p className="mt-2 max-w-3xl mx-auto opacity-80">{content.description}</p>
                </motion.div>
                <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8" variants={containerVariants}>
                    {primaryItems.map((item, index) => (
                        <StatItem key={`primary-stat-${index}`} value={item.value} label={item.label} />
                    ))}
                </motion.div>
                {secondaryItems.length ? (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-white/20"
                        variants={containerVariants}
                    >
                        {secondaryItems.map((item, index) => (
                            <StatItemSmall key={`secondary-stat-${index}`} value={item.value} label={item.label} />
                        ))}
                    </motion.div>
                ) : null}
            </motion.div>
        </motion.section>
    );
};

export default StatisticsSection;
