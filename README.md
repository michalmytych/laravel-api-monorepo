# Simple Laravel Sanctum API + React Starter monorepo

Kept simple.

### Setup

__Clone with your preferred directory name__

This prevent's repeating `laravel-api-monorepo` project name by docker-compose.

```bash
git clone git@github.com:michalmytych/laravel-api-monorepo.git ./my-app
```

__Build__

```bash
cp api/.env.example api/.env
docker compose up --build -d
docker compose exec api php artisan key:generate
docker compose exec api php artisan migrate
```

## Features

### Tech stack
* Docker Compose with FrankenPHP, MySQL and a Node/Vite client.
* Sanctum Auth with basic Controllers/Api/Auth/AuthController which handles registration, login, logout and user fetch.
* Monorepo structure withour blocking optional separation if preferred.

### Approach

__API__
* JSON only responses from api in production.
* Messages localized on backend, configured by `Accept-Lang` header value.
* Utilizing laravel-way form requests & abstracted responses classes.
* English & polish trans strings included.
* PHPUnit for tests but pest is compatible as usual.
* MySQL database.

__Client__
* Axios client for simplicity.
* No styling, just system font.
* Locale select.
* Using context api as a state manager for simplicity.

### Endpoints
```bash
  GET|HEAD   sanctum/csrf-cookie ... sanctum.csrf-cookie › Laravel\Sanctum › CsrfCookieController@show
  POST       api/auth/login ........ Api\Auth\AuthController@login
  POST       api/auth/logout ....... Api\Auth\AuthController@logout
  POST       api/auth/register ..... Api\Auth\AuthController@register  
  GET|HEAD   api/auth/user .........  
  GET|HEAD   storage/{path} ........ storage.local
  GET|HEAD   up ....................
```

API: http://localhost:8000/  
Client: http://localhost:5173/
