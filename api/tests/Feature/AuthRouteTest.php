<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\App;
use Tests\TestCase;

class AuthRouteTest extends TestCase
{
    public function test_user_route_is_protected_under_auth_prefix(): void
    {
        $this->getJson('/api/auth/user')->assertUnauthorized();
        $this->getJson('/api/user')->assertNotFound();
    }

    public function test_auth_messages_are_available_in_english_and_polish(): void
    {
        App::setLocale('en');
        $this->assertSame('These credentials do not match our records.', trans('auth.failed'));

        App::setLocale('pl');
        $this->assertSame('Podane dane logowania są nieprawidłowe.', trans('auth.failed'));
    }
}
