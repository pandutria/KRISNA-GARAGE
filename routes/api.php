<?php

use App\Http\Controllers\PartController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VehicleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::middleware('auth:sanctum')->group(function() {
    // User
    Route::get('/me', [UserController::class, 'me']);
    Route::post('/logout', [UserController::class, 'logout']);
});

Route::get('/vehicle', [VehicleController::class, 'index']);
Route::get('/vehicle/{id}', [VehicleController::class, 'show']);
Route::post('/vehicle', [VehicleController::class, 'store']);
Route::put('/vehicle/{id}', [VehicleController::class, 'update']);
Route::delete('/vehicle/{id}', [VehicleController::class, 'destroy']);

Route::get('/service', [ServiceController::class, 'index']);
Route::get('/service/{id}', [ServiceController::class, 'show']);
Route::post('/service', [ServiceController::class, 'store']);
Route::put('/service/{id}', [ServiceController::class, 'update']);

Route::get('/part', [PartController::class, 'index']);
Route::get('/part/{id}', [PartController::class, 'show']);
Route::post('/part', [PartController::class, 'store']);
Route::put('/part/{id}', [PartController::class, 'update']);
Route::delete('/part/{id}', [PartController::class, 'destroy']);
