import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { projectsApi, corporateApi, getStorageUrl } from '../../services/api';
import { Project, Technology } from '../../types';
import { GalleryPickerItem, ImageGalleryPicker } from '../../components/admin/ImageGalleryPicker';
import { TagInput } from '../../components/admin/TagInput';

export const AdminProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    short_description: '',
    full_description: '',
    client: '',
    project_type: 'Web Application',
    challenges: '',
    solutions: '',
    results: '',
    status: 'published',
  });

  const [galleryItems, setGalleryItems] = useState<GalleryPickerItem[]>([]);
  const [featuredKey, setFeaturedKey] = useState<string | null>(null);
  const [removedImageIds, setRemovedImageIds] = useState<number[]>([]);
  let newImageCounter = 0;

  const [availableTechnologies, setAvailableTechnologies] = useState<Technology[]>([]);
  const [techNames, setTechNames] = useState<string[]>([]);

  const fetchProjects = async () => {
    const res = await projectsApi.getAll();
    setProjects(res.data || []);
  };

  useEffect(() => {
    fetchProjects();
    corporateApi.getTechnologies().then((res) => setAvailableTechnologies(res.data || []));
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      short_description: '',
      full_description: '',
      client: '',
      project_type: 'Government GIS & MIS',
      challenges: '',
      solutions: '',
      results: '',
      status: 'published',
    });
    setGalleryItems([]);
    setFeaturedKey(null);
    setRemovedImageIds([]);
    setTechNames([]);
    setModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setFormData(p);
    const items: GalleryPickerItem[] = (p.gallery || []).map((g) => ({
      key: `existing-${g.id}`,
      url: getStorageUrl(g.image_path),
      existingId: g.id,
    }));
    setGalleryItems(items);
    const featured = items.find((i) => p.featured_image && i.url === getStorageUrl(p.featured_image));
    setFeaturedKey(featured?.key || null);
    setRemovedImageIds([]);
    setTechNames((p.technologies || []).map((t) => t.name));
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this case study?')) return;
    await projectsApi.delete(id);
    fetchProjects();
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
    fd.append('title', formData.title || '');
    fd.append('short_description', formData.short_description || '');
    fd.append('full_description', formData.full_description || '');
    fd.append('client', formData.client || '');
    fd.append('project_type', formData.project_type || '');
    fd.append('challenges', formData.challenges || '');
    fd.append('solutions', formData.solutions || '');
    fd.append('results', formData.results || '');
    fd.append('project_url', formData.project_url || '');
    fd.append('github_url', formData.github_url || '');
    fd.append('status', formData.status || 'published');
    fd.append('featured', String(formData.featured || false));

    const techIds = techNames
      .map((name) => availableTechnologies.find((t) => t.name.toLowerCase() === name.toLowerCase())?.id)
      .filter((id): id is number => !!id);
    techIds.forEach((id) => fd.append('technologies[]', String(id)));

    const newFileItems = galleryItems.filter((i) => i.file);
    newFileItems.forEach((item) => fd.append('images[]', item.file as File));
    removedImageIds.forEach((id) => fd.append('remove_image_ids[]', String(id)));

    const featuredItem = galleryItems.find((i) => i.key === featuredKey);
    if (featuredItem?.file) {
      fd.append('featured_image_index', String(newFileItems.indexOf(featuredItem)));
    } else if (featuredItem?.existingId) {
      fd.append('featured_image_id', String(featuredItem.existingId));
    }

    if (editingProject) {
      await projectsApi.update(editingProject.id, fd);
    } else {
      await projectsApi.create(fd);
    }
    setModalOpen(false);
    fetchProjects();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Portfolio & Deployments CMS
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage deployed client solutions, challenges, architectural solutions, and outcomes.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-gold-950 font-bold text-xs transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Case Study</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
              <tr>
                <th className="py-3 px-4 font-bold">Project Title</th>
                <th className="py-3 px-4 font-bold">Client / Org</th>
                <th className="py-3 px-4 font-bold">Type</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-3">
                      {proj.featured_image && (
                        <img
                          src={getStorageUrl(proj.featured_image)}
                          alt=""
                          className="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0"
                        />
                      )}
                      <div>
                        {proj.title}
                        <span className="block text-[11px] text-slate-400 font-mono font-normal">
                          /{proj.slug}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{proj.client || 'Enterprise'}</td>
                  <td className="py-4 px-4 text-slate-600">{proj.project_type}</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {proj.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(proj)}
                      className="p-1.5 text-slate-600 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(proj.id)}
                      className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete"
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

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900">
                {editingProject ? 'Edit Case Study' : 'Create Case Study'}
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
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Client / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.client || ''}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Project Type
                  </label>
                  <input
                    type="text"
                    value={formData.project_type || ''}
                    onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Status</label>
                  <select
                    value={formData.status || 'published'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Project['status'] })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Live Demo URL</label>
                  <input
                    type="text"
                    value={formData.project_url || ''}
                    onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={formData.github_url || ''}
                    onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Technologies</label>
                <TagInput
                  value={techNames}
                  onChange={setTechNames}
                  suggestions={availableTechnologies.map((t) => t.name)}
                  placeholder="e.g. Laravel, React, PostgreSQL…"
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
                  Full Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.full_description || ''}
                  onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Challenges Faced
                </label>
                <textarea
                  rows={2}
                  value={formData.challenges || ''}
                  onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Engineered Solutions
                </label>
                <textarea
                  rows={2}
                  value={formData.solutions || ''}
                  onChange={(e) => setFormData({ ...formData, solutions: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Measurable Results / Impact
                </label>
                <textarea
                  rows={2}
                  value={formData.results || ''}
                  onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <ImageGalleryPicker
                items={galleryItems}
                featuredKey={featuredKey}
                onFilesSelected={handleFilesSelected}
                onRemove={handleRemoveImage}
                onSetFeatured={setFeaturedKey}
              />

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
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
