import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Radio } from 'antd';
import API from '../../components/Api';
import { useProductContext } from '../../context_reducer/context/productContext';

const UpdateProduct = ({ selected, setVisible, getAllProducts }) => {
  const { categories, companies } = useProductContext();
  const [product, setProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    category: '',
    company: '',
    quantity: '',
    shipping: '',
    color: '',
    fetcher: '',
    photo: '',
    photo2: '',
    img: '',
    img2: '',
  });

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/product/get-single/${selected}`
      );
      setProduct({
        ...product,
        id: data.product._id,
        name: data.product.name,
        description: data.product.description,
        price: data.product.price,
        discount: data.product.discount,
        category: data.product.category._id,
        company: data.product.company._id,
        quantity: data.product.quantity,
        shipping: data.product.shipping,
        color: data.product.color,
        fetcher: data.product.fetcher ? data.product.fetcher : false,
        photo: '',
        photo2: '',
        img: data?.product?.images[0]?.url,
        img2: data?.product?.images[1]?.url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleImage = (e) => {
    setProduct({ ...product, photo: e.target.files[0] });
  };
  const handleImage2 = (e) => {
    setProduct({ ...product, photo2: e.target.files[0] });
  };
  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, [selected]);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append('name', product.name);
      productData.append('description', product.description);
      productData.append('price', product.price);
      productData.append('quantity', product.quantity);
      productData.append('discount', product.discount);
      productData.append('color', product.color);
      productData.append('category', product.category);
      productData.append('company', product.company);
      productData.append('fetcher', product.fetcher);

      if (product.photo) {
        productData.append('image', product.photo);
      }
      if (product.photo2) {
        productData.append('image', product.photo2);
      }
      const { data } = await axios.put(
        `${API}/api/product/update/${product.id}`,
        productData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (data?.success) {
        toast.success(data.message);
        setVisible(false);
        getAllProducts();
      }
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className='p-3'>
      <form onSubmit={handleUpdate}>
        {/* 1 category, color, fetcher*/}
        <div className='grid grid-cols-4 gap-3 my-5'>
          <div className='flex flex-col'>
            <label
              htmlFor='category'
              className='pb-2 font-semibold text-slate-600'
            >
              Select category :
            </label>
            <select
              type='text'
              name='category'
              value={product.category}
              onChange={onChange}
              className='p-2 border border-slate-400 focus:outline-none'
              required
            >
              <option value=''>Select a Category</option>
              {categories?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor='company'
              className='pb-2 font-semibold text-slate-600'
            >
              Select company :
            </label>
            <select
              type='text'
              name='company'
              value={product.company}
              onChange={onChange}
              className='p-2 border border-slate-400 focus:outline-none'
              required
            >
              <option value=''>Select a company</option>
              {companies?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor='color'
              className='pb-2 font-semibold text-slate-600'
            >
              Color Picker :
            </label>
            <input
              type='color'
              name='color'
              value={product.color}
              placeholder='Color'
              className='w-full h-full border border-slate-400 bg-white focus:outline-none'
              onChange={onChange}
              required
            />
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor='price'
              className='pb-2 font-semibold text-slate-600'
            >
              Fetcher Product ? :
            </label>
            <Radio.Group
              name='fetcher'
              onChange={onChange}
              value={product.fetcher}
              required
            >
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </div>
        </div>
        {/* 2 name , price, discount, quantity*/}
        <div className='grid grid-cols-3 gap-3 my-5'>
          <div className='flex flex-col'>
            <label htmlFor='name' className='pb-2 font-semibold text-slate-600'>
              Write Product's Name :
            </label>
            <input
              type='text'
              name='name'
              value={product.name}
              placeholder='write a name'
              className='p-2 border border-slate-400 focus:outline-none'
              onChange={onChange}
              required
            />
          </div>
          <div className='flex flex-col col-span-2'>
            <div className='grid grid-cols-3 gap-3'>
              <div className='flex flex-col'>
                <label
                  htmlFor='price'
                  className='pb-2 font-semibold text-slate-600'
                >
                  Regular Price :
                </label>
                <input
                  type='number'
                  name='price'
                  value={product.price}
                  placeholder={`Product's Price`}
                  className='p-2 border border-slate-400 focus:outline-none'
                  onChange={onChange}
                  required
                />
              </div>
              <div className='flex flex-col'>
                <label
                  htmlFor='discount'
                  className='pb-2 font-semibold text-slate-600'
                >
                  Discount %:
                </label>

                <input
                  type='number'
                  name='discount'
                  value={product.discount}
                  placeholder={`Discount in %`}
                  className='p-2 border border-slate-400 focus:outline-none'
                  onChange={onChange}
                  required
                />
              </div>
              <div className='flex flex-col'>
                <label
                  htmlFor='quantity'
                  className='pb-2 font-semibold text-slate-600'
                >
                  Quantity :
                </label>
                <input
                  type='number'
                  name='quantity'
                  value={product.quantity}
                  placeholder={`Product's Quantity`}
                  className='p-2 border border-slate-400 focus:outline-none'
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3 description +  img*/}
        <div className='grid grid-cols-2 gap-3 my-5'>
          <div className='flex flex-col'>
            <label
              htmlFor='description'
              className='pb-2 font-semibold text-slate-600'
            >
              Write Product's Description :
            </label>
            <textarea
              type='text'
              name='description'
              value={product.description}
              placeholder='write a description'
              className='p-2 border border-slate-400 focus:outline-none'
              rows={8}
              onChange={onChange}
              required
            />
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor='photo'
              className='pb-2 font-semibold text-slate-600'
            >
              Upload Product's Photo:
            </label>

            <div className='grid grid-cols-2 gap-3'>
              <label className='border border-slate-400 h-48 flex items-center justify-center'>
                {product.photo ? (
                  <img
                    className='object-fill h-full w-full'
                    src={URL.createObjectURL(product.photo)}
                    alt='Product Image'
                  />
                ) : product.img === undefined ? (
                  <span>Image 1</span>
                ) : (
                  <img
                    className='object-fill h-full w-full'
                    src={product.img}
                    alt='1'
                  />
                )}
                <input
                  type='file'
                  name='image'
                  accept='image/*'
                  onChange={handleImage}
                  hidden
                />
              </label>

              <label className='border border-slate-400 h-48 flex items-center justify-center'>
                {product.photo2 ? (
                  <img
                    className='object-fill h-full w-full'
                    src={URL.createObjectURL(product.photo2)}
                    alt='Product Photo2'
                  />
                ) : product.img2 === undefined ? (
                  <span>Product Image 2</span>
                ) : (
                  <img
                    className='object-fill h-full w-full'
                    src={product.img2}
                    alt='2'
                  />
                )}
                <input
                  type='file'
                  name='image'
                  accept='image/*'
                  onChange={handleImage2}
                  hidden
                />
              </label>
            </div>
            <span className='text-red-400 text-center text-xs'>
              If you want to change images then select both images otherwise the
              selected image is only uploaded.
            </span>
          </div>
        </div>

        {/* button */}
        <div className='mb-3'>
          <button
            className='border border-slate-400 p-2 px-10 text-slate-600 transition-all bg-slate-100 hover:bg-slate-500 hover:text-white'
            type='submit'
          >
            UPDATE
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
