<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Mail\LoginOtpMail;
use App\Models\CompanySetting;
use App\Models\User;
use App\Models\UserOtp;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    private ?array $otpConfig = null;

    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $otpConfig = $this->otpConfig();

        if (! $otpConfig['enabled']) {
            $request->authenticate();
            $request->session()->regenerate();

            return redirect()->intended(route('dashboard', absolute: false));
        }

        $user = $request->validateCredentialsOnly();

        $this->issueOtp($user, $otpConfig);

        $request->session()->put('otp_login', [
            'user_id' => $user->id,
            'remember' => $request->boolean('remember'),
        ]);

        return redirect()->route('login.otp')->with('status', 'Kode OTP telah dikirim ke email Anda.');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function showOtp(Request $request): Response|RedirectResponse
    {
        if (! $this->otpConfig()['enabled']) {
            return redirect()->route('login');
        }

        $otpState = $request->session()->get('otp_login');

        if (! $otpState || ! isset($otpState['user_id'])) {
            return redirect()->route('login');
        }

        $user = User::find($otpState['user_id']);

        if (! $user) {
            return redirect()->route('login');
        }

        return Inertia::render('auth/login-otp', [
            'status' => $request->session()->get('status'),
            'emailHint' => $this->maskEmail($user->email),
        ]);
    }

    public function verifyOtp(Request $request): RedirectResponse
    {
        if (! $this->otpConfig()['enabled']) {
            return redirect()->route('login');
        }

        $otpState = $request->session()->get('otp_login');

        if (! $otpState || ! isset($otpState['user_id'])) {
            return redirect()->route('login');
        }

        $request->validate([
            'code' => ['required', 'digits:6'],
        ]);

        $otp = UserOtp::query()
            ->where('user_id', $otpState['user_id'])
            ->latest('id')
            ->first();

        if (! $otp || $otp->expires_at->isPast() || $otp->consumed_at) {
            return back()->withErrors(['code' => 'Kode OTP sudah kedaluwarsa. Silakan minta ulang.']);
        }

        if (! Hash::check($request->string('code'), $otp->code)) {
            $otp->incrementAttempts();

            return back()->withErrors(['code' => 'Kode OTP tidak valid.']);
        }

        $otp->markConsumed();

        Auth::loginUsingId($otpState['user_id'], $otpState['remember'] ?? false);

        $request->session()->forget('otp_login');
        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }

    public function resendOtp(Request $request): RedirectResponse
    {
        if (! $this->otpConfig()['enabled']) {
            return redirect()->route('login');
        }

        $otpState = $request->session()->get('otp_login');

        if (! $otpState || ! isset($otpState['user_id'])) {
            return redirect()->route('login');
        }

        $user = User::find($otpState['user_id']);

        if (! $user) {
            return redirect()->route('login');
        }

        $cooldownSeconds = $this->otpConfig()['resend_cooldown'];
        $recentOtp = UserOtp::query()
            ->where('user_id', $user->id)
            ->latest('id')
            ->first();

        if ($recentOtp && $recentOtp->created_at->gt(now()->subSeconds($cooldownSeconds))) {
            return back()->withErrors([
                'code' => 'Tunggu beberapa saat sebelum meminta kode baru.',
            ]);
        }

        $this->issueOtp($user, $this->otpConfig());

        return redirect()->route('login.otp')->with('status', 'Kode OTP baru telah dikirim.');
    }

    private function otpConfig(): array
    {
        if ($this->otpConfig !== null) {
            return $this->otpConfig;
        }

        $raw = CompanySetting::query()->where('key', 'security.otp')->value('value') ?? [];
        $config = is_array($raw) ? $raw : [];

        return $this->otpConfig = [
            'enabled' => (bool) ($config['enabled'] ?? false),
            'expires_minutes' => (int) ($config['expires_minutes'] ?? 10),
            'resend_cooldown' => (int) ($config['resend_cooldown'] ?? 60),
        ];
    }

    private function issueOtp(User $user, array $config): void
    {
        UserOtp::query()
            ->where('user_id', $user->id)
            ->whereNull('consumed_at')
            ->delete();

        $code = (string) random_int(100000, 999999);

        UserOtp::create([
            'user_id' => $user->id,
            'code' => Hash::make($code),
            'expires_at' => now()->addMinutes($config['expires_minutes']),
        ]);

        Mail::to($user->email)->send(new LoginOtpMail($user, $code, $config['expires_minutes']));
    }

    private function maskEmail(string $email): string
    {
        if (! str_contains($email, '@')) {
            return $email;
        }

        [$user, $domain] = explode('@', $email, 2);
        $length = strlen($user);
        if ($length === 0) {
            return '***@'.$domain;
        }

        $maskedUser = $length > 2
            ? substr($user, 0, 1).str_repeat('*', max(strlen($user) - 2, 1)).substr($user, -1)
            : substr($user, 0, 1).'*';

        return $maskedUser.'@'.$domain;
    }
}
