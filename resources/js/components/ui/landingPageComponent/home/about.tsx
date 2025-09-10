// src/components/CompanyProfile.jsx
import { Check, Clock, Shield, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function About() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left Column */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Tentang PT Digital Solusi Nusantara
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Sejak didirikan pada tahun 2015, kami telah menjadi mitra terpercaya bagi lebih dari 500 perusahaan dalam transformasi digital mereka. Tim ahli kami terdiri dari profesional berpengalaman di bidang teknologi informasi, desain, dan strategi bisnis. Kami mengkhususkan diri dalam pengembangan aplikasi web dan mobile, sistem manajemen enterprise, e-commerce, dan solusi cloud computing. Dengan pendekatan yang berfokus pada klien, kami memastikan setiap solusi yang kami berikan sesuai dengan kebutuhan spesifik dan tujuan bisnis Anda.
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Tim Profesional</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Expert berpengalaman</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Tepat Waktu</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Delivery sesuai jadwal</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Berkualitas</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Standard tinggi</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Support 24/7</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Dukungan penuh</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column (Image) */}
        <div className="relative mt-8 md:mt-0">
          <img
            src="https://picsum.photos/seed/crm/400/300" // Replace with your image path
            alt="Office Building of PT Digital Solusi Nusantara"
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}