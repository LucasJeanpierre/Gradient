import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation } from "react-router-dom";
import Note from '../components/Note.js';
import ModalNote from "../components/ModalNote.js";

const Notes = () => {

    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies();
    const search = useLocation().search;
    const category = new URLSearchParams(search).get('category');



    const getNotes = () => {
        var url = "/api/notes/?category=" + category;
        console.log(url);
        axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            })
            .then(res => {
                setNotes(res.data.results);
            })
            .catch(err => {
                console.log(err);
            });
    }
   


    useEffect(getNotes, []);


    return (
        <div>
            <h1>Notes</h1>
            <div className="card-group">
                {notes.map(note => (
                    <>
                        <Note note={note} />
                        <ModalNote note={note} getNotes={getNotes} />
                    </>
                ))}
            </div>
            <button className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#EmptyModalNote" >Add Note modal</button>
            <ModalNote note={false} category_id={category} getNotes={getNotes} />
        </div>
    )
};

export default Notes;
