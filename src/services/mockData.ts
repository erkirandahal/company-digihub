import { Service, Solution, Project, Blog, Technology, Industry, TeamMember, Client, Testimonial, Career, ContactInquiry, Lead, Popup, Setting, HeroSlide } from '../types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 1,
    name: 'Custom Software Development',
    slug: 'custom-software-development',
    short_description: 'End-to-end bespoke software engineered specifically to automate operations and drive organizational growth.',
    full_description: 'We engineer tailored enterprise solutions that adapt to your exact business workflows. From multi-tiered architecture to secure role-based portals, our software delivers verifiable business ROI with high reliability.',
    icon: 'Code2',
    features: ['Custom Business Workflows', 'Role-Based Access Control', 'Multi-Tenant Architecture', 'Scalable Database Schemas'],
    technologies: ['Laravel', 'ReactJS', 'MySQL', 'Docker'],
    seo_title: 'Custom Software Development Services | Digihub Innovation Center',
    seo_description: 'Professional custom software engineering in Nepal by Digihub Innovation Center.',
    status: 'active',
    sort_order: 1,
  },
  {
    id: 2,
    name: 'Government Software Solutions',
    slug: 'government-software-solutions',
    short_description: 'Citizen-centric e-governance systems, GIS land mapping, and municipal service platforms.',
    full_description: 'Digihub specializes in developing high-availability systems for local municipalities, ministries, and public agencies. We build transparent citizen service portals with verified data integrity.',
    icon: 'Building',
    features: ['Citizen Grievance Management', 'Spatial Land & Infrastructure GIS', 'Revenue & Tax Management', 'Offline-First Field Survey Sync'],
    technologies: ['Laravel', 'PostGIS', 'ReactJS', 'REST API'],
    seo_title: 'Government & e-Governance Software | Digihub Innovation Center',
    seo_description: 'Proven e-governance and municipal MIS solutions built for public trust and reliability.',
    status: 'active',
    sort_order: 2,
  },
  {
    id: 3,
    name: 'Web Application Development',
    slug: 'web-application-development',
    short_description: 'High-performance, secure, responsive web platforms and enterprise SaaS applications.',
    full_description: 'Building fast, accessible web applications powered by modern REST APIs, reactive frontends, and hardened server configurations.',
    icon: 'Globe',
    features: ['Single Page Applications (SPA)', 'RESTful API Architecture', 'Real-time Dashboards', 'Payment Gateway Integration'],
    technologies: ['ReactJS', 'Laravel', 'TypeScript', 'Tailwind CSS'],
    status: 'active',
    sort_order: 3,
  },
  {
    id: 4,
    name: 'Mobile Application Development',
    slug: 'mobile-application-development',
    short_description: 'Cross-platform iOS and Android applications delivering native performance.',
    full_description: 'We design and engineer mobile applications that keep your staff connected in the field and engage your customers seamlessly on both Android and iOS devices.',
    icon: 'Smartphone',
    features: ['Offline SQLite Storage', 'Push Notifications', 'GPS & Geofencing', 'Biometric Authentication'],
    technologies: ['React Native', 'Laravel Sanctum API', 'Firebase Messaging'],
    status: 'active',
    sort_order: 4,
  },
  {
    id: 5,
    name: 'Digital Transformation & IT Consulting',
    slug: 'digital-transformation-consulting',
    short_description: 'Strategic advisory and legacy modernizations to guide organizations into modern digital agility.',
    full_description: 'Auditing current IT infrastructure, eliminating manual paper bottlenecks, formulating technology blueprints, and training institutional staff.',
    icon: 'Cpu',
    features: ['Legacy System Modernization', 'System Architecture Reviews', 'Cybersecurity Auditing', 'IT Staff Capacity Building'],
    technologies: ['Cloud Architecture', 'DevOps', 'Data Security'],
    status: 'active',
    sort_order: 5,
  },
];

