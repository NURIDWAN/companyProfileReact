import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export type LanguageOption = {
    code: string;
    label: string;
    name: string;
    flag?: string;
};

export type NavigationLink = {
    key: string;
    href: string;
    labels: Record<string, string>;
    order: number;
    active?: boolean;
};

export type SeoMeta = {
    title?: string | null;
    description?: string | null;
    keywords?: string[] | string | null;
    image?: string | null;
};

export type FooterLink = { label: string; href: string };

export interface FooterColumn {
    title: string;
    links: FooterLink[];
}

export interface FooterContent {
    company?: {
        name?: string;
        tagline?: string;
        description?: string;
    };
    contacts?: {
        email?: string;
        phone?: string;
        address?: string;
    };
    socials?: Record<string, string>;
    columns?: FooterColumn[];
    legal?: {
        privacy?: string;
        terms?: string;
    };
    cta?: {
        label: string;
        href: string;
    };
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    navigation?: {
        primary: NavigationLink[];
    };
    language?: {
        current: string;
        available: LanguageOption[];
        fallback?: string;
    };
    footer?: FooterContent;
    seo?: SeoMeta;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

// Definisi tipe kategori
export type Category = "All" | "Software" | "Hardware" | "Service" | "Cloud" | string;

// Definisi tipe produk
export interface Product {
    id: number;
    slug: string;
    name: string;
    description?: string | null;
    category?: Category | string | null;
    features?: string[];
    rating?: number | null;
    clients?: number | null;
    popular?: boolean;
    demo?: boolean;
    price?: number | null;
    thumbnail?: string | null;
    cover_image?: string | null;
    cover_image_url?: string | null;
    thumbnail_url?: string | null;
}
