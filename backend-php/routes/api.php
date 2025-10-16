<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;

Route::get('/tasks', [TaskController::class, 'index']);    // list all tasks
Route::post('/tasks', [TaskController::class, 'store']);  // create a new task
Route::patch('/tasks/{id}', [TaskController::class, 'update']);  // update a task
Route::delete('/tasks/{id}', [TaskController::class, 'destroy']); // delete a task

Route::post('/users', [UserController::class, 'signup']);
Route::get('/users', [UserController::class, 'login']);