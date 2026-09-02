<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'tracking_number' => $this->tracking_number,
            'title' => $this->title,
            'original_name' => $this->original_name,
            'mime_type' => $this->mime_type,
            'file_size_human' => round($this->file_size / 1024 / 2024, 2) . 'MB',
            'status' => $this->status,
            'focal' => $this->focalPerson?->name,
            'role' => $this->focalPerson?->role,
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_human' => $this->updated_at?->diffForHumans()
        ];
    }
}
