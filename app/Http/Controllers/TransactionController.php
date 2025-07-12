<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Transaction::with([
            'schedule.customer',
            'schedule.mechanic',
            'schedule.vehicle',
            'schedule.service'
        ])->get()->all();
        return response()->json(['transaction' => $data], 200);
    }

    public function indexByCustomer() {
        $customer = Auth::user();

        $data = Transaction::with([
            'schedule.customer',
            'schedule.mechanic',
            'schedule.vehicle',
            'schedule.service',
        ])->whereHas('schedule', function ($query) use ($customer) {
            $query->where('customer_id', $customer->id);
        })
        ->get()->all();

        return response()->json(['transaction' => $data], 200);
    }

    public function show($id) {
        $data = Transaction::find($id)
        ->with([
            'schedule.customer',
            'schedule.mechanic',
            'schedule.vehicle',
            'schedule.service',
        ])->get()->all();

        return response()->json(['transaction' => $data], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = new Transaction();
            $data->schedule_id = $request->schedule_id;
            $data->total_price = $request->total_price;
            $data->payment_method = $request->payment_method;
            $data->payment_number = $request->payment_number;
            $data->status = 'pending';

            $data->save();
            $data->load([
                'schedule.customer',
                'schedule.mechanic',
                'schedule.vehicle',
                'schedule.service'
            ])->get()->all();

            return response()->json(['transaction' => $data], 201);
        } catch(Exception $err) {
            return response()->json(['err' => $err], 500);
        }
    }

    public function updateStatus(Request $request, $id) {
        $data = Transaction::find($id);

        if (!$data)
            return response()->json(['message' => 'not found'], 404);

        $data->status = $request->status;
        $data->save();
        $data->load([
            'schedule.customer',
            'schedule.mechanic',
            'schedule.vehicle',
            'schedule.service'
        ])->get()->all();

        return response()->json(['transaction' => $data], 200);
    }

    public function destroy($id) {
        $data = Transaction::find($id);

        if (!$data)
            return response()->json(['message' => 'not found'], 404);

        $data->delete();

        return response()->json(['message' => 'delete data success'], 200);
    }
}
