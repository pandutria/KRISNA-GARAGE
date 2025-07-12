<?php

use App\Http\Controllers\PartController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VehicleController;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schedule as FacadesSchedule;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('/register', [UserController::class, 'register']); //all
Route::post('/login', [UserController::class, 'login']); //all

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/me', [UserController::class, 'me']); //all
    Route::post('/logout', [UserController::class, 'logout']); //all

    Route::post('/schedule', [ScheduleController::class, 'store']); //customer
    Route::get('/schedule/customer', [ScheduleController::class, 'indexByCustomer']); //customer
    Route::get('/schedule/mechanic', [ScheduleController::class, 'indexByMechanic']); //mechanic
});

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
Route::get('/schedule/{id}', [ScheduleController::class, 'show']); //admin
Route::delete('/schedule/{id}', [ScheduleController::class, 'destroy']); //admin

