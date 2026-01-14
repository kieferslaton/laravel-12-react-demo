<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return Inertia::render('todos/index', [
            'todos' => $user->todos()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'due_date' => 'nullable|date',
        ]);

        $user = Auth::user();

        $user->todos()->create($validated);

        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'completed' => 'required|boolean',
        ]);

        $user = Auth::user();

        $todo = $user->todos()->find($id);

        $todo->update($validated);

        return redirect()->back();
    }
}
