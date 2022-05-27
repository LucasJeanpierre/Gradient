import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Category from "../components/Category.js";
import ModalCategory from "../components/ModalCategory.js";


const Categories = () => {

    const [cookies, setCookie, removeCookie] = useCookies();
    const [categories, setCategories] = useState([]);


    const getCategories = () => {
        axios
            .get("/api/categories/", {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            })
            .then(res => {
                console.log(res.data.results);
                setCategories(res.data.results);

            })
            .catch(err => {
                console.log(err);
            });
    }


    const handleClick = (e, id, type) => {
        switch (type) {
            case 'notes':
                window.location.href = "/notes/?category=" + id;
                break;

            case 'tasks':
                window.location.href = "/tasks/?category=" + id;
                break;

            default:
                break;
        }
    }

    useEffect(getCategories, []);


    return (

        <div>
            <div className="card-group">
                {categories.map(category => (
                    <>
                        <Category category={category} handleClick={handleClick}/>
                        <ModalCategory category={category} getCategories={getCategories}/>
                    </>
                ))}
            </div>
            <button className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#EmptyModalCategory" >Add Category modal</button>
            <ModalCategory category={false} getCategories={getCategories}/>

        </div>
    )
};

export default Categories;
