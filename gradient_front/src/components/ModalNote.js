import { useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';

const ModalNote = ({ note, category_id }) => {

    const modalId = note ? "ModalNote" + note.id : "EmptyModalNote";

    const [cookies, setCookie, removeCookie] = useCookies();

    const [title, setTitle] = useState(note ? note.title : "");
    const [description, setDescription] = useState(note ? note.description : "");

    const handleSubmit = () => {
        console.log('handleSubmit');
        
        note ? editNote(note.id) : addNote()
    }

    const addNote = () => {
        var url = "/api/notes/";
        axios
            .post(url, {
                "title": title,
                "description": description,
                "category": category_id,
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


    const deleteNote = (id) => {
        var url = "/api/notes/" + id + "/";
        axios
            .delete(url, {
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

    const editNote = (id) => {
        axios
            .patch("/api/notes/" + id + "/", {
                "title": title,
                "description": description,
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
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => { deleteNote(note ? note.id : null) }}>delete</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalNote;