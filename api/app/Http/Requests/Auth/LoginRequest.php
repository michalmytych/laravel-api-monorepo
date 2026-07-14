<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => trans('auth.validation.email.required'),
            'email.email' => trans('auth.validation.email.email'),
            'password.required' => trans('auth.validation.password.required'),
            'password.string' => trans('auth.validation.password.string'),
        ];
    }
}