export const INITIAL_SOLUTIONS: Solution[] = [
  {
    id: 1,
    title: 'Government Information Systems (GIS & MIS)',
    slug: 'government-information-systems',
    short_description: 'Integrated geospatial and management information systems for territorial planning and municipal governance.',
    description: 'A centralized platform combining spatial GIS layers with administrative workflows for municipal budget tracking, infrastructure asset mapping, and public services.',
    features: ['Interactive Map Overlays', 'Citizen Property Indexing', 'Multi-department Workflow Approval', 'Automated Revenue Calculation'],
    benefits: ['Eliminates manual paper records', 'Transparent revenue auditing', 'Instant map-based asset queries'],
    technologies: ['Laravel', 'PostGIS', 'ReactJS', 'Leaflet'],
    status: 'active',
    sort_order: 1,
  },
  {
    id: 2,
    title: 'Citizen e-Service Delivery Portal',
    slug: 'citizen-service-delivery-portal',
    short_description: 'Self-service web and mobile portal allowing citizens to apply for permits, pay fees, and track service requests.',
    description: 'Connects citizens directly to municipal desks with real-time SMS notifications, digital certificate verification with QR codes, and online payments.',
    features: ['Online Form Submission with Document Upload', 'QR-coded Verification Certificates', 'SMS & Email Status Alerts', 'Administrative Verification Dashboard'],
    benefits: ['Reduces office queues by 80%', 'Provides verifiable audit trail', 'Increases citizen satisfaction'],
    technologies: ['Laravel Sanctum', 'ReactJS', 'MySQL', 'Tailwind CSS'],
    status: 'active',
    sort_order: 2,
  },
  {
    id: 3,
    title: 'Enterprise Workflow & Project Management',
    slug: 'enterprise-workflow-management',
    short_description: 'End-to-end task assignment, milestone tracking, budget utilization, and field reporting platform.',
    description: 'Designed for institutions and corporations managing multi-site projects with complex approvals, procurement workflows, and executive KPI reporting.',
    features: ['Gantt & Kanban Views', 'Document Repository with Versioning', 'Timesheet & Expense Tracking', 'Executive Analytics & Export'],
    benefits: ['Real-time project visibility', 'Prevent budget overruns', 'Standardized reporting'],
    technologies: ['Laravel 12', 'ReactJS', 'MySQL', 'ChartJS'],
    status: 'active',
    sort_order: 3,
  },
];

export const INITIAL_INDUSTRIES: Industry[] = [
  { id: 1, name: 'Government & Public Sector', slug: 'government', description: 'Digital governance, e-services, GIS and municipal systems.', icon: 'Landmark', sort_order: 1, is_active: true },
  { id: 2, name: 'Education & Universities', slug: 'education', description: 'Institutional management, learning portals, student archives.', icon: 'GraduationCap', sort_order: 2, is_active: true },
  { id: 3, name: 'Finance & Cooperatives', slug: 'finance', description: 'Auditing, accounting platforms, microfinance systems.', icon: 'Building2', sort_order: 3, is_active: true },
  { id: 4, name: 'Healthcare & Hospitals', slug: 'healthcare', description: 'Electronic health records, patient queues, and pharmacy inventory.', icon: 'Activity', sort_order: 4, is_active: true },
  { id: 5, name: 'NGO & Development Sector', slug: 'ngo-ingo', description: 'Project tracking, donor reporting, and field data surveys.', icon: 'Globe', sort_order: 5, is_active: true },
];

