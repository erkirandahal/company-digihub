import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { getStorageUrl } from '../../services/api';
import { Blog } from '../../types';

interface Props {
  blogs: Blog[];
}

export const LatestBlogSection: React.FC<Props> = ({ blogs }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 mb-2">
            Insights
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Latest from Pragya Innovative
          </h2>
        </div>
        <Link
          to="/blog"
          className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800"
        >
          <span>View All Insights</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.slice(0, 3).map((post) => (
          <div
            key={post.id}
            className="bg-white border border-slate-200 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all group overflow-hidden"
          >
            {post.featured_image && (
              <div className="h-36 w-full overflow-hidden bg-slate-100">
                <img
                  src={getStorageUrl(post.featured_image)}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-6 flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-3">
                <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">
                  {post.category?.name || 'Insight'}
                </span>
                <span>•</span>
                <span>{post.reading_time} min read</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">{post.published_at}</span>
              <Link
                to={`/blog/${post.slug}`}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                <span>Read Post</span>
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
