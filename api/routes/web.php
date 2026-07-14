<?php

use Illuminate\Foundation\Events\DiagnosingHealth;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'status' => 'ok',
    ]);
});

Route::get('/up', function () {
    try {
        Event::dispatch(new DiagnosingHealth);
    } catch (Throwable $exception) {
        report($exception);

        return response()->json([
            'status' => 503,
            'message' => trans('errors.internal_server_error'),
        ], 503);
    }

    return response()->json([
        'status' => 'ok',
    ]);
});
