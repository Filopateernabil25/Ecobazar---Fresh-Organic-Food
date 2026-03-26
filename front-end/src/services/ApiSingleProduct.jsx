import React, { createContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export const ProductSingleContext = createContext();

export default function ApiSingleProduct({ children }) {
    const [product, setProduct] = useState({});
    const { id } = useParams();

    useEffect(() => {
        getProduct();
    }, []);

    function getProduct() {
        fetch(`http://localhost:5000/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(err => console.log("Error Select Data:", err));
    }
    console.log(product);
    return (
        <ProductSingleContext.Provider value={{ product, getProduct }}>
            {children}
        </ProductSingleContext.Provider>
    );
}