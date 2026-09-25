import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Code2, BarChart3, Landmark, BookOpen, Users2, Cpu, ArrowRight } from 'lucide-react';
import { servicesApi, getStorageUrl } from '../../services/api';
import { Service } from '../../types';
import { usePageMeta } from '../../hooks/usePageMeta';

export const ServicesPage: React.FC = () => {
  usePageMeta({
    title: 'Our Services | Pragya Innovative Pvt. Ltd.',
    description:
      'Software & digital solutions, research and data management, policy and institutional consulting, publishing, and capacity-building services in Nepal.',
  });
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    servicesApi.getAll().then((res) => {
      setServices(res.data || []);
      setLoading(false);
    });
  }, []);

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'IT, Software & Digital Infrastructure':
        return <Code2 className="w-6 h-6 text-emerald-600" />;
      case 'Research, Survey & Data Management':
        return <BarChart3 className="w-6 h-6 text-emerald-600" />;
      case 'Policy, Management & Institutional Consulting':
        return <Landmark className="w-6 h-6 text-emerald-600" />;
      case 'Publishing, Digital Content & Communication':
        return <BookOpen className="w-6 h-6 text-emerald-600" />;
      case 'Capacity Building, Collaboration & Professional Services':
        return <Users2 className="w-6 h-6 text-emerald-600" />;
      default:
        return <Cpu className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-indigo-50/60 text-slate-900 py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-indigo-700 font-bold text-xs uppercase tracking-wider">
              Our Capabilities
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Our Services
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              Software & digital solutions, research and data management, policy and institutional consulting, publishing, and capacity-building services for institutions across Nepal.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-md transition-all group overflow-hidden"
            >
              {service.image && (
                <div className="h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={getStorageUrl(service.image)}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-8 flex flex-col justify-between flex-1">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                  {getServiceIcon(service.name)}
                </div>

                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {service.name}
                </h3>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                  {service.short_description}
                </p>

                {service.features && (
                  <div className="mt-6 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Key Deliverables:
                    </span>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {service.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-8 mt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {service.technologies?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 group-hover:text-emerald-700"
                >
                  <span>Detailed Specifications</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-700 text-white rounded-3xl p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Require a customized service package?</h3>
            <p className="text-indigo-100 text-sm">
              Our architects assess your technical requirements and produce a tailored proposal.
            </p>
          </div>
          <Link
            to="/request-quote"
            className="px-6 py-3 rounded-xl bg-white hover:bg-indigo-50 text-indigo-700 font-bold text-sm whitespace-nowrap transition-colors"
          >
            Request a Proposal
          </Link>
        </div>
      </section>
    </div>
  );
};
