<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Route;
use RuntimeException;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_root_and_health_endpoints_return_json(): void
    {
        $this->get('/')
            ->assertOk()
            ->assertExactJson(['status' => 'ok']);

        $this->get('/up')
            ->assertOk()
            ->assertExactJson(['status' => 'ok']);
    }

    public function test_production_server_errors_are_sanitized_json(): void
    {
        $this->app['env'] = 'production';
        config(['app.debug' => true]);

        Route::get('/test/internal-error', function (): never {
            throw new RuntimeException('Secret exception details');
        });

        $this->get('/test/internal-error', ['Accept-Language' => 'pl'])
            ->assertStatus(500)
            ->assertExactJson([
                'status' => 500,
                'message' => 'Wewnętrzny błąd serwera. Spróbuj ponownie później.',
            ])
            ->assertDontSee('Secret exception details');
    }
}
