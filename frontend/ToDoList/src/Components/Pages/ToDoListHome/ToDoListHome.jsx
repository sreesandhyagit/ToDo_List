import { useEffect, useState } from "react"
import axios from "axios"
import "./ToDoListHome.css"

const API_URL="http://127.0.0.1:8000/"

function ToDoListHome() {    

    //Add Task...........................................................................

    const [data,setData]=useState({
        "task":""    
    })

    const handleData=(e)=>{
        const {name,value}=e.target;       
        setData({...data,[name]:value}) //...spread operator
        console.log(data)
    }
    const handleAddTask= async (e) => {
        e.preventDefault() //to prevent page reload
        try{
            const response=await axios.post(API_URL,data)  
            setMessage("Task added successfully")
            // alert("task added successfully")
            // console.log("Saved:",response.data)
            setData({"task":""}) 
            fetchTasks()
            setTimeout(()=>setMessage(""),3000)//auto clear
        } catch(err){
            console.error(err)
            setMessage("Error adding task")
        }
    }

    //View all task.........................................................................

    const [todos,setTodos]=useState([]);
    
    useEffect(()=>{
        fetchTasks()
    },[])

    const fetchTasks=async ()=>{        
        try{
            const response=await axios.get(API_URL)
            setTodos(response.data)
        }
        catch(err){
            console.log(err)
        }          
    }
    
    //Edit Task.........................................................................

    const [editId,setEditId]=useState(null)
    const [editTask,setEditTask]=useState("")

    const handleUpdateTask = async(id) =>{
        try{
            await axios.put(`${API_URL}edit-task/${id}`,{task:editTask})
            setMessage("Task updated successfully")
            setEditId(null)
            fetchTasks()
            setTimeout(()=>setMessage(""),3000)
        }catch (err){
            setMessage("Error updating task")
        }       
    }

    //Chechbox - toggle function..........................................................

     const toggleComplete = async (task) =>{
        await axios.patch(`${API_URL}edit-task/${task.id}`,{is_completed:!task.is_completed})
        console.log(task.is_completed)
        fetchTasks()
     }

    //Delete Task.......................................................................

    const handleDeleteTask= async (id) => {
        const confirmDelete=window.confirm("Are you sure to delete this task?")
        if (!confirmDelete){
            return
        }
        try{
            await axios.delete(`${API_URL}edit-task/${id}`) 
            setMessage("Task deleted successfully") 
            fetchTasks()           
        } catch(err){
            console.error(err)
            setMessage("Error deleting task")
        }
    }

    //Message.............................................................................

    const [message,setMessage] = useState("")


    return (
        <div className="container">
            <h1>Todo List</h1>
            <form onSubmit={handleAddTask}>
                <div className="add-task">
                    <label>New Task: </label>
                    <input type="text" name="task" value={data.task} onChange={handleData} />        
                    <button type="submit">Add Task</button>
                </div>
            </form>
            {message && (
                <div className="message">
                    {message}
                </div>
            )}
            <h2>All Tasks</h2>
            <div>
                <ul>
                    {
                        todos.map((task)=>(                            
                            <li key={task.id}>
                                {task.is_completed ? <span className="task-text"><s>{task.task}</s></span> : <span className="task-text">{task.task}</span>}                                                           
                                {editId==task.id && (
                                    <>
                                        <input type="checkbox" checked={task.is_completed} onChange={()=> toggleComplete(task)} />
                                        <input value={editTask} onChange={(e) =>setEditTask(e.target.value)} />
                                        <button onClick={()=>handleUpdateTask(task.id)}>Save</button>
                                    </>
                                )}
                                <button className="edit-btn" onClick={()=>{setEditId(task.id),setEditTask(task.task)}}>Edit</button>                                
                                <button className="delete-btn" onClick={()=>handleDeleteTask(task.id)}>Delete</button>
                            </li>
                        ))                    
                    }
                </ul>
            </div> 
        </div>
    )
}

export default ToDoListHome