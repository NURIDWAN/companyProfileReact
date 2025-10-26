import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavGroup, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Briefcase, Cog, Cpu, FileText, Folder, LayoutGrid, MessageSquare, Package, Settings2, Users } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavGroups: NavGroup[] = [
    {
        title: 'Dashboard',
        items: [
            {
                title: 'Overview',
                href: '/dashboard',
                icon: LayoutGrid,
            },
        ],
    },
    {
        title: 'Konten CMS',
        items: [
            {
                title: 'Layanan',
                href: '/admin/services',
                icon: Cog,
            },
            {
                title: 'Produk',
                href: '/admin/products',
                icon: Package,
            },
            {
                title: 'Proyek',
                href: '/admin/projects',
                icon: Folder,
            },
            {
                title: 'Karir',
                href: '/admin/job-positions',
                icon: Briefcase,
            },
            {
                title: 'Blog',
                href: '/admin/blog-posts',
                icon: FileText,
            },
            {
                title: 'Testimoni',
                href: '/admin/testimonials',
                icon: MessageSquare,
            },
            {
                title: 'Tim',
                href: '/admin/team-members',
                icon: Users,
            },
            {
                title: 'Setting Konten',
                href: '/admin/settings',
                icon: Settings2,
            },
            {
                title: 'Landing Page',
                href: '/admin/landing',
                icon: LayoutGrid,
            },
        ],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain groups={mainNavGroups} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
