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
        $validated = $request->validate([
            'title' => 'required|string|max:50',
            'completed' => 'boolean'
        ]);
        return Task::create($validated);
    }

    //PUT/PATCH Update all Task or sspecific task
    public function update(Request $request, $id) {

        $task = Task::findOrFail($id);

        $data = [];

        if($request->filled('title')) {
            $validated = $request->validate(['title' => 'sometimes|required|string|max:50',]);
            $data['title'] = $validated['title'];
        }

        if($request->filled('completed')) {
            $validated = $request->validate(['completed' => 'sometimes|boolean']);
            $data['completed'] = $validated['completed'];
        }

        if(!empty($data)) {
            $task->update($data);
        }
        
        return $task;
    }

    public function destroy($id) {
        $task = Task::findorFail($id);
        $task->delete();
        return response()->json(['message'=> 'Task deleted succesfully']);
    }
}
