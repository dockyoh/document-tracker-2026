<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDocumentRequest;
use App\Http\Requests\UpdateDocumentRequest;
use App\Http\Resources\DocumentResource;
use App\Models\Document;
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
        $documents = Document::with('uploader')->get();

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
            'tracking_number' => 'DILG-CDO-' . strtoupper(Str::random(8)),
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

        if (($validated["status"] ?? null) === "Pending-dh") {
            $departmentHead = User::where("role", "department head")->firstOrFail();

            $validated["focal_person_id"] = $departmentHead->id;
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
}
