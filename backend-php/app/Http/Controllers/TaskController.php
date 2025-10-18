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
    public function index(Request $request)
    {
        $task = $request->user()->tasks;
        return response()->json(['message'=> 'fetch succesfully', 'task'=> $task], 201);
    }

    // POST /api/tasks
    public function store(TaskRequestPost $request)
    {
        $validated = $request->validated();
        $task = $request->user()->tasks()->create($validated);
        return response()->json(['message'=> 'Task stored succesfully', 'task'=> $task], 201);
    }

    //PUT/PATCH Update all Task or sspecific task
    public function update(TaskRequestPatch $request, $id) {

        $validated = $request->validated();

        $task = $request->user()->tasks()->findOrFail($id);
        $task->update($validated);
        
        return response()->json(['message'=> 'Task updated succesfully', 'task'=> $task], 201);
    }

    public function destroy(Request $request, $id) {
        $task = $request->user()->tasks()->findOrFail($id);
        $task->delete();
        return response()->json(['message'=> 'Task deleted succesfully']);
    }
}
