import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check, Star } from 'lucide-react';

export type PricingTableContent = {
    heading?: string;
    description?: string;
    plans?: Array<{
        name?: string;
        price?: string;
        period?: string;
        features?: string[];
        cta_label?: string;
        cta_link?: string;
        is_popular?: boolean;
    }>;
};

interface PricingTableProps {
    content: PricingTableContent;
}

export function PricingTable({ content }: PricingTableProps) {
    const { heading, description, plans = [] } = content;

    if (plans.length === 0) {
        return (
            <section className="mx-auto max-w-6xl px-4 py-12">
                <div className="flex h-48 items-center justify-center rounded-xl border-2 border-dashed bg-muted/30">
                    <p className="text-muted-foreground">Belum ada pricing plan</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16">
            <div className="mx-auto max-w-6xl px-4">
                {(heading || description) && (
                    <div className="mb-12 text-center">
                        {heading && <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">{heading}</h2>}
                        {description && <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-400">{description}</p>}
                    </div>
                )}

                <div
                    className={cn(
                        'grid gap-6',
                        plans.length === 1 && 'max-w-md mx-auto',
                        plans.length === 2 && 'md:grid-cols-2 max-w-3xl mx-auto',
                        plans.length >= 3 && 'md:grid-cols-2 lg:grid-cols-3',
                    )}
                >
                    {plans.map((plan, idx) => (
                        <Card
                            key={idx}
                            className={cn(
                                'relative flex flex-col transition-all hover:shadow-lg',
                                plan.is_popular && 'border-primary shadow-lg scale-[1.02] ring-2 ring-primary/20',
                            )}
                        >
                            {plan.is_popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                                        <Star className="h-3 w-3 fill-current" />
                                        Popular
                                    </span>
                                </div>
                            )}

                            <CardHeader className="pb-4 text-center">
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{plan.name || 'Plan'}</h3>
                                <div className="mt-4">
                                    <span className="text-4xl font-bold text-slate-900 dark:text-slate-50">{plan.price || 'Free'}</span>
                                    {plan.period && <span className="text-sm text-slate-500">{plan.period}</span>}
                                </div>
                            </CardHeader>

                            <CardContent className="flex-1">
                                <ul className="space-y-3">
                                    {(plan.features ?? []).map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter>
                                <Button
                                    className="w-full"
                                    variant={plan.is_popular ? 'default' : 'outline'}
                                    asChild={!!plan.cta_link}
                                >
                                    {plan.cta_link ? (
                                        <a href={plan.cta_link}>{plan.cta_label || 'Pilih Plan'}</a>
                                    ) : (
                                        <span>{plan.cta_label || 'Pilih Plan'}</span>
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
