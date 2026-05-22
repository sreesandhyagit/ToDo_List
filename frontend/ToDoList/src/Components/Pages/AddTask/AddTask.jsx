import { useEffect, useState } from "react"
import axios from "axios"
import fetchTasks from ViewEditTask


const API_URL="http://127.0.0.1:8000/"

function AddTask(){
  const [task,setTask]=useState("");

  const addTask=async(e)=>{
    e.preventDefault();
    try{
      if(!task.trim()){
        alert("Task cannot empty")
        return;
      }
      const response = await axios.post("http://127.0.0.1:8000/",{task})
      console.log(response,data)
      setTask("");
      alert("New task added")
      fetchTasks()
    }catch(err){
      console.error(err)   
    }
  }

  return (
    <div>
      <h1 style={{color:"green"}}>Add Task</h1>
      <form onSubmit={addTask}>
        <label>Enter your task: </label>
        <input type="text" value={task} onChange={(e) =>setTask(e.target.value)} />        
        <button type="submit">Add Task</button>
      </form>
    </div>
  )
}
export default AddTask