<?php

namespace App\Actions;

use App\Models\Document;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use illuminate\Support\Str;

class StoreDocumentAction
{
    /**
     * Create a new class instance.
     */
    public function handle(array $validatedData, UploadedFile $file, User $user): Document
    {
        $filePath = $file->store('documents', 'local');

        $focalPerson = User::where('role', 'reviewer')->first();
        $departmentHead = User::where('role', 'department head')->first();

        if (!$focalPerson && !$departmentHead) {
            abort(422, "PLEASE CONTACT YOUR ADMINISTRATOR TO ASIGN REVIEWER AND DEPARTMENT HEAD");
        }

        $document = Document::create([
            'tracking_number' => 'DOC-' . strtoupper(Str::random(8)),
            'title'           => $validatedData['title'],
            'original_name'   => $file->getClientOriginalName(),
            'file_path'       => $filePath,
            'file_size'       => $file->getSize(),
            'mime_type'       => $file->getMimeType(),
            'status'          => 'Pending',
            'uploader_id' => $user->id,
            'focal_person_id' => $focalPerson->id
        ]);

        $document->activities()->create([
            'user_id' => $user->id,
            'action' => 'upload',
            'description' => $user->name . ' uploaded the document and routed to reviewer ' . $focalPerson->name
        ]);

        return $document;
    }
}
