import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Solution } from '../../types';

interface Props {
  solutions: Solution[];
}

export const EnterpriseSolutionsSection: React.FC<Props> = ({ solutions }) => {
  return (
    <section className="bg-slate-50 text-slate-900 py-20 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 mb-2">
            Solutions
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Solution Packages
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Combined software, research and consulting packages tailored to institutional needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map((sol, index) => (
            <div
              key={sol.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <div>
                <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                  Package 0{index + 1}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">
                  {sol.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-6">
                  {sol.short_description}
                </p>

                <div className="space-y-2 mb-6">
                  <span className="text-xs font-semibold text-slate-700 block">
                    Core Capabilities:
                  </span>
                  {sol.features?.slice(0, 3).map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/solutions`}
                  className="text-xs font-semibold text-indigo-700 hover:text-indigo-800 flex items-center gap-1"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
