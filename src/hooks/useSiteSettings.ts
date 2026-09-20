import { useEffect, useState } from 'react';
import { apiClient, getStorageUrl } from '../services/api';

export interface SocialLink {
  platform: 'Facebook' | 'LinkedIn' | 'Twitter/X' | 'Instagram' | 'YouTube' | 'GitHub';
  url: string;
}

export interface SiteSettings {
  site_name?: string;
  site_logo_url?: string;
  favicon_url?: string;
  og_image_url?: string;
  social_links: SocialLink[];
  maps_lat?: string;
  maps_lng?: string;
  maps_embed_url?: string;
  meta_title?: string;
  meta_description?: string;
  [key: string]: any;
}

const CACHE_KEY = 'digihub_public_settings_cache_v1';

function readCache(): SiteSettings | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(data: SiteSettings) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // ignore quota/availability errors — caching is a best-effort optimization
  }
}

// A mounted page can claim its own title/description/image (e.g. a blog post
// or project case study) via setPageMetaOverride(). Since the settings fetch
// resolves asynchronously and can complete AFTER a page has already set its
// own title, applyDocumentMeta always re-checks this override so the async
// fetch never clobbers a page-level title/description that's already active.
interface PageMetaOverride {
  title?: string;
  description?: string;
  image?: string;
}
let pageOverride: PageMetaOverride | null = null;

export function setPageMetaOverride(override: PageMetaOverride | null) {
  pageOverride = override;
  if (cache) applyDocumentMeta(cache);
}

function applyDocumentMeta(data: SiteSettings) {
  const title = pageOverride?.title || data.meta_title || data.site_name;
  if (title) {
    document.title = title;
  }

  const setMeta = (selector: string, attr: string, value?: string) => {
    if (!value) return;
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };

  const description = pageOverride?.description || data.meta_description;
  setMeta('meta[name="description"]', 'content', description);
  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', description);
  const ogImageUrl = pageOverride?.image || (data.og_image_url ? getStorageUrl(data.og_image_url) : undefined);
  if (ogImageUrl) {
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', ogImageUrl);
  }

  if (data.favicon_url) {
    const href = getStorageUrl(data.favicon_url);
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = href;
  }
}

// Seed the in-memory cache from localStorage synchronously so a repeat visit
// never flashes an empty/placeholder header — only a genuinely first-ever
// visit (no cache, backend unreachable) renders without a name/logo.
let cache: SiteSettings | null = readCache();
if (cache) applyDocumentMeta(cache);
let inflight: Promise<SiteSettings | null> | null = null;

async function loadSettings(): Promise<SiteSettings | null> {
  if (inflight) return inflight;

  inflight = apiClient
    .get('/settings')
    .then((res) => {
      const data = res.data?.data || {};
      let socialLinks: SocialLink[] = [];
      try {
        socialLinks = data.social_links ? JSON.parse(data.social_links) : [];
      } catch {
        socialLinks = [];
      }
      const merged: SiteSettings = { ...data, social_links: socialLinks };
      cache = merged;
      writeCache(merged);
      applyDocumentMeta(merged);
      return merged;
    })
    .catch(() => {
      // Backend unreachable — deliberately do NOT substitute placeholder/demo
      // data for the real company identity. Keep whatever cache we already
      // had (possibly null) rather than showing a fake name/logo.
      return cache;
    });

  return inflight;
}

export function useSiteSettings(): SiteSettings {
  const [settings, setSettings] = useState<SiteSettings>(cache || { social_links: [] });

  useEffect(() => {
    let mounted = true;
    loadSettings().then((data) => {
      if (mounted && data) setSettings(data);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return settings;
}
