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
            A Disciplined 4-Stage Software Lifecycle
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Eliminating ambiguity and technical debt through rigorous specification and phased delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
            <span className="text-3xl font-black text-slate-200">01</span>
            <h4 className="text-base font-bold text-slate-900 mt-2 mb-1">
              Architecture Discovery
            </h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Analyzing business logic, defining security policies, and constructing data flow diagrams.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
            <span className="text-3xl font-black text-slate-200">02</span>
            <h4 className="text-base font-bold text-slate-900 mt-2 mb-1">
              Relational Design
            </h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Drafting normalized MySQL migrations, seeders, and RESTful API endpoints.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
            <span className="text-3xl font-black text-slate-200">03</span>
            <h4 className="text-base font-bold text-slate-900 mt-2 mb-1">
              Iterative Development
            </h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Building reactive, accessible React components backed by Laravel API controllers and Form Requests.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
            <span className="text-3xl font-black text-slate-200">04</span>
            <h4 className="text-base font-bold text-slate-900 mt-2 mb-1">
              Deployment & SLA
            </h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              cPanel or Cloud Run deployment, SSL setup, scheduler automation, and capacity training.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
