import React, { useContext } from 'react';
import { GlobalState } from '../../GlobalState';

const FilterDropdown = () => {
    const { productAPI } = useContext(GlobalState);
    const [sort, setSort] = productAPI.sort;

    return (
        < div className='flex items-center'>
        <select
            className="p-2 border rounded-md ml-5 mb-6 cursor-pointer"
            onChange={(e) => setSort(e.target.value)}
        >  
            <option value="">Filter By</option>
            <option value="-price">Price: High to Low</option>
            <option value="price">Price: Low to High</option>
        </select>
        </div>
    );
};

export default FilterDropdown;