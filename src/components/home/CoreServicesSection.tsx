import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, CheckCircle2, Code2, Building, Globe, Smartphone, Cpu } from 'lucide-react';
import { Service } from '../../types';

interface Props {
  services: Service[];
}

const getServiceIcon = (name: string) => {
  switch (name) {
    case 'Custom Software Development':
      return <Code2 className="w-6 h-6 text-emerald-600" />;
    case 'Government Software Solutions':
      return <Building className="w-6 h-6 text-emerald-600" />;
    case 'Web Application Development':
      return <Globe className="w-6 h-6 text-emerald-600" />;
    case 'Mobile Application Development':
      return <Smartphone className="w-6 h-6 text-emerald-600" />;
    default:
      return <Cpu className="w-6 h-6 text-emerald-600" />;
  }
};

export const CoreServicesSection: React.FC<Props> = ({ services }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 mb-2">
            Capabilities
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Core Engineering Services
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-xl">
            Comprehensive software engineering and technical consulting tailored to institutional requirements.
          </p>
        </div>
        <Link
          to="/services"
          className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800"
        >
          <span>View All Services</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.slice(0, 6).map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-md transition-all group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4 group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-colors">
                {getServiceIcon(service.name)}
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {service.name}
              </h3>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                {service.short_description}
              </p>

              {service.features && (
                <ul className="mt-4 space-y-1.5 text-xs text-slate-700">
                  {service.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {service.technologies?.slice(0, 2).map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Link
                to={`/services/${service.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 group-hover:text-emerald-700"
              >
                <span>Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
