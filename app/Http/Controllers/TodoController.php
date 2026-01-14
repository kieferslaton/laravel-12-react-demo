<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $query = $user->todos();

        if ($request->filled('search')) {
            $query->search($request->input('search'));
        }

        if ($request->boolean('incomplete_only')) {
            $query->incomplete();
        }

        return Inertia::render('todos/index', [
            'todos' => $query->get(),
            'filters' => [
                'search' => $request->input('search', ''),
                'incomplete_only' => $request->boolean('incomplete_only'),
            ],
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
