<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Responses\Auth\LoginResponse;
use App\Http\Responses\Auth\LogoutResponse;
use App\Http\Responses\Auth\RegisterResponse;
use App\Http\Responses\Auth\UserResponse;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Attributes\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): RegisterResponse
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        return new RegisterResponse($user);
    }

    public function login(LoginRequest $request): LoginResponse
    {
        $credentials = $request->validated();

        if (! Auth::attempt($credentials, true)) {
            throw ValidationException::withMessages([
                'email' => [trans('auth.failed')],
            ]);
        }

        $request->session()->regenerate();

        /** @var User $user */
        $user = $request->user();

        return new LoginResponse($user);
    }

    public function logout(Request $request): LogoutResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return new LogoutResponse;
    }

    #[Middleware('auth:sanctum')]
    public function user(Request $request): UserResponse
    {
        /** @var User $user */
        $user = $request->user();

        return new UserResponse($user);
    }
}
