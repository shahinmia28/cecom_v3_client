import React from 'react';

const Price = ({ p }) => {
  return (
    <div className='py-2 font-noto-sans-bengali text-xs md:text-sm'>
      <p className='flex justify-start items-center'>
        <span className='font-semibold text-red-500'>৳{p?.sell_price}</span>
        <span className='text-slate-500 mx-3 line-through decoration-1 '>
          ৳{p?.price}
        </span>
        <span className='bg-red-500 text-white px-1 text-center'>
          -{p?.discount}%
        </span>
      </p>
    </div>
  );
};

export default Price;
