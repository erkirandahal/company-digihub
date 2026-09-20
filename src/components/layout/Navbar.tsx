import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ShieldCheck, PhoneCall, Code2 } from 'lucide-react';
import { authApi, getStorageUrl } from '../../services/api';
import { useSiteSettings } from '../../hooks/useSiteSettings';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentUser = authApi.getCurrentUser();
  const { site_name, site_logo_url, address, phone } = useSiteSettings();
  const phoneHref = phone ? `tel:${phone.replace(/[^+\d]/g, '')}` : undefined;

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Insights', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

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
          <Link to="/" className="flex items-center gap-3 group">
            {site_logo_url ? (
              <img src={getStorageUrl(site_logo_url)} alt={site_name || 'Site logo'} className="h-10 w-auto" />
            ) : site_name ? (
              <>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-black text-xl shadow-sm group-hover:from-indigo-400 group-hover:to-indigo-600 transition-colors">
                  <Code2 className="w-6 h-6" />
                </div>
                <span className="text-xl font-black tracking-tight text-slate-900 block leading-tight">
                  {site_name}
                </span>
              </>
            ) : (
              // Real site identity hasn't loaded yet (and no cached copy exists) —
              // show a neutral loading placeholder rather than any fallback name.
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 animate-pulse" />
                <div className="w-28 h-5 rounded bg-slate-100 animate-pulse" />
              </div>
            )}
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'text-indigo-700 bg-indigo-50'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
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
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'text-indigo-700 bg-indigo-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
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
