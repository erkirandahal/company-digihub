import { NavMenuItem } from '../types';

// Used whenever the `nav_menu_items` setting is unset/invalid, so a fresh
// install (or one where the admin never touched Navigation Menu settings)
// behaves exactly like the site did before this feature existed.
export const DEFAULT_NAV_MENU_ITEMS: NavMenuItem[] = [
  { id: 'services', label: 'Services', path: '/services', visible: true, isCustom: false },
  { id: 'solutions', label: 'Solutions', path: '/solutions', visible: true, isCustom: false },
  { id: 'projects', label: 'Projects', path: '/projects', visible: true, isCustom: false },
  { id: 'about', label: 'About', path: '/about', visible: true, isCustom: false },
  { id: 'team-member', label: 'Team Member', path: '/team', visible: true, isCustom: false },
  { id: 'careers', label: 'Careers', path: '/careers', visible: true, isCustom: false },
  { id: 'career', label: 'Career', path: '/careers', visible: true, isCustom: false },
  { id: 'insights', label: 'Insights', path: '/blog', visible: true, isCustom: false },
  { id: 'contact', label: 'Contact', path: '/contact', visible: true, isCustom: false },
];

export function parseNavMenuItems(raw?: string | null): NavMenuItem[] {
  if (!raw) return DEFAULT_NAV_MENU_ITEMS;
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_NAV_MENU_ITEMS;
    return parsed;
  } catch {
    return DEFAULT_NAV_MENU_ITEMS;
  }
}
