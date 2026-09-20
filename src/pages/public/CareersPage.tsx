import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';
import { careersApi } from '../../services/api';
import { Career } from '../../types';
import { usePageMeta } from '../../hooks/usePageMeta';

export const CareersPage: React.FC = () => {
  usePageMeta({
    title: 'Careers & Open Roles | Digihub Innovation Center',
    description:
      'Join our engineering team building enterprise software, e-governance platforms, and API-first architectures in Nepal.',
  });
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    careersApi.getAll().then((res) => {
      setCareers(res.data || []);
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
              Work With Us
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Careers at Digihub Innovation Center
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              Join an engineering team focused on creating impactful digital platforms, high-performance APIs, and institutional software in Nepal.
            </p>
          </div>
        </div>
      </section>

      {/* Engineering Culture Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <h4 className="font-bold text-slate-900 text-base">Architectural Rigor</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              We design software according to sound relational principles, clean domain layers, and audited security.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <h4 className="font-bold text-slate-900 text-base">Continuous Learning</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Dedicated time for technology spikes, open source contribution, and conference participation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <h4 className="font-bold text-slate-900 text-base">Flexible Culture</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Hybrid working arrangements with modern workstations in Putalisadak, Kathmandu.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <h4 className="font-bold text-slate-900 text-base">Real Public Impact</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Build e-governance systems used by tens of thousands of citizens every single day.
            </p>
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Current Open Positions</h2>
          <p className="text-slate-600 text-sm mt-1">
            Apply online with your CV, project portfolio, and GitHub links.
          </p>
        </div>

        <div className="space-y-4">
          {careers.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold">
                    {job.department}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <Briefcase className="w-3.5 h-3.5" />
                    {job.employment_type}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <MapPin className="w-3.5 h-3.5" />
                    {job.location}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {job.job_title}
                </h3>
                <p className="text-slate-600 text-xs line-clamp-2 max-w-2xl">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.skills?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="sm:text-right shrink-0">
                <Link
                  to={`/careers/${job.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-700 group-hover:bg-indigo-800 text-white font-bold text-xs transition-colors"
                >
                  <span>View & Apply</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                {job.deadline && (
                  <span className="block text-[11px] text-slate-400 mt-2">
                    Deadline: {job.deadline}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
