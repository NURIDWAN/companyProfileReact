import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { type NavGroup } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function NavMain({ groups = [] }: { groups: NavGroup[] }) {
    const page = usePage();
    const { state } = useSidebar();
    const isCollapsed = state === 'collapsed';

    return (
        <>
            {groups.map((group) => (
                <SidebarGroup key={group.title} className="px-2 py-0">
                    <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                    <SidebarMenu>
                        {group.items.map((item) => (
                            <NavMenuItem key={item.title} item={item} currentUrl={page.url} isCollapsed={isCollapsed} />
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </>
    );
}

interface NavMenuItemProps {
    item: {
        title: string;
        href: string;
        icon?: React.ComponentType<{ className?: string }> | null;
        children?: Array<{
            title: string;
            href: string;
            icon?: React.ComponentType<{ className?: string }> | null;
        }>;
    };
    currentUrl: string;
    isCollapsed: boolean;
}

function NavMenuItem({ item, currentUrl, isCollapsed }: NavMenuItemProps) {
    const [isHovered, setIsHovered] = useState(false);
    const hasChildren = item.children && item.children.length > 0;
    const isActive = currentUrl.startsWith(item.href);
    const isChildActive = hasChildren && item.children?.some((child) => currentUrl.startsWith(child.href));

    // If collapsed and has children, show dropdown on hover
    if (isCollapsed && hasChildren) {
        return (
            <SidebarMenuItem>
                <DropdownMenu open={isHovered} onOpenChange={setIsHovered}>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            isActive={isActive || isChildActive}
                            tooltip={{ children: item.title }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto h-4 w-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        side="right"
                        align="start"
                        className="min-w-[180px]"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {item.children?.map((child) => (
                            <DropdownMenuItem key={child.title} asChild>
                                <Link href={child.href} prefetch className="flex items-center gap-2">
                                    {child.icon && <child.icon className="h-4 w-4" />}
                                    <span>{child.title}</span>
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        );
    }

    // If has children, show collapsible submenu with hover
    if (hasChildren) {
        return (
            <SidebarMenuItem onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <SidebarMenuButton asChild isActive={isActive || isChildActive} tooltip={{ children: item.title }}>
                    <Link href={item.href} prefetch>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className={`ml-auto h-4 w-4 transition-transform duration-200 ${isHovered ? 'rotate-90' : ''}`} />
                    </Link>
                </SidebarMenuButton>
                <div
                    className={`overflow-hidden transition-all duration-200 ease-in-out ${isHovered ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    <SidebarMenuSub>
                        {item.children?.map((child) => (
                            <SidebarMenuSubItem key={child.title}>
                                <SidebarMenuSubButton asChild isActive={currentUrl.startsWith(child.href)}>
                                    <Link href={child.href} prefetch>
                                        {child.icon && <child.icon className="h-4 w-4" />}
                                        <span>{child.title}</span>
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </div>
            </SidebarMenuItem>
        );
    }

    // Simple item without children
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive} tooltip={{ children: item.title }}>
                <Link href={item.href} prefetch>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}
