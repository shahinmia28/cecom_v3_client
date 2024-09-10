import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context_reducer/context/authContext';
import API from '../../components/Api';

const Login = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${API}/api/auth/login`, {
        email: user.email,
        password: user.password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.userData,
          token: res.data.accessToken,
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state || '/');
      } else {
        toast.error(res.data.message);
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
          Login
        </h2>
        <form
          onSubmit={handleSubmit}
          className='grid grid-cols-1 gap-4 m-4 mx-10'
        >
          <input
            type='email'
            value={user.email}
            onChange={(e) => onChange(e)}
            placeholder='Your Email *'
            name='email'
            className={`text-sm focus:outline-none border-gray-300 text-gray-700 bg-white border p-2 rounded-sm`}
            required
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
            Submit
          </button>

          <div className='flex justify-between text-sm text-slate-600'>
            <NavLink to={'/forget-password'} className={`hover:underline`}>
              Forget Password
            </NavLink>
            <NavLink to={'/register'} className={`hover:underline`}>
              Create Account
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
