#!/bin/bash
# Runs on the cPanel server every time you click "Deploy HEAD Commit"
# (or when the GitHub Action triggers a deploy). See .cpanel.yml.
set -e

APP="$HOME/pragyainnovative/backend"
cd "$APP"

# Pick PHP 8.3 (or 8.2) CLI - the plain "php" on many cPanel servers is an older version.
PHP=""
for p in /opt/cpanel/ea-php83/root/usr/bin/php /opt/cpanel/ea-php84/root/usr/bin/php /opt/cpanel/ea-php82/root/usr/bin/php /usr/local/bin/php; do
  if [ -x "$p" ]; then PHP="$p"; break; fi
done
echo "Using PHP: $PHP ($($PHP -r 'echo PHP_VERSION;'))"

# Composer: use the server's copy if there is one, else download a local copy once.
# (-d allow_url_fopen=1: this host turns it off for command-line PHP, Composer needs it)
PHPX="$PHP -d allow_url_fopen=1 -d memory_limit=-1"
COMPOSER=""
for c in /opt/cpanel/composer/bin/composer /usr/local/bin/composer "$HOME/composer.phar"; do
  if [ -f "$c" ]; then COMPOSER="$c"; break; fi
done
if [ -z "$COMPOSER" ]; then
  echo "Downloading composer..."
  curl -sS -o "$HOME/composer-setup.php" https://getcomposer.org/installer
  $PHPX "$HOME/composer-setup.php" --install-dir="$HOME" --filename=composer.phar
  rm -f "$HOME/composer-setup.php"
  COMPOSER="$HOME/composer.phar"
fi
echo "Using composer: $COMPOSER"

# Folders Laravel needs (not stored in git)
mkdir -p storage/framework/{cache/data,sessions,views} storage/logs storage/app/public bootstrap/cache

echo "Installing PHP packages..."
$PHPX "$COMPOSER" install --no-dev --optimize-autoloader --no-interaction --no-progress

# First deploy: create .env and stop so you can fill it in
if [ ! -f .env ]; then
  cp .env.example .env
  $PHP artisan key:generate --force
  echo "=================================================================="
  echo " .env created. Edit pragyainnovative/backend/.env in File Manager"
  echo " (database, APP_URL, APP_ENV=production ...) then deploy again."
  echo "=================================================================="
  exit 0
fi
if grep -q '^APP_ENV=local' .env; then
  echo "=================================================================="
  echo " .env still has APP_ENV=local. Edit pragyainnovative/backend/.env first,"
  echo " then deploy again. Nothing else was changed."
  echo "=================================================================="
  exit 0
fi

echo "Running database migrations..."
$PHP artisan migrate --force

# Seed demo data + admin account only once (first successful deploy)
if [ ! -f storage/app/.seeded ]; then
  echo "First deploy: seeding database..."
  $PHP artisan db:seed --force
  touch storage/app/.seeded
fi

# public/storage -> storage/app/public
if [ ! -L public/storage ]; then
  rm -rf public/storage
  $PHP artisan storage:link
fi

chmod -R 775 storage bootstrap/cache

$PHP artisan optimize:clear
$PHP artisan config:cache
$PHP artisan route:cache
$PHP artisan view:cache

echo "Deploy finished OK."
