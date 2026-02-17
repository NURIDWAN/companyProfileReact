import type { BrandingInfo, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Settings, Wrench } from 'lucide-react';

/**
 * Full page placeholder component shown when website navigation is not configured.
 * Displays a friendly "under construction" message to visitors.
 */
export function UnderConstruction() {
    const { branding } = usePage<SharedData>().props;

    const brandProps = branding as BrandingInfo | undefined;
    const brandName = brandProps?.name ?? 'Website';
    const brandLogo = brandProps?.logo_url ?? null;

    const initials = brandName
        .split(' ')
        .map((word) => word.charAt(0))
        .filter(Boolean)
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
            {/* Logo/Brand */}
            <div className="mb-8">
                {brandLogo ? (
                    <img src={brandLogo} alt={brandName} className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-lg" />
                ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-2xl font-bold text-white shadow-lg">
                        {initials || 'WS'}
                    </div>
                )}
            </div>

            {/* Brand Name */}
            <h1 className="mb-2 text-center text-2xl font-bold text-slate-800 sm:text-3xl">{brandName}</h1>

            {/* Icon Animation */}
            <div className="relative mt-6 mb-8">
                <div className="flex items-center justify-center gap-4">
                    <div className="animate-bounce rounded-full bg-amber-100 p-4">
                        <Wrench className="h-8 w-8 text-amber-600" />
                    </div>
                    <div className="animate-pulse rounded-full bg-blue-100 p-4" style={{ animationDelay: '150ms' }}>
                        <Settings className="h-8 w-8 text-blue-600" />
                    </div>
                </div>
            </div>

            {/* Main Message */}
            <div className="max-w-md text-center">
                <h2 className="mb-3 text-xl font-semibold text-slate-700 sm:text-2xl">Website Sedang Dalam Pengaturan</h2>
                <p className="text-base text-slate-500 sm:text-lg">
                    Kami sedang menyiapkan sesuatu yang menarik untuk Anda. Silakan kembali lagi nanti.
                </p>
            </div>

            {/* Decorative Elements */}
            <div className="mt-12 flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" style={{ animationDelay: '0ms' }}></span>
                <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" style={{ animationDelay: '150ms' }}></span>
                <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600" style={{ animationDelay: '300ms' }}></span>
            </div>

            {/* Footer */}
            <div className="absolute bottom-6 text-center text-sm text-slate-400">
                &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
            </div>
        </div>
    );
}

export default UnderConstruction;
