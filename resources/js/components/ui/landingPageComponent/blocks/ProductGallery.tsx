import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';
import { useState } from 'react';
import { X } from 'lucide-react';

export type ProductGalleryContent = {
    heading?: string | null;
    description?: string | null;
    images?: Array<{
        url?: string | null;
        caption?: string | null;
    }>;
    columns?: number;
};

export function ProductGallery({ content }: { content: ProductGalleryContent }) {
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);
    const images = content.images ?? [];
    const columns = content.columns ?? 3;

    return (
        <>
            <motion.section
                className="w-full rounded-3xl bg-gray-50 py-16 dark:bg-gray-900"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.div className="container mx-auto max-w-screen-xl px-4" variants={containerVariants}>
                    <motion.div className="mb-12 text-center" variants={itemVariants}>
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                            {content.heading ?? 'Galeri Produk'}
                        </h2>
                        {content.description && (
                            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">{content.description}</p>
                        )}
                    </motion.div>

                    <motion.div
                        className={`grid gap-4 ${columns === 2 ? 'md:grid-cols-2' : columns === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'}`}
                        variants={containerVariants}
                    >
                        {images.map((image, idx) => (
                            <motion.div
                                key={idx}
                                className="group relative cursor-pointer overflow-hidden rounded-xl"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => image.url && setLightboxImage(image.url)}
                            >
                                <img
                                    src={image.url ?? ''}
                                    alt={image.caption ?? `Image ${idx + 1}`}
                                    className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                {image.caption && (
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                        <p className="text-sm text-white">{image.caption}</p>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* Lightbox */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                    onClick={() => setLightboxImage(null)}
                >
                    <button
                        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                        onClick={() => setLightboxImage(null)}
                    >
                        <X className="h-6 w-6" />
                    </button>
                    <img
                        src={lightboxImage}
                        alt="Lightbox"
                        className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
                    />
                </div>
            )}
        </>
    );
}

export default ProductGallery;
