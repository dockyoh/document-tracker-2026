<?php

namespace App\Models;

// use Dom\Document;
// use App\Models\Document;
// use App\Models\User;
// use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

class DocumentActivity extends Model
{
    protected $fillable = [
        'document_id',
        'user_id',
        'action',
        'description'
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
