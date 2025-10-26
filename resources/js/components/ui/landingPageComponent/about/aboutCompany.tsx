import React from 'react';
import { Briefcase, Zap, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants, slideIn, scaleUp } from '@/utils/animations';

const AboutCompany = () => (
    <motion.section 
        className="py-20 bg-white dark:bg-gray-900"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
    >
        <motion.div className="container mx-auto px-6" variants={containerVariants}>
            <motion.div className="text-center mb-12" variants={itemVariants}>
                <span className="text-blue-600 font-semibold bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full text-sm">Tentang Perusahaan</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-4">Tentang PT Digital Solusi Nusantara</h2>
            </motion.div>
            <motion.div className="grid md:grid-cols-2 gap-12 items-center" variants={containerVariants}>
                <motion.div variants={slideIn}>
                    <motion.p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed" variants={itemVariants}>
                        Sejak didirikan pada tahun 2015, kami telah menjadi mitra terpercaya bagi lebih dari 100 perusahaan dalam transformasi digital mereka. Tim ahli kami berdedikasi penuh dalam pengembangan perangkat lunak, teknologi informasi, desain, dan strategi bisnis. Kami menghadirkan solusi pengembangan aplikasi web dan seluler, desain UI/UX, e-commerce, dan solusi cloud computing.
                    </motion.p>
                    <motion.p className="text-gray-600 dark:text-gray-300 leading-relaxed" variants={itemVariants}>
                        Dengan pendekatan yang berfokus pada klien, kami memastikan setiap solusi yang kami berikan sesuai dengan kebutuhan spesifik dan tujuan bisnis Anda.
                    </motion.p>
                    <motion.div className="mt-8 grid grid-cols-2 gap-6" variants={containerVariants}>
                        <motion.div className="flex items-center" variants={itemVariants}>
                            <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-500 mr-3" />
                            <span className="font-semibold text-gray-700 dark:text-gray-200">Berpengalaman</span>
                        </motion.div>
                        <motion.div className="flex items-center" variants={itemVariants}>
                            <Zap className="w-6 h-6 text-blue-600 dark:text-blue-500 mr-3" />
                            <span className="font-semibold text-gray-700 dark:text-gray-200">Inovatif</span>
                        </motion.div>
                        <motion.div className="flex items-center" variants={itemVariants}>
                            <Users className="w-6 h-6 text-blue-600 dark:text-blue-500 mr-3" />
                            <span className="font-semibold text-gray-700 dark:text-gray-200">Tim Solid & Profesional</span>
                        </motion.div>
                        <motion.div className="flex items-center" variants={itemVariants}>
                            <Award className="w-6 h-6 text-blue-600 dark:text-blue-500 mr-3" />
                            <span className="font-semibold text-gray-700 dark:text-gray-200">Kualitas Terjamin</span>
                        </motion.div>
                    </motion.div>
                </motion.div>
                <motion.div className="relative" variants={scaleUp} whileHover={{ scale: 1.02 }}>
                    <img
                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
                        alt="Tim bekerja di kantor modern"
                        className="rounded-lg shadow-2xl w-full h-auto object-cover"
                    />
                    <motion.div 
                        className="absolute top-4 right-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm p-4 rounded-lg shadow-lg"
                        variants={itemVariants}
                    >
                        <p className="font-bold text-2xl text-blue-600">200+</p>
                        <p className="text-gray-700 dark:text-gray-300">Klien Puas</p>
                    </motion.div>
                     <motion.div 
                        className="absolute bottom-4 left-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm p-4 rounded-lg shadow-lg"
                        variants={itemVariants}
                    >
                        <p className="font-bold text-2xl text-blue-600">500+</p>
                        <p className="text-gray-700 dark:text-gray-300">Projek Selesai</p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    </motion.section>
);

export default AboutCompany;
