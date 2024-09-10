import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Modal } from 'antd';
import { NavLink } from 'react-router-dom';
import API from '../../components/Api';
import Star from '../../components/Star';
import UpdateProduct from './UpdateProduct';
import Price from '../../components/Price';

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState({});

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${API}/api/product/get-all`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error('Someething Went Wrong');
    }
  };
  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  const handleClick = (slug) => {
    setVisible(true);
    setSelected(slug);
  };
  //delete a product
  const handleDelete = async (pId) => {
    try {
      let answer = window.prompt(
        'If You want to delete this product, Write "yes".'
      );
      if (!answer) return;
      const { data } = await axios.delete(`${API}/api/product/delete/${pId}`);
      if (data?.success) {
        toast.success('Product Deleted Successfully');
        getAllProducts();
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className='py-5' id='manage_product'>
      <div className='grid grid-cols-3 gap-4'>
        {products.length === 0 ? (
          <>
            <figure className='loading'>
              <img src='../../images/loading.gif' alt='loading' />
            </figure>
          </>
        ) : (
          products?.map((p, i) => {
            let totalRating;
            const totalReviews = p?.reviews?.length;

            if (totalReviews !== 0) {
              totalRating = p?.reviews
                ?.map((curElem) => curElem.rating)
                .reduce((a, b) => a + b);
            }
            const stars = totalRating / totalReviews;

            return (
              <div key={i} className='border border-orange-500 '>
                <NavLink
                  to={`/product_details/${p?.slug}`}
                  className='navLink-cart'
                >
                  <div className='h-60'>
                    <img
                      src={p.images[0].url}
                      alt={p.name}
                      className='h-full w-full'
                    />
                  </div>

                  <div className='card-body p-3'>
                    {/* Price section */}
                    <Price p={p} />
                    {/* ratting */}
                    <div className='flex items-center justify-start py-2'>
                      <Star stars={stars} size={15} sizeOut={17} />
                      <span className='text-slate-500 ps-3'>
                        ({totalReviews})
                      </span>
                    </div>
                    {/* name description */}
                    <p className='flex flex-col pb-3'>
                      <span className='capitalize text-lg text-slate-800 font-bold'>
                        {p.name}
                      </span>
                      <span>{p?.description.substring(0, 44)}</span>
                    </p>
                    {/* color category */}
                    <div className='flex justify-between items-center h-12'>
                      <p style={{ background: p?.color }} className='p-1 me-2'>
                        {p?.color}
                      </p>
                      <p>{p?.category.name}</p>
                    </div>
                  </div>
                </NavLink>
                <div className='grid grid-cols-2 gap-4 p-3 font-semibold text-white'>
                  <button
                    className='bg-orange-500 p-2 transition-all hover:bg-orange-600'
                    onClick={() => handleClick(p.slug)}
                  >
                    Edit
                  </button>

                  <button
                    className='bg-red-500  p-2 transition-all hover:bg-red-600'
                    onClick={() => {
                      handleDelete(p._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      <Modal
        onCancel={() => setVisible(false)}
        footer={null}
        open={visible}
        width={800}
      >
        <UpdateProduct
          selected={selected}
          setVisible={setVisible}
          getAllProducts={getAllProducts}
        />
      </Modal>
    </div>
  );
};

export default ManageProduct;
