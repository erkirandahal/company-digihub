# CPANEL PRODUCTION DEPLOYMENT GUIDE — DIGIHUB INNOVATION CENTER

This guide provides step-by-step instructions for deploying the **Digihub Innovation Center Pvt. Ltd.** application to standard cPanel shared or VPS hosting without requiring Docker.

---

## 1. Server & PHP Version Configuration
1. Log into your cPanel dashboard.
2. Navigate to **Select PHP Version** (MultiPHP Manager).
3. Set your domain to **PHP 8.3** or higher.
4. Ensure the following PHP extensions are enabled:
   - `pdo_mysql`, `fileinfo`, `mbstring`, `openssl`, `tokenizer`, `xml`, `bcmath`, `curl`, `zip`.

---

## 2. MySQL Database Setup
1. In cPanel, click **MySQL® Databases**.
2. Create a new database: e.g., `cpaneluser_digihub`.
3. Create a database user: e.g., `cpaneluser_dbuser` with a strong password.
4. Assign the user to the database and grant **ALL PRIVILEGES**.

---

## 3. Preparing the React Frontend Build
On your local machine:
1. Update `.env.production` in your React project:
   ```env
   VITE_API_BASE_URL=https://digihubic.com.np/api/v1
   ```
2. Run the production build:
   ```bash
   npm run build
   ```
3. This creates static files in the `dist/` folder ready for serving.

---

## 4. Deploying Laravel to cPanel
In cPanel, standard practice isolates the Laravel application files above `public_html`:

1. In cPanel **File Manager**, create a folder named `digihub/backend` directly in your home root (e.g., `$HOME/digihub/backend`).
2. Upload the contents of your `backend/` folder (excluding `vendor/` and `.git/`) into `$HOME/digihub/backend`.
3. Via cPanel Terminal (or SSH):
   ```bash
   cd $HOME/digihub/backend
   composer install --no-dev --optimize-autoloader
   cp .env.example .env
   php artisan key:generate
   ```
4. Edit `$HOME/digihub/backend/.env` with your production settings:
   ```env
   APP_NAME="Digihub Innovation Center Pvt. Ltd."
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://digihubic.com.np

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=cpaneluser_digihub
   DB_USERNAME=cpaneluser_dbuser
   DB_PASSWORD=YourStrongDatabasePassword

   FILESYSTEM_DISK=public
   SANCTUM_STATEFUL_DOMAINS=digihubic.com.np
   FRONTEND_URL=https://digihubic.com.np
   ```
5. Run migrations:
   ```bash
   php artisan migrate --force
   php artisan db:seed --force
   php artisan storage:link
   php artisan config:cache
   php artisan route:cache
   ```

---

## 5. Public Directory Setup (`public_html`)
1. Move the contents of `backend/public/` (or copy `index.php`, `.htaccess`) to a folder or subpath:
   If your API is served at `https://digihubic.com.np/api/`:
   Route API requests in `public_html/.htaccess` to `$HOME/digihub/backend/public/index.php`.
2. Place the React `dist/` build files directly into `public_html/`.
3. Add the following SPA fallback in `public_html/.htaccess`:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /

     # Pass API calls to Laravel index.php
     RewriteCond %{REQUEST_URI} ^/api/ [NC]
     RewriteRule ^api/(.*)$ /api_proxy.php [L]

     # Direct static files
     RewriteCond %{REQUEST_FILENAME} -f [OR]
     RewriteCond %{REQUEST_FILENAME} -d
     RewriteRule ^ - [L]

     # Route everything else to React index.html
     RewriteRule ^ index.html [L]
   </IfModule>
   ```

---

## 6. Cron Job Setup (Laravel Scheduler)
In cPanel **Cron Jobs**, add a job to run every minute:
```bash
* * * * * cd $HOME/digihub/backend && php artisan schedule:run >> /dev/null 2>&1
```

---

## 7. SSL & HTTPS
In cPanel, click **SSL/TLS Status** and run **AutoSSL** to guarantee valid HTTPS certificates on all domains.
