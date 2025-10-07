<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequestPost;
use App\Models\User;

class UserController extends Controller
{
    public function store(UserRequestPost $request) {
        $validated = $request->validated();
        $task = User::create($validated);
        return response()->json($task);
    }
}
