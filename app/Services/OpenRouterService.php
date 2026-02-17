<?php

namespace App\Services;

use App\Models\CompanySetting;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class OpenRouterService
{
    private string $apiKey;

    private string $model;

    private string $endpoint;

    public function __construct(
        ?string $apiKey = null,
        ?string $model = null,
        ?string $endpoint = null,
    ) {
        $this->apiKey = $apiKey ?? $this->resolveConfig('api_key', 'OPENROUTER_API_KEY');
        $this->model = $model ?? $this->resolveConfig('model', 'OPENROUTER_MODEL', 'google/gemini-2.0-flash-001');
        $this->endpoint = $endpoint ?? $this->resolveConfig('endpoint', 'OPENROUTER_ENDPOINT', 'https://openrouter.ai/api/v1');
    }

    /**
     * Send a chat completion request to OpenRouter API.
     *
     * @param  array<int, array{role: string, content: string}>  $messages
     * @param  array<string, mixed>  $options
     * @return array<string, mixed>
     */
    public function chat(array $messages, array $options = []): array
    {
        if (! $this->apiKey) {
            throw new RuntimeException('OpenRouter API key is not configured. Set it in Settings or .env file.');
        }

        $payload = [
            'model' => $options['model'] ?? $this->model,
            'messages' => $messages,
            'temperature' => $options['temperature'] ?? 0.7,
            'max_tokens' => $options['max_tokens'] ?? 4096,
        ];

        if (isset($options['response_format'])) {
            $payload['response_format'] = $options['response_format'];
        }

        $url = rtrim($this->endpoint, '/').'/chat/completions';

        try {
            $response = Http::timeout($options['timeout'] ?? 30)
                ->retry(2, 500)
                ->acceptJson()
                ->withHeaders([
                    'Authorization' => 'Bearer '.$this->apiKey,
                    'Content-Type' => 'application/json',
                    'HTTP-Referer' => config('app.url'),
                    'X-Title' => config('app.name'),
                ])
                ->post($url, $payload);

            if ($response->failed()) {
                $error = $response->json('error.message') ?? $response->body();
                throw new RuntimeException(sprintf(
                    'OpenRouter request failed (%s): %s',
                    $response->status(),
                    $error
                ));
            }

            return $response->json();
        } catch (ConnectionException|RequestException $exception) {
            throw new RuntimeException(
                sprintf('OpenRouter request failed: %s', $exception->getMessage()),
                (int) $exception->getCode(),
                $exception,
            );
        }
    }

    /**
     * Extract the assistant's message content from a chat completion response.
     */
    public function extractContent(array $response): ?string
    {
        return data_get($response, 'choices.0.message.content');
    }

    /**
     * Extract content with detailed error information if not found.
     *
     * @throws RuntimeException
     */
    public function extractContentOrFail(array $response): string
    {
        $content = $this->extractContent($response);

        if ($content === null || $content === '') {
            // Build detailed error message for debugging
            $hasChoices = isset($response['choices']) && is_array($response['choices']);
            $choicesCount = $hasChoices ? count($response['choices']) : 0;
            $hasError = isset($response['error']);
            $errorMessage = $hasError ? ($response['error']['message'] ?? json_encode($response['error'])) : null;

            $debugInfo = sprintf(
                'choices=%d, has_error=%s%s, response_keys=%s',
                $choicesCount,
                $hasError ? 'yes' : 'no',
                $errorMessage ? " ({$errorMessage})" : '',
                implode(',', array_keys($response))
            );

            throw new RuntimeException("AI response does not contain content. Debug: {$debugInfo}");
        }

        return $content;
    }

    /**
     * Get current model being used.
     */
    public function getModel(): string
    {
        return $this->model;
    }

    /**
     * Get current endpoint being used.
     */
    public function getEndpoint(): string
    {
        return $this->endpoint;
    }

    /**
     * Check if API key is configured.
     */
    public function isConfigured(): bool
    {
        return ! empty($this->apiKey);
    }

    /**
     * Resolve configuration value from database settings first, then env, then default.
     */
    private function resolveConfig(string $settingKey, string $envKey, ?string $default = null): string
    {
        // Try to get from database settings first
        $dbValue = $this->getSettingFromDatabase($settingKey);
        if ($dbValue !== null && $dbValue !== '') {
            return $dbValue;
        }

        // Fallback to env or config
        return config("services.openrouter.{$settingKey}") ?? env($envKey, $default) ?? '';
    }

    /**
     * Get AI setting from database.
     */
    private function getSettingFromDatabase(string $key): ?string
    {
        try {
            $value = CompanySetting::query()
                ->where('key', 'ai.settings')
                ->value('value');

            if (is_array($value)) {
                return $value[$key] ?? null;
            }

            return null;
        } catch (\Throwable) {
            // Database might not be available during initial setup
            return null;
        }
    }
}
