<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index() {
        $data = User::where('role', 'customer')->get()->all();
        return response()->json(['customer' => $data], 200);
    }

    // public function show($id) {
    //     $data = User::where($id);

    //     if (!$data)
    //         return response()->json(['message' => 'not found'], 404);

    //     return response()->json(['customer' => $data], 200);
    // }

    public function store(Request $request) {
        try {
            $data = new User();
            $data->role = "customer";
            $data->name = $request->name;
            $data->password = $request->password;
            $data->address = $request->address;
            $data->phone_number = $request->phone_number;
            $data->save();

            return response()->json(['customer' => $data], 201);
        } catch(Exception $err) {
            return response()->json(['message' => $err->getMessage()], 500);
        }
    }

    public function update(Request $request, $id) {
        try {
            $data = User::find($id);
            $data->name = $request->name;
            $data->address = $request->address;
            $data->phone_number = $request->phone_number;
            $data->save();

            return response()->json(['customer' => $data], 200);
        } catch(Exception $err) {
            return response()->json(['message' => $err->getMessage()], 500);
        }
    }

    public function destroy($id) {
        $data = User::find($id);
        $data->delete();
        return response()->json(['message' => 'delete data success'], 200);
    }
}
