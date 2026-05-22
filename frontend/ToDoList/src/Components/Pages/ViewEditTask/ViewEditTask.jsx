import { useEffect, useState } from "react"
import axios from "axios"
// import "./ViewEditTask.css"

const API_URL="http://127.0.0.1:8000/"

function ViewEditTask() {

    const [task,setTask]=useState("");
    const [todos,setTodos]=useState([]);
    const [loading,setLoading]=useState(false);
    const [editing,setEditing]=useState(false)
    const [editId,setEditId]=useState(null);
    const [editTask,setEditTask]=useState("");

    useEffect(()=>{fetchTasks()},[]);

    const addTask=async(e)=>{
        e.preventDefault();
        setLoading(true)
        try{
            if(!task.trim()){
                alert("Task cannot empty")
                return;
            }
            const response = await axios.post(API_URL,{task})
            console.log(response.data)
            setTask("");
            alert("Task added successfully")
            fetchTasks()
        }catch(err){
            console.error(err)   
        }finally{
            setLoading(false)
        }
    }

    const fetchTasks=async ()=>{        
        try{
            const response=await axios.get(API_URL)
            setTodos(response.data)
        }
        catch(err){
            console.log(err)
        }          
    }

    const updateTodoStatus = async (task) =>{
        const response = await axios.patch(`${API_URL}edit-task/${task.id}`,{is_completed:!task.is_completed})
        console.log(response.data)
        console.log(task.is_completed)
        fetchTasks()
    }

    const startEdit=(task)=>{
        setEditId(task.id)
        setEditTask(task.task)
    }
    
    const stopEdit=()=>{
        setEditId(null);
        setEditTask("");
    }

    const updateTask = async(id) =>{
        setEditing(true)
        try{
            const response = await axios.put(`${API_URL}edit-task/${id}`,{task:editTask})
            console.log(response.data)
            alert("Task updated successfully")
            stopEdit()
            fetchTasks()  

        }catch (err){
            alert("Error updating task")
        }finally{
            setEditing(false)
        }       
    }

    const deleteTask= async (id) => {
        const confirmDelete=window.confirm("Are you sure to delete this task?")
        if (!confirmDelete){
            return
        }
        try{
            const response=await axios.delete(`${API_URL}edit-task/${id}`)
            fetchTasks()        
                      
        } catch(err){
            console.error(err)
            alert("Error deleting task")
        }
    }

    return (       
        <div>
            <div className="container">            
                <h3>To Do List</h3>
                <form onSubmit={addTask}>
                    <div className="add-task">
                        <label>Enter your task: </label>
                        <input type="text" className="add-task input" value={task} onChange={(e) =>setTask(e.target.value)} />        
                        <button type="submit">{loading?"Saving..." : "Add Task"} </button>
                    </div>
                </form>
                <h5>All Tasks</h5>                               
                <div>
                    <ul>{
                        todos.map((task)=>(                            
                            <li key={task.id}> 
                                                            
                                {editId===task.id?(
                                    <div class="d-flex">
                                        <div class="p-1 flex-grow-1">                                           
                                            <input type="checkbox" checked={task.is_completed} onChange={()=> updateTodoStatus(task)} />
                                            <input type="text" className="task-text" value={editTask} onChange={(e) =>setEditTask(e.target.value)} />                                            
                                        </div>  
                                        <div class="p-1">                               
                                            <button type="submit" className="save-btn" onClick={()=>updateTask(task.id)}>{editing?"Saving...":"Save"}</button>
                                        </div>
                                        <div class="p-1">
                                            <button className="cancel-btn" onClick={stopEdit}>Cancel</button>
                                        </div>
                                    </div>):
                                    <div class="d-flex">
                                        <div class="p-2 flex-grow-1">
                                            <input type="checkbox" checked={task.is_completed} /><span className="task-text">{task.task} </span>                                           
                                        </div>
                                        <div class="p-2">
                                            {/* <button className="edit-btn" onClick={()=>startEdit(task)}> <i className="fa-solid fa-pen-to-square me-2"></i>Edit</button> */}
                                            <a href="#" className="edit-icon" title="Edit" onClick={(e) => {e.preventDefault(); startEdit(task);}}>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </a>
                                        </div>
                                        <div class="p-2">
                                            {/* <button className="delete-btn" onClick={()=>deleteTask(task.id)}> <i className="fa-solid fa-trash"></i>Delete</button>   */}
                                            <a href="#" className="delete-icon" title="Delete" onClick={(e) => {e.preventDefault();deleteTask(task.id);}}>
                                                <i className="fa-solid fa-trash"></i>
                                            </a>
                                        </div>
                                    </div>
                                }                      
                            </li>
                        ))}                    
                    </ul>
                </div>   
            </div>
        </div>     
        
    )
}

export default ViewEditTask