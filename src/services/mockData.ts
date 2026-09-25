import { Service, Solution, Project, Blog, Technology, Industry, TeamMember, Client, Testimonial, Career, ContactInquiry, Lead, Popup, Setting, HeroSlide } from '../types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 1,
    name: 'IT & Technology Consulting',
    slug: 'it-technology-consulting',
    short_description: 'Computer and technology consultancy, IT infrastructure and managed hosting services.',
    full_description: 'We provide computer and various technology consultancy services, ITC (Information Technology and Communication) infrastructure consultation, development and construction, managed services, hosting services and solutions, and ongoing support services for government, non-government and private clients. Example scenario: an office planning to move its systems online could engage us to assess its IT infrastructure needs and set up managed hosting and support.',
    icon: 'Cpu',
    features: ['Computer & technology consultancy', 'ITC infrastructure consultation & development', 'Managed hosting services & solutions', 'Ongoing IT support services', 'Satellite data & data processing value-added services'],
    technologies: ['Networking & Server Hardware'],
    seo_title: 'IT & Technology Consulting Services | Digihub Innovation Center',
    seo_description: 'Computer and technology consultancy, ITC infrastructure and managed hosting services from Digihub Innovation Center Pvt. Ltd., Bhaktapur, Nepal.',
    status: 'active',
    sort_order: 1,
  },
  {
    id: 2,
    name: 'Software & Website Development',
    slug: 'software-website-development',
    short_description: 'Custom software and website design, development, sale and support.',
    full_description: 'We design, develop, trade and support computer software and websites, including consultation, development, trading, implementation and support of software solutions and IT-enabled services for organizations and individuals. Example scenario: a small business without an online presence could commission a website along with basic software to manage its day-to-day records.',
    icon: 'Code2',
    features: ['Website design & development', 'Custom software development & sale', 'IT-enabled services (ITES)', 'Software consultation, implementation & support'],
    technologies: ['Laravel', 'ReactJS', 'MySQL'],
    seo_title: 'Software & Website Development | Digihub Innovation Center',
    seo_description: 'Custom software and website design, development and support services from Digihub Innovation Center Pvt. Ltd.',
    status: 'active',
    sort_order: 2,
  },
  {
    id: 3,
    name: 'E-Commerce Solutions & Digital Marketing',
    slug: 'ecommerce-solutions-digital-marketing',
    short_description: 'E-commerce consultancy, delivery services, and website marketing.',
    full_description: 'We offer e-commerce related consultancy and services such as delivery service, e-commerce management, marketing and facilitation, as well as management and marketing services for websites. Example scenario: a retailer wanting to sell online could use this service to set up an online store, coordinate delivery, and manage day-to-day marketing.',
    icon: 'ShoppingCart',
    features: ['E-commerce consultancy & setup', 'Delivery service coordination', 'E-commerce management & facilitation', 'Website management & digital marketing'],
    technologies: ['E-Commerce Platforms'],
    seo_title: 'E-Commerce Solutions & Digital Marketing | Digihub Innovation Center',
    seo_description: 'E-commerce consultancy, delivery coordination and website marketing services from Digihub Innovation Center Pvt. Ltd.',
    status: 'active',
    sort_order: 3,
  },
  {
    id: 4,
    name: 'Computer Networking, Hardware & Electronics',
    slug: 'computer-networking-hardware-electronics',
    short_description: 'Computer networking services and sale of hardware, IT and electronics goods.',
    full_description: 'We provide computer networking-related services and sell and distribute computer hardware and materials, along with IT, electrical and various other electronics goods. Example scenario: an office moving to a new location could ask us to set up its network cabling and supply the computers and networking hardware it needs.',
    icon: 'Network',
    features: ['Computer networking services', 'Computer hardware sales & distribution', 'IT & electrical goods sales', 'Electronics equipment supply'],
    technologies: ['Networking & Server Hardware'],
    seo_title: 'Computer Networking, Hardware & Electronics | Digihub Innovation Center',
    seo_description: 'Computer networking services and sale of hardware, IT and electronics goods from Digihub Innovation Center Pvt. Ltd.',
    status: 'active',
    sort_order: 4,
  },
  {
    id: 5,
    name: 'Training, Seminars & Certification Courses',
    slug: 'training-seminars-certification-courses',
    short_description: 'Technology training, seminars, and certification courses with academic partners.',
    full_description: 'We conduct meetings, seminars and training on computer hardware and various technologies, and coordinate with domestic and foreign associations, organizations, universities, colleges and schools to run computer software, hardware and networking classes, certification courses, examinations and certificate issuance. Example scenario: a school wanting to offer basic computer certification to its students could partner with us to run the classes and issue certificates.',
    icon: 'GraduationCap',
    features: ['Technology seminars & training', 'Computer hardware & networking classes', 'Certification courses & examinations', 'Partnerships with schools, colleges & universities'],
    technologies: [],
    seo_title: 'Training, Seminars & Certification Courses | Digihub Innovation Center',
    seo_description: 'Computer and technology training, seminars and certification courses from Digihub Innovation Center Pvt. Ltd.',
    status: 'active',
    sort_order: 5,
  },
  {
    id: 6,
    name: 'Printing, Branding, Graphics & Stationery',
    slug: 'printing-branding-graphics-stationery',
    short_description: 'Digital and offset printing, branding, graphics design, and stationery supplies.',
    full_description: 'We provide digital printing, offset printing and all kinds of printing and branding-related work, graphics designing services, and sell and distribute copy, books, pens, papers, files, notebooks, stationery, and sports and educational materials. Example scenario: an organization launching an event could get branded banners, printed stationery and graphics design produced together for the occasion.',
    icon: 'Printer',
    features: ['Digital & offset printing', 'Branding & graphics design', 'Stationery & office supplies', 'Sports & educational materials'],
    technologies: ['Graphic Design & Print Tools'],
    seo_title: 'Printing, Branding, Graphics & Stationery | Digihub Innovation Center',
    seo_description: 'Digital and offset printing, branding, graphics design and stationery supply services from Digihub Innovation Center Pvt. Ltd.',
    status: 'active',
    sort_order: 6,
  },
];

