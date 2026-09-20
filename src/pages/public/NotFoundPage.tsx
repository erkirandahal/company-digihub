import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-8">
      <div className="space-y-3">
        <span className="text-indigo-700 font-bold text-xs uppercase tracking-wider">
          Error 404
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Page Not Found
        </h1>
        <p className="text-slate-600 text-base leading-relaxed max-w-xl mx-auto">
          The page you're looking for doesn't exist, may have been moved, or the link you followed is broken.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-sm transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-semibold text-sm transition-all"
        >
          <span>Contact Us</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
        <Link to="/services" className="text-slate-500 hover:text-indigo-700 transition-colors flex items-center gap-1.5">
          <Search className="w-3.5 h-3.5" />
          <span>Services</span>
        </Link>
        <Link to="/projects" className="text-slate-500 hover:text-indigo-700 transition-colors">
          Projects
        </Link>
        <Link to="/blog" className="text-slate-500 hover:text-indigo-700 transition-colors">
          Insights
        </Link>
        <Link to="/careers" className="text-slate-500 hover:text-indigo-700 transition-colors">
          Careers
        </Link>
      </div>
    </div>
  );
};
