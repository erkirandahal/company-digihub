<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Media;
use App\Models\AuditLog;

class MediaController extends Controller
{
    /**
     * Server-side validation rules per upload purpose — never trust a client-supplied
     * mime/size rule, since that would let a caller upload anything under any limit.
     */
    private const PURPOSE_RULES = [
        'icon' => ['mimes' => 'jpg,jpeg,png,webp,svg', 'max' => 2048],
        'logo' => ['mimes' => 'jpg,jpeg,png,webp,svg', 'max' => 2048],
        'favicon' => ['mimes' => 'jpg,jpeg,png,webp', 'max' => 2048],
        'og_image' => ['mimes' => 'jpg,jpeg,png,webp', 'max' => 5120],
        'photo' => ['mimes' => 'jpg,jpeg,png,webp', 'max' => 5120],
        'document' => ['mimes' => 'pdf,doc,docx', 'max' => 10240],
    ];

    public function index()
    {
        $media = Media::with('uploader')->latest()->get();
        return $this->successResponse($media);
    }

    public function upload(Request $request)
    {
        $purpose = $request->input('purpose', 'photo');
        $rules = self::PURPOSE_RULES[$purpose] ?? self::PURPOSE_RULES['photo'];

        $validated = $request->validate([
            'file' => "required|file|mimes:{$rules['mimes']}|max:{$rules['max']}",
            'alt_text' => 'nullable|string',
            'caption' => 'nullable|string',
            'folder' => 'nullable|string',
        ]);

        $folder = $validated['folder'] ?? $purpose;
        $file = $request->file('file');
        $path = $file->store($folder, 'public');

        $media = Media::create([
            'file_name' => $file->getClientOriginalName(),
            'file_path' => $path,
            'mime_type' => $file->getClientMimeType(),
            'file_size' => $file->getSize(),
            'alt_text' => $validated['alt_text'] ?? null,
            'caption' => $validated['caption'] ?? null,
            'folder' => $folder,
            'user_id' => $request->user()?->id,
        ]);

        $response = ['media' => $media, 'url' => Storage::disk('public')->url($path)];

        if ($purpose === 'favicon') {
            $response['sizes'] = $this->generateFaviconSizes($path, $folder);
        }

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Uploaded media file',
            'module' => 'media',
            'record_id' => $media->id,
        ]);

        return $this->successResponse($response, 'File uploaded successfully', 201);
    }

    public function destroy(Request $request, int $id)
    {
        $media = Media::findOrFail($id);

        Storage::disk('public')->delete($media->file_path);
        $media->delete();

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Deleted media file',
            'module' => 'media',
            'record_id' => $id,
        ]);

        return $this->successResponse([], 'File deleted successfully');
    }

    /**
     * Generate 16x16 / 32x32 / 180x180 PNG variants of an uploaded favicon master
     * using GD (no external image-processing dependency).
     */
    private function generateFaviconSizes(string $sourcePath, string $folder): array
    {
        $absolutePath = Storage::disk('public')->path($sourcePath);
        $source = @imagecreatefromstring(file_get_contents($absolutePath));

        if (! $source) {
            return [];
        }

        $sizes = [];
        foreach ([16, 32, 180] as $size) {
            $resized = imagecreatetruecolor($size, $size);
            imagesavealpha($resized, true);
            $transparent = imagecolorallocatealpha($resized, 0, 0, 0, 127);
            imagefill($resized, 0, 0, $transparent);

            imagecopyresampled(
                $resized, $source,
                0, 0, 0, 0,
                $size, $size,
                imagesx($source), imagesy($source)
            );

            $relativePath = "{$folder}/favicon-{$size}x{$size}.png";
            $absoluteOut = Storage::disk('public')->path($relativePath);
            imagepng($resized, $absoluteOut);
            imagedestroy($resized);

            $sizes["{$size}x{$size}"] = Storage::disk('public')->url($relativePath);
        }

        imagedestroy($source);

        return $sizes;
    }
}
