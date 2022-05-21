import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const Login = () => {

    const [cookies, setCookie, removeCookie] = useCookies();
    removeCookie('token');
    removeCookie('refresh');
    
    return (
        <div>
            <h1>You have been logout</h1>
        </div>
    )
};

export default Login;
