import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const BrandProducts = () => {
    const { brand } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get(`/api/company?brand=${brand}`);
            setProducts(res.data.products);
        };
        fetchProducts();
    }, [brand]);

    return (
        <div>
            <h2>{brand} Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product._id}>{product.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default BrandProducts;
