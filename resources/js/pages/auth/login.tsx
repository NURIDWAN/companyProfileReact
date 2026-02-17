import InputError from '@/components/input-error';
import { RecaptchaField, type RecaptchaFieldHandle } from '@/components/RecaptchaField';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthSplitLayout from '@/layouts/auth/auth-split-layout';
import type { CompanyContactsInfo, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle, Lock, ShieldCheck, Sparkles } from 'lucide-react';
import { FormEventHandler, useCallback, useRef } from 'react';

interface LoginProps {
    status?: string;
}

type LoginPageProps = SharedData & {
    settings?: Record<string, unknown>;
};

const recaptchaEnabled = import.meta.env.VITE_RECAPTCHA_ENABLED !== 'false';
const highlights = [
    {
        title: 'Keamanan Berlapis',
        description: 'TLS, pembatasan IP, dan audit login berkala menjaga data aman.',
        icon: ShieldCheck,
    },
    {
        title: 'Akses Terpusat',
        description: 'Kelola konten landing page, layanan, dan tim dari satu portal.',
        icon: Sparkles,
    },
    {
        title: 'Kontrol Penuh',
        description: 'Hanya akun terotorisasi yang dapat mengubah konfigurasi.',
        icon: Lock,
    },
];

export default function Login({ status }: LoginProps) {
    const { settings, branding, name: appName, companyContacts } = usePage<LoginPageProps>().props;
    const defaultCompanyName = 'Harmony Strategic Group';
    const defaultTagline = 'Portal internal untuk tim inti Harmony.';
    const companyName = (settings?.['company.name'] as string | undefined) ?? branding?.name ?? appName ?? defaultCompanyName;
    const companyTagline = (settings?.['company.tagline'] as string | undefined) ?? branding?.tagline ?? defaultTagline;
    const consoleLabel = companyName.toLowerCase().includes('console') ? companyName : `${companyName} Console`;
    const contactsSetting =
        (settings?.['company.contacts'] as CompanyContactsInfo | undefined) ?? (companyContacts as CompanyContactsInfo | undefined);
    const supportEmail = contactsSetting?.email ?? 'hello@harmonygroup.id';

    const recaptchaRef = useRef<RecaptchaFieldHandle>(null);
    const { data, setData, post, processing, errors, setError } = useForm({
        email: '',
        password: '',
        remember: false,
        recaptcha_token: '',
    });

    const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
        (event) => {
            event.preventDefault();

            if (recaptchaEnabled && !data.recaptcha_token) {
                setError('recaptcha_token', 'Harap selesaikan captcha terlebih dahulu.');
                return;
            }

            post(route('login'), {
                onFinish: () => {
                    setData('password', '');
                    setData('recaptcha_token', '');
                    if (recaptchaEnabled) {
                        recaptchaRef.current?.reset();
                    }
                },
            });
        },
        [data.recaptcha_token, post, setData, setError],
    );

    return (
        <AuthSplitLayout title={companyName} description={companyTagline}>
            <Head title="Log in" />

            <div className="space-y-8 rounded-[28px] border border-white/70 bg-white/90 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.15)] dark:border-white/10 dark:bg-slate-900/80">
                <div className="space-y-3 text-left">
                    <Badge className="w-fit bg-indigo-50 text-xs font-semibold tracking-[0.2em] text-indigo-700 uppercase dark:bg-indigo-500/10 dark:text-indigo-200">
                        Portal Admin
                    </Badge>
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Masuk ke {consoleLabel}</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Kredensial akun dibagikan oleh tim IT. Gunakan perangkat terpercaya untuk menjaga keamanan data.
                        </p>
                    </div>
                </div>

                {status ? (
                    <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-100">
                        {status}
                    </div>
                ) : null}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                required
                                autoFocus
                                autoComplete="email"
                                placeholder="admin@example.id"
                                value={data.email}
                                onChange={(event) => setData('email', event.target.value)}
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                required
                                autoComplete="current-password"
                                placeholder="********"
                                value={data.password}
                                onChange={(event) => setData('password', event.target.value)}
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center space-x-3">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onCheckedChange={(checked) => setData('remember', Boolean(checked))}
                            />
                            <Label htmlFor="remember" className="text-sm text-muted-foreground">
                                Ingat saya di perangkat ini
                            </Label>
                        </div>

                        {recaptchaEnabled ? (
                            <RecaptchaField
                                ref={recaptchaRef}
                                className="pt-1"
                                onVerify={(token) => setData('recaptcha_token', token ?? '')}
                                error={errors.recaptcha_token}
                            />
                        ) : null}
                    </div>

                    <Button type="submit" className="w-full gap-2 text-base" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Masuk ke Dashboard
                    </Button>
                </form>

                <div className="rounded-2xl border border-dashed border-slate-200/80 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                    <p className="font-semibold text-slate-900 dark:text-white">Butuh akses akun?</p>
                    <p>
                        Kirim permintaan ke <span className="font-medium text-indigo-600 dark:text-indigo-300">{supportEmail}</span> atau hubungi
                        admin internal. Registrasi dan reset sandi dinonaktifkan demi keamanan.
                    </p>
                </div>

                <div className="grid gap-3 text-sm sm:grid-cols-3">
                    {highlights.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.title} className="flex flex-col gap-2 rounded-2xl border border-slate-200/70 p-4 dark:border-white/10">
                                <div className="flex items-center gap-2 text-slate-800 dark:text-white">
                                    <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                                    <span className="font-semibold">{item.title}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AuthSplitLayout>
    );
}
