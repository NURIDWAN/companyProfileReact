import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

export type RecaptchaFieldHandle = {
    reset: () => void;
};

type RecaptchaFieldProps = {
    onVerify?: (token: string | null) => void;
    error?: string;
    theme?: 'light' | 'dark';
    size?: 'normal' | 'compact';
    className?: string;
};

const recaptchaEnabled = import.meta.env.VITE_RECAPTCHA_ENABLED !== 'false';
const siteKey = recaptchaEnabled ? import.meta.env.VITE_RECAPTCHA_SITE_KEY : undefined;
const SCRIPT_ID = 'recaptcha-v2-script';

export const RecaptchaField = forwardRef<RecaptchaFieldHandle, RecaptchaFieldProps>(function RecaptchaField(
    { onVerify, error, theme = 'light', size = 'normal', className },
    ref,
) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<number | null>(null);
    const [loadError, setLoadError] = useState<string | null>(null);

    useImperativeHandle(
        ref,
        () => ({
            reset: () => {
                if (typeof window === 'undefined') {
                    return;
                }

                if (widgetIdRef.current !== null && window.grecaptcha?.reset) {
                    window.grecaptcha.reset(widgetIdRef.current);
                }
            },
        }),
        [],
    );

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        if (!siteKey) {
            setLoadError('Kunci reCAPTCHA belum disiapkan.');
            return;
        }

        let interval: number | null = null;

        const renderWidget = () => {
            if (!window.grecaptcha || !containerRef.current || widgetIdRef.current !== null) {
                return;
            }

            widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
                sitekey: siteKey,
                size,
                theme,
                callback: (token: string) => onVerify?.(token),
                'expired-callback': () => onVerify?.(null),
                'error-callback': () => {
                    setLoadError('Gagal memuat captcha. Muat ulang halaman dan coba lagi.');
                    onVerify?.(null);
                },
            });
        };

        if (window.grecaptcha?.render) {
            renderWidget();
        } else {
            const ensureScript = () => {
                const script = document.createElement('script');
                script.id = SCRIPT_ID;
                script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
                script.async = true;
                script.defer = true;
                script.onerror = () => setLoadError('Tidak bisa memuat skrip reCAPTCHA.');
                document.body.appendChild(script);
            };

            if (!document.getElementById(SCRIPT_ID)) {
                ensureScript();
            }

            interval = window.setInterval(() => {
                if (window.grecaptcha?.render) {
                    if (interval) {
                        window.clearInterval(interval);
                        interval = null;
                    }
                    renderWidget();
                }
            }, 200);
        }

        return () => {
            if (interval) {
                window.clearInterval(interval);
            }
        };
    }, [onVerify, size, theme]);

    if (!recaptchaEnabled) {
        return null;
    }

    if (!siteKey) {
        return <p className="text-sm text-red-500">RECAPTCHA_SITE_KEY belum dikonfigurasi.</p>;
    }

    return (
        <div className={className}>
            <div ref={containerRef} />
            {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
            {loadError ? <p className="mt-1 text-sm text-red-500">{loadError}</p> : null}
        </div>
    );
});
