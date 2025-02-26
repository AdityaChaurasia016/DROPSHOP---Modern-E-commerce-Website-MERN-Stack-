import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import ProductList from '../utils/ProductList/ProductList';
import USPOLO from '../../../assets/LIMITED_DROP_DEKSTOP_BANNWER-ezgif.com-webp-to-jpg-converter.jpg'
import FilterDropdown from '../../Filtering/FilterDropdown';

const Product = () => {
  const state = useContext(GlobalState);
  const [products] = state.productAPI.products;

  return (
    <div className='bg-white'>
      <img src={USPOLO} alt="" className='pb-8 w-auto h-auto' />
      <FilterDropdown/>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {
          products.map((product) => {
            return <ProductList key={product._id} product={product} />;
          })
        }
      </div>
    </div>
  );
};

export default Product;



