FROM dunglas/frankenphp:1-php8.4-bookworm

RUN install-php-extensions pdo_mysql zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-interaction --prefer-dist --no-scripts

COPY . .
RUN composer dump-autoload --optimize \
    && chown -R www-data:www-data storage bootstrap/cache

COPY docker/frankenphp/Caddyfile /etc/frankenphp/Caddyfile
