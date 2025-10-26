import { Link, router, usePage } from "@inertiajs/react";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Moon, Sun } from "lucide-react";
import { useAppearance } from "@/hooks/use-appearance";
import { cn } from "@/lib/utils";
import { primaryNavLinks } from "@/config/navigation";
import type { NavigationLink, SharedData } from "@/types";

export function CompanyNavbar() {
    const { appearance, updateAppearance } = useAppearance();
    const page = usePage<SharedData>();
    const { navigation, language } = page.props;
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

    const currentLanguage = language?.current ?? language?.fallback ?? "id";
    const languageOptions = language?.available ?? [
        { code: "id", label: "ID", name: "Bahasa Indonesia" },
        { code: "en", label: "EN", name: "English" }
    ];

    const activeLinkKey = useMemo(() => {
        return navItems.find((item) =>
            item.href === "/" ? url === "/" : url.startsWith(item.href)
        )?.key;
    }, [url, navItems]);

    const resolveLabel = (item: NavigationLink) => {
        return item.labels?.[currentLanguage] ??
            item.labels?.[language?.fallback ?? "id"] ??
            item.labels?.id ??
            item.key;
    };

    const toggleDarkMode = () => {
        updateAppearance(appearance === "dark" ? "light" : "dark");
    };

    const IconTheme = appearance === "dark" ? Moon : Sun;

    const handleLanguageSwitch = (code: string) => {
        if (code === currentLanguage) return;
        router.post(route("language.switch"), { language: code }, { preserveScroll: true });
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <span className="font-bold text-blue-600 text-3xl">H</span>
                    <span className="font-bold text-red-600 text-3xl">S</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center space-x-2 lg:flex">
                    {navItems.map((navItem) => (
                        <div key={navItem.key} className="relative">
                            <Link href={navItem.href}>
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
                            {activeLinkKey === navItem.key && (
                                <div className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-600" />
                            )}
                        </div>
                    ))}
                </nav>

                {/* Right side */}
                <div className="flex items-center space-x-2">
                    <div className="hidden items-center space-x-1 lg:flex">
                        {languageOptions.map((option) => (
                            <Button
                                key={option.code}
                                variant={option.code === currentLanguage ? "default" : "ghost"}
                                size="sm"
                                className="px-3 text-xs"
                                onClick={() => handleLanguageSwitch(option.code)}
                            >
                                {option.flag ?? option.label}
                            </Button>
                        ))}
                    </div>

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
                                        <Link
                                            key={navItem.key}
                                            href={navItem.href}
                                            className="w-full"
                                        >
                                            <Button
                                                variant="ghost"
                                                className={cn("w-full justify-start text-base", {
                                                    "text-blue-600 font-semibold": activeLinkKey === navItem.key,
                                                    "text-foreground": activeLinkKey !== navItem.key,
                                                })}
                                            >
                                                {resolveLabel(navItem)}
                                            </Button>
                                        </Link>
                                    ))}
                                </nav>
                                <div className="mt-6 flex gap-2">
                                    {languageOptions.map((option) => (
                                        <Button
                                            key={option.code}
                                            variant={option.code === currentLanguage ? "default" : "outline"}
                                            className="flex-1 bg-blue-600"
                                            onClick={() => handleLanguageSwitch(option.code)}
                                        >
                                            {option.label}
                                        </Button>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
