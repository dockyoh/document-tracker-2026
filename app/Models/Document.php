<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
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
        'status',
        'archived_at',
        'focal_person_id',
        'uploader_id'
    ];

    public function focalPerson()
    {
        return $this->belongsTo(User::class, 'focal_person_id');
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploader_id');
    }

    public function feedback()
    {
        return $this->hasMany(Feedback::class);
    }

    public function activities()
    {
        return $this->hasMany(DocumentActivity::class);
    }

    public function scopeSearchFilter(Builder $query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($q, $search) {
            $q->where(function ($sub) use ($search) {
                $sub->where('tracking_number', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%")
                    ->orWhere('original_name', 'like', "%{$search}%");
            });
        })
            ->when($filters['status'] ?? null, fn($q, $searchStatus) => $q->where('status', $searchStatus))
            ->when($filters['focal'] ?? null, fn($q, $searchFocal) => $q->where('focal_person_id', $searchFocal))
            ->when($filters['author'] ?? null, fn($q, $searchAuthor) => $q->where('uploader_id', $searchAuthor));
    }
}
