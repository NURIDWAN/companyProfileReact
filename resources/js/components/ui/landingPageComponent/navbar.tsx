import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Moon, Sun } from "lucide-react";
import { useAppearance } from "@/hooks/use-appearance";
import { cn } from "@/lib/utils";

export function CompanyNavbar() {
    const { appearance, updateAppearance } = useAppearance();
    const { url } = usePage(); // dapet url aktif dari Inertia
    const [activeLink, setActiveLink] = useState("");

    // Bikin daftar menu
    const navLinks = [
        { label: "Beranda", href: "/" },
        { label: "Tentang Kami", href: "/about" },
        { label: "Layanan", href: "/service" },
        { label: "Produk", href: "/produk" },
        { label: "Proyek", href: "/proyek" },
        { label: "Karir", href: "/career" },
        { label: "Blog", href: "/blog" },
        { label: "Kontak", href: "/kontak" },
        { label: "Galeri", href: "/galeri" },
    ];

    // Update activeLink sesuai url sekarang
    useEffect(() => {
        const current = navLinks.find((item) =>
            url.startsWith(item.href) && item.href !== "/"
                ? url.startsWith(item.href)
                : url === item.href
        );
        setActiveLink(current ? current.label : "Beranda");
    }, [url]);

    const toggleDarkMode = () => {
        updateAppearance(appearance === "dark" ? "light" : "dark");
    };

    const IconTheme = appearance === "dark" ? Moon : Sun;

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
                    {navLinks.map((navItem) => (
                        <div key={navItem.label} className="relative">
                            <Link href={navItem.href}>
                                <Button
                                    variant="ghost"
                                    className={cn("text-sm", {
                                        "text-blue-600 font-semibold": activeLink === navItem.label,
                                        "text-foreground": activeLink !== navItem.label,
                                    })}
                                >
                                    {navItem.label}
                                </Button>
                            </Link>
                            {activeLink === navItem.label && (
                                <div className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-600" />
                            )}
                        </div>
                    ))}
                </nav>

                {/* Right side */}
                <div className="flex items-center space-x-2">
                    {/* Language Selector */}
                    <Button variant="ghost" className="hidden lg:flex" size="icon">
                        <span className="text-2xl" role="img" aria-label="Indonesian Flag">
                            🇮🇩
                        </span>
                    </Button>

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
                                    {navLinks.map((navItem) => (
                                        <Link
                                            key={navItem.label}
                                            href={navItem.href}
                                            className="w-full"
                                        >
                                            <Button
                                                variant="ghost"
                                                className={cn("w-full justify-start text-base", {
                                                    "text-blue-600 font-semibold":
                                                        activeLink === navItem.label,
                                                    "text-foreground": activeLink !== navItem.label,
                                                })}
                                            >
                                                {navItem.label}
                                            </Button>
                                        </Link>
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
