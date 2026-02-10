import * as LucideIcons from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export type CounterSectionContent = {
    heading?: string;
    description?: string;
    items?: Array<{
        value?: string;
        suffix?: string;
        label?: string;
        icon?: string;
    }>;
};

interface CounterSectionProps {
    content: CounterSectionContent;
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    const duration = 2000;
                    const steps = 60;
                    const increment = target / steps;
                    let current = 0;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            setCount(target);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(current));
                        }
                    }, duration / steps);
                }
            },
            { threshold: 0.5 },
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [target, hasAnimated]);

    return (
        <span ref={ref} className="tabular-nums">
            {count.toLocaleString()}
            {suffix}
        </span>
    );
}

export function CounterSection({ content }: CounterSectionProps) {
    const { heading, description, items = [] } = content;

    if (items.length === 0) {
        return (
            <section className="mx-auto max-w-6xl px-4 py-12">
                <div className="flex h-32 items-center justify-center rounded-xl border-2 border-dashed bg-muted/30">
                    <p className="text-muted-foreground">Belum ada counter</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-gradient-to-br from-primary/5 via-transparent to-primary/5">
            <div className="mx-auto max-w-6xl px-4">
                {(heading || description) && (
                    <div className="mb-12 text-center">
                        {heading && <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">{heading}</h2>}
                        {description && <div className="prose prose-lg prose-slate mt-2 dark:prose-invert" dangerouslySetInnerHTML={{ __html: description }} />}
                    </div>
                )}

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map((item, idx) => {
                        const IconComponent = item.icon
                            ? (LucideIcons as Record<string, any>)[item.icon] ?? LucideIcons.Hash
                            : LucideIcons.Hash;
                        const numericValue = parseInt(item.value?.replace(/\D/g, '') || '0', 10);

                        return (
                            <div
                                key={idx}
                                className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md dark:bg-slate-800"
                            >
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                                    <IconComponent className="h-7 w-7 text-primary" />
                                </div>
                                <div className="text-4xl font-bold text-slate-900 dark:text-slate-50">
                                    <AnimatedCounter target={numericValue} suffix={item.suffix ?? ''} />
                                </div>
                                {item.label && <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">{item.label}</p>}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
