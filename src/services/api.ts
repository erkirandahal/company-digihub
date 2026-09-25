import axios from 'axios';
import {
  ApiResponse,
  User,
  Service,
  Solution,
  Project,
  Blog,
  Technology,
  Industry,
  TeamMember,
  Testimonial,
  Career,
  JobApplication,
  ContactInquiry,
  Lead,
  Popup,
  Setting,
  AuditLog,
  DashboardMetrics,
  Publication,
  Client,
  HeroSlide,
} from '../types';

import {
  INITIAL_SERVICES,
  INITIAL_SOLUTIONS,
  INITIAL_INDUSTRIES,
  INITIAL_TECHNOLOGIES,
  INITIAL_PROJECTS,
  INITIAL_BLOGS,
  INITIAL_TEAM,
  INITIAL_TESTIMONIALS,
  INITIAL_CAREERS,
  INITIAL_INQUIRIES,
  INITIAL_LEADS,
  INITIAL_POPUPS,
  INITIAL_SETTINGS,
  INITIAL_CLIENTS,
  INITIAL_HERO_SLIDES,
} from './mockData';

// Configurable API base URL as per Rule #6
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

// Base URL for files served from the Laravel "public" disk (php artisan storage:link)
export const STORAGE_BASE_URL = API_BASE_URL.replace(/\/api\/v1\/?$/, '') + '/storage/';

export const getStorageUrl = (path?: string | null): string => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('blob:')) return path;
  return STORAGE_BASE_URL + path;
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

