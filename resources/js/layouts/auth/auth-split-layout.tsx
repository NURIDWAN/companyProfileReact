import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { name, quote } = usePage<SharedData>().props;
    const headingTitle = title ?? name;
    const portalLabel = headingTitle?.toLowerCase().includes('console')
        ? headingTitle
        : `${headingTitle ?? 'Portal'} Console`;
    const descriptionText = description ?? 'Portal internal untuk tim inti Anda.';

    return (
        <div className="flex min-h-dvh flex-col lg:flex-row">
            <div className="relative flex flex-1 flex-col overflow-hidden bg-[#050505] px-10 py-8 text-white">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_transparent_55%)]" />
                <div
                    className="pointer-events-none absolute inset-0 opacity-45"
                    style={{
                        backgroundImage:
                            'linear-gradient(120deg, rgba(15,23,42,0.8), rgba(15,118,110,0.5)), url(https://images.unsplash.com/photo-1487611459768-bd414656ea10?q=80&w=1600&auto=format&fit=crop)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        mixBlendMode: 'screen',
                    }}
                />
                <div className="relative flex items-center gap-3 text-lg font-semibold">
                    <AppLogoIcon className="size-8 fill-current text-white" />
                    {name}
                </div>
                {quote ? (
                    <div className="relative mt-auto max-w-md text-sm text-neutral-200">
                        <p className="text-lg">&ldquo;{quote.message}&rdquo;</p>
                        <p className="mt-3 text-xs uppercase tracking-[0.3em] text-neutral-400">{quote.author}</p>
                    </div>
                ) : (
                    <div className="relative mt-auto text-sm text-neutral-200">
                        <p>
                            &ldquo;People find pleasure in different ways. I find it in keeping my mind clear.&rdquo;
                        </p>
                        <p className="mt-3 text-xs uppercase tracking-[0.3em] text-neutral-400">Marcus Aurelius</p>
                    </div>
                )}
            </div>
            <div className="flex w-full flex-1 items-center justify-center bg-[#f7f7f5] px-6 py-10 sm:px-10 lg:px-16">
                <div className="w-full max-w-lg space-y-6">
                    <div className="space-y-1 text-left">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">{portalLabel}</p>
                        <h1 className="text-2xl font-semibold text-slate-900">{headingTitle}</h1>
                        <p className="text-sm text-muted-foreground">{descriptionText}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
