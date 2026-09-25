import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, ChevronLeft, BookOpen, Clock, Tag } from 'lucide-react';
import { blogsApi, getStorageUrl } from '../../services/api';
import { Blog } from '../../types';
import { usePageMeta } from '../../hooks/usePageMeta';

export const BlogPage: React.FC = () => {
  usePageMeta({
    title: 'Blog & Insights | Pragya Innovative Pvt. Ltd.',
    description:
      'Articles, research notes and updates from Pragya Innovative on technology, research, policy and publishing.',
  });
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    blogsApi
      .getAll({ category: selectedCategory, search: searchTerm, page })
      .then((res) => {
        setBlogs(res.data || []);
        setLastPage(res.meta?.last_page || 1);
        setLoading(false);
      });
  }, [selectedCategory, searchTerm, page]);

  const categories = [
    { slug: 'all', name: 'All Insights' },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-indigo-50/60 text-slate-900 py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-indigo-700 font-bold text-xs uppercase tracking-wider">
              Knowledge Base
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Blog & Insights
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              Articles, research notes and updates from Pragya Innovative on technology, research, policy and publishing.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Category Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-200">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.slug}
                onClick={() => { setSelectedCategory(c.slug); setPage(1); }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === c.slug
                    ? 'bg-indigo-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Blogs List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-col justify-between hover:shadow-md transition-all group overflow-hidden"
            >
              {blog.featured_image && (
                <div className="h-40 w-full overflow-hidden bg-slate-100">
                  <img
                    src={getStorageUrl(blog.featured_image)}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-7 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold">
                    {blog.category?.name || 'Insight'}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{blog.reading_time} min read</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                  {blog.title}
                </h2>
                <p className="text-slate-600 text-xs mt-3 leading-relaxed line-clamp-3">
                  {blog.excerpt}
                </p>

                {blog.tags && (
                  <div className="mt-4 flex flex-wrap gap-1">
                    {blog.tags.map((t) => (
                      <span
                        key={t.id}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600"
                      >
                        #{t.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="text-slate-500 text-[11px]">
                  <span>By {blog.author?.name}</span>
                </div>

                <Link
                  to={`/blog/${blog.slug}`}
                  className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  <span>Read Full Article</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              </div>
            </article>
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
    </div>
  );
};
