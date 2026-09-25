import { Service, Solution, Project, Blog, Technology, Industry, TeamMember, Client, Testimonial, Career, ContactInquiry, Lead, Popup, Setting, HeroSlide } from '../types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 1,
    name: 'IT, Software & Digital Infrastructure',
    slug: 'it-software-digital-infrastructure',
    short_description: 'Custom software, mobile apps, websites, cloud, cybersecurity and AI solutions.',
    full_description: 'We study, design, develop, test, deploy and maintain information technology, software and digital systems — including custom software, mobile applications, websites, digital platforms, Management Information Systems (MIS), databases, data processing and storage, cloud services, server setup and management, cybersecurity, networking and IT infrastructure, and artificial intelligence and machine learning solutions for government, private and development-sector clients. Example scenario: a municipal office wanting to move from paper-based citizen records to a searchable digital system could engage us to design the database, build a staff-facing MIS, and train office staff to use it.',
    icon: 'Code2',
    features: ['Custom software, web & mobile app development', 'Digital platforms, MIS & database management', 'Data processing, storage & cloud services', 'Server setup, networking & IT infrastructure', 'Cybersecurity & network protection', 'Artificial intelligence, machine learning & digital transformation advisory'],
    technologies: ['Cloud Hosting', 'Cyber Security', 'Artificial Intelligence', 'Database Management'],
    seo_title: 'IT, Software & Digital Infrastructure Services | Pragya Innovative',
    seo_description: 'Custom software, mobile apps, websites, cloud, cybersecurity, networking and AI/ML solutions from Pragya Innovative Pvt. Ltd., Kathmandu, Nepal.',
    status: 'active',
    sort_order: 1,
  },
  {
    id: 2,
    name: 'Research, Survey & Data Management',
    slug: 'research-survey-data-management',
    short_description: 'Evidence-based research, surveys, baseline and feasibility studies, and monitoring & evaluation.',
    full_description: 'We conduct study and research, surveys and opinion polls, data collection, analysis and management, baseline studies, feasibility studies, impact studies, and monitoring and evaluation across social, economic, legal, public administration, local governance, natural science, engineering, environmental, climate change, disaster risk reduction, sustainable development, gender equality and social inclusion (GESI), and peacebuilding and conflict-management themes — for government, non-government, community and private-sector organizations. Example scenario: a development partner planning a new program in a district could commission us to run a baseline study, so their results can later be measured against a clear starting point.',
    icon: 'BarChart3',
    features: ['Study, research & opinion polls', 'Baseline, feasibility & impact studies', 'Data collection, analysis & management', 'Monitoring & evaluation (M&E)', 'GESI, climate change & disaster-risk research', 'Peacebuilding & conflict-management studies'],
    technologies: [],
    seo_title: 'Research, Survey & Data Management Services | Pragya Innovative',
    seo_description: 'Baseline studies, feasibility studies, surveys, data collection and monitoring & evaluation services in Nepal.',
    status: 'active',
    sort_order: 2,
  },
  {
    id: 3,
    name: 'Policy, Management & Institutional Consulting',
    slug: 'policy-management-institutional-consulting',
    short_description: 'Laws, policies, plans, DPR, EIA/IEE and governance consulting for government and development partners.',
    full_description: 'We prepare, revise, edit and quality-check laws, policies, rules and regulations, procedures, guidelines and standards, periodic and strategic plans, institutional development plans, medium-term expenditure frameworks, action plans, detailed project reports (DPR), environmental impact assessments (EIA), initial environmental examinations (IEE), social impact assessments (SIA) and environmental & social management plans (ESMP) — for federal, provincial and local governments, ministries, departments, commissions, authorities and development partners. Example scenario: a local government preparing an infrastructure project could ask us to draft the DPR and the accompanying IEE so the project meets regulatory requirements before it goes to tender.',
    icon: 'Landmark',
    features: ['Laws, policies, rules & regulations', 'Procedures, guidelines & standards', 'Strategic, institutional & periodic plans', 'Detailed Project Reports (DPR)', 'EIA, IEE, SIA & ESMP preparation', 'Governance & institutional strengthening advisory'],
    technologies: [],
    seo_title: 'Policy, Management & Institutional Consulting | Pragya Innovative',
    seo_description: 'DPR, EIA, IEE, policy, planning and institutional consulting services for government and development partners in Nepal.',
    status: 'active',
    sort_order: 3,
  },
  {
    id: 4,
    name: 'Publishing, Digital Content & Communication',
    slug: 'publishing-digital-content-communication',
    short_description: 'Books, reports, journals, e-books, documentaries and multimedia content.',
    full_description: 'We write, edit, translate, design, print, publish and distribute books, reference books, research and project reports, annual reports, institutional profiles, souvenirs, journals, handbooks and brochures, and produce e-books, e-learning materials, audio-visual content, documentaries and other multimedia content for print and digital distribution. Example scenario: a research institute that has just completed a study could come to us for editing, design and print-ready layout of the final report, plus a short summary video for social media.',
    icon: 'BookOpen',
    features: ['Book, reference book & journal publishing', 'Research, project & annual report production', 'Institutional profiles, souvenirs & brochures', 'E-books & e-learning materials', 'Documentaries & audio-visual content', 'Multimedia production & digital distribution'],
    technologies: [],
    seo_title: 'Publishing, Digital Content & Communication | Pragya Innovative',
    seo_description: 'Book publishing, digital content, e-learning and multimedia production services from Pragya Innovative Pvt. Ltd.',
    status: 'active',
    sort_order: 4,
  },
  {
    id: 5,
    name: 'Capacity Building, Collaboration & Professional Services',
    slug: 'capacity-building-collaboration-professional-services',
    short_description: 'Training, workshops, seminars and partnerships for research and innovation.',
    full_description: 'We deliver leadership development, institutional capacity enhancement, training, orientation, workshops, seminars and conferences, and reconciliation and mediation programs, and partner with government, non-government, academic and private-sector organizations on research, innovation, technology development, consulting and publishing. Example scenario: an organization rolling out a new digital system could ask us to run a staff training and orientation workshop alongside the technical rollout, so adoption does not depend on a single IT-savvy employee.',
    icon: 'Users2',
    features: ['Leadership & institutional capacity development', 'Training, orientation & workshops', 'Seminars & conferences', 'Reconciliation & mediation programs', 'Research & innovation partnerships', 'Joint consulting & publishing collaborations'],
    technologies: [],
    seo_title: 'Capacity Building & Professional Services | Pragya Innovative',
    seo_description: 'Training, workshops, capacity building and professional collaboration services from Pragya Innovative Pvt. Ltd.',
    status: 'active',
    sort_order: 5,
  },
];

