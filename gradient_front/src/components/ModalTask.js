import { useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';

const ModalTask = ({ task }) => {
    const modalId = "ModalTask" + task.id;

    const [cookies, setCookie, removeCookie] = useCookies();

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [done, setDone] = useState(task.done);

    const handleSubmit = () => {
        console.log('handleSubmit');
        axios
            .patch("http://localhost:8000/api/tasks/" + task.id + "/", {
                "title": title,
                "description": description,
                "done": done,
            }, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            })
            .then(res => {
                console.log(res.data);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className="modal fade" id={modalId} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="card">
                            <div className="card-header">
                                <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="card-body">
                                <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="card-body">
                                <input type="checkbox" className="form-checkbox" checked={done} onChange={(e) => setDone(e.target.checked)} />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalTask;