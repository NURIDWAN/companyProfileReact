<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    public function __invoke(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'language' => ['required', 'string'],
        ]);

        $available = collect(config('landing.languages', []))->pluck('code')->all();
        $language = in_array($data['language'], $available, true)
            ? $data['language']
            : config('landing.default_language');

        $request->session()->put('app_language', $language);
        app()->setLocale($language);

        return back(303);
    }
}
