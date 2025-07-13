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

Route::get('/admin/venichels', function() {
    return Inertia::render('Admin/Vehicle');
});