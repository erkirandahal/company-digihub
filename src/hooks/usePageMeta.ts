import { useEffect } from 'react';
import { setPageMetaOverride } from './useSiteSettings';

interface PageMetaOptions {
  title?: string;
  description?: string;
  image?: string;
}

/**
 * Claims the document title/meta description/OG image for the mounted page,
 * taking priority over the site-wide defaults from Settings until the page
 * unmounts. Delegates to useSiteSettings' centralized apply logic so an
 * in-flight settings fetch can never clobber a page-level title once set.
 */
export function usePageMeta({ title, description, image }: PageMetaOptions) {
  useEffect(() => {
    if (!title && !description && !image) return;
    setPageMetaOverride({ title, description, image });
    return () => setPageMetaOverride(null);
  }, [title, description, image]);
}