export const INITIAL_TECHNOLOGIES: Technology[] = [
  { id: 1, name: 'Laravel 12', slug: 'laravel', category_name: 'Backend', description: 'Robust PHP framework for enterprise APIs.', website_url: 'https://laravel.com' },
  { id: 2, name: 'ReactJS', slug: 'react', category_name: 'Frontend', description: 'Declarative component-based UI engineering.', website_url: 'https://react.dev' },
  { id: 3, name: 'MySQL 8+', slug: 'mysql', category_name: 'Database', description: 'ACID-compliant relational database engine.', website_url: 'https://mysql.com' },
  { id: 4, name: 'TypeScript', slug: 'typescript', category_name: 'Frontend', description: 'Strict typing for frontend stability.', website_url: 'https://typescriptlang.org' },
  { id: 5, name: 'PostgreSQL / PostGIS', slug: 'postgresql', category_name: 'Database', description: 'Spatial GIS data processing and queries.', website_url: 'https://postgresql.org' },
  { id: 6, name: 'Docker', slug: 'docker', category_name: 'Cloud & DevOps', description: 'Containerized reliable environments.', website_url: 'https://docker.com' },
  { id: 7, name: 'Tailwind CSS', slug: 'tailwindcss', category_name: 'Frontend', description: 'Utility-first modern design system.', website_url: 'https://tailwindcss.com' },
  { id: 8, name: 'REST API', slug: 'rest-api', category_name: 'Backend', description: 'Decoupled architectural API design.', website_url: 'https://restfulapi.net' },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Municipal Digital Governance & GIS Portal',
    slug: 'municipal-digital-governance-gis',
    short_description: 'Comprehensive e-governance MIS and interactive GIS land parcel mapping system serving over 65,000 citizens.',
    full_description: 'Digihub engineered a unified digital governance suite integrating cadastral map layers with citizen service workflows. Citizens submit digital applications for business registration, house completion certificates, and property valuation, reducing turnaround time from 14 days to under 48 hours.',
    client: 'Regional Municipal Office',
    industry_id: 1,
    industry: INITIAL_INDUSTRIES[0],
    project_type: 'Government GIS & MIS',
    start_date: '2024-02-01',
    completion_date: '2024-11-15',
    project_url: 'https://example.gov.np',
    challenges: 'Integrating disparate legacy paper registers, georeferencing scanned boundary maps, and building a responsive interface accessible for rural operators.',
    solutions: 'Architected a normalized MySQL schema with spatial indexing, engineered a RESTful Laravel API, and built a lightweight React client with offline caching.',
    results: 'Processed over 18,000 digital applications in the first 6 months, increased revenue collection transparency by 35%, and eliminated paper archives.',
    status: 'published',
    featured: true,
    technologies: [INITIAL_TECHNOLOGIES[0], INITIAL_TECHNOLOGIES[1], INITIAL_TECHNOLOGIES[2]],
  },
  {
    id: 2,
    title: 'Integrated Health Records & Pharmacy ERP',
    slug: 'integrated-health-records-erp',
    short_description: 'Multi-department hospital management system handling patient triage, outpatient consultations, and batch pharmacy inventory.',
    full_description: 'A robust clinic management platform designed for multi-doctor specialty clinics. Featuring barcode patient registration, electronic prescriptions, drug expiry alerts, and automated bill generation.',
    client: 'Community Healthcare Network',
    industry_id: 4,
    industry: INITIAL_INDUSTRIES[3],
    project_type: 'Healthcare ERP',
    start_date: '2024-04-10',
    completion_date: '2024-12-20',
    challenges: 'Zero downtime requirement during clinical operating hours and strict compliance for prescription record keeping.',
    solutions: 'Built high-concurrency Laravel API with Sanctum token management and optimized relational queries to guarantee sub-100ms response times.',
    results: 'Served over 40,000 patient appointments with 99.98% uptime and zero medication inventory discrepancies.',
    status: 'published',
    featured: true,
    technologies: [INITIAL_TECHNOLOGIES[0], INITIAL_TECHNOLOGIES[1], INITIAL_TECHNOLOGIES[2], INITIAL_TECHNOLOGIES[5]],
  },
  {
    id: 3,
    title: 'Agricultural Supply Chain & Cooperative MIS',
    slug: 'agricultural-supply-chain-mis',
    short_description: 'Farmer cooperative management tracking crop yield, cold-storage inventory, and digital member payouts.',
    full_description: 'Digital platform connecting over 2,400 rural farmers to centralized distribution hubs. Enables automated milk/produce fat content testing integration, ledger accounting, and SMS voucher disbursements.',
    client: 'Regional Agro-Alliance',
    industry_id: 3,
    industry: INITIAL_INDUSTRIES[2],
    project_type: 'Enterprise MIS',
    start_date: '2024-06-01',
    completion_date: '2025-01-10',
    challenges: 'Intermittent internet connectivity in rural collection depots requiring offline transaction synchronization.',
    solutions: 'Built an offline-first local SQLite queue syncing automatically with the central Laravel REST endpoint upon network recovery.',
    results: 'Automated 100% of daily farmer payouts and minimized produce spoilage through inventory alerts.',
    status: 'published',
    featured: true,
    technologies: [INITIAL_TECHNOLOGIES[0], INITIAL_TECHNOLOGIES[1], INITIAL_TECHNOLOGIES[2]],
  },
];

