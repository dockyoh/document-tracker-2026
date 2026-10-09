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
            'file_size_human' => round($this->file_size / 1024 / 1024, 2) . 'MB',
            'status' => $this->status,
            'focal' => $this->focalPerson?->name,
            'uploader' => $this->uploader?->name,
            // 'role' => $this->uploader?->role,
            // 'created_at' => $this->created_at?->toIso8601String(),
            'created_at' => $this->created_at?->diffForHumans(),
            'updated_human' => $this->updated_at?->diffForHumans(),
            'archived_at' => $this->archived_at,
            // ---------------------------------------------------------
            // RETURN FEEDBACK HISTORY
            // ---------------------------------------------------------
            "feedback" => $this->feedback->map(function ($feedback) {
                return [
                    "message" => $feedback->message,
                    "action" => $feedback->action,
                    "reviewer" => $feedback->user?->name,
                    "reviewer_id" => $feedback->user?->id,
                    "created_at" => $feedback->created_at->diffForHumans(),
                    "updated_at" => $feedback->updated_at->diffForHumans()
                ];
            }),
            // ----------------------------------------------------------
            // RETURN DOCUMENT ACTIVITY LOG
            // ----------------------------------------------------------
            'activity_log' => $this->activities->map(function ($activity) {
                return [
                    'date' => $activity->created_at->format('M j, Y'),
                    'time' => $activity->created_at->format('g:i A'),
                    'date_time' => $activity->created_at->format('M j, Y g:i A'),
                    'description' => $activity->description
                ];
            })
        ];
    }
}
