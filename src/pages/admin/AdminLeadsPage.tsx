import React, { useEffect, useRef, useState } from 'react';
import { Phone, Mail, Calendar, Filter, Trash2, Paperclip, FileText, X } from 'lucide-react';
import { leadsApi, getStorageUrl } from '../../services/api';
import { Lead } from '../../types';

export const AdminLeadsPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newActivityNote, setNewActivityNote] = useState('');
  const [newAttachment, setNewAttachment] = useState<File | null>(null);
  const attachmentInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    const res = await leadsApi.getAll(statusFilter);
    setLeads(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const handleUpdateStatus = async (id: number, status: Lead['status']) => {
    await leadsApi.update(id, { status });
    await leadsApi.addActivity(id, 'status_change', `Updated status to ${status}`);
    fetchLeads();
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status });
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newActivityNote.trim()) return;
    await leadsApi.addActivity(selectedLead.id, 'note', newActivityNote.trim(), newAttachment);
    setNewActivityNote('');
    setNewAttachment(null);
    fetchLeads();
  };

  const handleDeleteLead = async (id: number) => {
    if (!confirm('Permanently delete this lead and its activity history?')) return;
    await leadsApi.delete(id);
    if (selectedLead?.id === id) setSelectedLead(null);
    fetchLeads();
  };

  const statuses: Lead['status'][] = ['New', 'Contacted', 'In Progress', 'Converted', 'Closed'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            CRM Lead Management Pipeline
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Track and progress high-value proposals through consultative deal stages.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Stages ({leads.length})</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Leads Pipeline Grid / Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Leads List */}
        <div className="lg:col-span-2 space-y-4">
          {leads.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-400 text-xs">
              No leads currently found in this stage.
            </div>
          ) : (
            leads.map((lead) => (
              <div
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className={`bg-white border rounded-2xl p-5 shadow-xs cursor-pointer transition-all ${
                  selectedLead?.id === lead.id
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{lead.name}</span>
                      {lead.company && (
                        <span className="text-xs text-slate-500">({lead.company})</span>
                      )}
                    </div>
                    <h4 className="text-xs font-semibold text-emerald-700 mt-0.5">
                      {lead.project_title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        lead.priority === 'High'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {lead.priority} Priority
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteLead(lead.id);
                      }}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                      title="Delete lead"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                  {lead.project_description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-4 text-slate-500 text-[11px]">
                    <span>Budget: <strong className="text-slate-800">{lead.estimated_budget}</strong></span>
                    <span>Timeline: <strong className="text-slate-800">{lead.timeline}</strong></span>
                  </div>

                  {/* Quick Stage Dropdown */}
                  <select
                    value={lead.status}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleUpdateStatus(lead.id, e.target.value as Lead['status']);
                    }}
                    className="px-2 py-1 bg-slate-50 border border-slate-200 rounded font-bold text-[11px] text-emerald-800"
                  >
                    {statuses.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Col: Selected Lead Detail & Activity Log */}
        <div>
          {selectedLead ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs sticky top-24 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                  Lead Profile #{selectedLead.id}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {selectedLead.name}
                </h3>
                <p className="text-xs text-slate-500">{selectedLead.company}</p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`mailto:${selectedLead.email}`} className="text-emerald-600 hover:underline">
                    {selectedLead.email}
                  </a>
                </div>
                {selectedLead.phone && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedLead.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Received: {selectedLead.created_at}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
                <span className="font-bold text-slate-900 block">Services Required:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedLead.required_services?.map((serv, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700"
                    >
                      {serv}
                    </span>
                  ))}
                </div>
              </div>

              {/* Activity Stream */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs">Consultative Activity Stream</h4>

                <form onSubmit={handleAddNote} className="space-y-2">
                  <textarea
                    rows={2}
                    placeholder="Log a client interaction, phone summary, or next step..."
                    value={newActivityNote}
                    onChange={(e) => setNewActivityNote(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500"
                  ></textarea>

                  {newAttachment ? (
                    <div className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px]">
                      <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="flex-1 truncate">{newAttachment.name}</span>
                      <button type="button" onClick={() => setNewAttachment(null)}>
                        <X className="w-3.5 h-3.5 text-slate-400 hover:text-rose-600" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => attachmentInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-emerald-600"
                    >
                      <Paperclip className="w-3.5 h-3.5" />
                      <span>Attach file</span>
                    </button>
                  )}
                  <input
                    ref={attachmentInputRef}
                    type="file"
                    className="hidden"
                    onChange={(e) => setNewAttachment(e.target.files?.[0] || null)}
                  />

                  <button
                    type="submit"
                    className="w-full py-1.5 bg-gold-500 hover:bg-gold-600 text-gold-950 font-bold text-xs rounded-lg transition-colors"
                  >
                    Add Internal Note
                  </button>
                </form>

                <div className="space-y-2 max-h-48 overflow-y-auto pt-2 text-xs">
                  {selectedLead.activities?.map((act) => (
                    <div key={act.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-0.5">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span className="font-bold uppercase text-slate-600">{act.type}</span>
                        <span>{act.created_at}</span>
                      </div>
                      <p className="text-slate-700 text-xs">{act.description}</p>
                      {act.attachment_path && (
                        <a
                          href={getStorageUrl(act.attachment_path)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-emerald-600 hover:underline text-[11px] font-bold"
                        >
                          <Paperclip className="w-3 h-3" />
                          <span>Attachment</span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-400 text-xs">
              Select a lead on the left to view requirements, stakeholder details, and manage activity logs.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
