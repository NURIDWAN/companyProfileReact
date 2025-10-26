// src/components/Portfolio.jsx
import { ArrowRight, Globe, CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Data proyek yang sudah disesuaikan dengan gambar
const projectsData = [
  {
    image: "https://images.unsplash.com/photo-1577717903108-c0b7498c8942?q=80&w=2670&auto=format&fit=crop", // Ganti dengan URL gambar proyek asli
    category: "Aplikasi Web",
    title: "Portal Pembelajaran Online EduTech",
    description: "Platform e-learning lengkap dengan fitur video conference, quiz, dan sertifikasi digital",
    liveSite: "#", // Ganti dengan URL live site
    year: "2025",
  },
  {
    image: "https://images.unsplash.com/photo-1629424751522-d7845f34177d?q=80&w=2670&auto=format&fit=crop", // Ganti dengan URL gambar proyek asli
    category: "Aplikasi Mobile",
    title: "Aplikasi Food Delivery TasteGo",
    description: "Aplikasi food delivery multi-platform dengan real-time tracking dan payment integration",
    liveSite: "#",
    year: "2025",
  },
  {
    image: "https://images.unsplash.com/photo-1542744173-0f79c29d0f73?q=80&w=2672&auto=format&fit=crop", // Ganti dengan URL gambar proyek asli
    category: "Sistem Enterprise",
    title: "Sistem ERP Manufaktur IndustriMax",
    description: "Sistem ERP terintegrasi untuk industri manufaktur dengan modul produksi, inventori, dan keuangan",
    liveSite: "#",
    year: "2025",
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="w-full py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-950 rounded-3xl">
      <div className="container mx-auto max-w-screen-xl px-4 text-center">
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Proyek Terbaik
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
          Lihat showcase project-project unggulan yang telah kami selesaikan dengan tingkat kepuasan klien yang tinggi dan hasil yang memukau
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project, index) => (
            <Card key={index} className="flex flex-col overflow-hidden shadow-lg border transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
              <div className="relative w-full h-48 sm:h-56">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-gray-900/60 backdrop-blur-sm text-white">{project.category}</Badge>
              </div>
              <CardContent className="flex flex-col p-6 flex-grow text-left">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-gray-500 mb-4 flex-grow">{project.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Globe className="h-4 w-4 mr-1" />
                      Live Site
                    </span>
                    <span className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      {project.year}
                    </span>
                  </div>
                  <a href={project.liveSite} className="text-blue-600 dark:text-blue-400 font-semibold flex items-center group">
                    <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Tombol di bawah */}
        <div className="mt-12">
          <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
            <ArrowRight className="mr-2 h-4 w-4" /> Lihat Semua Proyek
          </Button>
        </div>
      </div>
    </section>
  );
}