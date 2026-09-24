import React, { useEffect, useState } from 'react';
import {
  servicesApi,
  solutionsApi,
  projectsApi,
  blogsApi,
  corporateApi,
  heroSlidesApi,
} from '../../services/api';
import { Service, Solution, Project, Blog, Technology, Testimonial, Client, TeamMember, HeroSlide } from '../../types';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { parseHomepageSectionsOrder } from './homepageSections';

import { HeroSectionSwitcher } from '../../components/home/HeroSectionSwitcher';
import { TrustedByClientsSection } from '../../components/home/TrustedByClientsSection';
import { CompanyOverviewSection } from '../../components/home/CompanyOverviewSection';
import { TeamPreviewSection } from '../../components/home/TeamPreviewSection';
import { CoreServicesSection } from '../../components/home/CoreServicesSection';
import { EnterpriseSolutionsSection } from '../../components/home/EnterpriseSolutionsSection';
import { TechStackSection } from '../../components/home/TechStackSection';
import { FeaturedProjectsSection } from '../../components/home/FeaturedProjectsSection';
import { WhyChooseProcessSection } from '../../components/home/WhyChooseProcessSection';
import { TestimonialsSection } from '../../components/home/TestimonialsSection';
import { LatestBlogSection } from '../../components/home/LatestBlogSection';
import { BottomCtaSection } from '../../components/home/BottomCtaSection';

export const HomePage: React.FC = () => {
  const { homepage_sections_order, hero_enabled } = useSiteSettings();

  const [services, setServices] = useState<Service[]>([]);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [servRes, solRes, projRes, blogRes, techRes, testRes, clientRes, teamRes, heroRes] = await Promise.all([
          servicesApi.getAll(),
          solutionsApi.getAll(),
          projectsApi.getAll(),
          blogsApi.getAll(),
          corporateApi.getTechnologies(),
          corporateApi.getTestimonials(),
          corporateApi.getClients(),
          corporateApi.getTeam(),
          heroSlidesApi.getActive(),
        ]);

        setServices(servRes.data || []);
        setSolutions(solRes.data || []);
        setProjects(projRes.data || []);
        setBlogs(blogRes.data || []);
        setTechnologies(techRes.data || []);
        setTestimonials(testRes.data || []);
        setClients(clientRes.data || []);
        setTeam(teamRes.data || []);
        setHeroSlides(heroRes.data || []);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const heroEnabled = hero_enabled === '1' || hero_enabled === 'true';
  const sectionOrder = parseHomepageSectionsOrder(homepage_sections_order);

  const renderSection = (key: string) => {
    switch (key) {
      case 'hero':
        return <HeroSectionSwitcher heroEnabled={heroEnabled} slides={heroSlides} />;
      case 'trusted_by':
        return <TrustedByClientsSection clients={clients} />;
      case 'company_overview':
        return <CompanyOverviewSection />;
      case 'team_preview':
        return <TeamPreviewSection team={team} />;
      case 'core_services':
        return <CoreServicesSection services={services} />;
      case 'enterprise_solutions':
        return <EnterpriseSolutionsSection solutions={solutions} />;
      case 'tech_stack':
        return <TechStackSection technologies={technologies} />;
      case 'featured_projects':
        return <FeaturedProjectsSection projects={projects} />;
      case 'why_choose':
        return <WhyChooseProcessSection />;
      case 'testimonials':
        return <TestimonialsSection testimonials={testimonials} />;
      case 'latest_blog':
        return <LatestBlogSection blogs={blogs} />;
      case 'bottom_cta':
        return <BottomCtaSection />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-24 pb-20">
      {sectionOrder
        .filter((entry) => entry.visible)
        .map((entry) => <React.Fragment key={entry.key}>{renderSection(entry.key)}</React.Fragment>)}
    </div>
  );
};
