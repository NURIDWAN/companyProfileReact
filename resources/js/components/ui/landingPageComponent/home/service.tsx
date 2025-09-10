// src/components/Services.jsx
import { Check, ArrowRight, LayoutDashboard } from "lucide-react"; // Import ikon yang diperlukan
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Data layanan yang sudah disesuaikan dengan gambar
const serviceData = [
  {
    image: "https://picsum.photos/seed/crm/400/300", // Ganti dengan URL gambar asli
    title: 'Pengembangan Aplikasi Web',
    description: 'Membangun aplikasi web modern dan responsif dengan teknologi terdepan',
    features: [
      'Kami menyediakan layanan pengembangan aplikasi...',
    ],
  },
  {
    image: "https://picsum.photos/400/300", // Ganti dengan URL gambar asli
    title: 'Aplikasi Mobile (iOS & Android)',
    description: 'Pengembangan aplikasi mobile native dan cross-platform untuk iOS dan Android',
    features: [
      'Kembangkan aplikasi mobile yang powerful...',
    ],
  },
  {
    image: "https://picsum.photos/seed/400/300", // Ganti dengan URL gambar asli
    title: 'Sistem Manajemen Enterprise (ERP)',
    description: 'Solusi ERP terintegrasi untuk mengoptimalkan operasional bisnis Anda',
    features: [
      'Tingkatkan efisiensi operasional perusahan...',
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="w-full py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto max-w-screen-xl px-4 text-center">
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Layanan Unggulan
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
          Kami menyediakan berbagai layanan teknologi profesional yang dirancang khusus untuk memenuhi kebutuhan dan mengakselerasi pertumbuhan bisnis Anda
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {serviceData.map((service, index) => (
            <Card key={index} className="flex flex-col overflow-hidden shadow-lg border-none transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
              <div className="relative w-full h-48 sm:h-56">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="flex flex-col p-6 flex-grow">
                <h3 className="text-xl font-bold text-left mb-2">{service.title}</h3>
                <p className="text-sm text-gray-500 text-left mb-4">{service.description}</p>
                
                <ul className="list-none space-y-2 text-left mb-4">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto"> {/* Menggunakan mt-auto untuk mendorong tombol ke bawah */}
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-2 rounded-lg transition duration-300">
                    Pelajari Lebih Lanjut <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Tombol di bawah */}
        <div className="mt-12">
          <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
            <LayoutDashboard className="mr-2 h-4 w-4" /> Lihat Semua Layanan
          </Button>
        </div>
      </div>
    </section>
  );
}   