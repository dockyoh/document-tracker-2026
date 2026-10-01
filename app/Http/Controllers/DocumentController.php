<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResubmitDocumentRequest;
use App\Http\Requests\StoreDocumentRequest;
use App\Http\Requests\UpdateDocumentRequest;
use App\Http\Resources\DocumentResource;
use App\Models\Document;
use App\Models\Feedback;
use App\Models\User;
use Illuminate\Support\Str;

// use Dom\Document;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        $documents = Document::with('uploader')->whereNull('archived_at')->get();

        return DocumentResource::collection($documents);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDocumentRequest $request): DocumentResource
    {
        $file = $request->file('document');

        $filePath = $file->store('documents', 'local');

        $focalPerson = User::where('role', 'reviewer')->first();

        $document = Document::create([
            'tracking_number' => 'DOC-' . strtoupper(Str::random(8)),
            'title'           => $request->validated('title'),
            'original_name'   => $file->getClientOriginalName(),
            'file_path'       => $filePath,
            'file_size'       => $file->getSize(),
            'mime_type'       => $file->getMimeType(),
            'status'          => 'Pending',
            'uploader_id' => $request->user()->id,
            'focal_person_id' => $focalPerson?->id
        ]);
        return new DocumentResource($document);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDocumentRequest $request, string $id): DocumentResource
    {
        $document = Document::findOrFail($id);

        $validated = $request->validated();

        // $document->update($request->validated());

        if (($validated["status"] ?? null) === "Pending") {
            $departmentHead = User::where("role", "department head")->firstOrFail();
            $validated["focal_person_id"] = $departmentHead->id;
        } else if (($validated["status"] ?? null) === "Approved") {
            $validated["focal_person_id"] = null;
        } else if (in_array($validated["status"] ?? null, ["Rejected", "Revise"])) {
            Feedback::create([
                "message" => $validated["feedback"],
                "action" => $validated["status"],
                "document_id" => $document->id,
                "user_id" => $request->user()->id
            ]);

            if (($validated['status'] ?? null) === 'Rejected') {
                $validated["focal_person_id"] = null;
            } else {
                $validated["focal_person_id"] = $document->uploader_id;
            }

            unset($validated["feedback"]);
        }

        $document->update($validated);

        return new DocumentResource($document->fresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    // PREVIEW DOCUMENT API
    public function preview(Document $document): StreamedResponse
    {

        // dd([
        //     'document' => $document->toArray(),
        //     'attributes' => $document->getAttributes(),
        //     'file_path_property' => $document->file_path,
        //     'id' => $document->id,
        // ]);

        if (!$document->file_path) {
            abort(404, 'DOCUMENT HAS NO FILE PATH');
        }

        if (!Storage::disk('local')->exists($document->file_path)) {
            abort(404, 'FILE NOT FOUND');
        }

        return Storage::response(
            $document->file_path,
            $document->original_name,
            [
                'Content-Type' => $document->mime_type,
                'Content-Disposition' => 'inline; filename = " ' . $document->original_name . ' "'
            ]
        );
    }

    // PREVIEW ARCHIVED DOCUMENT API
    public function previewArchived(Document $document, Request $request): StreamedResponse
    {
        $user = $request->user();

        $isReviewerAdmin = in_array($user->role, ['reviewer', 'department head', 'admin'], true);
        $isUploader = $document->uploader_id === $user->id;

        if (!$isReviewerAdmin && !$isUploader) {
            abort(403, "PREVIEW DENIED");
        }

        if (is_null($document->archived_at)) {
            abort(404, "DOCUMENT IS NOT YET ARCHIVED");
        }

        if (!$document->file_path) {
            abort(404, 'DOCUMENT HAS NO FILE PATH');
        }

        if (!Storage::disk('local')->exists($document->file_path)) {
            abort(404, 'FILE NOT FOUND');
        }

        return Storage::response(
            $document->file_path,
            $document->original_name,
            [
                'Content-Type' => $document->mime_type,
                'Content-Disposition' => 'inline; filename = " ' . $document->original_name . ' "'
            ]
        );
    }

    public function resubmit(ResubmitDocumentRequest $request, string $id): DocumentResource
    {
        $document = Document::findOrFail($id);

        $validated = $request->validated();

        $file = $request->file('document');

        $newFilePath = $file->store('documents', 'local');

        $document->update([
            'original_name'   => $file->getClientOriginalName(),
            'file_path'       => $newFilePath,
            'file_size'       => $file->getSize(),
            'mime_type'       => $file->getMimeType(),
            'status'          => 'Pending',
            'focal_person_id' => $validated['reviewer_id']
        ]);

        return new DocumentResource($document->fresh());
    }

    public function completeArchived(string $id): DocumentResource
    {
        $document = Document::findOrFail($id);

        if ($document->status === "Approved") {
            $document->update([
                'status' => 'Completed',
                'archived_at' => now()
            ]);
        } else if ($document->status === "Rejected") {
            $document->update([
                'archived_at' => now()
            ]);
        }

        return new DocumentResource($document->fresh());
    }

    // GET ONLY ARCHIVED DOCUMENTS
    public function archived(): AnonymousResourceCollection
    {
        $documents = Document::with('uploader')->whereNotNull('archived_at')->latest('archived_at')->get();

        return DocumentResource::collection($documents);
    }
}
