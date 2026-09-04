<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index');
});

Route::view('/user/login', 'user.login');
Route::view('/user/register', 'user.register');
Route::view('/user/view', 'user.view');
Route::view('/user/inbox', 'user.inbox');

Route::view('/document/upload', 'document.upload');
