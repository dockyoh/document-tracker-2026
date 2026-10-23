<?php

namespace App\Actions;

use App\Models\Document;
use App\Models\User;
use Illuminate\Http\UploadedFile;

class ResubmitDocumentAction
{
    /**
     * Create a new class instance.
     */
    public function handle(Document $document, array $validatedData, UploadedFile $file, User $user): Document
    {

        $reviewer = User::where('id', $validatedData['reviewer_id'])->first();

        $newFilePath = $file->store('documents', 'local');

        $document->update([
            'original_name'   => $file->getClientOriginalName(),
            'file_path'       => $newFilePath,
            'file_size'       => $file->getSize(),
            'mime_type'       => $file->getMimeType(),
            'status'          => 'Pending',
            'focal_person_id' => $validatedData['reviewer_id'] ?? ''
        ]);

        $document->activities()->create([
            'user_id' => $user->id,
            'action' => 'resubmit',
            'description' => $user->name . ' resubmitted the document and routed to ' . $reviewer->name
        ]);

        return $document->fresh();
    }
}
