import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, Layers, Paintbrush, Smartphone } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';

const services = [
    {
        title: 'Konsultasi Strategi & Operasi',
        description: 'Menyelaraskan tujuan bisnis, proses, dan indikator kinerja agar organisasi siap bertumbuh.',
        icon: <Layers className="w-8 h-8 text-indigo-500" />,
    },
    {
        title: 'Pengalaman Pelanggan',
        description: 'Merancang perjalanan pelanggan, kanal layanan, serta standar pelayanan yang konsisten.',
        icon: <Smartphone className="w-8 h-8 text-indigo-500" />,
    },
    {
        title: 'Pengembangan Talenta & Perubahan',
        description: 'Mendukung transformasi budaya melalui program pelatihan, coaching, dan manajemen perubahan.',
        icon: <Paintbrush className="w-8 h-8 text-indigo-500" />,
    },
    {
        title: 'Digital & Data Enablement',
        description: 'Memanfaatkan teknologi dan data untuk mempercepat pengambilan keputusan di setiap lini bisnis.',
        icon: <Cloud className="w-8 h-8 text-indigo-500" />,
    },
];

const OurServicesSection = () => (
    <motion.section 
        className="py-20 bg-slate-50 dark:bg-slate-900"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
    >
        <motion.div className="container mx-auto px-6" variants={containerVariants}>
            <motion.div className="text-center mb-16" variants={itemVariants}>
                <Badge variant="outline" className="mb-4 text-sm">Layanan Kami</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Apa yang Kami Tawarkan</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-3 max-w-3xl mx-auto">
                    Solusi menyeluruh yang dapat disesuaikan dengan kebutuhan perusahaan di berbagai sektor industri.
                </p>
                <div className="mt-4 w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
            </motion.div>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" variants={containerVariants}>
                {services.map((service) => (
                    <motion.div key={service.title} variants={itemVariants} whileHover={{ y: -8 }}>
                        <Card className="text-center hover:shadow-lg transition-transform duration-300">
                            <CardHeader>
                                <div className="mx-auto w-16 h-16 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center mb-4">
                                    {service.icon}
                                </div>
                                <CardTitle className="dark:text-white">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    </motion.section>
);

export default OurServicesSection; 
