import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Target, Eye, Award } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';

export const AboutPage: React.FC = () => {
  usePageMeta({
    title: 'About Us | Digihub Innovation Center',
    description:
      'Digihub Innovation Center Pvt. Ltd. is an established technology and software engineering firm delivering mission-critical enterprise systems and municipal e-governance platforms.',
  });

  return (
    <div className="space-y-20 pb-20">
      {/* Header Banner */}
      <section className="bg-indigo-50/60 text-slate-900 py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-indigo-700 font-bold text-xs uppercase tracking-wider">
              Company Profile
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              About Digihub Innovation Center
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              DIGIHUB INNOVATION CENTER PVT. LTD. is an established technology and software engineering firm delivering mission-critical enterprise systems, municipal e-governance platforms, and API-first architectures.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, and Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To engineer secure, scalable, and transparent digital platforms that eliminate paper bottlenecks and empower organizations across public and private sectors.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To be the benchmark center of software engineering excellence in Nepal, recognized for architectural integrity, relational data rigor, and lasting client value.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Core Values</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Architectural transparency, disciplined normalization, zero vendor lock-in, and an unwavering commitment to data sovereignty and security.
            </p>
          </div>
        </div>
      </section>

      {/* Engineering Principles */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Architectural Commitments
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Every system we construct conforms to four non-negotiable software engineering rules:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Strict API-First Decoupling</span>
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed pl-7">
                All business logic, database queries, and authorization rules reside within the certified Laravel REST backend. The React client interacts purely through structured JSON payloads.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Relational Integrity & 3NF Schemas</span>
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed pl-7">
                We design normalized MySQL tables with foreign keys, composite indexes, and strict cascading rules, avoiding undocumented document stores for critical transactional records.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Comprehensive Audit Logging</span>
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed pl-7">
                Administrative changes to permissions, services, articles, and citizen records produce immutable audit logs with timestamped actor identification.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Hosting Freedom & cPanel Compatibility</span>
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed pl-7">
                Our code is organized to run on standard cPanel hosting, VPS instances, or containerized Cloud Run environments without bespoke runtime requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-700 text-white rounded-3xl p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Have a technical project in mind?</h3>
            <p className="text-indigo-100 text-sm mt-1">
              Let's schedule an architectural scoping session with our lead developers.
            </p>
          </div>
          <Link
            to="/request-quote"
            className="px-6 py-3 rounded-xl bg-white hover:bg-indigo-50 text-indigo-700 font-bold text-sm whitespace-nowrap transition-colors"
          >
            Request Technical Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};
