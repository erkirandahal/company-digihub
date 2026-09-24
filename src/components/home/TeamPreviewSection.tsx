import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getStorageUrl } from '../../services/api';
import { TeamMember } from '../../types';

interface Props {
  team: TeamMember[];
}

export const TeamPreviewSection: React.FC<Props> = ({ team }) => {
  if (team.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 mb-2">
            Engineering Team
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Meet Our Team
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-xl">
            Engineers with extensive track records in full-stack architecture, spatial GIS systems, and municipal governance portals.
          </p>
        </div>
        <Link
          to="/team"
          className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800"
        >
          <span>Meet the Full Team</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.slice(0, 4).map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-all"
          >
            {member.photo ? (
              <img
                src={getStorageUrl(member.photo)}
                alt={member.name}
                className="w-14 h-14 rounded-2xl object-cover mb-4"
              />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-lg mb-4">
                {member.name.split(' ').map((n) => n[0]).join('')}
              </div>
            )}
            <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
            <p className="text-xs font-semibold text-emerald-600">{member.position}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
