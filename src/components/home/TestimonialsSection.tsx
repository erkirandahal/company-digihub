import React from 'react';
import { Star } from 'lucide-react';
import { Testimonial } from '../../types';

interface Props {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<Props> = ({ testimonials }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 mb-2">
          Institutional Trust
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Verified Stakeholder Feedback
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          Real feedback from municipal officers and healthcare operations directors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((test) => (
          <div
            key={test.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(test.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 text-xs italic leading-relaxed">
                "{test.testimonial}"
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-100">
              <h4 className="font-bold text-slate-900 text-sm">{test.client_name}</h4>
              <p className="text-slate-500 text-xs">
                {test.position} — {test.organization}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
