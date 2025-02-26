import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ product }) => {
  return (
    <div className='w-full h-[500px] bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg flex flex-col'>
      
      {/* Product Image (Increased height) */}
      {product.images && product.images.url ? (
        <div className='w-full h-[320px] relative'>
          <img
            src={product.images.url}
            className="w-full h-full object-cover transition-transform duration-500 transform hover:scale-110"
            alt="Product"
          />
        </div>
      ) : (
        <div className='w-full h-[320px] bg-gray-300 flex items-center justify-center text-white'>
          No Image Available
        </div>
      )}

      {/* Product Details */}
      <div className='p-3 flex-grow flex flex-col'>
        <h2 className='font-bold text-xl text-black break-words mb-1'>{product.title}</h2>
        <span className='text-base font-semibold text-gray-900 mb-2'>₹{product.price}</span>
      </div>

      {/* Action Buttons */}
      <div className='px-4 pb-4 flex space-x-8 bg-white'>
        <Link
          to={`cart/`}
          className='py-4 px-6 bg-black text-white text-sm font-semibold rounded-md hover:bg-gray-700 transition'
        >
          Buy Now
        </Link>
        <Link
          to={`detail/${product._id}`}
          className='py-4 px-6 text-black border-2 border-black rounded-md text-sm font-semibold hover:bg-gray-200 transition'
        >
          View Now
        </Link>
      </div>

    </div>
  );
};

export default ProductList;
