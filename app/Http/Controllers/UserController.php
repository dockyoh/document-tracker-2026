<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        $users = User::get();

        return UserResource::collection($users);
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
    public function update(UpdateUserRequest $request, string $id): UserResource
    {
        $user = User::findOrFail($id);

        $validated = $request->validated();

        if ($validated['role'] === 'admin') {
            $previewsAdmin = User::where('role', 'admin')->first();
            if ($user->role === 'department head') {
                $previewsAdmin?->update([
                    'role' => 'department head'
                ]);
            } else if ($user->role === 'reviewer') {
                $previewsAdmin?->update([
                    'role' => 'reviewer'
                ]);
            } else {
                $previewsAdmin?->update([
                    'role' => 'staff'
                ]);
            }
            // $managementCount--;
        } else if ($validated['role'] === 'department head') {
            $previewsHead = User::where('role', 'department head')->first();
            if ($user->role === 'admin') {
                $previewsHead?->update([
                    'role' => 'admin'
                ]);
            } else if ($user->role === 'reviewer') {
                $previewsHead?->update([
                    'role' => 'reviewer'
                ]);
            } else {
                $previewsHead?->update([
                    'role' => 'staff'
                ]);
            }
            // $managementCount--;
        } else if ($validated['role'] === 'reviewer') {
            $previewsReviewer = User::where('role', 'reviewer')->first();
            if ($user->role === 'admin') {
                $previewsReviewer?->update([
                    'role' => 'admin'
                ]);
            } else if ($user->role === 'department head') {
                $previewsReviewer?->update([
                    'role' => 'department head'
                ]);
            } else {
                $previewsReviewer?->update([
                    'role' => 'staff'
                ]);
            }
            // $managementCount--;
        }

        $reviewerCount = User::where('role', 'reviewer')->count();
        $adminCount = User::where('role', 'admin')->count();
        $headCount = User::where('role', 'department head')->count();

        if ($adminCount !== 1 || $headCount !== 1 || $reviewerCount !== 1) {
            $user->update($validated);
        }

        return new UserResource($user->fresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    // UPDATE USER STATUS
    public function updateUserStatus(string $id): UserResource
    {
        $user = User::findOrFail($id);

        if ($user->status === "pending") {
            $user->update([
                'status' => 'approved'
            ]);
        }

        return new UserResource($user->fresh());
    }
}
