<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'theme',
        'title',
        'text'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
