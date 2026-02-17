import { Head, Link, router, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthSplitLayout from '@/layouts/auth/auth-split-layout';

interface OtpProps {
    status?: string;
    emailHint?: string;
}

export default function LoginOtp({ status, emailHint }: OtpProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        code: '',
    });
    const [resending, setResending] = useState(false);
    const [resendMessage, setResendMessage] = useState<string | null>(null);

    const submit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        post(route('login.otp.verify'), {
            preserveScroll: true,
            onSuccess: () => {
                reset('code');
            },
        });
    };

    const handleResend = () => {
        if (resending) {
            return;
        }

        setResending(true);
        setResendMessage(null);
        router.post(
            route('login.otp.resend'),
            {},
            {
                preserveScroll: true,
                onError: (errors) => {
                    if (errors.code && typeof errors.code === 'string') {
                        setResendMessage(errors.code);
                    } else {
                        setResendMessage('Gagal mengirim ulang kode.');
                    }
                },
                onSuccess: () => {
                    setResendMessage('Kode OTP baru telah dikirim.');
                },
                onFinish: () => setResending(false),
            },
        );
    };

    return (
        <AuthSplitLayout title="Verifikasi OTP" description="Masukkan kode OTP yang dikirim ke email Anda.">
            <Head title="Verifikasi OTP" />

            <div className="space-y-6 rounded-[28px] border border-white/70 bg-white/90 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.15)] dark:border-white/10 dark:bg-slate-900/80">
                <div className="space-y-4 text-left">
                    <p className="text-sm text-muted-foreground">
                        {emailHint ? (
                            <>
                                Kode telah dikirim ke <span className="font-semibold text-foreground">{emailHint}</span>. Periksa inbox atau folder
                                spam Anda.
                            </>
                        ) : (
                            'Kode OTP telah dikirim ke email Anda.'
                        )}
                    </p>
                    {status && <p className="text-sm text-emerald-600 dark:text-emerald-400">{status}</p>}
                </div>

                <form onSubmit={submit} className="space-y-5">
                    <div className="grid gap-2">
                        <Label htmlFor="code">Kode OTP</Label>
                        <Input
                            id="code"
                            value={data.code}
                            onChange={(event) => setData('code', event.target.value)}
                            maxLength={6}
                            inputMode="numeric"
                            placeholder="123456"
                        />
                        <InputError message={errors.code} />
                    </div>

                    <Button type="submit" className="w-full" disabled={processing}>
                        {processing ? 'Memverifikasi...' : 'Verifikasi & Masuk'}
                    </Button>
                </form>

                <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <span>Belum menerima kode?</span>
                        <Button type="button" variant="link" className="px-0" disabled={resending} onClick={handleResend}>
                            {resending ? 'Mengirim ulang...' : 'Kirim ulang'}
                        </Button>
                    </div>
                    {resendMessage && <p className="text-xs text-foreground">{resendMessage}</p>}
                    <p>
                        Salah akun?{' '}
                        <Link href={route('login')} className="font-semibold text-blue-600">
                            Kembali ke login
                        </Link>
                    </p>
                </div>
            </div>
        </AuthSplitLayout>
    );
}
