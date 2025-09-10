import { Button } from '@/components/ui/button';
import React from 'react';

const ServicesHeroSection = () => {
    const heroBackgroundImage = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop";

    return (
        <section
            className="relative py-32 bg-cover bg-center text-white"
            style={{ backgroundImage: `url(${heroBackgroundImage})` }}
        >
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative container mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Solusi Digital Inovatif untuk <span className="text-indigo-400">Masa Depan Bisnis Anda</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mt-6 max-w-3xl mx-auto">
                    Kami membantu bisnis bertransformasi secara digital dengan layanan pengembangan web, aplikasi mobile, dan desain UI/UX kelas dunia.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">Lihat Layanan Kami</Button>
                    <Button size="lg" variant="secondary">Hubungi Kami</Button>
                </div>
            </div>
        </section>
    );
};

export default ServicesHeroSection;