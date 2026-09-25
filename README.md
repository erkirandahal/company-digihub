# DIGIHUB INNOVATION CENTER PVT. LTD.

> **Enterprise Software Development, E-Governance & Digital Transformation Platform**

A production-ready web application and business management CMS/CRM platform built with **Laravel 12 (REST API, Sanctum, Eloquent)** and **React 19 (Vite, Tailwind CSS, TanStack/Lucide)**.

---

## Architecture Overview

```
ReactJS (SPA + Vite) ──▶ REST API (/api/v1/) ──▶ Laravel 12+ (PHP 8.3) ──▶ MySQL 8+
```

- **Backend**: Laravel 12, PHP 8.3+, MySQL 8+, Sanctum Token Auth, Form Requests, Eloquent Relationships, Policies, Storage Abstraction, Audit Logging.
- **Frontend**: React 19, Vite, Tailwind CSS, Lucide React, Centralized Axios Client (`src/services/api.ts`).
- **CMS & CRM**: Complete dynamic management of Services, Solutions, Portfolio Projects, Blog Articles & Case Studies, Careers & Job Applications, Inquiries Inbox, Lead Pipeline CRM, Dynamic Popups, Media Assets, Settings, and Audit Trail.

---

## Directory Structure

```
├── backend/                  # Full Laravel 12 REST API Application
│   ├── app/
│   │   ├── Http/Controllers/Api/V1/   # Auth, Service, Project, Blog, CRM, Popup controllers
│   │   ├── Models/                     # Eloquent models with typed relationships
│   │   └── Policies/
│   ├── bootstrap/app.php              # Laravel 12 API routing & exception handler
│   ├── database/
│   │   ├── migrations/                # Normalized relational migrations
│   │   └── seeders/DatabaseSeeder.php # Production development seed data
│   ├── routes/
│   │   └── api.php                    # Versioned REST endpoints (/api/v1/)
│   ├── composer.json
│   └── .env.example
├── documentation/            # Comprehensive guides
│   ├── ARCHITECTURE.md
│   ├── LOCAL_DEVELOPMENT.md
│   └── CPANEL_DEPLOYMENT_GUIDE.md
├── src/                      # React 19 Frontend Application
│   ├── components/           # Public & Admin reusable UI components
│   ├── pages/                # Public pages & Admin CMS views
│   ├── services/api.ts       # Centralized Axios client & resilient API provider
│   ├── types/index.ts        # TypeScript data contracts matching Laravel schema
│   ├── App.tsx
│   └── main.tsx
├── .env.example
└── package.json
```

---

## Quick Start (Local Development)

### 1. Backend (Laravel 12)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
# Set DB credentials in .env
php artisan migrate:fresh --seed
php artisan storage:link
php artisan serve --port=8000
```

Seeded Administrative Credentials:
- **Email**: `admin@digihubic.com.np`
- **Password**: `password123`

### 2. Frontend (React)
```bash
npm install
npm run dev
```
Open `http://localhost:3000` (or `http://localhost:5173`).

For full cPanel deployment instructions, refer to `documentation/CPANEL_DEPLOYMENT_GUIDE.md`.
