import React, { useEffect, useState } from 'react';
import { Mail, Trash2, CheckCircle, Clock, User, Building, Phone } from 'lucide-react';
import { contactApi } from '../../services/api';
import { ContactInquiry } from '../../types';

export const AdminInquiriesPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [filter, setFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [newNote, setNewNote] = useState('');

  const fetchInquiries = async () => {
    const res = await contactApi.getAll(filter);
    setInquiries(res.data || []);
  };

  useEffect(() => {
    fetchInquiries();
  }, [filter]);

  const handleStatusChange = async (id: number, status: ContactInquiry['status']) => {
    await contactApi.updateStatus(id, status);
    fetchInquiries();
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to permanently remove this inquiry?')) return;
    await contactApi.delete(id);
    if (selectedInquiry?.id === id) setSelectedInquiry(null);
    fetchInquiries();
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry || !newNote.trim()) return;
    await contactApi.addActivity(selectedInquiry.id, 'note', newNote.trim());
    setNewNote('');
    fetchInquiries();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Inquiries Inbox
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Incoming communications from contact forms and service inquiries.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Inquiries ({inquiries.length})</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Converted">Converted</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inquiries List */}
        <div className="lg:col-span-2 space-y-3">
          {inquiries.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-400 text-xs">
              No inquiries found under this filter.
            </div>
          ) : (
            inquiries.map((inq) => (
              <div
                key={inq.id}
                onClick={() => setSelectedInquiry(inq)}
                className={`bg-white border rounded-2xl p-5 shadow-xs cursor-pointer transition-all ${
                  selectedInquiry?.id === inq.id
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-1">
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{inq.name}</span>
                    {inq.company && <span className="text-xs text-slate-500 ml-2">({inq.company})</span>}
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      inq.status === 'New'
                        ? 'bg-blue-100 text-blue-800'
                        : inq.status === 'Contacted'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {inq.status}
                  </span>
                </div>

                <p className="text-xs text-slate-500 font-medium mb-2">{inq.subject || inq.service_interested_in}</p>
                <p className="text-xs text-slate-700 line-clamp-2">{inq.message}</p>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{inq.email}</span>
                  <span>{inq.created_at}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Selected Inquiry Detail */}
        <div>
          {selectedInquiry ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs sticky top-24 space-y-6">
              <div className="border-b border-slate-100 pb-4 flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{selectedInquiry.name}</h3>
                  <p className="text-xs text-slate-500">{selectedInquiry.email}</p>
                </div>
                <button
                  onClick={() => handleDelete(selectedInquiry.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete Inquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                {selectedInquiry.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedInquiry.phone}</span>
                  </div>
                )}
                {selectedInquiry.company && (
                  <div className="flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedInquiry.company}</span>
                  </div>
                )}
                {selectedInquiry.service_interested_in && (
                  <div>
                    <span className="text-slate-400 block mb-0.5">Interested In:</span>
                    <span className="font-semibold text-slate-800">{selectedInquiry.service_interested_in}</span>
                  </div>
                )}
                {selectedInquiry.budget_range && (
                  <div>
                    <span className="text-slate-400 block mb-0.5">Budget:</span>
                    <span className="font-semibold text-slate-800">{selectedInquiry.budget_range}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-900 block mb-2">Message Body:</span>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {selectedInquiry.message}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-xs font-bold text-slate-900 block">Update Status:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(['New', 'Contacted', 'In Progress', 'Converted', 'Closed'] as ContactInquiry['status'][]).map(
                    (st) => (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(selectedInquiry.id, st)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                          selectedInquiry.status === st
                            ? 'bg-indigo-700 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {st}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs">Activity & Notes</h4>

                <form onSubmit={handleAddNote} className="space-y-2">
                  <textarea
                    rows={2}
                    placeholder="Log a call summary, follow-up note, or next step..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full py-1.5 bg-gold-500 hover:bg-gold-600 text-gold-950 font-bold text-xs rounded-lg transition-colors"
                  >
                    Add Note
                  </button>
                </form>

                <div className="space-y-2 max-h-48 overflow-y-auto pt-2 text-xs">
                  {selectedInquiry.activities?.map((act) => (
                    <div key={act.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-0.5">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span className="font-bold uppercase text-slate-600">{act.type}</span>
                        <span>{act.created_at}</span>
                      </div>
                      <p className="text-slate-700 text-xs">{act.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-400 text-xs">
              Select an inquiry to view complete details, respond, or update workflow status.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
