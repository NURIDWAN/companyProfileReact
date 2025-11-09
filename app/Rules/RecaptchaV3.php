<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Http;

class RecaptchaV3 implements ValidationRule
{
    public function __construct(
        protected string $action,
        protected float $minimumScore = 0.5,
        protected ?string $ip = null,
    ) {
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! is_string($value) || $value === '') {
            $fail(__('Captcha wajib diisi.'));
            return;
        }

        $secret = config('services.recaptcha.secret');

        if (! $secret) {
            $fail(__('Captcha belum dikonfigurasi. Hubungi administrator.'));
            return;
        }

        $response = Http::asForm()
            ->timeout(5)
            ->post('https://www.google.com/recaptcha/api/siteverify', [
                'secret' => $secret,
                'response' => $value,
                'remoteip' => $this->ip,
            ]);

        if ($response->failed()) {
            $fail(__('Validasi captcha gagal. Silakan coba beberapa saat lagi.'));
            return;
        }

        $payload = $response->json();

        if (! ($payload['success'] ?? false)) {
            $fail(__('Captcha tidak valid. Silakan coba lagi.'));
            return;
        }

        if (isset($payload['action']) && $payload['action'] !== $this->action) {
            $fail(__('Captcha tidak sesuai dengan aksi yang diminta.'));
            return;
        }

        if (($payload['score'] ?? 0) < $this->minimumScore) {
            $fail(__('Captcha mendeteksi aktivitas mencurigakan. Mohon coba kembali.'));
        }
    }
}