// Attach Authorization Bearer token from localStorage
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('pragya_auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Local state fallback storage engine for interactive preview in container / offline development
class LocalStorageDataStore {
  private get<T>(key: string, defaultData: T): T {
    try {
      const item = localStorage.getItem(`pragya_${key}`);
      return item ? JSON.parse(item) : defaultData;
    } catch {
      return defaultData;
    }
  }

  private set<T>(key: string, data: T): void {
    try {
      localStorage.setItem(`pragya_${key}`, JSON.stringify(data));
    } catch (e) {
      console.warn('Storage quota reached', e);
    }
  }

  getServices(): Service[] {
    return this.get('services', INITIAL_SERVICES);
  }
  saveServices(services: Service[]) {
    this.set('services', services);
  }

  getSolutions(): Solution[] {
    return this.get('solutions', INITIAL_SOLUTIONS);
  }

  getProjects(): Project[] {
    return this.get('projects', INITIAL_PROJECTS);
  }
  saveProjects(projects: Project[]) {
    this.set('projects', projects);
  }

  getBlogs(): Blog[] {
    return this.get('blogs', INITIAL_BLOGS);
  }
  saveBlogs(blogs: Blog[]) {
    this.set('blogs', blogs);
  }

  getCareers(): Career[] {
    return this.get('careers', INITIAL_CAREERS);
  }
  saveCareers(careers: Career[]) {
    this.set('careers', careers);
  }

  getTeam(): TeamMember[] {
    return this.get('team', INITIAL_TEAM);
  }
  saveTeam(team: TeamMember[]) {
    this.set('team', team);
  }

  getClients(): Client[] {
    return this.get('clients', INITIAL_CLIENTS);
  }
  saveClients(clients: Client[]) {
    this.set('clients', clients);
  }

  getHeroSlides(): HeroSlide[] {
    return this.get('hero_slides', INITIAL_HERO_SLIDES);
  }
  saveHeroSlides(slides: HeroSlide[]) {
    this.set('hero_slides', slides);
  }

  getApplications(): JobApplication[] {
    return this.get('applications', [
      {
        id: 1,
        career_id: 1,
        name: 'Rohan Shrestha',
        email: 'rohan.shrestha@example.com',
        phone: '+977-9841000111',
        resume_path: 'uploads/resumes/rohan_resume.pdf',
        status: 'Reviewing',
        cover_letter: 'Passionate full-stack developer with 4 years building Laravel APIs and modern React frontends.',
        created_at: '2026-03-04 12:00',
      },
    ]);
  }
  saveApplications(applications: JobApplication[]) {
    this.set('applications', applications);
  }

  getInquiries(): ContactInquiry[] {
    return this.get('inquiries', INITIAL_INQUIRIES);
  }
  saveInquiries(inquiries: ContactInquiry[]) {
    this.set('inquiries', inquiries);
  }

  getLeads(): Lead[] {
    return this.get('leads', INITIAL_LEADS);
  }
  saveLeads(leads: Lead[]) {
    this.set('leads', leads);
  }

  getPopups(): Popup[] {
    return this.get('popups', INITIAL_POPUPS);
  }
  savePopups(popups: Popup[]) {
    this.set('popups', popups);
  }

  getSubscribers(): { id: number; email: string; name?: string; status: 'active'; subscribed_at: string }[] {
    return this.get('subscribers', [
      { id: 1, email: 'tech.director@client.com', name: 'Alok KC', status: 'active', subscribed_at: '2026-03-01' },
      { id: 2, email: 'innovate@nepalgov.np', name: 'Digital Cell', status: 'active', subscribed_at: '2026-03-03' },
    ]);
  }
  saveSubscribers(subs: any[]) {
    this.set('subscribers', subs);
  }

  getSettings(): Setting[] {
    return this.get('settings', INITIAL_SETTINGS);
  }
  saveSettings(settings: Setting[]) {
    this.set('settings', settings);
  }

  getAuditLogs(): AuditLog[] {
    return this.get('audit_logs', [
      { id: 1, action: 'Seeded initial system data', module: 'system', created_at: new Date().toISOString() },
    ]);
  }

  getPublications(): Publication[] {
    return this.get('publications', []);
  }
  savePublications(publications: Publication[]) {
    this.set('publications', publications);
  }
  addAuditLog(action: string, module: string, record_id?: string) {
    const logs = this.getAuditLogs();
    logs.unshift({
      id: Date.now(),
      action,
      module,
      record_id,
      created_at: new Date().toISOString().replace('T', ' ').slice(0, 16),
    });
    this.set('audit_logs', logs.slice(0, 50));
  }
}

export const store = new LocalStorageDataStore();

// Wrapper with automatic live server attempt, smoothly falling back to the local database store
async function safeApiCall<T>(
  apiCall: () => Promise<{ data: ApiResponse<T> }>,
  fallbackValue: () => T,
  mutationEffect?: () => void
): Promise<ApiResponse<T>> {
  try {
    const res = await apiCall();
    return res.data;
  } catch (error: any) {
    // If live Laravel API is unreachable (e.g. preview mode without local PHP server active),
    // use the validated persistent store so the entire UI remains functional.
    if (mutationEffect) mutationEffect();
    const data = fallbackValue();
    return {
      success: true,
      message: 'Request successful (Local Data Store)',
      data,
    };
  }
}

// -------------------------------------------------------------
// Authentication API
// -------------------------------------------------------------
export const authApi = {
  login: async (credentials: { email: string; password: string }): Promise<ApiResponse<{ user: User; token: string }>> => {
    try {
      const res = await apiClient.post('/auth/login', credentials);
      if (res.data.data?.token) {
        localStorage.setItem('pragya_auth_token', res.data.data.token);
        localStorage.setItem('pragya_user', JSON.stringify(res.data.data.user));
      }
      return res.data;
    } catch (error: any) {
      // Authentication must always be verified by the real backend — never bypass
      // login locally, even when the API is unreachable.
      if (error?.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Unable to reach the server. Please check your connection and try again.');
    }
  },

  logout: async (): Promise<ApiResponse<null>> => {
    try {
      await apiClient.post('/auth/logout');
    } catch {}
    localStorage.removeItem('pragya_auth_token');
    localStorage.removeItem('pragya_user');
    return { success: true, message: 'Logged out successfully', data: null };
  },

  getCurrentUser: (): User | null => {
    const raw = localStorage.getItem('pragya_user');
    return raw ? JSON.parse(raw) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('pragya_auth_token');
  },
};

// -------------------------------------------------------------
// Services API
// -------------------------------------------------------------
export const servicesApi = {
  getAll: async () =>
    safeApiCall(
      () => apiClient.get('/services'),
      () => store.getServices()
    ),

  getBySlug: async (slug: string) =>
    safeApiCall(
      () => apiClient.get(`/services/${slug}`),
      () => {
        const item = store.getServices().find((s) => s.slug === slug);
        if (!item) throw new Error('Service not found');
        return item;
      }
    ),

  create: async (formData: FormData) =>
    safeApiCall(
      () =>
        apiClient.post('/admin/services', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        }),
      () => {
        const services = store.getServices();
        const name = (formData.get('name') as string) || 'New Service';
        const images = formData.getAll('images[]') as File[];
        const featuredIndex = formData.get('featured_image_index');
        const previews = images.filter((f) => f instanceof File && f.size > 0).map((f) => URL.createObjectURL(f));
        const newService: Service = {
          id: Date.now(),
          name,
          slug: name.toLowerCase().replace(/\s+/g, '-'),
          short_description: (formData.get('short_description') as string) || '',
          full_description: (formData.get('full_description') as string) || '',
          features: ((formData.get('features') as string) || '').split(',').map((f) => f.trim()).filter(Boolean),
          technologies: ((formData.get('technologies') as string) || '').split(',').map((t) => t.trim()).filter(Boolean),
          status: (formData.get('status') as Service['status']) || 'active',
          sort_order: services.length + 1,
          image: previews[featuredIndex !== null ? Number(featuredIndex) : 0] || undefined,
          gallery: previews.map((url, i) => ({ id: Date.now() + i, image_path: url })),
        };
        services.push(newService);
        store.saveServices(services);
        store.addAuditLog(`Created service: ${newService.name}`, 'services', String(newService.id));
        return newService;
      }
    ),

  update: async (id: number, formData: FormData) =>
    safeApiCall(
      () =>
        apiClient.post(`/admin/services/${id}?_method=PUT`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        }),
      () => {
        const services = store.getServices();
        const index = services.findIndex((s) => s.id === id);
        if (index === -1) throw new Error('Service not found');

        const existing = services[index];
        const name = formData.get('name') as string;
        const images = (formData.getAll('images[]') as File[]).filter((f) => f instanceof File && f.size > 0);
        const newPreviews = images.map((f) => URL.createObjectURL(f));
        const removeIds = (formData.getAll('remove_image_ids[]') as string[]).map(Number);
        const keptGallery = (existing.gallery || []).filter((g) => !removeIds.includes(g.id));
        const gallery = [...keptGallery, ...newPreviews.map((url, i) => ({ id: Date.now() + i, image_path: url }))];

        const updated: Service = {
          ...existing,
          name: name || existing.name,
          slug: name ? name.toLowerCase().replace(/\s+/g, '-') : existing.slug,
          short_description: (formData.get('short_description') as string) || existing.short_description,
          full_description: (formData.get('full_description') as string) || existing.full_description,
          features: formData.has('features') ? ((formData.get('features') as string) || '').split(',').map((f) => f.trim()).filter(Boolean) : existing.features,
          technologies: formData.has('technologies') ? ((formData.get('technologies') as string) || '').split(',').map((t) => t.trim()).filter(Boolean) : existing.technologies,
          status: (formData.get('status') as Service['status']) || existing.status,
          gallery,
          image: newPreviews[0] || existing.image,
        };
        services[index] = updated;
        store.saveServices(services);
        store.addAuditLog(`Updated service #${id}`, 'services', String(id));
        return updated;
      }
    ),

  delete: async (id: number) =>
    safeApiCall(
      () => apiClient.delete(`/admin/services/${id}`),
      () => {
        const services = store.getServices().filter((s) => s.id !== id);
        store.saveServices(services);
        store.addAuditLog(`Deleted service #${id}`, 'services', String(id));
        return null;
      }
    ),
};

// -------------------------------------------------------------
// Solutions API
// -------------------------------------------------------------
export const solutionsApi = {
  getAll: async () =>
    safeApiCall(
      () => apiClient.get('/solutions'),
      () => store.getSolutions()
    ),
  getBySlug: async (slug: string) =>
    safeApiCall(
      () => apiClient.get(`/solutions/${slug}`),
      () => {
        const item = store.getSolutions().find((s) => s.slug === slug);
        if (!item) throw new Error('Solution not found');
        return item;
      }
    ),
};

