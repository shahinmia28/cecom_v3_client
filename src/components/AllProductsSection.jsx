import { NavLink } from 'react-router-dom';
import { useProductContext } from '../context_reducer/context/productContext';
import ProductCard from './ProductCard';

const AllProductsSection = () => {
  const { products } = useProductContext();

  return (
    <div id='product_section' className='product-section my-5'>
      <div className='container_my py-3'>
        <div className='title flex justify-between items-center pb-3'>
          <h3 className='font-bold text-indigo-900 text-lg md:text-2xl'>
            Best Selling Products:
          </h3>
          <div>
            <NavLink
              to={`/products`}
              className='border-2 font-semibold text-sm md:text-lg border-indigo-500 text-indigo-500 py-1 px-3 hover:bg-indigo-500 hover:text-white'
            >
              View All
            </NavLink>
          </div>
        </div>
        <hr />
        <div className='product-wrap grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-5'>
          {products?.length !== 0 ? (
            products?.slice(0, 11)?.map((p, i) => {
              return (
                <div key={i}>
                  <ProductCard p={p} />
                </div>
              );
            })
          ) : (
            <p>Product Not Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProductsSection;
