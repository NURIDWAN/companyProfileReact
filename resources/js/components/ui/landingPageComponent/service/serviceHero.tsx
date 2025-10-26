import { Button } from '@/components/ui/button';
import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';

const ServicesHeroSection = () => {
    const heroBackgroundImage = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop";

    return (
        <section
            className="relative py-32 bg-cover bg-center text-white"
            style={{ backgroundImage: `url(${heroBackgroundImage})` }}
        >
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <motion.div 
                className="relative container mx-auto px-6 text-center"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                <motion.h1 
                    className="text-4xl md:text-6xl font-bold leading-tight"
                    variants={itemVariants}
                >
                    Solusi Digital Inovatif untuk <span className="text-indigo-400">Masa Depan Bisnis Anda</span>
                </motion.h1>
                <motion.p 
                    className="text-lg md:text-xl text-gray-200 mt-6 max-w-3xl mx-auto"
                    variants={itemVariants}
                >
                    Kami membantu bisnis bertransformasi secara digital dengan layanan pengembangan web, aplikasi mobile, dan desain UI/UX kelas dunia.
                </motion.p>
                <motion.div 
                    className="mt-8 flex justify-center gap-4"
                    variants={itemVariants}
                >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">Lihat Layanan Kami</Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button size="lg" variant="secondary">Hubungi Kami</Button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default ServicesHeroSection;