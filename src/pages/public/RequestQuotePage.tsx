import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ArrowLeft, Send, Sparkles } from 'lucide-react';
import { leadsApi } from '../../services/api';
import { usePageMeta } from '../../hooks/usePageMeta';

export const RequestQuotePage: React.FC = () => {
  usePageMeta({
    title: 'Request a Proposal | Digihub Innovation Center Pvt. Ltd.',
    description:
      'Tell us about your project and get a tailored proposal from Digihub Innovation Center Pvt. Ltd.',
  });
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    project_title: '',
    project_description: '',
    required_services: preselectedService ? [preselectedService] : ['IT & Technology Consulting'],
    estimated_budget: '$10,000 - $25,000',
    timeline: '3 - 6 Months',
    preferred_contact_method: 'Email',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const servicesList = [
    'IT & Technology Consulting',
    'Software & Website Development',
    'E-Commerce Solutions & Digital Marketing',
    'Computer Networking, Hardware & Electronics',
    'Training, Seminars & Certification Courses',
    'Printing, Branding, Graphics & Stationery',
  ];

  const toggleService = (serv: string) => {
    setFormData((prev) => {
      const exists = prev.required_services.includes(serv);
      if (exists) {
        return { ...prev, required_services: prev.required_services.filter((s) => s !== serv) };
      } else {
        return { ...prev, required_services: [...prev.required_services, serv] };
      }
    });
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await leadsApi.submit(formData);
      setSubmitted(true);
    } catch {
      setError('Failed to record project request. Please retry or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-indigo-50/60 text-slate-900 py-16 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-indigo-700 font-bold text-xs uppercase tracking-wider">
            Project Scoping Portal
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Request a Proposal
          </h1>
          <p className="text-slate-600 text-base max-w-2xl mx-auto leading-relaxed">
            Outline your project so we can prepare a tailored proposal and quotation.
          </p>
        </div>
      </section>

      {/* Form Container */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
          {/* Step Indicator */}
          {!submitted && (
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200 text-xs">
              <div
                className={`flex items-center gap-2 font-bold ${
                  step >= 1 ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                  1
                </span>
                <span>Services Required</span>
              </div>
              <div className="h-0.5 w-12 bg-slate-200"></div>
              <div
                className={`flex items-center gap-2 font-bold ${
                  step >= 2 ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                  2
                </span>
                <span>Scope & Timeline</span>
              </div>
              <div className="h-0.5 w-12 bg-slate-200"></div>
              <div
                className={`flex items-center gap-2 font-bold ${
                  step >= 3 ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                  3
                </span>
                <span>Stakeholder Info</span>
              </div>
            </div>
          )}

          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Project Proposal Registered!
              </h3>
              <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">
                Thank you, <span className="font-semibold">{formData.name}</span>. Your requirements have been sent to our team. We will review the scope and get in touch within 24 hours.
              </p>
              <div className="pt-6">
                <Link
                  to="/"
                  className="px-6 py-2.5 rounded-xl bg-indigo-700 text-white font-bold text-xs hover:bg-indigo-700 transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={step === 3 ? handleFinalSubmit : (e) => { e.preventDefault(); setStep(step + 1); }}>
              {/* STEP 1: Select Services */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Select Required Services
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Choose one or more services your project entails.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {servicesList.map((s, idx) => {
                      const selected = formData.required_services.includes(s);
                      return (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => toggleService(s)}
                          className={`p-3.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                            selected
                              ? 'bg-emerald-50/80 border-emerald-500 text-emerald-950'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <span>{s}</span>
                          {selected && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={formData.required_services.length === 0}
                      className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-gold-950 font-bold text-xs flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                      <span>Proceed to Scope</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Scope & Timeline */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Scope, Budget & Timeline
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Help us understand the project complexity and delivery targets.
                    </p>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Project Working Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.project_title}
                        onChange={(e) => setFormData({ ...formData, project_title: e.target.value })}
                        placeholder="e.g. Municipal Building Permit Tracking MIS"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">
                          Estimated Budget Allocation
                        </label>
                        <select
                          value={formData.estimated_budget}
                          onChange={(e) => setFormData({ ...formData, estimated_budget: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                        >
                          <option>&lt; $5,000</option>
                          <option>$5,000 - $10,000</option>
                          <option>$10,000 - $25,000</option>
                          <option>$25,000 - $50,000</option>
                          <option>$50,000+</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">
                          Desired Delivery Window
                        </label>
                        <select
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                        >
                          <option>1 - 2 Months</option>
                          <option>3 - 6 Months</option>
                          <option>6 - 12 Months</option>
                          <option>Ongoing / Flexible</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Detailed Project Requirements / Brief *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.project_description}
                        onChange={(e) => setFormData({ ...formData, project_description: e.target.value })}
                        placeholder="Detail expected user roles, workflows to automate, legacy databases to migrate, and external systems to interface..."
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                      ></textarea>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 flex items-center gap-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!formData.project_title || !formData.project_description) {
                          alert('Please enter project title and description.');
                          return;
                        }
                        setStep(3);
                      }}
                      className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-gold-950 font-bold text-xs flex items-center gap-2 transition-colors"
                    >
                      <span>Proceed to Contact Info</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Stakeholder Info & Submit */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Organization & Stakeholder Details
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Where should we send the proposal?
                    </p>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">
                          Primary Contact Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Suresh Shrestha"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">
                          Organization / Company *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. Apex Health Trust"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">
                          Institutional Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="suresh@company.com"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">
                          Telephone / Mobile *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+977-98XXXXXXXX"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Preferred Communication Channel
                      </label>
                      <select
                        value={formData.preferred_contact_method}
                        onChange={(e) => setFormData({ ...formData, preferred_contact_method: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                      >
                        <option>Email</option>
                        <option>Phone Call</option>
                        <option>In-Person Consultation (Kathmandu)</option>
                        <option>Video Conference (Google Meet)</option>
                      </select>
                    </div>
                  </div>

                  {error && <p className="text-rose-600 text-xs">{error}</p>}

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 flex items-center gap-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 transition-colors disabled:opacity-50 shadow-md shadow-emerald-600/20"
                    >
                      <Send className="w-4 h-4" />
                      <span>{loading ? 'Transmitting...' : 'Submit Project Proposal'}</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
