import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail, Phone, MapPin, Send, CheckCircle2, Code2, ArrowUpRight,
  Facebook, Linkedin, Twitter, Instagram, Youtube, Github,
} from 'lucide-react';
import { newsletterApi, getStorageUrl } from '../../services/api';
import { useSiteSettings } from '../../hooks/useSiteSettings';

const SOCIAL_ICONS: Record<string, React.ElementType> = {
  Facebook,
  LinkedIn: Linkedin,
  'Twitter/X': Twitter,
  Instagram,
  YouTube: Youtube,
  GitHub: Github,
};

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {
    site_name,
    site_logo_url,
    social_links,
    address,
    phone,
    contact_email,
    footer_about_text,
    footer_newsletter_heading,
    footer_newsletter_subtext,
  } = useSiteSettings();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await newsletterApi.subscribe(email);
      setSubscribed(true);
      setEmail('');
    } catch {
      setError('Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-slate-50 text-slate-500 text-sm border-t border-slate-200">
      {/* Upper Footer: Newsletter Bar */}
      <div className="border-b border-slate-200 bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              {footer_newsletter_heading || 'Stay Updated with Digihub Innovation Center'}
            </h3>
            <p className="text-slate-500 text-sm max-w-xl">
              {footer_newsletter_subtext ||
                'Occasional updates on our services, offers and technology tips.'}
            </p>
          </div>
          <div className="w-full md:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 text-indigo-700 bg-indigo-50 border border-indigo-200 px-4 py-2.5 rounded-lg">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium text-sm">Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter institutional email..."
                  required
                  className="px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-sm w-full"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Subscribing...' : 'Subscribe'}</span>
                </button>
              </form>
            )}
            {error && <p className="text-rose-600 text-xs mt-1.5">{error}</p>}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Company Profile */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              {site_logo_url ? (
                <img src={getStorageUrl(site_logo_url)} alt={site_name || 'Site logo'} className="h-10 w-auto" />
              ) : site_name ? (
                <>
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-black tracking-tight text-slate-900">
                    {site_name}
                  </span>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-200 animate-pulse" />
                  <div className="w-32 h-4 rounded bg-slate-200 animate-pulse" />
                </div>
              )}
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              {footer_about_text ||
                (site_name
                  ? `${site_name} provides IT, e-commerce, networking, training and printing services in Nepal.`
                  : 'Providing IT, e-commerce, networking, training and printing services in Nepal.')}
            </p>
            <div className="space-y-2 pt-2 text-xs text-slate-500">
              {address && (
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-indigo-700 mt-0.5 shrink-0" />
                  <span>{address}</span>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-indigo-700 shrink-0" />
                  <span>{phone}</span>
                </div>
              )}
              {contact_email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-indigo-700 shrink-0" />
                  <span>{contact_email}</span>
                </div>
              )}
            </div>

            {social_links && social_links.length > 0 && (
              <div className="flex items-center gap-3 pt-2">
                {social_links.map((link, i) => {
                  const Icon = SOCIAL_ICONS[link.platform] || Facebook;
                  return (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      title={link.platform}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-700 hover:border-indigo-300 transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Column 2: Core Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services/it-technology-consulting" className="hover:text-indigo-700 transition-colors">
                  IT Consulting
                </Link>
              </li>
              <li>
                <Link to="/services/software-website-development" className="hover:text-indigo-700 transition-colors">
                  Software & Websites
                </Link>
              </li>
              <li>
                <Link to="/services/ecommerce-solutions-digital-marketing" className="hover:text-indigo-700 transition-colors">
                  E-Commerce
                </Link>
              </li>
              <li>
                <Link to="/services/computer-networking-hardware-electronics" className="hover:text-indigo-700 transition-colors">
                  Networking & Hardware
                </Link>
              </li>
              <li>
                <Link to="/services/training-seminars-certification-courses" className="hover:text-indigo-700 transition-colors">
                  Training & Certification
                </Link>
              </li>
              <li>
                <Link to="/services/printing-branding-graphics-stationery" className="hover:text-indigo-700 transition-colors">
                  Printing & Branding
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-indigo-700 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-indigo-700 transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-indigo-700 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-700 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources & Admin */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/blog" className="hover:text-indigo-700 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/request-quote" className="hover:text-indigo-700 transition-colors">
                  Request a Proposal
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-indigo-700 hover:text-indigo-800 transition-colors flex items-center gap-1 font-medium">
                  <span>CMS Portal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-200 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <p>© {new Date().getFullYear()}{site_name ? ` ${site_name}` : ''} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
