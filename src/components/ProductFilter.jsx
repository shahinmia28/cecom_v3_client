import { useProductContext } from '../context_reducer/context/productContext';

const ProductFilter = ({ filters, setFilters }) => {
  const { products, categories, companies } = useProductContext();

  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const prices = products.map((product) => product.price);

  // Find the highest and lowest prices
  const highestPrice = Math.max(...prices);
  const lowestPrice = Math.min(...prices);

  const handleCompanyChange = (e) => {
    setFilters({ ...filters, company: e.target.value });
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      company: '',
      minPrice: lowestPrice,
      maxPrice: highestPrice,
    });
  };

  return (
    <div className='flex flex-col justify-start items-start p-4 '>
      <div className='bg-white shadow-md rounded-lg p-6 w-full border'>
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
        <div className='mt-6'>
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
        <div className='mt-6'>
          <label className='block text-lg font-semibold mb-2'>
            Price Range:
          </label>
          <div className='flex flex-col'>
            <div className='flex'>
              <input
                type='range'
                min={lowestPrice}
                max={highestPrice}
                value={filters.minPrice || lowestPrice}
                onChange={(e) => {
                  const minPrice = Number(e.target.value);
                  const maxPrice = filters.maxPrice || highestPrice;
                  setFilters({ ...filters, minPrice, maxPrice });
                }}
                className='w-full cursor-pointer accent-blue-600'
              />
              <span>{filters.minPrice || lowestPrice}</span>
            </div>

            <div className='flex'>
              <input
                type='range'
                min={lowestPrice}
                max={highestPrice}
                value={filters.maxPrice || highestPrice}
                onChange={(e) => {
                  const maxPrice = Number(e.target.value);
                  const minPrice = filters.minPrice || lowestPrice;
                  setFilters({ ...filters, minPrice, maxPrice });
                }}
                className='w-full cursor-pointer accent-blue-600'
              />
              <span>{filters.maxPrice || highestPrice}</span>
            </div>
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className='mt-4'>
          <button
            onClick={clearFilters}
            className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300'
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
