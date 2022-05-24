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
            .get("/api/tasks/?category=" + category, {
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

    




    useEffect(getTask, []);


    return (
        <div>
            <h1>Tasks</h1>
            <div className="card-group">
                {tasks.map(task => (
                    <>
                    <Task task={task} />
                    <ModalTask task={task}/>
                    </>
                    
                ))}
            </div>
            <button className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#EmptyModalTask" >Add Task modal</button>
            <ModalTask task={false} category_id={category} />
        </div>
    )
};

export default Tasks;
