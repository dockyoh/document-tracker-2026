<?php

namespace App\Http\Controllers;

use App\Http\Resources\DocumentResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use App\Models\Document;
use App\Models\User;
use Symfony\Component\HttpFoundation\JsonResponse;

class InboxController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $user = $request->user();

        if ($user->role === "staff") {
            $documents = Document::with(['uploader', 'focalPerson', 'feedback.user'])
                ->where('uploader_id', $user->id)
                ->where("archived_at", null)
                ->where('status', '!=', 'Pending')
                ->latest()
                ->get();
        } else {
            // THIS IS FOR THE DEPARTMENT HEAD AND REVIEWERS INBOX 
            $documents = Document::with(['uploader', 'focalPerson'])
                ->where('focal_person_id', $user->id)
                ->whereIn('status', ["Pending", "Review"])
                ->latest()
                ->get();
        }

        return DocumentResource::collection($documents);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function inboxNotification(Request $request): JsonResponse
    {
        $user = $request->user();

        $pendingCount = Document::where('focal_person_id', $user->id)->where('status', 'Pending')->count();

        $staffInboxCount = Document::where('uploader_id', $user->id)
            ->whereNull('archived_at')
            ->whereIn('status', ['Revise', 'Approved', 'Rejected'])
            ->count();

        return response()->json([
            'pendingCount' => $pendingCount,
            'staffInboxCount' => $staffInboxCount
        ]);
    }
}
