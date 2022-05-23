import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Category from "../components/Category.js";
import ModalCategory from "../components/ModalCategory.js";


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
                        <Category category={category} handleClick={handleClick} deleteCategory={deleteCategory} />
                        <ModalCategory category={category} />
                    </>
                ))}
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">+</span>
                <input className="form-control" type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                <button className="btn btn-outline-secondary" onClick={() => { addCategory() }}>Add Category</button>
            </div>
            
        </div>
    )
};

export default Categories;
