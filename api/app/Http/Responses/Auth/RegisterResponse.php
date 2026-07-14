<?php

namespace App\Http\Responses\Auth;

use App\Models\User;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\JsonResponse;

class RegisterResponse implements Responsable
{
    public function __construct(private readonly User $user) {}

    public function toResponse($request): JsonResponse
    {
        return response()->json([
            'message' => trans('auth.registered'),
            'user' => $this->user,
        ], 201);
    }
}
