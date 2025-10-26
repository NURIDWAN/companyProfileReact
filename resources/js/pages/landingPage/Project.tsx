import { useMemo, useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import type { PageProps } from '@inertiajs/core';
import { Calendar, Building2, ArrowUpRight, Layers } from 'lucide-react';

import LandingPageLayout from '@/layouts/landingPage-layouts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
                    <Badge variant="outline" className="uppercase tracking-wide">
                        {project.status ?? 'Completed'}
                    </Badge>
                    {project.client_name && (
                        <span className="text-xs text-gray-500">{project.client_name}</span>
                    )}
                </div>
                <CardTitle className="text-xl">{project.name}</CardTitle>
                <CardDescription className="text-sm text-gray-600 line-clamp-2">
                    {project.summary ?? 'Transformasi digital dengan pendekatan strategis dan terukur.'}
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
    const { projects = [] } = usePage<ProjectPageProps>().props;
    const [statusFilter, setStatusFilter] = useState<string>('All');

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

    return (
        <LandingPageLayout>
            <div className="mx-auto max-w-7xl space-y-10 p-6">
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">Portofolio Proyek</h1>
                    <p className="mx-auto max-w-3xl text-lg text-gray-600">
                        Lihat berbagai proyek yang telah kami kerjakan di sektor publik maupun enterprise. Setiap proyek menunjukkan komitmen kami
                        terhadap kualitas dan inovasi.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="p-6 text-center">
                        <Layers className="mx-auto mb-3 h-8 w-8 text-blue-600" />
                        <p className="text-3xl font-bold text-gray-900">{projects.length}</p>
                        <p className="text-sm text-gray-500">Total Proyek</p>
                    </Card>
                    <Card className="p-6 text-center">
                        <Building2 className="mx-auto mb-3 h-8 w-8 text-green-600" />
                        <p className="text-3xl font-bold text-gray-900">
                            {projects.filter((project) => (project.status ?? '').toLowerCase() === 'completed').length}
                        </p>
                        <p className="text-sm text-gray-500">Proyek Selesai</p>
                    </Card>
                    <Card className="p-6 text-center">
                        <Calendar className="mx-auto mb-3 h-8 w-8 text-purple-600" />
                        <p className="text-3xl font-bold text-gray-900">{new Date().getFullYear()}</p>
                        <p className="text-sm text-gray-500">Tahun Operasi</p>
                    </Card>
                </div>

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
