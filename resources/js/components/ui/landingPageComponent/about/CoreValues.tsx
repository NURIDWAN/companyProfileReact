import React from 'react';
import { Zap, Award, Users, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';

type ValueCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    bgColor: string;
    iconColor: string;
};

const ValueCard = ({ icon, title, description, bgColor, iconColor }: ValueCardProps) => (
    <motion.div 
        className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
        variants={itemVariants}
        whileHover={{ scale: 1.03 }}
    >
        <div className={`w-16 h-16 ${bgColor} dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-5`}>
            <span className={`${iconColor} dark:brightness-125`}>{icon}</span>
        </div>
        <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{title}</h4>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </motion.div>
);

const CoreValuesSection = () => (
    <motion.section 
        className="py-20 bg-white dark:bg-gray-900"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
    >
        <motion.div className="container mx-auto px-6" variants={containerVariants}>
            <motion.div className="text-center mb-12" variants={itemVariants}>
                 <span className="text-blue-600 font-semibold bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full text-sm">Nilai Kami</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-4">Fondasi Kekuatan</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-3xl mx-auto">
                    Nilai-nilai yang menjadi fondasi dalam setiap layanan dan solusi yang kami berikan untuk menciptakan partnership yang berintegritas.
                </p>
            </motion.div>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8" variants={containerVariants}>
                <ValueCard icon={<Zap size={32} />} title="Inovasi" description="Selalu menghadirkan solusi terdepan dan teknologi terbaru untuk kebutuhan klien." bgColor="bg-blue-100" iconColor="text-blue-600" />
                <ValueCard icon={<Award size={32} />} title="Kualitas" description="Berkomitmen memberikan hasil terbaik dengan standar kualitas tinggi." bgColor="bg-green-100" iconColor="text-green-600" />
                <ValueCard icon={<HeartHandshake size={32} />} title="Integritas" description="Menjalankan bisnis dengan transparan dan kejujuran adalah nilai utama." bgColor="bg-purple-100" iconColor="text-purple-600" />
                <ValueCard icon={<Users size={32} />} title="Kolaborasi" description="Membangun kemitraan jangka panjang yang saling menguntungkan." bgColor="bg-orange-100" iconColor="text-orange-600" />
            </motion.div>
        </motion.div>
    </motion.section>
);

export default CoreValuesSection;
