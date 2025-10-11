<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequestLogin extends FormRequest
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
            'username' => ['required_without:email', 'string', 'alpha_num', 'min:5', 'max:20'],
            'email' => ['required_without:username', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8']
        ];
    }
}
