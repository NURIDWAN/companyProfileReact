<?php

namespace App\Jobs;

use App\Models\GeminiRequest;
use App\Services\GeminiBlogGenerator;
use App\Services\GeminiProductEnricher;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use RuntimeException;

class ProcessGeminiRequest implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public GeminiRequest $geminiRequest)
    {
    }

    public function handle(
        GeminiBlogGenerator $blogGenerator,
        GeminiProductEnricher $productEnricher,
    ): void {
        $request = $this->geminiRequest->fresh();

        if (!$request || $request->status !== 'queued') {
            return;
        }

        $request->update([
            'status' => 'processing',
            'started_at' => now(),
        ]);

        $startedAt = microtime(true);

        try {
            $result = match ($request->type) {
                'blog' => $blogGenerator->generate($request->options ?? []),
                'product' => $productEnricher->enrich($request->options ?? []),
                default => throw new RuntimeException(sprintf('Unsupported Gemini request type [%s]', $request->type)),
            };

            $finishedAt = microtime(true);

            $request->update([
                'status' => 'completed',
                'result' => $result,
                'finished_at' => now(),
                'duration_ms' => (int) (($finishedAt - $startedAt) * 1000),
            ]);

            Cache::put('gemini:last_status', [
                'status' => 'ok',
                'timestamp' => now()->toIso8601String(),
            ], now()->addMinutes(10));
        } catch (RuntimeException $exception) {
            $this->handleFailure($exception);

            throw $exception;
        } catch (\Throwable $exception) {
            $this->handleFailure($exception);

            throw $exception;
        }
    }

    private function handleFailure(\Throwable $exception): void
    {
        $this->geminiRequest->update([
            'status' => 'failed',
            'error_message' => $exception->getMessage(),
            'finished_at' => now(),
        ]);

        Cache::put('gemini:last_status', [
            'status' => 'error',
            'timestamp' => now()->toIso8601String(),
            'message' => $exception->getMessage(),
        ], now()->addMinutes(10));

        Log::error('Gemini request failed', [
            'gemini_request_id' => $this->geminiRequest->id,
            'type' => $this->geminiRequest->type,
            'message' => $exception->getMessage(),
        ]);
    }
}
