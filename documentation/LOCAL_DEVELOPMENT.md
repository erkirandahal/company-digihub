# LOCAL DEVELOPMENT GUIDE — DIGIHUB INNOVATION CENTER

This guide explains how to run the project locally after downloading or cloning from GitHub into VS Code.

## Prerequisites
- PHP 8.3 or higher with extensions: `pdo_mysql`, `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `json`, `bcmath`, `curl`.
- Composer 2.x
- Node.js 20+ and npm
- MySQL 8.0+

## 1. Backend Setup (Laravel 12)
```bash
# Navigate to backend directory
cd backend

# Install PHP dependencies
composer install

# Create environment configuration
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure MySQL credentials in .env:
# DB_DATABASE=digihub_db
# DB_USERNAME=root
# DB_PASSWORD=your_password

# Run migrations and development seeders
php artisan migrate:fresh --seed

# Create storage symbolic link
php artisan storage:link

# Start Laravel development server on port 8000
php artisan serve --port=8000
```
Laravel API will be active at: `http://127.0.0.1:8000`

Default seeded administrative account:
- Email: `admin@digihub.com.np`
- Password: `password123`

## 2. Frontend Setup (React + Vite)
```bash
# In the root directory (or frontend directory):
npm install

# Ensure your .env has:
# VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1

# Start Vite development server
npm run dev
```
Frontend will be accessible at: `http://localhost:3000` (or `http://localhost:5173`).
The centralized Axios client (`src/services/api.ts`) will forward all requests to `http://127.0.0.1:8000/api/v1`.
