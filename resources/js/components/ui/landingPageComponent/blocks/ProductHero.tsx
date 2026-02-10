import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export type ProductHeroContent = {
    heading?: string | null;
    description?: string | null;
    image?: string | null;
    primary_label?: string | null;
    primary_link?: string | null;
    secondary_label?: string | null;
    secondary_link?: string | null;
};

export function ProductHero({ content }: { content: ProductHeroContent }) {
    return (
        <motion.section
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 py-20 text-white"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
        >
            <motion.div className="container mx-auto grid max-w-screen-xl gap-12 px-4 lg:grid-cols-2" variants={containerVariants}>
                <motion.div className="flex flex-col justify-center" variants={itemVariants}>
                    <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                        {content.heading ?? 'Produk Unggulan Kami'}
                    </h1>
                    {content.description && (
                        <div className="prose prose-lg mx-auto mb-8 max-w-2xl prose-invert" dangerouslySetInnerHTML={{ __html: content.description }} />
                    )}
                    <div className="flex flex-wrap gap-4">
                        {content.primary_label && content.primary_link && (
                            <Button size="lg" className="rounded-full bg-white text-orange-600 hover:bg-white/90" asChild>
                                <Link href={content.primary_link}>{content.primary_label}</Link>
                            </Button>
                        )}
                        {content.secondary_label && content.secondary_link && (
                            <Button size="lg" variant="outline" className="rounded-full border-white text-white hover:bg-white/10" asChild>
                                <Link href={content.secondary_link}>{content.secondary_label}</Link>
                            </Button>
                        )}
                    </div>
                </motion.div>
                {content.image && (
                    <motion.div className="flex items-center justify-center" variants={itemVariants}>
                        <img
                            src={content.image}
                            alt={content.heading ?? 'Product'}
                            className="max-h-[400px] w-full rounded-2xl object-cover shadow-2xl"
                        />
                    </motion.div>
                )}
            </motion.div>
        </motion.section>
    );
}

export default ProductHero;
