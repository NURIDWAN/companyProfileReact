import { PageSeo } from '@/components/PageSeo';
import { Footer } from '@/components/ui/landingPageComponent/footer';
import { CompanyNavbar } from '@/components/ui/landingPageComponent/navbar';
import { UnderConstruction } from '@/components/UnderConstruction';
import type { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import React from 'react';

// Definisikan tipe props untuk layout ini
interface LandingPageLayoutProps {
    children: React.ReactNode;
}

export default function LandingPageLayout({ children }: LandingPageLayoutProps) {
    const { siteConfigured } = usePage<SharedData>().props;

    // Jika website belum dikonfigurasi, tampilkan halaman placeholder
    // Gunakan !siteConfigured untuk menangani false dan undefined
    if (!siteConfigured) {
        return <UnderConstruction />;
    }

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
            <PageSeo />
            {/* Header akan selalu ada di atas */}
            <CompanyNavbar />

            {/* Konten utama halaman akan dirender di sini */}
            <main className="flex-grow">
                <div className="flex w-full flex-col gap-16 px-4 py-12 md:px-6 lg:px-8">{children}</div>
            </main>

            {/* Footer akan selalu ada di bawah */}
            <Footer />
        </div>
    );
}
