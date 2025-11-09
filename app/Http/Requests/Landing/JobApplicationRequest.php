<?php

namespace App\Http\Requests\Landing;

use App\Rules\RecaptchaV2;
use Illuminate\Foundation\Http\FormRequest;

class JobApplicationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:60'],
            'linkedin_url' => ['nullable', 'url', 'max:255'],
            'portfolio_url' => ['nullable', 'url', 'max:255'],
            'cover_letter' => ['nullable', 'string'],
            'resume' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:2048'],
            'recaptcha_token' => config('services.recaptcha.enabled')
                ? ['required', 'string', new RecaptchaV2($this->ip())]
                : ['nullable', 'string'],
        ];
    }
}
