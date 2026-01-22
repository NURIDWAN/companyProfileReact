import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { containerVariants, itemVariants, slideIn, scaleUp } from "@/utils/animations";

interface HeroContent {
  heading?: string | null;
  subheading?: string | null;
  primary_label?: string | null;
  primary_link?: string | null;
  secondary_label?: string | null;
  secondary_link?: string | null;
  image_url?: string | null;
}

interface HeroModernProps {
  content?: HeroContent;
}

export function HeroModern({ content }: HeroModernProps) {
  const heading = content?.heading ?? 'Selamat datang';
  const subheading = content?.subheading ?? 'Tambahkan deskripsi hero melalui dashboard.';
  const primaryLabel = content?.primary_label ?? 'Pelajari';
  const primaryLink = content?.primary_link ?? '#';
  const secondaryLabel = content?.secondary_label ?? 'Kontak';
  const secondaryLink = content?.secondary_link ?? '#';
  const imageUrl = content?.image_url ?? 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=700&h=700&fit=crop';

  return (
    <motion.section
      initial="hidden"
      animate="show"
      className="w-full overflow-hidden bg-white dark:bg-gray-900"
    >
      <motion.div
        className="container mx-auto grid max-w-6xl items-center gap-8 px-4 py-6 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:py-10 lg:px-8"
        variants={containerVariants}
      >
        {/* Kolom Teks */}
        <motion.div
          className="flex flex-col justify-center space-y-4 lg:space-y-6"
          variants={slideIn}
        >
          <motion.h1
            variants={itemVariants}
            className="max-w-xl text-3xl font-extrabold leading-snug tracking-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl"
          >
            {heading}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="max-w-lg text-base font-light text-gray-500 dark:text-gray-400 md:text-lg"
          >
            {subheading}
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            {primaryLabel && (
              <Button asChild size="lg" className="transition-transform hover:scale-105">
                <a href={primaryLink}>{primaryLabel}</a>
              </Button>
            )}
            {secondaryLabel && (
              <Button asChild size="lg" variant="outline" className="transition-transform hover:scale-105">
                <a href={secondaryLink}>{secondaryLabel}</a>
              </Button>
            )}
          </motion.div>
        </motion.div>

        {/* Kolom Gambar */}
        {imageUrl && (
          <motion.div
            className="flex items-center justify-center order-first lg:order-last lg:justify-end"
            variants={scaleUp}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-full max-w-sm lg:max-w-md aspect-[4/3] overflow-hidden rounded-2xl shadow-xl bg-gray-100 dark:bg-gray-800">
              <img
                src={imageUrl}
                alt={heading ?? "Hero image"}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  );
}

// Demo component
export default function App() {
  const [demoContent, setDemoContent] = React.useState<HeroContent>({
    heading: 'Tingkatkan Produktivitas Tim Anda',
    subheading: 'Platform kolaborasi modern yang membantu tim bekerja lebih cepat dan lebih efisien. Mulai gratis hari ini dan rasakan perbedaannya.',
    primary_label: 'Mulai Sekarang',
    primary_link: '#demo',
    secondary_label: 'Lihat Demo',
    secondary_link: '#video',
    image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=700&fit=crop'
  });

  const presets = [
    {
      name: 'Default',
      content: {
        heading: 'Tingkatkan Produktivitas Tim Anda',
        subheading: 'Platform kolaborasi modern yang membantu tim bekerja lebih cepat dan lebih efisien. Mulai gratis hari ini dan rasakan perbedaannya.',
        primary_label: 'Mulai Sekarang',
        primary_link: '#demo',
        secondary_label: 'Lihat Demo',
        secondary_link: '#video',
        image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=700&fit=crop'
      }
    },
    {
      name: 'Tech Startup',
      content: {
        heading: 'Inovasi Dimulai dari Sini',
        subheading: 'Bergabunglah dengan ribuan startup yang telah mempercayai platform kami untuk mengakselerasi pertumbuhan bisnis mereka.',
        primary_label: 'Daftar Gratis',
        primary_link: '#signup',
        secondary_label: 'Hubungi Sales',
        secondary_link: '#contact',
        image_url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=700&h=700&fit=crop'
      }
    },
    {
      name: 'E-Learning',
      content: {
        heading: 'Belajar Kapan Saja, Di Mana Saja',
        subheading: 'Akses ribuan kursus berkualitas dari instruktur terbaik. Tingkatkan skill Anda dengan pembelajaran yang fleksibel dan interaktif.',
        primary_label: 'Jelajahi Kursus',
        primary_link: '#courses',
        secondary_label: 'Coba Gratis',
        secondary_link: '#trial',
        image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&h=700&fit=crop'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroModern content={demoContent} />
      
      <div className="container mx-auto max-w-screen-xl px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Kontrol Demo</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pilih Preset:
            </label>
            <div className="flex gap-2 flex-wrap">
              {presets.map((preset) => (
                <Button
                  key={preset.name}
                  onClick={() => setDemoContent(preset.content)}
                  variant="outline"
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heading:
              </label>
              <input
                type="text"
                value={demoContent.heading || ''}
                onChange={(e) => setDemoContent({ ...demoContent, heading: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Button Label:
              </label>
              <input
                type="text"
                value={demoContent.primary_label || ''}
                onChange={(e) => setDemoContent({ ...demoContent, primary_label: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subheading:
              </label>
              <textarea
                value={demoContent.subheading || ''}
                onChange={(e) => setDemoContent({ ...demoContent, subheading: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Button Label:
              </label>
              <input
                type="text"
                value={demoContent.secondary_label || ''}
                onChange={(e) => setDemoContent({ ...demoContent, secondary_label: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL:
              </label>
              <input
                type="text"
                value={demoContent.image_url || ''}
                onChange={(e) => setDemoContent({ ...demoContent, image_url: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">✨ Fitur Motion:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Fade-in & slide up untuk konten teks</li>
              <li>• Staggered animation dengan delay bertahap</li>
              <li>• Fade-in & slide right untuk gambar</li>
              <li>• Hover scale effect pada buttons dan gambar</li>
              <li>• Smooth transitions dengan ease-out timing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
