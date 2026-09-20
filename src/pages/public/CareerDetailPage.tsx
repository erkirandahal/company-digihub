import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Briefcase, MapPin, Calendar, Send, CheckCircle } from 'lucide-react';
import { careersApi } from '../../services/api';
import { Career } from '../../types';

export const CareerDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [career, setCareer] = useState<Career | null>(null);
  const [loading, setLoading] = useState(true);

  // Application form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio_url: '',
    linkedin_url: '',
    cover_letter: '',
    resume_path: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (slug) {
      careersApi.getBySlug(slug).then((res) => {
        setCareer(res.data);
        setLoading(false);
      });
    }
  }, [slug]);

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug) return;
    setSubmitting(true);
    setFormError('');

    try {
      await careersApi.apply(slug, formData);
      setSubmitted(true);
    } catch {
      setFormError('Failed to submit application. Please check fields and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-500">
        Loading position details...
      </div>
    );
  }

  if (!career) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Position Not Found</h2>
        <Link to="/careers" className="text-emerald-600 hover:underline">
          Back to Careers
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-indigo-50/60 text-slate-900 py-16 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/careers"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Openings</span>
          </Link>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 font-semibold">
                {career.department}
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <Briefcase className="w-3.5 h-3.5" />
                {career.employment_type}
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <MapPin className="w-3.5 h-3.5" />
                {career.location}
              </span>
              {career.deadline && (
                <span className="flex items-center gap-1 text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  Deadline: {career.deadline}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              {career.job_title}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content & Application Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Job Details */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">About The Role</h2>
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                {career.description}
              </p>
            </div>

            {career.responsibilities && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900">Key Responsibilities</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  {career.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {career.requirements && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900">Experience & Qualifications</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  {career.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {career.benefits && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900">Perks & Compensation</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  {career.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Application Form */}
          <div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sticky top-28 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Apply for this Role</h3>
              <p className="text-xs text-slate-600 mb-4">
                Submit your candidacy to our talent acquisition team.
              </p>

              {submitted ? (
                <div className="p-4 rounded-xl bg-emerald-100/80 border border-emerald-300 text-emerald-900 space-y-2 text-center">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-sm">Application Received</h4>
                  <p className="text-xs">
                    Our technical recruitment team will review your qualifications and contact you.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitApplication} className="space-y-3.5 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Roshan Sharma"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="roshan@example.com"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+977-98XXXXXXXX"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      GitHub / Portfolio Link
                    </label>
                    <input
                      type="url"
                      value={formData.portfolio_url}
                      onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
                      placeholder="https://github.com/yourhandle"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      value={formData.linkedin_url}
                      onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Cover Note / Background
                    </label>
                    <textarea
                      rows={3}
                      value={formData.cover_letter}
                      onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                      placeholder="Briefly highlight your experience with Laravel, React, or relational databases..."
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                    ></textarea>
                  </div>

                  {formError && <p className="text-rose-600 text-[11px]">{formError}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-2.5 px-4 bg-gold-500 hover:bg-gold-600 text-gold-950 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? 'Submitting...' : 'Submit Application'}</span>
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
