import type { PageProps } from '@inertiajs/core';
import { Link, usePage } from '@inertiajs/react';
import { ArrowUpRight, Building2, Calendar } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LandingPageLayout from '@/layouts/landingPage-layouts';

type SectionCopy = {
    badge?: string | null;
    heading?: string | null;
    description?: string | null;
};

type SectionKey = 'hero';
type SectionVisibility = Partial<Record<SectionKey, boolean>>;

interface ProjectItem {
    id: number;
    name: string;
    slug: string;
    client_name?: string | null;
    summary?: string | null;
    description?: string | null;
    cover_image?: string | null;
    started_at?: string | null;
    completed_at?: string | null;
    status?: string | null;
}

type ProjectPageProps = PageProps & {
    projects?: ProjectItem[];
    projectHero?: SectionCopy;
    sections?: SectionVisibility;
};

function ProjectCard({ project }: { project: ProjectItem }) {
    const cover = project.cover_image ?? 'https://images.unsplash.com/photo-1529429617124-aee711a70412?w=900';
    return (
        <Card className="flex h-full flex-col overflow-hidden border-none shadow-md">
            <div className="aspect-video bg-gray-100">
                <img src={cover} alt={project.name} className="h-full w-full object-cover" />
            </div>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <Badge variant="outline" className="tracking-wide uppercase">
                        {project.status ?? 'Completed'}
                    </Badge>
                    {project.client_name && <span className="text-xs text-gray-500">{project.client_name}</span>}
                </div>
                <CardTitle className="text-xl">{project.name}</CardTitle>
                <CardDescription className="line-clamp-2 text-sm text-gray-600">
                    {project.summary ?? 'Inisiatif peningkatan kinerja dengan pendekatan strategis dan terukur.'}
                </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto space-y-4 text-sm text-gray-500">
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {project.started_at ? new Date(project.started_at).getFullYear() : 'N/A'}
                    </span>
                    <span className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {project.client_name ?? 'Klien Strategis'}
                    </span>
                </div>
                <Link href={`/project/${project.slug}`} className="inline-flex items-center text-blue-600">
                    Lihat studi kasus <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
            </CardContent>
        </Card>
    );
}

export default function ProjectPage() {
    const { projects = [], projectHero, sections } = usePage<ProjectPageProps>().props;
    const visibility = sections ?? {};
    const isEnabled = (key: SectionKey) => visibility[key] ?? true;

    const [statusFilter, setStatusFilter] = useState<string>('All');
    const completedProjects = projects.filter((project) => (project.status ?? '').toLowerCase() === 'completed').length;
    const currentYear = new Date().getFullYear();

    const statuses = useMemo(() => {
        const unique = new Set(projects.map((project) => project.status ?? 'On Going'));
        return ['All', ...Array.from(unique)];
    }, [projects]);

    const filteredProjects = useMemo(() => {
        if (statusFilter === 'All') {
            return projects;
        }
        return projects.filter((project) => (project.status ?? 'On Going') === statusFilter);
    }, [projects, statusFilter]);

    const heroBadge = projectHero?.badge ?? 'Portofolio Proyek';
    const heroHeading = projectHero?.heading ?? 'Dokumentasi studi kasus lintas industri yang menyoroti strategi, implementasi, dan hasil nyata.';
    const heroDescription =
        projectHero?.description ??
        'Ikuti bagaimana kami mendampingi organisasi dalam mengakselerasi transformasi digital, efisiensi operasional, dan pengembangan layanan.';
    const heroImage = 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80';

    return (
        <LandingPageLayout>
            <div className="mx-auto max-w-7xl space-y-10 p-6">
                {isEnabled('hero') && (
                    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950 text-white shadow-2xl">
                        <img src={heroImage} alt="Project hero background" className="absolute inset-0 h-full w-full object-cover opacity-40" />
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/80 to-slate-800/40" />
                        <div className="relative z-10 flex flex-col gap-8 p-8 md:flex-row md:items-end md:justify-between">
                            <div className="max-w-2xl space-y-4">
                                <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.3em] text-emerald-300 uppercase">
                                    {heroBadge}
                                </span>
                                <h1 className="text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">{heroHeading}</h1>
                                <p className="text-base text-white/80 sm:text-lg">{heroDescription}</p>
                            </div>
                            <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/10 p-6 text-left backdrop-blur md:w-[420px]">
                                <div>
                                    <p className="text-sm text-white/70">Total proyek</p>
                                    <p className="text-3xl font-semibold">{projects.length}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-white/70">Proyek selesai</p>
                                    <p className="text-3xl font-semibold">{completedProjects}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-white/70">Status aktif</p>
                                    <p className="text-3xl font-semibold">{statuses.length - 1}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-white/70">Tahun operasi</p>
                                    <p className="text-3xl font-semibold">{currentYear}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                <div className="flex flex-wrap gap-2">
                    {statuses.map((status) => (
                        <Button
                            key={status}
                            variant={status === statusFilter ? 'default' : 'outline'}
                            onClick={() => setStatusFilter(status)}
                            size="sm"
                        >
                            {status}
                        </Button>
                    ))}
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {!filteredProjects.length && (
                    <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground">
                        Tidak ada proyek dengan status tersebut untuk saat ini.
                    </div>
                )}
            </div>
        </LandingPageLayout>
    );
}
