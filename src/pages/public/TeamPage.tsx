import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, ArrowRight } from 'lucide-react';
import { corporateApi, getStorageUrl } from '../../services/api';
import { TeamMember } from '../../types';
import { usePageMeta } from '../../hooks/usePageMeta';

export const TeamPage: React.FC = () => {
  usePageMeta({
    title: 'Our Team | Digihub Innovation Center',
    description:
      'Meet the engineers and leadership behind Digihub Innovation Center — a team with deep experience in full-stack architecture, spatial GIS systems, and municipal governance portals.',
  });
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    corporateApi.getTeam().then((res) => setTeam(res.data || []));
  }, []);

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-indigo-50/60 text-slate-900 py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-indigo-700 font-bold text-xs uppercase tracking-wider">
              Our People
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Meet the Team
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              Engineers and leadership with extensive track records in full-stack architecture, spatial GIS systems, and municipal governance portals.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {team.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-12">Team profiles coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div>
                  {member.photo ? (
                    <img
                      src={getStorageUrl(member.photo)}
                      alt={member.name}
                      className="w-16 h-16 rounded-2xl object-cover mb-4"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xl mb-4">
                      {member.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                  <p className="text-xs font-semibold text-emerald-600 mb-1">{member.position}</p>
                  {member.department && (
                    <p className="text-[11px] text-slate-400 mb-3">{member.department}</p>
                  )}
                  {member.biography && (
                    <p className="text-slate-600 text-xs leading-relaxed mb-4">
                      {member.biography}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  {member.skills && member.skills.length > 0 && (
                    <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1">
                      {member.skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                  {(member.email || member.linkedin) && (
                    <div className="flex items-center gap-3 pt-1">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="text-slate-400 hover:text-indigo-700 transition-colors"
                          title={member.email}
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-indigo-700 transition-colors"
                          title="LinkedIn"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-700 text-white rounded-3xl p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Want to work with our team?</h3>
            <p className="text-indigo-100 text-sm mt-1">
              Explore open roles or reach out directly to discuss a project.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/careers"
              className="px-6 py-3 rounded-xl bg-white hover:bg-indigo-50 text-indigo-700 font-bold text-sm whitespace-nowrap transition-colors"
            >
              View Open Roles
            </Link>
            <Link
              to="/request-quote"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm border border-indigo-400 whitespace-nowrap transition-colors"
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