// Combined service packages, illustrated with example scenarios rather than
// claimed past engagements.
export const INITIAL_SOLUTIONS: Solution[] = [
  {
    id: 1,
    title: 'Website & E-Commerce Launch Package',
    slug: 'website-ecommerce-launch-package',
    short_description: 'A combined website, online store and delivery coordination package for businesses selling online.',
    description: 'Bundles website development with e-commerce setup, management and delivery coordination. Example scenario: a shop wanting to start selling online could use this package to get a website, an online store, and a delivery workflow set up together.',
    features: ['Website design & development', 'Online store setup & management', 'Delivery service coordination', 'Basic digital marketing setup'],
    benefits: ['One vendor for the whole online launch', 'Faster time to a working online store', 'Ongoing management support available'],
    technologies: ['Laravel', 'ReactJS', 'E-Commerce Platforms'],
    icon: 'ShoppingCart',
    status: 'active',
    sort_order: 1,
  },
  {
    id: 2,
    title: 'IT Infrastructure & Networking Package',
    slug: 'it-infrastructure-networking-package',
    short_description: 'Network setup, hardware supply and IT consultancy for a new or growing office.',
    description: 'Combines IT consultancy with computer networking, hardware supply and hosting/support. Example scenario: an office opening a new branch could use this package to get its network cabling, computers and ongoing IT support handled as one engagement.',
    features: ['IT infrastructure consultation', 'Network cabling & setup', 'Computer & networking hardware supply', 'Managed hosting & ongoing support'],
    benefits: ['Single point of contact for setup and support', 'Consistent hardware and network standards', 'Faster office setup timelines'],
    technologies: ['Networking & Server Hardware'],
    icon: 'Network',
    status: 'active',
    sort_order: 2,
  },
  {
    id: 3,
    title: 'School & Institution Training Package',
    slug: 'school-institution-training-package',
    short_description: 'Computer training, certification courses and networking classes for schools and institutions.',
    description: 'Combines training and certification services with basic networking/hardware setup for computer labs. Example scenario: a school wanting to offer a computer certification program could use this package to set up its lab and run the training and certification together.',
    features: ['Computer lab hardware & networking setup', 'Technology training & workshops', 'Certification courses & examinations', 'Ongoing curriculum support'],
    benefits: ['Coordinated setup and training in one engagement', 'Certificates issued on course completion', 'Support for repeat training cohorts'],
    technologies: [],
    icon: 'GraduationCap',
    status: 'active',
    sort_order: 3,
  },
  {
    id: 4,
    title: 'Print & Brand Package',
    slug: 'print-brand-package',
    short_description: 'Branded printing, graphics design and stationery supply for events and institutions.',
    description: 'Combines graphics design with digital/offset printing and stationery supply. Example scenario: an organization preparing for an event or annual program could use this package to get banners, printed stationery and branded materials produced together.',
    features: ['Graphics design & branding', 'Digital & offset printing', 'Stationery & office supplies', 'Sports & educational materials supply'],
    benefits: ['Consistent branding across printed materials', 'One vendor for design and print production', 'Bulk stationery supply available'],
    technologies: ['Graphic Design & Print Tools'],
    icon: 'Printer',
    status: 'active',
    sort_order: 4,
  },
];

