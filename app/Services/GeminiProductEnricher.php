<?php

namespace App\Services;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use RuntimeException;

class GeminiProductEnricher
{
    public function __construct(
        private readonly ?string $apiKey = null,
        private readonly ?string $model = null,
    ) {
    }

    /**
     * @param  array<string, mixed>  $payload
     * @return array{marketing_summary?: string, highlights?: array<int, string>, faqs?: array<int, array{question: string, answer: string}>, description?: string, meta_title?: string, meta_description?: string, cta_variants?: array<int, string>}
     */
    public function enrich(array $payload): array
    {
        $apiKey = $this->apiKey ?: config('services.gemini.key');
        $model = $this->model ?: config('services.gemini.model', 'gemini-2.5-flash');

        if (!$apiKey) {
            throw new RuntimeException('Gemini API key is not configured.');
        }

        $requestPayload = [
            'contents' => [[
                'role' => 'user',
                'parts' => [
                    ['text' => $this->buildPrompt($payload)],
                ],
            ]],
            'generationConfig' => [
                'temperature' => 0.65,
                'topK' => 40,
                'topP' => 0.9,
                'maxOutputTokens' => 1024,
                'responseMimeType' => 'application/json',
            ],
            'safetySettings' => $this->safetySettings(),
        ];

        $response = $this->sendRequest($model, $requestPayload, $apiKey);

        if ($response->failed() && $response->status() === 404 && !Str::endsWith($model, '-latest')) {
            $response = $this->sendRequest("{$model}-latest", $requestPayload, $apiKey);
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
            throw new RuntimeException('Gemini response is not valid JSON.');
        }

        return [
            'marketing_summary' => trim((string) Arr::get($decoded, 'marketing_summary', '')),
            'highlights' => $this->normalizeArray(Arr::get($decoded, 'highlights')),
            'faqs' => $this->normalizeFaqs(Arr::get($decoded, 'faqs')),
            'description' => trim((string) Arr::get($decoded, 'description', '')),
            'meta_title' => trim((string) Arr::get($decoded, 'meta_title', '')),
            'meta_description' => trim((string) Arr::get($decoded, 'meta_description', '')),
            'cta_variants' => $this->normalizeArray(Arr::get($decoded, 'cta_variants')),
        ];
    }

