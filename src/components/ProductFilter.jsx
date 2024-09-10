import React from 'react';
import { useProductContext } from '../context_reducer/context/productContext';

const ProductFilter = ({ filters, setFilters }) => {
  const { categories, companies } = useProductContext();

  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const handleCompanyChange = (e) => {
    setFilters({ ...filters, company: e.target.value });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  const handleRangeChange = (e) => {
    setFilters({ ...filters, priceRange: e.target.value });
  };

  return (
    <div className='flex flex-col justify-start items-start p-4'>
      <div className='m-4 bg-white shadow-md rounded-lg p-4'>
        {/* Category Filter */}
        <div>
          <label className='block text-lg font-semibold mb-2'>Category:</label>
          <div className='flex flex-col space-y-2'>
            <label className='flex items-center'>
              <input
                type='radio'
                value=''
                checked={filters.category === ''}
                onChange={handleCategoryChange}
                className='form-radio text-blue-600 h-4 w-4'
              />
              <span className='ml-2 text-gray-700'>All</span>
            </label>
            {categories.map((curCet, i) => (
              <label key={i} className='flex items-center'>
                <input
                  type='radio'
                  value={curCet.name}
                  checked={filters.category === curCet.name}
                  onChange={handleCategoryChange}
                  className='form-radio text-blue-600 h-4 w-4'
                />
                <span className='ml-2 text-gray-700'>{curCet.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Company Filter */}
        <div className='mt-4'>
          <label className='block text-lg font-semibold mb-2'>Company:</label>
          <div className='flex flex-col space-y-2'>
            <label className='flex items-center'>
              <input
                type='radio'
                value=''
                checked={filters.company === ''}
                onChange={handleCompanyChange}
                className='form-radio text-blue-600 h-4 w-4'
              />
              <span className='ml-2 text-gray-700'>All</span>
            </label>
            {companies.map((curCom, i) => (
              <label key={i} className='flex items-center'>
                <input
                  type='radio'
                  value={curCom.name}
                  checked={filters.company === curCom.name}
                  onChange={handleCompanyChange}
                  className='form-radio text-blue-600 h-4 w-4'
                />
                <span className='ml-2 text-gray-700'>{curCom.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className='mt-4'>
          <label className='block text-lg font-semibold mb-2'>
            Price Range:
          </label>
          <div className='flex space-x-4'>
            <div className='flex flex-col'>
              <label className='text-gray-700'>Min Price:</label>
              <input
                type='number'
                name='minPrice'
                value={filters.minPrice || ''}
                onChange={handlePriceChange}
                placeholder='Min'
                className='border border-gray-300 rounded p-2'
              />
            </div>
            <div className='flex flex-col'>
              <label className='text-gray-700'>Max Price:</label>
              <input
                type='number'
                name='maxPrice'
                value={filters.maxPrice || ''}
                onChange={handlePriceChange}
                placeholder='Max'
                className='border border-gray-300 rounded p-2'
              />
            </div>
          </div>
        </div>

        {/* =============== */}
        <div className='mt-4'>
          <label className='block text-lg font-semibold mb-2'>
            Price Range:
          </label>
          <div className='flex flex-col'>
            <input
              type='range'
              name='priceRange'
              min='0'
              max='1000'
              value={filters.priceRange || 0}
              onChange={(e) => {
                console.log(e.target.value);
              }}
              className='w-full'
            />
            <div className='flex justify-between text-gray-700'>
              <span>0</span>
              <span>{filters.priceRange || 0}</span>
              <span>1000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
