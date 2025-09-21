<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

Route::get('/tasks', [TaskController::class, 'index']);   // list all tasks
Route::post('/tasks', [TaskController::class, 'store']);  // create a new task
Route::put('/tasks/{id}', [TaskController::class, 'update']);  // update a task
Route::delete('/tasks/{id}', [TaskController::class, 'destroy']); // delete a task