export const INITIAL_BLOGS: Blog[] = [
  {
    id: 1,
    title: 'Architecting Scalable E-Governance Platforms: Lessons from Municipal Deployments',
    slug: 'architecting-scalable-e-governance-platforms',
    excerpt: 'How decoupled REST APIs and normalized relational schemas solve the dual challenges of public transparency and high concurrency in local governance.',
    content: `## Introduction

Public sector digital transformation requires balancing public accessibility with rigorous data sovereignty and audited security. Over the past several municipal deployments, Digihub Innovation Center has refined an architectural pattern that guarantees reliable public service delivery.

### 1. API-First Decoupling
By strictly isolating business validations into a certified Laravel REST API, we ensure that municipal business rules (such as tax formulas and building permit approvals) remain consistent across citizen web portals, mobile field tablets, and public service kiosks.

### 2. Relational Integrity & Concurrency
Using MySQL 8+ with foreign key cascades and transactional locks prevents race conditions during revenue receipt generation.

### 3. Audit Trails
Every administrative action (approving an application, issuing a certificate) generates an immutable entry in the audit log containing user ID, IP address, and payload diffs.

## Conclusion
Enterprise software engineering for government institutions succeeds when developers prioritize clean boundaries, verifiable security, and transparent APIs.`,
    author: { name: 'Er. Kiran Dahal', email: 'kiran@digihub.com.np' },
    category: { id: 1, name: 'GovTech & e-Governance', slug: 'govtech' },
    tags: [{ id: 1, name: 'Laravel', slug: 'laravel' }, { id: 2, name: 'E-Governance', slug: 'e-governance' }, { id: 3, name: 'REST API', slug: 'rest-api' }],
    content_type: 'Article',
    reading_time: 5,
    published_at: '2026-03-01',
    status: 'published',
    featured: true,
    view_count: 542,
  },
  {
    id: 2,
    title: 'Building Secure Full-Stack Systems with Laravel Sanctum and React',
    slug: 'building-secure-full-stack-systems-laravel-react',
    excerpt: 'A practical engineering guide to token authorization, role-based policies, and defense against common web application vulnerabilities.',
    content: `## Securing the API Boundary

When connecting a reactive frontend to a Laravel backend, token management and cross-origin resource sharing (CORS) must be configured with surgical precision.

### Key Security Layers

- **Sanctum Stateful Authentication**: Ensures SPA cookie sessions or Bearer tokens are cryptographically signed.
- **Strict Form Requests**: Frontend validation is solely a user aid; the server independently rejects ill-formed payloads.
- **Role-Based Access Control (RBAC)**: Fine-grained permissions on administrative API routes.

Always validate server-side and never store unencrypted secrets on the client.`,
    author: { name: 'Aayush Sharma', email: 'aayush@digihub.com.np' },
    category: { id: 2, name: 'Technology Insights', slug: 'tech' },
    tags: [{ id: 1, name: 'Laravel', slug: 'laravel' }, { id: 4, name: 'React', slug: 'react' }, { id: 5, name: 'Security', slug: 'security' }],
    content_type: 'Tutorial',
    reading_time: 6,
    published_at: '2026-02-20',
    status: 'published',
    featured: true,
    view_count: 819,
  },
  {
    id: 3,
    title: 'Why Normalization and Relational Schemas Matter for Long-Term Enterprise Software',
    slug: 'normalization-relational-schemas-enterprise-software',
    excerpt: 'Why relational databases like MySQL 8+ provide the durability and consistency essential for mission-critical business platforms.',
    content: `## Data Longevity

Modern applications often experience transient frontend trend changes, but the core business data model must endure for decades.

### Relational Rigor

1. **Third Normal Form (3NF)**: Eliminates redundant data storage and prevents update anomalies.
2. **Foreign Key Integrity**: The database engine itself rejects orphaned records.
3. **Optimized Indexes**: B-Tree composite indexing on commonly filtered columns (status, slugs, timestamps).

Building with relational discipline today prevents catastrophic data corruption tomorrow.`,
    author: { name: 'Er. Kiran Dahal', email: 'kiran@digihub.com.np' },
    category: { id: 2, name: 'Technology Insights', slug: 'tech' },
    tags: [{ id: 6, name: 'MySQL', slug: 'mysql' }, { id: 7, name: 'Architecture', slug: 'architecture' }],
    content_type: 'Article',
    reading_time: 4,
    published_at: '2026-02-10',
    status: 'published',
    featured: false,
    view_count: 324,
  },
];

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 1,
    name: 'Er. Kiran Dahal',
    position: 'Chief Technology Officer & Lead Architect',
    biography: 'Specializing in enterprise systems architecture, e-governance solutions, and scalable cloud applications with over a decade of engineering leadership.',
    department: 'Leadership',
    skills: ['Systems Architecture', 'Laravel', 'React', 'DevOps', 'Database Design'],
    display_order: 1,
    status: true,
  },
  {
    id: 2,
    name: 'Aayush Sharma',
    position: 'Senior Backend Engineer',
    biography: 'Expert in database normalization, REST API development, and distributed backend services.',
    department: 'Engineering',
    skills: ['PHP', 'Laravel', 'MySQL', 'API Security'],
    display_order: 2,
    status: true,
  },
  {
    id: 3,
    name: 'Pooja Shrestha',
    position: 'Lead Frontend & UI/UX Developer',
    biography: 'Passionate about crafting pixel-perfect, accessible, and high-performance user interfaces in React.',
    department: 'Design & Frontend',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Accessibility'],
    display_order: 3,
    status: true,
  },
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 1,
    name: 'Ministry of Communication & Information Technology',
    industry: 'Government',
    featured: true,
    status: true,
  },
  {
    id: 2,
    name: 'Kathmandu Metropolitan City',
    industry: 'Government',
    featured: true,
    status: true,
  },
  {
    id: 3,
    name: 'Nepal Telecom',
    industry: 'Telecommunications',
    featured: true,
    status: true,
  },
];

// Empty by default — a hero slide with no real uploaded image isn't meaningful,
// so the offline fallback intentionally has nothing to show until an admin adds one.
export const INITIAL_HERO_SLIDES: HeroSlide[] = [];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    client_name: 'Chief Administrative Officer',
    position: 'Municipal Executive Officer',
    organization: 'Local Government Municipality',
    testimonial: 'Digihub Innovation Center delivered our citizen service portal ahead of schedule. The transition from physical paper files to a digital tracking workflow has transformed our municipal operations and citizen trust.',
    rating: 5,
    featured: true,
    status: true,
  },
  {
    id: 2,
    client_name: 'Director of Healthcare Operations',
    position: 'Operations Director',
    organization: 'Regional Health Foundation',
    testimonial: 'Their disciplined approach to relational database architecture and clean API boundaries gave us an ERP that is exceptionally fast, secure, and easy for our clinical staff to use.',
    rating: 5,
    featured: true,
    status: true,
  },
  {
    id: 3,
    client_name: 'Managing Director',
    position: 'Chief Executive',
    organization: 'Commercial Distribution Network',
    testimonial: 'Digihub provided exceptional technical consultation. Their Laravel REST backend handles high volume warehouse dispatches without any latency issues.',
    rating: 5,
    featured: true,
    status: true,
  },
];

