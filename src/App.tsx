import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Public Layout & Pages
import { PublicLayout } from './components/layout/PublicLayout';
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { TeamPage } from './pages/public/TeamPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { ServiceDetailPage } from './pages/public/ServiceDetailPage';
import { SolutionsPage } from './pages/public/SolutionsPage';
import { ProjectsPage } from './pages/public/ProjectsPage';
import { ProjectDetailPage } from './pages/public/ProjectDetailPage';
import { BlogPage } from './pages/public/BlogPage';
import { BlogDetailPage } from './pages/public/BlogDetailPage';
import { CareersPage } from './pages/public/CareersPage';
import { CareerDetailPage } from './pages/public/CareerDetailPage';
import { ContactPage } from './pages/public/ContactPage';
import { RequestQuotePage } from './pages/public/RequestQuotePage';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Admin Layout & Pages
import { AdminLayout } from './components/admin/AdminLayout';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminLeadsPage } from './pages/admin/AdminLeadsPage';
import { AdminInquiriesPage } from './pages/admin/AdminInquiriesPage';
import { AdminServicesPage } from './pages/admin/AdminServicesPage';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { AdminBlogsPage } from './pages/admin/AdminBlogsPage';
import { AdminCareersPage } from './pages/admin/AdminCareersPage';
import { AdminTeamPage } from './pages/admin/AdminTeamPage';
import { AdminClientsPage } from './pages/admin/AdminClientsPage';
import { AdminPopupsPage } from './pages/admin/AdminPopupsPage';
import { AdminSubscribersPage } from './pages/admin/AdminSubscribersPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminNavigationPage } from './pages/admin/AdminNavigationPage';
import { AdminHeroSlidesPage } from './pages/admin/AdminHeroSlidesPage';
import { AdminHomepageLayoutPage } from './pages/admin/AdminHomepageLayoutPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Application Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:slug" element={<ServiceDetailPage />} />
          <Route path="solutions" element={<SolutionsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectDetailPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogDetailPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="careers/:slug" element={<CareerDetailPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="request-quote" element={<RequestQuotePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin Protected Portal */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="leads" element={<AdminLeadsPage />} />
          <Route path="inquiries" element={<AdminInquiriesPage />} />
          <Route path="services" element={<AdminServicesPage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="blogs" element={<AdminBlogsPage />} />
          <Route path="careers" element={<AdminCareersPage />} />
          <Route path="team" element={<AdminTeamPage />} />
          <Route path="clients" element={<AdminClientsPage />} />
          <Route path="popups" element={<AdminPopupsPage />} />
          <Route path="navigation" element={<AdminNavigationPage />} />
          <Route path="hero-slides" element={<AdminHeroSlidesPage />} />
          <Route path="homepage-layout" element={<AdminHomepageLayoutPage />} />
          <Route path="subscribers" element={<AdminSubscribersPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
