// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from "react";

// const BrandProducts = () => {
//     const { brand } = useParams();
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             const res = await axios.get(`/api/company?brand=${brand}`);
//             setProducts(res.data.products);
//         };
//         fetchProducts();
//     }, [brand]);

//     return (
//         <div>
//             <h2>{brand} Products</h2>
//             <ul>
//                 {products.map(product => (
//                     <li key={product._id}>{product.title}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default BrandProducts;





import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BrandProducts = () => {
    const { brand } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`/api/company?brand=${brand}`);
                setProducts(res.data.products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, [brand]);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">{brand} Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="w-full h-[500px] bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg flex flex-col">
                        
                        {/* Product Image */}
                        {product.images && product.images.url ? (
                            <div className="w-full h-[320px] relative">
                                <img
                                    src={product.images.url}
                                    className="w-full h-full object-cover transition-transform duration-500 transform hover:scale-110"
                                    alt="Product"
                                />
                            </div>
                        ) : (
                            <div className="w-full h-[320px] bg-gray-300 flex items-center justify-center text-white">
                                No Image Available
                            </div>
                        )}

                        {/* Product Details */}
                        <div className="p-3 flex-grow flex flex-col">
                            <h2 className="font-bold text-xl text-black break-words mb-1">{product.title}</h2>
                            <span className="text-base font-semibold text-gray-900 mb-2">₹{product.price}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="px-4 pb-4 flex space-x-8 bg-white">
                            <Link
                                to="/cart"
                                className="py-4 px-6 bg-black text-white text-sm font-semibold rounded-md hover:bg-gray-700 transition"
                            >
                                Buy Now
                            </Link>
                            <Link
                                to={`/detail/${product._id}`}
                                className="py-4 px-6 text-black border-2 border-black rounded-md text-sm font-semibold hover:bg-gray-200 transition"
                            >
                                View Now
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrandProducts;
