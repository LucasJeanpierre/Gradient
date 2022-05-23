import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation } from "react-router-dom";
import Task from '../components/Task.js';
import ModalTask from "../components/ModalTask.js";

const Tasks = () => {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies();
    const search = useLocation().search;
    const category = new URLSearchParams(search).get('category');



    const getTask = () => {
        axios
            .get("http://localhost:8000/api/tasks/?category=" + category, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            })
            .then(res => {
                setTasks(res.data.results);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const addTask = () => {
        axios
            .post("http://localhost:8000/api/tasks/", {
                "title": newTask,
                "description": "",
                "category": category,
                "done": false,
            }, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            })
            .then(res => {
                console.log(res.data);
                getTask();
            })
            .catch(err => {
                console.log(err);
            });
    }

    const deleteTask = (id) => {
        axios
            .delete("http://localhost:8000/api/tasks/" + id + "/", {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            })
            .then(res => {
                console.log(res.data);
                getTask();
            })
            .catch(err => {
                console.log(err);
            });
    }

    const updateTask = (id, e) => {
        axios
            .patch("http://localhost:8000/api/tasks/" + id + "/", {
                "done": e.target.checked,
            }, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            })
            .then(res => {
                console.log(res.data);
                getTask();
            })
            .catch(err => {
                console.log(err);
            });
    }




    useEffect(getTask, []);


    return (
        <div>
            <h1>Tasks</h1>
            <div className="card-group">
                {tasks.map(task => (
                    <>
                    <Task task={task} updateTask={updateTask} deleteTask={deleteTask} />
                    <ModalTask task={task}/>
                    </>
                    
                ))}
            </div>
            <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
            <button onClick={addTask}>Add Task</button>
        </div>
    )
};

export default Tasks;