// Combined service packages, illustrated with example scenarios rather than
// claimed past engagements (the company is newly registered).
export const INITIAL_SOLUTIONS: Solution[] = [
  {
    id: 1,
    title: 'Digital MIS & Software Platform Package',
    slug: 'digital-mis-software-platform-package',
    short_description: 'A combined software, hosting and training package for organizations digitizing their records and workflows.',
    description: 'Bundles custom software or MIS development with server/cloud setup, cybersecurity basics, and staff training. Example scenario: a cooperative or public office wanting a member/citizen database, a simple staff dashboard, and secure hosting could commission this package as one engagement instead of sourcing each piece separately.',
    features: ['Requirements study & system design', 'Custom software / MIS development', 'Cloud hosting & server setup', 'Staff training & handover documentation'],
    benefits: ['Single point of accountability for the whole system', 'Staff trained to operate the system independently', 'Ongoing maintenance support available'],
    technologies: ['Cloud Hosting', 'Database Management', 'Cyber Security'],
    icon: 'Code2',
    status: 'active',
    sort_order: 1,
  },
  {
    id: 2,
    title: 'Baseline, Feasibility & Impact Study Package',
    slug: 'baseline-feasibility-impact-study-package',
    short_description: 'End-to-end research design, field data collection, analysis and reporting for a planned program or project.',
    description: 'Covers the full research cycle: designing survey tools, collecting and cleaning data, analysis, and a final report with recommendations. Example scenario: a development partner about to launch a multi-year program could use this package to establish a baseline before the program starts and later commission a follow-up study to measure change.',
    features: ['Survey & research tool design', 'Field data collection & data cleaning', 'Quantitative & qualitative analysis', 'Final report with findings & recommendations'],
    benefits: ['Clear evidence base for planning decisions', 'Findings ready for donor or government reporting', 'Comparable results for future follow-up studies'],
    technologies: [],
    icon: 'BarChart3',
    status: 'active',
    sort_order: 2,
  },
  {
    id: 3,
    title: 'Policy & Institutional Documentation Package',
    slug: 'policy-institutional-documentation-package',
    short_description: 'Drafting and review support for the plans, procedures and safeguard documents a project or institution needs.',
    description: 'Combines policy/procedure drafting with plan preparation and, where relevant, environmental or social assessment documents. Example scenario: a local government preparing an infrastructure project could use this package to get the DPR, an IEE, and an implementation plan produced as one coordinated set of documents.',
    features: ['Laws, policies, procedures & guidelines drafting', 'Strategic & institutional plan preparation', 'DPR / EIA / IEE / SIA / ESMP documentation', 'Review, editing & quality-check of existing documents'],
    benefits: ['Documents aligned with regulatory requirements', 'Consistent terminology and structure across documents', 'Faster institutional approval cycles'],
    technologies: [],
    icon: 'Landmark',
    status: 'active',
    sort_order: 3,
  },
  {
    id: 4,
    title: 'Knowledge & Publication Production Package',
    slug: 'knowledge-publication-production-package',
    short_description: 'Turns finished research or institutional content into a polished report, book or multimedia product.',
    description: 'Covers editing, translation, design, layout and print or digital publishing, plus optional e-learning or audio-visual formats. Example scenario: an institution that has finished a study or annual report could use this package to get a designed, print-ready document along with a short explainer video for its website and social media.',
    features: ['Editing, translation & proofreading', 'Design & print-ready layout', 'E-book & e-learning conversion', 'Short-form audio-visual / documentary production'],
    benefits: ['Consistent, professional presentation of institutional knowledge', 'Content usable across print, web and social channels', 'Faster turnaround than sourcing each service separately'],
    technologies: [],
    icon: 'BookOpen',
    status: 'active',
    sort_order: 4,
  },
];

