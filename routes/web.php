<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('todos', [App\Http\Controllers\TodoController::class, 'index'])->name('todos.index');

    Route::post('todos', [App\Http\Controllers\TodoController::class, 'store'])->name('todos.store');

    Route::patch('todos/{id}', [App\Http\Controllers\TodoController::class, 'update'])->name('todos.update');
});

require __DIR__.'/settings.php';
