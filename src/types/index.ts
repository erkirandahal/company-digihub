export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    current_page?: number;
    last_page?: number;
    total?: number;
  };
  errors?: Record<string, string[]>;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  role_slug: string;
  avatar?: string;
  is_active?: boolean;
}

export interface Publication {
  id: number;
  title: string;
  slug: string;
  description?: string;
  file_path: string;
  type: string;
  is_active: boolean;
  published_at?: string;
  created_at?: string;
}

export interface GalleryImage {
  id: number;
  image_path: string;
  caption?: string | null;
  sort_order?: number;
}

export interface Service {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  full_description: string;
  icon?: string;
  image?: string;
  features: string[];
  technologies: string[];
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  status: 'active' | 'inactive' | 'draft';
  sort_order: number;
  created_at?: string;
  gallery?: GalleryImage[];
}

export interface Solution {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  features: string[];
  benefits: string[];
  technologies: string[];
  image?: string;
  icon?: string;
  seo_title?: string;
  seo_description?: string;
  status: 'active' | 'inactive' | 'draft';
  sort_order: number;
}

export interface Technology {
  id: number;
  name: string;
  slug: string;
  category_name: 'Frontend' | 'Backend' | 'Database' | 'Cloud & DevOps' | 'Mobile' | 'AI' | 'GIS' | 'Other';
  logo?: string;
  description?: string;
  website_url?: string;
  status?: boolean;
  sort_order?: number;
}

export interface Industry {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  sort_order?: number;
  is_active?: boolean;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  featured_image?: string;
  client?: string;
  industry_id?: number;
  industry?: Industry;
  project_type: string;
  start_date?: string;
  completion_date?: string;
  project_url?: string;
  github_url?: string;
  challenges?: string;
  solutions?: string;
  results?: string;
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  technologies?: Technology[];
  gallery?: GalleryImage[];
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  author_id?: number;
  author?: { name: string; email: string };
  category_id?: number;
  category?: BlogCategory;
  tags?: BlogTag[];
  content_type: 'Article' | 'Tutorial' | 'Case Study' | 'Company News' | 'Technology Insight' | 'Announcement' | 'Guide';
  reading_time: number;
  seo_title?: string;
  seo_description?: string;
  published_at?: string;
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  featured: boolean;
  view_count: number;
  related_project_id?: number;
  gallery?: GalleryImage[];
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  biography?: string;
  photo?: string;
  email?: string;
  linkedin?: string;
  skills: string[];
  department: string;
  display_order: number;
  status: boolean;
}

export interface Client {
  id: number;
  name: string;
  logo?: string;
  website?: string;
  industry?: string;
  description?: string;
  featured: boolean;
  status: boolean;
  sort_order?: number;
}

export interface Testimonial {
  id: number;
  client_name: string;
  position?: string;
  organization?: string;
  testimonial: string;
  photo?: string;
  rating: number;
  featured: boolean;
  status: boolean;
}

export interface Career {
  id: number;
  job_title: string;
  slug: string;
  department: string;
  location: string;
  employment_type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  experience: string;
  salary_information?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
  deadline?: string;
  status: 'active' | 'closed' | 'draft';
}

export interface JobApplication {
  id: number;
  career_id: number;
  career?: Career;
  name: string;
  email: string;
  phone: string;
  cover_letter?: string;
  resume_path: string;
  portfolio_url?: string;
  linkedin_url?: string;
  status: 'New' | 'Reviewing' | 'Shortlisted' | 'Interview' | 'Selected' | 'Rejected';
  admin_notes?: string;
  created_at: string;
}

export interface InquiryActivity {
  id: number;
  contact_inquiry_id: number;
  user_id?: number;
  user?: { name: string };
  type: 'note' | 'call' | 'meeting' | 'status_change' | 'email';
  description: string;
  created_at: string;
}

export interface ContactInquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  service_interested_in?: string;
  budget_range?: string;
  preferred_contact_method?: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Converted' | 'Closed' | 'Spam';
  is_read: boolean;
  notes?: string;
  created_at: string;
  activities?: InquiryActivity[];
}

export interface Lead {
  id: number;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  project_title: string;
  project_description: string;
  required_services: string[];
  estimated_budget?: string;
  timeline?: string;
  preferred_contact_method: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Converted' | 'Closed' | 'Spam';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  assigned_to?: number;
  assigned_user?: User;
  follow_up_date?: string;
  notes?: string;
  activities?: LeadActivity[];
  created_at: string;
}

export interface LeadActivity {
  id: number;
  lead_id: number;
  user_id?: number;
  user?: { name: string };
  type: 'note' | 'call' | 'meeting' | 'status_change' | 'email';
  description: string;
  attachment_path?: string;
  created_at: string;
}

export interface Popup {
  id: number;
  title: string;
  description?: string;
  image?: string;
  image_width?: number;
  button_text?: string;
  button_url?: string;
  type?: string;
  status: boolean;
  priority?: number;
  start_date?: string;
  end_date?: string;
  target_pages?: string;
  device_targeting?: string;
  frequency?: 'every_visit' | 'once_session' | 'once_day' | 'once_week' | 'once_ever';
  delay_seconds: number;
  scroll_percentage?: number;
  impressions_count: number;
  clicks_count: number;
}

export interface NewsletterSubscriber {
  id: number;
  email: string;
  name?: string;
  status: 'active' | 'unsubscribed';
  subscribed_at: string;
}

export interface Setting {
  id?: number;
  key: string;
  value: string;
  group: string;
  type: string;
}

export interface AuditLog {
  id: number;
  user_id?: number;
  user?: { name: string; email: string };
  action: string;
  module: string;
  record_id?: string;
  ip_address?: string;
  created_at: string;
}

export interface DashboardMetrics {
  total_projects: number;
  published_blogs: number;
  draft_blogs: number;
  new_inquiries: number;
  total_inquiries: number;
  active_leads: number;
  total_leads: number;
  new_applications: number;
  total_applications: number;
  subscribers: number;
  popup_impressions: number;
  popup_clicks: number;
  popup_ctr: number;
}
