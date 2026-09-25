<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Role;
use App\Models\Service;
use App\Models\Solution;
use App\Models\Technology;
use App\Models\TechnologyCategory;
use App\Models\Industry;
use App\Models\Team;
use App\Models\Popup;
use App\Models\Setting;
use App\Models\Blog;
use App\Models\BlogCategory;
use App\Models\BlogTag;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Roles
        $superAdminRole = Role::create([
            'name' => 'Super Admin',
            'slug' => 'super-admin',
            'description' => 'Unrestricted access to all corporate and administrative functions',
        ]);

        Role::create([
            'name' => 'Admin',
            'slug' => 'admin',
            'description' => 'System administrator managing users, content, and inquiries',
        ]);

        Role::create([
            'name' => 'Editor',
            'slug' => 'editor',
            'description' => 'Content creator and blog editor',
        ]);

        Role::create([
            'name' => 'Sales/CRM Manager',
            'slug' => 'sales-crm-manager',
            'description' => 'Manages client inquiries, project quotes, and pipeline leads',
        ]);

        Role::create([
            'name' => 'HR Manager',
            'slug' => 'hr-manager',
            'description' => 'Manages job postings and job applicants',
        ]);

        // 2. Default Administrative User
        // IMPORTANT: change this password immediately after the first production login.
        User::create([
            'name' => 'Digihub Innovation Center Administrator',
            'email' => 'admin@digihubic.com.np',
            'password' => Hash::make('password123'),
            'role_id' => $superAdminRole->id,
            'is_active' => true,
        ]);

        // 3. Client types (Memorandum of Association §5(छ)/(भ) — tenders, institutions, public)
        Industry::create(['name' => 'Government & Non-Government Organizations', 'slug' => 'government-ngo', 'description' => 'Tenders and supply contracts with government and non-government bodies.', 'icon' => 'Landmark', 'sort_order' => 1]);
        Industry::create(['name' => 'Companies, Firms & Businesses', 'slug' => 'companies-firms', 'description' => 'IT, networking and printing services for private businesses.', 'icon' => 'Building2', 'sort_order' => 2]);
        Industry::create(['name' => 'Schools, Colleges & Universities', 'slug' => 'schools-colleges-universities', 'description' => 'Computer classes, training and certification partnerships.', 'icon' => 'GraduationCap', 'sort_order' => 3]);
        Industry::create(['name' => 'General Public & Retail Customers', 'slug' => 'general-public-retail', 'description' => 'Hardware, electronics, stationery and printing for individuals.', 'icon' => 'Users', 'sort_order' => 4]);
        Industry::create(['name' => 'Domestic & International Agencies', 'slug' => 'domestic-international-agencies', 'description' => 'Data processing and IT infrastructure consultation services.', 'icon' => 'Globe', 'sort_order' => 5]);

        // 4. Technology / capability stack
        $catBackend = TechnologyCategory::create(['name' => 'Backend', 'slug' => 'backend']);
        $catFrontend = TechnologyCategory::create(['name' => 'Frontend', 'slug' => 'frontend']);
        $catDatabase = TechnologyCategory::create(['name' => 'Database', 'slug' => 'database']);
        $catNetwork = TechnologyCategory::create(['name' => 'Networking & Hardware', 'slug' => 'networking-hardware']);
        $catDesign = TechnologyCategory::create(['name' => 'Design & Print', 'slug' => 'design-print']);

        Technology::create(['name' => 'Laravel', 'slug' => 'laravel', 'category_id' => $catBackend->id, 'category_name' => 'Backend', 'description' => 'PHP framework used for custom software and web application backends.', 'website_url' => 'https://laravel.com']);
        Technology::create(['name' => 'ReactJS', 'slug' => 'react', 'category_id' => $catFrontend->id, 'category_name' => 'Frontend', 'description' => 'Component-based framework for websites and web applications.', 'website_url' => 'https://react.dev']);
        Technology::create(['name' => 'MySQL', 'slug' => 'mysql', 'category_id' => $catDatabase->id, 'category_name' => 'Database', 'description' => 'Relational database for websites, software and e-commerce platforms.', 'website_url' => 'https://mysql.com']);
        Technology::create(['name' => 'Networking & Server Hardware', 'slug' => 'networking-server-hardware', 'category_id' => $catNetwork->id, 'category_name' => 'Cloud & DevOps', 'description' => 'Routers, switches, servers and structured cabling for office networks.', 'website_url' => null]);
        Technology::create(['name' => 'E-Commerce Platforms', 'slug' => 'ecommerce-platforms', 'category_id' => $catNetwork->id, 'category_name' => 'Cloud & DevOps', 'description' => 'Online store setup, management and delivery coordination.', 'website_url' => null]);
        Technology::create(['name' => 'Graphic Design & Print Tools', 'slug' => 'graphic-design-print-tools', 'category_id' => $catDesign->id, 'category_name' => 'Other', 'description' => 'Design software for branding, graphics and print-ready artwork.', 'website_url' => null]);

        // 5. Core Services (Memorandum of Association §5, objectives a-th)
        Service::create([
            'name' => 'IT & Technology Consulting',
            'slug' => 'it-technology-consulting',
            'short_description' => 'Computer and technology consultancy, IT infrastructure and managed hosting services.',
            'full_description' => 'We provide computer and various technology consultancy services, ITC (Information Technology and Communication) infrastructure consultation, development and construction, managed services, hosting services and solutions, and ongoing support services for government, non-government and private clients. Example scenario: an office planning to move its systems online could engage us to assess its IT infrastructure needs and set up managed hosting and support.',
            'icon' => 'Cpu',
            'features' => ['Computer & technology consultancy', 'ITC infrastructure consultation & development', 'Managed hosting services & solutions', 'Ongoing IT support services', 'Satellite data & data processing value-added services'],
            'technologies' => ['Networking & Server Hardware'],
            'seo_title' => 'IT & Technology Consulting Services | Digihub Innovation Center',
            'seo_description' => 'Computer and technology consultancy, ITC infrastructure and managed hosting services from Digihub Innovation Center Pvt. Ltd., Bhaktapur, Nepal.',
            'status' => 'active',
            'sort_order' => 1,
        ]);

        Service::create([
            'name' => 'Software & Website Development',
            'slug' => 'software-website-development',
            'short_description' => 'Custom software and website design, development, sale and support.',
            'full_description' => 'We design, develop, trade and support computer software and websites, including consultation, development, trading, implementation and support of software solutions and IT-enabled services for organizations and individuals. Example scenario: a small business without an online presence could commission a website along with basic software to manage its day-to-day records.',
            'icon' => 'Code2',
            'features' => ['Website design & development', 'Custom software development & sale', 'IT-enabled services (ITES)', 'Software consultation, implementation & support'],
            'technologies' => ['Laravel', 'ReactJS', 'MySQL'],
            'seo_title' => 'Software & Website Development | Digihub Innovation Center',
            'seo_description' => 'Custom software and website design, development and support services from Digihub Innovation Center Pvt. Ltd.',
            'status' => 'active',
            'sort_order' => 2,
        ]);

        Service::create([
            'name' => 'E-Commerce Solutions & Digital Marketing',
            'slug' => 'ecommerce-solutions-digital-marketing',
            'short_description' => 'E-commerce consultancy, delivery services, and website marketing.',
            'full_description' => 'We offer e-commerce related consultancy and services such as delivery service, e-commerce management, marketing and facilitation, as well as management and marketing services for websites. Example scenario: a retailer wanting to sell online could use this service to set up an online store, coordinate delivery, and manage day-to-day marketing.',
            'icon' => 'ShoppingCart',
            'features' => ['E-commerce consultancy & setup', 'Delivery service coordination', 'E-commerce management & facilitation', 'Website management & digital marketing'],
            'technologies' => ['E-Commerce Platforms'],
            'seo_title' => 'E-Commerce Solutions & Digital Marketing | Digihub Innovation Center',
            'seo_description' => 'E-commerce consultancy, delivery coordination and website marketing services from Digihub Innovation Center Pvt. Ltd.',
            'status' => 'active',
            'sort_order' => 3,
        ]);

        Service::create([
            'name' => 'Computer Networking, Hardware & Electronics',
            'slug' => 'computer-networking-hardware-electronics',
            'short_description' => 'Computer networking services and sale of hardware, IT and electronics goods.',
            'full_description' => 'We provide computer networking-related services and sell and distribute computer hardware and materials, along with IT, electrical and various other electronics goods. Example scenario: an office moving to a new location could ask us to set up its network cabling and supply the computers and networking hardware it needs.',
            'icon' => 'Network',
            'features' => ['Computer networking services', 'Computer hardware sales & distribution', 'IT & electrical goods sales', 'Electronics equipment supply'],
            'technologies' => ['Networking & Server Hardware'],
            'seo_title' => 'Computer Networking, Hardware & Electronics | Digihub Innovation Center',
            'seo_description' => 'Computer networking services and sale of hardware, IT and electronics goods from Digihub Innovation Center Pvt. Ltd.',
            'status' => 'active',
            'sort_order' => 4,
        ]);

        Service::create([
            'name' => 'Training, Seminars & Certification Courses',
            'slug' => 'training-seminars-certification-courses',
            'short_description' => 'Technology training, seminars, and certification courses with academic partners.',
            'full_description' => 'We conduct meetings, seminars and training on computer hardware and various technologies, and coordinate with domestic and foreign associations, organizations, universities, colleges and schools to run computer software, hardware and networking classes, certification courses, examinations and certificate issuance. Example scenario: a school wanting to offer basic computer certification to its students could partner with us to run the classes and issue certificates.',
            'icon' => 'GraduationCap',
            'features' => ['Technology seminars & training', 'Computer hardware & networking classes', 'Certification courses & examinations', 'Partnerships with schools, colleges & universities'],
            'technologies' => [],
            'seo_title' => 'Training, Seminars & Certification Courses | Digihub Innovation Center',
            'seo_description' => 'Computer and technology training, seminars and certification courses from Digihub Innovation Center Pvt. Ltd.',
            'status' => 'active',
            'sort_order' => 5,
        ]);

        Service::create([
            'name' => 'Printing, Branding, Graphics & Stationery',
            'slug' => 'printing-branding-graphics-stationery',
            'short_description' => 'Digital and offset printing, branding, graphics design, and stationery supplies.',
            'full_description' => 'We provide digital printing, offset printing and all kinds of printing and branding-related work, graphics designing services, and sell and distribute copy, books, pens, papers, files, notebooks, stationery, and sports and educational materials. Example scenario: an organization launching an event could get branded banners, printed stationery and graphics design produced together for the occasion.',
            'icon' => 'Printer',
            'features' => ['Digital & offset printing', 'Branding & graphics design', 'Stationery & office supplies', 'Sports & educational materials'],
            'technologies' => ['Graphic Design & Print Tools'],
            'seo_title' => 'Printing, Branding, Graphics & Stationery | Digihub Innovation Center',
            'seo_description' => 'Digital and offset printing, branding, graphics design and stationery supply services from Digihub Innovation Center Pvt. Ltd.',
            'status' => 'active',
            'sort_order' => 6,
        ]);

        // 5b. Solution Packages — combined service offerings, illustrated with example
        // scenarios rather than claimed past engagements.
        Solution::create([
            'title' => 'Website & E-Commerce Launch Package',
            'slug' => 'website-ecommerce-launch-package',
            'short_description' => 'A combined website, online store and delivery coordination package for businesses selling online.',
            'description' => 'Bundles website development with e-commerce setup, management and delivery coordination. Example scenario: a shop wanting to start selling online could use this package to get a website, an online store, and a delivery workflow set up together.',
            'features' => ['Website design & development', 'Online store setup & management', 'Delivery service coordination', 'Basic digital marketing setup'],
            'benefits' => ['One vendor for the whole online launch', 'Faster time to a working online store', 'Ongoing management support available'],
            'technologies' => ['Laravel', 'ReactJS', 'E-Commerce Platforms'],
            'icon' => 'ShoppingCart',
            'status' => 'active',
            'sort_order' => 1,
        ]);

        Solution::create([
            'title' => 'IT Infrastructure & Networking Package',
            'slug' => 'it-infrastructure-networking-package',
            'short_description' => 'Network setup, hardware supply and IT consultancy for a new or growing office.',
            'description' => 'Combines IT consultancy with computer networking, hardware supply and hosting/support. Example scenario: an office opening a new branch could use this package to get its network cabling, computers and ongoing IT support handled as one engagement.',
            'features' => ['IT infrastructure consultation', 'Network cabling & setup', 'Computer & networking hardware supply', 'Managed hosting & ongoing support'],
            'benefits' => ['Single point of contact for setup and support', 'Consistent hardware and network standards', 'Faster office setup timelines'],
            'technologies' => ['Networking & Server Hardware'],
            'icon' => 'Network',
            'status' => 'active',
            'sort_order' => 2,
        ]);

        Solution::create([
            'title' => 'School & Institution Training Package',
            'slug' => 'school-institution-training-package',
            'short_description' => 'Computer training, certification courses and networking classes for schools and institutions.',
            'description' => 'Combines training and certification services with basic networking/hardware setup for computer labs. Example scenario: a school wanting to offer a computer certification program could use this package to set up its lab and run the training and certification together.',
            'features' => ['Computer lab hardware & networking setup', 'Technology training & workshops', 'Certification courses & examinations', 'Ongoing curriculum support'],
            'benefits' => ['Coordinated setup and training in one engagement', 'Certificates issued on course completion', 'Support for repeat training cohorts'],
            'technologies' => [],
            'icon' => 'GraduationCap',
            'status' => 'active',
            'sort_order' => 3,
        ]);

        Solution::create([
            'title' => 'Print & Brand Package',
            'slug' => 'print-brand-package',
            'short_description' => 'Branded printing, graphics design and stationery supply for events and institutions.',
            'description' => 'Combines graphics design with digital/offset printing and stationery supply. Example scenario: an organization preparing for an event or annual program could use this package to get banners, printed stationery and branded materials produced together.',
            'features' => ['Graphics design & branding', 'Digital & offset printing', 'Stationery & office supplies', 'Sports & educational materials supply'],
            'benefits' => ['Consistent branding across printed materials', 'One vendor for design and print production', 'Bulk stationery supply available'],
            'technologies' => ['Graphic Design & Print Tools'],
            'icon' => 'Printer',
            'status' => 'active',
            'sort_order' => 4,
        ]);

        // 6. Team (from the company's Memorandum of Association / Rules, Schedule 9 §15 / Schedule 3 §21)
        Team::create([
            'name' => 'Laxmi Dahal',
            'position' => 'Founder',
            'biography' => 'Laxmi Dahal founded Digihub Innovation Center Pvt. Ltd. to provide accessible IT consultancy, software and website development, e-commerce, networking and hardware, technology training, and printing and branding services to individuals, businesses and institutions across Nepal.',
            'department' => 'Leadership',
            'skills' => [],
            'display_order' => 1,
            'status' => true,
        ]);

        // 6b. Blog — a genuine company overview post (not a fabricated case study).
        $newsCategory = BlogCategory::create([
            'name' => 'Company News',
            'slug' => 'company-news',
            'description' => 'Announcements and updates from Digihub Innovation Center Pvt. Ltd.',
        ]);
        $servicesTag = BlogTag::create(['name' => 'Services', 'slug' => 'services']);
        $itTag = BlogTag::create(['name' => 'IT & Technology', 'slug' => 'it-technology']);

        $overviewBlog = Blog::create([
            'title' => 'Digihub Innovation Center: IT, E-Commerce & Printing Solutions Under One Roof',
            'slug' => 'digihub-innovation-center-overview',
            'excerpt' => 'Digihub Innovation Center Pvt. Ltd. provides IT consultancy, software and website development, e-commerce, networking and hardware, training and certification, and printing and branding services in Nepal.',
            'content' => "Digihub Innovation Center Pvt. Ltd. is a private limited company registered under the Companies Act, 2063, with its registered office in Suryabinayak Municipality, Bhaktapur.\n\n## What We Do\n\nOur work spans six core areas:\n\n1. **IT & Technology Consulting** — computer consultancy, ITC infrastructure and managed hosting.\n2. **Software & Website Development** — custom software and website design, development and support.\n3. **E-Commerce Solutions & Digital Marketing** — online store setup, delivery coordination and website marketing.\n4. **Computer Networking, Hardware & Electronics** — networking services and hardware/electronics supply.\n5. **Training, Seminars & Certification Courses** — technology training and certification with academic partners.\n6. **Printing, Branding, Graphics & Stationery** — printing, branding, graphics design and stationery supply.\n\n## Who We Work With\n\nWe work with government and non-government organizations, companies and firms, schools, colleges and universities, and individual and retail customers, participating in tenders and supplying goods and services accordingly.\n\nReach out through our contact page to discuss your requirements.",
            'author_id' => null,
            'category_id' => $newsCategory->id,
            'content_type' => 'Company News',
            'reading_time' => 3,
            'published_at' => now(),
            'status' => 'published',
            'featured' => true,
            'view_count' => 0,
        ]);
        $overviewBlog->tags()->attach([$servicesTag->id, $itTag->id]);

        // 7. Popup — general contact CTA (no fabricated stats or claims)
        Popup::create([
            'title' => 'Partner with Digihub Innovation Center',
            'description' => 'Get in touch to discuss your IT, e-commerce, networking, training or printing needs.',
            'button_text' => 'Contact Us',
            'button_url' => '/contact',
            'type' => 'Contact CTA',
            'status' => true,
            'priority' => 1,
            'target_pages' => 'all',
            'device_targeting' => 'all',
            'frequency' => 'once_session',
            'delay_seconds' => 8,
            'scroll_percentage' => 30,
            'impressions_count' => 0,
            'clicks_count' => 0,
        ]);

        // 8. Site Settings — keys match what the React frontend actually reads
        // (see src/hooks/useSiteSettings.ts, Footer.tsx, Navbar.tsx, ContactPage.tsx, AdminSettingsPage.tsx)
        Setting::set('site_name', 'Digihub Innovation Center Pvt. Ltd.', 'general');
        Setting::set('tagline', 'Complete IT, E-Commerce & Printing Solutions Under One Roof', 'general');
        Setting::set('company_description', 'Digihub Innovation Center Pvt. Ltd. is a Bhaktapur-based company providing IT consultancy, software and website development, e-commerce solutions, computer networking and hardware, technology training and certification, and printing, branding and stationery services across Nepal.', 'general');
        Setting::set('pan_vat_number', '', 'general');

        // Placeholder contact details — update from Admin -> Settings once confirmed.
        Setting::set('contact_email', 'info@digihubic.com.np', 'contact');
        Setting::set('phone', '+977-1-XXXXXXX', 'contact');
        Setting::set('address', 'Suryabinayak Municipality Ward No. 3, Bhaktapur, Nepal', 'contact');
        Setting::set('maps_lat', '27.6636', 'contact');
        Setting::set('maps_lng', '85.4300', 'contact');
        Setting::set('maps_embed_url', 'https://www.google.com/maps?q=Suryabinayak,+Bhaktapur&output=embed', 'contact');

        // No confirmed social accounts yet — add real links from Admin -> Settings -> Social Media.
        Setting::set('social_links', json_encode([]), 'social', 'json');

        Setting::set('meta_title', 'Digihub Innovation Center Pvt. Ltd. | IT, E-Commerce & Printing Solutions in Nepal', 'seo');
        Setting::set('meta_description', 'Digihub Innovation Center provides IT consultancy, software & website development, e-commerce, networking & hardware, training & certification, and printing & branding services in Bhaktapur, Nepal.', 'seo');

        Setting::set('footer_about_text', 'Digihub Innovation Center Pvt. Ltd. provides IT, e-commerce, networking, training and printing services in Nepal.', 'footer');
        Setting::set('footer_newsletter_heading', 'Stay Updated with Digihub Innovation Center', 'footer');
        Setting::set('footer_newsletter_subtext', 'Occasional updates on our services, offers and technology tips.', 'footer');
        Setting::set('footer_copyright', '© 2026 Digihub Innovation Center Pvt. Ltd. All rights reserved.', 'footer');

        // Homepage sections: services, solutions, team, tech stack and the overview blog
        // post all have real content. Trusted-by/featured-projects/testimonials stay
        // hidden until there are real, verifiable clients, completed projects and
        // testimonials to show — toggle them on from Admin -> Homepage Layout at that point.
        Setting::set('homepage_sections_order', json_encode([
            ['key' => 'hero', 'visible' => true],
            ['key' => 'trusted_by', 'visible' => false],
            ['key' => 'company_overview', 'visible' => true],
            ['key' => 'team_preview', 'visible' => true],
            ['key' => 'core_services', 'visible' => true],
            ['key' => 'enterprise_solutions', 'visible' => true],
            ['key' => 'tech_stack', 'visible' => true],
            ['key' => 'featured_projects', 'visible' => false],
            ['key' => 'why_choose', 'visible' => true],
            ['key' => 'testimonials', 'visible' => false],
            ['key' => 'latest_blog', 'visible' => true],
            ['key' => 'bottom_cta', 'visible' => true],
        ]), 'general', 'json');
    }
}
