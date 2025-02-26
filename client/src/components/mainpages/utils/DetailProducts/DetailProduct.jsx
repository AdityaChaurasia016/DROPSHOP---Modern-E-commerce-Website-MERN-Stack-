import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';
import CartContext from '../../../CartContext/CartContext';
import axios from 'axios';

const DetailProduct = () => {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productAPI.products;
  const [detailProduct, setDetailProduct] = useState([]);
  const [count, setCount] = useState(1);
  const [message, setMessage] = useState('');
  const [selectedSize, setSelectedSize] = useState(null);

  const { cart, setcart, userid } = useContext(CartContext);

  const increment = () => setCount(count + 1);
  const decrement = () => count > 1 && setCount(count - 1);

  const addtocart = async () => {
    if (!selectedSize) {
      setMessage('Please select a size');
      return;
    }
    try {
      const updatedCart = { user_id: userid, product_id: detailProduct.product_id, quantity: count, size: selectedSize };
      setcart((prev) => [...(Array.isArray(prev) ? prev : []), updatedCart]);

      const resp = await axios.post('http://localhost:5000/cart/addtocart', updatedCart);
      setMessage(resp.status === 200 ? 'Added to cart' : 'An error has occurred');
    } catch (error) {
      console.error('Error adding to cart:', error);
      setMessage('An error occurred');
    }
  };

  useEffect(() => {
    if (params) {
      products.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product);
      });
    }
  }, [params, products]);

  if (!detailProduct || Object.keys(detailProduct).length === 0) return null;

  return (
    <div className="flex h-screen w-full bg-black text-white">
      {/* Left - Image Section */}
      <div className="w-1/2 flex items-center justify-center p-10">
        {detailProduct.images && detailProduct.images.url ? (
          <img src={detailProduct.images.url} alt="" className="w-[80%] h-[80%] object-cover border border-white" />
        ) : (
          <p>No image available</p>
        )}
      </div>

      {/* Right - Product Details */}
      <div className="w-1/2 p-12 flex flex-col justify-center space-y-6">
        <h2 className="text-4xl font-bold">{detailProduct.title}</h2>
        <h6 className="text-lg">Product ID: {detailProduct.product_id}</h6>
        <span className="text-2xl font-semibold">Price: ${detailProduct.price}</span>
        <p className="text-lg">{detailProduct.description}</p>
        <p className="text-lg">Category: {detailProduct.content}</p>

        {/* Size Selection */}
        <div className="flex space-x-3">
  {[38, 39, 40, 41, 42, 43, 44, 45].map((size) => (
    <button
      key={size}
      onClick={() => setSelectedSize(size)}
      className={`px-4 py-3 border border-white rounded-full transition ${
        selectedSize === size ? 'bg-white text-black' : 'text-white hover:bg-white hover:text-black'
      }`}
    >
      {size}
    </button>
  ))}
</div>


        {/* Actions */}
        <div className="flex space-x-6">
          <Link to="/cart" className="py-3 px-4 text-center border border-white font-semibold hover:bg-white hover:text-black transition">
            Buy Now
          </Link>
          <button onClick={addtocart} className="py-3 px-4 border border-white font-semibold hover:bg-white hover:text-black transition">
            Add To Cart
          </button>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center space-x-6">
          <button onClick={increment} className="text-2xl border border-white px-3 py-1 hover:bg-white">+</button>
          <p className="text-xl">{count}</p>
          <button onClick={decrement} className="text-2xl border border-white px-3 py-1">-</button>
        </div>

        {/* Message */}
        <p className="text-green-400">{message}</p>
      </div>
    </div>
  );
};

export default DetailProduct;
