import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const Notes = () => {

    const [notes, setNotes] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies();

    const refreshToken = () => {
        if (cookies.refresh && cookies.token) {
            removeCookie('token');
            axios
                .post("http://localhost:8000/api/token/refresh/", {
                    refresh: cookies.refresh
                })
                .then(res => {
                    console.log(res);
                    setCookie('token', res.data.access, { path: '/', secure: true, sameSite: true });
                    window.location.reload(false);
                })
        }
    }


    useEffect(() => {
        axios
            .get("http://localhost:8000/api/notes/?category=1", {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            })
            .then(res => {
                setNotes(res.data.results);
                console.log(notes);
            })
            .catch(err => {
                if (err.response.status === 401) {
                    refreshToken();
                }
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
