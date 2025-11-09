import { useForm, Head } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import InputError from '@/components/input-error';

interface CompanyProfile {
    name: string;
    tagline: string;
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

interface AboutOverviewForm {
    badge: string;
    title: string;
    heading: string;
    paragraphs: string[];
    stats: { value: string; label: string }[];
    image?: string;
    highlights: {
        icon: string;
        title: string;
        description: string;
    }[];
}

interface AboutVisionForm {
    badge: string;
    title: string;
    vision_title: string;
    vision_text: string;
    mission_title: string;
    mission_text: string;
}

interface AboutStatisticsForm {
    badge: string;
    title: string;
    description: string;
    primary: { value: string; label: string }[];
    secondary: { value: string; label: string }[];
}

interface AboutTeamForm {
    badge: string;
    title: string;
    description: string;
    members: {
        name: string;
        role: string;
        image: string;
        description: string;
    }[];
}

interface AboutCtaForm {
    badge: string;
    heading: string;
    description: string;
    primary_label: string;
    primary_link: string;
    secondary_label?: string;
    secondary_link?: string;
    contacts: {
        icon: string;
        title: string;
        detail: string;
    }[];
}

interface ServiceHeroForm {
    badge?: string;
    heading: string;
    highlight?: string;
    subheading?: string;
    primary_label: string;
    primary_link: string;
    secondary_label?: string;
    secondary_link?: string;
    background_image?: string;
}

interface ServiceSummaryForm {
    badge?: string;
    heading: string;
    description?: string;
}

interface ServiceOfferingsForm {
    badge?: string;
    heading: string;
    description?: string;
    items: {
        icon: string;
        title: string;
        description: string;
    }[];
}

interface ServiceTechStackForm {
    heading: string;
    description?: string;
    items: {
        name: string;
        logo: string;
    }[];
}

interface ServiceProcessForm {
    badge?: string;
    heading: string;
    items: {
        step?: string;
        title: string;
        description?: string;
        icon?: string;
    }[];
}

interface ServiceAdvantagesForm {
    badge?: string;
    heading: string;
    items: {
        title: string;
        description?: string;
        icon?: string;
    }[];
}

interface ServiceFaqsForm {
    badge?: string;
    heading: string;
    items: {
        question: string;
        answer: string;
    }[];
}

interface SettingsIndexProps {
    company: CompanyProfile;
    address: CompanyAddress;
    contacts: CompanyContacts;
    socials: CompanySocials;
    footerCta: FooterCta;
    footerLegal: FooterLegal;
    aboutOverview: AboutOverviewForm;
    aboutVision: AboutVisionForm;
    aboutValues: { icon: string; title: string; description: string }[];
    aboutStatistics: AboutStatisticsForm;
    aboutTeam: AboutTeamForm;
    aboutCta: AboutCtaForm;
    serviceHero: ServiceHeroForm;
    serviceSummary: ServiceSummaryForm;
    serviceOfferings: ServiceOfferingsForm;
    serviceTechStack: ServiceTechStackForm;
    serviceProcess: ServiceProcessForm;
    serviceAdvantages: ServiceAdvantagesForm;
    serviceFaqs: ServiceFaqsForm;
}

export default function SettingsIndex({
    company,
    address,
    contacts,
    socials,
    footerCta,
    footerLegal,
    aboutOverview,
    aboutVision,
    aboutValues,
    aboutStatistics,
    aboutTeam,
    aboutCta,
    serviceHero,
    serviceSummary,
    serviceOfferings,
    serviceTechStack,
    serviceProcess,
    serviceAdvantages,
    serviceFaqs,
}: SettingsIndexProps) {
    const companyForm = useForm(company);
    const addressForm = useForm(address);
    const contactsForm = useForm(contacts);
    const socialsForm = useForm(socials);
    const footerCtaForm = useForm(footerCta);
    const footerLegalForm = useForm(footerLegal);
    const aboutOverviewForm = useForm<AboutOverviewForm>(aboutOverview);
    const aboutVisionForm = useForm<AboutVisionForm>(aboutVision);
    const aboutValuesForm = useForm({ values: aboutValues });
    const aboutStatisticsForm = useForm<AboutStatisticsForm>(aboutStatistics);
    const aboutTeamForm = useForm<AboutTeamForm>(aboutTeam);
    const aboutCtaForm = useForm<AboutCtaForm>(aboutCta);
    const serviceHeroForm = useForm<ServiceHeroForm>(serviceHero);
    const serviceSummaryForm = useForm<ServiceSummaryForm>(serviceSummary);
    const serviceOfferingsForm = useForm<ServiceOfferingsForm>(serviceOfferings);
    const serviceTechStackForm = useForm<ServiceTechStackForm>(serviceTechStack);
    const serviceProcessForm = useForm<ServiceProcessForm>(serviceProcess);
    const serviceAdvantagesForm = useForm<ServiceAdvantagesForm>(serviceAdvantages);
    const serviceFaqsForm = useForm<ServiceFaqsForm>(serviceFaqs);

    const submitCompany: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        companyForm.post(route('admin.settings.company.update'), {
            preserveScroll: true,
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

    const submitAboutOverview: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        aboutOverviewForm.post(route('admin.settings.about.overview.update'), {
            preserveScroll: true,
        });
    };

    const submitAboutVision: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        aboutVisionForm.post(route('admin.settings.about.vision.update'), {
            preserveScroll: true,
        });
    };

    const submitAboutValues: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        aboutValuesForm.post(route('admin.settings.about.values.update'), {
            preserveScroll: true,
        });
    };

