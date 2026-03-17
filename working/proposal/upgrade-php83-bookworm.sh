#!/usr/bin/env bash
set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run this script with sudo: sudo bash $0"
  exit 1
fi

echo "==> Adding Sury PHP repository for Debian bookworm"
apt-get update
apt-get install -y lsb-release ca-certificates curl
curl -sSLo /tmp/debsuryorg-archive-keyring.deb https://packages.sury.org/debsuryorg-archive-keyring.deb
dpkg -i /tmp/debsuryorg-archive-keyring.deb
echo "deb [signed-by=/usr/share/keyrings/debsuryorg-archive-keyring.gpg] https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list

echo "==> Installing PHP 8.3 and common Drupal modules"
apt-get update
apt-get install -y \
  php8.3 \
  libapache2-mod-php8.3 \
  php8.3-cli \
  php8.3-common \
  php8.3-curl \
  php8.3-gd \
  php8.3-mbstring \
  php8.3-mysql \
  php8.3-opcache \
  php8.3-readline \
  php8.3-xml \
  php8.3-zip \
  composer

echo "==> Switching Apache from PHP 8.2 to PHP 8.3"
a2dismod php8.2 || true
a2enmod php8.3 rewrite headers ssl
systemctl restart apache2

echo "==> Verifying versions"
php -v | head -n 3
apache2ctl -M | grep php || true

echo "==> Verifying Drupal parse error is gone"
php -r 'require "/var/www/html/vendor/drupal/DrupalInstalled.php"; echo "DrupalInstalled OK\n";'

echo "==> Current Drupal runtime requirement"
grep '"php"' /var/www/html/core/composer.json | head -n 1

echo "Upgrade complete. Next step: reload the Drupal installer in the browser."