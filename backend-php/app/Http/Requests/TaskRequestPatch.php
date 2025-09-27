<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequestPatch extends FormRequest
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
            'title' => ['sometimes', 'required', 'string', 'regex:/^[A-Za-z0-9]{1,20}( [A-Za-z0-9]{1,20}){0,2}$/'],
            'completed' => ['sometimes', 'boolean']
        ];
    }

    public function message(): array 
    {
        return [
            'title.required' => 'Please provide a task title.',
            'title.regex' => 'The title may only contain letters, numbers, spaces and has max of 3 words each has a min of 1 and max of 20 characters',
        ];
    }
}
