import React, { useEffect, useState } from 'react';
import { Save, CheckCircle2, Plus, X } from 'lucide-react';
import { settingsApi } from '../../services/api';
import { AuditLog } from '../../types';
import { ImageUpload } from '../../components/admin/ImageUpload';

type SocialPlatform = 'Facebook' | 'LinkedIn' | 'Twitter/X' | 'Instagram' | 'YouTube' | 'GitHub';
interface SocialLink {
  platform: SocialPlatform;
  url: string;
}
interface EmbedItem {
  label: string;
  url: string;
}

export const AdminSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'settings' | 'audit'>('settings');
  const [settings, setSettings] = useState<Record<string, any>>({
    site_name: 'Digihub Innovation Center',
    tagline: 'Leading Software Development & Digital Transformation in Nepal',
    contact_email: 'info@digihub.com.np',
    support_email: 'support@digihub.com.np',
    phone: '+977-1-4567890',
    mobile: '+977-9801234567',
    address: 'Putalisadak, Kathmandu, Bagmati Province, Nepal',
    pan_vat_number: '609876543',
    meta_title: 'Digihub Innovation Center | Enterprise Software & Public Systems',
    meta_description:
      'Pioneering software engineering, municipal GIS platforms, and mission-critical public infrastructure in Kathmandu, Nepal.',
    footer_about_text: '',
    footer_newsletter_heading: 'Subscribe to Digihub Tech Insights',
    footer_newsletter_subtext:
      'Receive quarterly technical briefs on enterprise architecture, government information systems, and API design.',
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [siteLogoUrl, setSiteLogoUrl] = useState<string | null>(null);
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null);
  const [ogImageUrl, setOgImageUrl] = useState<string | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [embeds, setEmbeds] = useState<EmbedItem[]>([]);
  const [mapsLat, setMapsLat] = useState('');
  const [mapsLng, setMapsLng] = useState('');
  const [mapsEmbedUrl, setMapsEmbedUrl] = useState('');

  useEffect(() => {
    settingsApi.getAll().then((res) => {
      const data = res.data || {};
      setSettings((prev) => ({ ...prev, ...data }));
      setSiteLogoUrl(data.site_logo_url || null);
      setFaviconUrl(data.favicon_url || null);
      setOgImageUrl(data.og_image_url || null);
      setMapsLat(data.maps_lat || '');
      setMapsLng(data.maps_lng || '');
      setMapsEmbedUrl(data.maps_embed_url || '');
      try {
        setSocialLinks(data.social_links ? JSON.parse(data.social_links) : []);
      } catch {
        setSocialLinks([]);
      }
      try {
        setEmbeds(data.embeds ? JSON.parse(data.embeds) : []);
      } catch {
        setEmbeds([]);
      }
    });
    settingsApi.getAuditLogs().then((res) => {
      setAuditLogs(res.data || []);
    });
  }, []);

  const addSocialLink = () => setSocialLinks([...socialLinks, { platform: 'Facebook', url: '' }]);
  const removeSocialLink = (i: number) => setSocialLinks(socialLinks.filter((_, idx) => idx !== i));
  const updateSocialLink = (i: number, patch: Partial<SocialLink>) =>
    setSocialLinks(socialLinks.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));

  const addEmbed = () => setEmbeds([...embeds, { label: '', url: '' }]);
  const removeEmbed = (i: number) => setEmbeds(embeds.filter((_, idx) => idx !== i));
  const updateEmbed = (i: number, patch: Partial<EmbedItem>) =>
    setEmbeds(embeds.map((e, idx) => (idx === i ? { ...e, ...patch } : e)));

  const isAllowedEmbedUrl = (url: string) => {
    const patterns = [
      /^https:\/\/(www\.)?google\.com\/maps(\/embed)?/i,
      /^https:\/\/(www\.)?youtube(-nocookie)?\.com\/embed\//i,
      /^https:\/\/player\.vimeo\.com\/video\//i,
      /^https:\/\/calendar\.google\.com\//i,
      /^https:\/\/docs\.google\.com\/forms\//i,
      /^https:\/\/calendly\.com\//i,
    ];
    return patterns.some((p) => p.test(url));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);

    if (mapsEmbedUrl && !isAllowedEmbedUrl(mapsEmbedUrl)) {
      setSaveError('The Google Maps embed URL must be a real Google Maps embed link (google.com/maps/embed...).');
      return;
    }
    for (const embed of embeds) {
      if (embed.url && !isAllowedEmbedUrl(embed.url)) {
        setSaveError(`"${embed.url}" is not from an approved embed provider (YouTube, Vimeo, Google Maps/Calendar/Forms, Calendly).`);
        return;
      }
    }

    setSaving(true);

    const payload = {
      ...settings,
      site_logo_url: siteLogoUrl || '',
      favicon_url: faviconUrl || '',
      og_image_url: ogImageUrl || '',
      social_links: JSON.stringify(socialLinks.filter((s) => s.url)),
      embeds: JSON.stringify(embeds.filter((e) => e.url)),
      maps_lat: mapsLat,
      maps_lng: mapsLng,
      maps_embed_url: mapsEmbedUrl,
    };

    await settingsApi.update(payload);
    setSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            System Configuration & Audit Trail
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure institutional parameters, corporate metadata, and inspect immutable audit logs. The{' '}
            <strong>Branding</strong>, <strong>Contact & Location</strong>, <strong>Social Media Links</strong>, and{' '}
            <strong>Header & Footer Content</strong> sections below control exactly what appears in the site's
            Header and Footer.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'settings'
                ? 'bg-indigo-700 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            System Settings
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'audit'
                ? 'bg-indigo-700 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Audit Logs ({auditLogs.length})
          </button>
        </div>
      </div>

      {activeTab === 'settings' ? (
        <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs space-y-6 max-w-3xl text-xs">
          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>System parameters updated and persisted to database.</span>
            </div>
          )}

          {saveError && (
            <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-rose-900 font-semibold">
              {saveError}
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <span>Branding</span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold normal-case">
                Header & Footer logo
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <ImageUpload
                  value={siteLogoUrl}
                  onChange={setSiteLogoUrl}
                  purpose="logo"
                  hint="Site Logo — SVG or transparent PNG, ~240x64px"
                />
              </div>
              <div>
                <ImageUpload
                  value={faviconUrl}
                  onChange={setFaviconUrl}
                  purpose="favicon"
                  hint="Favicon — 512x512 PNG (16/32/180px sizes generated automatically)"
                />
              </div>
              <div>
                <ImageUpload
                  value={ogImageUrl}
                  onChange={setOgImageUrl}
                  purpose="og_image"
                  shape="wide"
                  hint="Default OG / Social Share Image — 1200x630px"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              Corporate Identity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Company Legal Name</label>
                <input
                  type="text"
                  value={settings.site_name || ''}
                  onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tax / PAN Number</label>
                <input
                  type="text"
                  value={settings.pan_vat_number || ''}
                  onChange={(e) => setSettings({ ...settings, pan_vat_number: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Corporate Tagline</label>
              <input
                type="text"
                value={settings.tagline || ''}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <span>Contact & Location</span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold normal-case">
                Header & Footer
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Official Inquiry Email</label>
                <input
                  type="email"
                  value={settings.contact_email || ''}
                  onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Telephone</label>
                <input
                  type="text"
                  value={settings.phone || ''}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Headquarters Address</label>
              <input
                type="text"
                value={settings.address || ''}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Office Latitude</label>
                <input
                  type="text"
                  value={mapsLat}
                  onChange={(e) => setMapsLat(e.target.value)}
                  placeholder="e.g. 27.7041"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Office Longitude</label>
                <input
                  type="text"
                  value={mapsLng}
                  onChange={(e) => setMapsLng(e.target.value)}
                  placeholder="e.g. 85.3239"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Or paste a raw Google Maps embed URL (optional, overrides lat/lng)
              </label>
              <input
                type="text"
                value={mapsEmbedUrl}
                onChange={(e) => setMapsEmbedUrl(e.target.value)}
                placeholder="https://www.google.com/maps/embed?pb=..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
              />
            </div>

            {(mapsLat && mapsLng) || mapsEmbedUrl ? (
              <div className="rounded-xl overflow-hidden border border-slate-200 h-48">
                <iframe
                  title="Office location preview"
                  src={mapsEmbedUrl || `https://www.google.com/maps?q=${mapsLat},${mapsLng}&output=embed`}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            ) : null}
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>Social Media Links</span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold normal-case">
                  Footer icon row
                </span>
              </h3>
              <button
                type="button"
                onClick={addSocialLink}
                className="inline-flex items-center gap-1 text-emerald-700 font-bold hover:text-emerald-800"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Link</span>
              </button>
            </div>

            {socialLinks.map((link, i) => (
              <div key={i} className="flex items-center gap-2">
                <select
                  value={link.platform}
                  onChange={(e) => updateSocialLink(i, { platform: e.target.value as SocialPlatform })}
                  className="px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500 w-40"
                >
                  <option>Facebook</option>
                  <option>LinkedIn</option>
                  <option>Twitter/X</option>
                  <option>Instagram</option>
                  <option>YouTube</option>
                  <option>GitHub</option>
                </select>
                <input
                  type="text"
                  value={link.url}
                  onChange={(e) => updateSocialLink(i, { url: e.target.value })}
                  placeholder="https://..."
                  className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => removeSocialLink(i)}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              Header & Footer Content
            </h3>
            <p className="text-[11px] text-slate-400 -mt-2">
              Text shown in the footer's company blurb and newsletter signup bar. Leave blank to use the
              default copy.
            </p>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Footer Company Description</label>
              <textarea
                rows={2}
                value={settings.footer_about_text || ''}
                onChange={(e) => setSettings({ ...settings, footer_about_text: e.target.value })}
                placeholder="A premier software engineering company delivering enterprise software, e-governance platforms..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Newsletter Bar Heading</label>
                <input
                  type="text"
                  value={settings.footer_newsletter_heading || ''}
                  onChange={(e) => setSettings({ ...settings, footer_newsletter_heading: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Newsletter Bar Subtext</label>
                <input
                  type="text"
                  value={settings.footer_newsletter_subtext || ''}
                  onChange={(e) => setSettings({ ...settings, footer_newsletter_subtext: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900">Embeds</h3>
              <button
                type="button"
                onClick={addEmbed}
                className="inline-flex items-center gap-1 text-emerald-700 font-bold hover:text-emerald-800"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Embed</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400 -mt-2">
              Only approved providers are accepted (YouTube, Vimeo, Google Maps/Calendar/Forms, Calendly).
            </p>

            {embeds.map((embed, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={embed.label}
                  onChange={(e) => updateEmbed(i, { label: e.target.value })}
                  placeholder="Label"
                  className="w-40 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="text"
                  value={embed.url}
                  onChange={(e) => updateEmbed(i, { url: e.target.value })}
                  placeholder="https://..."
                  className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => removeEmbed(i)}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              Search Engine Optimization (SEO)
            </h3>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Default Meta Title</label>
              <input
                type="text"
                value={settings.meta_title || ''}
                onChange={(e) => setSettings({ ...settings, meta_title: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Meta Description</label>
              <textarea
                rows={2}
                value={settings.meta_description || ''}
                onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
              ></textarea>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-gold-950 font-bold transition-colors shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Configuration'}</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="py-3 px-4 font-bold"># ID</th>
                  <th className="py-3 px-4 font-bold">Module</th>
                  <th className="py-3 px-4 font-bold">Action Taken</th>
                  <th className="py-3 px-4 font-bold">Operator</th>
                  <th className="py-3 px-4 font-bold">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 font-mono text-slate-400">#{log.id}</td>
                    <td className="py-4 px-4 font-bold uppercase text-slate-700">{log.module}</td>
                    <td className="py-4 px-4 text-slate-900">{log.action}</td>
                    <td className="py-4 px-4 text-slate-600 font-medium">
                      {log.user?.name || 'System Admin'}
                    </td>
                    <td className="py-4 px-4 text-slate-400">{log.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
