<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        if ($request->email === "student@gmail.com" && $request->password === "1234") {
            return response()->json([
                "message" => "Login successful"
            ]);
        }

        return response()->json([
            "message" => "Invalid credentials"
        ], 401);
    }
}