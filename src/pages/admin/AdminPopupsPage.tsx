import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Copy, X } from 'lucide-react';
import { popupsApi, getStorageUrl } from '../../services/api';
import { Popup } from '../../types';
import { ImageUpload } from '../../components/admin/ImageUpload';

const emptyForm: Partial<Popup> = {
  title: '',
  description: '',
  image: undefined,
  image_width: 480,
  button_text: '',
  button_url: '',
  type: 'Announcement',
  status: true,
  priority: 1,
  start_date: '',
  end_date: '',
  target_pages: 'all',
  device_targeting: 'all',
  frequency: 'once_session',
  delay_seconds: 5,
  scroll_percentage: 0,
};

export const AdminPopupsPage: React.FC = () => {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPopup, setEditingPopup] = useState<Popup | null>(null);
  const [formData, setFormData] = useState<Partial<Popup>>(emptyForm);

  const fetchPopups = async () => {
    const res = await popupsApi.getAll();
    setPopups(res.data || []);
  };

  useEffect(() => {
    fetchPopups();
  }, []);

  const openCreateModal = () => {
    setEditingPopup(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (p: Popup) => {
    setEditingPopup(p);
    setFormData(p);
    setModalOpen(true);
  };

  const openDuplicateModal = (p: Popup) => {
    setEditingPopup(null);
    setFormData({ ...p, title: `${p.title} (Copy)`, status: false });
    setModalOpen(true);
  };

  const handleToggle = async (p: Popup) => {
    await popupsApi.update(p.id, { status: !p.status });
    fetchPopups();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this popup permanently?')) return;
    await popupsApi.delete(id);
    fetchPopups();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPopup) {
      await popupsApi.update(editingPopup.id, formData);
    } else {
      await popupsApi.create(formData);
    }
    setModalOpen(false);
    fetchPopups();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Lead Capture Popups & CTAs
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage high-conversion modals, session delay triggers, and real-time impression analytics.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-gold-950 font-bold text-xs transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Popup</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {popups.map((p) => {
          const ctr = p.impressions_count > 0
            ? ((p.clicks_count / p.impressions_count) * 100).toFixed(1)
            : '0.0';

          return (
            <div
              key={p.id}
              className={`p-6 rounded-2xl bg-white border transition-all ${
                p.status
                  ? 'border-emerald-500 shadow-md shadow-emerald-500/5'
                  : 'border-slate-200 opacity-80'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3">
                  {p.image && (
                    <img
                      src={getStorageUrl(p.image)}
                      alt=""
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-base">{p.title}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.status
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {p.status ? 'Active on Public Site' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{p.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => openEditModal(p)}
                    className="p-1.5 text-slate-500 hover:text-emerald-600 rounded-lg"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openDuplicateModal(p)}
                    className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg"
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-600 rounded-lg"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-center mb-4 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Impressions</span>
                  <span className="font-bold text-slate-800 text-sm">{p.impressions_count}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Clicks</span>
                  <span className="font-bold text-slate-800 text-sm">{p.clicks_count}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">CTR</span>
                  <span className="font-bold text-emerald-600 text-sm">{ctr}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <span className="text-slate-500">
                  Trigger Delay: <strong className="text-slate-800">{p.delay_seconds}s</strong>
                </span>

                <button
                  onClick={() => handleToggle(p)}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors ${
                    p.status
                      ? 'bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-700'
                      : 'bg-emerald-600 text-white hover:bg-emerald-500'
                  }`}
                >
                  {p.status ? 'Disable Popup' : 'Activate Popup'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                {editingPopup ? 'Edit Popup' : 'Add New Popup'}
              </h3>
              <button onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3 items-end">
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url || undefined })}
                  purpose="photo"
                  hint="Popup Image — 600x400px, max 2MB"
                />
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Display Width (px)</label>
                  <input
                    type="number"
                    min={100}
                    max={1200}
                    value={formData.image_width ?? 480}
                    onChange={(e) => setFormData({ ...formData, image_width: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Button Text</label>
                  <input
                    type="text"
                    value={formData.button_text || ''}
                    onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">CTA Destination URL</label>
                  <input
                    type="text"
                    value={formData.button_url || ''}
                    onChange={(e) => setFormData({ ...formData, button_url: e.target.value })}
                    placeholder="/contact or https://..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Type</label>
                  <select
                    value={formData.type || 'Announcement'}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  >
                    <option>Announcement</option>
                    <option>Promotion</option>
                    <option>Blog promotion</option>
                    <option>Newsletter</option>
                    <option>Contact CTA</option>
                    <option>Career</option>
                    <option>Event</option>
                    <option>Custom</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Frequency</label>
                  <select
                    value={formData.frequency || 'once_session'}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value as Popup['frequency'] })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  >
                    <option value="every_visit">Every visit</option>
                    <option value="once_session">Once per session</option>
                    <option value="once_day">Once per day</option>
                    <option value="once_week">Once per week</option>
                    <option value="once_ever">Once ever</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Delay (seconds)</label>
                  <input
                    type="number"
                    value={formData.delay_seconds ?? 5}
                    onChange={(e) => setFormData({ ...formData, delay_seconds: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Priority</label>
                  <input
                    type="number"
                    value={formData.priority ?? 1}
                    onChange={(e) => setFormData({ ...formData, priority: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Start Date (optional)</label>
                  <input
                    type="datetime-local"
                    value={formData.start_date ? formData.start_date.slice(0, 16) : ''}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">End Date (optional)</label>
                  <input
                    type="datetime-local"
                    value={formData.end_date ? formData.end_date.slice(0, 16) : ''}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Page</label>
                <select
                  value={formData.target_pages || 'all'}
                  onChange={(e) => setFormData({ ...formData, target_pages: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                >
                  <option value="all">All Pages</option>
                  <option value="home">Home</option>
                  <option value="blog">Blog</option>
                  <option value="careers">Careers</option>
                  <option value="contact">Contact</option>
                </select>
              </div>

              <label className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  checked={formData.status ?? true}
                  onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                />
                <span className="font-bold text-slate-700">Active on public site</span>
              </label>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-gold-950 font-bold"
                >
                  {editingPopup ? 'Save Changes' : 'Create Popup'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
