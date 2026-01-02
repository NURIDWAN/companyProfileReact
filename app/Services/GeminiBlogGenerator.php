<?php

namespace App\Services;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use RuntimeException;

class GeminiBlogGenerator
{
    public function __construct(
        private readonly ?string $apiKey = null,
        private readonly ?string $model = null,
    ) {
    }

    /**
     * @param  array<string, mixed>  $options
     * @return array<string, mixed>
     */
    public function generate(array $options): array
    {
        $apiKey = $this->apiKey ?: config('services.gemini.key');
        $model = $this->model ?: config('services.gemini.model', 'gemini-2.5-flash');

        if (!$apiKey) {
            throw new RuntimeException('Gemini API key is not configured.');
        }

        $payload = [
            'contents' => [
                [
                    'role' => 'user',
                    'parts' => [
                        ['text' => $this->buildPrompt($options)],
                    ],
                ]
            ],
            'generationConfig' => [
                'temperature' => 0.7,
                'topK' => 32,
                'topP' => 0.95,
                'maxOutputTokens' => 8192,
                'responseMimeType' => 'application/json',
            ],
            'safetySettings' => $this->safetySettings(),
        ];

        $response = $this->sendRequest($model, $payload, $apiKey);

        if ($response->failed() && $response->status() === 404 && !Str::endsWith($model, '-latest')) {
            $model = "{$model}-latest";
            $response = $this->sendRequest($model, $payload, $apiKey);
        }

        if ($response->failed()) {
            throw new RuntimeException(sprintf(
                'Gemini request failed (%s)',
                $response->body() ?: $response->status()
            ));
        }

        $textPayload = data_get($response->json(), 'candidates.0.content.parts.0.text');

        if (!$textPayload) {
            throw new RuntimeException('Gemini response does not contain content.');
        }

        $decoded = $this->decodeJsonPayload($textPayload);

        if (!is_array($decoded)) {
            // Try to recover from common JSON formatting issues (unescaped newlines)
            $textPayload = str_replace(["\n", "\r"], ["\\n", "\\r"], $textPayload);
            // Note: This is a desperate attempt and might break formatting structure, 
            // but often saves "raw text with newlines" responses.
            // Better approach: Rely on responseMimeType: application/json which we added.

            // Re-decode after simple attempt, or just throw
            throw new RuntimeException('Gemini response is not valid JSON. Response length: ' . strlen($textPayload));
        }

        $title = trim((string) Arr::get($decoded, 'title', ''));
        $body = trim((string) Arr::get($decoded, 'body_html', Arr::get($decoded, 'body', '')));
        $excerpt = trim((string) Arr::get($decoded, 'excerpt', ''));
        $slug = Str::slug((string) ($decoded['slug'] ?? $title));

        return [
            'title' => $title,
            'slug' => $slug,
            'excerpt' => $excerpt,
            'body' => $body,
            'meta_title' => trim((string) Arr::get($decoded, 'meta_title', '')),
            'meta_description' => trim((string) Arr::get($decoded, 'meta_description', '')),
            'og_title' => trim((string) Arr::get($decoded, 'og_title', '')),
            'outline' => $this->normalizeArray(Arr::get($decoded, 'outline')),
            'keywords' => $this->normalizeArray(Arr::get($decoded, 'keywords')),
            'cta_variants' => $this->normalizeArray(Arr::get($decoded, 'cta_variants')),
        ];
    }

