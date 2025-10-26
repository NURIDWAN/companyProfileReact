export interface NavLinkItem {
    label: string;
    href: string;
}

export const primaryNavLinks: NavLinkItem[] = [
    { label: "Beranda", href: "/" },
    { label: "Tentang Kami", href: "/about" },
    { label: "Layanan", href: "/service" },
    { label: "Produk", href: "/product" },
    { label: "Proyek", href: "/project" },
    { label: "Karir", href: "/career" },
    { label: "Blog", href: "/blog" },
    { label: "Kontak", href: "/contact" },
];
