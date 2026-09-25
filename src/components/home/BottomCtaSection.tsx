import React from 'react';
import { Link } from 'react-router-dom';

export const BottomCtaSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-indigo-700 text-white rounded-3xl p-10 sm:p-14 relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to start your next project?
          </h2>
          <p className="text-indigo-100 text-sm leading-relaxed">
            Talk to our team about your software, research, policy consulting or publishing needs and receive a formal proposal.
          </p>
          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <Link
              to="/request-quote"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-indigo-50 text-indigo-700 font-bold text-sm transition-all"
            >
              Request a Proposal
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm border border-indigo-400 transition-all"
            >
              Direct Contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
