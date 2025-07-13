<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\MechanicController;
use App\Http\Controllers\PartController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\TransactionDetailController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VehicleController;
use App\Models\Schedule;
use App\Models\TransactionDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schedule as FacadesSchedule;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('/register', [UserController::class, 'register']); //all (in FE, just customer can access)
Route::post('/login', [UserController::class, 'login']); //all

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/me', [UserController::class, 'me']); //all
    Route::post('/logout', [UserController::class, 'logout']); //all

    Route::post('/schedule', [ScheduleController::class, 'store']); //customer
    Route::get('/schedule/customer', [ScheduleController::class, 'indexByCustomer']); //customer
    Route::get('/schedule/mechanic', [ScheduleController::class, 'indexByMechanic']); //mechanic

    Route::get('/transaction/customer', [TransactionController::class, 'indexByCustomer']); //customer
});

Route::get('/mechanic', [MechanicController::class, 'index']); //admin
// Route::get('/mechanic/{id}', [MechanicController::class, 'show']); //admin
Route::post('/mechanic', [MechanicController::class, 'store']); //admin
Route::put('/mechanic/{id}', [MechanicController::class, 'update']); //admin
Route::delete('/mechanic/{id}', [MechanicController::class, 'destroy']); //admin

Route::get('/customer', [CustomerController::class, 'index']); //admin
// Route::get('/customer/{id}', [CustomerController::class, 'show']); //admin
Route::post('/customer', [CustomerController::class, 'store']); //admin
Route::put('/customer/{id}', [CustomerController::class, 'update']); //admin
Route::delete('/customer/{id}', [CustomerController::class, 'destroy']); //admin

Route::get('/vehicle', [VehicleController::class, 'index']); //admin
Route::get('/vehicle/{id}', [VehicleController::class, 'show']); //admin
Route::post('/vehicle', [VehicleController::class, 'store']); //admin
Route::put('/vehicle/{id}', [VehicleController::class, 'update']); //admin
Route::delete('/vehicle/{id}', [VehicleController::class, 'destroy']); //admin

Route::get('/service', [ServiceController::class, 'index']); //admin
Route::get('/service/{id}', [ServiceController::class, 'show']); //admin
Route::post('/service', [ServiceController::class, 'store']); //admin
Route::put('/service/{id}', [ServiceController::class, 'update']); //admin

Route::get('/part', [PartController::class, 'index']); //admin, mechanic
Route::get('/part/{id}', [PartController::class, 'show']); //admin, mechanic
Route::post('/part', [PartController::class, 'store']); //admin, mechanic
Route::put('/part/{id}', [PartController::class, 'update']); //admin, mechanic
Route::delete('/part/{id}', [PartController::class, 'destroy']); //admin, mechanic

Route::get('/schedule', [ScheduleController::class, 'index']); //admin
Route::get('/schedule/{id}', [ScheduleController::class, 'show']); //all
Route::delete('/schedule/{id}', [ScheduleController::class, 'destroy']); //admin

Route::get('/transaction', [TransactionController::class, 'index']); //cashier
Route::get('/transaction/{id}', [TransactionController::class, 'show']); //cashier, customer
Route::post('/transaction', [TransactionController::class, 'store']); //mechanic
Route::put('/transaction/pay/{id}', [TransactionController::class, 'pay']); //customer
Route::put('/transaction/updateStatus/{id}', [TransactionController::class, 'updateStatus']); //cashier
Route::delete('/transaction/{id}', [TransactionController::class, 'destroy']); //cashier

Route::get('/transactionDetail', [TransactionDetailController::class, 'index']); //cashier
Route::get('/transactionDetail/transaction/{transactionId}', [TransactionDetailController::class, 'indexByTransaction']); //cashier
Route::post('/transactionDetail', [TransactionDetailController::class, 'store']); //mechanic


