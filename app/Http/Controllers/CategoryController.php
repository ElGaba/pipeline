<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255']
        ]);

        $todo = Category::create([
            'name' => $request->name,
            'user_id' => auth()->user()->id
        ]);
        return redirect('dashboard');
    }
}
