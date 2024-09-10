import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ filteredProducts }) => {
  return (
    <div className='product-wrap grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-5'>
      {filteredProducts?.length !== 0 ? (
        filteredProducts?.map((p, i) => (
          <div key={i}>
            <ProductCard p={p} />
          </div>
        ))
      ) : (
        <p>Product Not Found</p>
      )}
    </div>
  );
};

export default ProductList;
