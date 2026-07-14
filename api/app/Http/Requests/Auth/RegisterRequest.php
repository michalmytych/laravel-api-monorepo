<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'password_confirmation' => ['required', 'same:password'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => trans('auth.validation.name.required'),
            'name.string' => trans('auth.validation.name.string'),
            'name.max' => trans('auth.validation.name.max'),
            'email.required' => trans('auth.validation.email.required'),
            'email.string' => trans('auth.validation.email.string'),
            'email.email' => trans('auth.validation.email.email'),
            'email.max' => trans('auth.validation.email.max'),
            'email.unique' => trans('auth.validation.email.unique'),
            'password.required' => trans('auth.validation.password.required'),
            'password.string' => trans('auth.validation.password.string'),
            'password.min' => trans('auth.validation.password.min'),
            'password_confirmation.required' => trans('auth.validation.password_confirmation.required'),
            'password_confirmation.same' => trans('auth.validation.password_confirmation.same'),
        ];
    }
}
