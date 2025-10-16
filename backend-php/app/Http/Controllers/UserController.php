<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequestLogin;
use App\Http\Requests\UserRequestSignUp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserController extends Controller
{
    public function signup(UserRequestSignUp $request) {
        $validated = $request->validated();
        $task = User::create($validated);
        return response()->json($task);
    }

    public function login(UserRequestLogin $request) {
        $validated = $request->validated();

        if($validated->email) {
            $user = User::where('email', $validated->email)->first();
        } else {
            $user = User::where('email', $validated->username)->first();
        }

        if (!$user || !password_verify($validated->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
}

}
