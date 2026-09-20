import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Eye, X } from 'lucide-react';
import { blogsApi, getStorageUrl } from '../../services/api';
import { Blog, BlogCategory, BlogTag } from '../../types';
import { GalleryPickerItem, ImageGalleryPicker } from '../../components/admin/ImageGalleryPicker';
import { TagInput } from '../../components/admin/TagInput';

const CONTENT_TYPES: Blog['content_type'][] = [
  'Article',
  'Tutorial',
  'Case Study',
  'Company News',
  'Technology Insight',
  'Announcement',
  'Guide',
];

const emptyForm: Partial<Blog> = {
  title: '',
  excerpt: '',
  content: '',
  content_type: 'Article',
  reading_time: 5,
  status: 'published',
};

export const AdminBlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const [formData, setFormData] = useState<Partial<Blog>>(emptyForm);
  const [galleryItems, setGalleryItems] = useState<GalleryPickerItem[]>([]);
  const [featuredKey, setFeaturedKey] = useState<string | null>(null);
  const [removedImageIds, setRemovedImageIds] = useState<number[]>([]);
  let newImageCounter = 0;

  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [availableTags, setAvailableTags] = useState<BlogTag[]>([]);
  const [tagNames, setTagNames] = useState<string[]>([]);

  const fetchBlogs = async () => {
    const res = await blogsApi.getAll();
    setBlogs(res.data || []);
  };

  useEffect(() => {
    fetchBlogs();
    blogsApi.getCategories().then((res) => setCategories(res.data || []));
    blogsApi.getTags().then((res) => setAvailableTags(res.data || []));
  }, []);

  const openCreateModal = () => {
    setEditingBlog(null);
    setFormData(emptyForm);
    setGalleryItems([]);
    setFeaturedKey(null);
    setRemovedImageIds([]);
    setTagNames([]);
    setModalOpen(true);
  };

  const openEditModal = (b: Blog) => {
    setEditingBlog(b);
    setFormData(b);
    const items: GalleryPickerItem[] = (b.gallery || []).map((g) => ({
      key: `existing-${g.id}`,
      url: getStorageUrl(g.image_path),
      existingId: g.id,
    }));
    setGalleryItems(items);
    const featured = items.find((i) => b.featured_image && i.url === getStorageUrl(b.featured_image));
    setFeaturedKey(featured?.key || null);
    setRemovedImageIds([]);
    setTagNames((b.tags || []).map((t) => t.name));
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this technical brief?')) return;
    await blogsApi.delete(id);
    fetchBlogs();
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
    fd.append('excerpt', formData.excerpt || '');
    fd.append('content', formData.content || '');
    fd.append('content_type', formData.content_type || 'Article');
    fd.append('reading_time', String(formData.reading_time || 5));
    fd.append('status', formData.status || 'published');
    fd.append('category_id', String(formData.category_id || categories[0]?.id || 1));
    tagNames.forEach((name) => fd.append('tags[]', name));

    const newFileItems = galleryItems.filter((i) => i.file);
    newFileItems.forEach((item) => fd.append('images[]', item.file as File));
    removedImageIds.forEach((id) => fd.append('remove_image_ids[]', String(id)));

    const featuredItem = galleryItems.find((i) => i.key === featuredKey);
    if (featuredItem?.file) {
      fd.append('featured_image_index', String(newFileItems.indexOf(featuredItem)));
    } else if (featuredItem?.existingId) {
      fd.append('featured_image_id', String(featuredItem.existingId));
    }

    if (editingBlog) {
      await blogsApi.update(editingBlog.id, fd);
    } else {
      await blogsApi.create(fd);
    }
    setModalOpen(false);
    fetchBlogs();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Engineering Blog & Insights CMS
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Publish technical tutorials, e-governance guides, and system architecture briefs.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-gold-950 font-bold text-xs transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Write Technical Post</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
              <tr>
                <th className="py-3 px-4 font-bold">Article Title</th>
                <th className="py-3 px-4 font-bold">Author</th>
                <th className="py-3 px-4 font-bold">Views</th>
                <th className="py-3 px-4 font-bold">Published</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900 max-w-sm">
                    <div className="flex items-center gap-3">
                      {b.featured_image && (
                        <img
                          src={getStorageUrl(b.featured_image)}
                          alt=""
                          className="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0"
                        />
                      )}
                      <div>
                        {b.title}
                        <span className="block text-[11px] text-slate-400 font-mono font-normal">
                          /{b.slug}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{b.author?.name || 'Digihub Architect'}</td>
                  <td className="py-4 px-4 text-slate-600">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      <span>{b.view_count}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{b.published_at}</td>
                  <td className="py-4 px-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(b)}
                      className="p-1.5 text-slate-600 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Edit Article"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Article"
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
                {editingBlog ? 'Edit Technical Article' : 'Create Technical Article'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Article Type</label>
                  <select
                    value={formData.content_type || 'Article'}
                    onChange={(e) => setFormData({ ...formData, content_type: e.target.value as Blog['content_type'] })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                  >
                    {CONTENT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={formData.category_id || categories[0]?.id || ''}
                    onChange={(e) => setFormData({ ...formData, category_id: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tags</label>
                <TagInput
                  value={tagNames}
                  onChange={setTagNames}
                  suggestions={availableTags.map((t) => t.name)}
                  placeholder="e.g. Laravel, Security, GovTech…"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Executive Summary / Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Article Content (Markdown Supported) *</label>
                <textarea
                  rows={6}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="## Heading&#10;&#10;Technical specifications, code snippets, and architecture analysis..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500 font-mono text-xs"
                ></textarea>
              </div>

              <ImageGalleryPicker
                items={galleryItems}
                featuredKey={featuredKey}
                onFilesSelected={handleFilesSelected}
                onRemove={handleRemoveImage}
                onSetFeatured={setFeaturedKey}
              />

              <div>
                <label className="font-bold text-slate-700 block mb-1">Status</label>
                <select
                  value={formData.status || 'published'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Blog['status'] })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-gold-950 font-bold transition-colors"
                >
                  {editingBlog ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
