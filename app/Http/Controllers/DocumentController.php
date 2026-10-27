<?php

namespace App\Http\Controllers;

use App\Actions\ResubmitDocumentAction;
use App\Actions\SearchFilterAction;
use App\Actions\StoreDocumentAction;
use App\Http\Requests\ResubmitDocumentRequest;
use App\Http\Requests\StoreDocumentRequest;
use App\Http\Requests\UpdateDocumentRequest;
use App\Http\Resources\DocumentResource;
use App\Models\Document;
use App\Models\Feedback;
use App\Models\User;
use Illuminate\Http\JsonResponse;
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
    public function index(Request $request): AnonymousResourceCollection
    {
        $documents = Document::with(['uploader', 'focalPerson'])
            ->whereNull('archived_at')
            ->searchFilter($request->only(['search', 'status', 'focal', 'author']))
            ->latest()
            ->get();

        return DocumentResource::collection($documents);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDocumentRequest $request, StoreDocumentAction $storeAction): DocumentResource
    {
        $document = $storeAction->handle(
            $request->validated(),
            $request->file('document'),
            $request->user()
        );

        return new DocumentResource($document);
    }

    public function resubmit(ResubmitDocumentRequest $request, string $id, ResubmitDocumentAction $resubmitAction): DocumentResource
    {
        $document = Document::findOrFail($id);

        $document = $resubmitAction->handle(
            $document,
            $request->validated(),
            $request->file('document'),
            $request->user()
        );

        return new DocumentResource($document->fresh());
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

            $document->activities()->create([
                'user_id' => $request->user()->id,
                'action' => 'approved',
                'description' => $request->user()->name . ' approved and routed to DH ' . $departmentHead->name
            ]);
        } else if (($validated["status"] ?? null) === "Approved") {
            $validated["focal_person_id"] = null;

            $document->activities()->create([
                'user_id' => $request->user()->id,
                'action' => 'approved',
                'description' => $request->user()->name . ' approved the document'
            ]);
        } else if (in_array($validated["status"] ?? null, ["Rejected", "Revise"])) {
            Feedback::create([
                "message" => $validated["feedback"],
                "action" => $validated["status"],
                "document_id" => $document->id,
                "user_id" => $request->user()->id
            ]);

            if (($validated['status'] ?? null) === 'Rejected') {
                $validated["focal_person_id"] = null;

                $document->activities()->create([
                    'user_id' => $request->user()->id,
                    'action' => 'rejected',
                    'description' => $request->user()->name . ' rejected the document. Feedback : ' . $validated['feedback']
                ]);
            } else {
                $validated["focal_person_id"] = $document->uploader_id;

                $document->activities()->create([
                    'user_id' => $request->user()->id,
                    'action' => 'revise',
                    'description' => $request->user()->name . ' requested revision. Feedback : ' . $validated['feedback']
                ]);
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
    public function preview(Document $document, Request $request): StreamedResponse
    {
        $user = $request->user();

        $isDepartmentHead = $user->role === 'department head';
        $isReviewer = $user->role === 'reviewer';
        $isAdmin = $user->role === 'admin';
        $isFocal = $document->uploader_id === $user->id || $document->focal_person_id === $user->id;

        if (!$isDepartmentHead && !$isReviewer && !$isAdmin && !$isFocal) {
            abort(403, 'UNAUTHORIZED ACCESS');
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

    public function completeArchived(Request $request, string $id): DocumentResource
    {
        $document = Document::findOrFail($id);

        if ($document->status === "Approved") {
            $document->update([
                'status' => 'Completed',
                'archived_at' => now()
            ]);

            $document->activities()->create([
                'user_id' => $request->user()->id,
                'action' => 'completed-archived',
                'description' => $request->user()->name . ' marked the document as completed'
            ]);
        } else if ($document->status === "Rejected") {
            $document->update([
                'archived_at' => now()
            ]);

            $document->activities()->create([
                'user_id' => $request->user()->id,
                'action' => 'rejected-archived',
                'description' => $request->user()->name . ' archived the document'
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

    public function archivedSearchFilter(Request $request): AnonymousResourceCollection
    {
        $search = $request->query('search');
        $searchStatus = $request->query('status');
        $searchAuthor = $request->query('author');

        $documents = Document::with('uploader')->whereNotNull('archived_at')
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('tracking_number', 'like', "%{$search}%")
                        ->orWhere('title', 'like', "%{$search}%")
                        ->orWhere('original_name', 'like', "%{$search}%");
                });
            })
            ->when($searchStatus, function ($query, $searchStatus) {
                $query->where('status', $searchStatus);
            })
            ->when($searchAuthor, function ($query, $searchAuthor) {
                $query->where('uploader_id', $searchAuthor);
            })
            ->latest()
            ->get();

        return DocumentResource::collection($documents);
    }
}
