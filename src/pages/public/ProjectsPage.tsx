import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, ChevronLeft } from 'lucide-react';
import { projectsApi, corporateApi, getStorageUrl } from '../../services/api';
import { Project, Industry } from '../../types';
import { usePageMeta } from '../../hooks/usePageMeta';

export const ProjectsPage: React.FC = () => {
  usePageMeta({
    title: 'Enterprise Case Studies | Digihub Innovation Center',
    description:
      'Explore real-world software engineering deployments across public administration, healthcare logistics, and rural cooperative management.',
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    corporateApi.getIndustries().then((res) => setIndustries(res.data || []));
  }, []);

  useEffect(() => {
    setLoading(true);
    projectsApi.getAll({ industry: selectedIndustry, page }).then((res) => {
      setProjects(res.data || []);
      setLastPage(res.meta?.last_page || 1);
      setTotal(res.meta?.total ?? (res.data || []).length);
      setLoading(false);
    });
  }, [selectedIndustry, page]);

  const filteredProjects = projects;

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-indigo-50/60 text-slate-900 py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-indigo-700 font-bold text-xs uppercase tracking-wider">
              Portfolio & Deployments
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Enterprise Case Studies
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              Explore our real-world software engineering deployments across public administration, healthcare logistics, and rural cooperative management.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 pb-6 border-b border-slate-200">
          <button
            onClick={() => { setSelectedIndustry('all'); setPage(1); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedIndustry === 'all'
                ? 'bg-indigo-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Industries {selectedIndustry === 'all' && `(${total})`}
          </button>
          {industries.map((ind) => {
            return (
              <button
                key={ind.id}
                onClick={() => { setSelectedIndustry(ind.slug); setPage(1); }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedIndustry === ind.slug
                    ? 'bg-indigo-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {ind.name} {selectedIndustry === ind.slug && `(${total})`}
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-col justify-between hover:shadow-md transition-all group overflow-hidden"
            >
              {proj.featured_image && (
                <div className="h-40 w-full overflow-hidden bg-slate-100">
                  <img
                    src={getStorageUrl(proj.featured_image)}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-7 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-bold text-[11px]">
                    {proj.project_type}
                  </span>
                  {proj.industry && <span>{proj.industry.name}</span>}
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                  {proj.title}
                </h3>
                <p className="text-slate-600 text-xs mt-2.5 leading-relaxed">
                  {proj.short_description}
                </p>

                {proj.results && (
                  <div className="mt-5 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <span className="font-bold text-slate-900 block">Demonstrated Impact:</span>
                    <p className="text-slate-600 leading-relaxed">{proj.results}</p>
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {proj.technologies?.slice(0, 2).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/projects/${proj.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 group-hover:text-emerald-700"
                >
                  <span>Full Case Study</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              </div>
            </div>
          ))}
        </div>

        {lastPage > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-slate-600 px-3">
              Page {page} of {lastPage}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
              disabled={page >= lastPage}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* Quote Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-700 text-white rounded-3xl p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">Have a similar institutional challenge?</h3>
            <p className="text-indigo-100 text-sm">
              We specialize in custom adaptations of proven architectural patterns.
            </p>
          </div>
          <Link
            to="/request-quote"
            className="px-6 py-3 rounded-xl bg-white hover:bg-indigo-50 text-indigo-700 font-bold text-sm whitespace-nowrap transition-colors"
          >
            Start Scoping Call
          </Link>
        </div>
      </section>
    </div>
  );
};
