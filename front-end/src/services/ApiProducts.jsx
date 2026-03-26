import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ProductContext = createContext();

export default function ApiProducts({ children }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        try {
            const response = await axios.get(`http://localhost:5000/api/products`);
            setProducts(response.data); 
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    }

    return (
        <ProductContext.Provider value={{ products, getProducts }}>
            {children}
        </ProductContext.Provider>
    );
}