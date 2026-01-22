import { Head, useForm } from '@inertiajs/react';
import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';

interface CompanyProfile {
    name: string;
    tagline: string;
    logo_icon?: string;
    logo_image?: string;
    logo_url?: string | null;
}

interface CompanyAddress {
    line1: string;
    city: string;
    province: string;
    postal_code: string;
}

interface CompanyContacts {
    phone: string;
    email: string;
    whatsapp: string;
    map_label?: string;
    map_embed_url?: string;
}

interface CompanySocials {
    linkedin: string;
    instagram: string;
    youtube: string;
    website: string;
}

interface FooterCta {
    label: string;
    href: string;
}

interface FooterLegal {
    privacy: string;
    terms: string;
}

interface SecuritySettings {
    otp: {
        enabled: boolean;
        expires_minutes: number;
        resend_cooldown: number;
    };
}

interface AiSettings {
    api_key: string;
    model: string;
    endpoint: string;
}

interface BrandingSettings {
    favicon_ico: string;
    favicon_ico_url: string | null;
    favicon_svg: string;
    favicon_svg_url: string | null;
    apple_touch_icon: string;
    apple_touch_icon_url: string | null;
}

interface SettingsIndexProps {
    company: CompanyProfile;
    address: CompanyAddress;
    contacts: CompanyContacts;
    socials: CompanySocials;
    footerCta: FooterCta;
    footerLegal: FooterLegal;
    security: SecuritySettings;
    ai: AiSettings;
    branding: BrandingSettings;
}

