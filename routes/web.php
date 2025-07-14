<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Auth
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

Route::get('/admin/edit/vehicle/{id}', function($id) {
    return Inertia::render('Admin/Vehicle/EditVehicle', [
        'id' => $id
    ]);
});

Route::get('/admin/services', function() {
    return Inertia::render('Admin/Service/Service');
});

Route::get('/admin/add/service', function() {
    return Inertia::render('Admin/Service/AddService');
});

Route::get('/admin/edit/service/{id}', function($id) {
    return Inertia::render('Admin/Service/EditService', [
        'id' => $id
    ]);
});

Route::get('/admin/parts', function() {
    return Inertia::render('Admin/Part/Part');
});

Route::get('/admin/add/part', function() {
    return Inertia::render('Admin/Part/AddPart');
});

Route::get('/admin/edit/part/{id}', function($id) {
    return Inertia::render('Admin/Part/EditPart', [
        'id' => $id
    ]);
});

Route::get('/admin/customers', function() {
    return Inertia::render('Admin/Customer/Customer');
});

Route::get('/admin/add/customer', function() {
    return Inertia::render('Admin/Customer/AddCustomer');
});

Route::get('/admin/edit/customer/{id}', function($id) {
    return Inertia::render('Admin/Customer/EditCustomer', [
        'id' => $id
    ]);
});

Route::get('/admin/mechanics', function() {
    return Inertia::render('Admin/Mechanic/Mechanic');
});

Route::get('/admin/add/mechanic', function() {
    return Inertia::render('Admin/Mechanic/AddMechanic');
});

Route::get('/admin/edit/mechanic/{id}', function($id) {
    return Inertia::render('Admin/Mechanic/EditMechanic', [
        'id' => $id
    ]);
});