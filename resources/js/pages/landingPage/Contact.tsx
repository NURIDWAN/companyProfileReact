import { RecaptchaField, type RecaptchaFieldHandle } from '@/components/RecaptchaField';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import LandingPageLayout from '@/layouts/landingPage-layouts';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Globe, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Youtube } from 'lucide-react';
import React from 'react';

type SettingsProps = {
    settings?: Record<string, unknown>;
    branding?: {
        name?: string;
        tagline?: string;
    };
    companyAddress?: CompanyAddress;
    companyContacts?: CompanyContacts;
    companySocials?: CompanySocials;
};

type CompanyAddress = {
    line1?: string;
    city?: string;
    province?: string;
    postal_code?: string;
};

type CompanyContacts = {
    phone?: string;
    email?: string;
    whatsapp?: string;
    map_label?: string;
    map_embed_url?: string;
};

type CompanySocials = {
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    website?: string;
};

type SectionKey = 'hero' | 'info';
type SectionVisibility = Partial<Record<SectionKey, boolean>>;

type ContactPageProps = SettingsProps & {
    flash?: { success?: string };
    sections?: SectionVisibility;
};

export default function ContactPage() {
    const { settings, branding, companyAddress, companyContacts, companySocials, flash, sections } = usePage<ContactPageProps>().props;
    const visibility = sections ?? {};
    const isEnabled = (key: SectionKey) => visibility[key] ?? true;
    const companyName = (settings?.['company.name'] as string | undefined) ?? branding?.name ?? 'Harmony Strategic Group';
    const tagline =
        (settings?.['company.tagline'] as string | undefined) ?? branding?.tagline ?? 'Kami siap membantu menjawab kebutuhan bisnis Anda.';

    const addressSetting = (settings?.['company.address'] as CompanyAddress | undefined) ?? companyAddress ?? {};
    const contactsSetting = (settings?.['company.contacts'] as CompanyContacts | undefined) ?? companyContacts ?? {};

    const addressParts = [addressSetting.line1, addressSetting.city, addressSetting.province, addressSetting.postal_code].filter(Boolean).join(', ');
    const mapLabel = contactsSetting.map_label ?? 'Lokasi';
    const mapEmbedUrl = contactsSetting.map_embed_url;

    const recaptchaEnabled = import.meta.env.VITE_RECAPTCHA_ENABLED !== 'false';
    const recaptchaRef = React.useRef<RecaptchaFieldHandle>(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        recaptcha_token: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('contact.store'), {
            onSuccess: () => {
                reset();
            },
            onFinish: () => {
                if (recaptchaEnabled) {
                    recaptchaRef.current?.reset();
                }
                setData('recaptcha_token', '');
            },
        });
    }

    return (
        <>
            <LandingPageLayout>
                <Head title="Kontak" />
                <div className="container mx-auto space-y-6 px-4 py-12">
                    {flash?.success && (
                        <Alert className="border-green-200 bg-green-50 text-green-800">
                            <AlertDescription>{flash.success}</AlertDescription>
                        </Alert>
                    )}
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Left column: Info */}
                        <Card className="p-6 shadow-lg lg:col-span-1">
                            <CardHeader>
                                <CardTitle>Kontak Kami</CardTitle>
                                <CardDescription>{tagline}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-2">
                                <div className="flex items-start gap-4">
                                    <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-gray-100">Alamat</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{addressParts || 'Alamat belum ditentukan'}</p>
                                    </div>
                                </div>

                                {contactsSetting.phone && (
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
                                            <Phone className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-gray-100">Telepon</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{contactsSetting.phone}</p>
                                        </div>
                                    </div>
                                )}

                                {contactsSetting.whatsapp && (
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-lg bg-green-50 p-2 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                                            <MessageCircle className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-gray-100">WhatsApp</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{contactsSetting.whatsapp}</p>
                                        </div>
                                    </div>
                                )}

                                {contactsSetting.email && (
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-lg bg-purple-50 p-2 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-gray-100">Email</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{contactsSetting.email}</p>
                                        </div>
                                    </div>
                                )}

                                <Separator />

                                {(companySocials?.linkedin || companySocials?.instagram || companySocials?.youtube || companySocials?.website) && (
                                    <div className="space-y-3">
                                        <p className="font-medium">Media Sosial</p>
                                        <div className="flex gap-3">
                                            {companySocials.instagram && (
                                                <a
                                                    href={companySocials.instagram}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="rounded-full bg-pink-50 p-2 text-pink-600 transition-colors hover:bg-pink-100 dark:bg-pink-900/20 dark:text-pink-400 dark:hover:bg-pink-900/40"
                                                >
                                                    <Instagram className="h-5 w-5" />
                                                </a>
                                            )}
                                            {companySocials.linkedin && (
                                                <a
                                                    href={companySocials.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="rounded-full bg-blue-50 p-2 text-blue-700 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40"
                                                >
                                                    <Linkedin className="h-5 w-5" />
                                                </a>
                                            )}
                                            {companySocials.youtube && (
                                                <a
                                                    href={companySocials.youtube}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="rounded-full bg-red-50 p-2 text-red-600 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40"
                                                >
                                                    <Youtube className="h-5 w-5" />
                                                </a>
                                            )}
                                            {companySocials.website && (
                                                <a
                                                    href={companySocials.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="rounded-full bg-slate-50 p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                                                >
                                                    <Globe className="h-5 w-5" />
                                                </a>
                                            )}
                                        </div>
                                        <Separator className="mt-4" />
                                    </div>
                                )}

                                <div>
                                    <p className="font-medium">Jam Operasional</p>
                                    <p className="text-sm text-muted-foreground">Senin - Jumat: 09:00 - 17:00</p>
                                </div>

                                <Separator />

                                <div className="mt-2">
                                    <p className="mb-2 font-medium">{mapLabel}</p>
                                    {mapEmbedUrl ? (
                                        <div className="aspect-video w-full overflow-hidden rounded-md bg-slate-100">
                                            <iframe
                                                title="map"
                                                src={mapEmbedUrl}
                                                className="h-full w-full border-0"
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            ></iframe>
                                        </div>
                                    ) : (
                                        <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
                                            Lokasi belum ditentukan. Silakan tambahkan URL embed Google Maps melalui menu pengaturan konten.
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Right column: Form */}
                        <Card className="p-6 shadow-lg lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Kirim Pesan</CardTitle>
                                <CardDescription>Isi form berikut untuk mengirimkan pesan kepada tim {companyName}.</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <Label htmlFor="name">Nama</Label>
                                            <Input
                                                id="name"
                                                placeholder="Nama lengkap"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                            />
                                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="email@contoh.com"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="phone">Telepon (opsional)</Label>
                                        <Input
                                            id="phone"
                                            placeholder="08xxxxxxxxxx"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                        />
                                        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="subject">Subjek (opsional)</Label>
                                        <Input
                                            id="subject"
                                            placeholder="Judul singkat pesan Anda"
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                        />
                                        {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="message">Pesan</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Tulis pesan Anda di sini..."
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            rows={6}
                                        />
                                        {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                                    </div>

                                    {recaptchaEnabled ? (
                                        <RecaptchaField
                                            ref={recaptchaRef}
                                            className="mt-2"
                                            onVerify={(token) => setData('recaptcha_token', token ?? '')}
                                            error={errors.recaptcha_token}
                                        />
                                    ) : null}
                                    <div className="flex flex-col gap-2 pt-4 sm:flex-row sm:items-center sm:gap-3">
                                        <Button type="submit" disabled={processing}>
                                            {processing ? 'Mengirim...' : 'Kirim Pesan'}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            type="button"
                                            onClick={() => {
                                                reset();
                                                if (recaptchaEnabled) {
                                                    recaptchaRef.current?.reset();
                                                }
                                            }}
                                        >
                                            Reset
                                        </Button>
                                        {flash?.success && <p className="text-sm font-medium text-emerald-600">{flash.success}</p>}
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </LandingPageLayout>
        </>
    );
}
