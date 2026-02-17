<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class LoginOtpMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public User $user,
        public string $code,
        public int $expiresMinutes = 10,
    ) {}

    public function build(): self
    {
        return $this->subject('Kode OTP Login')
            ->markdown('emails.auth.login-otp', [
                'user' => $this->user,
                'code' => $this->code,
                'expiresMinutes' => $this->expiresMinutes,
            ]);
    }
}
