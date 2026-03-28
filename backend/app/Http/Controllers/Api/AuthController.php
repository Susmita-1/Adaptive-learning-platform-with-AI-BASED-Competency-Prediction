<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            // Log the incoming request
            Log::info('Registration attempt', [
                'name' => $request->name,
                'email' => $request->email
            ]);
            
            // Validate the request
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6',
            ]);

            if ($validator->fails()) {
                Log::warning('Validation failed', ['errors' => $validator->errors()]);
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors(),
                    'message' => 'Validation failed'
                ], 422);
            }

            // Check if user already exists
            $existingUser = User::where('email', $request->email)->first();
            if ($existingUser) {
                Log::warning('User already exists', ['email' => $request->email]);
                return response()->json([
                    'success' => false,
                    'message' => 'Email already registered'
                ], 422);
            }

            // Create the user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'student',
                'total_quizzes_taken' => 0,
                'average_score' => 0,
                'highest_score' => 0,
                'current_level' => 'Beginner'
            ]);

            Log::info('Registration successful', [
                'email' => $user->email, 
                'id' => $user->id,
                'name' => $user->name
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Registration successful! Please login.',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email
                ]
            ], 201);

        } catch (\Illuminate\Database\QueryException $e) {
            Log::error('Database error during registration: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Database error: ' . $e->getMessage()
            ], 500);
        } catch (\Exception $e) {
            Log::error('Registration error: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json([
                'success' => false,
                'message' => 'Registration failed: ' . $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            Log::info('Login attempt', ['email' => $request->email]);
            
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors()
                ], 422);
            }

            $user = User::where('email', $request->email)->first();

            if (!$user) {
                Log::warning('User not found', ['email' => $request->email]);
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid email or password'
                ], 401);
            }

            if (!Hash::check($request->password, $user->password)) {
                Log::warning('Invalid password', ['email' => $request->email]);
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid email or password'
                ], 401);
            }

            Log::info('Login successful', ['email' => $user->email, 'id' => $user->id]);

            return response()->json([
                'success' => true,
                'message' => 'Login successful!',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role ?? 'student',
                    'total_quizzes_taken' => $user->total_quizzes_taken ?? 0,
                    'average_score' => $user->average_score ?? 0,
                    'highest_score' => $user->highest_score ?? 0,
                    'current_level' => $user->current_level ?? 'Beginner'
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Login error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Login failed. Please try again.'
            ], 500);
        }
    }
}