import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormEventHandler } from 'react';

interface HeroContent {
    heading?: string | null;
    subheading?: string | null;
    primary_label?: string | null;
    primary_link?: string | null;
    secondary_label?: string | null;
    secondary_link?: string | null;
    image?: string | null;
    image_url?: string | null;
}

interface AboutContent {
    title?: string | null;
    description?: string | null;
    highlights?: string[];
    image?: string | null;
    image_url?: string | null;
}

interface FinalCtaContent {
    heading?: string | null;
    description?: string | null;
    button_label?: string | null;
    button_link?: string | null;
}

interface LandingContentProps {
    hero: HeroContent;
    about: AboutContent;
    finalCta: FinalCtaContent;
    metrics: Array<{ value: string; label: string }>;
}

export default function LandingContentPage({ hero, about, finalCta, metrics }: LandingContentProps) {
    const heroForm = useForm({
        heading: hero.heading ?? '',
        subheading: hero.subheading ?? '',
        primary_label: hero.primary_label ?? '',
        primary_link: hero.primary_link ?? '',
        secondary_label: hero.secondary_label ?? '',
        secondary_link: hero.secondary_link ?? '',
        image: null as File | null,
    });

    const aboutForm = useForm({
        title: about.title ?? '',
        description: about.description ?? '',
        highlights: (about.highlights ?? []).join('\n'),
        image: null as File | null,
    });

    const ctaForm = useForm({
        heading: finalCta.heading ?? '',
        description: finalCta.description ?? '',
        button_label: finalCta.button_label ?? '',
        button_link: finalCta.button_link ?? '',
    });

    const metricsForm = useForm({
        metrics: metrics.map((metric) => `${metric.value}|${metric.label}`).join('\n'),
    });

    const submitHero: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        heroForm.post(route('admin.landing.hero'), {
            forceFormData: true,
        });
    };

    const submitAbout: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        aboutForm.post(route('admin.landing.about.update'), {
            forceFormData: true,
        });
    };

    const submitCta: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        ctaForm.post(route('admin.landing.cta.update'));
    };

    const submitMetrics: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        metricsForm.post(route('admin.landing.metrics.update'));
    };

    return (
        <AppLayout>
            <div className="space-y-8 p-4">
                <form onSubmit={submitHero} encType="multipart/form-data">
                    <Card>
                    <CardHeader>
                        <CardTitle>Hero Section</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2 md:col-span-2">
                            <Label htmlFor="hero-heading">Judul</Label>
                            <Input
                                id="hero-heading"
                                value={heroForm.data.heading}
                                onChange={(event) => heroForm.setData('heading', event.target.value)}
                            />
                            {heroForm.errors.heading && <p className="text-xs text-rose-500">{heroForm.errors.heading}</p>}
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label htmlFor="hero-subheading">Deskripsi</Label>
                            <Textarea
                                id="hero-subheading"
                                value={heroForm.data.subheading}
                                onChange={(event) => heroForm.setData('subheading', event.target.value)}
                            />
                            {heroForm.errors.subheading && <p className="text-xs text-rose-500">{heroForm.errors.subheading}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="hero-primary-label">Label Tombol Utama</Label>
                            <Input
                                id="hero-primary-label"
                                value={heroForm.data.primary_label}
                                onChange={(event) => heroForm.setData('primary_label', event.target.value)}
                            />
                            {heroForm.errors.primary_label && <p className="text-xs text-rose-500">{heroForm.errors.primary_label}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="hero-primary-link">Link Tombol Utama</Label>
                            <Input
                                id="hero-primary-link"
                                value={heroForm.data.primary_link}
                                onChange={(event) => heroForm.setData('primary_link', event.target.value)}
                            />
                            {heroForm.errors.primary_link && <p className="text-xs text-rose-500">{heroForm.errors.primary_link}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="hero-secondary-label">Label Tombol Sekunder</Label>
                            <Input
                                id="hero-secondary-label"
                                value={heroForm.data.secondary_label}
                                onChange={(event) => heroForm.setData('secondary_label', event.target.value)}
                            />
                            {heroForm.errors.secondary_label && (
                                <p className="text-xs text-rose-500">{heroForm.errors.secondary_label}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="hero-secondary-link">Link Tombol Sekunder</Label>
                            <Input
                                id="hero-secondary-link"
                                value={heroForm.data.secondary_link}
                                onChange={(event) => heroForm.setData('secondary_link', event.target.value)}
                            />
                            {heroForm.errors.secondary_link && (
                                <p className="text-xs text-rose-500">{heroForm.errors.secondary_link}</p>
                            )}
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label htmlFor="hero-image">Gambar Hero</Label>
                            <Input
                                id="hero-image"
                                type="file"
                                accept="image/*"
                                onChange={(event) => heroForm.setData('image', event.target.files?.[0] ?? null)}
                            />
                            {heroForm.errors.image && <p className="text-xs text-rose-500">{heroForm.errors.image}</p>}
                            {hero.image_url && (
                                <img src={hero.image_url} alt="Hero" className="mt-2 h-32 w-auto rounded-md object-cover" />
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="justify-end">
                        <Button type="submit" disabled={heroForm.processing}>
                            Simpan Hero
                        </Button>
                    </CardFooter>
                    </Card>
                </form>

                <form onSubmit={submitAbout} encType="multipart/form-data">
                    <Card>
                    <CardHeader>
                        <CardTitle>Section Tentang Kami</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="about-title">Judul</Label>
                            <Input
                                id="about-title"
                                value={aboutForm.data.title}
                                onChange={(event) => aboutForm.setData('title', event.target.value)}
                            />
                            {aboutForm.errors.title && <p className="text-xs text-rose-500">{aboutForm.errors.title}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="about-description">Deskripsi</Label>
                            <Textarea
                                id="about-description"
                                value={aboutForm.data.description}
                                onChange={(event) => aboutForm.setData('description', event.target.value)}
                            />
                            {aboutForm.errors.description && (
                                <p className="text-xs text-rose-500">{aboutForm.errors.description}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="about-highlights">Highlight (satu per baris)</Label>
                            <Textarea
                                id="about-highlights"
                                value={aboutForm.data.highlights}
                                onChange={(event) => aboutForm.setData('highlights', event.target.value)}
                            />
                            {aboutForm.errors.highlights && (
                                <p className="text-xs text-rose-500">{aboutForm.errors.highlights}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="about-image">Gambar</Label>
                            <Input
                                id="about-image"
                                type="file"
                                accept="image/*"
                                onChange={(event) => aboutForm.setData('image', event.target.files?.[0] ?? null)}
                            />
                            {aboutForm.errors.image && <p className="text-xs text-rose-500">{aboutForm.errors.image}</p>}
                            {about.image_url && (
                                <img src={about.image_url} alt="About" className="mt-2 h-32 w-auto rounded-md object-cover" />
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="justify-end">
                        <Button type="submit" disabled={aboutForm.processing}>
                            Simpan Tentang Kami
                        </Button>
                    </CardFooter>
                    </Card>
                </form>

                <form onSubmit={submitCta}>
                    <Card>
                    <CardHeader>
                        <CardTitle>Call to Action</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="cta-heading">Judul</Label>
                            <Input
                                id="cta-heading"
                                value={ctaForm.data.heading}
                                onChange={(event) => ctaForm.setData('heading', event.target.value)}
                            />
                            {ctaForm.errors.heading && <p className="text-xs text-rose-500">{ctaForm.errors.heading}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="cta-description">Deskripsi</Label>
                            <Textarea
                                id="cta-description"
                                value={ctaForm.data.description}
                                onChange={(event) => ctaForm.setData('description', event.target.value)}
                            />
                            {ctaForm.errors.description && <p className="text-xs text-rose-500">{ctaForm.errors.description}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="cta-button-label">Label Tombol</Label>
                            <Input
                                id="cta-button-label"
                                value={ctaForm.data.button_label}
                                onChange={(event) => ctaForm.setData('button_label', event.target.value)}
                            />
                            {ctaForm.errors.button_label && (
                                <p className="text-xs text-rose-500">{ctaForm.errors.button_label}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="cta-button-link">Link Tombol</Label>
                            <Input
                                id="cta-button-link"
                                value={ctaForm.data.button_link}
                                onChange={(event) => ctaForm.setData('button_link', event.target.value)}
                            />
                            {ctaForm.errors.button_link && <p className="text-xs text-rose-500">{ctaForm.errors.button_link}</p>}
                        </div>
                    </CardContent>
                    <CardFooter className="justify-end">
                        <Button type="submit" disabled={ctaForm.processing}>
                            Simpan CTA
                        </Button>
                    </CardFooter>
                    </Card>
                </form>

                <form onSubmit={submitMetrics}>
                    <Card>
                    <CardHeader>
                        <CardTitle>Statistik Landing</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                        <Label htmlFor="metrics">Daftar Statistik (format: nilai|deskripsi)</Label>
                        <Textarea
                            id="metrics"
                            value={metricsForm.data.metrics}
                            onChange={(event) => metricsForm.setData('metrics', event.target.value)}
                            rows={4}
                        />
                        <p className="text-xs text-muted-foreground">
                            Contoh:
                            <br />100+|Klien Dipercaya
                            <br />25+|Solusi Produk
                        </p>
                        {metricsForm.errors.metrics && <p className="text-xs text-rose-500">{metricsForm.errors.metrics}</p>}
                    </CardContent>
                    <CardFooter className="justify-end">
                        <Button type="submit" disabled={metricsForm.processing}>
                            Simpan Statistik
                        </Button>
                    </CardFooter>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
