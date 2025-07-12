<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Exception;
use Illuminate\Http\Request;
use PhpParser\Node\Expr;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Service::get()->all();
        return response()->json(['service' => $data], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function show($id)
    {
        $data = Service::find($id);

        if (!$data)
            return response()->json(['message' => 'not found!!'], 404);

        return response()->json(['service' => $data], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = new Service();
            $data->name = $request->name;
            $data->description = $request->description;
            $data->price = $request->price;
            $data->save();

            return response()->json(['service' => $data], 201);
        } catch(Exception $err) {
            return response()->json(['err' => $err], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $data = Service::find($id);
            $data->name = $request->name;
            $data->description = $request->description;
            $data->price = $request->price;
            $data->save();

            return response()->json(['service' => $data], 200);
        }catch(Exception $err) {
            response()->json(['message' => $err], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data = Service::find($id);

        if(!$data) return response()->json(['message' => 'not found'], 404);

        $data->delete();

        return response()->json(['message' => 'delete data success'], 200);
    }
}
