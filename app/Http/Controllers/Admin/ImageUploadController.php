<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageUploadController extends Controller
{
    /**
     * Upload image for page sections
     */
    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048', // Max 2MB
        ]);

        try {
            $file = $request->file('image');

            // Generate unique filename
            $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();

            // Store in storage/app/public/images/sections/
            $path = $file->storeAs('images/sections', $filename, 'public');

            // Generate public URL
            $url = Storage::url($path);

            return response()->json([
                'success' => true,
                'url' => $url,
                'path' => $path,
                'message' => 'Image uploaded successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload image: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete uploaded image
     */
    public function delete(Request $request): JsonResponse
    {
        $request->validate([
            'path' => 'required|string',
        ]);

        try {
            $path = $request->input('path');

            // Remove /storage/ prefix if present to get actual path
            $path = str_replace('/storage/', '', $path);

            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);

                return response()->json([
                    'success' => true,
                    'message' => 'Image deleted successfully',
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'Image not found',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete image: ' . $e->getMessage(),
            ], 500);
        }
    }
}
