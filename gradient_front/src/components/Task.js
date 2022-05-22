const Task = ({ task, updateTask, deleteTask }) => {
    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">{task.title}</h5>
                <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
            <div className="card-body">
                <p className="card-text">{task.description}</p>
                <p className="card-text">{task.created_at}</p>
                <input type="checkbox" onChange={(e) => {updateTask(task.id, e)}} defaultChecked={task.done} />
            </div>
        </div>
    );

}

export default Task;