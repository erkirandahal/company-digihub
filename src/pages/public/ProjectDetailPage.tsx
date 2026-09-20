import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldAlert, Award, Lightbulb, Calendar, User, ExternalLink, Github } from 'lucide-react';
import { projectsApi, getStorageUrl } from '../../services/api';
import { Project } from '../../types';
import { usePageMeta } from '../../hooks/usePageMeta';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  usePageMeta({
    title: project ? `${project.title} | Digihub Innovation Center` : undefined,
    description: project?.short_description,
    image: project?.featured_image ? getStorageUrl(project.featured_image) : undefined,
  });

  useEffect(() => {
    if (slug) {
      projectsApi.getBySlug(slug).then((res) => {
        setProject(res.data);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-slate-500">Loading case study details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Project Not Found</h2>
        <Link to="/projects" className="text-emerald-600 hover:underline">
          Back to Projects
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
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Case Studies</span>
          </Link>

          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-indigo-700 font-bold text-xs uppercase tracking-wider">
                {project.project_type}
              </span>
              {project.industry && (
                <>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 text-xs">{project.industry.name}</span>
                </>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              {project.title}
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              {project.short_description}
            </p>
          </div>
        </div>
      </section>

      {project.featured_image && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xs h-72 sm:h-96">
            <img
              src={getStorageUrl(project.featured_image)}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Case Study Text */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Project Background & Overview
              </h2>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line text-base">
                {project.full_description}
              </p>
            </div>

            {/* Challenges */}
            {project.challenges && (
              <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-6 space-y-2">
                <h3 className="text-lg font-bold text-rose-950 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-600" />
                  <span>The Architectural Challenges</span>
                </h3>
                <p className="text-rose-900/80 text-sm leading-relaxed">
                  {project.challenges}
                </p>
              </div>
            )}

            {/* Solutions */}
            {project.solutions && (
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 space-y-2">
                <h3 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-emerald-600" />
                  <span>Digihub Engineering Solutions</span>
                </h3>
                <p className="text-emerald-900/80 text-sm leading-relaxed">
                  {project.solutions}
                </p>
              </div>
            )}

            {/* Results */}
            {project.results && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span>Measurable Impact & Results</span>
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {project.results}
                </p>
              </div>
            )}

            {project.gallery && project.gallery.length > 0 && (
              <div className="pt-4 border-t border-slate-200 space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Deployment Gallery</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.gallery.map((img, idx) => (
                    <div key={idx} className="rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100">
                      <img
                        src={getStorageUrl(img.image_path)}
                        alt={img.caption || `${project.title} screenshot ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Metadata */}
          <div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6 sticky top-28">
              <h3 className="font-bold text-slate-900 text-base">
                Deployment Metadata
              </h3>

              <div className="space-y-3 text-xs">
                {project.client && (
                  <div>
                    <span className="text-slate-400 block mb-0.5">Client / Partner:</span>
                    <span className="font-semibold text-slate-800">{project.client}</span>
                  </div>
                )}
                {project.start_date && (
                  <div>
                    <span className="text-slate-400 block mb-0.5">Timeline:</span>
                    <span className="font-semibold text-slate-800">
                      {project.start_date} to {project.completion_date || 'Present'}
                    </span>
                  </div>
                )}
              </div>

              {project.technologies && (
                <div className="pt-4 border-t border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-900 block">
                    Technology Stack:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded-md text-[11px] font-semibold bg-white border border-slate-200 text-slate-800"
                      >
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(project.project_url || project.github_url) && (
                <div className="pt-4 border-t border-slate-200 space-y-2">
                  {project.project_url && (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white border border-slate-300 hover:border-emerald-500 text-slate-800 font-bold text-xs transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Live Demo</span>
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white border border-slate-300 hover:border-emerald-500 text-slate-800 font-bold text-xs transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>View Source Code</span>
                    </a>
                  )}
                </div>
              )}

              <div className="pt-4 border-t border-slate-200">
                <Link
                  to={`/request-quote?service=${encodeURIComponent(project.title)}`}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gold-500 hover:bg-gold-600 text-gold-950 font-bold text-xs transition-colors"
                >
                  <span>Inquire for Similar Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
