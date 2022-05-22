import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation } from "react-router-dom";
import Note from '../components/Note.js';

const Notes = () => {

    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies();
    const search = useLocation().search;
    const category = new URLSearchParams(search).get('category');





    const getNotes = () => {
        var url = "http://localhost:8000/api/notes/?category=" + category;
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

    const addNote = () => {
        var url = "http://localhost:8000/api/notes/";
        axios
            .post(url, {
                "title": newNote,
                "description": "",
                "category": category,
            }, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            })
            .then(res => {
                console.log(res.data);
                getNotes();
            })
            .catch(err => {
                console.log(err);
            });
    }


    const deleteNote = (id) => {
        var url = "http://localhost:8000/api/notes/" + id + "/";
        axios
            .delete(url, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            })
            .then(res => {
                console.log(res.data);
                getNotes();
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
                    <Note note={note} deleteNote={deleteNote} />
                ))}
            </div>
            <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
            <button onClick={addNote}>Add Note</button>
        </div>
    )
};

export default Notes;