// -------------------------------------------------------------
// Projects / Portfolio API
// -------------------------------------------------------------
export const projectsApi = {
  getAll: async (params?: string | { industry?: string; page?: number }) => {
    const opts = typeof params === 'string' ? { industry: params } : params || {};
    return safeApiCall(
      () => apiClient.get('/projects', { params: opts }),
      () => {
        const projects = store.getProjects();
        if (!opts.industry || opts.industry === 'all') return projects;
        return projects.filter((p) => p.industry?.slug === opts.industry);
      }
    );
  },

  getBySlug: async (slug: string) =>
    safeApiCall(
      () => apiClient.get(`/projects/${slug}`),
      () => {
        const item = store.getProjects().find((p) => p.slug === slug);
        if (!item) throw new Error('Project not found');
        return item;
      }
    ),

  create: async (formData: FormData) =>
    safeApiCall(
      () =>
        apiClient.post('/admin/projects', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        }),
      () => {
        const projects = store.getProjects();
        const title = (formData.get('title') as string) || 'New Project';
        const images = (formData.getAll('images[]') as File[]).filter((f) => f instanceof File && f.size > 0);
        const featuredIndex = formData.get('featured_image_index');
        const previews = images.map((f) => URL.createObjectURL(f));
        const newProj: Project = {
          id: Date.now(),
          title,
          slug: title.toLowerCase().replace(/\s+/g, '-'),
          short_description: (formData.get('short_description') as string) || '',
          full_description: (formData.get('full_description') as string) || '',
          client: (formData.get('client') as string) || undefined,
          project_type: (formData.get('project_type') as string) || 'Web Application',
          challenges: (formData.get('challenges') as string) || undefined,
          solutions: (formData.get('solutions') as string) || undefined,
          results: (formData.get('results') as string) || undefined,
          status: (formData.get('status') as Project['status']) || 'published',
          featured: formData.get('featured') === 'true',
          technologies: [INITIAL_TECHNOLOGIES[0], INITIAL_TECHNOLOGIES[1]],
          featured_image: previews[featuredIndex !== null ? Number(featuredIndex) : 0] || undefined,
          gallery: previews.map((url, i) => ({ id: Date.now() + i, image_path: url })),
        };
        projects.unshift(newProj);
        store.saveProjects(projects);
        store.addAuditLog(`Created project: ${newProj.title}`, 'projects', String(newProj.id));
        return newProj;
      }
    ),

  update: async (id: number, formData: FormData) =>
    safeApiCall(
      () =>
        apiClient.post(`/admin/projects/${id}?_method=PUT`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        }),
      () => {
        const projects = store.getProjects();
        const index = projects.findIndex((p) => p.id === id);
        if (index === -1) throw new Error('Project not found');

        const existing = projects[index];
        const title = formData.get('title') as string;
        const images = (formData.getAll('images[]') as File[]).filter((f) => f instanceof File && f.size > 0);
        const newPreviews = images.map((f) => URL.createObjectURL(f));
        const removeIds = (formData.getAll('remove_image_ids[]') as string[]).map(Number);
        const keptGallery = (existing.gallery || []).filter((g) => !removeIds.includes(g.id));
        const gallery = [...keptGallery, ...newPreviews.map((url, i) => ({ id: Date.now() + i, image_path: url }))];

        const updated: Project = {
          ...existing,
          title: title || existing.title,
          slug: title ? title.toLowerCase().replace(/\s+/g, '-') : existing.slug,
          short_description: (formData.get('short_description') as string) || existing.short_description,
          full_description: (formData.get('full_description') as string) || existing.full_description,
          client: (formData.get('client') as string) || existing.client,
          project_type: (formData.get('project_type') as string) || existing.project_type,
          challenges: (formData.get('challenges') as string) || existing.challenges,
          solutions: (formData.get('solutions') as string) || existing.solutions,
          results: (formData.get('results') as string) || existing.results,
          status: (formData.get('status') as Project['status']) || existing.status,
          gallery,
          featured_image: newPreviews[0] || existing.featured_image,
        };
        projects[index] = updated;
        store.saveProjects(projects);
        store.addAuditLog(`Updated project #${id}`, 'projects', String(id));
        return updated;
      }
    ),

  delete: async (id: number) =>
    safeApiCall(
      () => apiClient.delete(`/admin/projects/${id}`),
      () => {
        const projects = store.getProjects().filter((p) => p.id !== id);
        store.saveProjects(projects);
        store.addAuditLog(`Deleted project #${id}`, 'projects', String(id));
        return null;
      }
    ),
};

