import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';

export const StaticHeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-indigo-50/40 text-slate-900 pt-20 pb-28 border-b border-slate-200">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-200 text-indigo-700 text-xs font-semibold tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIGIHUB INNOVATION CENTER PVT. LTD.</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Software, Innovation &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">
              IT Solutions
            </span>
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
            From custom software, websites and IT consulting to e-commerce, networking, training and printing, Digihub Innovation Center brings innovative technology and business services together for organizations and individuals across Nepal.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02]"
            >
              <span>Our Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-semibold text-sm transition-all"
            >
              <span>Contact Us</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Service Pillars Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-slate-200 text-slate-600">
          <div className="space-y-1">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">IT & Software</span>
            <p className="text-xs text-slate-500">Websites, Software & Consulting</p>
          </div>
          <div className="space-y-1">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">E-Commerce</span>
            <p className="text-xs text-slate-500">Online Stores & Marketing</p>
          </div>
          <div className="space-y-1">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">Networking</span>
            <p className="text-xs text-slate-500">Hardware & IT Infrastructure</p>
          </div>
          <div className="space-y-1">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">Printing</span>
            <p className="text-xs text-slate-500">Branding & Stationery</p>
          </div>
        </div>
      </div>
    </section>
  );
};
