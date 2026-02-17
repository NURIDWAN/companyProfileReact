import { Link, usePage, router } from "@inertiajs/react";
import { ComponentType, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Moon, Sun, ChevronDown, type LucideProps } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from "@/components/ui/dropdown-menu";
import * as LucideIcons from "lucide-react";
import { useAppearance } from "@/hooks/use-appearance";
import { cn } from "@/lib/utils";
import { primaryNavLinks } from "@/config/navigation";
import type { BrandingInfo, NavigationLink, SharedData } from "@/types";

type NavItemWithChildren = NavigationLink & { children?: NavItemWithChildren[] };

// Mobile Nav Item Component with collapsible children
function MobileNavItem({
    navItem,
    isActive,
    resolveLabel,
    handleNavClick,
}: {
    navItem: NavItemWithChildren;
    isActive: boolean;
    resolveLabel: (item: NavigationLink) => string;
    handleNavClick: (e: React.MouseEvent, href: string) => void;
}) {
    const [expanded, setExpanded] = useState(false);
    const hasChildren = Array.isArray(navItem.children) && navItem.children.length > 0;

    if (hasChildren) {
        return (
            <div className="w-full">
                <Button
                    variant="ghost"
                    className={cn("w-full justify-between text-base", {
                        "text-blue-600 font-semibold": isActive,
                        "text-foreground": !isActive,
                    })}
                    onClick={() => setExpanded(!expanded)}
                >
                    {resolveLabel(navItem)}
                    <ChevronDown className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} />
                </Button>
                {expanded && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-3">
                        {navItem.children!.map((child) => (
                            <Link
                                key={child.key}
                                href={child.href}
                                className="block"
                                onClick={(e) => handleNavClick(e, child.href)}
                            >
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-sm text-muted-foreground hover:text-foreground"
                                >
                                    {resolveLabel(child)}
                                </Button>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <Link
            href={navItem.href}
            className="w-full"
            onClick={(e) => handleNavClick(e, navItem.href)}
        >
            <Button
                variant="ghost"
                className={cn("w-full justify-start text-base", {
                    "text-blue-600 font-semibold": isActive,
                    "text-foreground": !isActive,
                })}
            >
                {resolveLabel(navItem)}
            </Button>
        </Link>
    );
}

export function CompanyNavbar() {
    const { appearance, updateAppearance } = useAppearance();
    const page = usePage<SharedData>();
    const { navigation, branding } = page.props;
    const url = page.url;

    const navItems: NavigationLink[] = useMemo(() => {
        if (navigation?.primary?.length) {
            return navigation.primary;
        }

        return primaryNavLinks.map((item, index) => ({
            key: item.href,
            href: item.href,
            labels: { id: item.label, en: item.label },
            order: index + 1,
            active: true,
        }));
    }, [navigation]);

    const normalizePath = (href: string | null | undefined) => href?.split("#")[0].replace(/\/+$/, "") || "/";
    const currentPath = normalizePath(url);
    // currentHash reserved for future anchor tracking
    const _currentHash = typeof window !== "undefined" ? window.location.hash : "";

    const activeLinkKey = useMemo(() => {
        return navItems.find((item) => {
            if (!item.href) return false;
            const href = normalizePath(item.href);
            if (href === "/") {
                return currentPath === "/";
            }
            return currentPath.startsWith(href);
        })?.key;
    }, [currentPath, navItems]);

    const resolveLabel = (item: NavigationLink) => {
        const labels = item.labels ?? {};
        return labels.id ?? labels.en ?? Object.values(labels)[0] ?? item.key;
    };

    const toggleDarkMode = () => {
        updateAppearance(appearance === "dark" ? "light" : "dark");
    };

    const handleNavClick = (event: React.MouseEvent, href: string | null | undefined) => {
        if (typeof window === "undefined" || !href) return;
        const [path, hash] = href.split("#");
        const targetPath = normalizePath(path || "");
        const currentPagePath = normalizePath(window.location.pathname);

        // If there's a hash anchor
        if (hash) {
            // If we're on the same page, just scroll
            if (currentPagePath === targetPath || (!path && currentPagePath === "/")) {
                event.preventDefault();
                const el = document.getElementById(hash);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                    // Update URL hash without jumping
                    window.history.pushState(null, '', `${window.location.pathname}#${hash}`);
                }
                return;
            } else {
                // Navigate to different page, then scroll to section
                event.preventDefault();
                router.get(href, {}, {
                    preserveScroll: false,
                    onSuccess: () => {
                        // Wait for page to render, then scroll
                        setTimeout(() => {
                            const elem = document.getElementById(hash);
                            if (elem) {
                                elem.scrollIntoView({ behavior: "smooth", block: "start" });
                            }
                        }, 150);
                    },
                });
                return;
            }
        }
    };

    const IconTheme = appearance === "dark" ? Moon : Sun;

    const brandProps = branding as BrandingInfo | undefined;
    const brandName = brandProps?.name ?? 'Harmony Strategic Group';
    const brandTagline = brandProps?.tagline ?? undefined;
    const brandLogo = brandProps?.logo_url ?? null;
    const logoIconName = brandProps?.logo_icon ?? undefined;

    const iconCollection = LucideIcons as unknown as Record<string, ComponentType<LucideProps>>;
    const LogoIcon = logoIconName ? iconCollection[logoIconName] : undefined;

    const initials = brandName
        .split(' ')
        .map((word) => word.charAt(0))
        .filter(Boolean)
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3">
                    {brandLogo ? (
                        <span className="relative inline-flex h-10 w-10 overflow-hidden rounded-full border border-border bg-card">
                            <img
                                src={brandLogo}
                                alt={brandName}
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        </span>
                    ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                            {LogoIcon ? <LogoIcon className="h-5 w-5" /> : (initials || 'LC')}
                        </div>
                    )}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                            {LogoIcon && (
                                <LogoIcon className="h-4 w-4 text-blue-600" />
                            )}
                            <span className="text-base font-semibold text-foreground">{brandName}</span>
                        </div>
                        {brandTagline ? (
                            <span className="text-xs text-muted-foreground line-clamp-1">{brandTagline}</span>
                        ) : null}
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center space-x-2 lg:flex">
                    {navItems.map((navItem) => {
                        const navItemWithChildren = navItem as NavItemWithChildren;
                        const hasChildren = Array.isArray(navItemWithChildren.children) && navItemWithChildren.children.length > 0;
                        
                        return (
                        <div key={navItem.key} className="relative">
                            {hasChildren ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className={cn("text-sm", {
                                                "text-blue-600 font-semibold": activeLinkKey === navItem.key,
                                                "text-foreground": activeLinkKey !== navItem.key,
                                            })}
                                        >
                                            {resolveLabel(navItem)}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        {navItemWithChildren.children!.map((child) => {
                                            const hasGrandchildren = Array.isArray(child.children) && child.children.length > 0;
                                            return hasGrandchildren ? (
                                                <DropdownMenuSub key={child.key}>
                                                    <DropdownMenuSubTrigger>
                                                        {resolveLabel(child)}
                                                    </DropdownMenuSubTrigger>
                                                    <DropdownMenuSubContent>
                                                        {child.children!.map((grandchild) => (
                                                            <DropdownMenuItem key={grandchild.key} asChild>
                                                                <Link href={grandchild.href} onClick={(e) => handleNavClick(e, grandchild.href)}>
                                                                    {resolveLabel(grandchild)}
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuSubContent>
                                                </DropdownMenuSub>
                                            ) : (
                                                <DropdownMenuItem key={child.key} asChild>
                                                    <Link href={child.href} onClick={(e) => handleNavClick(e, child.href)}>
                                                        {resolveLabel(child)}
                                                    </Link>
                                                </DropdownMenuItem>
                                            );
                                        })}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link href={navItem.href} onClick={(e) => handleNavClick(e, navItem.href)}>
                                    <Button
                                        variant="ghost"
                                        className={cn("text-sm", {
                                            "text-blue-600 font-semibold": activeLinkKey === navItem.key,
                                            "text-foreground": activeLinkKey !== navItem.key,
                                        })}
                                    >
                                        {resolveLabel(navItem)}
                                    </Button>
                                </Link>
                            )}
                            {activeLinkKey === navItem.key && (
                                <div className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-600" />
                            )}
                        </div>
                    )})}
                </nav>

                {/* Right side */}
                <div className="flex items-center space-x-2">
                    {/* Dark Mode Toggle */}
                    <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                        <IconTheme className="h-5 w-5" />
                    </Button>

                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="p-4 pt-10">
                                <nav className="flex flex-col items-start space-y-2">
                                    {navItems.map((navItem) => (
                                        <MobileNavItem
                                            key={navItem.key}
                                            navItem={navItem as NavItemWithChildren}
                                            isActive={activeLinkKey === navItem.key}
                                            resolveLabel={resolveLabel}
                                            handleNavClick={handleNavClick}
                                        />
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
