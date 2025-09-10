import LandingPageLayout from '@/layouts/landingPage-layouts';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    BarChart, CircleDollarSign, Code, Handshake,
    LayoutTemplate, Layers, LifeBuoy, Rocket, Search,
    Shield, Users, Workflow, Paintbrush, Smartphone, Cloud
} from 'lucide-react';
import React from 'react';

// --- Data untuk Section ---

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

const techStack = [
    { name: "Laravel", logo: "https://cdn.worldvectorlogo.com/logos/laravel-2.svg" },
    { name: "React", logo: "https://cdn.worldvectorlogo.com/logos/react-2.svg" },
    { name: "Next.js", logo: "https://cdn.worldvectorlogo.com/logos/next-js.svg" },
    { name: "Vue.js", logo: "https://cdn.worldvectorlogo.com/logos/vue-9.svg" },
    { name: "Node.js", logo: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" },
    { name: "Tailwind CSS", logo: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg" },
    { name: "Figma", logo: "https://cdn.worldvectorlogo.com/logos/figma-1.svg" },
    { name: "Amazon Web Services", logo: "https://cdn.worldvectorlogo.com/logos/aws-logo.svg" },
];

const faqs = [
    {
        question: "Berapa lama waktu yang dibutuhkan untuk membuat sebuah proyek?",
        answer: "Waktu pengerjaan sangat bervariasi tergantung pada kompleksitas dan skala proyek. Proyek sederhana bisa memakan waktu 4-6 minggu, sementara proyek yang lebih kompleks bisa memakan waktu beberapa bulan. Kami akan memberikan estimasi waktu yang jelas setelah tahap konsultasi dan analisis awal."
    },
    {
        question: "Apakah saya bisa melihat progres pengerjaan proyek?",
        answer: "Tentu saja. Kami menerapkan proses kerja yang transparan. Anda akan mendapatkan akses ke project management tool kami untuk memantau progres, memberikan feedback, dan berkomunikasi langsung dengan tim kami di setiap tahapan."
    },
    {
        question: "Bagaimana dengan support setelah proyek selesai?",
        answer: "Kami menyediakan paket maintenance dan support berkelanjutan setelah proyek diluncurkan. Paket ini mencakup pembaruan keamanan, perbaikan bug, dan dukungan teknis untuk memastikan aplikasi Anda berjalan lancar."
    },
    {
        question: "Berapa biaya untuk layanan Anda?",
        answer: "Biaya proyek ditentukan oleh ruang lingkup, fitur, dan teknologi yang digunakan. Setelah diskusi awal untuk memahami kebutuhan Anda, kami akan memberikan penawaran harga yang transparan dan kompetitif, tanpa biaya tersembunyi."
    }
];

const processSteps = [
    {
        step: "01",
        title: "Konsultasi & Analisis",
        description: "Memformulasikan kebutuhan dan tujuan bisnis Anda secara mendalam.",
        icon: <Search className="w-8 h-8 text-blue-500" />,
    },
    {
        step: "02",
        title: "Perencanaan & Desain",
        description: "Merancang solusi yang tepat dengan arsitektur dan desain optimal.",
        icon: <LayoutTemplate className="w-8 h-8 text-purple-500" />,
    },
    {
        step: "03",
        title: "Development & Testing",
        description: "Pengembangan dengan quality assurance dan testing menyeluruh.",
        icon: <Code className="w-8 h-8 text-green-500" />,
    },
    {
        step: "04",
        title: "Deployment & Support",
        description: "Go-live dan dukungan berkelanjutan untuk kesuksesan jangka panjang.",
        icon: <Rocket className="w-8 h-8 text-orange-500" />,
    },
];

const whyChooseUsItems = [
    {
        title: "Tim Berpengalaman",
        description: "Didukung oleh tim profesional dengan pengalaman lebih dari 10 tahun di industri teknologi.",
        icon: <Users className="w-8 h-8 text-red-500" />,
    },
    {
        title: "Teknologi Terdepan",
        description: "Menggunakan framework terbaru seperti Laravel, React, Next.js untuk produk yang up-to-date.",
        icon: <Layers className="w-8 h-8 text-yellow-500" />,
    },
    {
        title: "Support 24/7",
        description: "Dukungan teknis dan maintenance berkelanjutan dengan respons time yang cepat.",
        icon: <LifeBuoy className="w-8 h-8 text-green-500" />,
    },
    {
        title: "Keamanan Terjamin",
        description: "Implementasi standar keamanan tertinggi untuk melindungi data dan aplikasi Anda.",
        icon: <Shield className="w-8 h-8 text-blue-500" />,
    },
];


// --- Komponen Section ---

// [UPDATED] Hero Section dengan background Unsplash
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

const TechStackSection = () => (
    <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Teknologi yang Kami Gunakan</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-3">Kami mengandalkan teknologi modern dan teruji untuk hasil terbaik.</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                {techStack.map((tech) => (
                     <div key={tech.name} className="flex flex-col items-center gap-2 group">
                        <img src={tech.logo} alt={tech.name} className="h-12 w-12 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 dark:invert dark:group-hover:invert-0" />
                        <span className="text-sm text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">{tech.name}</span>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const OurProcessSection = () => (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 text-sm">Metodologi Kami</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Proses Kerja Kami</h2>
                <div className="mt-4 w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {processSteps.map((item) => (
                    <Card key={item.step} className="text-center border-t-4 border-t-indigo-500">
                        <CardHeader>
                             <div className="mx-auto w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                {item.icon}
                            </div>
                            <CardTitle className="dark:text-white">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </section>
);

const WhyChooseUsSection = () => (
    <section className="py-20 text-white" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #1e1b4b 100%)' }}>
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <Badge variant="secondary" className="mb-4 text-sm bg-white/10 text-white">Keunggulan Kami</Badge>
                <h2 className="text-3xl md:text-4xl font-bold">Mengapa Memilih Kami?</h2>
                 <div className="mt-4 w-24 h-1 bg-white/50 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {whyChooseUsItems.map((item) => (
                    <Card key={item.title} className="bg-white/5 dark:bg-white/10 backdrop-blur-sm border-white/10 text-center text-white hover:-translate-y-2 transition-transform duration-300">
                        <CardHeader>
                            <div className="mx-auto w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                                {item.icon}
                            </div>
                            <CardTitle className="text-white">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-indigo-200 text-sm">{item.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </section>
);

const FaqSection = () => (
    <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
             <div className="text-center mb-12">
                <Badge variant="outline" className="mb-4 text-sm">Butuh Bantuan?</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Pertanyaan Umum</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-3 max-w-3xl mx-auto">
                    Temukan jawaban atas pertanyaan yang paling sering diajukan oleh klien kami.
                </p>
                 <div className="mt-4 w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
            </div>
            <div className="max-w-4xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index + 1}`}>
                            <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-base text-gray-600 dark:text-gray-400">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    </section>
);


// --- Komponen Halaman Utama "Services" ---

export default function ServicesPage() {
    return (
        <LandingPageLayout>
            <ServicesHeroSection />
            <OurServicesSection />
            <TechStackSection />
            <OurProcessSection />
            <WhyChooseUsSection />
            <FaqSection />
        </LandingPageLayout>
    );
}   