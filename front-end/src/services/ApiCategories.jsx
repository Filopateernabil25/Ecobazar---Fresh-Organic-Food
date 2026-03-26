import React, { createContext, useEffect, useState } from 'react'
export const CategoryContext = createContext();
export default function ApiCategories({ children }) {
    const [Categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories();
    }, []);
    function getCategories() {
        fetch(`http://localhost:5000/api/categories`)
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.log("Error Select Data:", err));
    }
    return (
        <CategoryContext.Provider value={{ Categories, getCategories }}>
            {children}
        </CategoryContext.Provider>
    );
}
