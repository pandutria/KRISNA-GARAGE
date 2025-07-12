<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Schedule::with(['customer', 'mechanic', 'vehicle', 'service'])->get()->all();
        return response()->json(['schedule' => $data], 200);
    }

    public function indexByCustomer() {
        $user = Auth::user();
        $data = Schedule::with(['customer', 'mechanic', 'vehicle', 'service'])
        ->where('customer_id', $user->id)->get()->all();

        return response()->json(['schedule' => $data], 200);
    }

    public function indexByMechanic() {
        $user = Auth::user();
        $data = Schedule::with(['customer', 'mechanic', 'vehicle', 'service'])
        ->where('mechanic_id', $user->id)->get()->all();

        return response()->json(['schedule' => $data], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function show($id)
    {
        $data = Schedule::find($id);

        if (!$data)
            return response()->json(['message' => 'not found'], 404);

        return response()->json(['schedule' => $data], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $user = Auth::user();

            $data = new Schedule();
            $data->customer_id = $user->id;
            $data->vehicle_id = $request->vehicle_id;
            $data->service_id = $request->service_id;
            $data->mechanic_id = $request->mechanic_id;
            $data->status = "pending";
            $data->save();
            $data->load(['customer', 'mechanic', 'vehicle', 'service']);

            return response()->json(['schedule' => $data], 201);
        } catch(Exception $err) {
            return response()->json(['err' => $err], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $schedule = Schedule::find($id);

        if (!$schedule)
            return response()->json(['message' =>'not found'], 404);

        $schedule->delete();
        return response()->json(['message' => 'delete data success'], 200);
    }
}
