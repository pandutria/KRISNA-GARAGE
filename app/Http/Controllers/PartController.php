<?php

namespace App\Http\Controllers;

use App\Models\Part;
use App\Models\Service;
use Exception;
use Illuminate\Http\Request;

class PartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Part::get()->all();
        return response()->json(['part' => $data], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function show($id)
    {
        $data = part::find($id);

        if (!$data)
            return response()->json(['message' => 'not found'], 404);

        return response()->json(['part' => $data], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = new Part();
            $data->name = $request->name;
            $data->code = $request->code;
            $data->type = $request->type;
            $data->price = $request->price;
            $data->save();

            return response()->json(['part' => $data], 201);
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
            $data = Part::find($id);
            $data->name = $request->name;
            $data->code = $request->code;
            $data->type = $request->type;
            $data->price = $request->price;
            $data->save();

            return response()->json(['part' => $data], 201);
        } catch(Exception $err) {
            return response()->json(['err' => $err], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data = Part::find($id);

        if (!$data)
            return response()->json(['message' => 'not found'], 404);

        $data->delete();

        return response()->json(['message' => 'delete data success'], 200);
    }
}
