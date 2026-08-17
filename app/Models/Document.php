<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        'tracking_number',
        'title',
        'original_name',
        'file_path',
        'file_size',
        'mime_type',
        'status'
    ];
}
