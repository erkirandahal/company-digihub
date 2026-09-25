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
            'description' => 'Content creator and blog/publication editor',
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
            'name' => 'Pragya Innovative Administrator',
            'email' => 'admin@pragyainnovative.com.np',
            'password' => Hash::make('password123'),
            'role_id' => $superAdminRole->id,
            'is_active' => true,
        ]);

        // 3. Sectors we work with (used as project industry filters; see MoA §5 client list)
        Industry::create(['name' => 'Federal, Provincial & Local Governments', 'slug' => 'government', 'description' => 'Ministries, departments, commissions, authorities and municipal offices.', 'icon' => 'Landmark', 'sort_order' => 1]);
        Industry::create(['name' => 'Development Partners', 'slug' => 'development-partners', 'description' => 'National and international development and donor organizations.', 'icon' => 'Globe', 'sort_order' => 2]);
        Industry::create(['name' => 'NGOs & Community Organizations', 'slug' => 'ngo-community', 'description' => 'Non-government and community-based organizations.', 'icon' => 'Users', 'sort_order' => 3]);
        Industry::create(['name' => 'Universities & Research Institutions', 'slug' => 'academia-research', 'description' => 'Higher education and research institutions.', 'icon' => 'GraduationCap', 'sort_order' => 4]);
        Industry::create(['name' => 'Private Sector', 'slug' => 'private-sector', 'description' => 'Companies, consultants and private institutions.', 'icon' => 'Building2', 'sort_order' => 5]);

        // 4. Technology / capability stack (supports the IT & Digital Infrastructure service)
        $catBackend = TechnologyCategory::create(['name' => 'Backend', 'slug' => 'backend']);
        $catFrontend = TechnologyCategory::create(['name' => 'Frontend', 'slug' => 'frontend']);
        $catDatabase = TechnologyCategory::create(['name' => 'Database', 'slug' => 'database']);
        $catCloud = TechnologyCategory::create(['name' => 'Cloud & DevOps', 'slug' => 'cloud-devops']);
        $catAi = TechnologyCategory::create(['name' => 'AI', 'slug' => 'ai']);

        Technology::create(['name' => 'Laravel', 'slug' => 'laravel', 'category_id' => $catBackend->id, 'category_name' => 'Backend', 'description' => 'Robust PHP framework for secure, maintainable web APIs and systems.', 'website_url' => 'https://laravel.com']);
        Technology::create(['name' => 'ReactJS', 'slug' => 'react', 'category_id' => $catFrontend->id, 'category_name' => 'Frontend', 'description' => 'Declarative, component-based user interfaces for websites and digital platforms.', 'website_url' => 'https://react.dev']);
        Technology::create(['name' => 'MySQL', 'slug' => 'mysql', 'category_id' => $catDatabase->id, 'category_name' => 'Database', 'description' => 'Reliable relational database for MIS and data management systems.', 'website_url' => 'https://mysql.com']);
        Technology::create(['name' => 'Cloud Hosting & Servers', 'slug' => 'cloud-hosting', 'category_id' => $catCloud->id, 'category_name' => 'Cloud & DevOps', 'description' => 'Server setup, cloud hosting, and infrastructure management.', 'website_url' => null]);
        Technology::create(['name' => 'Artificial Intelligence & Machine Learning', 'slug' => 'ai-ml', 'category_id' => $catAi->id, 'category_name' => 'AI & Data', 'description' => 'AI, machine learning and data-driven digital transformation solutions.', 'website_url' => null]);
        Technology::create(['name' => 'Cyber Security', 'slug' => 'cyber-security', 'category_id' => $catCloud->id, 'category_name' => 'Cloud & DevOps', 'description' => 'Network, application and data security for digital systems.', 'website_url' => null]);

        // 5. Core Services (Memorandum of Association §5, objectives a-e)
        Service::create([
            'name' => 'IT, Software & Digital Infrastructure',
            'slug' => 'it-software-digital-infrastructure',
            'short_description' => 'Custom software, mobile apps, websites, cloud, cybersecurity and AI solutions.',
            'full_description' => 'We study, design, develop, test, deploy and maintain information technology, software and digital systems — including custom software, mobile applications, websites, digital platforms, Management Information Systems (MIS), databases, data processing and storage, cloud services, server setup and management, cybersecurity, networking and IT infrastructure, and artificial intelligence and machine learning solutions for government, private and development-sector clients. Example scenario: a municipal office wanting to move from paper-based citizen records to a searchable digital system could engage us to design the database, build a staff-facing MIS, and train office staff to use it.',
            'icon' => 'Code2',
            'features' => [
                'Custom software, web & mobile app development',
                'Digital platforms, MIS & database management',
                'Data processing, storage & cloud services',
                'Server setup, networking & IT infrastructure',
                'Cybersecurity & network protection',
                'Artificial intelligence, machine learning & digital transformation advisory',
            ],
            'technologies' => ['Cloud Hosting', 'Cyber Security', 'Artificial Intelligence', 'Database Management'],
            'seo_title' => 'IT, Software & Digital Infrastructure Services | Pragya Innovative',
            'seo_description' => 'Custom software, mobile apps, websites, cloud, cybersecurity, networking and AI/ML solutions from Pragya Innovative Pvt. Ltd., Kathmandu, Nepal.',
            'status' => 'active',
            'sort_order' => 1,
        ]);

        Service::create([
            'name' => 'Research, Survey & Data Management',
            'slug' => 'research-survey-data-management',
            'short_description' => 'Evidence-based research, surveys, baseline and feasibility studies, and monitoring & evaluation.',
            'full_description' => 'We conduct study and research, surveys and opinion polls, data collection, analysis and management, baseline studies, feasibility studies, impact studies, and monitoring and evaluation across social, economic, legal, public administration, local governance, natural science, engineering, environmental, climate change, disaster risk reduction, sustainable development, gender equality and social inclusion (GESI), and peacebuilding and conflict-management themes — for government, non-government, community and private-sector organizations. Example scenario: a development partner planning a new program in a district could commission us to run a baseline study, so their results can later be measured against a clear starting point.',
            'icon' => 'BarChart3',
            'features' => [
                'Study, research & opinion polls',
                'Baseline, feasibility & impact studies',
                'Data collection, analysis & management',
                'Monitoring & evaluation (M&E)',
                'GESI, climate change & disaster-risk research',
                'Peacebuilding & conflict-management studies',
            ],
            'technologies' => [],
            'seo_title' => 'Research, Survey & Data Management Services | Pragya Innovative',
            'seo_description' => 'Baseline studies, feasibility studies, surveys, data collection and monitoring & evaluation services in Nepal.',
            'status' => 'active',
            'sort_order' => 2,
        ]);

        Service::create([
            'name' => 'Policy, Management & Institutional Consulting',
            'slug' => 'policy-management-institutional-consulting',
            'short_description' => 'Laws, policies, plans, DPR, EIA/IEE and governance consulting for government and development partners.',
            'full_description' => 'We prepare, revise, edit and quality-check laws, policies, rules and regulations, procedures, guidelines and standards, periodic and strategic plans, institutional development plans, medium-term expenditure frameworks, action plans, detailed project reports (DPR), environmental impact assessments (EIA), initial environmental examinations (IEE), social impact assessments (SIA) and environmental & social management plans (ESMP) — for federal, provincial and local governments, ministries, departments, commissions, authorities and development partners. Example scenario: a local government preparing an infrastructure project could ask us to draft the DPR and the accompanying IEE so the project meets regulatory requirements before it goes to tender.',
            'icon' => 'Landmark',
            'features' => [
                'Laws, policies, rules & regulations',
                'Procedures, guidelines & standards',
                'Strategic, institutional & periodic plans',
                'Detailed Project Reports (DPR)',
                'EIA, IEE, SIA & ESMP preparation',
                'Governance & institutional strengthening advisory',
            ],
            'technologies' => [],
            'seo_title' => 'Policy, Management & Institutional Consulting | Pragya Innovative',
            'seo_description' => 'DPR, EIA, IEE, policy, planning and institutional consulting services for government and development partners in Nepal.',
            'status' => 'active',
            'sort_order' => 3,
        ]);

        Service::create([
            'name' => 'Publishing, Digital Content & Communication',
            'slug' => 'publishing-digital-content-communication',
            'short_description' => 'Books, reports, journals, e-books, documentaries and multimedia content.',
            'full_description' => 'We write, edit, translate, design, print, publish and distribute books, reference books, research and project reports, annual reports, institutional profiles, souvenirs, journals, handbooks and brochures, and produce e-books, e-learning materials, audio-visual content, documentaries and other multimedia content for print and digital distribution. Example scenario: a research institute that has just completed a study could come to us for editing, design and print-ready layout of the final report, plus a short summary video for social media.',
            'icon' => 'BookOpen',
            'features' => [
                'Book, reference book & journal publishing',
                'Research, project & annual report production',
                'Institutional profiles, souvenirs & brochures',
                'E-books & e-learning materials',
                'Documentaries & audio-visual content',
                'Multimedia production & digital distribution',
            ],
            'technologies' => [],
            'seo_title' => 'Publishing, Digital Content & Communication | Pragya Innovative',
            'seo_description' => 'Book publishing, digital content, e-learning and multimedia production services from Pragya Innovative Pvt. Ltd.',
            'status' => 'active',
            'sort_order' => 4,
        ]);

        Service::create([
            'name' => 'Capacity Building, Collaboration & Professional Services',
            'slug' => 'capacity-building-collaboration-professional-services',
            'short_description' => 'Training, workshops, seminars and partnerships for research and innovation.',
            'full_description' => 'We deliver leadership development, institutional capacity enhancement, training, orientation, workshops, seminars and conferences, and reconciliation and mediation programs, and partner with government, non-government, academic and private-sector organizations on research, innovation, technology development, consulting and publishing. Example scenario: an organization rolling out a new digital system could ask us to run a staff training and orientation workshop alongside the technical rollout, so adoption does not depend on a single IT-savvy employee.',
            'icon' => 'Users2',
            'features' => [
                'Leadership & institutional capacity development',
                'Training, orientation & workshops',
                'Seminars & conferences',
                'Reconciliation & mediation programs',
                'Research & innovation partnerships',
                'Joint consulting & publishing collaborations',
            ],
            'technologies' => [],
            'seo_title' => 'Capacity Building & Professional Services | Pragya Innovative',
            'seo_description' => 'Training, workshops, capacity building and professional collaboration services from Pragya Innovative Pvt. Ltd.',
            'status' => 'active',
            'sort_order' => 5,
        ]);

        // 5b. Solution Packages — combined service offerings, illustrated with example
        // scenarios rather than claimed past engagements (the company is newly registered).
        Solution::create([
            'title' => 'Digital MIS & Software Platform Package',
            'slug' => 'digital-mis-software-platform-package',
            'short_description' => 'A combined software, hosting and training package for organizations digitizing their records and workflows.',
            'description' => 'Bundles custom software or MIS development with server/cloud setup, cybersecurity basics, and staff training. Example scenario: a cooperative or public office wanting a member/citizen database, a simple staff dashboard, and secure hosting could commission this package as one engagement instead of sourcing each piece separately.',
            'features' => ['Requirements study & system design', 'Custom software / MIS development', 'Cloud hosting & server setup', 'Staff training & handover documentation'],
            'benefits' => ['Single point of accountability for the whole system', 'Staff trained to operate the system independently', 'Ongoing maintenance support available'],
            'technologies' => ['Cloud Hosting', 'Database Management', 'Cyber Security'],
            'icon' => 'Code2',
            'status' => 'active',
            'sort_order' => 1,
        ]);

        Solution::create([
            'title' => 'Baseline, Feasibility & Impact Study Package',
            'slug' => 'baseline-feasibility-impact-study-package',
            'short_description' => 'End-to-end research design, field data collection, analysis and reporting for a planned program or project.',
            'description' => 'Covers the full research cycle: designing survey tools, collecting and cleaning data, analysis, and a final report with recommendations. Example scenario: a development partner about to launch a multi-year program could use this package to establish a baseline before the program starts and later commission a follow-up study to measure change.',
            'features' => ['Survey & research tool design', 'Field data collection & data cleaning', 'Quantitative & qualitative analysis', 'Final report with findings & recommendations'],
            'benefits' => ['Clear evidence base for planning decisions', 'Findings ready for donor or government reporting', 'Comparable results for future follow-up studies'],
            'technologies' => [],
            'icon' => 'BarChart3',
            'status' => 'active',
            'sort_order' => 2,
        ]);

        Solution::create([
            'title' => 'Policy & Institutional Documentation Package',
            'slug' => 'policy-institutional-documentation-package',
            'short_description' => 'Drafting and review support for the plans, procedures and safeguard documents a project or institution needs.',
            'description' => 'Combines policy/procedure drafting with plan preparation and, where relevant, environmental or social assessment documents. Example scenario: a local government preparing an infrastructure project could use this package to get the DPR, an IEE, and an implementation plan produced as one coordinated set of documents.',
            'features' => ['Laws, policies, procedures & guidelines drafting', 'Strategic & institutional plan preparation', 'DPR / EIA / IEE / SIA / ESMP documentation', 'Review, editing & quality-check of existing documents'],
            'benefits' => ['Documents aligned with regulatory requirements', 'Consistent terminology and structure across documents', 'Faster institutional approval cycles'],
            'technologies' => [],
            'icon' => 'Landmark',
            'status' => 'active',
            'sort_order' => 3,
        ]);

        Solution::create([
            'title' => 'Knowledge & Publication Production Package',
            'slug' => 'knowledge-publication-production-package',
            'short_description' => 'Turns finished research or institutional content into a polished report, book or multimedia product.',
            'description' => 'Covers editing, translation, design, layout and print or digital publishing, plus optional e-learning or audio-visual formats. Example scenario: an institution that has finished a study or annual report could use this package to get a designed, print-ready document along with a short explainer video for its website and social media.',
            'features' => ['Editing, translation & proofreading', 'Design & print-ready layout', 'E-book & e-learning conversion', 'Short-form audio-visual / documentary production'],
            'benefits' => ['Consistent, professional presentation of institutional knowledge', 'Content usable across print, web and social channels', 'Faster turnaround than sourcing each service separately'],
            'technologies' => [],
            'icon' => 'BookOpen',
            'status' => 'active',
            'sort_order' => 4,
        ]);

        // 6. Team (from the company's Memorandum of Association, §8/15)
        Team::create([
            'name' => 'Uddhav Prasad Adhikari',
            'position' => 'Founder',
            'biography' => 'Uddhav Prasad Adhikari founded Pragya Innovative Pvt. Ltd. to bring technology, research and policy consulting together in service of Nepal\'s public, development and private sectors. He oversees the company\'s direction across its five core service areas — IT and digital infrastructure, research, policy consulting, publishing, and capacity building.',
            'department' => 'Leadership',
            'skills' => [],
            'display_order' => 1,
            'status' => true,
        ]);

        // 6b. Blog — a genuine company announcement (not a fabricated case study),
        // authored by the company itself and factually grounded in the MoA.
        $newsCategory = BlogCategory::create([
            'name' => 'Company News',
            'slug' => 'company-news',
            'description' => 'Announcements and updates from Pragya Innovative Pvt. Ltd.',
        ]);
        $launchTag = BlogTag::create(['name' => 'Company Launch', 'slug' => 'company-launch']);
        $servicesTag = BlogTag::create(['name' => 'Services', 'slug' => 'services']);

        $introBlog = Blog::create([
            'title' => 'Introducing Pragya Innovative Pvt. Ltd.',
            'slug' => 'introducing-pragya-innovative',
            'excerpt' => 'Pragya Innovative Pvt. Ltd. brings technology, research, policy consulting, publishing and capacity building together under one roof for clients across Nepal.',
            'content' => "We are pleased to introduce Pragya Innovative Pvt. Ltd., a private limited company registered under the Companies Act, 2063, with its registered office in Bijuli Bazar, Kathmandu.\n\n## Why We Exist\n\nOrganizations across government, development and private sectors often need to work with several different specialists — a software developer, a researcher, a policy consultant, and a publisher — to complete a single initiative. Pragya Innovative was formed to bring these capabilities together under one roof.\n\n## What We Do\n\nOur work spans five core areas:\n\n1. **IT, Software & Digital Infrastructure** — custom software, websites, MIS, cloud, cybersecurity and AI solutions.\n2. **Research, Survey & Data Management** — baseline studies, surveys, data management and monitoring & evaluation.\n3. **Policy, Management & Institutional Consulting** — laws, policies, plans, DPR, EIA/IEE and governance advisory.\n4. **Publishing, Digital Content & Communication** — books, reports, e-books and multimedia content.\n5. **Capacity Building, Collaboration & Professional Services** — training, workshops and research partnerships.\n\n## Who We Work With\n\nWe work with federal, provincial and local governments, ministries, commissions, development partners, NGOs and community organizations, universities and research institutions, and the private sector.\n\nWe look forward to working with you. Reach out through our contact page to discuss your requirements.",
            'author_id' => null,
            'category_id' => $newsCategory->id,
            'content_type' => 'Company News',
            'reading_time' => 3,
            'published_at' => now(),
            'status' => 'published',
            'featured' => true,
            'view_count' => 0,
        ]);
        $introBlog->tags()->attach([$launchTag->id, $servicesTag->id]);

        // 7. Popup — general contact CTA (no fabricated stats or claims)
        Popup::create([
            'title' => 'Partner with Pragya Innovative',
            'description' => 'Schedule a consultation to discuss your software, research, policy consulting or publishing needs.',
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
        Setting::set('site_name', 'Pragya Innovative Pvt. Ltd.', 'general');
        Setting::set('tagline', 'Innovation, Research & Technology for a Better Tomorrow', 'general');
        Setting::set('company_description', 'Pragya Innovative Pvt. Ltd. is a Kathmandu-based company bringing together technology, research, policy consulting, publishing and capacity building under one roof for government, private and development-sector clients across Nepal.', 'general');
        Setting::set('pan_vat_number', '', 'general');

        // Placeholder contact details — update from Admin -> Settings once confirmed.
        Setting::set('contact_email', 'info@pragyainnovative.com.np', 'contact');
        Setting::set('phone', '+977-1-XXXXXXX', 'contact');
        Setting::set('address', 'Bijuli Bazar, Kathmandu Metropolitan City Ward No. 10, Kathmandu, Nepal', 'contact');
        Setting::set('maps_lat', '27.6941', 'contact');
        Setting::set('maps_lng', '85.3336', 'contact');
        Setting::set('maps_embed_url', 'https://www.google.com/maps?q=Bijuli+Bazar,+Kathmandu&output=embed', 'contact');

        // No confirmed social accounts yet — add real links from Admin -> Settings -> Social Media.
        Setting::set('social_links', json_encode([]), 'social', 'json');

        Setting::set('meta_title', 'Pragya Innovative Pvt. Ltd. | IT, Research & Consulting in Nepal', 'seo');
        Setting::set('meta_description', 'Pragya Innovative is a Kathmandu-based company providing software & digital solutions, research and data management, policy and institutional consulting, publishing, and capacity-building services.', 'seo');

        Setting::set('footer_about_text', 'Pragya Innovative Pvt. Ltd. provides IT, research, policy consulting, publishing and capacity-building services in Nepal.', 'footer');
        Setting::set('footer_newsletter_heading', 'Stay Updated with Pragya Innovative', 'footer');
        Setting::set('footer_newsletter_subtext', 'Occasional updates on our research, publications and services.', 'footer');
        Setting::set('footer_copyright', '© 2026 Pragya Innovative Pvt. Ltd. All rights reserved.', 'footer');

        // Homepage sections: services, solutions, team, tech stack and the intro blog
        // post all have real content now. Trusted-by/featured-projects/testimonials stay
        // hidden until there are real clients, completed projects and client testimonials
        // to show — toggle them on from Admin -> Homepage Layout at that point.
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
