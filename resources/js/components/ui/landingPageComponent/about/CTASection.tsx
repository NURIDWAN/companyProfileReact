import React from 'react';
import { Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants, scaleUp } from '@/utils/animations';

type ContactInfoProps = {
    icon: React.ReactNode;
    title: string;
    detail: string;
};

const ContactInfo = ({ icon, title, detail }: ContactInfoProps) => (
    <motion.div className="flex items-center justify-center md:justify-start" variants={itemVariants}>
        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mr-4">
            {icon}
        </div>
        <div>
            <h5 className="font-bold text-gray-800 dark:text-white text-left">{title}</h5>
            <p className="text-gray-600 dark:text-gray-400 text-left">{detail}</p>
        </div>
    </motion.div>
);

const CTASection = () => (
    <motion.section 
        className="py-20 bg-white dark:bg-gray-900"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
    >
        <motion.div className="container mx-auto px-6 text-center" variants={containerVariants}>
             <span className="text-blue-600 font-semibold bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full text-sm">Mari Berdiskusi</span>
            <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-4" variants={itemVariants}>Siap Bekerja Sama Dengan Kami?</motion.h2>
            <motion.p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mt-2 mb-8" variants={itemVariants}>
                Mari diskusikan bagaimana kami dapat membantu mengembangkan bisnis Anda dengan solusi teknologi terdepan dan strategi digital yang efektif.
            </motion.p>
            <motion.div className="flex justify-center gap-4 mb-12" variants={itemVariants}>
                <motion.a href="/contact" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity transform hover:scale-105" whileHover={{ scale: 1.05 }}>
                    Hubungi Kami Sekarang
                </motion.a>
                <motion.a href="/services" className="bg-white dark:bg-gray-800 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 font-bold px-8 py-3 rounded-lg border-2 border-blue-600 dark:border-blue-500 hover:bg-blue-50 transition-colors" whileHover={{ scale: 1.05 }}>
                    Lihat Layanan Kami
                </motion.a>
            </motion.div>
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-gray-200 dark:border-gray-700" variants={containerVariants}>
                <ContactInfo icon={<Phone className="text-blue-600 dark:text-blue-400"/>} title="Telepon" detail="+62 877 1696 7890" />
                <ContactInfo icon={<Mail className="text-purple-600 dark:text-purple-400"/>} title="Email" detail="info@example.com" />
                <ContactInfo icon={<Clock className="text-green-600 dark:text-green-400"/>} title="Jam Kerja" detail="Senin - Jumat, 09:00 - 18:00" />
            </motion.div>
        </motion.div>
    </motion.section>
);

export default CTASection;
