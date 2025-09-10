import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, Layers, Paintbrush, Smartphone } from 'lucide-react';
import React from 'react';

const services = [
    {
        title: "Web Development",
        description: "Membangun aplikasi web modern, cepat, dan aman yang disesuaikan dengan kebutuhan bisnis Anda.",
        icon: <Layers className="w-8 h-8 text-indigo-500" />
    },
    {
        title: "Mobile App Development",
        description: "Membuat aplikasi mobile (iOS & Android) yang intuitif dan berperforma tinggi untuk menjangkau pengguna Anda.",
        icon: <Smartphone className="w-8 h-8 text-indigo-500" />
    },
    {
        title: "UI/UX Design",
        description: "Merancang antarmuka yang menarik dan pengalaman pengguna yang mulus untuk meningkatkan engagement.",
        icon: <Paintbrush className="w-8 h-8 text-indigo-500" />
    },
    {
        title: "Cloud Solutions",
        description: "Infrastruktur cloud yang scalable dan efisien untuk mendukung pertumbuhan aplikasi Anda dengan AWS atau GCP.",
        icon: <Cloud className="w-8 h-8 text-indigo-500" />
    }
];

const OurServicesSection = () => (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 text-sm">Layanan Kami</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Apa yang Kami Tawarkan</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-3 max-w-3xl mx-auto">
                    Solusi lengkap untuk memenuhi semua kebutuhan digital dan teknologi perusahaan Anda.
                </p>
                <div className="mt-4 w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service) => (
                    <Card key={service.title} className="text-center hover:shadow-lg hover:-translate-y-2 transition-transform duration-300">
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
                ))}
            </div>
        </div>
    </section>
);

export default OurServicesSection;  