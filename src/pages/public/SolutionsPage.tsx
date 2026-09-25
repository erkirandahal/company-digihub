import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Layers, Award } from 'lucide-react';
import { solutionsApi } from '../../services/api';
import { Solution } from '../../types';
import { usePageMeta } from '../../hooks/usePageMeta';

export const SolutionsPage: React.FC = () => {
  usePageMeta({
    title: 'Solutions | Digihub Innovation Center Pvt. Ltd.',
    description:
      'Solution packages combining IT, networking, training and printing expertise from Digihub Innovation Center Pvt. Ltd.',
  });
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    solutionsApi.getAll().then((res) => {
      setSolutions(res.data || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-indigo-50/60 text-slate-900 py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-indigo-700 font-bold text-xs uppercase tracking-wider">
              Service Packages
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Solutions
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              Combined IT, networking, training and printing packages tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Detailed List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {solutions.map((sol, index) => (
          <div
            key={sol.id}
            className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
          >
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Solution 0{index + 1}
                </span>
                <span className="text-xs text-slate-400 font-medium capitalize">
                  {sol.status}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {sol.title}
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed">
                {sol.description}
              </p>

              {/* Features List */}
              <div className="pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Core Functional Components:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sol.features?.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              {sol.benefits && (
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Measurable Institutional Outcomes:
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {sol.benefits.map((b, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Action Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <h4 className="font-bold text-slate-900 text-sm">
                Technical Blueprint
              </h4>
              <div className="space-y-1.5">
                <span className="text-[11px] text-slate-500 block">Underlying Stack:</span>
                <div className="flex flex-wrap gap-1">
                  {sol.technologies?.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-white border border-slate-200 text-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to={`/request-quote?service=${encodeURIComponent(sol.title)}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gold-500 hover:bg-gold-600 text-gold-950 font-bold text-xs transition-colors"
                >
                  <span>Request Solution Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
