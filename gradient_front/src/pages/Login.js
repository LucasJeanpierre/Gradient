import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const Login = () => {

    const [cookies, setCookie, removeCookie] = useCookies();

    const sendForm = (e) => {
        e.preventDefault();
        const form = e.target;
        axios
            .post("http://localhost:8000/api/token/", {
                username: form.username.value,
                password: form.password.value
            })
            .then(res => {
                console.log(res);
                setCookie('token', res.data.access, { path: '/', secure: true, sameSite: true} );
                setCookie('refresh', res.data.refresh, { path: '/', secure: true, sameSite: true} );
            })
            .catch(err => {
                console.log(err);
            });
    }
    return (
        <div>
            <h1>Login Form</h1>
            <form onSubmit={sendForm}>
                <label>
                    Username:
                    <input type="text" name="username" />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
};

export default Login;
