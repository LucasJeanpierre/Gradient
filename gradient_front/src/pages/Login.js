import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    const refresh = () => {
        if (cookies.refresh && cookies.token) {
            removeCookie('token');
            axios
                .post("/api/token/refresh/", {
                    refresh: cookies.refresh
                })
                .then(res => {
                    console.log(res);
                    setCookie('token', res.data.access, { path: '/', secure: true, sameSite: true });
                    navigate("/");
                })
                .catch(err => {
                    console.log(err);
                    removeCookie('refresh');
                    removeCookie('token');
                });

        }
    }

    const sendForm = (e) => {
        e.preventDefault();
        const form = e.target;
        axios
            .post("/api/token/", {
                username: form.username.value,
                password: form.password.value
            })
            .then(res => {
                console.log(res);
                setCookie('token', res.data.access, { path: '/', secure: true, sameSite: true });
                setCookie('refresh', res.data.refresh, { path: '/', secure: true, sameSite: true });
                window.location = "/";

            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(refresh, []);

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
