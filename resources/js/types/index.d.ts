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

export interface BrandingInfo {
    name?: string;
    tagline?: string;
    logo_url?: string | null;
    logo_icon?: string | null;
}

export interface CompanyAddress {
    line1?: string | null;
    city?: string | null;
    province?: string | null;
    postal_code?: string | null;
}

export interface CompanyContactsInfo {
    phone?: string | null;
    email?: string | null;
    whatsapp?: string | null;
    map_label?: string | null;
    map_embed_url?: string | null;
}

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
    children?: NavItem[];
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
    footer?: FooterContent;
    branding?: BrandingInfo;
    companyAddress?: CompanyAddress;
    companyContacts?: CompanyContactsInfo;
    seo?: SeoMeta;
    flash?: {
        success?: string;
        error?: string;
        [key: string]: unknown;
    };
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
export type Category = 'All' | 'Software' | 'Hardware' | 'Service' | 'Cloud' | string;

export type ProductPriceRange = {
    min: number;
    max: number;
    currency: string;
    formatted: string;
};

export type ProductPriceVariant = {
    name?: string | null;
    sku?: string | null;
    price?: number | null;
    compare_at_price?: number | null;
    price_formatted?: string | null;
    compare_at_price_formatted?: string | null;
    stock?: number | null;
};

export interface Product {
    id: number;
    slug: string;
    name: string;
    description?: string | null;
    excerpt?: string | null;
    category?: Category | string | null;
    features?: string[];
    marketing_summary?: string | null;
    marketing_highlights?: string[];
    faqs?: Array<{ question: string; answer: string }>;
    meta_title?: string | null;
    meta_description?: string | null;
    og_title?: string | null;
    cta_variants?: string[];
    rating?: number | null;
    clients?: number | null;
    popular?: boolean;
    demo?: boolean;
    price?: number | null;
    thumbnail?: string | null;
    cover_image?: string | null;
    cover_image_url?: string | null;
    thumbnail_url?: string | null;
    gallery?: string[] | null;
    price_range?: ProductPriceRange | null;
    variants?: ProductPriceVariant[];
    purchase_url?: string | null;
    whatsapp_number?: string | null;
}

export interface JobApplication {
    id: number;
    name: string;
    email: string;
    phone?: string | null;
    linkedin_url?: string | null;
    portfolio_url?: string | null;
    cover_letter?: string | null;
    resume_url?: string | null;
    status: string;
    created_at?: string | null;
    job?: {
        id: number;
        title: string;
        slug: string;
        department?: string | null;
        location?: string | null;
        employment_type?: string | null;
        salary_range?: string | null;
    } | null;
}

declare global {
    interface Window {
        grecaptcha?: {
            render: (container: HTMLElement, parameters: Record<string, unknown>) => number;
            reset: (widgetId?: number) => void;
        };
    }
}
