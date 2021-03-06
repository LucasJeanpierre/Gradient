const Task = ({ task }) => {

    const modalId = "#ModalTask" + task.id;

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">{task.title}</h5>
                <span data-bs-toggle="modal" data-bs-target={modalId}>
                    &#x2699;
                </span>
            </div>
            <div className="card-body">
                <p className="card-text">{task.description}</p>
                <p className="card-text">{task.created_at}</p>
                <input type="checkbox" disabled defaultChecked={task.done} />
            </div>
        </div>
    );

}

export default Task;