export const INITIAL_INDUSTRIES: Industry[] = [
  { id: 1, name: 'Federal, Provincial & Local Governments', slug: 'government', description: 'Ministries, departments, commissions, authorities and municipal offices.', icon: 'Landmark', sort_order: 1, is_active: true },
  { id: 2, name: 'Development Partners', slug: 'development-partners', description: 'National and international development and donor organizations.', icon: 'Globe', sort_order: 2, is_active: true },
  { id: 3, name: 'NGOs & Community Organizations', slug: 'ngo-community', description: 'Non-government and community-based organizations.', icon: 'Users', sort_order: 3, is_active: true },
  { id: 4, name: 'Universities & Research Institutions', slug: 'academia-research', description: 'Higher education and research institutions.', icon: 'GraduationCap', sort_order: 4, is_active: true },
  { id: 5, name: 'Private Sector', slug: 'private-sector', description: 'Companies, consultants and private institutions.', icon: 'Building2', sort_order: 5, is_active: true },
];

export const INITIAL_TECHNOLOGIES: Technology[] = [
  { id: 1, name: 'Laravel', slug: 'laravel', category_name: 'Backend', description: 'Robust PHP framework for secure, maintainable web APIs and systems.', website_url: 'https://laravel.com' },
  { id: 2, name: 'ReactJS', slug: 'react', category_name: 'Frontend', description: 'Declarative, component-based user interfaces for websites and digital platforms.', website_url: 'https://react.dev' },
  { id: 3, name: 'MySQL', slug: 'mysql', category_name: 'Database', description: 'Reliable relational database for MIS and data management systems.', website_url: 'https://mysql.com' },
  { id: 4, name: 'Cloud Hosting & Servers', slug: 'cloud-hosting', category_name: 'Cloud & DevOps', description: 'Server setup, cloud hosting, and infrastructure management.', website_url: undefined },
  { id: 5, name: 'Artificial Intelligence & Machine Learning', slug: 'ai-ml', category_name: 'AI', description: 'AI, machine learning and data-driven digital transformation solutions.', website_url: undefined },
  { id: 6, name: 'Cyber Security', slug: 'cyber-security', category_name: 'Cloud & DevOps', description: 'Network, application and data security for digital systems.', website_url: undefined },
];

// No completed engagements to showcase yet — add real ones from Admin -> Projects.
export const INITIAL_PROJECTS: Project[] = [];

// A genuine company announcement (not a fabricated case study), factually
// grounded in the Memorandum of Association.
export const INITIAL_BLOGS: Blog[] = [
  {
    id: 1,
    title: 'Introducing Pragya Innovative Pvt. Ltd.',
    slug: 'introducing-pragya-innovative',
    excerpt: 'Pragya Innovative Pvt. Ltd. brings technology, research, policy consulting, publishing and capacity building together under one roof for clients across Nepal.',
    content: `We are pleased to introduce Pragya Innovative Pvt. Ltd., a private limited company registered under the Companies Act, 2063, with its registered office in Bijuli Bazar, Kathmandu.

## Why We Exist

Organizations across government, development and private sectors often need to work with several different specialists — a software developer, a researcher, a policy consultant, and a publisher — to complete a single initiative. Pragya Innovative was formed to bring these capabilities together under one roof.

## What We Do

Our work spans five core areas:

1. **IT, Software & Digital Infrastructure** — custom software, websites, MIS, cloud, cybersecurity and AI solutions.
2. **Research, Survey & Data Management** — baseline studies, surveys, data management and monitoring & evaluation.
3. **Policy, Management & Institutional Consulting** — laws, policies, plans, DPR, EIA/IEE and governance advisory.
4. **Publishing, Digital Content & Communication** — books, reports, e-books and multimedia content.
5. **Capacity Building, Collaboration & Professional Services** — training, workshops and research partnerships.

## Who We Work With

We work with federal, provincial and local governments, ministries, commissions, development partners, NGOs and community organizations, universities and research institutions, and the private sector.

We look forward to working with you. Reach out through our contact page to discuss your requirements.`,
    category: { id: 1, name: 'Company News', slug: 'company-news' },
    tags: [{ id: 1, name: 'Company Launch', slug: 'company-launch' }, { id: 2, name: 'Services', slug: 'services' }],
    content_type: 'Company News',
    reading_time: 3,
    published_at: new Date().toISOString().slice(0, 10),
    status: 'published',
    featured: true,
    view_count: 0,
  },
];

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 1,
    name: 'Uddhav Prasad Adhikari',
    position: 'Founder',
    biography: 'Uddhav Prasad Adhikari founded Pragya Innovative Pvt. Ltd. to bring technology, research and policy consulting together in service of Nepal\'s public, development and private sectors. He oversees the company\'s direction across its five core service areas — IT and digital infrastructure, research, policy consulting, publishing, and capacity building.',
    department: 'Leadership',
    skills: [],
    display_order: 1,
    status: true,
  },
];

// No confirmed clients to display yet — add real ones from Admin -> Clients.
export const INITIAL_CLIENTS: Client[] = [];

// Empty by default — a hero slide with no real uploaded image isn't meaningful,
// so the offline fallback intentionally has nothing to show until an admin adds one.
export const INITIAL_HERO_SLIDES: HeroSlide[] = [];

// No client testimonials collected yet — add real ones from Admin -> Testimonials.
export const INITIAL_TESTIMONIALS: Testimonial[] = [];

