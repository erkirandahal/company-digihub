import React, { useEffect, useState } from 'react';
import { ExternalLink, Plus, Edit2, Trash2, X, Ban } from 'lucide-react';
import { careersApi, getStorageUrl } from '../../services/api';
import { Career, JobApplication } from '../../types';

const emptyForm: Partial<Career> = {
  job_title: '',
  department: 'Engineering',
  location: 'Bhaktapur, Nepal (Hybrid / Onsite)',
  employment_type: 'Full-time',
  experience: '2+ years',
  salary_information: '',
  description: '',
  responsibilities: [],
  requirements: [],
  skills: [],
  benefits: [],
  deadline: '',
  status: 'active',
};

export const AdminCareersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'applications' | 'openings'>('applications');
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [careers, setCareers] = useState<Career[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState<Career | null>(null);
  const [formData, setFormData] = useState<Partial<Career>>(emptyForm);
  const [responsibilitiesInput, setResponsibilitiesInput] = useState('');
  const [requirementsInput, setRequirementsInput] = useState('');
  const [skillsInput, setSkillsInput] = useState('');
  const [benefitsInput, setBenefitsInput] = useState('');

  const fetchData = async () => {
    const [appRes, carRes] = await Promise.all([
      careersApi.getApplications(),
      careersApi.getAll(),
    ]);
    setApplications(appRes.data || []);
    setCareers(carRes.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApplicationStatus = async (id: number, status: JobApplication['status']) => {
    await careersApi.updateApplicationStatus(id, status);
    fetchData();
  };

  const openCreateModal = () => {
    setEditingCareer(null);
    setFormData(emptyForm);
    setResponsibilitiesInput('');
    setRequirementsInput('');
    setSkillsInput('');
    setBenefitsInput('');
    setModalOpen(true);
  };

  const openEditModal = (c: Career) => {
    setEditingCareer(c);
    setFormData(c);
    setResponsibilitiesInput(c.responsibilities?.join(', ') || '');
    setRequirementsInput(c.requirements?.join(', ') || '');
    setSkillsInput(c.skills?.join(', ') || '');
    setBenefitsInput(c.benefits?.join(', ') || '');
    setModalOpen(true);
  };

  const handleDeleteCareer = async (id: number) => {
    if (!confirm('Are you sure you want to remove this vacancy?')) return;
    await careersApi.delete(id);
    fetchData();
  };

  const handleCloseCareer = async (id: number) => {
    await careersApi.update(id, { status: 'closed' });
    fetchData();
  };

  const handleSaveCareer = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Partial<Career> = {
      ...formData,
      responsibilities: responsibilitiesInput.split(',').map((v) => v.trim()).filter(Boolean),
      requirements: requirementsInput.split(',').map((v) => v.trim()).filter(Boolean),
      skills: skillsInput.split(',').map((v) => v.trim()).filter(Boolean),
      benefits: benefitsInput.split(',').map((v) => v.trim()).filter(Boolean),
    };

    if (editingCareer) {
      await careersApi.update(editingCareer.id, payload);
    } else {
      await careersApi.create(payload);
    }

    setModalOpen(false);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Careers & Candidate Pipeline
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Review job applicants, resumes, and manage open positions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'applications'
                  ? 'bg-indigo-700 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Candidates Inbox ({applications.length})
            </button>
            <button
              onClick={() => setActiveTab('openings')}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'openings'
                  ? 'bg-indigo-700 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Open Roles ({careers.length})
            </button>
          </div>

          {activeTab === 'openings' && (
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-gold-950 font-bold text-xs transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Vacancy</span>
            </button>
          )}
        </div>
      </div>

      {activeTab === 'applications' ? (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="py-3 px-4 font-bold">Candidate</th>
                  <th className="py-3 px-4 font-bold">Contact</th>
                  <th className="py-3 px-4 font-bold">Cover Note / Profiles</th>
                  <th className="py-3 px-4 font-bold">Stage</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900">
                      {app.name}
                      <span className="block text-[11px] text-slate-400 font-normal">
                        Applied: {app.created_at}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      <div>{app.email}</div>
                      <div className="text-[11px] text-slate-400">{app.phone}</div>
                    </td>
                    <td className="py-4 px-4 max-w-xs text-slate-600">
                      {app.cover_letter && <p className="line-clamp-2">{app.cover_letter}</p>}
                      <div className="flex gap-2 mt-1 flex-wrap">
                        {app.resume_path && (
                          <a
                            href={getStorageUrl(app.resume_path)}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-600 hover:underline flex items-center gap-0.5 font-bold"
                          >
                            <span>Resume</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {app.portfolio_url && (
                          <a
                            href={app.portfolio_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-600 hover:underline flex items-center gap-0.5"
                          >
                            <span>Portfolio</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {app.linkedin_url && (
                          <a
                            href={app.linkedin_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-600 hover:underline flex items-center gap-0.5"
                          >
                            <span>LinkedIn</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">
                        {app.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <select
                        value={app.status}
                        onChange={(e) => handleApplicationStatus(app.id, e.target.value as any)}
                        className="px-2 py-1 bg-slate-50 border border-slate-200 rounded font-bold text-[11px] text-slate-800"
                      >
                        <option value="New">New</option>
                        <option value="Reviewing">Reviewing</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview">Interview</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {careers.map((c) => (
            <div key={c.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{c.job_title}</h3>
                  <p className="text-xs text-slate-500">
                    {c.department} • {c.employment_type} • {c.location}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.status === 'active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {c.status}
                  </span>
                  {c.status === 'active' && (
                    <button
                      onClick={() => handleCloseCareer(c.id)}
                      className="p-1.5 text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      title="Close Vacancy"
                    >
                      <Ban className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => openEditModal(c)}
                    className="p-1.5 text-slate-600 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Edit Vacancy"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCareer(c.id)}
                    className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete Vacancy"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-600 line-clamp-2">{c.description}</p>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900">
                {editingCareer ? 'Edit Vacancy' : 'Add New Vacancy'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCareer} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={formData.job_title || ''}
                  onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                  placeholder="e.g. Senior Backend Engineer"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Department</label>
                  <input
                    type="text"
                    value={formData.department || ''}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Employment Type</label>
                  <select
                    value={formData.employment_type || 'Full-time'}
                    onChange={(e) => setFormData({ ...formData, employment_type: e.target.value as Career['employment_type'] })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Experience</label>
                  <input
                    type="text"
                    value={formData.experience || ''}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g. 2+ years"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Salary Information</label>
                <input
                  type="text"
                  value={formData.salary_information || ''}
                  onChange={(e) => setFormData({ ...formData, salary_information: e.target.value })}
                  placeholder="e.g. NPR 60,000 - 90,000 / month"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Responsibilities (comma-separated)</label>
                <input
                  type="text"
                  value={responsibilitiesInput}
                  onChange={(e) => setResponsibilitiesInput(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Requirements (comma-separated)</label>
                <input
                  type="text"
                  value={requirementsInput}
                  onChange={(e) => setRequirementsInput(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Skills (comma-separated)</label>
                <input
                  type="text"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Benefits (comma-separated)</label>
                <input
                  type="text"
                  value={benefitsInput}
                  onChange={(e) => setBenefitsInput(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Application Deadline</label>
                  <input
                    type="date"
                    value={formData.deadline || ''}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Status</label>
                  <select
                    value={formData.status || 'active'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Career['status'] })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="closed">Closed</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-gold-950 font-bold transition-colors"
                >
                  {editingCareer ? 'Save Changes' : 'Publish Vacancy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
