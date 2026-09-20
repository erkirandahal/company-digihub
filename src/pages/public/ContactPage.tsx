import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { contactApi } from '../../services/api';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { usePageMeta } from '../../hooks/usePageMeta';

export const ContactPage: React.FC = () => {
  usePageMeta({
    title: 'Contact Us | Digihub Innovation Center',
    description:
      'Have an enterprise project or government system requirement? Reach our engineering team for scoping sessions and technical advisory.',
  });
  const {
    maps_lat,
    maps_lng,
    maps_embed_url,
    site_name,
    address,
    phone,
    mobile,
    contact_email,
    support_email,
  } = useSiteSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    service_interested_in: 'Custom Software Development',
    budget_range: '$5,000 - $15,000',
    preferred_contact_method: 'Email',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await contactApi.submit(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        service_interested_in: 'Custom Software Development',
        budget_range: '$5,000 - $15,000',
        preferred_contact_method: 'Email',
        message: '',
      });
    } catch {
      setError('Unable to send message. Please try again or reach us by phone.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-indigo-50/60 text-slate-900 py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-indigo-700 font-bold text-xs uppercase tracking-wider">
              Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Contact Digihub Innovation Center
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              Have an enterprise project or government system requirement? Reach our engineering team in Kathmandu for scoping sessions and technical advisory.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Office Details */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Corporate Headquarters
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {site_name || 'Digihub Innovation Center'} operates out of {address || 'our headquarters'}.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              {address && (
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900">Office Address</h4>
                    <p className="text-slate-600 text-xs mt-0.5">{address}</p>
                  </div>
                </div>
              )}

              {(phone || mobile) && (
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900">Telephone Lines</h4>
                    <p className="text-slate-600 text-xs mt-0.5">
                      {[phone, mobile].filter(Boolean).join(' / ')}
                    </p>
                  </div>
                </div>
              )}

              {(contact_email || support_email) && (
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <Mail className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900">Official Inquiries</h4>
                    <p className="text-slate-600 text-xs mt-0.5">
                      {[contact_email, support_email].filter(Boolean).join(' / ')}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Clock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Operating Hours</h4>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Sunday – Friday: 9:00 AM – 6:00 PM NPT
                  </p>
                </div>
              </div>
            </div>

            {(maps_embed_url || (maps_lat && maps_lng)) && (
              <div className="rounded-2xl overflow-hidden border border-slate-200 h-64">
                <iframe
                  title="Digihub Innovation Center office location"
                  src={maps_embed_url || `https://www.google.com/maps?q=${maps_lat},${maps_lng}&output=embed`}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            )}
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xs">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Send an Inquiry
              </h3>
              <p className="text-slate-600 text-xs mb-8">
                All submissions are logged in our secure CRM and answered by technical leadership within 24 business hours.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-xl font-bold text-emerald-950">
                    Inquiry Successfully Registered
                  </h4>
                  <p className="text-sm text-emerald-800 max-w-md mx-auto">
                    Thank you for reaching out. A confirmation has been recorded and our team will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-5 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold hover:bg-emerald-800"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Bijay Karki"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500 text-xs"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="bijay@organization.com"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+977-98XXXXXXXX"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500 text-xs"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Organization / Municipality
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Kathmandu Valley Rural Health"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Service of Interest
                      </label>
                      <select
                        value={formData.service_interested_in}
                        onChange={(e) => setFormData({ ...formData, service_interested_in: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500 text-xs"
                      >
                        <option>Custom Software Development</option>
                        <option>Government Software Solutions</option>
                        <option>Web Application Development</option>
                        <option>Mobile Application Development</option>
                        <option>Digital Transformation Consulting</option>
                        <option>Other Special Request</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Estimated Budget Bracket
                      </label>
                      <select
                        value={formData.budget_range}
                        onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500 text-xs"
                      >
                        <option>&lt; $5,000</option>
                        <option>$5,000 - $15,000</option>
                        <option>$15,000 - $35,000</option>
                        <option>$35,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Brief inquiry summary..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Project Requirements / Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Provide context regarding your technical requirements, expected users, or integration needs..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500 text-xs"
                    ></textarea>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-rose-600 text-xs">
                      <AlertCircle className="w-4 h-4" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-6 rounded-xl bg-gold-500 hover:bg-gold-600 text-gold-950 font-bold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Sending...' : 'Transmit Inquiry'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
