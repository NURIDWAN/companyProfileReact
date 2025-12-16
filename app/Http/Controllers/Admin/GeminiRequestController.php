<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GeminiRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class GeminiRequestController extends Controller
{
    public function show(GeminiRequest $geminiRequest): JsonResponse
    {
        return response()->json([
            'id' => $geminiRequest->uuid,
            'status' => $geminiRequest->status,
            'type' => $geminiRequest->type,
            'result' => $geminiRequest->status === 'completed' ? $geminiRequest->result : null,
            'error_message' => $geminiRequest->status === 'failed' ? $geminiRequest->error_message : null,
            'created_at' => optional($geminiRequest->created_at)->toIso8601String(),
            'started_at' => optional($geminiRequest->started_at)->toIso8601String(),
            'finished_at' => optional($geminiRequest->finished_at)->toIso8601String(),
            'duration_ms' => $geminiRequest->duration_ms,
        ]);
    }

    public function health(Request $request): JsonResponse
    {
        $status = Cache::get('gemini:last_status', [
            'status' => 'unknown',
            'timestamp' => null,
        ]);

        return response()->json($status);
    }
}
