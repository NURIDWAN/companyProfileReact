@component('mail::message')
# Kode OTP Masuk

Halo {{ $user->name }},

Gunakan kode berikut untuk menyelesaikan proses login ke portal admin:

@component('mail::panel')
**{{ $code }}**
@endcomponent

Kode ini berlaku selama {{ $expiresMinutes }} menit. Demi keamanan, jangan bagikan kode kepada siapa pun.

Jika Anda tidak mencoba login, abaikan email ini.

Terima kasih,<br>
{{ config('app.name') }}
@endcomponent