    /**
     * @param  array<string, mixed>  $payload
     */
    private function buildPrompt(array $payload): string
    {
        $name = trim((string) ($payload['name'] ?? 'Produk Digital'));
        $category = trim((string) ($payload['category'] ?? 'solusi digital'));
        $description = trim((string) ($payload['description'] ?? ''));
        $targetMarket = trim((string) ($payload['target_market'] ?? 'perusahaan di Indonesia'));
        $tone = trim((string) ($payload['tone'] ?? 'profesional dan persuasif'));
        $valueProp = trim((string) ($payload['value_proposition'] ?? 'solusi kustom end-to-end'));
        $callToAction = trim((string) ($payload['call_to_action'] ?? 'Hubungi tim kami untuk konsultasi gratis.'));
        $price = $payload['price'] ?? null;
        $features = $this->normalizeArray($payload['features'] ?? []);
        $preset = trim((string) ($payload['preset'] ?? ''));

        $featureDescription = $features
            ? '- Soroti fitur utama berikut: ' . implode(', ', $features) . '.'
            : '- Jika fitur belum ada, rekomendasikan keunggulan umum digital agency/software house.';

        $priceNote = $price !== null
            ? sprintf('- Harga indikatif: mulai dari %s (IDR).', number_format((float) $price, 0, ',', '.'))
            : '- Berikan estimasi investasi tanpa angka jika harga belum tersedia.';

        $contextBlock = $description !== ''
            ? "Deskripsi produk yang sudah ada:\n\"{$description}\""
            : 'Belum ada deskripsi kaya, bantu buat ringkasan pemasaran yang kuat.';

        $featuresBlock = $features
            ? "Fitur/USP yang perlu disinggung:\n- " . implode("\n- ", $features)
            : 'Pengguna bisa mengisi fitur sendiri setelahnya, jadi beri rekomendasi generik.';
        $presetInstruction = $this->presetInstruction($preset);

        return <<<PROMPT
Kamu adalah AI product marketer dari perusahaan konsultan teknologi bernama Harmony Strategic Group.
Produk yang ingin dipromosikan bernama "{$name}" di kategori {$category}. Target utamanya adalah {$targetMarket}.

{$contextBlock}

{$featuresBlock}

Instruksi keluaran:
- Nada tulisan {$tone} dan tekankan proposisi nilai "{$valueProp}".
{$featureDescription}
{$priceNote}
- Sertakan CTA "{$callToAction}" di akhir ringkasan bila relevan.
- Buat highlight berupa bullet singkat (maks 5) dan FAQ (3 entri) dengan jawaban ringkas.
- Kembalikan meta title/deskripsi serta varian CTA alternatif untuk kebutuhan SEO & kampanye.
- {$presetInstruction}

Keluarkan DALAM FORMAT JSON dengan struktur persis berikut:
{
  "marketing_summary": "Ringkasan pemasaran 2-3 paragraf dalam HTML <p> dan <strong> bila perlu",
  "highlights": ["Poin 1", "Poin 2", "Poin 3"],
  "faqs": [
    {"question": "Pertanyaan umum", "answer": "Jawaban ringkas dalam HTML minimal 1 paragraf"}
  ],
  "description": "Opsional, deskripsi produk yang lebih kaya (HTML).",
  "meta_title": "Judul SEO maksimal 60 karakter",
  "meta_description": "Meta description 140-160 karakter",
  "cta_variants": ["CTA 1", "CTA 2"]
}

Jangan tambahkan teks selain JSON valid.
PROMPT;
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
            return Http::timeout(25)
                ->retry(2, 500)
                ->acceptJson()
                ->withHeaders([
                    'X-Goog-Api-Key' => $apiKey,
                    'Content-Type' => 'application/json',
                ])
                ->post($url, $payload);
        } catch (ConnectionException|RequestException $exception) {
            throw new RuntimeException(
                sprintf('Gemini request failed (%s)', $exception->getMessage()),
                (int) $exception->getCode(),
                $exception,
            );
        }
    }

    /**
     * @param  mixed  $value
     * @return array<int, string>
     */
    private function normalizeArray(mixed $value): array
    {
        return collect(Arr::wrap($value))
            ->map(fn ($item) => trim((string) $item))
            ->filter()
            ->values()
            ->all();
    }

    /**
     * @param  mixed  $value
     * @return array<int, array{question: string, answer: string}>
     */
    private function normalizeFaqs(mixed $value): array
    {
        $items = Arr::wrap($value);

        return collect($items)
            ->map(function ($item) {
                if (!is_array($item)) {
                    return null;
                }

                $question = trim((string) ($item['question'] ?? ''));
                $answer = trim((string) ($item['answer'] ?? ''));

                if ($question === '' || $answer === '') {
                    return null;
                }

                return ['question' => $question, 'answer' => $answer];
            })
            ->filter()
            ->values()
            ->all();
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

    /**
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
            static fn (string $category) => [
                'category' => $category,
                'threshold' => 'BLOCK_MEDIUM_AND_ABOVE',
            ],
            $categories,
        );
    }

    private function presetInstruction(?string $preset): string
    {
        return match ($preset) {
            'saas-scaleup' => 'Titik beratkan agilitas, integrasi API, dan time-to-market cepat untuk mendukung scaling startup.',
            'enterprise-modernization' => 'Soroti tata kelola, keamanan, dan mitigasi risiko untuk program modernisasi perusahaan besar.',
            'public-sector' => 'Tunjukkan manfaat sosial, kepatuhan regulasi, serta dukungan implementasi lapangan untuk instansi pemerintah.',
            default => 'Gunakan pesan yang relevan bagi pengambil keputusan lintas industri di Indonesia.',
        };
    }
}
