<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
#use Illuminate\Validation\Rules\Password;

class UserRequestPost extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'username' => ['required', 'string', 'alpha_num', 'min:5', 'max:20'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'], //Password::min(8)->mixedCase()->numbers()->symbols()
        ];
    }

    public function message(): array 
    {
        return [
            'username.required' => 'Please provide an username.',
            'username.alpha_num' => 'Username may only contain letters and numbers',
            'username.min' => 'Username must have a minimum of 5 characters',
            'username.max' => 'Username must have a maximum of 20 characters',
            'email.required' => 'Please provide an email.',
            'email.email' => 'Not a real email',
            'email.max' => 'Email has maximum of 255 characters',
            'email.unique' => 'Email already exist. Please use another email',
            'password.required' => "Please provide a password",
            'password.minimum' => "Password has minimum of 8 characters",
        ];
    }
}
