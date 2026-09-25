import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Code2, Network, Printer } from 'lucide-react';

export const CompanyOverviewSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-5">
          <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100">
            About Digihub Innovation Center
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            IT, E-Commerce & Printing Services Under One Roof
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Digihub Innovation Center Pvt. Ltd. is a private limited company registered under the Companies Act, 2063, with its registered office in Suryabinayak Municipality, Bhaktapur. We work in trading and services.
          </p>
          <p className="text-slate-600 leading-relaxed">
            The company brings together IT consultancy, software and website development, e-commerce, computer networking and hardware, technology training, and printing and branding under one roof — serving government and non-government organizations, companies and firms, schools and colleges, and individual customers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>One-stop IT & business services partner</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>From software to hardware to print</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Training & certification partnerships</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Serving businesses, institutions & the public</span>
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
              6 Core Services
            </span>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Software & Website Development</h4>
                <p className="text-slate-500 text-xs mt-0.5">
                  Custom software, websites and IT-enabled services.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Network className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Networking, Hardware & Electronics</h4>
                <p className="text-slate-500 text-xs mt-0.5">
                  Computer networking, hardware and electronics supply.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Printer className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Printing, Branding & Stationery</h4>
                <p className="text-slate-500 text-xs mt-0.5">
                  Digital & offset printing, graphics design and supplies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
