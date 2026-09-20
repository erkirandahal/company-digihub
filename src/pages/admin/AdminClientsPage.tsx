import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Star } from 'lucide-react';
import { corporateApi, getStorageUrl } from '../../services/api';
import { Client } from '../../types';
import { ImageUpload } from '../../components/admin/ImageUpload';

const emptyForm: Partial<Client> = {
  name: '',
  logo: undefined,
  website: '',
  industry: '',
  description: '',
  featured: false,
  status: true,
  sort_order: 1,
};

export const AdminClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState<Partial<Client>>(emptyForm);

  const fetchData = async () => {
    const res = await corporateApi.getAllClientsAdmin();
    setClients(res.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreateModal = () => {
    setEditingClient(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (c: Client) => {
    setEditingClient(c);
    setFormData(c);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to remove this client?')) return;
    await corporateApi.deleteClient(id);
    fetchData();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClient) {
      await corporateApi.updateClient(editingClient.id, formData);
    } else {
      await corporateApi.createClient(formData);
    }
    setModalOpen(false);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Clients & Partners</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage the client logos shown in the "Our Clients" showcase on the public site.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((c) => (
          <div key={c.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {c.logo ? (
                  <img
                    src={getStorageUrl(c.logo)}
                    alt={c.name}
                    className="w-12 h-12 rounded-lg object-contain border border-slate-200 bg-white p-1"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
                    {c.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    {c.name}
                    {c.featured && <Star className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500" />}
                  </h3>
                  <p className="text-xs text-slate-500">{c.industry}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => openEditModal(c)}
                  className="p-1.5 text-slate-600 hover:text-indigo-700 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <span
              className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                c.status ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {c.status ? 'Visible' : 'Hidden'}
            </span>
            {c.description && <p className="text-xs text-slate-600 line-clamp-2">{c.description}</p>}
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900">
                {editingClient ? 'Edit Client' : 'Add Client'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Logo</label>
                <ImageUpload
                  value={formData.logo}
                  onChange={(url) => setFormData({ ...formData, logo: url || undefined })}
                  purpose="logo"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Client / Organization Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Website</label>
                  <input
                    type="text"
                    value={formData.website || ''}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Industry</label>
                  <input
                    type="text"
                    value={formData.industry || ''}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder="e.g. Government"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-indigo-500"
                ></textarea>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Sort Order</label>
                <input
                  type="number"
                  value={formData.sort_order ?? 1}
                  onChange={(e) => setFormData({ ...formData, sort_order: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="client-featured"
                    checked={formData.featured ?? false}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded border-slate-300"
                  />
                  <label htmlFor="client-featured" className="font-bold text-slate-700">
                    Featured
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="client-status"
                    checked={formData.status ?? true}
                    onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                    className="rounded border-slate-300"
                  />
                  <label htmlFor="client-status" className="font-bold text-slate-700">
                    Visible on public site
                  </label>
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
                  className="px-6 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold transition-colors"
                >
                  {editingClient ? 'Save Changes' : 'Add Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
