<?php

namespace App\Models;

// use Dom\Document;
use App\Models\Document;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $fillable = [
        "message",
        "action",
        "document_id",
        "user_id"
    ];

    public function document()
    {
        return $this->belongsTo(Document::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
