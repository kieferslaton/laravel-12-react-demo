<?php

namespace App\Models;

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
}
