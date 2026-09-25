import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2, Tag, ChevronRight } from 'lucide-react';
import { blogsApi, getStorageUrl } from '../../services/api';
import { Blog } from '../../types';
import { usePageMeta } from '../../hooks/usePageMeta';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [related, setRelated] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  usePageMeta({
    title: blog ? `${blog.title} | Digihub Innovation Center Pvt. Ltd.` : undefined,
    description: blog?.excerpt,
    image: blog?.featured_image ? getStorageUrl(blog.featured_image) : undefined,
  });

  useEffect(() => {
    if (slug) {
      blogsApi.getBySlug(slug).then((res) => {
        setBlog(res.data?.post || null);
        setRelated(res.data?.related || []);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-slate-500">Loading technical brief...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Article Not Found</h2>
        <Link to="/blog" className="text-emerald-600 hover:underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-indigo-50/60 text-slate-900 py-16 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Knowledge Base</span>
          </Link>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold">
                {blog.category?.name || 'Technical Brief'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {blog.reading_time} min read
              </span>
              <span>•</span>
              <span>{blog.published_at}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-slate-900">
              {blog.title}
            </h1>

            <div className="pt-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-700 text-white flex items-center justify-center font-bold text-sm">
                {blog.author?.name ? blog.author.name[0] : 'P'}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{blog.author?.name || 'Digihub Innovation Center'}</p>
                <p className="text-xs text-slate-500">Editorial Team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {blog.featured_image && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xs h-64 sm:h-80">
            <img
              src={getStorageUrl(blog.featured_image)}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      )}

      {/* Main Body */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-h2:text-2xl prose-h2:border-b prose-h2:pb-2 prose-h3:text-xl prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700">
          <div className="bg-slate-50 border-l-4 border-emerald-500 p-5 rounded-r-xl my-6 not-prose">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Executive Summary
            </h4>
            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              {blog.excerpt}
            </p>
          </div>

          <div className="whitespace-pre-line text-slate-800 text-base leading-relaxed">
            {blog.content}
          </div>
        </div>

        {/* Tags */}
        {blog.tags && (
          <div className="pt-10 mt-10 border-t border-slate-200 flex items-center gap-2">
            <Tag className="w-4 h-4 text-slate-400" />
            <div className="flex flex-wrap gap-1.5">
              {blog.tags.map((t) => (
                <span
                  key={t.id}
                  className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700"
                >
                  #{t.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="pt-12 mt-12 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Related Engineering Briefs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/blog/${r.slug}`}
                  className="p-5 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-bold text-emerald-600 block mb-1">
                      {r.category?.name}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm leading-snug">
                      {r.title}
                    </h4>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>{r.reading_time} min read</span>
                    <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                      Read <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
