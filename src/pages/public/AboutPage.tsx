import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Target, Eye, Landmark, Globe2, Users, GraduationCap, Building2, FileText } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';

export const AboutPage: React.FC = () => {
  usePageMeta({
    title: 'About Us | Pragya Innovative Pvt. Ltd.',
    description:
      'Pragya Innovative Pvt. Ltd. is a Kathmandu-based company bringing together technology, research, policy consulting, publishing and capacity building under one roof.',
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
              About Pragya Innovative
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              Pragya Innovative Pvt. Ltd. is a private limited company established under the Companies Act, 2063 (Nepal), with its registered office at Bijuli Bazar, Kathmandu Metropolitan City Ward No. 10, Kathmandu. It works in manufacturing, trading and services.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              The company brings together technology, research, policy consulting, publishing and capacity building under one roof. It serves federal, provincial and local governments, ministries, commissions, public and community organizations, development partners, universities, research institutions and the private sector.
            </p>
          </div>
        </div>
      </section>

      {/* Company Snapshot — legal facts from the Memorandum of Association */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-indigo-700" />
            <h2 className="text-xl font-bold text-slate-900">Company Snapshot</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-sm">
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">Company Type</p>
              <p className="text-slate-800 font-semibold">Private Limited</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">Registered Under</p>
              <p className="text-slate-800 font-semibold">Companies Act, 2063</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">Established</p>
              <p className="text-slate-800 font-semibold">2083 Bhadra 16 B.S.</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">Nature of Business</p>
              <p className="text-slate-800 font-semibold">Manufacturing, Trading & Services</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">Paid-Up Capital</p>
              <p className="text-slate-800 font-semibold">NPR 1,00,000</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">Shares</p>
              <p className="text-slate-800 font-semibold">1,000 @ NPR 100</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To deliver reliable technology, evidence-based research and practical consulting that strengthen institutions and support sustainable development in Nepal.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To be a trusted partner for innovation, knowledge and digital transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Choose Us
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Technology, research, consulting and publishing working together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>One-Stop Solution</span>
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed pl-7">
                Technology, research, consulting and publishing under one roof.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Multi-Sector Expertise</span>
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed pl-7">
                Governance, environment, climate, GESI, engineering and law.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Evidence-Based Approach</span>
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed pl-7">
                Data-driven research and monitoring & evaluation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Future-Ready</span>
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed pl-7">
                Artificial intelligence, machine learning and digital transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Who We Work With
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-start gap-3 p-5 rounded-xl bg-white border border-slate-200">
            <Landmark className="w-5 h-5 text-indigo-700 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-slate-800">Federal, Provincial & Local Governments</p>
              <p className="text-xs text-slate-500 mt-0.5">Ministries, departments, commissions, authorities and municipal offices.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-5 rounded-xl bg-white border border-slate-200">
            <Globe2 className="w-5 h-5 text-indigo-700 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-slate-800">Development Partners</p>
              <p className="text-xs text-slate-500 mt-0.5">National and international development and donor organizations.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-5 rounded-xl bg-white border border-slate-200">
            <Users className="w-5 h-5 text-indigo-700 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-slate-800">NGOs & Community Organizations</p>
              <p className="text-xs text-slate-500 mt-0.5">Non-government and community-based organizations.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-5 rounded-xl bg-white border border-slate-200">
            <GraduationCap className="w-5 h-5 text-indigo-700 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-slate-800">Universities & Research Institutions</p>
              <p className="text-xs text-slate-500 mt-0.5">Higher education and research institutions.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-5 rounded-xl bg-white border border-slate-200">
            <Building2 className="w-5 h-5 text-indigo-700 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-slate-800">Private Sector</p>
              <p className="text-xs text-slate-500 mt-0.5">Companies, consultants and private institutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-700 text-white rounded-3xl p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Have a project in mind?</h3>
            <p className="text-indigo-100 text-sm mt-1">
              Let's discuss your software, research, policy consulting or publishing needs.
            </p>
          </div>
          <Link
            to="/request-quote"
            className="px-6 py-3 rounded-xl bg-white hover:bg-indigo-50 text-indigo-700 font-bold text-sm whitespace-nowrap transition-colors"
          >
            Request a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};
