<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function store(Request $request){
        $request->validate([
            'name' => ['required', 'string', 'max:255']
        ]);

        $todo = Todo::create([
            'name' => $request->name,
            'user_id' => auth()->user()->id
        ]);
        return redirect('dashboard');
    }
}
