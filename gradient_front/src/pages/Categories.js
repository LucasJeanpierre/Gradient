import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const Categories = () => {

    const [cookies, setCookie, removeCookie] = useCookies();
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');



    const getCategories = () => {
        var url = "http://localhost:8000/api/categories/";
        axios
            .get(url, {
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

    const addCategory = () => {
        var url = "http://localhost:8000/api/categories/";
        axios
            .post(url, {
                "name": newCategory,
                "description": "",
                "color": "#000000",
            }, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            })
            .then(res => {
                console.log(res.data);
                getCategories();
            })
            .catch(err => {
                console.log(err);
            });
    }

    const deleteCategory = (id) => {
        var url = "http://localhost:8000/api/categories/" + id + "/";
        axios

            .delete(url, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            })
            .then(res => {
                console.log(res.data);
                getCategories();
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(getCategories, []);


    return (
        <div>   
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        <h2>{category.name} : <a href={`/notes/?category=${category.id}`}>Notes</a><a href={`/tasks/?category=${category.id}`}>Tasks</a></h2>
                        <button onClick={() => deleteCategory(category.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
            <button onClick={() => { addCategory() }}>Add Category</button>
        </div>
    )
};

export default Categories;
