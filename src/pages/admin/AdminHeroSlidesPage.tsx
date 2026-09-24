import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { heroSlidesApi, settingsApi, getStorageUrl } from '../../services/api';
import { HeroSlide } from '../../types';
import { ImageUpload } from '../../components/admin/ImageUpload';
import { SortableList } from '../../components/admin/SortableList';

const emptyForm: Partial<HeroSlide> = {
  title: '',
  subtitle: '',
  image: undefined,
  button_text: '',
  button_url: '',
  status: true,
};

export const AdminHeroSlidesPage: React.FC = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [heroEnabled, setHeroEnabled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [formData, setFormData] = useState<Partial<HeroSlide>>(emptyForm);
  const [savingToggle, setSavingToggle] = useState(false);

  const fetchData = async () => {
    const [slidesRes, settingsRes] = await Promise.all([
      heroSlidesApi.getAllAdmin(),
      settingsApi.getAll(),
    ]);
    setSlides((slidesRes.data || []).sort((a, b) => a.sort_order - b.sort_order));
    setHeroEnabled(settingsRes.data?.hero_enabled === '1' || settingsRes.data?.hero_enabled === 'true');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleHero = async (checked: boolean) => {
    setSavingToggle(true);
    setHeroEnabled(checked);
    await settingsApi.update({ hero_enabled: checked ? '1' : '0' });
    setSavingToggle(false);
  };

  const openCreateModal = () => {
    setEditingSlide(null);
    setFormData({ ...emptyForm, sort_order: slides.length + 1 });
    setModalOpen(true);
  };

  const openEditModal = (s: HeroSlide) => {
    setEditingSlide(s);
    setFormData(s);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this hero slide permanently?')) return;
    await heroSlidesApi.delete(id);
    fetchData();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSlide) {
      await heroSlidesApi.update(editingSlide.id, formData);
    } else {
      await heroSlidesApi.create(formData);
    }
    setModalOpen(false);
    fetchData();
  };

  const handleReorder = async (newOrder: HeroSlide[]) => {
    setSlides(newOrder);
    await Promise.all(
      newOrder.map((s, i) => heroSlidesApi.update(s.id, { sort_order: i + 1 }))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Hero Slider</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage homepage hero slides. Drag to reorder — slides play in this order.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Slide</span>
        </button>
      </div>

      <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Enable Hero Slider on Homepage</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            When off (or no active slides exist), the homepage shows the default static hero instead.
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer shrink-0">
          <input
            type="checkbox"
            checked={heroEnabled}
            disabled={savingToggle}
            onChange={(e) => handleToggleHero(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-indigo-700 transition-colors" />
          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
        </label>
      </div>

      {slides.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-10 text-center">
          <p className="text-sm text-slate-400">No hero slides yet. Add one to enable the slider.</p>
        </div>
      ) : (
        <SortableList<HeroSlide>
          items={slides}
          getId={(s) => String(s.id)}
          onReorder={handleReorder}
          className="space-y-3"
          renderItem={(s, dragHandle) => (
            <div
              className={`flex items-center gap-4 p-4 rounded-2xl bg-white border transition-all ${
                s.status ? 'border-indigo-300 shadow-sm' : 'border-slate-200 opacity-70'
              }`}
            >
              {dragHandle}
              {s.image ? (
                <img
                  src={getStorageUrl(s.image)}
                  alt={s.title}
                  className="w-20 h-14 rounded-lg object-cover border border-slate-200 shrink-0"
                />
              ) : (
                <div className="w-20 h-14 rounded-lg bg-slate-100 border border-slate-200 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm truncate">{s.title}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                      s.status ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {s.status ? 'Active' : 'Inactive'}
                  </span>
                </div>
                {s.subtitle && <p className="text-xs text-slate-500 mt-0.5 truncate">{s.subtitle}</p>}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => openEditModal(s)}
                  className="p-1.5 text-slate-500 hover:text-indigo-700 rounded-lg"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="p-1.5 text-slate-500 hover:text-rose-600 rounded-lg"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        />
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                {editingSlide ? 'Edit Slide' : 'Add Slide'}
              </h3>
              <button onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url || undefined })}
                purpose="photo"
                shape="wide"
                hint="Slide Image — 1920x800px recommended"
              />

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
                <label className="font-bold text-slate-700 block mb-1">Subtitle</label>
                <textarea
                  rows={2}
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                ></textarea>
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
                  <label className="font-bold text-slate-700 block mb-1">Button URL</label>
                  <input
                    type="text"
                    value={formData.button_url || ''}
                    onChange={(e) => setFormData({ ...formData, button_url: e.target.value })}
                    placeholder="/contact or https://..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  checked={formData.status ?? true}
                  onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                />
                <span className="font-bold text-slate-700">Active</span>
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
                  className="px-5 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold"
                >
                  {editingSlide ? 'Save Changes' : 'Add Slide'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
