import { useMemo, ComponentType } from 'react';
import { usePage } from '@inertiajs/react';
import type { BrandingInfo, SharedData } from '@/types';
import * as LucideIcons from 'lucide-react';
import AppLogoIcon from './app-logo-icon';

const iconLibrary = LucideIcons as Record<string, ComponentType<{ className?: string }>>;

export default function AppLogo() {
    const page = usePage<SharedData>();
    const branding = page.props.branding as BrandingInfo | undefined;
    const brandName = branding?.name ?? 'Harmony Strategic Group';
    const logoUrl = branding?.logo_url ?? null;

    const LogoIcon = useMemo(() => {
        const iconName = branding?.logo_icon;
        if (iconName && iconLibrary[iconName]) {
            return iconLibrary[iconName];
        }

        return undefined;
    }, [branding?.logo_icon]);

    const fallbackInitials = useMemo(() => {
        return brandName
            .split(' ')
            .filter(Boolean)
            .map((word) => word[0]?.toUpperCase())
            .slice(0, 2)
            .join('') || 'LC';
    }, [brandName]);

    return (
        <div className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center overflow-hidden rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                {logoUrl ? (
                    <img src={logoUrl} alt={brandName} className="h-full w-full object-cover" />
                ) : LogoIcon ? (
                    <LogoIcon className="size-5 text-white dark:text-black" />
                ) : (
                    <span className="text-sm font-semibold">
                        <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
                        <span className="sr-only">{fallbackInitials}</span>
                    </span>
                )}
            </div>
            <span className="text-sm font-semibold text-sidebar-primary-foreground/90 dark:text-white">
                {brandName}
            </span>
        </div>
    );
}
