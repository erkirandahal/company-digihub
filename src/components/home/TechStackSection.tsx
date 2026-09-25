import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Technology } from '../../types';

interface Props {
  technologies: Technology[];
}

const techCategories = ['All', 'Backend', 'Frontend', 'Database', 'Cloud & DevOps', 'Other'];

export const TechStackSection: React.FC<Props> = ({ technologies }) => {
  const [activeTechCategory, setActiveTechCategory] = useState<string>('All');

  const filteredTechnologies =
    activeTechCategory === 'All'
      ? technologies
      : technologies.filter((t) => t.category_name === activeTechCategory);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 mb-2">
          Technology Stack
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Tools & Technologies We Work With
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          From web development frameworks to networking hardware and design tools.
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {techCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTechCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTechCategory === cat
                  ? 'bg-indigo-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTechnologies.map((tech) => (
          <div
            key={tech.id}
            className="bg-white border border-slate-200 rounded-xl p-4 hover:border-emerald-500/50 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                {tech.category_name}
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-2">
                {tech.name}
              </h4>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                {tech.description}
              </p>
            </div>
            {tech.website_url && (
              <div className="mt-3 pt-3 border-t border-slate-100 text-[11px]">
                <a
                  href={tech.website_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-emerald-600 inline-flex items-center gap-1"
                >
                  <span>Official docs</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