// -------------------------------------------------------------
// Blogs & Insights API
// -------------------------------------------------------------
export const blogsApi = {
  getCategories: async () =>
    safeApiCall(
      () => apiClient.get('/blog-categories'),
      () => [{ id: 1, name: 'Technology Insights', slug: 'tech' }]
    ),

  getTags: async () =>
    safeApiCall(
      () => apiClient.get('/blog-tags'),
      () => [] as { id: number; name: string; slug: string }[]
    ),

  getAll: async (params?: { category?: string; search?: string; page?: number }) =>
    safeApiCall(
      () => apiClient.get('/blog', { params }),
      () => {
        let blogs = store.getBlogs();
        if (params?.category && params.category !== 'all') {
          blogs = blogs.filter((b) => b.category?.slug === params.category);
        }
        if (params?.search) {
          const q = params.search.toLowerCase();
          blogs = blogs.filter((b) => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q));
        }
        return blogs;
      }
    ),

  getBySlug: async (slug: string) =>
    safeApiCall(
      () => apiClient.get(`/blog/${slug}`),
      () => {
        const blogs = store.getBlogs();
        const post = blogs.find((b) => b.slug === slug);
        if (!post) throw new Error('Blog post not found');
        post.view_count += 1;
        store.saveBlogs(blogs);
        const related = blogs.filter((b) => b.id !== post.id).slice(0, 3);
        return { post, related };
      }
    ),

  create: async (formData: FormData) =>
    safeApiCall(
      () =>
        apiClient.post('/admin/blog', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        }),
      () => {
        const blogs = store.getBlogs();
        const title = (formData.get('title') as string) || 'New Insight';
        const images = (formData.getAll('images[]') as File[]).filter((f) => f instanceof File && f.size > 0);
        const featuredIndex = formData.get('featured_image_index');
        const previews = images.map((f) => URL.createObjectURL(f));
        const newBlog: Blog = {
          id: Date.now(),
          title,
          slug: title.toLowerCase().replace(/\s+/g, '-'),
          excerpt: (formData.get('excerpt') as string) || '',
          content: (formData.get('content') as string) || '',
          content_type: (formData.get('content_type') as Blog['content_type']) || 'Article',
          reading_time: Number(formData.get('reading_time')) || 5,
          status: (formData.get('status') as Blog['status']) || 'published',
          featured: formData.get('featured') === 'true',
          view_count: 0,
          author: { name: 'Editor', email: 'info@pragyainnovative.com.np' },
          category: { id: 1, name: 'Technology Insights', slug: 'tech' },
          tags: [{ id: 1, name: 'Architecture', slug: 'architecture' }],
          published_at: new Date().toISOString().slice(0, 10),
          featured_image: previews[featuredIndex !== null ? Number(featuredIndex) : 0] || undefined,
          gallery: previews.map((url, i) => ({ id: Date.now() + i, image_path: url })),
        };
        blogs.unshift(newBlog);
        store.saveBlogs(blogs);
        store.addAuditLog(`Published blog: ${newBlog.title}`, 'blog', String(newBlog.id));
        return newBlog;
      }
    ),

  update: async (id: number, formData: FormData) =>
    safeApiCall(
      () =>
        apiClient.post(`/admin/blog/${id}?_method=PUT`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        }),
      () => {
        const blogs = store.getBlogs();
        const index = blogs.findIndex((b) => b.id === id);
        if (index === -1) throw new Error('Blog post not found');

        const existing = blogs[index];
        const title = formData.get('title') as string;
        const images = (formData.getAll('images[]') as File[]).filter((f) => f instanceof File && f.size > 0);
        const newPreviews = images.map((f) => URL.createObjectURL(f));
        const removeIds = (formData.getAll('remove_image_ids[]') as string[]).map(Number);
        const keptGallery = (existing.gallery || []).filter((g) => !removeIds.includes(g.id));
        const gallery = [...keptGallery, ...newPreviews.map((url, i) => ({ id: Date.now() + i, image_path: url }))];

        const updated: Blog = {
          ...existing,
          title: title || existing.title,
          slug: title ? title.toLowerCase().replace(/\s+/g, '-') : existing.slug,
          excerpt: (formData.get('excerpt') as string) || existing.excerpt,
          content: (formData.get('content') as string) || existing.content,
          status: (formData.get('status') as Blog['status']) || existing.status,
          gallery,
          featured_image: newPreviews[0] || existing.featured_image,
        };
        blogs[index] = updated;
        store.saveBlogs(blogs);
        store.addAuditLog(`Updated blog post #${id}`, 'blog', String(id));
        return updated;
      }
    ),

  delete: async (id: number) =>
    safeApiCall(
      () => apiClient.delete(`/admin/blog/${id}`),
      () => {
        const blogs = store.getBlogs().filter((b) => b.id !== id);
        store.saveBlogs(blogs);
        store.addAuditLog(`Deleted blog post #${id}`, 'blog', String(id));
        return null;
      }
    ),
};

// -------------------------------------------------------------
// Contact Inquiries API
// -------------------------------------------------------------
export const contactApi = {
  submit: async (data: Partial<ContactInquiry>) =>
    safeApiCall(
      () => apiClient.post('/contact', data),
      () => {
        const inquiries = store.getInquiries();
        const newInquiry: ContactInquiry = {
          id: Date.now(),
          name: data.name || '',
          email: data.email || '',
          phone: data.phone,
          company: data.company,
          subject: data.subject,
          message: data.message || '',
          service_interested_in: data.service_interested_in,
          budget_range: data.budget_range,
          preferred_contact_method: data.preferred_contact_method || 'Email',
          status: 'New',
          is_read: false,
          created_at: new Date().toISOString().replace('T', ' ').slice(0, 16),
        };
        inquiries.unshift(newInquiry);
        store.saveInquiries(inquiries);
        return newInquiry;
      }
    ),

  getAll: async (status?: string) =>
    safeApiCall(
      () => apiClient.get(`/admin/inquiries${status ? `?status=${status}` : ''}`),
      () => {
        const inquiries = store.getInquiries();
        if (!status || status === 'all') return inquiries;
        return inquiries.filter((i) => i.status === status);
      }
    ),

  updateStatus: async (id: number, status: ContactInquiry['status'], notes?: string) =>
    safeApiCall(
      () => apiClient.patch(`/admin/inquiries/${id}/status`, { status, notes }),
      () => {
        const inquiries = store.getInquiries().map((i) => (i.id === id ? { ...i, status, notes, is_read: true } : i));
        store.saveInquiries(inquiries);
        store.addAuditLog(`Updated inquiry #${id} status to ${status}`, 'inquiries', String(id));
        return inquiries.find((i) => i.id === id)!;
      }
    ),

  delete: async (id: number) =>
    safeApiCall(
      () => apiClient.delete(`/admin/inquiries/${id}`),
      () => {
        const inquiries = store.getInquiries().filter((i) => i.id !== id);
        store.saveInquiries(inquiries);
        return null;
      }
    ),

  addActivity: async (id: number, type: 'note' | 'call' | 'meeting' | 'status_change' | 'email', description: string) =>
    safeApiCall(
      () => apiClient.post(`/admin/inquiries/${id}/activities`, { type, description }),
      () => {
        const inquiries = store.getInquiries();
        const inquiry = inquiries.find((i) => i.id === id);
        if (inquiry) {
          if (!inquiry.activities) inquiry.activities = [];
          inquiry.activities.unshift({
            id: Date.now(),
            contact_inquiry_id: id,
            type,
            description,
            created_at: new Date().toISOString().replace('T', ' ').slice(0, 16),
          });
          store.saveInquiries(inquiries);
        }
        return inquiry!;
      }
    ),
};

