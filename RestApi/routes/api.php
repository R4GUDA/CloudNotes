<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [\App\Http\Controllers\UserController::class, 'login']);
Route::post('/register', [\App\Http\Controllers\UserController::class, 'register']);

Route::post('/store', [\App\Http\Controllers\NoteController::class, 'store'])->middleware([\App\Http\Middleware\TokenComparisonMiddleware::class]);
Route::post('/delete', [\App\Http\Controllers\NoteController::class, 'delete'])->middleware([\App\Http\Middleware\TokenComparisonMiddleware::class]);
Route::post('/edit',[\App\Http\Controllers\NoteController::class, 'edit']);
