import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Code2,
  Building,
  Globe,
  Smartphone,
  Cpu,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Database,
  Layers,
  TrendingUp,
  Star,
  Quote,
} from 'lucide-react';
import {
  servicesApi,
  solutionsApi,
  projectsApi,
  blogsApi,
  corporateApi,
} from '../../services/api';
import { getStorageUrl } from '../../services/api';
import { Service, Solution, Project, Blog, Technology, Testimonial, Client } from '../../types';

export const HomePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [activeTechCategory, setActiveTechCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [servRes, solRes, projRes, blogRes, techRes, testRes, clientRes] = await Promise.all([
          servicesApi.getAll(),
          solutionsApi.getAll(),
          projectsApi.getAll(),
          blogsApi.getAll(),
          corporateApi.getTechnologies(),
          corporateApi.getTestimonials(),
          corporateApi.getClients(),
        ]);

        setServices(servRes.data || []);
        setSolutions(solRes.data || []);
        setProjects(projRes.data || []);
        setBlogs(blogRes.data || []);
        setTechnologies(techRes.data || []);
        setTestimonials(testRes.data || []);
        setClients(clientRes.data || []);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const techCategories = ['All', 'Backend', 'Frontend', 'Database', 'Cloud & DevOps'];
  const filteredTechnologies =
    activeTechCategory === 'All'
      ? technologies
      : technologies.filter((t) => t.category_name === activeTechCategory);

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Custom Software Development':
        return <Code2 className="w-6 h-6 text-emerald-600" />;
      case 'Government Software Solutions':
        return <Building className="w-6 h-6 text-emerald-600" />;
      case 'Web Application Development':
        return <Globe className="w-6 h-6 text-emerald-600" />;
      case 'Mobile Application Development':
        return <Smartphone className="w-6 h-6 text-emerald-600" />;
      default:
        return <Cpu className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-indigo-50/40 text-slate-900 pt-20 pb-28 border-b border-slate-200">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-200 text-indigo-700 text-xs font-semibold tracking-wide shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DIGIHUB INNOVATION CENTER PVT. LTD.</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Engineering Digital Solutions for a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">
                Smarter Future
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              We architect high-concurrency enterprise software, municipal e-governance systems, and API-first web and mobile platforms built with Laravel, React, and robust relational engineering.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link
                to="/request-quote"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02]"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-semibold text-sm transition-all"
              >
                <span>Explore Services</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Trust Highlights Strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-slate-200 text-slate-600">
            <div className="space-y-1">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">API-First</span>
              <p className="text-xs text-slate-500">Decoupled REST & Sanctum Architecture</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">GovTech</span>
              <p className="text-xs text-slate-500">Municipal GIS & Citizen Portals</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">MySQL 8+</span>
              <p className="text-xs text-slate-500">Strict Relational Data Integrity</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">Enterprise</span>
              <p className="text-xs text-slate-500">Audited Security & Role Policies</p>
            </div>
          </div>
        </div>
      </section>

      {/* 1.5 TRUSTED BY / CLIENTS */}
      {clients.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-8">
            Trusted by leading institutions & enterprises
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {clients.map((client) => (
              <div
                key={client.id}
                className="flex items-center gap-2.5 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all"
                title={client.name}
              >
                {client.logo ? (
                  <img
                    src={getStorageUrl(client.logo)}
                    alt={client.name}
                    className="h-8 w-auto object-contain"
                  />
                ) : (
                  <span className="text-sm font-bold text-slate-500">{client.name}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. COMPANY OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100">
              About Digihub
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Specialized Software Engineering for Public Sector & Private Enterprise
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Headquartered in Putalisadak, Kathmandu, Nepal, DIGIHUB INNOVATION CENTER PVT. LTD. bridges the gap between institutional business logic and modern digital efficiency.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Whether building municipal GIS land registration platforms or high-volume private ERPs, our systems are engineered without proprietary vendor lock-in, ensuring you retain total ownership of your data models and application source code.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero vendor lock-in</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>cPanel and Cloud Ready</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Immutable audit trails</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dedicated post-launch SLA</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800"
              >
                <span>Read our full organizational mission</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                System Topology
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                Production Standard
              </span>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Client Tier: React + Vite</h4>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Responsive SPA with centralized Axios service and accessible design.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">API Tier: Laravel 12 + Sanctum</h4>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Strict Form Requests, Eloquent ORM, and comprehensive role authorization.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Data Tier: MySQL 8+ Engine</h4>
                  <p className="text-slate-500 text-xs mt-0.5">
                    ACID compliant schema with foreign key cascades and spatial GIS extensions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 mb-2">
              Capabilities
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Core Engineering Services
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Comprehensive software engineering and technical consulting tailored to institutional requirements.
            </p>
          </div>
          <Link
            to="/services"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-md transition-all group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4 group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-colors">
                  {getServiceIcon(service.name)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {service.name}
                </h3>
                <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                  {service.short_description}
                </p>

                {service.features && (
                  <ul className="mt-4 space-y-1.5 text-xs text-slate-700">
                    {service.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {service.technologies?.slice(0, 2).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 group-hover:text-emerald-700"
                >
                  <span>Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ENTERPRISE SOLUTIONS (GIS, MIS, CITIZEN SERVICES) */}
      <section className="bg-slate-50 text-slate-900 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 mb-2">
              GovTech & Enterprise
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Pre-Architected Solutions & Platforms
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Proven system blueprints engineered to shorten deployment cycles for government bodies, educational networks, and enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solutions.map((sol) => (
              <div
                key={sol.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:border-indigo-300 hover:shadow-md transition-all"
              >
                <div>
                  <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                    {sol.status}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">
                    {sol.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    {sol.short_description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <span className="text-xs font-semibold text-slate-700 block">
                      Core Capabilities:
                    </span>
                    {sol.features?.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/solutions`}
                    className="text-xs font-semibold text-indigo-700 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <span>Explore Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TECHNOLOGY STACK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 mb-2">
            Technology Stack
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Battle-Tested, Maintainable Engineering
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            We deliberately select frameworks that deliver long-term maintainability and high runtime performance.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {techCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTechCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTechCategory === cat
                    ? 'bg-indigo-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTechnologies.map((tech) => (
            <div
              key={tech.id}
              className="bg-white border border-slate-200 rounded-xl p-4 hover:border-emerald-500/50 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {tech.category_name}
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-2">
                  {tech.name}
                </h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  {tech.description}
                </p>
              </div>
              {tech.website_url && (
                <div className="mt-3 pt-3 border-t border-slate-100 text-[11px]">
                  <a
                    href={tech.website_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-emerald-600 inline-flex items-center gap-1"
                  >
                    <span>Official docs</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. FEATURED PORTFOLIO PROJECTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 mb-2">
              Case Studies
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Engineering Deployments
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Production systems designed for reliability, verified security, and measurable organizational impact.
            </p>
          </div>
          <Link
            to="/projects"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((proj) => (
            <div
              key={proj.id}
              className="bg-white border border-slate-200 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all overflow-hidden"
            >
              {proj.featured_image && (
                <div className="h-36 w-full overflow-hidden bg-slate-100">
                  <img
                    src={getStorageUrl(proj.featured_image)}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-700">
                    {proj.project_type}
                  </span>
                  {proj.industry && <span>{proj.industry.name}</span>}
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {proj.title}
                </h3>
                <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                  {proj.short_description}
                </p>

                {proj.results && (
                  <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <span className="font-bold text-slate-900 block mb-0.5">Impact:</span>
                    <span className="text-slate-600">{proj.results}</span>
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {proj.technologies?.slice(0, 2).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/projects/${proj.slug}`}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  <span>Case Study</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. WHY CHOOSE DIGIHUB & 4-STEP PROCESS */}
      <section className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 mb-2">
              Our Methodology
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              A Disciplined 4-Stage Software Lifecycle
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Eliminating ambiguity and technical debt through rigorous specification and phased delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <span className="text-3xl font-black text-slate-200">01</span>
              <h4 className="text-base font-bold text-slate-900 mt-2 mb-1">
                Architecture Discovery
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Analyzing business logic, defining security policies, and constructing data flow diagrams.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <span className="text-3xl font-black text-slate-200">02</span>
              <h4 className="text-base font-bold text-slate-900 mt-2 mb-1">
                Relational Design
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Drafting normalized MySQL migrations, seeders, and RESTful API endpoints.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <span className="text-3xl font-black text-slate-200">03</span>
              <h4 className="text-base font-bold text-slate-900 mt-2 mb-1">
                Iterative Development
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Building reactive, accessible React components backed by Laravel API controllers and Form Requests.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <span className="text-3xl font-black text-slate-200">04</span>
              <h4 className="text-base font-bold text-slate-900 mt-2 mb-1">
                Deployment & SLA
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                cPanel or Cloud Run deployment, SSL setup, scheduler automation, and capacity training.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CLIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 mb-2">
            Institutional Trust
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Verified Stakeholder Feedback
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Real feedback from municipal officers and healthcare operations directors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-xs italic leading-relaxed">
                  "{test.testimonial}"
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm">{test.client_name}</h4>
                <p className="text-slate-500 text-xs">
                  {test.position} — {test.organization}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. LATEST BLOG POSTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 mb-2">
              Engineering Insights
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Latest Technical Briefs
            </h2>
          </div>
          <Link
            to="/blog"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800"
          >
            <span>View All Insights</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((post) => (
            <div
              key={post.id}
              className="bg-white border border-slate-200 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all group overflow-hidden"
            >
              {post.featured_image && (
                <div className="h-36 w-full overflow-hidden bg-slate-100">
                  <img
                    src={getStorageUrl(post.featured_image)}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-3">
                  <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">
                    {post.category?.name || 'Insight'}
                  </span>
                  <span>•</span>
                  <span>{post.reading_time} min read</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-slate-600 text-xs mt-2 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">{post.published_at}</span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  <span>Read Post</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. BOTTOM CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-700 text-white rounded-3xl p-10 sm:p-14 relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to architect your digital transformation?
            </h2>
            <p className="text-indigo-100 text-sm leading-relaxed">
              Consult with our software engineering team to formulate requirements, determine technical viability, and receive a formal project quotation.
            </p>
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <Link
                to="/request-quote"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-indigo-50 text-indigo-700 font-bold text-sm transition-all"
              >
                Request a Proposal
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm border border-indigo-400 transition-all"
              >
                Direct Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
