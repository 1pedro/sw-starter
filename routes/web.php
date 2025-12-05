<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('search');
})->name('home');

Route::get('/person', function () {
    return Inertia::render('person');
})->name('person');

Route::get('/movie', function () {
    return Inertia::render('movie');
})->name('movie');
