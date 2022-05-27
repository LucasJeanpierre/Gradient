import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const Logout = () => {

    const [cookies, setCookie, removeCookie] = useCookies();


    const removeCookies = () => {
        if (cookies.refresh && cookies.token) {
            removeCookie('token');
            removeCookie('refresh');
        }
    }

    useEffect(removeCookies, []);

    return (
        <div>
            <h1>You have been logout</h1>
        </div>
    )
};

export default Logout;
