import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

export type FeatureCardsContent = {
    heading?: string;
    description?: string;
    columns?: number;
    items?: Array<{
        icon?: string;
        title?: string;
        description?: string;
        link?: string;
    }>;
};

interface FeatureCardsProps {
    content: FeatureCardsContent;
}

export function FeatureCards({ content }: FeatureCardsProps) {
    const { heading, description, columns = 3, items = [] } = content;

    if (items.length === 0) {
        return (
            <section className="mx-auto max-w-6xl px-4 py-12">
                <div className="flex h-48 items-center justify-center rounded-xl border-2 border-dashed bg-muted/30">
                    <p className="text-muted-foreground">Belum ada feature cards</p>
                </div>
            </section>
        );
    }

    const gridCols = {
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-2 lg:grid-cols-3',
        4: 'md:grid-cols-2 lg:grid-cols-4',
    }[columns] ?? 'md:grid-cols-2 lg:grid-cols-3';

    return (
        <section className="py-16">
            <div className="mx-auto max-w-6xl px-4">
                {(heading || description) && (
                    <div className="mb-12 text-center">
                        {heading && <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">{heading}</h2>}
                        {description && <div className="prose prose-lg prose-slate mx-auto mt-3 max-w-2xl dark:prose-invert" dangerouslySetInnerHTML={{ __html: description }} />}
                    </div>
                )}

                <div className={cn('grid gap-6', gridCols)}>
                    {items.map((item, idx) => {
                        const IconComponent = item.icon
                            ? (LucideIcons as Record<string, any>)[item.icon] ?? LucideIcons.Zap
                            : LucideIcons.Zap;

                        const CardContent = (
                            <div
                                className={cn(
                                    'group flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm transition-all dark:bg-slate-800',
                                    item.link && 'hover:shadow-lg hover:-translate-y-1 cursor-pointer',
                                )}
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                                    <IconComponent className="h-6 w-6 text-primary" />
                                </div>
                                {item.title && (
                                    <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-50">{item.title}</h3>
                                )}
                                {item.description && (
                                    <p className="flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.description}</p>
                                )}
                            </div>
                        );

                        return item.link ? (
                            <a key={idx} href={item.link} className="block">
                                {CardContent}
                            </a>
                        ) : (
                            <div key={idx}>{CardContent}</div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
