import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Code2, BarChart3, Landmark } from 'lucide-react';

export const CompanyOverviewSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-5">
          <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100">
            About Pragya Innovative
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Technology, Research & Consulting Under One Roof
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Pragya Innovative Pvt. Ltd. is a private limited company registered under the Companies Act, 2063, with its registered office in Bijuli Bazar, Kathmandu. We work in manufacturing, trading and services.
          </p>
          <p className="text-slate-600 leading-relaxed">
            The company brings together technology, research, policy consulting, publishing and capacity building under one roof — serving federal, provincial and local governments, ministries, commissions, public and community organizations, development partners, universities, research institutions and the private sector.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>One-stop technology & consulting partner</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Multi-sector expertise</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Evidence-based research approach</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Future-ready: AI & digital transformation</span>
            </div>
          </div>

          <div className="pt-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800"
            >
              <span>Read more about us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              What We Do
            </span>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800">
              5 Core Services
            </span>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">IT, Software & Digital Infrastructure</h4>
                <p className="text-slate-500 text-xs mt-0.5">
                  Software, apps, websites, cloud, cybersecurity and AI solutions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Research, Survey & Data Management</h4>
                <p className="text-slate-500 text-xs mt-0.5">
                  Baseline, feasibility and impact studies, and monitoring & evaluation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Landmark className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Policy & Institutional Consulting</h4>
                <p className="text-slate-500 text-xs mt-0.5">
                  Laws, policies, plans, DPR, EIA/IEE and governance advisory.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
