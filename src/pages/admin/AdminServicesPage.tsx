import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { servicesApi, getStorageUrl } from '../../services/api';
import { Service } from '../../types';
import { GalleryPickerItem, ImageGalleryPicker } from '../../components/admin/ImageGalleryPicker';
import { TagInput } from '../../components/admin/TagInput';
import { ImageUpload } from '../../components/admin/ImageUpload';

export const AdminServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const [formData, setFormData] = useState<Partial<Service>>({
    name: '',
    short_description: '',
    full_description: '',
    features: [],
    technologies: [],
    status: 'active',
  });

  const [featuresList, setFeaturesList] = useState<string[]>([]);
  const [techList, setTechList] = useState<string[]>([]);
  const [iconUrl, setIconUrl] = useState<string | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryPickerItem[]>([]);
  const [featuredKey, setFeaturedKey] = useState<string | null>(null);
  const [removedImageIds, setRemovedImageIds] = useState<number[]>([]);
  let newImageCounter = 0;

  const fetchServices = async () => {
    const res = await servicesApi.getAll();
    setServices(res.data || []);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      name: '',
      short_description: '',
      full_description: '',
      features: [],
      technologies: [],
      status: 'active',
    });
    setFeaturesList([]);
    setTechList([]);
    setIconUrl(null);
    setGalleryItems([]);
    setFeaturedKey(null);
    setRemovedImageIds([]);
    setModalOpen(true);
  };

  const openEditModal = (s: Service) => {
    setEditingService(s);
    setFormData(s);
    setFeaturesList(s.features || []);
    setTechList(s.technologies || []);
    setIconUrl(s.icon || null);
    const items: GalleryPickerItem[] = (s.gallery || []).map((g) => ({
      key: `existing-${g.id}`,
      url: getStorageUrl(g.image_path),
      existingId: g.id,
    }));
    setGalleryItems(items);
    const featured = items.find((i) => s.image && i.url === getStorageUrl(s.image));
    setFeaturedKey(featured?.key || null);
    setRemovedImageIds([]);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    await servicesApi.delete(id);
    fetchServices();
  };

  const handleFilesSelected = (files: File[]) => {
    const newItems: GalleryPickerItem[] = files.map((file) => ({
      key: `new-${Date.now()}-${newImageCounter++}`,
      url: URL.createObjectURL(file),
      file,
    }));
    setGalleryItems((prev) => [...prev, ...newItems]);
    setFeaturedKey((prev) => prev || newItems[0]?.key || null);
  };

  const handleRemoveImage = (key: string) => {
    setGalleryItems((prev) => {
      const item = prev.find((i) => i.key === key);
      if (item?.existingId) {
        setRemovedImageIds((ids) => [...ids, item.existingId!]);
      }
      const next = prev.filter((i) => i.key !== key);
      setFeaturedKey((fk) => (fk === key ? next[0]?.key || null : fk));
      return next;
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append('name', formData.name || '');
    fd.append('short_description', formData.short_description || '');
    fd.append('full_description', formData.full_description || '');
    fd.append('status', formData.status || 'active');
    fd.append('sort_order', String(formData.sort_order ?? 0));
    fd.append('icon', iconUrl || '');
    featuresList.forEach((f) => fd.append('features[]', f));
    techList.forEach((t) => fd.append('technologies[]', t));

    const newFileItems = galleryItems.filter((i) => i.file);
    newFileItems.forEach((item) => fd.append('images[]', item.file as File));
    removedImageIds.forEach((id) => fd.append('remove_image_ids[]', String(id)));

    const featuredItem = galleryItems.find((i) => i.key === featuredKey);
    if (featuredItem?.file) {
      fd.append('featured_image_index', String(newFileItems.indexOf(featuredItem)));
    } else if (featuredItem?.existingId) {
      fd.append('featured_image_id', String(featuredItem.existingId));
    }

    if (editingService) {
      await servicesApi.update(editingService.id, fd);
    } else {
      await servicesApi.create(fd);
    }

    setModalOpen(false);
    fetchServices();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Services & Capabilities CMS
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure service offerings, feature checklists, and technology tags.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-gold-950 font-bold text-xs transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
              <tr>
                <th className="py-3 px-4 font-bold">Service Name</th>
                <th className="py-3 px-4 font-bold">Short Description</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-3">
                      {service.image && (
                        <img
                          src={getStorageUrl(service.image)}
                          alt=""
                          className="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0"
                        />
                      )}
                      <div>
                        {service.name}
                        <span className="block text-[11px] text-slate-400 font-mono font-normal">
                          /{service.slug}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600 max-w-md">
                    {service.short_description}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        service.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {service.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(service)}
                      className="p-1.5 text-slate-600 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Edit Service"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900">
                {editingService ? 'Edit Service' : 'Create New Service'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Service Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Cloud Security & Infrastructure"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Short Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.short_description || ''}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Full Description & Scope *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.full_description || ''}
                  onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Features</label>
                <TagInput
                  value={featuresList}
                  onChange={setFeaturesList}
                  placeholder="e.g. Penetration testing, Multi-factor auth…"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Technologies</label>
                <TagInput
                  value={techList}
                  onChange={setTechList}
                  placeholder="e.g. Laravel, Docker, Linux, WireGuard…"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 items-end">
                <ImageUpload
                  value={iconUrl}
                  onChange={setIconUrl}
                  purpose="icon"
                  hint="Icon — SVG or 400x400px PNG"
                />
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.sort_order ?? 0}
                    onChange={(e) => setFormData({ ...formData, sort_order: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <ImageGalleryPicker
                items={galleryItems}
                featuredKey={featuredKey}
                onFilesSelected={handleFilesSelected}
                onRemove={handleRemoveImage}
                onSetFeatured={setFeaturedKey}
              />

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Status
                </label>
                <select
                  value={formData.status || 'active'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                >
                  <option value="active">Active (Visible)</option>
                  <option value="inactive">Inactive</option>
                  <option value="draft">Draft</option>
                </select>
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
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