export const INITIAL_INDUSTRIES: Industry[] = [
  { id: 1, name: 'Government & Non-Government Organizations', slug: 'government-ngo', description: 'Tenders and supply contracts with government and non-government bodies.', icon: 'Landmark', sort_order: 1, is_active: true },
  { id: 2, name: 'Companies, Firms & Businesses', slug: 'companies-firms', description: 'IT, networking and printing services for private businesses.', icon: 'Building2', sort_order: 2, is_active: true },
  { id: 3, name: 'Schools, Colleges & Universities', slug: 'schools-colleges-universities', description: 'Computer classes, training and certification partnerships.', icon: 'GraduationCap', sort_order: 3, is_active: true },
  { id: 4, name: 'General Public & Retail Customers', slug: 'general-public-retail', description: 'Hardware, electronics, stationery and printing for individuals.', icon: 'Users', sort_order: 4, is_active: true },
  { id: 5, name: 'Domestic & International Agencies', slug: 'domestic-international-agencies', description: 'Data processing and IT infrastructure consultation services.', icon: 'Globe', sort_order: 5, is_active: true },
];

export const INITIAL_TECHNOLOGIES: Technology[] = [
  { id: 1, name: 'Laravel', slug: 'laravel', category_name: 'Backend', description: 'PHP framework used for custom software and web application backends.', website_url: 'https://laravel.com' },
  { id: 2, name: 'ReactJS', slug: 'react', category_name: 'Frontend', description: 'Component-based framework for websites and web applications.', website_url: 'https://react.dev' },
  { id: 3, name: 'MySQL', slug: 'mysql', category_name: 'Database', description: 'Relational database for websites, software and e-commerce platforms.', website_url: 'https://mysql.com' },
  { id: 4, name: 'Networking & Server Hardware', slug: 'networking-server-hardware', category_name: 'Cloud & DevOps', description: 'Routers, switches, servers and structured cabling for office networks.', website_url: undefined },
  { id: 5, name: 'E-Commerce Platforms', slug: 'ecommerce-platforms', category_name: 'Cloud & DevOps', description: 'Online store setup, management and delivery coordination.', website_url: undefined },
  { id: 6, name: 'Graphic Design & Print Tools', slug: 'graphic-design-print-tools', category_name: 'Other', description: 'Design software for branding, graphics and print-ready artwork.', website_url: undefined },
];

// No completed engagements to showcase yet — add real ones from Admin -> Projects.
export const INITIAL_PROJECTS: Project[] = [];

