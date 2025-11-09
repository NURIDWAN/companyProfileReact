import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/utils/animations";
import { serviceIconRegistry, defaultServiceIcon } from "@/lib/service-icons";

type ServiceCard = {
    id: number;
    title: string;
    icon?: string | null;
    excerpt?: string | null;
    description?: string | null;
};

type ServicesProps = {
    services?: ServiceCard[];
};

export function Services({ services = [] }: ServicesProps) {
    const hasData = services.length > 0;

    return (
        <motion.section
            id="services"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="w-full rounded-3xl bg-white py-12 sm:py-16 lg:py-20 dark:bg-gray-950"
        >
            <motion.div
                className="container mx-auto max-w-screen-xl px-4 text-center"
                variants={containerVariants}
            >
                <motion.h2
                    variants={itemVariants}
                    className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl"
                >
                    Layanan Unggulan
                </motion.h2>
                <motion.p
                    variants={itemVariants}
                    className="mx-auto mb-12 max-w-2xl text-lg text-gray-500 dark:text-gray-400"
                >
                    Temukan layanan yang kami siapkan untuk mendukung pertumbuhan perusahaan, meningkatkan efisiensi, dan menghadirkan pengalaman pelanggan yang unggul.
                </motion.p>

                {hasData ? (
                    <motion.div
                        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
                        variants={containerVariants}
                    >
                        {services.map((service) => (
                            <motion.div
                                key={service.id}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                className="h-full"
                            >
                                <Card className="flex h-full flex-col overflow-hidden border-none shadow-lg">
                                    <CardContent className="flex flex-col p-6">
                                        {(() => {
                                            const Icon =
                                                (service.icon && serviceIconRegistry[service.icon]) || defaultServiceIcon;
                                            return (
                                                <div className="mb-3 inline-flex rounded-2xl bg-indigo-50/80 p-3 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-200">
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                            );
                                        })()}
                                        <h3 className="mb-2 text-left text-xl font-bold">{service.title}</h3>
                                        {service.description ? (
                                            <div
                                                className="richtext-view text-left text-sm text-gray-500 dark:text-gray-400"
                                                dangerouslySetInnerHTML={{ __html: service.description }}
                                            />
                                        ) : (
                                            <p className="text-left text-sm text-gray-500 dark:text-gray-400">
                                                {service.excerpt ?? "Detail layanan akan segera tersedia."}
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        variants={itemVariants}
                        className="rounded-lg border border-dashed p-8 text-sm text-muted-foreground"
                    >
                        Belum ada layanan yang dipublikasikan. Tambahkan layanan melalui halaman admin.
                    </motion.div>
                )}
            </motion.div>
        </motion.section>
    );
}
