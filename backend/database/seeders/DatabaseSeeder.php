<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Role;
use App\Models\Permission;
use App\Models\Service;
use App\Models\Solution;
use App\Models\Technology;
use App\Models\TechnologyCategory;
use App\Models\Industry;
use App\Models\Project;
use App\Models\Blog;
use App\Models\BlogCategory;
use App\Models\BlogTag;
use App\Models\Team;
use App\Models\Client;
use App\Models\Testimonial;
use App\Models\Career;
use App\Models\Popup;
use App\Models\Setting;
use App\Models\ContactInquiry;
use App\Models\Lead;

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

        $adminRole = Role::create([
            'name' => 'Admin',
            'slug' => 'admin',
            'description' => 'System administrator managing users, content, and inquiries',
        ]);

        $editorRole = Role::create([
            'name' => 'Editor',
            'slug' => 'editor',
            'description' => 'Content creator and blog editor',
        ]);

        $salesRole = Role::create([
            'name' => 'Sales/CRM Manager',
            'slug' => 'sales-crm-manager',
            'description' => 'Manages client inquiries, project quotes, and pipeline leads',
        ]);

        $hrRole = Role::create([
            'name' => 'HR Manager',
            'slug' => 'hr-manager',
            'description' => 'Manages job postings and job applicants',
        ]);

        // 2. Default Administrative User
        $admin = User::create([
            'name' => 'Digihub Administrator',
            'email' => 'admin@digihub.com.np',
            'password' => Hash::make('password123'),
            'role_id' => $superAdminRole->id,
            'is_active' => true,
        ]);

        // 3. Industries
        $gov = Industry::create(['name' => 'Government & Public Sector', 'slug' => 'government', 'description' => 'Digital governance, e-services, GIS and municipal information systems.', 'icon' => 'Landmark', 'sort_order' => 1]);
        $edu = Industry::create(['name' => 'Education & Universities', 'slug' => 'education', 'description' => 'Institutional management, learning portals, and student portals.', 'icon' => 'GraduationCap', 'sort_order' => 2]);
        $fin = Industry::create(['name' => 'Finance & Cooperatives', 'slug' => 'finance', 'description' => 'Auditing, accounting platforms, microfinance, and payment gateways.', 'icon' => 'Building2', 'sort_order' => 3]);
        $health = Industry::create(['name' => 'Healthcare & Hospitals', 'slug' => 'healthcare', 'description' => 'Electronic health records, patient queues, and pharmacy inventory.', 'icon' => 'Activity', 'sort_order' => 4]);
        $ngo = Industry::create(['name' => 'NGO & Development Sector', 'slug' => 'ngo-ingo', 'description' => 'Project tracking, donor reporting, and field data survey systems.', 'icon' => 'Globe', 'sort_order' => 5]);
        $retail = Industry::create(['name' => 'Enterprise & Retail', 'slug' => 'enterprise-retail', 'description' => 'Supply chain, warehouse management, and multi-branch POS systems.', 'icon' => 'Store', 'sort_order' => 6]);

        // 4. Technology Categories & Technologies
        $catBackend = TechnologyCategory::create(['name' => 'Backend', 'slug' => 'backend']);
        $catFrontend = TechnologyCategory::create(['name' => 'Frontend', 'slug' => 'frontend']);
        $catDatabase = TechnologyCategory::create(['name' => 'Database', 'slug' => 'database']);
        $catCloud = TechnologyCategory::create(['name' => 'Cloud & DevOps', 'slug' => 'cloud-devops']);
        $catMobile = TechnologyCategory::create(['name' => 'Mobile', 'slug' => 'mobile']);

        $techLaravel = Technology::create(['name' => 'Laravel', 'slug' => 'laravel', 'category_id' => $catBackend->id, 'category_name' => 'Backend', 'description' => 'Robust PHP web application framework for enterprise APIs and systems.', 'website_url' => 'https://laravel.com']);
        $techReact = Technology::create(['name' => 'ReactJS', 'slug' => 'react', 'category_id' => $catFrontend->id, 'category_name' => 'Frontend', 'description' => 'Declarative, component-based user interfaces.', 'website_url' => 'https://react.dev']);
        $techMysql = Technology::create(['name' => 'MySQL', 'slug' => 'mysql', 'category_id' => $catDatabase->id, 'category_name' => 'Database', 'description' => 'High-performance ACID compliant relational database.', 'website_url' => 'https://mysql.com']);
        $techTypeScript = Technology::create(['name' => 'TypeScript', 'slug' => 'typescript', 'category_id' => $catFrontend->id, 'category_name' => 'Frontend', 'description' => 'Typed superset of JavaScript.', 'website_url' => 'https://typescriptlang.org']);
        $techPython = Technology::create(['name' => 'Python', 'slug' => 'python', 'category_id' => $catBackend->id, 'category_name' => 'Backend', 'description' => 'Scripting, GIS data processing, and automation.', 'website_url' => 'https://python.org']);
        $techDocker = Technology::create(['name' => 'Docker', 'slug' => 'docker', 'category_id' => $catCloud->id, 'category_name' => 'Cloud & DevOps', 'description' => 'Containerization for consistent deployment across environments.', 'website_url' => 'https://docker.com']);
        $techPostgres = Technology::create(['name' => 'PostgreSQL / PostGIS', 'slug' => 'postgresql', 'category_id' => $catDatabase->id, 'category_name' => 'Database', 'description' => 'Advanced spatial and relational data management.', 'website_url' => 'https://postgresql.org']);

        // 5. Core Services
        Service::create([
            'name' => 'Custom Software Development',
            'slug' => 'custom-software-development',
            'short_description' => 'End-to-end bespoke software engineered specifically to automate operations and drive organizational growth.',
            'full_description' => 'We engineer tailored enterprise solutions that adapt to your exact business workflows. From multi-tiered architecture to secure role-based portals, our software delivers verifiable business ROI.',
            'icon' => 'Code2',
            'features' => ['Custom Business Workflows', 'Role-Based Access Control', 'Multi-Tenant Architecture', 'Scalable Database Schemas'],
            'technologies' => ['Laravel', 'ReactJS', 'MySQL', 'Docker'],
            'seo_title' => 'Custom Software Development Services | Digihub Innovation Center',
            'seo_description' => 'Professional custom software engineering in Nepal by Digihub Innovation Center.',
            'status' => 'active',
            'sort_order' => 1,
        ]);

        Service::create([
            'name' => 'Government Software Solutions',
            'slug' => 'government-software-solutions',
            'short_description' => 'Citizen-centric e-governance systems, GIS land mapping, and municipal service platforms.',
            'full_description' => 'Digihub specializes in developing high-availability systems for local municipalities, ministries, and public agencies. We build transparent citizen service portals with verified data integrity.',
            'icon' => 'Building',
            'features' => ['Citizen Grievance Management', 'Spatial Land & Infrastructure GIS', 'Revenue & Tax Management', 'Offline-First Field Survey Sync'],
            'technologies' => ['Laravel', 'PostGIS', 'ReactJS', 'REST API'],
            'seo_title' => 'Government & e-Governance Software | Digihub Innovation Center',
            'seo_description' => 'Proven e-governance and municipal MIS solutions built for public trust and reliability.',
            'status' => 'active',
            'sort_order' => 2,
        ]);

        Service::create([
            'name' => 'Web Application Development',
            'slug' => 'web-application-development',
            'short_description' => 'High-performance, secure, responsive web platforms and SaaS applications.',
            'full_description' => 'Building fast, accessible web applications powered by modern REST APIs, reactive frontends, and hardened server configurations.',
            'icon' => 'Globe',
            'features' => ['Single Page Applications (SPA)', 'RESTful API Architecture', 'Real-time Dashboards', 'Payment Gateway Integration'],
            'technologies' => ['ReactJS', 'Laravel', 'TypeScript', 'Tailwind CSS'],
            'status' => 'active',
            'sort_order' => 3,
        ]);

        Service::create([
            'name' => 'Mobile Application Development',
            'slug' => 'mobile-application-development',
            'short_description' => 'Cross-platform iOS and Android applications delivering native performance.',
            'full_description' => 'We design and engineer mobile applications that keep your staff connected in the field and engage your customers seamlessly on both Android and iOS.',
            'icon' => 'Smartphone',
            'features' => ['Offline SQLite Storage', 'Push Notifications', 'GPS & Geofencing', 'Biometric Authentication'],
            'technologies' => ['React Native', 'Laravel Sanctum API', 'Firebase Messaging'],
            'status' => 'active',
            'sort_order' => 4,
        ]);

        Service::create([
            'name' => 'Digital Transformation & IT Consulting',
            'slug' => 'digital-transformation-consulting',
            'short_description' => 'Strategic advisory and legacy modernizations to guide organizations into modern digital agility.',
            'full_description' => 'Auditing current IT infrastructure, eliminating manual paper bottlenecks, formulating technology blueprints, and training institutional staff.',
            'icon' => 'Cpu',
            'features' => ['Legacy System Modernization', 'System Architecture Reviews', 'Cybersecurity Auditing', 'IT Staff Capacity Building'],
            'technologies' => ['Cloud Architecture', 'DevOps', 'Data Security'],
            'status' => 'active',
            'sort_order' => 5,
        ]);

        // 6. Solutions
        Solution::create([
            'title' => 'Government Information Systems (GIS & MIS)',
            'slug' => 'government-information-systems',
            'short_description' => 'Integrated geospatial and management information systems for territorial planning and municipal governance.',
            'description' => 'A centralized platform combining spatial GIS layers with administrative workflows for municipal budget tracking, infrastructure asset mapping, and public services.',
            'features' => ['Interactive Map Overlays', 'Citizen Property Indexing', 'Multi-department Workflow Approval', 'Automated Revenue Calculation'],
            'benefits' => ['Eliminates manual paper records', 'Transparent revenue auditing', 'Instant map-based asset queries'],
            'technologies' => ['Laravel', 'PostGIS', 'ReactJS', 'Leaflet / OpenLayers'],
            'status' => 'active',
            'sort_order' => 1,
        ]);

        Solution::create([
            'title' => 'Citizen e-Service Delivery Portal',
            'slug' => 'citizen-service-delivery-portal',
            'short_description' => 'Self-service web and mobile portal allowing citizens to apply for permits, pay fees, and track service requests.',
            'description' => 'Connects citizens directly to municipal desks with real-time SMS notifications, digital certificate verification with QR codes, and online payments.',
            'features' => ['Online Form Submission with Document Upload', 'QR-coded Verification Certificates', 'SMS & Email Status Alerts', 'Administrative Verification Dashboard'],
            'benefits' => ['Reduces office queues by 80%', 'Provides verifiable audit trail', 'Increases citizen satisfaction'],
            'technologies' => ['Laravel Sanctum', 'ReactJS', 'MySQL', 'Tailwind CSS'],
            'status' => 'active',
            'sort_order' => 2,
        ]);

        Solution::create([
            'title' => 'Enterprise Workflow & Project Management',
            'slug' => 'enterprise-workflow-management',
            'short_description' => 'End-to-end task assignment, milestone tracking, budget utilization, and field reporting platform.',
            'description' => 'Designed for institutions and corporations managing multi-site projects with complex approvals, procurement workflows, and executive KPI reporting.',
            'features' => ['Gantt & Kanban Views', 'Document Repository with Versioning', 'Timesheet & Expense Tracking', 'Executive Analytics & Export'],
            'benefits' => ['Real-time project visibility', 'Prevent budget overruns', 'Standardized reporting'],
            'technologies' => ['Laravel 12', 'ReactJS', 'MySQL', 'ChartJS / D3'],
            'status' => 'active',
            'sort_order' => 3,
        ]);

        // 7. Projects
        $proj1 = Project::create([
            'title' => 'Municipal Digital Governance & GIS Portal',
            'slug' => 'municipal-digital-governance-gis',
            'short_description' => 'Comprehensive e-governance MIS and interactive GIS land parcel mapping system serving over 65,000 citizens.',
            'full_description' => 'Digihub engineered a unified digital governance suite integrating cadastral map layers with citizen service workflows. Citizens submit digital applications for business registration, house completion certificates, and property valuation, reducing turnaround time from 14 days to under 48 hours.',
            'client' => 'Regional Municipal Office',
            'industry_id' => $gov->id,
            'project_type' => 'Government GIS & MIS',
            'start_date' => '2024-02-01',
            'completion_date' => '2024-11-15',
            'project_url' => 'https://example.gov.np',
            'challenges' => 'Integrating disparate legacy paper registers, georeferencing scanned boundary maps, and building a responsive interface accessible for rural operators.',
            'solutions' => 'Architected a normalized MySQL schema with spatial indexing, engineered a RESTful Laravel API, and built a lightweight React client with offline caching.',
            'results' => 'Processed over 18,000 digital applications in the first 6 months, increased revenue collection transparency by 35%, and eliminated paper archives.',
            'status' => 'published',
            'featured' => true,
        ]);
        $proj1->technologies()->attach([$techLaravel->id, $techReact->id, $techMysql->id, $techPostgres->id]);

        $proj2 = Project::create([
            'title' => 'Integrated Health Records & Pharmacy ERP',
            'slug' => 'integrated-health-records-erp',
            'short_description' => 'Multi-department hospital management system handling patient triage, outpatient consultations, and batch pharmacy inventory.',
            'full_description' => 'A robust clinic management platform designed for multi-doctor specialty clinics. Featuring barcode patient registration, electronic prescriptions, drug expiry alerts, and automated bill generation.',
            'client' => 'Community Healthcare Network',
            'industry_id' => $health->id,
            'project_type' => 'Healthcare ERP',
            'start_date' => '2024-04-10',
            'completion_date' => '2024-12-20',
            'challenges' => 'Zero downtime requirement during clinical operating hours and strict compliance for prescription record keeping.',
            'solutions' => 'Built high-concurrency Laravel API with Sanctum token management and optimized relational queries to guarantee sub-100ms response times.',
            'results' => 'Served over 40,000 patient appointments with 99.98% uptime and zero medication inventory discrepancies.',
            'status' => 'published',
            'featured' => true,
        ]);
        $proj2->technologies()->attach([$techLaravel->id, $techReact->id, $techMysql->id, $techDocker->id]);

        // 8. Blog Categories, Tags, and Posts
        $catTech = BlogCategory::create(['name' => 'Technology Insights', 'slug' => 'technology-insights', 'description' => 'Architectural patterns, engineering practices, and framework updates.']);
        $catCase = BlogCategory::create(['name' => 'Case Studies', 'slug' => 'case-studies', 'description' => 'Real-world deployment outcomes and digital transformation journeys.']);
        $catGov = BlogCategory::create(['name' => 'GovTech & e-Governance', 'slug' => 'govtech-egovernance', 'description' => 'Modernizing public sector software infrastructure.']);

        $tagApi = BlogTag::create(['name' => 'REST API', 'slug' => 'rest-api']);
        $tagLaravel = BlogTag::create(['name' => 'Laravel', 'slug' => 'laravel']);
        $tagReact = BlogTag::create(['name' => 'React', 'slug' => 'react']);
        $tagSecurity = BlogTag::create(['name' => 'Cybersecurity', 'slug' => 'cybersecurity']);

        $blog1 = Blog::create([
            'title' => 'Architecting Scalable E-Governance Platforms: Lessons from Municipal Deployments',
            'slug' => 'architecting-scalable-e-governance-platforms',
            'excerpt' => 'How decoupled REST APIs and normalized relational schemas solve the dual challenges of public transparency and high concurrency in local governance.',
            'content' => "## Introduction\n\nPublic sector digital transformation requires balancing public accessibility with rigorous data sovereignty and audited security.\n\n### Core Engineering Principles\n\n1. **API-First Decoupling**: Separating backend business validations (Laravel) from client presentation (React) ensures multi-platform reuse across web portals, mobile apps, and kiosk terminals.\n2. **Relational Data Integrity**: Employing MySQL with strict foreign keys and transactional guarantees prevents race conditions during revenue assessments.\n3. **Audit Trails**: Every administrative modification must be logged with actor identifiers and immutable timestamps.\n\n### Conclusion\n\nBy following standardized architectural discipline, government platforms achieve 99.9% reliability without expensive recurring enterprise licensing.",
            'author_id' => $admin->id,
            'category_id' => $catGov->id,
            'content_type' => 'Article',
            'reading_time' => 6,
            'published_at' => now()->subDays(5),
            'status' => 'published',
            'featured' => true,
            'view_count' => 342,
        ]);
        $blog1->tags()->attach([$tagLaravel->id, $tagReact->id, $tagSecurity->id]);

        $blog2 = Blog::create([
            'title' => 'Building Secure Full-Stack Systems with Laravel Sanctum and React',
            'slug' => 'building-secure-full-stack-systems-laravel-react',
            'excerpt' => 'A practical engineering guide to token authorization, role-based policies, and defense against common web application vulnerabilities.',
            'content' => "## Securing the API Boundary\n\nWhen connecting a reactive frontend to a Laravel backend, token management and cross-origin resource sharing (CORS) must be configured with surgical precision.\n\n### Key Security Layers\n\n- **Sanctum Stateful Authentication** for SPA environments.\n- **Strict Form Requests** ensuring server-side validation cannot be bypassed by malicious HTTP payloads.\n- **Rate Limiting** protecting authentication and public inquiry endpoints from automated brute force attacks.\n\nAlways validate server-side and never store unencrypted secrets on the client.",
            'author_id' => $admin->id,
            'category_id' => $catTech->id,
            'content_type' => 'Tutorial',
            'reading_time' => 7,
            'published_at' => now()->subDays(12),
            'status' => 'published',
            'featured' => true,
            'view_count' => 618,
        ]);
        $blog2->tags()->attach([$tagApi->id, $tagLaravel->id, $tagReact->id]);

        // 9. Careers
        Career::create([
            'job_title' => 'Senior Full-Stack Developer (Laravel + React)',
            'slug' => 'senior-full-stack-developer',
            'department' => 'Engineering',
            'location' => 'Kathmandu, Nepal (Hybrid)',
            'employment_type' => 'Full-time',
            'experience' => '3+ years',
            'salary_information' => 'Competitive (Based on Experience)',
            'description' => 'We are seeking an experienced Full-Stack Engineer proficient in Laravel and React to lead the architectural design and implementation of enterprise digital platforms.',
            'responsibilities' => [
                'Architect scalable RESTful APIs with Laravel and Eloquent ORM',
                'Build reactive, accessible frontend components in React and TypeScript',
                'Design optimized MySQL database schemas, migrations, and seeders',
                'Conduct code reviews and mentor junior software engineers',
            ],
            'requirements' => [
                'Demonstrated 3+ years experience with production Laravel & React applications',
                'Deep understanding of REST API design, Sanctum, and relational databases',
                'Experience with Git version control, Docker, and Linux deployment environments',
                'Strong problem-solving and software architecture skills',
            ],
            'skills' => ['Laravel', 'ReactJS', 'MySQL', 'TypeScript', 'Tailwind CSS', 'Git'],
            'benefits' => ['Flexible Hybrid Work Schedule', 'Performance Bonuses', 'Paid Leave & Festivals', 'Continuous Learning Allowance'],
            'deadline' => now()->addDays(30),
            'status' => 'active',
        ]);

        Career::create([
            'job_title' => 'UI/UX & Frontend Designer',
            'slug' => 'ui-ux-frontend-designer',
            'department' => 'Product Design',
            'location' => 'Kathmandu, Nepal',
            'employment_type' => 'Full-time',
            'experience' => '2+ years',
            'salary_information' => 'Competitive',
            'description' => 'Join our product team to design intuitive, accessible user interfaces for enterprise management systems and citizen-facing e-governance portals.',
            'responsibilities' => [
                'Create high-fidelity wireframes, prototypes, and design systems in Figma',
                'Collaborate with developers to translate UI designs into Tailwind CSS components',
                'Conduct usability testing with institutional stakeholders',
            ],
            'requirements' => [
                'Proven portfolio showcasing complex web application and dashboard designs',
                'Proficiency in Figma, HTML5, CSS3, and Tailwind CSS',
                'Strong grasp of WCAG accessibility standards and design hierarchies',
            ],
            'skills' => ['Figma', 'UI/UX Design', 'Tailwind CSS', 'Responsive Layouts'],
            'benefits' => ['Health Insurance', 'Modern Equipment', 'Growth Opportunities'],
            'deadline' => now()->addDays(20),
            'status' => 'active',
        ]);

        // 10. Team Members
        Team::create([
            'name' => 'Er. Kiran Dahal',
            'position' => 'Chief Technology Officer & Lead Architect',
            'biography' => 'Specializing in enterprise systems architecture, e-governance solutions, and scalable cloud applications with over a decade of engineering leadership.',
            'department' => 'Leadership',
            'skills' => ['Systems Architecture', 'Laravel', 'React', 'DevOps', 'Database Design'],
            'display_order' => 1,
            'status' => true,
        ]);

        Team::create([
            'name' => 'Aayush Sharma',
            'position' => 'Senior Backend Engineer',
            'biography' => 'Expert in database normalization, REST API development, and distributed backend services.',
            'department' => 'Engineering',
            'skills' => ['PHP', 'Laravel', 'MySQL', 'API Security'],
            'display_order' => 2,
            'status' => true,
        ]);

        Team::create([
            'name' => 'Pooja Shrestha',
            'position' => 'Lead Frontend & UI/UX Developer',
            'biography' => 'Passionate about crafting pixel-perfect, accessible, and high-performance user interfaces in React.',
            'department' => 'Design & Frontend',
            'skills' => ['React', 'TypeScript', 'Tailwind CSS', 'Accessibility'],
            'display_order' => 3,
            'status' => true,
        ]);

        // 11. Testimonials
        Testimonial::create([
            'client_name' => 'Municipal Executive Officer',
            'position' => 'Chief Administrative Officer',
            'organization' => 'Local Government Municipality',
            'testimonial' => 'Digihub Innovation Center delivered our citizen service portal ahead of schedule. The transition from physical paper files to a digital tracking workflow has transformed our municipal operations and citizen trust.',
            'rating' => 5,
            'featured' => true,
            'status' => true,
        ]);

        Testimonial::create([
            'client_name' => 'Medical Director',
            'position' => 'Director of Healthcare Operations',
            'organization' => 'Regional Health Foundation',
            'testimonial' => 'Their disciplined approach to relational database architecture and clean API boundaries gave us an ERP that is exceptionally fast, secure, and easy for our clinical staff to use.',
            'rating' => 5,
            'featured' => true,
            'status' => true,
        ]);

        // 12. Popups
        Popup::create([
            'title' => 'Transform Your Business with Custom Enterprise Software',
            'description' => 'Schedule a free 30-minute technical consultation with our software architects to review your digital transformation roadmap.',
            'button_text' => 'Request Technical Consultation',
            'button_url' => '/request-quote',
            'type' => 'Contact CTA',
            'status' => true,
            'priority' => 1,
            'target_pages' => 'all',
            'device_targeting' => 'all',
            'frequency' => 'once_session',
            'delay_seconds' => 6,
            'scroll_percentage' => 25,
            'impressions_count' => 142,
            'clicks_count' => 18,
        ]);

        // 13. Settings
        Setting::set('site_name', 'DIGIHUB INNOVATION CENTER PVT. LTD.', 'general');
        Setting::set('tagline', 'Building Digital Solutions for a Smarter Future', 'general');
        Setting::set('company_description', 'Digihub Innovation Center is a premier software development and digital transformation company specializing in enterprise applications, e-governance systems, and API-first architectures.', 'general');
        Setting::set('contact_email', 'info@digihub.com.np', 'contact');
        Setting::set('contact_phone', '+977-1-4567890', 'contact');
        Setting::set('contact_address', 'Putalisadak, Kathmandu, Bagmati Province, Nepal', 'contact');
        Setting::set('business_hours', 'Sunday - Friday: 9:00 AM - 6:00 PM NPT', 'contact');
        Setting::set('social_facebook', 'https://facebook.com/digihubnepal', 'social');
        Setting::set('social_linkedin', 'https://linkedin.com/company/digihub-innovation-center', 'social');
        Setting::set('social_github', 'https://github.com/digihub-innovation', 'social');
        Setting::set('social_twitter', 'https://twitter.com/digihub_np', 'social');
        Setting::set('default_seo_title', 'Digihub Innovation Center | Software Development & Digital Solutions', 'seo');
        Setting::set('default_seo_description', 'Digihub Innovation Center Pvt. Ltd. provides enterprise software development, e-governance systems, and web/mobile engineering in Nepal.', 'seo');
        Setting::set('footer_copyright', '© 2026 Digihub Innovation Center Pvt. Ltd. All rights reserved.', 'footer');

        // 14. Sample Inquiry & Lead
        ContactInquiry::create([
            'name' => 'Suman Adhikari',
            'email' => 'suman@example.org',
            'phone' => '+977-9841234567',
            'company' => 'Apex Educational Trust',
            'subject' => 'Inquiry for Integrated Campus Management Portal',
            'message' => 'We are looking to implement a unified student and academic management portal for our 3 campuses. We would like to schedule a demonstration.',
            'service_interested_in' => 'Custom Software Development',
            'budget_range' => '$5,000 - $15,000',
            'status' => 'New',
            'is_read' => false,
        ]);

        Lead::create([
            'name' => 'Pradeep Karki',
            'company' => 'Himalayan Logistics Ltd.',
            'email' => 'p.karki@himalayanlogistics.com',
            'phone' => '+977-9851098765',
            'project_title' => 'Warehouse Inventory & Multi-Branch Dispatch MIS',
            'project_description' => 'Real-time stock movement tracking across 5 distribution centers with barcode scanner integration and mobile driver app.',
            'required_services' => ['Custom Software Development', 'Mobile Application Development', 'API Development'],
            'estimated_budget' => '$10,000 - $25,000',
            'timeline' => '3 - 6 Months',
            'status' => 'In Progress',
            'priority' => 'High',
            'assigned_to' => $admin->id,
            'follow_up_date' => now()->addDays(3),
            'notes' => 'Preliminary technical scope document shared. Next meeting scheduled for Friday.',
        ]);
    }
}
