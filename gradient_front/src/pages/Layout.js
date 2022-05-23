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
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" style={titleColor} href="#">Gradient</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/categories">Categories</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/logout">Logout</a>
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
