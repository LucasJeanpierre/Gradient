import axios from "axios";
import React, { useState, useEffect } from 'react';

const Notes = () => {

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/notes/?category=1")
            .then(res => {
                setNotes(res.data.results);
                console.log(notes);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);


    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map(note => (
                    <li key={note.id}>
                        <h2>{note.title}</h2>
                        <p>{note.description}</p>
                        <p>{note.created_at}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default Notes;
