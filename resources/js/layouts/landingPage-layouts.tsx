import { Footer } from '@/components/ui/landingPageComponent/footer';
import { CompanyNavbar } from '@/components/ui/landingPageComponent/navbar';
import React from 'react';

// Definisikan tipe props untuk layout ini
interface LandingPageLayoutProps {
    children: React.ReactNode;
}

export default function LandingPageLayout({ children }: LandingPageLayoutProps) {
    return (
        <div className="flex  min-h-screen flex-col bg-gray-50">
            {/* Header akan selalu ada di atas */}
            <CompanyNavbar />

            {/* Konten utama halaman akan dirender di sini */}
            <main className="flex-grow">{children}</main>

            {/* Footer akan selalu ada di bawah */}
            <Footer />
        </div>
    );
}
