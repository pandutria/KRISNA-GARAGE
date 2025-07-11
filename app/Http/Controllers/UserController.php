<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request) {
        try {
            $is = User::where('name', $request->name)->first();

            if ($is) return response()->json(['message' => 'name is already in use'], 401);

            $user = new User();
            $user->role = "customer";
            $user->name = $request->name;
            $user->password = $request->password;
            $user->address = $request->address;
            $user->phone_number = $request->phone_number;
            $user->save();

            return response()->json(['user' => $user], 201);
        } catch(Exception $err) {
            return response()->json(['err' => $err], 500);
        }
    }

    public function login(Request $request) {
        $user = User::where('name', $request->name)->first();

        if (!$user)
            return response()->json(['message' => 'invalid credential'], 401);

        if (!Hash::check($request->password, $user->password))
            return response()->json(['message' => 'invalid credential'], 401);

        $token = $user->createToken('access_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function me () {
        $user = Auth::user();

        if (!$user)
            return response()->json(['message' => 'user not found'], 401);

        return response()->json(['user' => $user], 200);
    }

    public function logout() {
        Auth::user()->tokens()->delete();

        return response()->json(['message' => 'logout success'], 201);
    }
}
