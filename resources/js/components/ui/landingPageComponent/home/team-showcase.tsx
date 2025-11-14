import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Linkedin } from "lucide-react";
import { Link } from "@inertiajs/react";

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
        <section className="rounded-[32px] border border-slate-200 bg-white p-8 text-slate-900 shadow-xl dark:border-white/10 dark:bg-[#050B1F] dark:text-white">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-blue-600 dark:text-blue-300">Tim Manajemen</p>
                    <h2 className="text-3xl font-semibold">Pemimpin Transformasi Kami</h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
                        Struktur kepemimpinan lintas fungsi yang memastikan setiap program berjalan terukur dan berdampak.
                    </p>
                </div>
                <Button variant="outline" className="w-full md:w-auto" asChild>
                    <Link href="/about">Lihat profil lengkap</Link>
                </Button>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {members.map((member) => (
                    <Card
                        key={member.id}
                        className="border border-slate-100 bg-slate-50/80 p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={member.photo || FALLBACK_PHOTO}
                                alt={member.name}
                                className="h-16 w-16 rounded-full object-cover ring-4 ring-white dark:ring-white/10"
                                loading="lazy"
                            />
                            <div>
                                <p className="text-base font-semibold text-slate-900 dark:text-white">{member.name}</p>
                                <p className="text-xs text-slate-500 dark:text-white/60">{member.role ?? "Leadership Team"}</p>
                            </div>
                        </div>
                        {member.bio && (
                            <p className="mt-4 text-sm text-slate-600 dark:text-white/70">
                                {member.bio.length > 120 ? `${member.bio.slice(0, 117)}…` : member.bio}
                            </p>
                        )}
                        <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-white/60">
                            <span>#{String(member.id).padStart(2, "0")}</span>
                            {member.linkedin ? (
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-300"
                                >
                                    <Linkedin className="h-4 w-4" />
                                    LinkedIn
                                </a>
                            ) : (
                                <span className="font-medium text-slate-400 dark:text-white/40">On site</span>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}
