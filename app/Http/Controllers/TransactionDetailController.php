<?php

namespace App\Http\Controllers;

use App\Models\Part;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use Exception;
use Illuminate\Http\Request;

class TransactionDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = TransactionDetail::with([
                'transaction.schedule',
                'transaction.schedule.customer',
                'transaction.schedule.mechanic',
                'transaction.schedule.vehicle',
                'transaction.schedule.service',
                'part'
            ])
        ->get()->all();
        return response()->json(['transactionDetail' => $data], 200);
    }

    public function indexByTransaction($transactionId)
    {
        $data = TransactionDetail::with([
                'transaction.schedule',
                'transaction.schedule.customer',
                'transaction.schedule.mechanic',
                'transaction.schedule.vehicle',
                'transaction.schedule.service',
                'part'
            ])
        ->where('transaction_id', $transactionId)->get()->all();
        return response()->json(['transactionDetail' => $data], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = new TransactionDetail();
            $data->transaction_id = $request->transaction_id;
            $data->part_id = $request->part_id;
            $data->qty = $request->qty;

            $part = Part::find($request->part_id);

            $data->subtotal = $part->price * $request->qty;

            $data->save();

            $transaction = Transaction::find($request->transaction_id);
            $transaction->total_price = $request->total_price;
            $transaction->save();

            $data->load([
                'transaction.schedule',
                'transaction.schedule.customer',
                'transaction.schedule.mechanic',
                'transaction.schedule.vehicle',
                'transaction.schedule.service',
                'part'
            ]);

            return response()->json(['transactionDetail' => $data], 201);
        } catch(Exception $err) {
            return response()->json(['err' => $err], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(TransactionDetail $transactionDetail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {

        } catch(Exception $err) {
            return response()->json(['err' => $err], 500);
        }
    }

    public function updateStatus() {

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TransactionDetail $transactionDetail)
    {
        //
    }
}
