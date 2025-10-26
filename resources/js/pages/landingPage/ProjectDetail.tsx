import { usePage, Link } from '@inertiajs/react';
import type { PageProps } from '@inertiajs/core';
import { Calendar, Building2, ArrowLeft } from 'lucide-react';

import LandingPageLayout from '@/layouts/landingPage-layouts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProjectItem {
    id: number;
    name: string;
    slug: string;
    client_name?: string | null;
    cover_image?: string | null;
    summary?: string | null;
    description?: string | null;
    started_at?: string | null;
    completed_at?: string | null;
    status?: string | null;
}

type ProjectDetailProps = PageProps & {
    project: ProjectItem;
    recentProjects?: ProjectItem[];
};

export default function ProjectDetailPage() {
    const { project, recentProjects = [] } = usePage<ProjectDetailProps>().props;
    const cover = project.cover_image ?? 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1200';

    return (
        <LandingPageLayout>
            <div className="mx-auto max-w-5xl space-y-10 p-6">
                <Link href="/project" className="inline-flex items-center text-sm text-blue-600">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke daftar proyek
                </Link>

                <div className="space-y-4">
                    <Badge variant="outline" className="uppercase tracking-wide">
                        {project.status ?? 'Completed'}
                    </Badge>
                    <h1 className="text-4xl font-bold text-gray-900">{project.name}</h1>
                    <p className="text-lg text-gray-600">{project.summary ?? 'Transformasi digital dengan pendekatan strategis dan terukur.'}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        {project.client_name && (
                            <span className="flex items-center gap-2">
                                <Building2 className="h-4 w-4" /> {project.client_name}
                            </span>
                        )}
                        <span className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {project.started_at ? new Date(project.started_at).toLocaleDateString('id-ID') : 'Mulai segera'}
                        </span>
                        {project.completed_at && (
                            <span className="text-gray-500">
                                Selesai {new Date(project.completed_at).toLocaleDateString('id-ID')}
                            </span>
                        )}
                    </div>
                </div>

                <img src={cover} alt={project.name} className="w-full rounded-2xl object-cover shadow-lg" />

                <Card>
                    <CardHeader>
                        <CardTitle>Ringkasan Proyek</CardTitle>
                        <CardDescription>Tujuan, lingkup, dan luaran yang berhasil dicapai.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-600 leading-relaxed">
                        <p>
                            {project.description ??
                                'Implementasi platform digital terintegrasi dengan fokus pada peningkatan efisiensi operasional dan pengalaman pelanggan.'}
                        </p>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-lg border p-4">
                                <p className="text-xs uppercase text-gray-400">Periode</p>
                                <p className="font-semibold text-gray-900">
                                    {project.started_at ? new Date(project.started_at).toLocaleDateString('id-ID') : 'N/A'}
                                    {project.completed_at ? ` - ${new Date(project.completed_at).toLocaleDateString('id-ID')}` : ''}
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <p className="text-xs uppercase text-gray-400">Status</p>
                                <p className="font-semibold text-gray-900">{project.status ?? 'In Progress'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {recentProjects.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm uppercase text-blue-600">Proyek Lainnya</p>
                                <h2 className="text-2xl font-semibold text-gray-900">Studi kasus terbaru</h2>
                            </div>
                            <Link href="/project" className="text-sm font-semibold text-blue-600">
                                Lihat semua
                            </Link>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            {recentProjects.map((recent) => (
                                <Card key={recent.id} className="border-none shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="text-lg">
                                            <Link href={`/project/${recent.slug}`} className="hover:text-blue-600">
                                                {recent.name}
                                            </Link>
                                        </CardTitle>
                                        <CardDescription className="line-clamp-2 text-sm text-gray-600">
                                            {recent.summary ?? 'Transformasi end-to-end untuk mendukung pertumbuhan bisnis klien.'}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </LandingPageLayout>
    );
}
