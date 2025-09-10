import { Button } from '@/components/ui/button'; // Asumsi menggunakan shadcn/ui
import { Image } from 'lucide-react';

export function HeroModern() {
  return (
    <section className="w-full bg-white dark:bg-gray-900">
      <div className="container mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl xl:text-6xl">
            Inovasi Digital untuk Mendorong Pertumbuhan Bisnis Anda
          </h1>
          <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
            Kami mengubah tantangan menjadi peluang melalui solusi teknologi yang cerdas dan strategi yang terbukti berhasil. Mari bangun masa depan bersama.
          </p>
          <div className="flex space-x-4">
            <Button size="lg">
              Mulai Konsultasi
              <svg
                className="ml-2 -mr-1 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Button>
            <Button size="lg" variant="outline">
              Pelajari Layanan
            </Button>
          </div>
        </div>
        <div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
          <img
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
            alt="Tim sedang berdiskusi di kantor modern"
            width={700}
            height={700}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}