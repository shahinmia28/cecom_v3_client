import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Radio } from 'antd';
import API from '../../components/Api';
import ManageProduct from './ManageProduct';

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    category: '',
    company: '',
    quantity: '',
    fetcher: false,
    color: '#000000',
    photo: '',
    photo2: '',
  });
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const handleImage = (e) => {
    setProduct({
      ...product,
      photo: e.target.files[0],
    });
  };
  const handleImage2 = (e) => {
    setProduct({
      ...product,
      photo2: e.target.files[0],
    });
  };
  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${API}/api/category/get-all`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something wwent wrong in getting catgeory');
    }
  };
  // get company
  const getAllCompany = async () => {
    try {
      const { data } = await axios.get(`${API}/api/company/get-all`);
      if (data?.success) {
        setCompanies(data?.company);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append('name', product.name);
      productData.append('description', product.description);
      productData.append('price', product.price);
      productData.append('discount', product.discount);
      productData.append('quantity', product.quantity);
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
      const { data } = await axios.post(
        `${API}/api/product/create`,
        productData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (data?.success) {
        toast.success('Product Created Successfully');
      }
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllCompany();
  }, []);

  return (
    <div className='p-10'>
      <form onSubmit={handleCreate} className='max-w-screen-lg m-auto'>
        <h1 className='text-center text-xl font-semibold p-2 bg-slate-200'>
          Create Product
        </h1>
        {/* 1 */}
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
              Select Company :
            </label>
            <select
              type='text'
              name='company'
              value={product.company}
              onChange={onChange}
              className='p-2 border border-slate-400 focus:outline-none'
              required
            >
              <option value=''>Select a Company</option>
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
              placeholder='color'
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
        {/* 2 */}
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
        {/* 3 */}
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
              <label className='border border-slate-400 h-52 flex items-center justify-center'>
                {product.photo ? (
                  <img
                    className='object-fill h-full w-full'
                    src={URL.createObjectURL(product.photo)}
                    alt='Product Image'
                  />
                ) : (
                  <span>Image 1</span>
                )}
                <input
                  type='file'
                  name='image'
                  accept='image/*'
                  onChange={handleImage}
                  hidden
                  required
                />
              </label>
              <label className='border border-slate-400 h-52 flex items-center justify-center'>
                {product.photo2 ? (
                  <img
                    className='object-fill h-full w-full'
                    src={URL.createObjectURL(product.photo2)}
                    alt='slider_photo2'
                  />
                ) : (
                  <span>Image 2</span>
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
          </div>
        </div>
        <div className='mb-3'>
          <button
            className='border border-slate-400 p-2 px-10 text-slate-600 transition-all bg-slate-100 hover:bg-slate-500 hover:text-white'
            type='submit'
          >
            CREATE
          </button>
        </div>
      </form>
      <div className='py-5'>
        <h1 className='text-center text-xl font-semibold p-2 bg-slate-200'>
          Manage Product
        </h1>
        <ManageProduct />
      </div>
    </div>
  );
};

export default CreateProduct;
