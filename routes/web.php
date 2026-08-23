<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index');
});

Route::view('/document/upload', 'document.upload');
Route::view('/user/login', 'user.login');
Route::view('/user/register', 'user.register');
