<?php

namespace App\Http\Requests\Landing;

use App\Rules\RecaptchaV2;
use Illuminate\Foundation\Http\FormRequest;

class ContactMessageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:60'],
            'subject' => ['nullable', 'string', 'max:150'],
            'message' => ['required', 'string', 'max:2000'],
            'recaptcha_token' => config('services.recaptcha.enabled')
                ? ['required', 'string', new RecaptchaV2($this->ip())]
                : ['nullable', 'string'],
        ];
    }
}
