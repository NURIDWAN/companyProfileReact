import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Mail, MapPin, Phone } from "lucide-react";
import LandingPageLayout from "@/layouts/landingPage-layouts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RecaptchaField, type RecaptchaFieldHandle } from '@/components/RecaptchaField';

type SettingsProps = {
  settings?: Record<string, unknown>;
  branding?: {
    name?: string;
    tagline?: string;
  };
  companyAddress?: CompanyAddress;
  companyContacts?: CompanyContacts;
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
};

export default function ContactPage() {
  const { settings, branding, companyAddress, companyContacts, flash } = usePage<SettingsProps & { flash?: { success?: string } }>().props;
  const companyName = (settings?.["company.name"] as string | undefined)
    ?? branding?.name
    ?? "Harmony Strategic Group";
  const tagline = (settings?.["company.tagline"] as string | undefined)
    ?? branding?.tagline
    ?? "Kami siap membantu menjawab kebutuhan bisnis Anda.";

  const addressSetting = (settings?.["company.address"] as CompanyAddress | undefined)
    ?? companyAddress
    ?? {};
  const contactsSetting = (settings?.["company.contacts"] as CompanyContacts | undefined)
    ?? companyContacts
    ?? {};

  const addressParts = [addressSetting.line1, addressSetting.city, addressSetting.province, addressSetting.postal_code]
    .filter(Boolean)
    .join(", ");

  const recaptchaEnabled = import.meta.env.VITE_RECAPTCHA_ENABLED !== 'false';
  const recaptchaRef = React.useRef<RecaptchaFieldHandle>(null);

  const { data, setData, post, processing, reset, errors } = useForm({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    recaptcha_token: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    post(route("contact.store"), {
      onSuccess: () => {
        reset();
      },
      onFinish: () => {
        if (recaptchaEnabled) {
          recaptchaRef.current?.reset();
        }
        setData("recaptcha_token", "");
      },
    });
  }

  return (
    <>
    <LandingPageLayout >
      <Head title="Kontak" />
      <div className="container mx-auto px-4 py-12 space-y-6">
        {flash?.success && (
          <Alert className="border-green-200 bg-green-50 text-green-800">
            <AlertDescription>{flash.success}</AlertDescription>
          </Alert>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: Info */}
          <Card className="lg:col-span-1 p-6 shadow-lg">
            <CardHeader>
              <CardTitle>Kontak Kami</CardTitle>
              <CardDescription>
                {tagline}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1" />
                <div>
                  <p className="font-medium">Alamat</p>
                  <p className="text-sm text-muted-foreground">
                    {addressParts || "Alamat belum ditentukan"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-1" />
                <div>
                  <p className="font-medium">Telepon</p>
                  <p className="text-sm text-muted-foreground">
                    {contactsSetting.phone || contactsSetting.whatsapp || "-"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-1" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">
                    {contactsSetting.email || "-"}
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="font-medium">Jam Operasional</p>
                <p className="text-sm text-muted-foreground">Senin - Jumat: 09:00 - 17:00</p>
              </div>

              <Separator />

              <div className="mt-2">
                <p className="font-medium mb-2">Lokasi</p>
                <div className="aspect-video w-full rounded-md overflow-hidden">
                  <iframe
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126915.123456789!2d106.700!3d-6.200"
                    className="w-full h-full"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right column: Form */}
          <Card className="lg:col-span-2 p-6 shadow-lg">
            <CardHeader>
              <CardTitle>Kirim Pesan</CardTitle>
              <CardDescription>Isi form berikut untuk mengirimkan pesan kepada tim {companyName}.</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nama</Label>
                    <Input
                      id="name"
                      placeholder="Nama lengkap"
                      value={data.name}
                      onChange={(e) => setData("name", e.target.value)}
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
                      onChange={(e) => setData("email", e.target.value)}
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
                    onChange={(e) => setData("phone", e.target.value)}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="subject">Subjek (opsional)</Label>
                  <Input
                    id="subject"
                    placeholder="Judul singkat pesan Anda"
                    value={data.subject}
                    onChange={(e) => setData("subject", e.target.value)}
                  />
                  {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
                </div>

                <div>
                  <Label htmlFor="message">Pesan</Label>
                  <Textarea
                    id="message"
                    placeholder="Tulis pesan Anda di sini..."
                    value={data.message}
                    onChange={(e) => setData("message", e.target.value)}
                    rows={6}
                  />
                  {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                </div>

                {recaptchaEnabled ? (
                  <RecaptchaField
                    ref={recaptchaRef}
                    className="mt-2"
                    onVerify={(token) => setData("recaptcha_token", token ?? "")}
                    error={errors.recaptcha_token}
                  />
                ) : null}
                <div className="flex flex-col gap-2 pt-4 sm:flex-row sm:items-center sm:gap-3">
                  <Button type="submit" disabled={processing}>
                    {processing ? "Mengirim..." : "Kirim Pesan"}
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
                  {flash?.success && (
                    <p className="text-sm font-medium text-emerald-600">{flash.success}</p>
                  )}
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
