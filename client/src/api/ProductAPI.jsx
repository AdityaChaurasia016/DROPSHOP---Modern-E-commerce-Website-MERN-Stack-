import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductAPI = () => {
    const [products, setProducts] = useState([]);
    const [sort, setSort] = useState("");

    const getProducts = async () => {
        const res = await axios.get(`/api/products?sort=${sort}`);  
        setProducts(res.data.products);
    };

    useEffect(() => {
        getProducts();
    }, [sort]);

    return {
        products: [products, setProducts],
        sort: [sort, setSort],
        getProducts
    };
};

export default ProductAPI;
