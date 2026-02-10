import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export type GalleryContent = {
    heading?: string | null;
    description?: string | null;
    layout?: 'grid' | 'masonry' | 'carousel';
    columns?: number;
    images?: Array<{
        url?: string | null;
        caption?: string | null;
    }>;
};

export function Gallery({ content }: { content: GalleryContent }) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const images = content.images ?? [];
    const columns = content.columns ?? 3;
    const layout = content.layout ?? 'grid';

    const openLightbox = (idx: number) => setLightboxIndex(idx);
    const closeLightbox = () => setLightboxIndex(null);
    const prevImage = () => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
    const nextImage = () => setLightboxIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));

    const gridCols = columns === 2 ? 'md:grid-cols-2' : columns === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3';

    return (
        <>
            <motion.section
                className="w-full py-16"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
            >
                <motion.div className="container mx-auto max-w-screen-xl px-4" variants={containerVariants}>
                    {(content.heading || content.description) && (
                        <motion.div className="mb-12 text-center" variants={itemVariants}>
                            {content.heading && (
                                <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                                    {content.heading}
                                </h2>
                            )}
                            {content.description && (
                                <div className="prose prose-slate mx-auto max-w-2xl dark:prose-invert" dangerouslySetInnerHTML={{ __html: content.description }} />
                            )}
                        </motion.div>
                    )}

                    <motion.div className={`grid gap-4 ${gridCols}`} variants={containerVariants}>
                        {images.map((image, idx) => (
                            <motion.div
                                key={idx}
                                className="group relative cursor-pointer overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => openLightbox(idx)}
                            >
                                <img
                                    src={image.url ?? ''}
                                    alt={image.caption ?? `Gallery image ${idx + 1}`}
                                    className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    loading="lazy"
                                />
                                {image.caption && (
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                                        <p className="text-sm text-white">{image.caption}</p>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* Lightbox */}
            {lightboxIndex !== null && images[lightboxIndex] && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
                    <button
                        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                        onClick={closeLightbox}
                    >
                        <X className="h-6 w-6" />
                    </button>
                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                        onClick={prevImage}
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                        onClick={nextImage}
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                    <div className="text-center">
                        <img
                            src={images[lightboxIndex].url ?? ''}
                            alt={images[lightboxIndex].caption ?? 'Lightbox'}
                            className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain"
                        />
                        {images[lightboxIndex].caption && (
                            <p className="mt-4 text-white">{images[lightboxIndex].caption}</p>
                        )}
                        <p className="mt-2 text-sm text-white/60">
                            {lightboxIndex + 1} / {images.length}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

export default Gallery;
