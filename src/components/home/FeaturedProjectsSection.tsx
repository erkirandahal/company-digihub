import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { getStorageUrl } from '../../services/api';
import { Project } from '../../types';

interface Props {
  projects: Project[];
}

export const FeaturedProjectsSection: React.FC<Props> = ({ projects }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 mb-2">
            Case Studies
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Featured Engineering Deployments
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Production systems designed for reliability, verified security, and measurable organizational impact.
          </p>
        </div>
        <Link
          to="/projects"
          className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800"
        >
          <span>Explore All Projects</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {projects.slice(0, 3).map((proj) => (
          <div
            key={proj.id}
            className="bg-white border border-slate-200 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all overflow-hidden"
          >
            {proj.featured_image && (
              <div className="h-36 w-full overflow-hidden bg-slate-100">
                <img
                  src={getStorageUrl(proj.featured_image)}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6 flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-700">
                  {proj.project_type}
                </span>
                {proj.industry && <span>{proj.industry.name}</span>}
              </div>

              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                {proj.title}
              </h3>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                {proj.short_description}
              </p>

              {proj.results && (
                <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <span className="font-bold text-slate-900 block mb-0.5">Impact:</span>
                  <span className="text-slate-600">{proj.results}</span>
                </div>
              )}
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {proj.technologies?.slice(0, 2).map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
              <Link
                to={`/projects/${proj.slug}`}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                <span>Case Study</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