    const submitAboutStatistics: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        aboutStatisticsForm.post(route('admin.settings.about.statistics.update'), {
            preserveScroll: true,
        });
    };

    const submitAboutTeam: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        aboutTeamForm.post(route('admin.settings.about.team.update'), {
            preserveScroll: true,
        });
    };

    const submitAboutCta: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        aboutCtaForm.post(route('admin.settings.about.cta.update'), {
            preserveScroll: true,
        });
    };

    const submitServiceHero: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        serviceHeroForm.post(route('admin.settings.service.hero.update'), {
            preserveScroll: true,
        });
    };

    const submitServiceSummary: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        serviceSummaryForm.post(route('admin.settings.service.summary.update'), {
            preserveScroll: true,
        });
    };

    const submitServiceOfferings: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        serviceOfferingsForm.post(route('admin.settings.service.offerings.update'), {
            preserveScroll: true,
        });
    };

    const submitServiceTechStack: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        serviceTechStackForm.post(route('admin.settings.service.tech-stack.update'), {
            preserveScroll: true,
        });
    };

    const submitServiceProcess: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        serviceProcessForm.post(route('admin.settings.service.process.update'), {
            preserveScroll: true,
        });
    };

    const submitServiceAdvantages: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        serviceAdvantagesForm.post(route('admin.settings.service.advantages.update'), {
            preserveScroll: true,
        });
    };

    const submitServiceFaqs: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        serviceFaqsForm.post(route('admin.settings.service.faqs.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Setting Konten" />

            <div className="space-y-6 p-4">
                <section className="space-y-4">
                    <header>
                        <h1 className="text-2xl font-semibold">Setting Konten</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola profil dan informasi perusahaan yang ditampilkan ke publik.
                        </p>
                    </header>

                    <form onSubmit={submitCompany} className="space-y-4">
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
                            </CardContent>
                            <CardFooter className="flex items-center justify-between gap-2">
                                {companyForm.recentlySuccessful ? (
                                    <p className="text-sm text-muted-foreground">Tersimpan.</p>
                                ) : (
                                    <span />
                                )}
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
                                {addressForm.recentlySuccessful ? (
                                    <p className="text-sm text-muted-foreground">Tersimpan.</p>
                                ) : (
                                    <span />
                                )}
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
                            </CardContent>
                            <CardFooter className="flex items-center justify-between gap-2">
                                {contactsForm.recentlySuccessful ? (
                                    <p className="text-sm text-muted-foreground">Tersimpan.</p>
                                ) : (
                                    <span />
                                )}
                                <Button type="submit" disabled={contactsForm.processing}>
                                    {contactsForm.processing ? 'Menyimpan...' : 'Simpan kontak'}
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
                                {socialsForm.recentlySuccessful ? (
                                    <p className="text-sm text-muted-foreground">Tersimpan.</p>
                                ) : (
                                    <span />
                                )}
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
                                CTA dan tautan legal footer dapat diatur di sini. Informasi profil dan kontak otomatis mengikuti data perusahaan di atas.
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
                                    {footerCtaForm.recentlySuccessful ? (
                                        <p className="text-sm text-muted-foreground">Tersimpan.</p>
                                    ) : (
                                        <span />
                                    )}
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
                                    {footerLegalForm.recentlySuccessful ? (
                                        <p className="text-sm text-muted-foreground">Tersimpan.</p>
                                    ) : (
                                        <span />
                                    )}
                                    <Button type="submit" disabled={footerLegalForm.processing}>
                                        {footerLegalForm.processing ? 'Menyimpan...' : 'Simpan tautan'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </div>

                    <div className="space-y-6">
                        <header className="mt-8">
                            <h2 className="text-xl font-semibold">Halaman Tentang Kami</h2>
                            <p className="text-sm text-muted-foreground">
                                Atur konten yang ditampilkan pada halaman Tentang Kami agar sesuai dengan profil perusahaan.
                            </p>
                        </header>

                        <form onSubmit={submitAboutOverview} className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Section Profil</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="about-overview-badge">Label</Label>
                                            <Input
                                                id="about-overview-badge"
                                                value={aboutOverviewForm.data.badge ?? ''}
                                                onChange={(event) => aboutOverviewForm.setData('badge', event.target.value)}
                                            />
                                            <InputError message={aboutOverviewForm.errors.badge} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="about-overview-title">Judul</Label>
                                            <Input
                                                id="about-overview-title"
                                                value={aboutOverviewForm.data.title ?? ''}
                                                onChange={(event) => aboutOverviewForm.setData('title', event.target.value)}
                                            />
                                            <InputError message={aboutOverviewForm.errors.title} />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="about-overview-heading">Heading</Label>
                                        <Textarea
                                            id="about-overview-heading"
                                            value={aboutOverviewForm.data.heading ?? ''}
                                            onChange={(event) => aboutOverviewForm.setData('heading', event.target.value)}
                                        />
                                        <InputError message={aboutOverviewForm.errors.heading as string} />
                                    </div>
                                    <div className="space-y-3">
                                        <Label>Paragraf</Label>
                                        {aboutOverviewForm.data.paragraphs.map((paragraph, index) => (
                                            <div key={`overview-paragraph-${index}`} className="space-y-1">
                                                <Textarea
                                                    value={paragraph}
                                                    onChange={(event) => {
                                                        const paragraphs = [...aboutOverviewForm.data.paragraphs];
                                                        paragraphs[index] = event.target.value;
                                                        aboutOverviewForm.setData('paragraphs', paragraphs);
                                                    }}
                                                />
                                                <div className="flex justify-between text-xs text-muted-foreground">
                                                    <span>{`Paragraf ${index + 1}`}</span>
                                                    {aboutOverviewForm.data.paragraphs.length > 1 && (
                                                        <button
                                                            type="button"
                                                            className="text-red-500"
                                                            onClick={() => {
                                                                aboutOverviewForm.setData(
                                                                    'paragraphs',
                                                                    aboutOverviewForm.data.paragraphs.filter((_, idx) => idx !== index),
                                                                );
                                                            }}
                                                        >
                                                            Hapus
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                aboutOverviewForm.setData('paragraphs', [...aboutOverviewForm.data.paragraphs, ''])
                                            }
                                        >
                                            Tambah paragraf
                                        </Button>
                                    </div>
                                    <div className="space-y-3">
                                        <Label>Statistik Singkat</Label>
                                        {aboutOverviewForm.data.stats.map((stat, index) => (
                                            <div key={`overview-stat-${index}`} className="grid gap-2 md:grid-cols-2">
                                                <Input
                                                    placeholder="Contoh: 200+"
                                                    value={stat.value}
                                                    onChange={(event) => {
                                                        const stats = [...aboutOverviewForm.data.stats];
                                                        stats[index] = { ...stats[index], value: event.target.value };
                                                        aboutOverviewForm.setData('stats', stats);
                                                    }}
                                                />
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        placeholder="Label"
                                                        value={stat.label}
                                                        onChange={(event) => {
                                                            const stats = [...aboutOverviewForm.data.stats];
                                                            stats[index] = { ...stats[index], label: event.target.value };
                                                            aboutOverviewForm.setData('stats', stats);
                                                        }}
                                                    />
                                                    {aboutOverviewForm.data.stats.length > 1 && (
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                aboutOverviewForm.setData(
                                                                    'stats',
                                                                    aboutOverviewForm.data.stats.filter((_, idx) => idx !== index),
                                                                )
                                                            }
                                                        >
                                                            Hapus
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                aboutOverviewForm.setData('stats', [...aboutOverviewForm.data.stats, { value: '', label: '' }])
                                            }
                                        >
                                            Tambah statistik
                                        </Button>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="about-overview-image">URL Gambar</Label>
                                        <Input
                                            id="about-overview-image"
                                            value={aboutOverviewForm.data.image ?? ''}
                                            onChange={(event) => aboutOverviewForm.setData('image', event.target.value)}
                                        />
                                        <InputError message={aboutOverviewForm.errors.image} />
                                    </div>
                                    <div className="space-y-3">
                                        <Label>Highlight</Label>
                                        {aboutOverviewForm.data.highlights.map((highlight, index) => (
                                            <div key={`overview-highlight-${index}`} className="grid gap-2 md:grid-cols-3">
                                                <Select
                                                    value={highlight.icon}
                                                    onValueChange={(value) => {
                                                        const highlights = [...aboutOverviewForm.data.highlights];
                                                        highlights[index] = { ...highlights[index], icon: value };
                                                        aboutOverviewForm.setData('highlights', highlights);
                                                    }}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Ikon" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="zap">Inovasi</SelectItem>
                                                        <SelectItem value="award">Kualitas</SelectItem>
                                                        <SelectItem value="users">Kolaborasi</SelectItem>
                                                        <SelectItem value="briefcase">Profesional</SelectItem>
                                                        <SelectItem value="handshake">Integritas</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Input
                                                    placeholder="Judul"
                                                    value={highlight.title}
                                                    onChange={(event) => {
                                                        const highlights = [...aboutOverviewForm.data.highlights];
                                                        highlights[index] = { ...highlights[index], title: event.target.value };
                                                        aboutOverviewForm.setData('highlights', highlights);
                                                    }}
                                                />
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        placeholder="Deskripsi"
                                                        value={highlight.description}
                                                        onChange={(event) => {
                                                            const highlights = [...aboutOverviewForm.data.highlights];
                                                            highlights[index] = { ...highlights[index], description: event.target.value };
                                                            aboutOverviewForm.setData('highlights', highlights);
                                                        }}
                                                    />
                                                    {aboutOverviewForm.data.highlights.length > 1 && (
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                aboutOverviewForm.setData(
                                                                    'highlights',
                                                                    aboutOverviewForm.data.highlights.filter((_, idx) => idx !== index),
                                                                )
                                                            }
                                                        >
                                                            Hapus
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                aboutOverviewForm.setData('highlights', [
                                                    ...aboutOverviewForm.data.highlights,
                                                    { icon: 'zap', title: '', description: '' },
                                                ])
                                            }
                                        >
                                            Tambah highlight
                                        </Button>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-between gap-2">
                                    {aboutOverviewForm.recentlySuccessful ? (
                                        <p className="text-sm text-muted-foreground">Tersimpan.</p>
                                    ) : (
                                        <span />
                                    )}
                                    <Button type="submit" disabled={aboutOverviewForm.processing}>
                                        {aboutOverviewForm.processing ? 'Menyimpan...' : 'Simpan section'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>

                        <form onSubmit={submitAboutVision} className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Visi & Misi</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="about-vision-badge">Label</Label>
                                            <Input
                                                id="about-vision-badge"
                                                value={aboutVisionForm.data.badge ?? ''}
                                                onChange={(event) => aboutVisionForm.setData('badge', event.target.value)}
                                            />
                                            <InputError message={aboutVisionForm.errors.badge} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="about-vision-title">Judul</Label>
                                            <Input
                                                id="about-vision-title"
                                                value={aboutVisionForm.data.title ?? ''}
                                                onChange={(event) => aboutVisionForm.setData('title', event.target.value)}
                                            />
                                            <InputError message={aboutVisionForm.errors.title} />
                                        </div>
                                    </div>
                                    <div className="grid gap-2 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="about-vision-title-text">Judul visi</Label>
                                            <Input
                                                id="about-vision-title-text"
                                                value={aboutVisionForm.data.vision_title ?? ''}
                                                onChange={(event) => aboutVisionForm.setData('vision_title', event.target.value)}
                                            />
                                            <InputError message={aboutVisionForm.errors.vision_title} />
                                            <Textarea
                                                value={aboutVisionForm.data.vision_text ?? ''}
                                                onChange={(event) => aboutVisionForm.setData('vision_text', event.target.value)}
                                            />
                                            <InputError message={aboutVisionForm.errors.vision_text} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="about-mission-title">Judul misi</Label>
                                            <Input
                                                id="about-mission-title"
                                                value={aboutVisionForm.data.mission_title ?? ''}
                                                onChange={(event) => aboutVisionForm.setData('mission_title', event.target.value)}
                                            />
                                            <InputError message={aboutVisionForm.errors.mission_title} />
                                            <Textarea
                                                value={aboutVisionForm.data.mission_text ?? ''}
                                                onChange={(event) => aboutVisionForm.setData('mission_text', event.target.value)}
                                            />
                                            <InputError message={aboutVisionForm.errors.mission_text} />
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-between gap-2">
                                    {aboutVisionForm.recentlySuccessful ? (
                                        <p className="text-sm text-muted-foreground">Tersimpan.</p>
                                    ) : (
                                        <span />
                                    )}
                                    <Button type="submit" disabled={aboutVisionForm.processing}>
                                        {aboutVisionForm.processing ? 'Menyimpan...' : 'Simpan visi & misi'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>

                        <form onSubmit={submitAboutValues} className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Nilai Perusahaan</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {aboutValuesForm.data.values.map((value, index) => (
                                        <div key={`about-value-${index}`} className="grid gap-3 md:grid-cols-[160px_1fr_1fr]">
                                            <Select
                                                value={value.icon}
                                                onValueChange={(selected) => {
                                                    const next = [...aboutValuesForm.data.values];
                                                    next[index] = { ...next[index], icon: selected };
                                                    aboutValuesForm.setData('values', next);
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Ikon" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="zap">Zap</SelectItem>
                                                    <SelectItem value="award">Award</SelectItem>
                                                    <SelectItem value="users">Users</SelectItem>
                                                    <SelectItem value="handshake">Handshake</SelectItem>
                                                    <SelectItem value="briefcase">Briefcase</SelectItem>
                                                    <SelectItem value="heart">Heart</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Input
                                                placeholder="Judul"
                                                value={value.title}
                                                onChange={(event) => {
                                                    const next = [...aboutValuesForm.data.values];
                                                    next[index] = { ...next[index], title: event.target.value };
                                                    aboutValuesForm.setData('values', next);
                                                }}
                                            />
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    placeholder="Deskripsi"
                                                    value={value.description}
                                                    onChange={(event) => {
                                                        const next = [...aboutValuesForm.data.values];
                                                        next[index] = { ...next[index], description: event.target.value };
                                                        aboutValuesForm.setData('values', next);
                                                    }}
                                                />
                                            {aboutValuesForm.data.values.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        aboutValuesForm.setData(
                                                            'values',
                                                            aboutValuesForm.data.values.filter((_, idx) => idx !== index),
                                                        )
                                                    }
                                                >
                                                    Hapus
                                                </Button>
                                            )}
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            aboutValuesForm.setData('values', [
                                                ...aboutValuesForm.data.values,
                                                { icon: 'zap', title: '', description: '' },
                                            ])
                                        }
                                    >
                                        Tambah nilai
                                    </Button>
                                </CardContent>
                                <CardFooter className="flex items-center justify-between gap-2">
                                    {aboutValuesForm.recentlySuccessful ? (
                                        <p className="text-sm text-muted-foreground">Tersimpan.</p>
                                    ) : (
                                        <span />
                                    )}
                                    <Button type="submit" disabled={aboutValuesForm.processing}>
                                        {aboutValuesForm.processing ? 'Menyimpan...' : 'Simpan nilai'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>

                        <form onSubmit={submitAboutStatistics} className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Statistik Perusahaan</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="about-stats-badge">Label</Label>
                                            <Input
                                                id="about-stats-badge"
                                                value={aboutStatisticsForm.data.badge ?? ''}
                                                onChange={(event) => aboutStatisticsForm.setData('badge', event.target.value)}
                                            />
                                            <InputError message={aboutStatisticsForm.errors.badge} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="about-stats-title">Judul</Label>
                                            <Input
                                                id="about-stats-title"
                                                value={aboutStatisticsForm.data.title ?? ''}
                                                onChange={(event) => aboutStatisticsForm.setData('title', event.target.value)}
                                            />
                                            <InputError message={aboutStatisticsForm.errors.title} />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="about-stats-description">Deskripsi</Label>
                                        <Textarea
                                            id="about-stats-description"
                                            value={aboutStatisticsForm.data.description ?? ''}
                                            onChange={(event) => aboutStatisticsForm.setData('description', event.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label>Statistik Utama</Label>
                                        {aboutStatisticsForm.data.primary.map((item, index) => (
                                            <div key={`primary-stat-${index}`} className="grid gap-2 md:grid-cols-2">
                                                <Input
                                                    placeholder="Nilai"
                                                    value={item.value}
                                                    onChange={(event) => {
                                                        const primary = [...aboutStatisticsForm.data.primary];
                                                        primary[index] = { ...primary[index], value: event.target.value };
                                                        aboutStatisticsForm.setData('primary', primary);
                                                    }}
                                                />
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        placeholder="Label"
                                                        value={item.label}
                                                        onChange={(event) => {
                                                            const primary = [...aboutStatisticsForm.data.primary];
                                                            primary[index] = { ...primary[index], label: event.target.value };
                                                            aboutStatisticsForm.setData('primary', primary);
                                                        }}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            aboutStatisticsForm.setData(
                                                                'primary',
                                                                aboutStatisticsForm.data.primary.filter((_, idx) => idx !== index),
                                                            )
                                                        }
                                                    >
                                                        Hapus
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                aboutStatisticsForm.setData('primary', [
                                                    ...aboutStatisticsForm.data.primary,
                                                    { value: '', label: '' },
                                                ])
                                            }
                                        >
                                            Tambah statistik utama
                                        </Button>
                                    </div>
                                    <div className="space-y-3">
                                        <Label>Statistik Tambahan</Label>
                                        {aboutStatisticsForm.data.secondary?.map((item, index) => (
                                            <div key={`secondary-stat-${index}`} className="grid gap-2 md:grid-cols-2">
                                                <Input
                                                    placeholder="Nilai"
                                                    value={item.value}
                                                    onChange={(event) => {
                                                        const secondary = [...(aboutStatisticsForm.data.secondary ?? [])];
                                                        secondary[index] = { ...secondary[index], value: event.target.value };
                                                        aboutStatisticsForm.setData('secondary', secondary);
                                                    }}
                                                />
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        placeholder="Label"
                                                        value={item.label}
                                                        onChange={(event) => {
                                                            const secondary = [...(aboutStatisticsForm.data.secondary ?? [])];
                                                            secondary[index] = { ...secondary[index], label: event.target.value };
                                                            aboutStatisticsForm.setData('secondary', secondary);
                                                        }}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            aboutStatisticsForm.setData(
                                                                'secondary',
                                                                (aboutStatisticsForm.data.secondary ?? []).filter((_, idx) => idx !== index),
                                                            )
                                                        }
                                                    >
                                                        Hapus
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                aboutStatisticsForm.setData('secondary', [
                                                    ...aboutStatisticsForm.data.secondary,
                                                    { value: '', label: '' },
                                                ])
                                            }
                                        >
                                            Tambah statistik tambahan
                                        </Button>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-between gap-2">
                                    {aboutStatisticsForm.recentlySuccessful ? (
                                        <p className="text-sm text-muted-foreground">Tersimpan.</p>
                                    ) : (
                                        <span />
                                    )}
                                    <Button type="submit" disabled={aboutStatisticsForm.processing}>
                                        {aboutStatisticsForm.processing ? 'Menyimpan...' : 'Simpan statistik'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>

                        <form onSubmit={submitAboutTeam} className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Tim Manajemen</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="about-team-badge">Label</Label>
                                            <Input
                                                id="about-team-badge"
                                                value={aboutTeamForm.data.badge ?? ''}
                                                onChange={(event) => aboutTeamForm.setData('badge', event.target.value)}
                                            />
                                            <InputError message={aboutTeamForm.errors.badge} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="about-team-title">Judul</Label>
                                            <Input
                                                id="about-team-title"
                                                value={aboutTeamForm.data.title ?? ''}
                                                onChange={(event) => aboutTeamForm.setData('title', event.target.value)}
                                            />
                                            <InputError message={aboutTeamForm.errors.title} />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="about-team-description">Deskripsi</Label>
                                        <Textarea
                                            id="about-team-description"
                                            value={aboutTeamForm.data.description ?? ''}
                                            onChange={(event) => aboutTeamForm.setData('description', event.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label>Daftar anggota</Label>
                                        {aboutTeamForm.data.members.map((member, index) => (
                                            <div key={`team-member-${index}`} className="space-y-3 rounded-lg border p-4">
                                                <div className="grid gap-2 md:grid-cols-2">
                                                    <Input
                                                        placeholder="Nama"
                                                        value={member.name}
                                                        onChange={(event) => {
                                                            const members = [...aboutTeamForm.data.members];
                                                            members[index] = { ...members[index], name: event.target.value };
                                                            aboutTeamForm.setData('members', members);
                                                        }}
                                                    />
                                                    <Input
                                                        placeholder="Peran"
                                                        value={member.role}
                                                        onChange={(event) => {
                                                            const members = [...aboutTeamForm.data.members];
                                                            members[index] = { ...members[index], role: event.target.value };
                                                            aboutTeamForm.setData('members', members);
                                                        }}
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Input
                                                        placeholder="URL Foto"
                                                        value={member.image}
                                                        onChange={(event) => {
                                                            const members = [...aboutTeamForm.data.members];
                                                            members[index] = { ...members[index], image: event.target.value };
                                                            aboutTeamForm.setData('members', members);
                                                        }}
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Textarea
                                                        placeholder="Deskripsi singkat"
                                                        value={member.description}
                                                        onChange={(event) => {
                                                            const members = [...aboutTeamForm.data.members];
                                                            members[index] = { ...members[index], description: event.target.value };
                                                            aboutTeamForm.setData('members', members);
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex justify-end">
                                                    {aboutTeamForm.data.members.length > 1 && (
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                aboutTeamForm.setData(
                                                                    'members',
                                                                    aboutTeamForm.data.members.filter((_, idx) => idx !== index),
                                                                )
                                                            }
                                                        >
                                                            Hapus anggota
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                aboutTeamForm.setData('members', [
                                                    ...aboutTeamForm.data.members,
                                                    { name: '', role: '', image: '', description: '' },
                                                ])
                                            }
                                        >
                                            Tambah anggota
                                        </Button>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-between gap-2">
                                    {aboutTeamForm.recentlySuccessful ? (
                                        <p className="text-sm text-muted-foreground">Tersimpan.</p>
                                    ) : (
                                        <span />
                                    )}
                                    <Button type="submit" disabled={aboutTeamForm.processing}>
                                        {aboutTeamForm.processing ? 'Menyimpan...' : 'Simpan tim'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>

                        <form onSubmit={submitAboutCta} className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>CTA Halaman Tentang Kami</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="about-cta-badge">Label</Label>
                                            <Input
                                                id="about-cta-badge"
                                                value={aboutCtaForm.data.badge ?? ''}
                                                onChange={(event) => aboutCtaForm.setData('badge', event.target.value)}
                                            />
                                            <InputError message={aboutCtaForm.errors.badge} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="about-cta-heading">Judul</Label>
                                            <Input
                                                id="about-cta-heading"
                                                value={aboutCtaForm.data.heading ?? ''}
                                                onChange={(event) => aboutCtaForm.setData('heading', event.target.value)}
                                            />
                                            <InputError message={aboutCtaForm.errors.heading} />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="about-cta-description">Deskripsi</Label>
                                        <Textarea
                                            id="about-cta-description"
                                            value={aboutCtaForm.data.description ?? ''}
                                            onChange={(event) => aboutCtaForm.setData('description', event.target.value)}
                                        />
                                        <InputError message={aboutCtaForm.errors.description} />
                                    </div>
                                    <div className="grid gap-2 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="about-cta-primary-label">Label tombol utama</Label>
                                            <Input
                                                id="about-cta-primary-label"
                                                value={aboutCtaForm.data.primary_label ?? ''}
                                                onChange={(event) => aboutCtaForm.setData('primary_label', event.target.value)}
                                            />
                                            <InputError message={aboutCtaForm.errors.primary_label} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="about-cta-primary-link">Link tombol utama</Label>
                                            <Input
                                                id="about-cta-primary-link"
                                                value={aboutCtaForm.data.primary_link ?? ''}
                                                onChange={(event) => aboutCtaForm.setData('primary_link', event.target.value)}
                                            />
                                            <InputError message={aboutCtaForm.errors.primary_link} />
                                        </div>
                                    </div>
                                    <div className="grid gap-2 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="about-cta-secondary-label">Label tombol sekunder</Label>
                                            <Input
                                                id="about-cta-secondary-label"
                                                value={aboutCtaForm.data.secondary_label ?? ''}
                                                onChange={(event) => aboutCtaForm.setData('secondary_label', event.target.value)}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="about-cta-secondary-link">Link tombol sekunder</Label>
                                            <Input
                                                id="about-cta-secondary-link"
                                                value={aboutCtaForm.data.secondary_link ?? ''}
                                                onChange={(event) => aboutCtaForm.setData('secondary_link', event.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Label>Kontak tambahan</Label>
                                        {aboutCtaForm.data.contacts.map((item, index) => (
                                            <div key={`about-cta-contact-${index}`} className="grid gap-3 md:grid-cols-[160px_1fr_1fr]">
                                                <Select
                                                    value={item.icon}
                                                    onValueChange={(value) => {
                                                        const contacts = [...aboutCtaForm.data.contacts];
                                                        contacts[index] = { ...contacts[index], icon: value };
                                                        aboutCtaForm.setData('contacts', contacts);
                                                    }}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Ikon" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="phone">Telepon</SelectItem>
                                                        <SelectItem value="mail">Email</SelectItem>
                                                        <SelectItem value="clock">Jam Kerja</SelectItem>
                                                        <SelectItem value="map-pin">Lokasi</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Input
                                                    placeholder="Judul"
                                                    value={item.title}
                                                    onChange={(event) => {
                                                        const contacts = [...aboutCtaForm.data.contacts];
                                                        contacts[index] = { ...contacts[index], title: event.target.value };
                                                        aboutCtaForm.setData('contacts', contacts);
                                                    }}
                                                />
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        placeholder="Detail"
                                                        value={item.detail}
                                                        onChange={(event) => {
                                                            const contacts = [...aboutCtaForm.data.contacts];
                                                            contacts[index] = { ...contacts[index], detail: event.target.value };
                                                            aboutCtaForm.setData('contacts', contacts);
                                                        }}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            aboutCtaForm.setData(
                                                                'contacts',
                                                                aboutCtaForm.data.contacts.filter((_, idx) => idx !== index),
                                                            )
                                                        }
                                                    >
                                                        Hapus
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                aboutCtaForm.setData('contacts', [
                                                    ...aboutCtaForm.data.contacts,
                                                    { icon: 'phone', title: '', detail: '' },
                                                ])
                                            }
                                        >
                                            Tambah kontak CTA
                                        </Button>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-between gap-2">
                                    {aboutCtaForm.recentlySuccessful ? (
                                        <p className="text-sm text-muted-foreground">Tersimpan.</p>
                                    ) : (
                                        <span />
                                    )}
                                    <Button type="submit" disabled={aboutCtaForm.processing}>
                                        {aboutCtaForm.processing ? 'Menyimpan...' : 'Simpan CTA'}
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
