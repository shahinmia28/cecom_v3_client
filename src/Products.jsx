import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ProductFilter from './components/ProductFilter';
import { useProductContext } from './context_reducer/context/productContext';

const Products = () => {
  const { products } = useProductContext();
  const [filters, setFilters] = useState({
    category: '',
    company: '',
    minPrice: '',
    maxPrice: '',
  });

  const filteredProducts = products.filter((product) => {
    const matchesCategory = filters.category
      ? product.category.name === filters.category
      : true;
    const matchesCompany = filters.company
      ? product.company.name === filters.company
      : true;

    const minPrice = filters.minPrice ? parseFloat(filters.minPrice) : 0;
    const maxPrice = filters.maxPrice ? parseFloat(filters.maxPrice) : Infinity;
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

    return matchesCategory && matchesCompany && matchesPrice;
  });

  return (
    <div className='grid grid-cols-4 gap-3 px-2 lg:px-5'>
      <div className='col-span-1 bg-slate-100'>
        <ProductFilter filters={filters} setFilters={setFilters} />
      </div>
      <div className='col-span-3'>
        <ProductList filteredProducts={filteredProducts} />
      </div>
    </div>
  );
};

export default Products;
