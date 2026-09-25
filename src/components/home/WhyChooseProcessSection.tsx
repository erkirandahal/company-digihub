import React from 'react';

export const WhyChooseProcessSection: React.FC = () => {
  return (
    <section className="bg-slate-50 py-20 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 mb-2">
            Our Methodology
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            A Disciplined, Evidence-Based Approach
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            From scoping to delivery, every engagement follows a consistent, quality-driven process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
            <span className="text-3xl font-black text-slate-200">01</span>
            <h4 className="text-base font-bold text-slate-900 mt-2 mb-1">
              Scoping & Requirement Analysis
            </h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Understanding objectives, stakeholders and technical or research requirements in detail.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
            <span className="text-3xl font-black text-slate-200">02</span>
            <h4 className="text-base font-bold text-slate-900 mt-2 mb-1">
              Design & Development
            </h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Building software, research instruments, policy drafts or content plans against agreed specifications.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
            <span className="text-3xl font-black text-slate-200">03</span>
            <h4 className="text-base font-bold text-slate-900 mt-2 mb-1">
              Quality Review & Consultation
            </h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Verifying outputs with clients and stakeholders through structured review cycles.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
            <span className="text-3xl font-black text-slate-200">04</span>
            <h4 className="text-base font-bold text-slate-900 mt-2 mb-1">
              Delivery & Ongoing Support
            </h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Final handover, publication or deployment, with continued support as needed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
