import { Card } from "@/components/ui/card";
import { Linkedin, ArrowRight } from "lucide-react";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/utils/animations";

type TeamMember = {
    id: number;
    name: string;
    role?: string | null;
    photo?: string | null;
    linkedin?: string | null;
    bio?: string | null;
};

interface TeamShowcaseProps {
    members?: TeamMember[];
}

const FALLBACK_PHOTO =
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop";

export function TeamShowcase({ members = [] }: TeamShowcaseProps) {
    if (!members.length) {
        return null;
    }

    return (
        <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-3xl bg-gradient-to-br from-slate-50 to-white p-8 shadow-lg dark:from-slate-900 dark:to-slate-950"
        >
            <motion.div
                className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
                variants={containerVariants}
            >
                <motion.div variants={itemVariants}>
                    <span className="mb-2 inline-block rounded-full bg-purple-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-purple-600 dark:bg-purple-900/40 dark:text-purple-300">
                        Tim Manajemen
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Pemimpin Transformasi Kami</h2>
                    <p className="mt-2 max-w-lg text-sm text-slate-600 dark:text-white/70">
                        Struktur kepemimpinan lintas fungsi yang memastikan setiap program berjalan terukur dan berdampak.
                    </p>
                </motion.div>
                <motion.div variants={itemVariants}>
                    <Link
                        href="/about"
                        className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-5 py-2.5 text-sm font-medium text-purple-600 transition hover:bg-purple-50 hover:border-purple-300 dark:border-purple-800 dark:bg-transparent dark:text-purple-400 dark:hover:bg-purple-900/30"
                    >
                        Lihat profil lengkap
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </motion.div>
            </motion.div>
            <motion.div
                className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
                variants={containerVariants}
            >
                {members.map((member) => (
                    <motion.div
                        key={member.id}
                        variants={itemVariants}
                        whileHover={{ y: -4 }}
                    >
                        <Card className="h-full border border-slate-100 bg-white p-5 transition hover:border-purple-200 hover:shadow-lg dark:border-white/10 dark:bg-white/5">
                            <div className="flex items-center gap-4">
                                <img
                                    src={member.photo || FALLBACK_PHOTO}
                                    alt={member.name}
                                    className="h-14 w-14 rounded-full object-cover ring-2 ring-purple-100 dark:ring-purple-900/40"
                                    loading="lazy"
                                />
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{member.name}</p>
                                    <p className="text-xs text-slate-500 dark:text-white/60">{member.role ?? "Leadership Team"}</p>
                                </div>
                            </div>
                            {member.bio && (
                                <p className="mt-3 text-xs text-slate-600 leading-relaxed dark:text-white/70">
                                    {member.bio.length > 100 ? `${member.bio.slice(0, 97)}…` : member.bio}
                                </p>
                            )}
                            <div className="mt-3 flex items-center justify-between text-xs text-slate-400 dark:text-white/50">
                                <span>#{String(member.id).padStart(2, "0")}</span>
                                {member.linkedin ? (
                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1 font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400"
                                    >
                                        <Linkedin className="h-3.5 w-3.5" />
                                        LinkedIn
                                    </a>
                                ) : (
                                    <span className="text-slate-300 dark:text-white/30">On site</span>
                                )}
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
}
