<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('search');
})->name('home');

Route::get('/people/{id}', function ($id) {
    return Inertia::render('people', ["id" => $id]);
})->name('people');

Route::get('/films/{id}', function ($id) {
    return Inertia::render('film', ["id" => $id]);
})->name('film');