// -------------------------------------------------------------
// Leads & Project Quotes (CRM) API
// -------------------------------------------------------------
export const leadsApi = {
  submit: async (data: Partial<Lead>) =>
    safeApiCall(
      () => apiClient.post('/leads', data),
      () => {
        const leads = store.getLeads();
        const newLead: Lead = {
          id: Date.now(),
          name: data.name || '',
          company: data.company,
          email: data.email || '',
          phone: data.phone,
          project_title: data.project_title || 'Software Development Project',
          project_description: data.project_description || '',
          required_services: data.required_services || [],
          estimated_budget: data.estimated_budget,
          timeline: data.timeline,
          preferred_contact_method: data.preferred_contact_method || 'Email',
          status: 'New',
          priority: 'Medium',
          created_at: new Date().toISOString().replace('T', ' ').slice(0, 16),
          activities: [
            {
              id: 1,
              lead_id: Date.now(),
              type: 'note',
              description: 'Project request submitted through online portal.',
              created_at: new Date().toISOString().replace('T', ' ').slice(0, 16),
            },
          ],
        };
        leads.unshift(newLead);
        store.saveLeads(leads);
        return newLead;
      }
    ),

  getAll: async (status?: string) =>
    safeApiCall(
      () => apiClient.get(`/admin/leads${status ? `?status=${status}` : ''}`),
      () => {
        const leads = store.getLeads();
        if (!status || status === 'all') return leads;
        return leads.filter((l) => l.status === status);
      }
    ),

  update: async (id: number, payload: Partial<Lead>) =>
    safeApiCall(
      () => apiClient.put(`/admin/leads/${id}`, payload),
      () => {
        const leads = store.getLeads().map((l) => (l.id === id ? { ...l, ...payload } : l));
        store.saveLeads(leads);
        store.addAuditLog(`Updated lead #${id}`, 'leads', String(id));
        return leads.find((l) => l.id === id)!;
      }
    ),

  addActivity: async (
    id: number,
    type: 'note' | 'call' | 'meeting' | 'status_change' | 'email',
    description: string,
    attachment?: File | null
  ) =>
    safeApiCall(
      () => {
        if (attachment) {
          const fd = new FormData();
          fd.append('type', type);
          fd.append('description', description);
          fd.append('attachment', attachment);
          return apiClient.post(`/admin/leads/${id}/activities`, fd, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        }
        return apiClient.post(`/admin/leads/${id}/activities`, { type, description });
      },
      () => {
        const leads = store.getLeads();
        const lead = leads.find((l) => l.id === id);
        if (lead) {
          if (!lead.activities) lead.activities = [];
          lead.activities.unshift({
            id: Date.now(),
            lead_id: id,
            type,
            description,
            attachment_path: attachment ? URL.createObjectURL(attachment) : undefined,
            created_at: new Date().toISOString().replace('T', ' ').slice(0, 16),
          });
          store.saveLeads(leads);
        }
        return lead!;
      }
    ),

  delete: async (id: number) =>
    safeApiCall(
      () => apiClient.delete(`/admin/leads/${id}`),
      () => {
        const leads = store.getLeads().filter((l) => l.id !== id);
        store.saveLeads(leads);
        store.addAuditLog(`Deleted lead #${id}`, 'leads', String(id));
        return null;
      }
    ),
};

// -------------------------------------------------------------
// Careers & Job Applications API
// -------------------------------------------------------------
export const careersApi = {
  getAll: async () =>
    safeApiCall(
      () => apiClient.get('/careers'),
      () => store.getCareers()
    ),

  getBySlug: async (slug: string) =>
    safeApiCall(
      () => apiClient.get(`/careers/${slug}`),
      () => {
        const job = store.getCareers().find((c) => c.slug === slug);
        if (!job) throw new Error('Job posting not found');
        return job;
      }
    ),

  apply: async (slug: string, formData: Partial<JobApplication>) =>
    safeApiCall(
      () => apiClient.post(`/careers/${slug}/apply`, formData),
      () => {
        const job = store.getCareers().find((c) => c.slug === slug);
        const apps = store.getApplications();
        const newApp: JobApplication = {
          id: Date.now(),
          career_id: job?.id || 1,
          career: job,
          name: formData.name || '',
          email: formData.email || '',
          phone: formData.phone || '',
          cover_letter: formData.cover_letter,
          resume_path: formData.resume_path || 'uploads/resumes/application_cv.pdf',
          portfolio_url: formData.portfolio_url,
          linkedin_url: formData.linkedin_url,
          status: 'New',
          created_at: new Date().toISOString().replace('T', ' ').slice(0, 16),
        };
        apps.unshift(newApp);
        store.saveApplications(apps);
        return newApp;
      }
    ),

  getApplications: async () =>
    safeApiCall(
      () => apiClient.get('/admin/job-applications'),
      () => store.getApplications()
    ),

  updateApplicationStatus: async (id: number, status: JobApplication['status'], admin_notes?: string) =>
    safeApiCall(
      () => apiClient.patch(`/admin/job-applications/${id}/status`, { status, admin_notes }),
      () => {
        const apps = store.getApplications().map((a) => (a.id === id ? { ...a, status, admin_notes } : a));
        store.saveApplications(apps);
        store.addAuditLog(`Updated candidate #${id} to ${status}`, 'careers', String(id));
        return apps.find((a) => a.id === id)!;
      }
    ),

  create: async (payload: Partial<Career>) =>
    safeApiCall(
      () => apiClient.post('/admin/careers', payload),
      () => {
        const careers = store.getCareers();
        const jobTitle = payload.job_title || 'New Role';
        const newCareer: Career = {
          id: Date.now(),
          job_title: jobTitle,
          slug: jobTitle.toLowerCase().replace(/\s+/g, '-') + '-' + Math.floor(Math.random() * 1000),
          department: payload.department || 'Engineering',
          location: payload.location || 'Kathmandu, Nepal (Hybrid / Onsite)',
          employment_type: payload.employment_type || 'Full-time',
          experience: payload.experience || '2+ years',
          salary_information: payload.salary_information,
          description: payload.description || '',
          responsibilities: payload.responsibilities || [],
          requirements: payload.requirements || [],
          skills: payload.skills || [],
          benefits: payload.benefits || [],
          deadline: payload.deadline,
          status: payload.status || 'active',
        };
        careers.unshift(newCareer);
        store.saveCareers(careers);
        store.addAuditLog(`Created career opening: ${newCareer.job_title}`, 'careers', String(newCareer.id));
        return newCareer;
      }
    ),

  update: async (id: number, payload: Partial<Career>) =>
    safeApiCall(
      () => apiClient.put(`/admin/careers/${id}`, payload),
      () => {
        const careers = store.getCareers().map((c) => (c.id === id ? { ...c, ...payload } : c));
        store.saveCareers(careers);
        store.addAuditLog(`Updated career opening #${id}`, 'careers', String(id));
        return careers.find((c) => c.id === id)!;
      }
    ),

  delete: async (id: number) =>
    safeApiCall(
      () => apiClient.delete(`/admin/careers/${id}`),
      () => {
        const careers = store.getCareers().filter((c) => c.id !== id);
        store.saveCareers(careers);
        store.addAuditLog(`Deleted career opening #${id}`, 'careers', String(id));
        return null;
      }
    ),
};

// -------------------------------------------------------------
// Popups & Announcement Management API
// -------------------------------------------------------------
export const popupsApi = {
  getActive: async (page = 'home') =>
    safeApiCall(
      () => apiClient.get(`/popups/active?page=${page}`),
      () => {
        const active = store.getPopups().find((p) => p.status && (p.target_pages === 'all' || p.target_pages === page));
        return active || null;
      }
    ),

  recordImpression: async (id: number) =>
    safeApiCall(
      () => apiClient.post(`/popups/${id}/impression`),
      () => {
        const popups = store.getPopups().map((p) => (p.id === id ? { ...p, impressions_count: p.impressions_count + 1 } : p));
        store.savePopups(popups);
        return null;
      }
    ),

  recordClick: async (id: number) =>
    safeApiCall(
      () => apiClient.post(`/popups/${id}/click`),
      () => {
        const popups = store.getPopups().map((p) => (p.id === id ? { ...p, clicks_count: p.clicks_count + 1 } : p));
        store.savePopups(popups);
        return null;
      }
    ),

  getAll: async () =>
    safeApiCall(
      () => apiClient.get('/admin/popups'),
      () => store.getPopups()
    ),

  create: async (payload: Partial<Popup>) =>
    safeApiCall(
      () => apiClient.post('/admin/popups', payload),
      () => {
        const popups = store.getPopups();
        const newPopup: Popup = {
          id: Date.now(),
          title: payload.title || 'New Popup',
          description: payload.description,
          image: payload.image,
          image_width: payload.image_width || 480,
          button_text: payload.button_text,
          button_url: payload.button_url,
          type: payload.type || 'Announcement',
          status: payload.status ?? true,
          priority: payload.priority || 1,
          start_date: payload.start_date,
          end_date: payload.end_date,
          target_pages: payload.target_pages || 'all',
          device_targeting: payload.device_targeting || 'all',
          frequency: payload.frequency || 'once_session',
          delay_seconds: payload.delay_seconds ?? 5,
          scroll_percentage: payload.scroll_percentage ?? 0,
          impressions_count: 0,
          clicks_count: 0,
        };
        popups.unshift(newPopup);
        store.savePopups(popups);
        store.addAuditLog(`Created popup: ${newPopup.title}`, 'popups', String(newPopup.id));
        return newPopup;
      }
    ),

  update: async (id: number, payload: Partial<Popup>) =>
    safeApiCall(
      () => apiClient.put(`/admin/popups/${id}`, payload),
      () => {
        const popups = store.getPopups().map((p) => (p.id === id ? { ...p, ...payload } : p));
        store.savePopups(popups);
        store.addAuditLog(`Updated popup #${id}`, 'popups', String(id));
        return popups.find((p) => p.id === id)!;
      }
    ),

  delete: async (id: number) =>
    safeApiCall(
      () => apiClient.delete(`/admin/popups/${id}`),
      () => {
        const popups = store.getPopups().filter((p) => p.id !== id);
        store.savePopups(popups);
        store.addAuditLog(`Deleted popup #${id}`, 'popups', String(id));
        return null;
      }
    ),
};

// -------------------------------------------------------------
// Newsletter & Subscribers API
// -------------------------------------------------------------
export const newsletterApi = {
  subscribe: async (email: string, name?: string) =>
    safeApiCall(
      () => apiClient.post('/newsletter/subscribe', { email, name }),
      () => {
        const subs = store.getSubscribers();
        if (!subs.some((s) => s.email === email)) {
          subs.unshift({ id: Date.now(), email, name, status: 'active', subscribed_at: new Date().toISOString().slice(0, 10) });
          store.saveSubscribers(subs);
        }
        return { subscribed: true };
      }
    ),

  getAll: async (search?: string) =>
    safeApiCall(
      () => apiClient.get('/admin/subscribers', { params: search ? { search } : {} }),
      () => {
        const subs = store.getSubscribers();
        if (!search) return subs;
        const q = search.toLowerCase();
        return subs.filter((s) => s.email.toLowerCase().includes(q) || (s.name || '').toLowerCase().includes(q));
      }
    ),

  delete: async (id: number) =>
    safeApiCall(
      () => apiClient.delete(`/admin/subscribers/${id}`),
      () => {
        const subs = store.getSubscribers().filter((s) => s.id !== id);
        store.saveSubscribers(subs);
        return null;
      }
    ),
};

// -------------------------------------------------------------
// Corporate Info (Team, Testimonials, Technologies, Industries)
// -------------------------------------------------------------
export const corporateApi = {
  getTeam: async () =>
    safeApiCall(
      () => apiClient.get('/team'),
      () => INITIAL_TEAM
    ),
  getAllTeamAdmin: async () =>
    safeApiCall(
      () => apiClient.get('/admin/team'),
      () => store.getTeam()
    ),
  createTeamMember: async (payload: Partial<TeamMember>) =>
    safeApiCall(
      () => apiClient.post('/admin/team', payload),
      () => {
        const team = store.getTeam();
        const newMember: TeamMember = {
          id: Date.now(),
          name: payload.name || '',
          position: payload.position || '',
          biography: payload.biography,
          photo: payload.photo,
          email: payload.email,
          linkedin: payload.linkedin,
          skills: payload.skills || [],
          department: payload.department || 'Engineering',
          display_order: payload.display_order ?? team.length + 1,
          status: payload.status ?? true,
        };
        team.push(newMember);
        store.saveTeam(team);
        store.addAuditLog(`Added team member: ${newMember.name}`, 'team', String(newMember.id));
        return newMember;
      }
    ),
  updateTeamMember: async (id: number, payload: Partial<TeamMember>) =>
    safeApiCall(
      () => apiClient.put(`/admin/team/${id}`, payload),
      () => {
        const team = store.getTeam().map((m) => (m.id === id ? { ...m, ...payload } : m));
        store.saveTeam(team);
        store.addAuditLog(`Updated team member #${id}`, 'team', String(id));
        return team.find((m) => m.id === id)!;
      }
    ),
  deleteTeamMember: async (id: number) =>
    safeApiCall(
      () => apiClient.delete(`/admin/team/${id}`),
      () => {
        store.saveTeam(store.getTeam().filter((m) => m.id !== id));
        store.addAuditLog(`Deleted team member #${id}`, 'team', String(id));
        return {} as any;
      }
    ),

  getClients: async () =>
    safeApiCall(
      () => apiClient.get('/clients'),
      () => INITIAL_CLIENTS
    ),
  getAllClientsAdmin: async () =>
    safeApiCall(
      () => apiClient.get('/admin/clients'),
      () => store.getClients()
    ),
  createClient: async (payload: Partial<Client>) =>
    safeApiCall(
      () => apiClient.post('/admin/clients', payload),
      () => {
        const clients = store.getClients();
        const newClient: Client = {
          id: Date.now(),
          name: payload.name || '',
          logo: payload.logo,
          website: payload.website,
          industry: payload.industry,
          description: payload.description,
          featured: payload.featured ?? false,
          status: payload.status ?? true,
          sort_order: payload.sort_order ?? clients.length + 1,
        };
        clients.push(newClient);
        store.saveClients(clients);
        store.addAuditLog(`Added client: ${newClient.name}`, 'clients', String(newClient.id));
        return newClient;
      }
    ),
  updateClient: async (id: number, payload: Partial<Client>) =>
    safeApiCall(
      () => apiClient.put(`/admin/clients/${id}`, payload),
      () => {
        const clients = store.getClients().map((c) => (c.id === id ? { ...c, ...payload } : c));
        store.saveClients(clients);
        store.addAuditLog(`Updated client #${id}`, 'clients', String(id));
        return clients.find((c) => c.id === id)!;
      }
    ),
  deleteClient: async (id: number) =>
    safeApiCall(
      () => apiClient.delete(`/admin/clients/${id}`),
      () => {
        store.saveClients(store.getClients().filter((c) => c.id !== id));
        store.addAuditLog(`Deleted client #${id}`, 'clients', String(id));
        return {} as any;
      }
    ),

  getTestimonials: async () =>
    safeApiCall(
      () => apiClient.get('/testimonials'),
      () => INITIAL_TESTIMONIALS
    ),
  getTechnologies: async () =>
    safeApiCall(
      () => apiClient.get('/technologies'),
      () => INITIAL_TECHNOLOGIES
    ),
  getIndustries: async () =>
    safeApiCall(
      () => apiClient.get('/industries'),
      () => INITIAL_INDUSTRIES
    ),
};

// -------------------------------------------------------------
// Hero Slider
// -------------------------------------------------------------
export const heroSlidesApi = {
  getActive: async () =>
    safeApiCall(
      () => apiClient.get('/hero-slides'),
      () => INITIAL_HERO_SLIDES.filter((s) => s.status)
    ),
  getAllAdmin: async () =>
    safeApiCall(
      () => apiClient.get('/admin/hero-slides'),
      () => store.getHeroSlides()
    ),
  create: async (payload: Partial<HeroSlide>) =>
    safeApiCall(
      () => apiClient.post('/admin/hero-slides', payload),
      () => {
        const slides = store.getHeroSlides();
        const newSlide: HeroSlide = {
          id: Date.now(),
          title: payload.title || '',
          subtitle: payload.subtitle,
          image: payload.image,
          button_text: payload.button_text,
          button_url: payload.button_url,
          sort_order: payload.sort_order ?? slides.length + 1,
          status: payload.status ?? true,
        };
        slides.push(newSlide);
        store.saveHeroSlides(slides);
        store.addAuditLog(`Created hero slide: ${newSlide.title}`, 'hero_slides', String(newSlide.id));
        return newSlide;
      }
    ),
  update: async (id: number, payload: Partial<HeroSlide>) =>
    safeApiCall(
      () => apiClient.put(`/admin/hero-slides/${id}`, payload),
      () => {
        const slides = store.getHeroSlides().map((s) => (s.id === id ? { ...s, ...payload } : s));
        store.saveHeroSlides(slides);
        store.addAuditLog(`Updated hero slide #${id}`, 'hero_slides', String(id));
        return slides.find((s) => s.id === id)!;
      }
    ),
  delete: async (id: number) =>
    safeApiCall(
      () => apiClient.delete(`/admin/hero-slides/${id}`),
      () => {
        store.saveHeroSlides(store.getHeroSlides().filter((s) => s.id !== id));
        store.addAuditLog(`Deleted hero slide #${id}`, 'hero_slides', String(id));
        return {} as any;
      }
    ),
};

// -------------------------------------------------------------
// CMS Settings & Audit Logs
// -------------------------------------------------------------
export const settingsApi = {
  getSettings: async () =>
    safeApiCall(
      () => apiClient.get('/admin/settings'),
      () => store.getSettings()
    ),

  getPublic: async () =>
    safeApiCall(
      () => apiClient.get('/settings'),
      () => {
        const current = store.getSettings();
        const map: Record<string, any> = {};
        current.forEach((s) => {
          map[s.key] = s.value;
        });
        return map;
      }
    ),

  getAll: async () =>
    safeApiCall(
      () => apiClient.get('/admin/settings'),
      () => {
        const current = store.getSettings();
        const map: Record<string, any> = {};
        current.forEach((s) => {
          map[s.key] = s.value;
        });
        return map;
      }
    ),

  updateSettings: async (settings: Record<string, string>) =>
    safeApiCall(
      () => apiClient.post('/admin/settings', { settings }),
      () => {
        const current = store.getSettings();
        Object.entries(settings).forEach(([key, value]) => {
          const item = current.find((s) => s.key === key);
          if (item) item.value = value;
          else current.push({ key, value, group: 'general', type: 'text' });
        });
        store.saveSettings(current);
        store.addAuditLog('Updated system settings', 'settings');
        return current;
      }
    ),

  update: async (settings: Record<string, any>) =>
    safeApiCall(
      () => apiClient.post('/admin/settings', { settings }),
      () => {
        const current = store.getSettings();
        Object.entries(settings).forEach(([key, value]) => {
          const item = current.find((s) => s.key === key);
          if (item) item.value = String(value);
          else current.push({ key, value: String(value), group: 'general', type: 'text' });
        });
        store.saveSettings(current);
        store.addAuditLog('Updated system settings', 'settings');
        return settings;
      }
    ),

  getAuditLogs: async () =>
    safeApiCall(
      () => apiClient.get('/admin/audit-logs'),
      () => store.getAuditLogs()
    ),
};

export const auditLogsApi = {
  getAll: async () =>
    safeApiCall(
      () => apiClient.get('/admin/audit-logs'),
      () => store.getAuditLogs()
    ),
};

// -------------------------------------------------------------
// Publications API
// -------------------------------------------------------------
export const publicationsApi = {
  getAll: async () =>
    safeApiCall(
      () => apiClient.get('/publications'),
      () => store.getPublications().filter((p) => p.is_active)
    ),

  adminIndex: async () =>
    safeApiCall(
      () => apiClient.get('/admin/publications'),
      () => store.getPublications()
    ),

  create: async (formData: FormData) =>
    safeApiCall(
      () =>
        apiClient.post('/admin/publications', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        }),
      () => {
        const pubs = store.getPublications();
        const title = formData.get('title') as string;
        const newPub: Publication = {
          id: Date.now(),
          title: title || 'New Publication',
          slug: (title || 'pub').toLowerCase().replace(/\s+/g, '-') + '-' + Math.floor(Math.random() * 1000),
          description: formData.get('description') as string,
          file_path: 'publications/mock_upload.pdf',
          type: (formData.get('type') as string) || 'Report',
          is_active: formData.get('is_active') === 'true',
          published_at: (formData.get('published_at') as string) || new Date().toISOString().slice(0, 10),
          created_at: new Date().toISOString().replace('T', ' ').slice(0, 16),
        };
        pubs.unshift(newPub);
        store.savePublications(pubs);
        store.addAuditLog(`Created publication: ${newPub.title}`, 'publications', String(newPub.id));
        return newPub;
      }
    ),

  update: async (id: number, formData: FormData) =>
    safeApiCall(
      () =>
        apiClient.post(`/admin/publications/${id}?_method=PUT`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        }),
      () => {
        const pubs = store.getPublications();
        const index = pubs.findIndex((p) => p.id === id);
        if (index !== -1) {
          const title = formData.get('title') as string;
          if (title) pubs[index].title = title;
          const desc = formData.get('description') as string;
          if (desc !== null) pubs[index].description = desc;
          const type = formData.get('type') as string;
          if (type) pubs[index].type = type;
          const isActive = formData.get('is_active');
          if (isActive !== null) pubs[index].is_active = isActive === 'true';

          store.savePublications(pubs);
          store.addAuditLog(`Updated publication #${id}`, 'publications', String(id));
          return pubs[index];
        }
        throw new Error('Publication not found');
      }
    ),

  delete: async (id: number) =>
    safeApiCall(
      () => apiClient.delete(`/admin/publications/${id}`),
      () => {
        const pubs = store.getPublications().filter((p) => p.id !== id);
        store.savePublications(pubs);
        store.addAuditLog(`Deleted publication #${id}`, 'publications', String(id));
        return null;
      }
    ),
};

