<?php

use App\Http\Middleware\SetLocaleFromAcceptLanguage;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Http\Request;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\Facades\App;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->prepend(SetLocaleFromAcceptLanguage::class);

        $middleware
            ->api([
                EnsureFrontendRequestsAreStateful::class,
                SubstituteBindings::class,
            ])
            ->appendToGroup('web', [
                EncryptCookies::class,
                StartSession::class,
                ShareErrorsFromSession::class,
                PreventRequestForgery::class,
            ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request, Throwable $exception): bool => App::environment('production')
                || $request->is('api/*')
                || $request->expectsJson(),
        );

        $exceptions->render(function (Throwable $exception, Request $request) {
            if (! App::environment('production')) {
                return null;
            }

            $status = $exception instanceof HttpExceptionInterface
                ? $exception->getStatusCode()
                : 500;

            if ($status < 500) {
                return null;
            }

            return response()->json([
                'status' => $status,
                'message' => trans('errors.internal_server_error'),
            ], $status);
        });
    })->create();
