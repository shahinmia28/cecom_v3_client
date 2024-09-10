import React, { useState } from 'react';
import { useAuth } from '../../context_reducer/context/authContext';
import API from '../../components/Api';
import axios from 'axios';

const Address = () => {
  const [auth, setAuth] = useAuth();
  const [edit, setEdit] = useState(false);

  const [userAddress, setUserAddress] = useState({
    division: auth?.user?.address?.division,
    city: auth?.user?.address?.city,
    village: auth?.user?.address?.village,
    post_code: auth?.user?.address?.post_code,
  });
  const handleChange = (e) => {
    setUserAddress({
      ...userAddress,
      [e.target.name]: e.target.value,
    });
  };
  // info
  const handleSave = async () => {
    try {
      const { data } = await axios.put(`${API}/api/auth/address-update`, {
        userAddress,
      });

      if (data?.success) {
        // alert('success');
        setAuth({ ...auth, userData: data?.updatedUser });
        let ls = localStorage.getItem('auth');
        ls = JSON.parse(ls);
        ls.userData = data.updatedUser;
        localStorage.setItem('auth', JSON.stringify(ls));
        setEdit(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='account' id='account'>
      <div className='title w-full flex justify-between items-center p-4 px-10 bg-slate-100'>
        <h2 className='text-xl font-semibold'>Address</h2>
        <div className='button'>
          {edit ? (
            <div>
              <button
                className=' border border-orange-400 text-orange-400 hover:border-orange-600 rounded-md hover:text-orange-600 p-1.5 w-28'
                onClick={() => handleSave()}
              >
                Save
              </button>
              <button
                className='border border-orange-400 text-orange-400 hover:border-orange-600 rounded-md hover:text-orange-600 p-1.5 w-28 ms-3'
                onClick={() => setEdit(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <button
                className=' border border-slate-400 text-slate-400 hover:border-orange-600 rounded-md hover:text-orange-600 p-1.5 w-28'
                onClick={() => setEdit(true)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
      <hr />
      <div className='main-data my-3'>
        <div className='p-4 px-10'>
          <form className='grid grid-cols-1 md:grid-cols-2 gap-4 capitalize'>
            <div className='flex flex-col'>
              <label
                htmlFor='division'
                className='py-2 text-gray-500 text-sm font-semibold'
              >
                Division / State
              </label>
              <input
                type='text'
                value={userAddress.division}
                onChange={(e) => handleChange(e)}
                placeholder='Division / State'
                name='division'
                className={`mb-3 py-2 text-sm focus:outline-none border-gray-300 text-gray-700 border-b bg-white ${
                  edit && 'border p-2 rounded-sm'
                }`}
                disabled={edit ? false : true}
              />
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor='city'
                className='py-2 text-gray-500 text-sm font-semibold'
              >
                City / District
              </label>
              <input
                type='text'
                value={userAddress.city}
                onChange={(e) => handleChange(e)}
                placeholder='City'
                name='city'
                className={`mb-3 py-2 text-sm focus:outline-none border-gray-300 text-gray-700 border-b bg-white ${
                  edit && 'border p-2 rounded-sm'
                }`}
                disabled={edit ? false : true}
              />
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor='village'
                className='py-2 text-gray-500 text-sm font-semibold'
              >
                Village / House Area
              </label>
              <input
                type='text'
                value={userAddress.village}
                onChange={(e) => handleChange(e)}
                placeholder='Home Address'
                name='village'
                className={`mb-3 py-2 text-sm focus:outline-none border-gray-300 text-gray-700 border-b bg-white ${
                  edit && 'border p-2 rounded-sm'
                }`}
                disabled={edit ? false : true}
              />
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor='post_code'
                className='py-2 text-gray-500 text-sm font-semibold'
              >
                Post Code
              </label>
              <input
                type='number'
                value={userAddress.post_code}
                onChange={(e) => handleChange(e)}
                placeholder='Post code'
                name='post_code'
                className={`mb-3 py-2 text-sm focus:outline-none border-gray-300 text-gray-700 border-b bg-white ${
                  edit && 'border p-2 rounded-sm'
                }`}
                disabled={edit ? false : true}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Address;
