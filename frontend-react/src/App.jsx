import { useState, useEffect } from 'react'
import { Pencil } from 'lucide-react';
import RUSureModal from './Components/RUSureModal'

function App() {

  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [id, setID] = useState('');
  const [newTasks, setNewTasks] = useState('');
  const [update, setUpdate] = useState({
    'id': '', 'title': '', 'completed': false
  });
  const [refresh, setRefresh] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

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
  }, [refresh])

  

  function updateTask(id) {
    async function updTask() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/tasks/${id}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({'title': update.title, 'completed': update.completed})
        })
        if (!res.ok) {
          throw new Error({error: 'Unable to update task'})
        }
        await getTask();
      } catch (err) {
        setTimeout(() => {setError(err.error)}, 3000)
      }
    }
    updTask();
    setUpdate(prev => ({...prev, 'id': '', 'title': '', 'completed': false}));
    setID('');
    setRefresh(!refresh);
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
    setRefresh(!refresh);
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
        setNewTasks('');
      } catch(err) {
        setTimeout(() => {setError(err.error)}, 3000);
      }
    }
    setTask();
    setRefresh(!refresh);
  }

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-slate-200 space-y-[10vh]" >
        <h1 className="font-bold text-3xl" >Task Manager</h1>
        <div className="bg-white p-10 rounded-3xl" >
          {tasks?.map(task => (
            <div className="flex justify-center items-center space-x-[3vw] space-y-[3vh]" key={task.id}>
              <div className="flex space-x-[3vw] mt-[2vh] flex-1">

                {(id !== task.id) && <p className={`font-bold text-xl flex-1`} >{task.title}</p>}
                {(id === task.id) && <input type="text" placeholder={task.title} value={update.title} onChange={(e) => setUpdate(prev => ({...prev, 'id': task.id, 'title': e.target.value,}))} 
                className="py-[0.5vh] px-[2vw] flex-1"  />}
                <button className="flex-4"
                 onClick={() => {setID((prev) => (prev === task.id ? '' : task.id));}}>
                  <Pencil className="active:opacity-100 hover:opacity-70" />
                </button>

              </div>

              <div className="flex flex-1 space-x-[3vw]" >
                <input type="checkbox" checked={update.id === task.id ? checkbox : task.completed} onChange={(e) => {
                  setCheckbox(checkbox ? false : true);
                  setUpdate(prev => ({...prev, 'id': task.id, 'completed': e.target.checked}));
                  }} className="w-[3vw] h-[3vh]" />
                <button onClick={(update.title || update.completed) ? () => {updateTask(task.id)} : () => {alert("Unable to update, you must edit title or un/tick checkbox first")} } 
                className="bg-blue-400 p-2 rounded-3xl hover:bg-blue-500 active:bg-blue-600" >Update</button>
                <button onClick={() => {deleteTask(task.id)}} 
                className="bg-red-400 p-2 rounded-3xl hover:bg-red-500 active:bg-red-600">Delete</button>
              </div>
              
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className=" flex flex-col space-y-[2vh] bg-white rounded-3xl p-10 px-15" >
          <input type="text" placeholder='Add Task Title'
          className="p-2 px-[2vw] rounded-lg bg-slate-200" value={newTasks} onChange={(e) => setNewTasks(e.target.value)} />
          <button type='submit' className='bg-gray-400 mx-auto p-2 rounded-3xl hover:bg-gray-500 active:bg-gray-600 ' >Submit</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </>
  )
}

export default App
