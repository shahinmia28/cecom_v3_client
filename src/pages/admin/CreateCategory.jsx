import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Modal } from 'antd';
import API from '../../components/Api';
import { useProductContext } from '../../context_reducer/context/productContext';

const CreateCategory = () => {
  const { categories, getCategory } = useProductContext();
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const [updatedName, setUpdatedName] = useState('');
  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API}/api/category/create`, {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getCategory();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('something went wrong in input form');
    }
  };

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${API}/api/category/update/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName('');
        setVisible(false);
        getCategory();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error('Somtihing went wrong');
    }
  };
  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(`${API}/api/category/delete/${pId}`);
      if (data?.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error('Somtihing went wrong');
    }
  };
  return (
    <div className='p-10'>
      <div className='max-w-screen-md m-auto'>
        <h1 className='text-center text-xl font-semibold pb-5'>
          Manage Category
        </h1>
        <form
          onSubmit={handleSubmit}
          className='flex justify-between items-center'
        >
          <input
            type='text'
            className='w-[80%] p-2 border border-slate-400 focus:outline-none'
            placeholder='Enter new category Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type='submit'
            className='border border-slate-400 w-[19%] p-2 text-slate-500 transition-all bg-slate-100 hover:bg-slate-500 hover:text-white'
          >
            Create
          </button>
        </form>
        <div className='py-5'>
          <div className='w-full'>
            <ul className=''>
              <li className='p-3 flex justify-between bg-slate-200 mb-2 font-semibold'>
                <span>Name</span>
                <span>Actions</span>
              </li>
              {categories?.map((c, i) => (
                <li
                  className='p-3 bg-slate-100 mb-2 flex justify-between'
                  key={i}
                >
                  <span>{c.name}</span>
                  <span>
                    <button
                      className=' text-sky-600 font-semibold mr-2'
                      onClick={() => {
                        setVisible(true);
                        setUpdatedName(c.name);
                        setSelected(c);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className=' text-red-600 font-semibold ml-2'
                      onClick={() => {
                        handleDelete(c._id);
                      }}
                    >
                      Delete
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
          <form
            onSubmit={handleUpdate}
            className='flex justify-between items-center p-10'
          >
            <input
              type='text'
              className='w-[80%] p-2 border'
              placeholder='Enter new category Name'
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
            <button
              type='submit'
              className='border w-[19%] p-2 text-slate-500 transition-all bg-slate-100 hover:bg-slate-500 hover:text-white'
            >
              Update
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default CreateCategory;
