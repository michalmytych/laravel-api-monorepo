<?php

namespace Tests\Feature;

use Tests\TestCase;

class AuthRouteTest extends TestCase
{
    public function test_user_route_is_protected_under_auth_prefix(): void
    {
        $this->getJson('/api/auth/user')->assertUnauthorized();
        $this->getJson('/api/user')->assertNotFound();
    }

    public function test_accept_language_selects_polish_validation_messages(): void
    {
        $this->postJson('/api/auth/login', [], ['Accept-Language' => 'pl-PL,pl;q=0.9,en;q=0.8'])
            ->assertUnprocessable()
            ->assertJsonPath('errors.email.0', 'Pole adres e-mail jest wymagane.')
            ->assertJsonPath('errors.password.0', 'Pole hasło jest wymagane.');
    }

    public function test_accept_language_falls_back_to_english_validation_messages(): void
    {
        $this->postJson('/api/auth/login', [], ['Accept-Language' => 'de-DE,de;q=0.9'])
            ->assertUnprocessable()
            ->assertJsonPath('errors.email.0', 'The email field is required.')
            ->assertJsonPath('errors.password.0', 'The password field is required.');
    }
}
