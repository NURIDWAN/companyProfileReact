import { useId } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import {
    ArrowDownRight,
    ArrowUpRight,
    BriefcaseBusiness,
    CalendarClock,
    Layers,
    Megaphone,
    MessageCircle,
    PackageSearch,
    Sparkles,
    Target,
    TrendingUp,
    UsersRound,
    type LucideIcon,
} from 'lucide-react';

type DashboardProps = {
    metrics: {
        services: number;
        products: number;
        projects: number;
        testimonials: number;
        team_members: number;
        job_positions: number;
    };
    latestProducts: Array<{ id: number; name: string; created_at: string }>;
    latestProjects: Array<{ id: number; name: string; status: string }>;
    latestPosts: Array<{ id: number; title: string; published_at: string | null }>;
    activity: Array<{ label: string; products: number; projects: number }>;
    monthlyProducts: Array<{ label: string; value: number }>;
    monthlyServices: Array<{ label: string; value: number }>;
    monthlyProjects: Array<{ label: string; value: number }>;
};

type TrendInfo = {
    current: number;
    previous: number;
    delta: number;
    percent: number;
    direction: 'up' | 'down' | 'flat';
};

type MetricCardProps = {
    label: string;
    value: number;
    description: string;
    icon: LucideIcon;
    iconClassName: string;
    accentClassName: string;
    trend: TrendInfo | null;
    data?: Array<{ label: string; value: number }>;
    stroke?: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { metrics, latestProducts, latestProjects, latestPosts, activity, monthlyProducts, monthlyServices, monthlyProjects } =
        usePage<DashboardProps>().props;

    const todayLabel = new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date());

    const highlight: Array<{ label: string; value: number; description: string; icon: LucideIcon }> = [
        {
            label: 'Konten Aktif',
            value: metrics.services + metrics.products + metrics.projects,
            description: 'Gabungan layanan, produk, dan proyek aktif.',
            icon: Sparkles,
        },
        {
            label: 'Kekuatan Tim',
            value: metrics.team_members,
            description: `${formatNumber(metrics.testimonials)} testimoni pelanggan aktif.`,
            icon: UsersRound,
        },
        {
            label: 'Lowongan Terbuka',
            value: metrics.job_positions,
            description: 'Peran yang masih menunggu kandidat terbaik.',
            icon: Megaphone,
        },
    ];

    const quickLinks: Array<{ href: string; label: string; icon: LucideIcon; description: string }> = [
        { href: '/admin/services', label: 'Kelola Layanan', icon: Layers, description: 'Atur paket dan detail layanan terbaru.' },
        { href: '/admin/products', label: 'Kelola Produk', icon: PackageSearch, description: 'Perbarui katalog produk digital Anda.' },
        { href: '/admin/projects', label: 'Kelola Proyek', icon: BriefcaseBusiness, description: 'Pantau status dan progres proyek.' },
        { href: '/admin/team-members', label: 'Kelola Tim', icon: UsersRound, description: 'Perkuat profil anggota tim inti.' },
        { href: '/admin/testimonials', label: 'Kelola Testimoni', icon: MessageCircle, description: 'Kurasi feedback terbaik dari klien.' },
        { href: '/admin/job-positions', label: 'Kelola Lowongan', icon: Megaphone, description: 'Temukan talenta baru untuk tim Anda.' },
    ];

    const trendByKey = {
        services: computeTrend(monthlyServices),
        products: computeTrend(monthlyProducts),
        projects: computeTrend(monthlyProjects),
    };

    const metricCardsData: MetricCardProps[] = [
        {
            label: 'Layanan',
            value: metrics.services,
            description: 'Penawaran layanan aktif.',
            icon: Layers,
            iconClassName: 'bg-sky-500/15 text-sky-500',
            accentClassName: 'from-sky-500/60 via-sky-500/20 to-transparent',
            trend: trendByKey.services,
            data: monthlyServices,
            stroke: '#0ea5e9',
        },
        {
            label: 'Produk',
            value: metrics.products,
            description: 'Produk digital tersedia.',
            icon: PackageSearch,
            iconClassName: 'bg-indigo-500/15 text-indigo-500',
            accentClassName: 'from-indigo-500/60 via-indigo-500/20 to-transparent',
            trend: trendByKey.products,
            data: monthlyProducts,
            stroke: '#6366f1',
        },
        {
            label: 'Proyek',
            value: metrics.projects,
            description: 'Proyek yang dikelola.',
            icon: BriefcaseBusiness,
            iconClassName: 'bg-amber-500/15 text-amber-500',
            accentClassName: 'from-amber-500/60 via-amber-500/20 to-transparent',
            trend: trendByKey.projects,
            data: monthlyProjects,
            stroke: '#f59e0b',
        },
        {
            label: 'Testimoni',
            value: metrics.testimonials,
            description: 'Feedback klien aktif.',
            icon: MessageCircle,
            iconClassName: 'bg-pink-500/15 text-pink-500',
            accentClassName: 'from-pink-500/60 via-pink-500/20 to-transparent',
            trend: null,
        },
        {
            label: 'Tim',
            value: metrics.team_members,
            description: 'Anggota tim inti.',
            icon: UsersRound,
            iconClassName: 'bg-emerald-500/15 text-emerald-500',
            accentClassName: 'from-emerald-500/60 via-emerald-500/20 to-transparent',
            trend: null,
        },
        {
            label: 'Lowongan',
            value: metrics.job_positions,
            description: 'Posisi yang tersedia.',
            icon: Megaphone,
            iconClassName: 'bg-rose-500/15 text-rose-500',
            accentClassName: 'from-rose-500/60 via-rose-500/20 to-transparent',
            trend: null,
        },
    ];

    const mergedMonthly = mergeMonthlySeries(monthlyProducts, monthlyServices, monthlyProjects);
    const lastMonthlyLabel = mergedMonthly.length ? mergedMonthly[mergedMonthly.length - 1].label : '-';
    const lastProductValue = monthlyProducts.length ? monthlyProducts[monthlyProducts.length - 1].value : 0;
    const lastServiceValue = monthlyServices.length ? monthlyServices[monthlyServices.length - 1].value : 0;
    const lastProjectValue = monthlyProjects.length ? monthlyProjects[monthlyProjects.length - 1].value : 0;

    const totalProductsActivity = activity.reduce((sum, item) => sum + item.products, 0);
    const totalProjectsActivity = activity.reduce((sum, item) => sum + item.projects, 0);
    const busiestActivity = activity.reduce(
        (acc, item) => {
            const total = item.products + item.projects;
            if (total > acc.total) {
                return { label: item.label, total };
            }

            return acc;
        },
        { label: '-', total: 0 }
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="space-y-6 rounded-xl p-4 lg:p-6">
                <section className="grid gap-4 xl:grid-cols-[2fr,1fr]">
                    <div className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-slate-950 text-white shadow-lg dark:border-slate-800">
                        <div className="absolute left-[-10%] top-[-25%] h-72 w-72 rounded-full bg-sky-500/25 blur-3xl" />
                        <div className="absolute right-[-20%] top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
                        <div className="relative flex h-full flex-col gap-8 p-8">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                                <div className="space-y-3">
                                    <Badge variant="secondary" className="w-fit bg-white/10 text-white hover:bg-white/20">
                                        Diperbarui {todayLabel}
                                    </Badge>
                                    <h1 className="text-3xl font-semibold tracking-tight">Dashboard Bisnis</h1>
                                    <p className="max-w-2xl text-sm text-white/70">
                                        Pantau progres layanan, produk, dan proyek dalam satu layar. Data yang terkurasi membantu Anda mengambil keputusan lebih cepat dan tepat.
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-white/80 shadow-lg backdrop-blur">
                                    <p className="text-xs uppercase tracking-[0.24em] text-white/60">Total Aset</p>
                                    <p className="mt-2 text-2xl font-semibold text-white">
                                        {formatNumber(metrics.services + metrics.products + metrics.projects)} aset
                                    </p>
                                    <p className="mt-1 text-xs text-white/60">Menggabungkan layanan, produk, dan proyek aktif.</p>
                                </div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-3">
                                {highlight.map((item) => (
                                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-xl bg-white/10 p-2 text-white">
                                                <item.icon className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-xs uppercase tracking-wide text-white/60">{item.label}</p>
                                                <p className="text-lg font-semibold text-white">{formatNumber(item.value)}</p>
                                            </div>
                                        </div>
                                        <p className="mt-3 text-xs text-white/60">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Card className="h-full border-dashed border-muted-foreground/40">
                        <CardHeader className="pb-3">
                            <CardTitle>Tindakan Cepat</CardTitle>
                            <p className="text-sm text-muted-foreground">Akses modul yang sering digunakan tim Anda.</p>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {quickLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="group flex items-start gap-4 rounded-xl border border-transparent bg-muted/40 px-4 py-3 transition hover:border-primary/40 hover:bg-primary/5"
                                >
                                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                        <link.icon className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-1 flex-col">
                                        <span className="font-medium text-foreground">{link.label}</span>
                                        <span className="text-xs text-muted-foreground">{link.description}</span>
                                    </div>
                                    <ArrowUpRight className="mt-1 h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
                                </a>
                            ))}
                        </CardContent>
                    </Card>
                </section>

                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {metricCardsData.map((item) => (
                        <MetricCard key={item.label} {...item} />
                    ))}
                </section>

                <section className="grid gap-4 lg:grid-cols-3">
                    <Card className="overflow-hidden">
                        <CardHeader className="flex flex-row items-center gap-3 pb-2">
                            <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-500">
                                <PackageSearch className="h-4 w-4" />
                            </div>
                            <div className="space-y-1">
                                <CardTitle>Produk Terbaru</CardTitle>
                                <p className="text-sm text-muted-foreground">Produk digital yang baru saja dirilis.</p>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3 pb-6">
                            {latestProducts.length === 0 ? (
                                <p className="text-sm text-muted-foreground">Belum ada produk yang ditambahkan.</p>
                            ) : (
                                <ul className="space-y-3">
                                    {latestProducts.map((product) => (
                                        <li
                                            key={product.id}
                                            className="flex items-center justify-between gap-3 rounded-xl border border-transparent bg-muted/30 px-4 py-3 transition hover:border-primary/40 hover:bg-primary/5"
                                        >
                                            <div>
                                                <p className="font-medium text-foreground">{product.name}</p>
                                                <p className="text-xs text-muted-foreground">Ditambahkan {formatDate(product.created_at)}</p>
                                            </div>
                                            <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20">
                                                Baru
                                            </Badge>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden">
                        <CardHeader className="flex flex-row items-center gap-3 pb-2">
                            <div className="rounded-lg bg-amber-500/10 p-2 text-amber-500">
                                <BriefcaseBusiness className="h-4 w-4" />
                            </div>
                            <div className="space-y-1">
                                <CardTitle>Proyek Terbaru</CardTitle>
                                <p className="text-sm text-muted-foreground">Pantau progres proyek terbaru Anda.</p>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3 pb-6">
                            {latestProjects.length === 0 ? (
                                <p className="text-sm text-muted-foreground">Belum ada proyek baru.</p>
                            ) : (
                                <ul className="space-y-3">
                                    {latestProjects.map((project) => (
                                        <li
                                            key={project.id}
                                            className="flex items-center justify-between gap-3 rounded-xl border border-transparent bg-muted/30 px-4 py-3 transition hover:border-primary/40 hover:bg-primary/5"
                                        >
                                            <div>
                                                <p className="font-medium text-foreground">{project.name}</p>
                                                <p className="text-xs text-muted-foreground">Status terbaru proyek</p>
                                            </div>
                                            <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                                {project.status}
                                            </Badge>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden">
                        <CardHeader className="flex flex-row items-center gap-3 pb-2">
                            <div className="rounded-lg bg-sky-500/10 p-2 text-sky-500">
                                <CalendarClock className="h-4 w-4" />
                            </div>
                            <div className="space-y-1">
                                <CardTitle>Artikel Terbaru</CardTitle>
                                <p className="text-sm text-muted-foreground">Publikasi konten dan artikel perusahaan.</p>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3 pb-6">
                            {latestPosts.length === 0 ? (
                                <p className="text-sm text-muted-foreground">Belum ada artikel yang dipublikasikan.</p>
                            ) : (
                                <ul className="space-y-3">
                                    {latestPosts.map((post) => (
                                        <li
                                            key={post.id}
                                            className="flex items-center justify-between gap-3 rounded-xl border border-transparent bg-muted/30 px-4 py-3 transition hover:border-primary/40 hover:bg-primary/5"
                                        >
                                            <div className="max-w-[70%]">
                                                <p className="font-medium text-foreground line-clamp-2">{post.title}</p>
                                                <p className="text-xs text-muted-foreground">Dipublikasikan {formatDate(post.published_at)}</p>
                                            </div>
                                            <Badge
                                                variant={post.published_at ? 'secondary' : 'outline'}
                                                className={cn(
                                                    'whitespace-nowrap',
                                                    post.published_at ? 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 dark:text-emerald-400' : 'border-dashed'
                                                )}
                                            >
                                                {post.published_at ? 'Live' : 'Draft'}
                                            </Badge>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                </section>

                <Card>
                    <CardHeader className="pb-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-4 w-4 text-primary" />
                                    Performa Bulanan
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">Perbandingan jumlah produk, layanan, dan proyek sepanjang tahun.</p>
                            </div>
                            <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">
                                Periode {lastMonthlyLabel}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="h-[320px] w-full">
                            {mergedMonthly.length === 0 ? (
                                <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-muted-foreground/40">
                                    <p className="text-sm text-muted-foreground">Data bulanan belum tersedia.</p>
                                </div>
                            ) : (
                                <ResponsiveContainer>
                                    <AreaChart data={mergedMonthly}>
                                        <defs>
                                            <linearGradient id="colorProducts" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorServices" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35} />
                                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                        <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
                                        <Tooltip />
                                        <Legend />
                                        <Area type="monotone" dataKey="products" name="Produk" stroke="#6366f1" fill="url(#colorProducts)" strokeWidth={2} />
                                        <Area type="monotone" dataKey="services" name="Layanan" stroke="#10b981" fill="url(#colorServices)" strokeWidth={2} />
                                        <Area type="monotone" dataKey="projects" name="Proyek" stroke="#f59e0b" fill="url(#colorProjects)" strokeWidth={2} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3">
                            {[
                                { label: 'Produk', value: lastProductValue, trend: trendByKey.products },
                                { label: 'Layanan', value: lastServiceValue, trend: trendByKey.services },
                                { label: 'Proyek', value: lastProjectValue, trend: trendByKey.projects },
                            ].map((item) => (
                                <div key={item.label} className="rounded-xl border border-dashed border-muted-foreground/40 px-4 py-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{item.label}</span>
                                        <TrendBadge trend={item.trend} />
                                    </div>
                                    <p className="mt-2 text-lg font-semibold text-foreground">{formatNumber(item.value)}</p>
                                    <p className="text-xs text-muted-foreground">Periode {lastMonthlyLabel}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-primary" />
                                    Aktivitas 6 Minggu Terakhir
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">Volume konten yang ditambahkan setiap pekan.</p>
                            </div>
                            <Badge variant="outline" className="border-muted-foreground/20 bg-muted/40 text-muted-foreground">
                                {activity.length ? activity[activity.length - 1].label : 'Tidak ada data'}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="h-[300px] w-full">
                            {activity.length === 0 ? (
                                <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-muted-foreground/40">
                                    <p className="text-sm text-muted-foreground">Belum ada aktivitas dalam 6 minggu terakhir.</p>
                                </div>
                            ) : (
                                <ResponsiveContainer>
                                    <BarChart data={activity}>
                                        <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                        <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
                                        <Tooltip cursor={{ fill: 'rgba(148, 163, 184, 0.12)' }} />
                                        <Legend />
                                        <Bar dataKey="products" name="Produk" fill="#6366f1" radius={[8, 8, 0, 0]} />
                                        <Bar dataKey="projects" name="Proyek" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                        <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border border-dashed border-muted-foreground/40 px-4 py-3">
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Total Produk</p>
                                <p className="mt-1 text-lg font-semibold text-foreground">{formatNumber(totalProductsActivity)}</p>
                            </div>
                            <div className="rounded-xl border border-dashed border-muted-foreground/40 px-4 py-3">
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Total Proyek</p>
                                <p className="mt-1 text-lg font-semibold text-foreground">{formatNumber(totalProjectsActivity)}</p>
                            </div>
                            <div className="rounded-xl border border-dashed border-muted-foreground/40 px-4 py-3">
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Puncak Aktivitas</p>
                                {busiestActivity.label !== '-' ? (
                                    <>
                                        <p className="mt-1 text-sm font-medium text-foreground">{busiestActivity.label}</p>
                                        <p className="text-xs text-muted-foreground">Total {formatNumber(busiestActivity.total)} entri</p>
                                    </>
                                ) : (
                                    <p className="mt-1 text-sm text-muted-foreground">Data belum tersedia</p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

function MetricCard({ label, value, description, icon: Icon, iconClassName, accentClassName, trend, data, stroke }: MetricCardProps) {
    const gradientId = useId();

    return (
        <Card className="relative overflow-hidden">
            <div className={cn('pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r', accentClassName)} />
            <CardHeader className="flex flex-row items-start justify-between pb-0">
                <div>
                    <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
                    <p className="mt-3 text-3xl font-semibold text-foreground">{formatNumber(value)}</p>
                </div>
                <div className={cn('rounded-lg p-2', iconClassName)}>
                    <Icon className="h-4 w-4" />
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-6 pt-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{description}</span>
                    <TrendBadge trend={trend} />
                </div>
                {data && data.length > 1 && stroke && (
                    <div className="h-16 w-full">
                        <ResponsiveContainer>
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={stroke} stopOpacity={0.35} />
                                        <stop offset="95%" stopColor={stroke} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="value" stroke={stroke} strokeWidth={2} fill={`url(#${gradientId})`} isAnimationActive={false} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function TrendBadge({ trend }: { trend: TrendInfo | null }) {
    if (!trend) {
        return <span className="text-xs text-muted-foreground">Stabil</span>;
    }

    if (trend.previous === 0 && trend.current > 0) {
        return (
            <Badge
                variant="outline"
                title="Pertama kali tercatat"
                className="border-transparent bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            >
                <Sparkles className="h-3.5 w-3.5" />
                Baru
            </Badge>
        );
    }

    if (trend.direction === 'flat') {
        return (
            <Badge variant="outline" className="border-transparent bg-muted/60 text-muted-foreground">
                Stabil
            </Badge>
        );
    }

    const Icon = trend.direction === 'up' ? ArrowUpRight : ArrowDownRight;

    return (
        <Badge
            variant="outline"
            title="Dibanding periode sebelumnya"
            className={cn(
                'border-transparent px-2 py-0 text-xs font-medium',
                trend.direction === 'up' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-500 dark:text-rose-400'
            )}
        >
            <Icon className="h-3.5 w-3.5" />
            {`${trend.delta > 0 ? '+' : ''}${trend.delta}`}
            <span className="ml-1 hidden sm:inline">vs bulan lalu</span>
        </Badge>
    );
}

function computeTrend(data: Array<{ value: number }>): TrendInfo | null {
    if (!data || data.length === 0) {
        return null;
    }

    const current = data[data.length - 1]?.value ?? 0;
    const previous = data.length > 1 ? data[data.length - 2]?.value ?? 0 : 0;
    const delta = current - previous;
    const direction: TrendInfo['direction'] = delta === 0 ? 'flat' : delta > 0 ? 'up' : 'down';
    const percent = previous === 0 ? (current === 0 ? 0 : 100) : Math.round((delta / previous) * 100);

    return {
        current,
        previous,
        delta,
        percent,
        direction,
    };
}

function mergeMonthlySeries(
    products: Array<{ label: string; value: number }>,
    services: Array<{ label: string; value: number }>,
    projects: Array<{ label: string; value: number }>
) {
    const map = new Map<
        string,
        {
            label: string;
            products: number;
            services: number;
            projects: number;
        }
    >();
    const order: string[] = [];

    const upsert = (label: string) => {
        if (!map.has(label)) {
            map.set(label, { label, products: 0, services: 0, projects: 0 });
            order.push(label);
        }

        return map.get(label)!;
    };

    for (const item of products) {
        const entry = upsert(item.label);
        entry.products = item.value;
    }

    for (const item of services) {
        const entry = upsert(item.label);
        entry.services = item.value;
    }

    for (const item of projects) {
        const entry = upsert(item.label);
        entry.projects = item.value;
    }

    return order.map((label) => map.get(label)!);
}

function formatNumber(value: number): string {
    if (!Number.isFinite(value)) {
        return '0';
    }

    return new Intl.NumberFormat('id-ID').format(value);
}

function formatDate(value: string | null): string {
    if (!value) {
        return 'Draft';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return '-';
    }

    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
    }).format(date);
}
