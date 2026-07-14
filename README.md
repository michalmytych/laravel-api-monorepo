# Simple Laravel Sanctum API Starter prepared for SPA Applications.

Kept simple.

## Features

* Docker Compose with FrankenPHP, MySQL and a Node/Vite client
* Sanctum Auth with basic Controllers/Api/Auth/AuthController which handles registration, login and logout

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

### Setup

```bash
cp api/.env.example api/.env
docker compose up --build -d
docker compose exec api php artisan key:generate
docker compose exec api php artisan migrate
```

API: http://localhost:8000/  
Client: http://localhost:5173/
