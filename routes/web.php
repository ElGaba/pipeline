<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('auth.login');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');

    Route::delete('/todo/{todo}', [TodoController::class, 'destroy']);

    Route::post('/todo', [TodoController::class, 'store']);

    Route::post('/todo/toggle-complete/{todo}', [TodoController::class, 'toggleComplete']);
});

require __DIR__.'/auth.php';
