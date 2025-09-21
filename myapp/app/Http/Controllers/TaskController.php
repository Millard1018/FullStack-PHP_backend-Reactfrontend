<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // GET /api/tasks
    public function index()
    {
        return Task::all();
    }

    // POST /api/tasks
    public function store(Request $request)
    {
        return Task::create($request->only(['title', 'completed']));
    }

    //PUT/PATCH Update all Task or sspecific task
    public function update(Request $request, $id) {
        $task = Task::findOrFail($id);
        $task->update($request->only(['title', 'completed']));
        return $task;
    }

    public function destroy($id) {
        $task = Task::findorFail($id);
        $task->delete();
        return response()->json(['message'=> 'Task deleted succesfully']);
    }
}
