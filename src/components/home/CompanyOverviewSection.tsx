import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Globe, ShieldCheck, Database } from 'lucide-react';

export const CompanyOverviewSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-5">
          <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100">
            About Digihub
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Specialized Software Engineering for Public Sector & Private Enterprise
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Headquartered in Putalisadak, Kathmandu, Nepal, DIGIHUB INNOVATION CENTER PVT. LTD. bridges the gap between institutional business logic and modern digital efficiency.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Whether building municipal GIS land registration platforms or high-volume private ERPs, our systems are engineered without proprietary vendor lock-in, ensuring you retain total ownership of your data models and application source code.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Zero vendor lock-in</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>cPanel and Cloud Ready</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Immutable audit trails</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Dedicated post-launch SLA</span>
            </div>
          </div>

          <div className="pt-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800"
            >
              <span>Read our full organizational mission</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              System Topology
            </span>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800">
              Production Standard
            </span>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Client Tier: React + Vite</h4>
                <p className="text-slate-500 text-xs mt-0.5">
                  Responsive SPA with centralized Axios service and accessible design.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">API Tier: Laravel 12 + Sanctum</h4>
                <p className="text-slate-500 text-xs mt-0.5">
                  Strict Form Requests, Eloquent ORM, and comprehensive role authorization.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Data Tier: MySQL 8+ Engine</h4>
                <p className="text-slate-500 text-xs mt-0.5">
                  ACID compliant schema with foreign key cascades and spatial GIS extensions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
