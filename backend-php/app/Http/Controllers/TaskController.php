<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\TaskRequestPatch;
use App\Http\Requests\TaskRequestPost;

class TaskController extends Controller
{
    // GET /api/tasks
    public function index()
    {
        return Task::all();
    }

    // POST /api/tasks
    public function store(TaskRequestPost $request)
    {
        $validated = $request->validated();
        $task = Task::create($validated);
        return response()->json($task);
    }

    //PUT/PATCH Update all Task or sspecific task
    public function update(TaskRequestPatch $request, $id) {

        $validated = $request->validated();

        $task = Task::findOrFail($id);
        $task->update($validated);
        
        return response()->json($task);
    }

    public function destroy($id) {
        $task = Task::findOrFail($id);
        $task->delete();
        return response()->json(['message'=> 'Task deleted succesfully']);
    }
}
