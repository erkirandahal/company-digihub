# DIGIHUB INNOVATION CENTER PVT. LTD. — SYSTEM ARCHITECTURE

## 1. High-Level Architecture

The platform is designed as an API-First, decoupled enterprise system:

```
┌─────────────────────────────────────────────────────────────┐
│                 REACT FRONTEND (Vite SPA)                   │
│   • Tailwind CSS Design System • Axios Centralized Client    │
│   • Client-side Route Guard • Role-based Access Control     │
└──────────────────────────────┬──────────────────────────────┘
                               │
                      HTTPS REST API (/api/v1/)
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                 LARAVEL 12+ BACKEND (PHP 8.3)               │
│   • Laravel Sanctum Authentication                          │
│   • Form Requests & Server Validation                       │
│   • Eloquent ORM & Relational Models                        │
│   • Immutable Audit Logging System                          │
└──────────────────────────────┬──────────────────────────────┘
                               │
                       TCP / Socket 3306
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                    MYSQL 8+ DATABASE                        │
│   • Strict Foreign Key Constraints & Cascades               │
│   • Multi-column B-Tree Indexes                             │
│   • UTF8MB4 Collation                                       │
└─────────────────────────────────────────────────────────────┘
```

## 2. Security Design
- **Sanctum Stateful & Bearer Tokens**: All administrative requests require a verified Sanctum token transmitted via `Authorization: Bearer <token>`.
- **Server-Side Validation**: All incoming payloads are verified using Laravel Form Requests. Frontend validation is strictly treated as UX assistance.
- **Audit Logging**: Sensitive mutations (service creation, settings changes, user permission changes, job status shifts) trigger immutable records in the `audit_logs` table.
- **CSRF & CORS**: Handled via Laravel's CORS middleware, restricting origins to verified domains.

## 3. Storage Abstraction
- File uploads (resumes, media assets, project images) use Laravel's `Storage` disk abstraction.
- Private files such as CVs are stored in protected disks accessible only via authorized administrative streaming endpoints.
