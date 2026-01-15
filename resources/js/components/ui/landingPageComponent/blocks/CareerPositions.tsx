import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Briefcase, MapPin, Clock } from 'lucide-react';

export type CareerPositionsContent = {
    heading?: string | null;
    description?: string | null;
    positions?: Array<{
        title?: string | null;
        department?: string | null;
        location?: string | null;
        type?: string | null;
        link?: string | null;
    }>;
};

export function CareerPositions({ content }: { content: CareerPositionsContent }) {
    const positions = content.positions ?? [];

    return (
        <motion.section
            className="w-full rounded-3xl bg-gray-50 py-16 dark:bg-gray-900"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
        >
            <motion.div className="container mx-auto max-w-screen-xl px-4" variants={containerVariants}>
                <motion.div className="mb-12 text-center" variants={itemVariants}>
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                        {content.heading ?? 'Posisi Tersedia'}
                    </h2>
                    {content.description && (
                        <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">{content.description}</p>
                    )}
                </motion.div>

                <motion.div className="space-y-4" variants={containerVariants}>
                    {positions.length === 0 ? (
                        <motion.div
                            className="rounded-xl border-2 border-dashed border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800"
                            variants={itemVariants}
                        >
                            <Briefcase className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Belum ada posisi tersedia</h3>
                            <p className="mt-2 text-gray-500">Silakan cek kembali nanti atau kirimkan CV Anda.</p>
                        </motion.div>
                    ) : (
                        positions.map((position, idx) => (
                            <motion.div
                                key={idx}
                                className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between"
                                variants={itemVariants}
                            >
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{position.title}</h3>
                                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                                        {position.department && (
                                            <span className="flex items-center gap-1">
                                                <Briefcase className="h-4 w-4" /> {position.department}
                                            </span>
                                        )}
                                        {position.location && (
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" /> {position.location}
                                            </span>
                                        )}
                                        {position.type && (
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" /> {position.type}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {position.link && (
                                    <Button asChild className="shrink-0">
                                        <Link href={position.link}>Lihat Detail</Link>
                                    </Button>
                                )}
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </motion.div>
        </motion.section>
    );
}

export default CareerPositions;
