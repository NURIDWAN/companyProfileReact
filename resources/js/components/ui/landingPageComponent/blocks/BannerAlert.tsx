import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import { useState } from 'react';

export type BannerAlertContent = {
    banner_type?: 'info' | 'success' | 'warning' | 'error';
    title?: string;
    content?: string;
    closable?: boolean;
    cta_label?: string;
    cta_link?: string;
};

interface BannerAlertProps {
    content: BannerAlertContent;
}

const bannerStyles = {
    info: {
        bg: 'bg-blue-50 dark:bg-blue-950/30',
        border: 'border-blue-200 dark:border-blue-800',
        icon: Info,
        iconColor: 'text-blue-500',
        titleColor: 'text-blue-900 dark:text-blue-100',
        textColor: 'text-blue-700 dark:text-blue-300',
    },
    success: {
        bg: 'bg-green-50 dark:bg-green-950/30',
        border: 'border-green-200 dark:border-green-800',
        icon: CheckCircle,
        iconColor: 'text-green-500',
        titleColor: 'text-green-900 dark:text-green-100',
        textColor: 'text-green-700 dark:text-green-300',
    },
    warning: {
        bg: 'bg-yellow-50 dark:bg-yellow-950/30',
        border: 'border-yellow-200 dark:border-yellow-800',
        icon: AlertCircle,
        iconColor: 'text-yellow-500',
        titleColor: 'text-yellow-900 dark:text-yellow-100',
        textColor: 'text-yellow-700 dark:text-yellow-300',
    },
    error: {
        bg: 'bg-red-50 dark:bg-red-950/30',
        border: 'border-red-200 dark:border-red-800',
        icon: XCircle,
        iconColor: 'text-red-500',
        titleColor: 'text-red-900 dark:text-red-100',
        textColor: 'text-red-700 dark:text-red-300',
    },
};

export function BannerAlert({ content }: BannerAlertProps) {
    const { banner_type = 'info', title, content: textContent, closable = false, cta_label, cta_link } = content;
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    const styles = bannerStyles[banner_type] ?? bannerStyles.info;
    const IconComponent = styles.icon;

    return (
        <section className="py-4">
            <div className="mx-auto max-w-6xl px-4">
                <div className={cn('relative rounded-xl border p-4', styles.bg, styles.border)}>
                    <div className="flex items-start gap-3">
                        <IconComponent className={cn('mt-0.5 h-5 w-5 shrink-0', styles.iconColor)} />
                        <div className="flex-1 space-y-1">
                            {title && <h4 className={cn('font-semibold', styles.titleColor)}>{title}</h4>}
                            {textContent && <p className={cn('text-sm', styles.textColor)}>{textContent}</p>}
                            {cta_label && cta_link && (
                                <div className="pt-2">
                                    <Button size="sm" variant="outline" asChild>
                                        <a href={cta_link}>{cta_label}</a>
                                    </Button>
                                </div>
                            )}
                        </div>
                        {closable && (
                            <button
                                onClick={() => setIsVisible(false)}
                                className={cn('shrink-0 rounded p-1 transition-colors hover:bg-black/5', styles.textColor)}
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
