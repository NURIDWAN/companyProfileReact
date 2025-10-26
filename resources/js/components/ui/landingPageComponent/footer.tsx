import { Link, usePage } from '@inertiajs/react';
import { MountainIcon, Linkedin, Twitter, Instagram, Link2 } from 'lucide-react';
import { primaryNavLinks } from '@/config/navigation';
import type { FooterContent, NavigationLink, SharedData } from '@/types';

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    linkedin: Linkedin,
    twitter: Twitter,
    instagram: Instagram,
};

export function Footer() {
    const currentYear = new Date().getFullYear();
    const { footer, navigation, language } = usePage<SharedData>().props;

    const footerContent: FooterContent = footer ?? {
        company: {
            name: 'Nusantara Digital Solution',
            description: 'Menyediakan solusi inovatif untuk membantu bisnis Anda bertumbuh dan sukses di dunia digital.',
        },
        contacts: {
            email: 'halo@nusantaradigital.id',
            phone: '+62 811 1234 567',
            address: 'Jakarta, Indonesia',
        },
    };

    const navItems: NavigationLink[] = navigation?.primary?.length
        ? navigation.primary
        : primaryNavLinks.map((link, index) => ({
            key: link.href,
            href: link.href,
            labels: { id: link.label, en: link.label },
            order: index + 1,
        }));

    const companyLinks = footerContent.columns?.length
        ? footerContent.columns
        : [
            {
                title: 'Perusahaan',
                links: navItems.slice(0, 4).map((item) => ({
                    label: item.labels?.[language?.current ?? 'id'] ?? item.labels.id ?? item.key,
                    href: item.href,
                })),
            },
        ];

    const socials = Object.entries(footerContent.socials ?? {});

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block">
                            <div className="flex items-center space-x-2">
                                <MountainIcon className="h-7 w-7 text-white" />
                                <span className="text-xl font-bold text-white">{footerContent.company?.name ?? 'Perusahaan'}</span>
                            </div>
                        </Link>
                        {footerContent.company?.description && (
                            <p className="mt-4 max-w-xs text-sm text-gray-400">
                                {footerContent.company.description}
                            </p>
                        )}
                        <div className="mt-6 flex flex-wrap gap-3">
                            {socials.map(([network, url]) => {
                                const Icon = socialIcons[network.toLowerCase()] ?? Link2;
                                return (
                                    <a
                                        key={network}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-white"
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span className="sr-only">{network}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {companyLinks.map((column) => (
                        <div key={column.title}>
                            <p className="font-semibold text-white">{column.title}</p>
                            <ul className="mt-4 space-y-2 text-sm">
                                {column.links.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="hover:text-white">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div>
                        <p className="font-semibold text-white">Kontak</p>
                        <ul className="mt-4 space-y-2 text-sm">
                            {footerContent.contacts?.email && (
                                <li>
                                    <a href={`mailto:${footerContent.contacts.email}`} className="hover:text-white">
                                        {footerContent.contacts.email}
                                    </a>
                                </li>
                            )}
                            {footerContent.contacts?.phone && (
                                <li>
                                    <a href={`tel:${footerContent.contacts.phone}`} className="hover:text-white">
                                        {footerContent.contacts.phone}
                                    </a>
                                </li>
                            )}
                            {footerContent.contacts?.address && (
                                <li className="text-gray-400">{footerContent.contacts.address}</li>
                            )}
                        </ul>
                    </div>
                </div>

                {footerContent.cta && (
                    <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                        <p className="text-lg text-white">{footerContent.cta.label}</p>
                        <Link
                            href={footerContent.cta.href}
                            className="mt-3 inline-flex rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900"
                        >
                            {footerContent.cta.label}
                        </Link>
                    </div>
                )}

                <div className="mt-12 border-t border-gray-700 pt-6">
                    <div className="text-center sm:flex sm:justify-between sm:text-left">
                        <p className="text-sm text-gray-400">
                            © {currentYear} {footerContent.company?.name ?? 'Perusahaan'}. Seluruh hak cipta dilindungi.
                        </p>
                        <p className="mt-4 text-sm text-gray-400 sm:mt-0">
                            {footerContent.legal?.privacy && (
                                <Link href={footerContent.legal.privacy} className="hover:text-white">
                                    Kebijakan Privasi
                                </Link>
                            )}
                            {footerContent.legal?.terms && (
                                <>
                                    <span className="mx-2 text-gray-600">|</span>
                                    <Link href={footerContent.legal.terms} className="hover:text-white">
                                        Ketentuan Layanan
                                    </Link>
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
