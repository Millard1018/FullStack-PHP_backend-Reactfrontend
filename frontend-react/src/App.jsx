import { useState, useEffect } from 'react'
import { Pencil } from 'lucide-react';
import RUSureModal from './Components/RUSureModal'

function App() {

  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [checkBox, setCheckBox] = useState(false);
  const [editing, setEditing] = useState(false);
  const [id, setID] = useState('');
  const [newTasks, setNewTasks] = useState('');
  const [update, setUpdate] = useState('');

  async function getTask() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/tasks");
        if (res.ok) {
          const data = await res.json();
          setTasks(data);
        } else {
          throw new Error({error: "Something went wrong"});
        }
      } catch(err) {  
        setTimeout(() => {setError(err.error)}, 3000)
      }
    }

  useEffect(() => {
    getTask();
  }, [])

  

  function updateTask(id) {
    async function updTask() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/tasks/${id}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({})
        })
        if (!res.ok) {
          throw new Error({error: 'Unable to update task'})
        }
        await getTask();
      } catch (err) {
        setTimeout(() => {setError(err.error)}, 3000)
      }
    }
    setEditing(false);
    updTask();
  }

  function deleteTask(id) {
    <RUSureModal message='Are you sure you want to delete this task' button1='Yes, delete' button2='No, keep' />
    async function delTask() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/tasks/${id}`, {method: 'DELETE'})
        if (!res.ok) {
          throw new Error({error: 'Unable to delete task'})
        }
        await getTask();
      } catch (err) {
        setTimeout(() => {setError(err.error)}, 3000)
      }
    }
    delTask();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    async function setTask() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/tasks", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({'title': newTasks, 'completed': false}),
        })
        if(!res.ok) {
          throw new Error({error: 'Unable to set new task'});
        }
        await getTask();
      } catch(err) {
        setTimeout(() => {setError(err.error)}, 3000);
      }
    }
    setTask();
  }

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-slate-200 space-y-[10vh]" >
        <h1 className="font-bold text-3xl" >Task Manager</h1>
        <div >
          {tasks?.map(task => (
            <div className="flex justify-center items-center space-x-[3vw] space-y-[3vh]" key={task.id}>
              <div className="flex space-x-[3vw] mt-[2vh]">
                {(id !== task.id) && <p className={`font-bold text-xl`} >{task.title}</p>}
                {(id === task.id) && <input type="text" placeholder={task.title} value={update} onChange={(e) => setUpdate(e.target.value)} />}
                <button onClick={() => {
                  setEditing(!editing);
                  setID((prev) => (prev === task.id ? '' : task.id));
                }}><Pencil className="active:opacity-100 hover:opacity-70" /></button>
              </div>
              <input type="checkbox" checked={checkBox} onChange={(e) => setCheckBox(e.target.checked)} className="w-[3vw] h-[3vh]" />
              <button onClick={editing ? () => {updateTask(task.id)} : () => {alert("Unable to update, you must edit title first")} } 
              className="bg-blue-400 p-2 rounded-3xl hover:bg-blue-500 active:bg-blue-600" >Update</button>
              <button onClick={() => {deleteTask(task.id)}} 
              className="bg-red-400 p-2 rounded-3xl hover:bg-red-500 active:bg-red-600">Delete</button>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className=" flex flex-col space-y-[2vh] " >
          <input type="text" placeholder='Add Task Title'
          className="p-2 px-[2vw] rounded-lg" value={newTasks} onChange={(e) => setNewTasks(e.target.value)} />
          <button type='submit' className='bg-gray-400 mx-auto p-2 rounded-3xl hover:bg-gray-500 active:bg-gray-600 ' >Submit</button>
        </form>
      </div>
    </>
  )
}

export default App