export const INITIAL_CAREERS: Career[] = [
  {
    id: 1,
    job_title: 'Senior Full-Stack Developer (Laravel + React)',
    slug: 'senior-full-stack-developer',
    department: 'Engineering',
    location: 'Kathmandu, Nepal (Hybrid)',
    employment_type: 'Full-time',
    experience: '3+ years',
    salary_information: 'Competitive (Negotiable based on experience)',
    description: 'We are seeking an experienced Full-Stack Engineer proficient in Laravel and React to lead the architectural design and implementation of enterprise digital platforms.',
    responsibilities: [
      'Architect scalable RESTful APIs with Laravel and Eloquent ORM',
      'Build reactive, accessible frontend components in React and TypeScript',
      'Design optimized MySQL database schemas, migrations, and seeders',
      'Conduct code reviews and mentor software engineering associates',
    ],
    requirements: [
      'Demonstrated 3+ years experience with production Laravel & React applications',
      'Deep understanding of REST API design, Sanctum, and relational databases',
      'Experience with Git version control, Docker, and Linux deployment environments',
      'Strong problem-solving and software architecture skills',
    ],
    skills: ['Laravel', 'ReactJS', 'MySQL', 'TypeScript', 'Tailwind CSS', 'Git'],
    benefits: ['Flexible Hybrid Work Schedule', 'Performance Bonuses', 'Paid Leave & Festivals', 'Continuous Learning Allowance'],
    deadline: '2026-04-30',
    status: 'active',
  },
  {
    id: 2,
    job_title: 'UI/UX & Frontend Designer',
    slug: 'ui-ux-frontend-designer',
    department: 'Product Design',
    location: 'Kathmandu, Nepal',
    employment_type: 'Full-time',
    experience: '2+ years',
    salary_information: 'Competitive',
    description: 'Join our product team to design intuitive, accessible user interfaces for enterprise management systems and citizen-facing e-governance portals.',
    responsibilities: [
      'Create high-fidelity wireframes, prototypes, and design systems in Figma',
      'Collaborate with developers to translate UI designs into Tailwind CSS components',
      'Conduct usability testing with institutional stakeholders',
    ],
    requirements: [
      'Proven portfolio showcasing complex web application and dashboard designs',
      'Proficiency in Figma, HTML5, CSS3, and Tailwind CSS',
      'Strong grasp of WCAG accessibility standards and design hierarchies',
    ],
    skills: ['Figma', 'UI/UX Design', 'Tailwind CSS', 'Responsive Layouts'],
    benefits: ['Health Insurance', 'Modern Equipment', 'Growth Opportunities'],
    deadline: '2026-04-15',
    status: 'active',
  },
];

export const INITIAL_INQUIRIES: ContactInquiry[] = [
  {
    id: 1,
    name: 'Suman Adhikari',
    email: 'suman@example.org',
    phone: '+977-9841234567',
    company: 'Apex Educational Trust',
    subject: 'Inquiry for Integrated Campus Management Portal',
    message: 'We are looking to implement a unified student and academic management portal for our 3 campuses. We would like to schedule a demonstration.',
    service_interested_in: 'Custom Software Development',
    budget_range: '$5,000 - $15,000',
    preferred_contact_method: 'Email',
    status: 'New',
    is_read: false,
    created_at: '2026-03-05 10:30',
  },
  {
    id: 2,
    name: 'Bikash Thapa',
    email: 'b.thapa@coopnetwork.np',
    phone: '+977-9801239876',
    company: 'Citizen Savings Cooperative',
    subject: 'Core Banking API & Mobile App Integration',
    message: 'We require a secure REST API connecting our core database to a branded mobile application for member balance checks and mini-statements.',
    service_interested_in: 'Mobile Application Development',
    budget_range: '$10,000 - $25,000',
    preferred_contact_method: 'Phone',
    status: 'Contacted',
    is_read: true,
    created_at: '2026-03-02 14:15',
  },
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 1,
    name: 'Pradeep Karki',
    company: 'Himalayan Logistics Ltd.',
    email: 'p.karki@himalayanlogistics.com',
    phone: '+977-9851098765',
    project_title: 'Warehouse Inventory & Multi-Branch Dispatch MIS',
    project_description: 'Real-time stock movement tracking across 5 distribution centers with barcode scanner integration and mobile driver app.',
    required_services: ['Custom Software Development', 'Mobile Application Development', 'API Development'],
    estimated_budget: '$10,000 - $25,000',
    timeline: '3 - 6 Months',
    preferred_contact_method: 'Email',
    status: 'In Progress',
    priority: 'High',
    follow_up_date: '2026-03-12',
    notes: 'Preliminary technical scope document shared. Next meeting scheduled for Friday.',
    created_at: '2026-03-01 11:00',
    activities: [
      { id: 1, lead_id: 1, type: 'note', description: 'Initial proposal drafted and sent.', created_at: '2026-03-01 15:00' },
      { id: 2, lead_id: 1, type: 'call', description: 'Technical alignment call held with CTO.', created_at: '2026-03-03 14:00' },
    ],
  },
  {
    id: 2,
    name: 'Anita Rai',
    company: 'Bagmati Health Care',
    email: 'anita@bagmatihealth.org',
    phone: '+977-9812345678',
    project_title: 'Laboratory Information & Digital Test Results Portal',
    project_description: 'Automated SMS alerts for patients when pathology reports are ready, with secure online PDF download via unique verification tokens.',
    required_services: ['Web Application Development', 'API Development'],
    estimated_budget: '$5,000 - $10,000',
    timeline: '1 - 3 Months',
    preferred_contact_method: 'Email',
    status: 'New',
    priority: 'Medium',
    follow_up_date: '2026-03-15',
    created_at: '2026-03-06 09:20',
  },
];

