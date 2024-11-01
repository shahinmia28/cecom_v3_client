import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import API from '../../components/Api';

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_fo_birth: '',
    password: '',
  });
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${API}/api/auth/register`, {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        password: user.password,
        date_fo_birth: user.date_fo_birth,
      });
      if (res.data.success) {
        toast.success('Registration success');
        // toast.success(res.data.message);
        navigate('/login');
      }
    } catch (error) {
      toast.error('Something wants wrong');
      console.log(error);
    }
  };
  return (
    <div className='form h-screen w-full p-3 flex justify-center items-center'>
      <div className='pb-5 shadow_my rounded-md w-[450px] m-auto'>
        <h2 className='w-full m-auto text-center p-5 font-semibold text-lg text-slate-700'>
          Sign Up
        </h2>

        <form
          onSubmit={handleSubmit}
          className='grid grid-cols-1 gap-4 m-4 mx-10 '
        >
          <div className='grid grid-cols-2 gap-4 justify-between'>
            <input
              type='text'
              value={user.first_name}
              onChange={(e) => onChange(e)}
              placeholder='First Name *'
              name='first_name'
              className={`text-sm focus:outline-none border-gray-300 text-gray-700 bg-white border p-2 rounded-sm w-full`}
              required
            />
            <input
              type='text'
              value={user.last_name}
              onChange={(e) => onChange(e)}
              placeholder='Last Name'
              name='last_name'
              className={`text-sm focus:outline-none border-gray-300 text-gray-700 bg-white border p-2 rounded-sm w-full `}
            />
          </div>

          <input
            type='email'
            value={user.email}
            onChange={(e) => onChange(e)}
            placeholder='Your Email*'
            name='email'
            className={`text-sm focus:outline-none border-gray-300 text-gray-700 bg-white border p-2 rounded-sm`}
            required
          />
          <input
            type='number'
            value={user.phone}
            onChange={(e) => onChange(e)}
            placeholder='Phone Number*'
            name='phone'
            className={`text-sm focus:outline-none border-gray-300 text-gray-700 bg-white border p-2 rounded-sm`}
            required
          />
          <input
            type='date'
            value={user.date_fo_birth}
            onChange={(e) => onChange(e)}
            placeholder='Date of Birth *'
            name='date fo birth'
            className={`text-sm focus:outline-none border-gray-300 text-gray-700 bg-white border p-2 rounded-sm`}
          />
          <input
            type='password'
            value={user.password}
            onChange={(e) => onChange(e)}
            placeholder='Password *'
            name='password'
            className={`text-sm focus:outline-none border-gray-300 text-gray-700 bg-white border p-2 rounded-sm`}
            required
          />

          <button
            type='submit'
            className='border py-1.5 text-md font-semibold rounded-sm border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white transition-all'
          >
            Register
          </button>

          <NavLink
            to={'/login'}
            className={`text-center text-sm hover:underline`}
          >
            Already Have An Account
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Register;
