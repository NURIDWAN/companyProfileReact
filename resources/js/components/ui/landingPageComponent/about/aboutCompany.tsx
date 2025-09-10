import React from 'react';
import { Briefcase, Zap, Users, Award } from 'lucide-react';

const AboutCompany = () => (
    <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <span className="text-blue-600 font-semibold bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full text-sm">Tentang Perusahaan</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-4">Tentang PT Digital Solusi Nusantara</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        Sejak didirikan pada tahun 2015, kami telah menjadi mitra terpercaya bagi lebih dari 100 perusahaan dalam transformasi digital mereka. Tim ahli kami berdedikasi penuh dalam pengembangan perangkat lunak, teknologi informasi, desain, dan strategi bisnis. Kami menghadirkan solusi pengembangan aplikasi web dan seluler, desain UI/UX, e-commerce, dan solusi cloud computing.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Dengan pendekatan yang berfokus pada klien, kami memastikan setiap solusi yang kami berikan sesuai dengan kebutuhan spesifik dan tujuan bisnis Anda.
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-6">
                        <div className="flex items-center">
                            <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-500 mr-3" />
                            <span className="font-semibold text-gray-700 dark:text-gray-200">Berpengalaman</span>
                        </div>
                        <div className="flex items-center">
                            <Zap className="w-6 h-6 text-blue-600 dark:text-blue-500 mr-3" />
                            <span className="font-semibold text-gray-700 dark:text-gray-200">Inovatif</span>
                        </div>
                        <div className="flex items-center">
                            <Users className="w-6 h-6 text-blue-600 dark:text-blue-500 mr-3" />
                            <span className="font-semibold text-gray-700 dark:text-gray-200">Tim Solid & Profesional</span>
                        </div>
                        <div className="flex items-center">
                            <Award className="w-6 h-6 text-blue-600 dark:text-blue-500 mr-3" />
                            <span className="font-semibold text-gray-700 dark:text-gray-200">Kualitas Terjamin</span>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <img
                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
                        alt="Tim bekerja di kantor modern"
                        className="rounded-lg shadow-2xl w-full h-auto object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                        <p className="font-bold text-2xl text-blue-600">200+</p>
                        <p className="text-gray-700 dark:text-gray-300">Klien Puas</p>
                    </div>
                     <div className="absolute bottom-4 left-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                        <p className="font-bold text-2xl text-blue-600">500+</p>
                        <p className="text-gray-700 dark:text-gray-300">Projek Selesai</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default AboutCompany;