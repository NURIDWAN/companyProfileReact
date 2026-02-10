import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

export type SliderCarouselContent = {
    heading?: string;
    description?: string;
    autoplay?: boolean;
    interval?: number;
    showDots?: boolean;
    showArrows?: boolean;
    slides?: Array<{
        image?: string;
        title?: string;
        description?: string;
        link?: string;
    }>;
};

interface SliderCarouselProps {
    content: SliderCarouselContent;
}

export function SliderCarousel({ content }: SliderCarouselProps) {
    const { heading, description, autoplay = true, interval = 5000, showDots = true, showArrows = true, slides = [] } = content;
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const goToPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    useEffect(() => {
        if (!autoplay || slides.length <= 1) return;
        const timer = setInterval(goToNext, interval);
        return () => clearInterval(timer);
    }, [autoplay, interval, slides.length, goToNext]);

    if (slides.length === 0) {
        return (
            <section className="mx-auto max-w-6xl px-4 py-12">
                <div className="flex h-64 items-center justify-center rounded-xl border-2 border-dashed bg-muted/30">
                    <p className="text-muted-foreground">Belum ada slide</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12">
            <div className="mx-auto max-w-6xl px-4">
                {(heading || description) && (
                    <div className="mb-8 text-center">
                        {heading && <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">{heading}</h2>}
                        {description && <div className="prose prose-lg prose-slate mt-2 dark:prose-invert" dangerouslySetInnerHTML={{ __html: description }} />}
                    </div>
                )}

                <div className="relative overflow-hidden rounded-2xl">
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {slides.map((slide, idx) => (
                            <div key={idx} className="relative min-w-full">
                                {slide.link ? (
                                    <a href={slide.link} className="block">
                                        <SlideContent slide={slide} />
                                    </a>
                                ) : (
                                    <SlideContent slide={slide} />
                                )}
                            </div>
                        ))}
                    </div>

                    {showArrows && slides.length > 1 && (
                        <>
                            <Button
                                variant="outline"
                                size="icon"
                                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/90 hover:bg-white"
                                onClick={goToPrev}
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/90 hover:bg-white"
                                onClick={goToNext}
                            >
                                <ChevronRight className="h-5 w-5" />
                            </Button>
                        </>
                    )}
                </div>

                {showDots && slides.length > 1 && (
                    <div className="mt-4 flex justify-center gap-2">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={cn(
                                    'h-2.5 w-2.5 rounded-full transition-all',
                                    idx === currentIndex ? 'w-8 bg-primary' : 'bg-slate-300 hover:bg-slate-400',
                                )}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

function SlideContent({ slide }: { slide: { image?: string; title?: string; description?: string; link?: string } }) {
    return (
        <div className="relative aspect-[16/7] w-full">
            {slide.image ? (
                <img src={slide.image} alt={slide.title || 'Slide'} className="h-full w-full object-cover" />
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
                    <span className="text-slate-500">No Image</span>
                </div>
            )}
            {(slide.title || slide.description) && (
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-8">
                    <div className="text-white">
                        {slide.title && <h3 className="text-2xl font-bold">{slide.title}</h3>}
                        {slide.description && <p className="mt-2 max-w-xl text-white/90">{slide.description}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}