export const INITIAL_POPUPS: Popup[] = [
  {
    id: 1,
    title: 'Transform Your Organization with Custom Enterprise Software',
    description: 'Schedule a free technical architecture consultation with Digihub engineers to plan your digital transformation roadmap.',
    button_text: 'Request Consultation',
    button_url: '/request-quote',
    type: 'Contact CTA',
    status: true,
    priority: 1,
    target_pages: 'all',
    device_targeting: 'all',
    frequency: 'once_session',
    delay_seconds: 5,
    scroll_percentage: 20,
    impressions_count: 214,
    clicks_count: 27,
  },
];

export const INITIAL_SETTINGS: Setting[] = [
  { key: 'site_name', value: 'DIGIHUB INNOVATION CENTER PVT. LTD.', group: 'general', type: 'text' },
  { key: 'tagline', value: 'Building Digital Solutions for a Smarter Future', group: 'general', type: 'text' },
  { key: 'company_description', value: 'Digihub Innovation Center is a premier software development and digital transformation company specializing in enterprise applications, e-governance systems, and API-first architectures.', group: 'general', type: 'textarea' },
  { key: 'contact_email', value: 'info@digihub.com.np', group: 'contact', type: 'text' },
  { key: 'contact_phone', value: '+977-1-4567890', group: 'contact', type: 'text' },
  { key: 'contact_address', value: 'Putalisadak, Kathmandu, Bagmati Province, Nepal', group: 'contact', type: 'text' },
  { key: 'business_hours', value: 'Sunday - Friday: 9:00 AM - 6:00 PM NPT', group: 'contact', type: 'text' },
  { key: 'social_facebook', value: 'https://facebook.com/digihubnepal', group: 'social', type: 'text' },
  { key: 'social_linkedin', value: 'https://linkedin.com/company/digihub-innovation-center', group: 'social', type: 'text' },
  { key: 'social_github', value: 'https://github.com/digihub-innovation', group: 'social', type: 'text' },
  { key: 'social_twitter', value: 'https://twitter.com/digihub_np', group: 'social', type: 'text' },
  { key: 'default_seo_title', value: 'Digihub Innovation Center | Software Development & Digital Solutions', group: 'seo', type: 'text' },
  { key: 'default_seo_description', value: 'Digihub Innovation Center Pvt. Ltd. provides enterprise software development, e-governance systems, and web/mobile engineering in Nepal.', group: 'seo', type: 'textarea' },
  { key: 'footer_copyright', value: '© 2026 Digihub Innovation Center Pvt. Ltd. All rights reserved.', group: 'footer', type: 'text' },
];
