<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TodoController;
use App\Models\Category;
use App\Models\Todo;
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
        if(old('category_id')){
            ddd(old());
        }
        $todos = Todo::where('user_id', auth()->user()->id);

        if(request('category')){
            $categoryId = Category::where('user_id', auth()->user()->id)
                ->where('name', request('category'))->get()->first()->id;

            $todos->where('category_id', $categoryId);
        }
        return view('dashboard', [
            'todos' => $todos->get()
        ]);
    })->name('dashboard');

    Route::delete('/todo/{todo}', [TodoController::class, 'destroy']);

    Route::post('/todo', [TodoController::class, 'store']);

    Route::post('/todo/toggle-complete/{todo}', [TodoController::class, 'toggleComplete']);

    Route::post('/category', [CategoryController::class, 'store']);
});

require __DIR__.'/auth.php';