// -------------------------------------------------------------
// Admin Dashboard Metrics API
// -------------------------------------------------------------
export const dashboardApi = {
  getStats: async (): Promise<ApiResponse<{ metrics: DashboardMetrics; recent_inquiries: ContactInquiry[]; recent_leads: Lead[]; recent_activities: AuditLog[] }>> => {
    return safeApiCall(
      () => apiClient.get('/admin/dashboard'),
      () => {
        const projects = store.getProjects();
        const blogs = store.getBlogs();
        const inquiries = store.getInquiries();
        const leads = store.getLeads();
        const apps = store.getApplications();
        const subs = store.getSubscribers();
        const popups = store.getPopups();

        const totalImpressions = popups.reduce((sum, p) => sum + p.impressions_count, 0);
        const totalClicks = popups.reduce((sum, p) => sum + p.clicks_count, 0);
        const popupCtr = totalImpressions > 0 ? Number(((totalClicks / totalImpressions) * 100).toFixed(2)) : 0;

        return {
          metrics: {
            total_projects: projects.length,
            published_blogs: blogs.filter((b) => b.status === 'published').length,
            draft_blogs: blogs.filter((b) => b.status === 'draft').length,
            new_inquiries: inquiries.filter((i) => i.status === 'New').length,
            total_inquiries: inquiries.length,
            active_leads: leads.filter((l) => ['New', 'Contacted', 'In Progress'].includes(l.status)).length,
            total_leads: leads.length,
            new_applications: apps.filter((a) => a.status === 'New').length,
            total_applications: apps.length,
            subscribers: subs.length,
            popup_impressions: totalImpressions,
            popup_clicks: totalClicks,
            popup_ctr: popupCtr,
          },
          recent_inquiries: inquiries.slice(0, 5),
          recent_leads: leads.slice(0, 5),
          recent_activities: store.getAuditLogs().slice(0, 6),
        };
      }
    );
  },
};