// No open positions yet — add real ones from Admin -> Careers.
export const INITIAL_CAREERS: Career[] = [];

// No inquiries yet — real submissions will populate this via the Contact/Lead APIs.
export const INITIAL_INQUIRIES: ContactInquiry[] = [];

export const INITIAL_LEADS: Lead[] = [];

export const INITIAL_POPUPS: Popup[] = [
  {
    id: 1,
    title: 'Partner with Pragya Innovative',
    description: 'Schedule a consultation to discuss your software, research, policy consulting or publishing needs.',
    button_text: 'Contact Us',
    button_url: '/contact',
    type: 'Contact CTA',
    status: true,
    priority: 1,
    target_pages: 'all',
    device_targeting: 'all',
    frequency: 'once_session',
    delay_seconds: 8,
    scroll_percentage: 30,
    impressions_count: 0,
    clicks_count: 0,
  },
];

export const INITIAL_SETTINGS: Setting[] = [
  { key: 'site_name', value: 'Pragya Innovative Pvt. Ltd.', group: 'general', type: 'text' },
  { key: 'tagline', value: 'Innovation, Research & Technology for a Better Tomorrow', group: 'general', type: 'text' },
  { key: 'company_description', value: 'Pragya Innovative Pvt. Ltd. is a Kathmandu-based company bringing together technology, research, policy consulting, publishing and capacity building under one roof for government, private and development-sector clients across Nepal.', group: 'general', type: 'textarea' },
  { key: 'pan_vat_number', value: '', group: 'general', type: 'text' },
  { key: 'contact_email', value: 'info@pragyainnovative.com.np', group: 'contact', type: 'text' },
  { key: 'phone', value: '+977-1-XXXXXXX', group: 'contact', type: 'text' },
  { key: 'address', value: 'Bijuli Bazar, Kathmandu Metropolitan City Ward No. 10, Kathmandu, Nepal', group: 'contact', type: 'text' },
  { key: 'maps_lat', value: '27.6941', group: 'contact', type: 'text' },
  { key: 'maps_lng', value: '85.3336', group: 'contact', type: 'text' },
  { key: 'maps_embed_url', value: 'https://www.google.com/maps?q=Bijuli+Bazar,+Kathmandu&output=embed', group: 'contact', type: 'text' },
  { key: 'social_links', value: JSON.stringify([]), group: 'social', type: 'json' },
  { key: 'meta_title', value: 'Pragya Innovative Pvt. Ltd. | IT, Research & Consulting in Nepal', group: 'seo', type: 'text' },
  { key: 'meta_description', value: 'Pragya Innovative is a Kathmandu-based company providing software & digital solutions, research and data management, policy and institutional consulting, publishing, and capacity-building services.', group: 'seo', type: 'textarea' },
  { key: 'footer_about_text', value: 'Pragya Innovative Pvt. Ltd. provides IT, research, policy consulting, publishing and capacity-building services in Nepal.', group: 'footer', type: 'text' },
  { key: 'footer_newsletter_heading', value: 'Stay Updated with Pragya Innovative', group: 'footer', type: 'text' },
  { key: 'footer_newsletter_subtext', value: 'Occasional updates on our research, publications and services.', group: 'footer', type: 'textarea' },
  { key: 'footer_copyright', value: '© 2026 Pragya Innovative Pvt. Ltd. All rights reserved.', group: 'footer', type: 'text' },
  {
    key: 'homepage_sections_order',
    value: JSON.stringify([
      { key: 'hero', visible: true },
      { key: 'trusted_by', visible: false },
      { key: 'company_overview', visible: true },
      { key: 'team_preview', visible: true },
      { key: 'core_services', visible: true },
      { key: 'enterprise_solutions', visible: true },
      { key: 'tech_stack', visible: true },
      { key: 'featured_projects', visible: false },
      { key: 'why_choose', visible: true },
      { key: 'testimonials', visible: false },
      { key: 'latest_blog', visible: true },
      { key: 'bottom_cta', visible: true },
    ]),
    group: 'general',
    type: 'json',
  },
];
