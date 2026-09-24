export interface HomepageSectionOrderEntry {
  key: string;
  visible: boolean;
}

// Friendly labels shown in the admin Homepage Layout screen.
export const HOMEPAGE_SECTION_REGISTRY: Record<string, { label: string }> = {
  hero: { label: 'Hero Section' },
  trusted_by: { label: 'Trusted By / Clients' },
  company_overview: { label: 'Company Overview' },
  team_preview: { label: 'Team Preview' },
  core_services: { label: 'Core Services' },
  enterprise_solutions: { label: 'Enterprise Solutions' },
  tech_stack: { label: 'Technology Stack' },
  featured_projects: { label: 'Featured Projects' },
  why_choose: { label: 'Why Choose Us / Process' },
  testimonials: { label: 'Testimonials' },
  latest_blog: { label: 'Latest Blog Posts' },
  bottom_cta: { label: 'Bottom Call to Action' },
};

// Today's fixed order, all visible — used whenever the `homepage_sections_order`
// setting is unset/invalid, so a fresh install renders exactly as before this
// feature existed.
export const DEFAULT_HOMEPAGE_SECTIONS_ORDER: HomepageSectionOrderEntry[] = [
  { key: 'hero', visible: true },
  { key: 'trusted_by', visible: true },
  { key: 'company_overview', visible: true },
  { key: 'team_preview', visible: true },
  { key: 'core_services', visible: true },
  { key: 'enterprise_solutions', visible: true },
  { key: 'tech_stack', visible: true },
  { key: 'featured_projects', visible: true },
  { key: 'why_choose', visible: true },
  { key: 'testimonials', visible: true },
  { key: 'latest_blog', visible: true },
  { key: 'bottom_cta', visible: true },
];

export function parseHomepageSectionsOrder(raw?: string | null): HomepageSectionOrderEntry[] {
  if (!raw) return DEFAULT_HOMEPAGE_SECTIONS_ORDER;
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_HOMEPAGE_SECTIONS_ORDER;
    return parsed;
  } catch {
    return DEFAULT_HOMEPAGE_SECTIONS_ORDER;
  }
}
