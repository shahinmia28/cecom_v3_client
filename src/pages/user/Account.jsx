import React, { useState } from 'react';
import { useAuth } from '../../context_reducer/context/authContext';
import axios from 'axios';
import API from '../../components/Api';
import { IoCameraReverseSharp } from 'react-icons/io5';
import toast from 'react-hot-toast';
import Address from './Address';

const Account = () => {
  const [auth, setAuth] = useAuth();
  const [edit, setEdit] = useState(false);

  const [emailBtn, setEmailBtn] = useState(false);
  const [email, setEmail] = useState(auth?.user?.email);

  const [passBtn, setPassBtn] = useState(false);
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [userData, setUserData] = useState({
    name: auth?.user?.name,
    answer: auth?.user?.answer,
    gender: auth?.user?.gender,
    phone: auth?.user?.phone,
    date_of_birth: auth?.user?.date_of_birth,
    photo: '',
  });
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  // img
  const handleImage = (e) => {
    setUserData({
      ...userData,
      photo: e.target.files[0],
    });
  };
  // info
  const handleSave = async (e) => {
    try {
      const userInfo = new FormData();
      userInfo.append('name', userData.name);
      userInfo.append('answer', userData.answer);
      userInfo.append('gender', userData.gender);
      userInfo.append('phone', userData.phone);
      userInfo.append('date_of_birth', userData.date_of_birth);
      if (userData.photo) {
        userInfo.append('image', userData.photo);
      }
      const { data } = await axios.put(
        `${API}/api/auth/profile-update`,
        userInfo,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (data?.success) {
        toast.success('success');
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
  // email
  const handleEmailChange = async (e) => {
    try {
      const { data } = await axios.put(`${API}/api/auth/email-change`, {
        email: auth?.user?.email,
        newEmail: email,
        password,
      });
      if (data?.success) {
        toast.success('success');
        setAuth({ ...auth, userData: data?.updatedUser });
        let ls = localStorage.getItem('auth');
        ls = JSON.parse(ls);
        ls.userData = data.updatedUser;
        localStorage.setItem('auth', JSON.stringify(ls));
        setEmailBtn(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // password
  const handlePasswordChange = async (e) => {
    try {
      const { data } = await axios.put(`${API}/api/auth/password-update`, {
        email,
        oldPassword,
        newPassword,
      });
      if (data?.success) {
        toast.success('Password Changed successfully');
        setPassBtn(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='account' id='account'>
      <div className='title w-full flex justify-between items-center p-4 px-10'>
        <h2 className='text-md md:text-xl font-semibold'>Account</h2>
        <div className='button'>
          {edit ? (
            <div>
              <button
                className=' border border-orange-400 text-orange-400 hover:border-orange-600 rounded-md hover:text-orange-600 p-1.5 md:w-28'
                onClick={() => handleSave()}
              >
                Save
              </button>
              <button
                className='border border-orange-400 text-orange-400 hover:border-orange-600 rounded-md hover:text-orange-600 p-1.5 md:w-28 ms-3'
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
          <form className='md:grid md:grid-cols-2 gap-4'>
            {/* image */}
            <div className='flex flex-col col-span-2 m-auto pb-5'>
              <label className='w-40 h-40 overflow-hidden rounded-full border'>
                {userData.photo ? (
                  <div className='relative'>
                    <img
                      src={URL.createObjectURL(userData.photo)}
                      alt='user_photo'
                      className='w-full h-full m-auto'
                    />
                    <span
                      className={`group absolute top-0 left-0 opacity-0 bg-transparent w-full h-full flex justify-center items-center transition-all  ${
                        edit
                          ? 'cursor-pointer hover:opacity-100'
                          : 'cursor-not-allowed'
                      } `}
                    >
                      <IoCameraReverseSharp
                        className={`transition-all text-black size-10 ${
                          edit ? 'group-hover:size-12 opacity-100 ' : ''
                        } `}
                      />
                    </span>
                  </div>
                ) : auth?.user?.image[0]?.url ? (
                  <div className='relative'>
                    <img
                      src={auth?.user?.image[0]?.url}
                      alt='img'
                      className='w-full h-full m-auto'
                    />
                    <span
                      className={`group absolute top-0 left-0 opacity-0 bg-transparent w-full h-full flex justify-center items-center transition-all  ${
                        edit
                          ? 'cursor-pointer opacity-50 hover:opacity-100'
                          : 'cursor-not-allowed'
                      } `}
                    >
                      <IoCameraReverseSharp
                        className={`transition-all text-black size-10 ${
                          edit ? 'group-hover:size-12 opacity-100 ' : ''
                        } `}
                      />
                    </span>
                  </div>
                ) : (
                  <span
                    className={`group bg-orange-500 w-full h-full flex justify-center items-center  ${
                      edit ? 'cursor-pointer' : 'cursor-not-allowed'
                    } `}
                  >
                    <IoCameraReverseSharp
                      className={`transition-all text-black size-10 ${
                        edit ? 'group-hover:size-12' : ''
                      } `}
                    />
                  </span>
                )}
                <input
                  type='file'
                  name='image'
                  accept='image/*'
                  onChange={handleImage}
                  disabled={edit ? false : true}
                  hidden
                  required
                />
              </label>
            </div>

            <div className='flex flex-col'>
              <label
                htmlFor='name'
                className='py-2 text-gray-500 text-sm font-semibold'
              >
                Full Name
              </label>
              <input
                type='text'
                value={userData.name}
                onChange={(e) => handleChange(e)}
                placeholder='First Name'
                name='name'
                className={`mb-3 py-2 text-sm focus:outline-none border-gray-300 text-gray-700 border-b bg-white ${
                  edit && 'border p-2 rounded-sm'
                }`}
                disabled={edit ? false : true}
              />
            </div>
            <div className='flex flex-col '>
              <label
                htmlFor='answer'
                className='py-2 text-gray-500 text-sm font-semibold'
              >
                Enter the name of your best friend.
              </label>
              <input
                type='text'
                value={userData.answer}
                onChange={(e) => handleChange(e)}
                placeholder='answer'
                name='answer'
                className={`mb-3 py-2 text-sm focus:outline-none border-gray-300 text-gray-700 border-b bg-white ${
                  edit && 'border p-2 rounded-sm'
                }`}
                disabled={edit ? false : true}
              />
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor='phone'
                className='py-2 text-gray-500 text-sm font-semibold'
              >
                Phone Number
              </label>
              <input
                type='number'
                value={userData.phone}
                onChange={(e) => handleChange(e)}
                placeholder='Phone Number'
                name='phone'
                className={`mb-3 py-2 text-sm focus:outline-none border-gray-300 text-gray-700 border-b bg-white ${
                  edit && 'border p-2 rounded-sm'
                }`}
                disabled={edit ? false : true}
              />
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor='gender'
                className='py-2 text-gray-500 text-sm font-semibold'
              >
                Gender
              </label>
              <input
                type='text'
                value={userData.gender}
                onChange={(e) => handleChange(e)}
                placeholder='Male , Female, Other'
                name='gender'
                className={`mb-3 py-2 text-sm focus:outline-none border-gray-300 text-gray-700 border-b bg-white ${
                  edit && 'border p-2 rounded-sm'
                }`}
                disabled={edit ? false : true}
              />
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor='date_of_birth'
                className={`py-2 text-gray-500 text-sm font-semibold`}
              >
                Date Of Birth
              </label>
              <input
                type='date'
                value={userData.date_of_birth}
                onChange={(e) => handleChange(e)}
                name='date_of_birth'
                className={`mb-3 py-2 text-sm focus:outline-none border-gray-300 text-gray-700 border-b bg-white ${
                  edit && 'border p-2 rounded-sm'
                }`}
                disabled={edit ? false : true}
              />
            </div>
          </form>
        </div>
      </div>
      <hr />
      {/* password Email */}
      <div className='email_password p-4 px-10'>
        <div className='md:grid md:grid-cols-2 gap-4'>
          {/* email */}
          <div className='email'>
            <div className='flex flex-col'>
              <label
                htmlFor='date_of_birth'
                className={`py-2 text-gray-500 text-sm font-semibold`}
              >
                Your Email
              </label>
              <div className={emailBtn ? `grid grid-cols-2 gap-3` : ''}>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name='email'
                  placeholder='Your Email'
                  className={`mb-3 py-2 text-sm focus:outline-none border-gray-300 text-gray-700 border-b bg-white w-full ${
                    emailBtn && 'border p-2 rounded-sm'
                  }`}
                  disabled={emailBtn ? false : true}
                />
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name='Password'
                  placeholder='Password'
                  className={`mb-3 py-2 text-sm focus:outline-none border-gray-300 text-gray-700 border-b bg-white ${
                    emailBtn ? 'border p-2 rounded-sm visible' : 'invisible w-0'
                  }`}
                />
              </div>
            </div>

            <div className='button'>
              {emailBtn ? (
                <div>
                  <button
                    className='  text-orange-400 hover:text-orange-600 p-1.5  text-sm me-4 underline'
                    onClick={() => setEmailBtn(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className=' text-orange-400 hover:text-orange-600 py-1.5  text-sm underline'
                    onClick={() => handleEmailChange()}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  className='text-slate-400 hover:text-orange-600 underline py-1.5 text-sm'
                  onClick={() => setEmailBtn(true)}
                >
                  Change Email Address
                </button>
              )}
            </div>
          </div>
          {/* password */}
          <div className='password w-full '>
            <div className='flex flex-col w-full '>
              <label
                htmlFor='password'
                className={`py-2 text-gray-500 text-sm font-semibold`}
              >
                Password
              </label>
              <div className={passBtn ? `grid grid-cols-2 gap-3` : ''}>
                <input
                  type='password'
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  name='oldPassword'
                  placeholder={passBtn ? 'Old Password' : '******'}
                  className={`mb-3 py-2 text-sm focus:outline-none border-gray-300 text-gray-700 border-b bg-white w-full ${
                    passBtn && 'border p-2 rounded-sm'
                  }`}
                  disabled={passBtn ? false : true}
                />
                <input
                  type='password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  name='NewPassword'
                  placeholder='New Password'
                  className={`mb-3 py-2 text-sm focus:outline-none border-gray-300 text-gray-700 border-b bg-white ${
                    passBtn ? 'border p-2 rounded-sm visible' : 'invisible w-0'
                  }`}
                />
              </div>
            </div>

            <div className='button'>
              {passBtn ? (
                <div>
                  <button
                    className='  text-orange-400 hover:text-orange-600 p-1.5  text-sm me-4 underline'
                    onClick={() => setPassBtn(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className=' text-orange-400 hover:text-orange-600 py-1.5  text-sm underline'
                    onClick={() => handlePasswordChange()}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  className='text-slate-400 hover:text-orange-600 underline py-1.5 text-sm'
                  onClick={() => setPassBtn(true)}
                >
                  Change Password
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* address */}
      <div className='address'>
        <Address />
      </div>
    </div>
  );
};

export default Account;
