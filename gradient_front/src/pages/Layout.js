import { Outlet } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useEffect } from "react";

const Layout = () => {

    const [cookies, setCookie, removeCookie] = useCookies();
    var titleColor;

    if (cookies.token != undefined) {
        titleColor = {
            color: 'green'
        };
    } else {
        titleColor = {
            color: 'red'
        };

    }

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" style={titleColor} href="#">Gradient</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="/">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/categories">Categories</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/login">Login</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/logout">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
};

export default Layout;
