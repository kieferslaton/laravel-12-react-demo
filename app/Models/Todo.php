<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $fillable = [
        'title',
        'completed',
        'due_date',
        'user_id',
    ];

    protected $casts = [
        'completed' => 'boolean',
        'due_date' => 'date:m-d-Y',
    ];

    /**
     * Scope a query to only include incomplete todos.
     */
    #[Scope]
    protected function incomplete(Builder $query): void
    {
        $query->where('completed', false);
    }

    /**
     * Scope a query to search todos by title.
     */
    #[Scope]
    protected function search(Builder $query, string $term): void
    {
        $query->where('title', 'like', '%' . $term . '%');
    }
}
