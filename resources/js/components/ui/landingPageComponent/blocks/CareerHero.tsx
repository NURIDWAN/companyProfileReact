import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export type CareerHeroContent = {
    heading?: string | null;
    description?: string | null;
    image?: string | null;
    primary_label?: string | null;
    primary_link?: string | null;
};

export function CareerHero({ content }: { content: CareerHeroContent }) {
    return (
        <motion.section
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 py-20 text-white"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
        >
            <motion.div className="container mx-auto grid max-w-screen-xl gap-12 px-4 lg:grid-cols-2" variants={containerVariants}>
                <motion.div className="flex flex-col justify-center" variants={itemVariants}>
                    <span className="mb-4 inline-block w-fit rounded-full bg-white/20 px-4 py-1 text-sm font-medium">
                        Bergabung Bersama Kami
                    </span>
                    <h1 className="mb-6 text-4xl font-bold md:text-5xl">
                        {content.heading ?? 'Bangun Karir Impianmu'}
                    </h1>
                    <p className="mb-8 text-lg text-white/90">
                        {content.description ?? 'Jadilah bagian dari tim yang inovatif dan berkembang bersama kami.'}
                    </p>
                    {content.primary_label && content.primary_link && (
                        <Button size="lg" className="w-fit rounded-full bg-white text-teal-600 hover:bg-white/90" asChild>
                            <Link href={content.primary_link}>{content.primary_label}</Link>
                        </Button>
                    )}
                </motion.div>
                {content.image && (
                    <motion.div className="flex items-center justify-center" variants={itemVariants}>
                        <img
                            src={content.image}
                            alt="Career"
                            className="max-h-[400px] w-full rounded-2xl object-cover shadow-2xl"
                        />
                    </motion.div>
                )}
            </motion.div>
        </motion.section>
    );
}

export default CareerHero;