export default function SettingsIndex({ company, address, contacts, socials, footerCta, footerLegal, security, ai, branding }: SettingsIndexProps) {
    const companyForm = useForm({
        ...company,
        logo_icon: company.logo_icon ?? '',
        logo_image: company.logo_image ?? '',
        logo_image_file: undefined as File | undefined,
    });
    const addressForm = useForm(address);
    const contactsForm = useForm({
        phone: contacts.phone ?? '',
        email: contacts.email ?? '',
        whatsapp: contacts.whatsapp ?? '',
        map_label: contacts.map_label ?? '',
        map_embed_url: contacts.map_embed_url ?? '',
    });
    const socialsForm = useForm(socials);
    const footerCtaForm = useForm(footerCta);
    const footerLegalForm = useForm(footerLegal);
    const securityForm = useForm({
        otp_enabled: security.otp.enabled,
        otp_expires_minutes: String(security.otp.expires_minutes),
        otp_resend_cooldown: String(security.otp.resend_cooldown),
    });
    const aiForm = useForm({
        api_key: ai.api_key ?? '',
        model: ai.model ?? 'google/gemini-2.0-flash-exp:free',
        endpoint: ai.endpoint ?? 'https://openrouter.ai/api/v1',
    });
    const brandingForm = useForm({
        favicon_ico: branding.favicon_ico ?? '',
        favicon_ico_file: undefined as File | undefined,
        favicon_svg: branding.favicon_svg ?? '',
        favicon_svg_file: undefined as File | undefined,
        apple_touch_icon: branding.apple_touch_icon ?? '',
        apple_touch_icon_file: undefined as File | undefined,
    });
    const [showApiKey, setShowApiKey] = useState(false);
    const [logoPreview, setLogoPreview] = useState<string | null>(company.logo_url ?? null);
    const [logoObjectUrl, setLogoObjectUrl] = useState<string | null>(null);

    // Favicon previews
    const [faviconIcoPreview, setFaviconIcoPreview] = useState<string | null>(branding.favicon_ico_url ?? null);
    const [faviconSvgPreview, setFaviconSvgPreview] = useState<string | null>(branding.favicon_svg_url ?? null);
    const [appleTouchIconPreview, setAppleTouchIconPreview] = useState<string | null>(branding.apple_touch_icon_url ?? null);
    const [faviconObjectUrls, setFaviconObjectUrls] = useState<{ ico: string | null; svg: string | null; apple: string | null }>({
        ico: null,
        svg: null,
        apple: null,
    });

    useEffect(() => {
        return () => {
            if (logoObjectUrl) {
                URL.revokeObjectURL(logoObjectUrl);
            }
        };
    }, [logoObjectUrl]);

    // Cleanup favicon object URLs on unmount
    useEffect(() => {
        return () => {
            if (faviconObjectUrls.ico) URL.revokeObjectURL(faviconObjectUrls.ico);
            if (faviconObjectUrls.svg) URL.revokeObjectURL(faviconObjectUrls.svg);
            if (faviconObjectUrls.apple) URL.revokeObjectURL(faviconObjectUrls.apple);
        };
    }, [faviconObjectUrls]);

    const handleLogoUrlChange = (value: string) => {
        companyForm.setData('logo_image', value);

        if (logoObjectUrl) {
            URL.revokeObjectURL(logoObjectUrl);
            setLogoObjectUrl(null);
        }

        if (value) {
            setLogoPreview(value);
            companyForm.setData('logo_image_file', undefined);
        } else if (!companyForm.data.logo_image_file) {
            setLogoPreview(company.logo_url ?? null);
        }
    };

    const handleLogoFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        companyForm.setData('logo_image_file', file ?? undefined);

        if (logoObjectUrl) {
            URL.revokeObjectURL(logoObjectUrl);
            setLogoObjectUrl(null);
        }

        if (file) {
            const url = URL.createObjectURL(file);
            setLogoPreview(url);
            setLogoObjectUrl(url);
            companyForm.setData('logo_image', '');
        } else if (companyForm.data.logo_image) {
            setLogoPreview(companyForm.data.logo_image);
        } else {
            setLogoPreview(company.logo_url ?? null);
        }
    };

    const clearLogo = () => {
        if (logoObjectUrl) {
            URL.revokeObjectURL(logoObjectUrl);
            setLogoObjectUrl(null);
        }

        setLogoPreview(null);
        companyForm.setData('logo_image', '');
        companyForm.setData('logo_image_file', undefined);
    };

    // Favicon file change handlers
    const handleFaviconIcoFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        brandingForm.setData('favicon_ico_file', file ?? undefined);

        if (faviconObjectUrls.ico) {
            URL.revokeObjectURL(faviconObjectUrls.ico);
        }

        if (file) {
            const url = URL.createObjectURL(file);
            setFaviconIcoPreview(url);
            setFaviconObjectUrls((prev) => ({ ...prev, ico: url }));
        } else {
            setFaviconIcoPreview(branding.favicon_ico_url ?? null);
            setFaviconObjectUrls((prev) => ({ ...prev, ico: null }));
        }
    };

    const handleFaviconSvgFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        brandingForm.setData('favicon_svg_file', file ?? undefined);

        if (faviconObjectUrls.svg) {
            URL.revokeObjectURL(faviconObjectUrls.svg);
        }

        if (file) {
            const url = URL.createObjectURL(file);
            setFaviconSvgPreview(url);
            setFaviconObjectUrls((prev) => ({ ...prev, svg: url }));
        } else {
            setFaviconSvgPreview(branding.favicon_svg_url ?? null);
            setFaviconObjectUrls((prev) => ({ ...prev, svg: null }));
        }
    };

    const handleAppleTouchIconFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        brandingForm.setData('apple_touch_icon_file', file ?? undefined);

        if (faviconObjectUrls.apple) {
            URL.revokeObjectURL(faviconObjectUrls.apple);
        }

        if (file) {
            const url = URL.createObjectURL(file);
            setAppleTouchIconPreview(url);
            setFaviconObjectUrls((prev) => ({ ...prev, apple: url }));
        } else {
            setAppleTouchIconPreview(branding.apple_touch_icon_url ?? null);
            setFaviconObjectUrls((prev) => ({ ...prev, apple: null }));
        }
    };

    const submitCompany: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        companyForm.transform((formData) => ({
            ...formData,
            logo_image_file: formData.logo_image_file ?? undefined,
        }));

        companyForm.post(route('admin.settings.company.update'), {
            preserveScroll: true,
            forceFormData: true,
            onFinish: () => {
                companyForm.transform((data) => data);
            },
        });
    };

    const submitAddress: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        addressForm.post(route('admin.settings.address.update'), {
            preserveScroll: true,
        });
    };

    const submitContacts: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        contactsForm.post(route('admin.settings.contacts.update'), {
            preserveScroll: true,
        });
    };

    const submitSocials: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        socialsForm.post(route('admin.settings.socials.update'), {
            preserveScroll: true,
        });
    };

    const submitSecurity: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        securityForm.post(route('admin.settings.security.otp'), {
            preserveScroll: true,
        });
    };

    const submitFooterCta: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        footerCtaForm.post(route('admin.settings.footer.cta.update'), {
            preserveScroll: true,
        });
    };

    const submitFooterLegal: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        footerLegalForm.post(route('admin.settings.footer.legal.update'), {
            preserveScroll: true,
        });
    };

    const submitAi: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        aiForm.post(route('admin.settings.ai.update'), {
            preserveScroll: true,
        });
    };

    const submitBranding: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        brandingForm.transform((formData) => ({
            ...formData,
            favicon_ico_file: formData.favicon_ico_file ?? undefined,
            favicon_svg_file: formData.favicon_svg_file ?? undefined,
            apple_touch_icon_file: formData.apple_touch_icon_file ?? undefined,
        }));
        brandingForm.post(route('admin.settings.branding.update'), {
            preserveScroll: true,
            forceFormData: true,
            onFinish: () => {
                brandingForm.transform((data) => data);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Setting Konten" />

            <div className="space-y-6 p-4">
                <section className="space-y-4">
                    <header>
                        <h1 className="text-2xl font-semibold">Setting Konten</h1>
                        <p className="text-sm text-muted-foreground">Kelola profil dan informasi perusahaan yang ditampilkan ke publik.</p>
                    </header>

                    <form onSubmit={submitCompany} className="space-y-4" encType="multipart/form-data">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profil Perusahaan</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="company-name">Nama perusahaan</Label>
                                    <Input
                                        id="company-name"
                                        value={companyForm.data.name ?? ''}
                                        onChange={(event) => companyForm.setData('name', event.target.value)}
                                    />
                                    <InputError message={companyForm.errors.name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="company-tagline">Tagline</Label>
                                    <Input
                                        id="company-tagline"
                                        value={companyForm.data.tagline ?? ''}
                                        onChange={(event) => companyForm.setData('tagline', event.target.value)}
                                    />
                                    <InputError message={companyForm.errors.tagline} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="company-logo-icon">Ikon Judul (opsional)</Label>
                                    <Input
                                        id="company-logo-icon"
                                        value={companyForm.data.logo_icon ?? ''}
                                        onChange={(event) => companyForm.setData('logo_icon', event.target.value)}
                                        placeholder="Misal: Sparkles, Layers, Stars"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Gunakan nama ikon Lucide (CamelCase). Ikon ini tampil di samping judul situs.
                                    </p>
                                    <InputError message={companyForm.errors.logo_icon} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="company-logo-url">Logo (URL)</Label>
                                    <Input
                                        id="company-logo-url"
                                        value={companyForm.data.logo_image ?? ''}
                                        onChange={(event) => handleLogoUrlChange(event.target.value)}
                                        placeholder="https://contoh.com/logo.svg"
                                    />
                                    <p className="text-xs text-muted-foreground">Tempel URL gambar jika logo dihosting di tempat lain.</p>
                                    <InputError message={companyForm.errors.logo_image} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="company-logo-file">Upload Logo</Label>
                                    <Input id="company-logo-file" type="file" accept="image/*" onChange={handleLogoFileChange} />
                                    <p className="text-xs text-muted-foreground">Format PNG, JPG, atau SVG dengan ukuran maks 4MB.</p>
                                    <InputError message={companyForm.errors.logo_image_file} />
                                    {logoPreview ? (
                                        <div className="flex items-center gap-4">
                                            <span className="inline-flex h-16 w-16 overflow-hidden rounded-full border border-dashed border-border bg-card">
                                                <img src={logoPreview} alt="Logo preview" className="h-full w-full object-cover" />
                                            </span>
                                            <Button type="button" variant="outline" size="sm" onClick={clearLogo}>
                                                Hapus Logo
                                            </Button>
                                        </div>
                                    ) : null}
                                </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between gap-2">
                                {companyForm.recentlySuccessful ? <p className="text-sm text-muted-foreground">Tersimpan.</p> : <span />}
                                <Button type="submit" disabled={companyForm.processing}>
                                    {companyForm.processing ? 'Menyimpan...' : 'Simpan profil'}
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>

                    <form onSubmit={submitAddress} className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Alamat Perusahaan</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="address-line1">Alamat</Label>
                                    <Input
                                        id="address-line1"
                                        value={addressForm.data.line1 ?? ''}
                                        onChange={(event) => addressForm.setData('line1', event.target.value)}
                                    />
                                    <InputError message={addressForm.errors.line1} />
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="address-city">Kota/Kabupaten</Label>
                                        <Input
                                            id="address-city"
                                            value={addressForm.data.city ?? ''}
                                            onChange={(event) => addressForm.setData('city', event.target.value)}
                                        />
                                        <InputError message={addressForm.errors.city} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="address-province">Provinsi</Label>
                                        <Input
                                            id="address-province"
                                            value={addressForm.data.province ?? ''}
                                            onChange={(event) => addressForm.setData('province', event.target.value)}
                                        />
                                        <InputError message={addressForm.errors.province} />
                                    </div>
                                </div>
                                <div className="grid gap-2 md:w-1/3">
                                    <Label htmlFor="address-postal">Kode Pos</Label>
                                    <Input
                                        id="address-postal"
                                        value={addressForm.data.postal_code ?? ''}
                                        onChange={(event) => addressForm.setData('postal_code', event.target.value)}
                                    />
                                    <InputError message={addressForm.errors.postal_code} />
                                </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between gap-2">
                                {addressForm.recentlySuccessful ? <p className="text-sm text-muted-foreground">Tersimpan.</p> : <span />}
                                <Button type="submit" disabled={addressForm.processing}>
                                    {addressForm.processing ? 'Menyimpan...' : 'Simpan alamat'}
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>

                    <form onSubmit={submitContacts} className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Kontak</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2 md:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="contact-phone">Telepon</Label>
                                        <Input
                                            id="contact-phone"
                                            value={contactsForm.data.phone ?? ''}
                                            onChange={(event) => contactsForm.setData('phone', event.target.value)}
                                        />
                                        <InputError message={contactsForm.errors.phone} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="contact-email">Email</Label>
                                        <Input
                                            id="contact-email"
                                            value={contactsForm.data.email ?? ''}
                                            onChange={(event) => contactsForm.setData('email', event.target.value)}
                                        />
                                        <InputError message={contactsForm.errors.email} />
                                    </div>
                                </div>
                                <div className="grid gap-2 md:w-1/2">
                                    <Label htmlFor="contact-whatsapp">WhatsApp</Label>
                                    <Input
                                        id="contact-whatsapp"
                                        value={contactsForm.data.whatsapp ?? ''}
                                        onChange={(event) => contactsForm.setData('whatsapp', event.target.value)}
                                    />
                                    <InputError message={contactsForm.errors.whatsapp} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="contact-map-label">Judul lokasi</Label>
                                    <Input
                                        id="contact-map-label"
                                        value={contactsForm.data.map_label ?? ''}
                                        onChange={(event) => contactsForm.setData('map_label', event.target.value)}
                                        placeholder="Lokasi Kantor"
                                    />
                                    <InputError message={contactsForm.errors.map_label} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="contact-map-embed">URL embed Google Maps</Label>
                                    <Input
                                        id="contact-map-embed"
                                        value={contactsForm.data.map_embed_url ?? ''}
                                        onChange={(event) => contactsForm.setData('map_embed_url', event.target.value)}
                                        placeholder="https://www.google.com/maps/embed?pb=..."
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Salin nilai <code>src</code> dari embed Google Maps untuk menampilkan peta pada halaman kontak.
                                    </p>
                                    <InputError message={contactsForm.errors.map_embed_url} />
                                </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between gap-2">
                                {contactsForm.recentlySuccessful ? <p className="text-sm text-muted-foreground">Tersimpan.</p> : <span />}
                                <Button type="submit" disabled={contactsForm.processing}>
                                    {contactsForm.processing ? 'Menyimpan...' : 'Simpan kontak'}
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>

                    <form onSubmit={submitSecurity} className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Keamanan & OTP Login</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3 rounded-lg border border-dashed border-muted p-4">
                                    <Checkbox
                                        id="otp-enabled"
                                        checked={Boolean(securityForm.data.otp_enabled)}
                                        onCheckedChange={(checked) => securityForm.setData('otp_enabled', Boolean(checked))}
                                    />
                                    <div>
                                        <Label htmlFor="otp-enabled" className="text-base font-semibold">
                                            Aktifkan OTP via Email
                                        </Label>
                                        <p className="text-xs text-muted-foreground">
                                            Saat aktif, setiap login admin akan dimintai kode OTP yang dikirim ke email. Nonaktifkan bila tidak
                                            diperlukan.
                                        </p>
                                    </div>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="otp-expires">Masa berlaku OTP (menit)</Label>
                                        <Input
                                            id="otp-expires"
                                            type="number"
                                            min={1}
                                            max={60}
                                            value={securityForm.data.otp_expires_minutes}
                                            onChange={(event) => securityForm.setData('otp_expires_minutes', event.target.value)}
                                        />
                                        <InputError message={securityForm.errors.otp_expires_minutes} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="otp-resend">Jeda kirim ulang (detik)</Label>
                                        <Input
                                            id="otp-resend"
                                            type="number"
                                            min={15}
                                            max={600}
                                            value={securityForm.data.otp_resend_cooldown}
                                            onChange={(event) => securityForm.setData('otp_resend_cooldown', event.target.value)}
                                        />
                                        <InputError message={securityForm.errors.otp_resend_cooldown} />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between gap-2">
                                {securityForm.recentlySuccessful ? <p className="text-sm text-muted-foreground">Tersimpan.</p> : <span />}
                                <Button type="submit" disabled={securityForm.processing}>
                                    {securityForm.processing ? 'Menyimpan...' : 'Simpan pengaturan'}
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>

                    <form onSubmit={submitSocials} className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Sosial Media</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="social-linkedin">LinkedIn</Label>
                                    <Input
                                        id="social-linkedin"
                                        type="url"
                                        placeholder="https://"
                                        value={socialsForm.data.linkedin ?? ''}
                                        onChange={(event) => socialsForm.setData('linkedin', event.target.value)}
                                    />
                                    <InputError message={socialsForm.errors.linkedin} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="social-instagram">Instagram</Label>
                                    <Input
                                        id="social-instagram"
                                        type="url"
                                        placeholder="https://"
                                        value={socialsForm.data.instagram ?? ''}
                                        onChange={(event) => socialsForm.setData('instagram', event.target.value)}
                                    />
                                    <InputError message={socialsForm.errors.instagram} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="social-youtube">YouTube</Label>
                                    <Input
                                        id="social-youtube"
                                        type="url"
                                        placeholder="https://"
                                        value={socialsForm.data.youtube ?? ''}
                                        onChange={(event) => socialsForm.setData('youtube', event.target.value)}
                                    />
                                    <InputError message={socialsForm.errors.youtube} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="social-website">Website</Label>
                                    <Input
                                        id="social-website"
                                        type="url"
                                        placeholder="https://"
                                        value={socialsForm.data.website ?? ''}
                                        onChange={(event) => socialsForm.setData('website', event.target.value)}
                                    />
                                    <InputError message={socialsForm.errors.website} />
                                </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between gap-2">
                                {socialsForm.recentlySuccessful ? <p className="text-sm text-muted-foreground">Tersimpan.</p> : <span />}
                                <Button type="submit" disabled={socialsForm.processing}>
                                    {socialsForm.processing ? 'Menyimpan...' : 'Simpan sosial media'}
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>

                    <div className="space-y-4">
                        <header className="mt-8">
                            <h2 className="text-xl font-semibold">Konten Footer</h2>
                            <p className="text-sm text-muted-foreground">
                                CTA dan tautan legal footer dapat diatur di sini. Informasi profil dan kontak otomatis mengikuti data perusahaan di
                                atas.
                            </p>
                        </header>

                        <form onSubmit={submitFooterCta} className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>CTA Footer</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="footer-cta-label">Label tombol</Label>
                                        <Input
                                            id="footer-cta-label"
                                            value={footerCtaForm.data.label ?? ''}
                                            onChange={(event) => footerCtaForm.setData('label', event.target.value)}
                                        />
                                        <InputError message={footerCtaForm.errors.label} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="footer-cta-href">Tautan</Label>
                                        <Input
                                            id="footer-cta-href"
                                            value={footerCtaForm.data.href ?? ''}
                                            onChange={(event) => footerCtaForm.setData('href', event.target.value)}
                                        />
                                        <InputError message={footerCtaForm.errors.href} />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-between gap-2">
                                    {footerCtaForm.recentlySuccessful ? <p className="text-sm text-muted-foreground">Tersimpan.</p> : <span />}
                                    <Button type="submit" disabled={footerCtaForm.processing}>
                                        {footerCtaForm.processing ? 'Menyimpan...' : 'Simpan CTA footer'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>

                        <form onSubmit={submitFooterLegal} className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Tautan Legal</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="footer-legal-privacy">Kebijakan Privasi</Label>
                                        <Input
                                            id="footer-legal-privacy"
                                            value={footerLegalForm.data.privacy ?? ''}
                                            onChange={(event) => footerLegalForm.setData('privacy', event.target.value)}
                                        />
                                        <InputError message={footerLegalForm.errors.privacy} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="footer-legal-terms">Ketentuan Layanan</Label>
                                        <Input
                                            id="footer-legal-terms"
                                            value={footerLegalForm.data.terms ?? ''}
                                            onChange={(event) => footerLegalForm.setData('terms', event.target.value)}
                                        />
                                        <InputError message={footerLegalForm.errors.terms} />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-between gap-2">
                                    {footerLegalForm.recentlySuccessful ? <p className="text-sm text-muted-foreground">Tersimpan.</p> : <span />}
                                    <Button type="submit" disabled={footerLegalForm.processing}>
                                        {footerLegalForm.processing ? 'Menyimpan...' : 'Simpan tautan'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </div>

                    <div className="space-y-4">
                        <header className="mt-8">
                            <h2 className="text-xl font-semibold">Integrasi AI</h2>
                            <p className="text-sm text-muted-foreground">
                                Konfigurasi OpenRouter untuk fitur AI generator (blog, produk enrichment).
                            </p>
                        </header>

                        <form onSubmit={submitAi} className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Pengaturan OpenRouter</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="ai-api-key">API Key</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="ai-api-key"
                                                type={showApiKey ? 'text' : 'password'}
                                                value={aiForm.data.api_key ?? ''}
                                                onChange={(event) => aiForm.setData('api_key', event.target.value)}
                                                placeholder="sk-or-v1-xxxxxxxxxxxx"
                                                className="flex-1"
                                            />
                                            <Button type="button" variant="outline" size="sm" onClick={() => setShowApiKey(!showApiKey)}>
                                                {showApiKey ? 'Sembunyikan' : 'Tampilkan'}
                                            </Button>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Dapatkan API key dari{' '}
                                            <a
                                                href="https://openrouter.ai/keys"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary underline"
                                            >
                                                openrouter.ai/keys
                                            </a>
                                        </p>
                                        <InputError message={aiForm.errors.api_key} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="ai-model">Model</Label>
                                        <Input
                                            id="ai-model"
                                            value={aiForm.data.model ?? ''}
                                            onChange={(event) => aiForm.setData('model', event.target.value)}
                                            placeholder="google/gemini-2.0-flash-exp:free"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Model gratis: <code>google/gemini-2.0-flash-exp:free</code>,{' '}
                                            <code>meta-llama/llama-3.2-3b-instruct:free</code>
                                        </p>
                                        <InputError message={aiForm.errors.model} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="ai-endpoint">Endpoint API</Label>
                                        <Input
                                            id="ai-endpoint"
                                            type="url"
                                            value={aiForm.data.endpoint ?? ''}
                                            onChange={(event) => aiForm.setData('endpoint', event.target.value)}
                                            placeholder="https://openrouter.ai/api/v1"
                                        />
                                        <InputError message={aiForm.errors.endpoint} />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-between gap-2">
                                    {aiForm.recentlySuccessful ? <p className="text-sm text-muted-foreground">Tersimpan.</p> : <span />}
                                    <Button type="submit" disabled={aiForm.processing}>
                                        {aiForm.processing ? 'Menyimpan...' : 'Simpan pengaturan AI'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </div>

                    <div className="space-y-4">
                        <header className="mt-8">
                            <h2 className="text-xl font-semibold">Branding</h2>
                            <p className="text-sm text-muted-foreground">
                                Kelola favicon dan ikon aplikasi yang ditampilkan di browser dan perangkat.
                            </p>
                        </header>

                        <form onSubmit={submitBranding} className="space-y-4" encType="multipart/form-data">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Favicon & Ikon</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="favicon-ico">Favicon ICO</Label>
                                            <Input id="favicon-ico" type="file" accept=".ico,.png" onChange={handleFaviconIcoFileChange} />
                                            <p className="text-xs text-muted-foreground">
                                                Format .ico atau .png (16x16 atau 32x32 px). Ikon utama yang tampil di tab browser.
                                            </p>
                                            <InputError message={brandingForm.errors.favicon_ico_file} />
                                            {faviconIcoPreview && (
                                                <div className="flex items-center gap-2">
                                                    <span className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded border border-dashed border-border bg-card">
                                                        <img
                                                            src={faviconIcoPreview}
                                                            alt="Favicon ICO preview"
                                                            className="h-full w-full object-contain"
                                                        />
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">Preview</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="favicon-svg">Favicon SVG</Label>
                                            <Input id="favicon-svg" type="file" accept=".svg" onChange={handleFaviconSvgFileChange} />
                                            <p className="text-xs text-muted-foreground">
                                                Format .svg untuk tampilan yang tajam di semua resolusi. Browser modern akan menggunakan ini.
                                            </p>
                                            <InputError message={brandingForm.errors.favicon_svg_file} />
                                            {faviconSvgPreview && (
                                                <div className="flex items-center gap-2">
                                                    <span className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded border border-dashed border-border bg-card">
                                                        <img
                                                            src={faviconSvgPreview}
                                                            alt="Favicon SVG preview"
                                                            className="h-full w-full object-contain"
                                                        />
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">Preview</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="apple-touch-icon">Apple Touch Icon</Label>
                                            <Input id="apple-touch-icon" type="file" accept="image/png" onChange={handleAppleTouchIconFileChange} />
                                            <p className="text-xs text-muted-foreground">
                                                Format .png (180x180 px). Ikon yang tampil saat situs disimpan ke home screen di iOS.
                                            </p>
                                            <InputError message={brandingForm.errors.apple_touch_icon_file} />
                                            {appleTouchIconPreview && (
                                                <div className="flex items-center gap-2">
                                                    <span className="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-card">
                                                        <img
                                                            src={appleTouchIconPreview}
                                                            alt="Apple Touch Icon preview"
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">Preview</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-between gap-2">
                                    {brandingForm.recentlySuccessful ? <p className="text-sm text-muted-foreground">Tersimpan.</p> : <span />}
                                    <Button type="submit" disabled={brandingForm.processing}>
                                        {brandingForm.processing ? 'Menyimpan...' : 'Simpan branding'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
