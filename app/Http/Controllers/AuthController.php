<?php

namespace App\Http\Controllers;

use App\Models\User;
// use GuzzleHttp\Psr7\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $fields = $request->validate([
            'name' => 'required|string|max:255|min:3|unique:users,name',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:3|confirmed',
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login(Request $request): JsonResponse
    {
        $field = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $field['email'])->first();

        if (!$user || !Hash::check($field['password'], $user->password)) {
            return response()->json([
                'message' => 'INVALID CREDENTIALS'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 200);
    }

    public function logout(Request $request): Response
    {
        $request->user()->currentAccessToken()->delete();
        return response()->noContent();
    }
}
