<?php

namespace App\Http\Responses\Auth;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\JsonResponse;

class LogoutResponse implements Responsable
{
    public function toResponse($request): JsonResponse
    {
        return response()->json([
            'message' => trans('auth.logged_out'),
        ]);
    }
}
