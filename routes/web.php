<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function() {
    return Inertia::render('Auth/Login');
});

Route::get('/signup', function() {
    return Inertia::render('Auth/Register');
});

// Route Admin
Route::get('/admin/vehicles', function() {
    return Inertia::render('Admin/Vehicle/Vehicle');
});

Route::get('/admin/add/vehicle', function() {
    return Inertia::render('Admin/Vehicle/AddVehicle');
});