    /**
     * @param  array{topic?: string, tone?: string|null, keywords?: string|null, call_to_action?: string|null, audience?: string|null, word_count?: int|null, preset?: string|null}  $options
     */
    private function buildPrompt(array $options): string
    {
        $topic = trim((string) ($options['topic'] ?? ''));
        $audience = trim((string) ($options['audience'] ?? 'calon klien B2B di Indonesia'));
        $tone = trim((string) ($options['tone'] ?? 'profesional namun mudah dipahami'));
        $cta = trim((string) ($options['call_to_action'] ?? 'Hubungi tim kami untuk konsultasi gratis'));
        $wordCount = (int) ($options['word_count'] ?? 1000); // Increased default
        $wordCount = max(300, min(2000, $wordCount));
        $keywords = $this->normalizeKeywords($options['keywords'] ?? null);
        $preset = trim((string) ($options['preset'] ?? ''));

        $keywordBlock = $keywords
            ? "Gunakan kata kunci berikut secara alami: {$keywords}."
            : 'Prioritaskan kata kunci relevan terkait solusi digital agency, software house, dan transformasi digital.';

        $presetInstruction = $this->presetInstruction($preset);

        return <<<PROMPT
Kamu adalah copywriter senior di perusahaan layanan teknologi end-to-end (web, mobile, ERP, dan konsultasi produk digital) yang berbasis di Indonesia.
Tulis artikel blog berbahasa Indonesia dengan topik "{$topic}" untuk audiens {$audience}.

Ekspektasi konten:
- Tone {$tone} dengan sentuhan storytelling ringan dan CTA yang jelas.
- Panjang artikel sekitar {$wordCount} kata.
- Struktur harus memiliki judul utama, paragraf pembuka, beberapa subjudul H2/H3, bullet list (jika relevan), dan penutup dengan CTA "{$cta}".
- {$keywordBlock}
- Soroti keunggulan layanan kustom software development, kolaborasi jangka panjang, serta dukungan konsultasi strategis.
- {$presetInstruction}

Output-kan data DALAM FORMAT JSON SEJATI (Raw JSON) tanpa markdown formatting (seperti ```json). Pastikan semua string di-escape dengan benar:
{
  "title": "Judul singkat dan kuat",
  "slug": "slug-seo-friendly",
  "excerpt": "Ringkasan 1-2 kalimat",
  "body_html": "<p>Konten lengkap dalam HTML...</p>",
  "meta_title": "Judul SEO maksimal 60 karakter",
  "meta_description": "Meta description 140-160 karakter",
  "og_title": "Judul pendek untuk Open Graph",
  "cta_variants": ["CTA 1", "CTA 2"],
  "outline": ["Bagian 1", "Bagian 2", "..."],
  "keywords": ["keyword 1", "keyword 2", "..."]
}
PROMPT;
    }

    /**
     * @param  mixed  $value
     * @return array<int, string>
     */
    private function normalizeArray(mixed $value): array
    {
        $items = array_filter(array_map(
            static fn($item) => trim((string) $item),
            Arr::wrap($value),
        ));

        return array_values($items);
    }

    /**
     * @param  array<string, mixed>  $payload
     */
    private function sendRequest(string $model, array $payload, string $apiKey): Response
    {
        $baseUrl = rtrim(config('services.gemini.endpoint', 'https://generativelanguage.googleapis.com'), '/');
        $version = trim(config('services.gemini.version', 'v1beta'), '/');
        $url = sprintf('%s/%s/models/%s:generateContent', $baseUrl, $version, $model);

        try {
            return Http::timeout(30)
                ->retry(2, 500)
                ->acceptJson()
                ->withHeaders([
                    'X-Goog-Api-Key' => $apiKey,
                    'Content-Type' => 'application/json',
                ])
                ->post($url, $payload);
        } catch (ConnectionException | RequestException $exception) {
            throw new RuntimeException(
                sprintf('Gemini request failed (%s)', $exception->getMessage()),
                (int) $exception->getCode(),
                $exception,
            );
        }
    }

    /**
     * Safety settings accepted by Gemini 1.5/2.0 API.
     *
     * @return array<int, array<string, string>>
     */
    private function safetySettings(): array
    {
        $categories = [
            'HARM_CATEGORY_HATE_SPEECH',
            'HARM_CATEGORY_HARASSMENT',
            'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            'HARM_CATEGORY_DANGEROUS_CONTENT',
            'HARM_CATEGORY_CIVIC_INTEGRITY',
        ];

        return array_map(
            static fn(string $category) => [
                'category' => $category,
                'threshold' => 'BLOCK_MEDIUM_AND_ABOVE',
            ],
            $categories,
        );
    }

    private function normalizeKeywords(?string $keywords): string
    {
        if (!$keywords) {
            return '';
        }

        $items = preg_split('/[,\\n]+/', $keywords) ?: [];

        $items = array_filter(array_map(
            static fn($item) => trim($item),
            $items,
        ));

        return implode(', ', $items);
    }

    private function presetInstruction(?string $preset): string
    {
        return match ($preset) {
            'friendly-startup' => 'Gunakan gaya hangat dan optimistis layaknya startup SaaS yang dekat dengan klien.',
            'enterprise' => 'Gunakan bahasa formal dengan penekanan pada mitigasi risiko dan ROI tingkat enterprise.',
            'public-sector' => 'Tegaskan komitmen pada transparansi, kepatuhan regulasi, dan dampak sosial untuk sektor publik.',
            default => 'Gunakan gaya profesional yang persuasif tanpa melebih-lebihkan klaim.',
        };
    }

    /**
     * @return array<string, mixed>|null
     */
    private function decodeJsonPayload(string $payload): ?array
    {
        $clean = trim($payload);

        if (Str::startsWith($clean, '```')) {
            $clean = preg_replace('/^```(?:json)?\\s*/i', '', $clean) ?? $clean;
            $clean = preg_replace('/\\s*```$/', '', $clean) ?? $clean;
        }

        $decoded = json_decode($clean, true);
        if (is_array($decoded)) {
            return $decoded;
        }

        $start = strpos($clean, '{');
        $end = strrpos($clean, '}');
        if ($start !== false && $end !== false && $end > $start) {
            $snippet = substr($clean, $start, $end - $start + 1);
            $decoded = json_decode($snippet, true);
            if (is_array($decoded)) {
                return $decoded;
            }
        }

        return null;
    }
}
