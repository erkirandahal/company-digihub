import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ShieldCheck, PhoneCall, Code2, ChevronDown } from 'lucide-react';
import { authApi, getStorageUrl } from '../../services/api';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { parseNavMenuItems } from '../../config/defaultNavMenu';
import { NavMenuItem } from '../../types';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const location = useLocation();
  const currentUser = authApi.getCurrentUser();
  const { site_name, site_logo_url, tagline, address, phone, nav_menu_items } = useSiteSettings();
  const phoneHref = phone ? `tel:${phone.replace(/[^+\d]/g, '')}` : undefined;

  const navLinks: NavMenuItem[] = parseNavMenuItems(nav_menu_items)
    .filter((item) => item.visible)
    .map((item) => ({ ...item, children: item.children?.filter((c) => c.visible) }));

  const isActive = (path: string) => location.pathname === path;
  const isExternal = (path: string) => /^https?:\/\//i.test(path);
  const isParentActive = (item: NavMenuItem) =>
    isActive(item.path) || (item.children?.some((c) => isActive(c.path)) ?? false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Banner Bar */}
      <div className="bg-indigo-50 text-slate-600 text-xs py-2 px-4 border-b border-indigo-100">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-slate-700 min-h-[1em]">
              <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse shrink-0"></span>
              {site_name ? (
                site_name
              ) : (
                <span className="inline-block w-40 h-3 rounded bg-slate-200 animate-pulse" />
              )}
            </span>
            {address && (
              <>
                <span className="hidden md:inline text-slate-300">|</span>
                <span className="hidden md:inline text-slate-500">{address}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-4">
            {phone && (
              <a href={phoneHref} className="flex items-center gap-1 hover:text-indigo-700 transition-colors">
                <PhoneCall className="w-3 h-3 text-indigo-700" />
                <span>{phone}</span>
              </a>
            )}
            <Link
              to={currentUser ? '/admin' : '/admin/login'}
              className="flex items-center gap-1 text-slate-500 hover:text-indigo-700 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{currentUser ? 'Admin Portal' : 'Staff Login'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18 items-center">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group min-w-0">
            {site_logo_url ? (
              <img
                src={getStorageUrl(site_logo_url)}
                alt={site_name || 'Site logo'}
                className="h-10 w-auto shrink-0"
              />
            ) : site_name ? (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-black text-xl shadow-sm shrink-0 group-hover:from-indigo-400 group-hover:to-indigo-600 transition-colors">
                <Code2 className="w-6 h-6" />
              </div>
            ) : null}

            {site_name ? (
              <span className="flex flex-col leading-tight min-w-0">
                <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 truncate">
                  {site_name}
                </span>
                {tagline && (
                  <span className="hidden sm:block text-[11px] font-semibold text-indigo-600 tracking-wide truncate">
                    {tagline}
                  </span>
                )}
              </span>
            ) : (
              // Real site identity hasn't loaded yet (and no cached copy exists) —
              // show a neutral loading placeholder rather than any fallback name.
              <span className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-slate-100 animate-pulse block" />
                <span className="w-28 h-5 rounded bg-slate-100 animate-pulse block" />
              </span>
            )}
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const hasChildren = (link.children?.length ?? 0) > 0;

              if (hasChildren) {
                return (
                  <div key={link.id} className="relative group">
                    <button
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                        isParentActive(link)
                          ? 'text-indigo-700 bg-indigo-50'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <div className="absolute left-0 top-full pt-1 hidden group-hover:block z-50">
                      <div className="min-w-[200px] bg-white border border-slate-200 rounded-xl shadow-lg py-1.5">
                        {link.children!.map((child) =>
                          isExternal(child.path) ? (
                            <a
                              key={child.id}
                              href={child.path}
                              target="_blank"
                              rel="noreferrer"
                              className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-700"
                            >
                              {child.label}
                            </a>
                          ) : (
                            <Link
                              key={child.id}
                              to={child.path}
                              className={`block px-4 py-2 text-sm ${
                                isActive(child.path)
                                  ? 'text-indigo-700 font-semibold bg-indigo-50'
                                  : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-700'
                              }`}
                            >
                              {child.label}
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              return isExternal(link.path) ? (
                <a
                  key={link.id}
                  href={link.path}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-all text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.id}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? 'text-indigo-700 bg-indigo-50'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Action CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/request-quote"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-700 hover:bg-indigo-800 shadow-sm hover:shadow transition-all"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isOpen && (
          <div className="lg:hidden border-t border-slate-200 py-3 space-y-1">
            {navLinks.map((link) => {
              const hasChildren = (link.children?.length ?? 0) > 0;

              if (hasChildren) {
                const expanded = openMobileSubmenu === link.id;
                return (
                  <div key={link.id}>
                    <button
                      onClick={() => setOpenMobileSubmenu(expanded ? null : link.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-base font-medium ${
                        isParentActive(link)
                          ? 'text-indigo-700 bg-indigo-50 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                    </button>
                    {expanded && (
                      <div className="pl-4 mt-1 space-y-1 border-l-2 border-slate-100 ml-3">
                        {link.children!.map((child) =>
                          isExternal(child.path) ? (
                            <a
                              key={child.id}
                              href={child.path}
                              target="_blank"
                              rel="noreferrer"
                              onClick={() => { setIsOpen(false); setOpenMobileSubmenu(null); }}
                              className="block px-3 py-2 rounded-md text-sm text-slate-600 hover:bg-slate-50"
                            >
                              {child.label}
                            </a>
                          ) : (
                            <Link
                              key={child.id}
                              to={child.path}
                              onClick={() => { setIsOpen(false); setOpenMobileSubmenu(null); }}
                              className={`block px-3 py-2 rounded-md text-sm ${
                                isActive(child.path)
                                  ? 'text-indigo-700 font-semibold bg-indigo-50'
                                  : 'text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              {child.label}
                            </Link>
                          )
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              return isExternal(link.path) ? (
                <a
                  key={link.id}
                  href={link.path}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.id}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? 'text-indigo-700 bg-indigo-50 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3">
              <Link
                to="/request-quote"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-white bg-indigo-700 hover:bg-indigo-800 transition-colors"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