// A genuine company overview post (not a fabricated case study).
export const INITIAL_BLOGS: Blog[] = [
  {
    id: 1,
    title: 'Digihub Innovation Center: IT, E-Commerce & Printing Solutions Under One Roof',
    slug: 'digihub-innovation-center-overview',
    excerpt: 'Digihub Innovation Center Pvt. Ltd. provides IT consultancy, software and website development, e-commerce, networking and hardware, training and certification, and printing and branding services in Nepal.',
    content: `Digihub Innovation Center Pvt. Ltd. is a private limited company registered under the Companies Act, 2063, with its registered office in Suryabinayak Municipality, Bhaktapur.

## What We Do

Our work spans six core areas:

1. **IT & Technology Consulting** — computer consultancy, ITC infrastructure and managed hosting.
2. **Software & Website Development** — custom software and website design, development and support.
3. **E-Commerce Solutions & Digital Marketing** — online store setup, delivery coordination and website marketing.
4. **Computer Networking, Hardware & Electronics** — networking services and hardware/electronics supply.
5. **Training, Seminars & Certification Courses** — technology training and certification with academic partners.
6. **Printing, Branding, Graphics & Stationery** — printing, branding, graphics design and stationery supply.

## Who We Work With

We work with government and non-government organizations, companies and firms, schools, colleges and universities, and individual and retail customers, participating in tenders and supplying goods and services accordingly.

Reach out through our contact page to discuss your requirements.`,
    category: { id: 1, name: 'Company News', slug: 'company-news' },
    tags: [{ id: 1, name: 'Services', slug: 'services' }, { id: 2, name: 'IT & Technology', slug: 'it-technology' }],
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
    name: 'Laxmi Dahal',
    position: 'Founder',
    biography: 'Laxmi Dahal founded Digihub Innovation Center Pvt. Ltd. to provide accessible IT consultancy, software and website development, e-commerce, networking and hardware, technology training, and printing and branding services to individuals, businesses and institutions across Nepal.',
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
    title: 'Partner with Digihub Innovation Center',
    description: 'Get in touch to discuss your IT, e-commerce, networking, training or printing needs.',
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
  { key: 'site_name', value: 'Digihub Innovation Center Pvt. Ltd.', group: 'general', type: 'text' },
  { key: 'tagline', value: 'Software, Innovation & IT Solutions for a Digital Nepal', group: 'general', type: 'text' },
  { key: 'company_description', value: 'Digihub Innovation Center Pvt. Ltd. is a Bhaktapur-based company providing IT consultancy, software and website development, e-commerce solutions, computer networking and hardware, technology training and certification, and printing, branding and stationery services across Nepal.', group: 'general', type: 'textarea' },
  { key: 'pan_vat_number', value: '', group: 'general', type: 'text' },
  { key: 'contact_email', value: 'info@digihubic.com.np', group: 'contact', type: 'text' },
  { key: 'phone', value: '+977-1-XXXXXXX', group: 'contact', type: 'text' },
  { key: 'address', value: 'Suryabinayak Municipality Ward No. 3, Bhaktapur, Nepal', group: 'contact', type: 'text' },
  { key: 'maps_lat', value: '27.6636', group: 'contact', type: 'text' },
  { key: 'maps_lng', value: '85.4300', group: 'contact', type: 'text' },
  { key: 'maps_embed_url', value: 'https://www.google.com/maps?q=Suryabinayak,+Bhaktapur&output=embed', group: 'contact', type: 'text' },
  { key: 'social_links', value: JSON.stringify([]), group: 'social', type: 'json' },
  { key: 'meta_title', value: 'Digihub Innovation Center Pvt. Ltd. | Software, IT & Innovation Solutions in Nepal', group: 'seo', type: 'text' },
  { key: 'meta_description', value: 'Digihub Innovation Center provides software & website development, IT consultancy, e-commerce, networking & hardware, training & certification, and printing & branding services in Bhaktapur, Nepal.', group: 'seo', type: 'textarea' },
  { key: 'footer_about_text', value: 'Digihub Innovation Center Pvt. Ltd. provides IT, e-commerce, networking, training and printing services in Nepal.', group: 'footer', type: 'text' },
  { key: 'footer_newsletter_heading', value: 'Stay Updated with Digihub Innovation Center', group: 'footer', type: 'text' },
  { key: 'footer_newsletter_subtext', value: 'Occasional updates on our services, offers and technology tips.', group: 'footer', type: 'textarea' },
  { key: 'footer_copyright', value: '© 2026 Digihub Innovation Center Pvt. Ltd. All rights reserved.', group: 'footer', type: 'text' },
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
