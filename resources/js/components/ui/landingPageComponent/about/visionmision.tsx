import React from 'react';
import { Eye, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';

const VisionMissionSection = () => (
    <motion.section 
        className="py-20 bg-gray-50 dark:bg-gray-800"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
    >
        <motion.div className="container mx-auto px-6" variants={containerVariants}>
            <motion.div className="text-center mb-12" variants={itemVariants}>
                <span className="text-blue-600 font-semibold bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full text-sm">Visi & Misi</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-4">Panduan Langkah Kami</h2>
            </motion.div>
            <motion.div className="grid md:grid-cols-2 gap-8" variants={containerVariants}>
                <motion.div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 text-center" variants={itemVariants}>
                    <div className="bg-blue-100 dark:bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Eye className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Visi Kami</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Menjadi perusahaan teknologi terdepan di Indonesia yang memberikan solusi digital inovatif dan berkelanjutan.
                    </p>
                </motion.div>
                <motion.div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 text-center" variants={itemVariants}>
                    <div className="bg-blue-100 dark:bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Misi Kami</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Membantu perusahaan dalam transformasi digital melalui teknologi terdepan, layanan berkualitas tinggi, dan partnership jangka panjang yang saling menguntungkan.
                    </p>
                </motion.div>
            </motion.div>
        </motion.div>
    </motion.section>
);

export default VisionMissionSection;
