import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Database, Layers } from 'lucide-react';
import { servicesApi, getStorageUrl } from '../../services/api';
import { Service } from '../../types';
import { usePageMeta } from '../../hooks/usePageMeta';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  usePageMeta({
    title: service ? `${service.name} | Digihub Innovation Center` : undefined,
    description: service?.short_description,
    image: service?.image ? getStorageUrl(service.image) : undefined,
  });

  useEffect(() => {
    if (slug) {
      servicesApi.getBySlug(slug).then((res) => {
        setService(res.data);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-slate-500">Loading service specifications...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Service Not Found</h2>
        <Link to="/services" className="text-emerald-600 hover:underline">
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-indigo-50/60 text-slate-900 py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Services</span>
          </Link>

          <div className="max-w-3xl space-y-4">
            <span className="text-indigo-700 font-bold text-xs uppercase tracking-wider">
              Service Overview
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              {service.name}
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              {service.short_description}
            </p>
          </div>
        </div>
      </section>

      {service.image && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xs h-72 sm:h-96">
            <img
              src={getStorageUrl(service.image)}
              alt={service.name}
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      )}

      {/* Main Content Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Detailed Scope & Specifications
              </h2>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line text-base">
                {service.full_description}
              </p>
            </div>

            {service.features && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-xl font-bold text-slate-900">
                  Included Features & Engineering Deliverables
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-800">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-200 space-y-4">
              <h3 className="text-xl font-bold text-slate-900">
                Technology Standards Applied
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.technologies?.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {service.gallery && service.gallery.length > 0 && (
              <div className="pt-4 border-t border-slate-200 space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Gallery</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {service.gallery.map((img, idx) => (
                    <div key={idx} className="rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100">
                      <img
                        src={getStorageUrl(img.image_path)}
                        alt={img.caption || `${service.name} screenshot ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Inquiry Card */}
          <div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sticky top-28 space-y-6 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900">
                Deploy This Service
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect directly with our solutions architects to discuss technical requirements, database models, and budget estimates.
              </p>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Sanctum Token & RBAC security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-600" />
                  <span>Normalized MySQL 8+ Schemas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span>Full source code handover</span>
                </div>
              </div>

              <Link
                to={`/request-quote?service=${encodeURIComponent(service.name)}`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gold-500 hover:bg-gold-600 text-gold-950 font-bold text-sm transition-colors"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
