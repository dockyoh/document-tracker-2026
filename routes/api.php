<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\InboxController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/documents/archived', [DocumentController::class, 'archived']);
    Route::get('/documents/{document}/previewArchived', [DocumentController::class, 'previewArchived']);
    Route::apiResource('documents', DocumentController::class);
    Route::get('/documents/{document}/preview', [DocumentController::class, 'preview']);
    Route::post('/documents/{id}/resubmit', [DocumentController::class, 'resubmit']);
    Route::put('/documents/{id}/completeArchived', [DocumentController::class, 'completeArchived']);
    Route::apiResource('inbox', InboxController::class);
});

Route::middleware(['auth:sanctum', 'can:manage-roles'])->group(function () {
    Route::apiResource('users', UserController::class);
    Route::put('users/{id}/updateUserStatus', [UserController::class, 'updateUserStatus']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
