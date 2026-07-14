<?php

return [
    'failed' => 'These credentials do not match our records.',
    'password' => 'The provided password is incorrect.',
    'throttle' => 'Too many login attempts. Please try again in :seconds seconds.',
    'registered' => 'User registered successfully.',
    'logged_in' => 'Logged in successfully.',
    'logged_out' => 'Logged out successfully.',
    'validation' => [
        'name' => [
            'required' => 'The name field is required.',
            'string' => 'The name must be a string.',
            'max' => 'The name may not be greater than 255 characters.',
        ],
        'email' => [
            'required' => 'The email field is required.',
            'string' => 'The email must be a string.',
            'email' => 'The email must be a valid email address.',
            'max' => 'The email may not be greater than 255 characters.',
            'unique' => 'An account with this email already exists.',
        ],
        'password' => [
            'required' => 'The password field is required.',
            'string' => 'The password must be a string.',
            'min' => 'The password must be at least 8 characters.',
        ],
        'password_confirmation' => [
            'required' => 'The password confirmation field is required.',
            'same' => 'The password confirmation must match the password.',
        ],
    ],
];
