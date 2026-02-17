import { BriefcaseBusiness, Layers, MessageCircle, PackageSearch, UsersRound } from 'lucide-react';

const links = [
    { href: '/admin/services', label: 'Kelola Layanan', icon: Layers },
    { href: '/admin/products', label: 'Kelola Produk', icon: PackageSearch },
    { href: '/admin/projects', label: 'Kelola Proyek', icon: BriefcaseBusiness },
    { href: '/admin/team-members', label: 'Kelola Tim', icon: UsersRound },
    { href: '/admin/testimonials', label: 'Kelola Testimoni', icon: MessageCircle },
];

export function ContentPerformance() {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-6 rounded-xl border border-dashed border-muted-foreground/40 p-10 text-center text-muted-foreground">
            <div className="space-y-3 max-w-xl">
                <h2 className="text-2xl font-semibold text-foreground">Dashboard Konten belum dikonfigurasi</h2>
                <p className="text-sm">
                    Saat ini, tidak ada integrasi analitik yang ditampilkan di dashboard konten. Gunakan modul di bawah ini untuk mengelola data secara manual atau tambahkan integrasi sesuai kebutuhan Anda.
                </p>
            </div>
            <div className="grid w-full max-w-2xl gap-3 md:grid-cols-2">
                {links.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-3 rounded-lg border border-dashed border-muted-foreground/30 px-4 py-3 text-left text-sm text-muted-foreground transition hover:border-primary hover:text-primary"
                    >
                        <link.icon className="h-4 w-4" />
                        <span>{link.label}</span>
                    </a>
                ))}
            </div>
        </div>
    );
}
