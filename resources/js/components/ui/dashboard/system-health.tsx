import { ShieldCheck, MonitorSmartphone, LineChart, Database } from 'lucide-react';

const links = [
    { href: '/admin/settings', label: 'Pengaturan Global', icon: ShieldCheck },
    { href: '/admin/products', label: 'Kelola Produk', icon: MonitorSmartphone },
    { href: '/admin/projects', label: 'Kelola Proyek', icon: LineChart },
    { href: '/admin/services', label: 'Kelola Layanan', icon: Database },
];

export function SystemHealth() {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-6 rounded-xl border border-dashed border-muted-foreground/40 p-10 text-center text-muted-foreground">
            <div className="space-y-3 max-w-xl">
                <h2 className="text-2xl font-semibold text-foreground">Dashboard Sistem belum tersedia</h2>
                <p className="text-sm">
                    Belum ada data pemantauan performa atau infrastruktur yang terintegrasi. Gunakan tautan berikut untuk mengelola modul terkait secara manual.
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
