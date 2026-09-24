<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Models\Setting;
use App\Models\AuditLog;

class SettingController extends Controller
{
    private const EMBED_ALLOWLIST_PATTERNS = [
        '/^https:\/\/(www\.)?google\.com\/maps(\/embed)?/i',
        '/^https:\/\/(www\.)?youtube(-nocookie)?\.com\/embed\//i',
        '/^https:\/\/player\.vimeo\.com\/video\//i',
        '/^https:\/\/calendar\.google\.com\//i',
        '/^https:\/\/docs\.google\.com\/forms\//i',
        '/^https:\/\/calendly\.com\//i',
    ];

    public function publicSettings()
    {
        $settings = Setting::whereIn('group', ['general', 'social', 'contact', 'seo', 'footer'])
            ->pluck('value', 'key');

        return $this->successResponse($settings);
    }

    public function index()
    {
        $settings = Setting::pluck('value', 'key');
        return $this->successResponse($settings);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'settings' => 'required|array',
        ]);

        foreach ($data['settings'] as $key => $value) {
            if ($key === 'maps_embed_url' && $value && ! $this->isAllowedEmbedUrl($value)) {
                return $this->errorResponse(
                    'The Google Maps embed URL is not a recognized Google Maps embed link.',
                    422
                );
            }

            if ($key === 'primary_color' && $value && ! preg_match('/^#[0-9a-fA-F]{6}$/', $value)) {
                return $this->errorResponse(
                    'The primary color must be a 6-digit hex value (e.g. #17ADC8).',
                    422
                );
            }

            if ($key === 'embeds' && $value) {
                $embeds = json_decode($value, true) ?: [];
                foreach ($embeds as $embed) {
                    if (! empty($embed['url']) && ! $this->isAllowedEmbedUrl($embed['url'])) {
                        return $this->errorResponse(
                            "The embed URL \"{$embed['url']}\" is not from an approved provider (YouTube, Vimeo, Google Maps/Calendar/Forms, Calendly).",
                            422
                        );
                    }
                }
            }

            Setting::set($key, $value, $this->groupForKey($key), $this->typeForKey($key));
        }

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Updated CMS settings',
            'module' => 'settings',
        ]);

        return $this->successResponse([], 'Settings updated successfully');
    }

    private function isAllowedEmbedUrl(string $url): bool
    {
        foreach (self::EMBED_ALLOWLIST_PATTERNS as $pattern) {
            if (preg_match($pattern, $url)) {
                return true;
            }
        }

        return false;
    }

    private function groupForKey(string $key): string
    {
        return match (true) {
            str_starts_with($key, 'social_') => 'social',
            str_starts_with($key, 'footer_') => 'footer',
            in_array($key, ['contact_email', 'support_email', 'phone', 'mobile', 'address', 'maps_lat', 'maps_lng', 'maps_embed_url']) => 'contact',
            in_array($key, ['meta_title', 'meta_description', 'og_image_url']) => 'seo',
            default => 'general',
        };
    }

    private function typeForKey(string $key): string
    {
        if (in_array($key, ['social_links', 'embeds', 'nav_menu_items', 'homepage_sections_order'])) {
            return 'json';
        }

        if (str_ends_with($key, '_url') && str_contains($key, 'image')) {
            return 'image';
        }

        if (in_array($key, ['site_logo_url', 'favicon_url'])) {
            return 'image';
        }

        return 'text';
    }
}
