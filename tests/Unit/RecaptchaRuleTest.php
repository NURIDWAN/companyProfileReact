<?php

use App\Rules\RecaptchaV2;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

beforeEach(function () {
    config([
        'services.recaptcha.secret' => 'test-secret',
        'services.recaptcha.enabled' => true,
    ]);
});

test('recaptcha rule passes when Google returns success', function () {
    Http::fake([
        'www.google.com/recaptcha/api/siteverify' => Http::response([
            'success' => true,
        ], 200),
    ]);

    $validator = Validator::make(
        ['token' => 'mock-token'],
        ['token' => ['required', new RecaptchaV2('127.0.0.1')]],
    );

    expect($validator->passes())->toBeTrue();
});

test('recaptcha rule fails when Google rejects the token', function () {
    Http::fake([
        'www.google.com/recaptcha/api/siteverify' => Http::response([
            'success' => false,
            'error-codes' => ['invalid-input-secret'],
        ], 200),
    ]);

    $validator = Validator::make(
        ['token' => 'mock-token'],
        ['token' => ['required', new RecaptchaV2('127.0.0.1')]],
    );

    expect($validator->fails())->toBeTrue()
        ->and($validator->errors()->first('token'))
        ->toContain('Captcha');
});
