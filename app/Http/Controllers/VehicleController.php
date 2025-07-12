<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Exception;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Vehicle::get()->all();
        return response()->json(["vehicle" => $data], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function show($id)
    {
        $data = Vehicle::find($id);

        if (!$data) return response()->json(['message' => 'not found!'], 404  );

        return response()->json(['vehicle' => $data], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = new Vehicle();
            $data->type = $request->type;
            $data->engine_number = $request->engine_number;
            $data->frame_number = $request->frame_number;
            $data->save();

            return response()->json(['vehicle' => $data], 201);
        } catch(Exception $err) {
            return response()->json(['error' => $err], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $data = Vehicle::find($id);
            $data->type = $request->type;
            $data->engine_number = $request->engine_number;
            $data->frame_number = $request->frame_number;
            $data->save();

            return response()->json(['vehicle' => $data], 200);
        } catch(Exception $err) {
            return response()->json(['err' => $err], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data = Vehicle::find($id);

        if (!$data) return response()->json(['message' =>'not found!'], 404  );

        $data->delete();

        return response()->json(['message' => 'delete data success'], 200);
    }
}
