import { TbSearch } from 'react-icons/tb';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { MdOutlineShoppingCart, MdAssignmentReturn } from 'react-icons/md';
import { VscAccount } from 'react-icons/vsc';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { FiPhoneCall } from 'react-icons/fi';
import { LuClipboardList } from 'react-icons/lu';
import { GiSelfLove } from 'react-icons/gi';
import { IoIosArrowForward } from 'react-icons/io';
import { HiHome } from 'react-icons/hi2';
import { FaUsersBetweenLines } from 'react-icons/fa6';
import { TfiLayoutGrid3 } from 'react-icons/tfi';

import { useAuth } from '../context_reducer/context/authContext';
import toast from 'react-hot-toast';
import { HashLink } from 'react-router-hash-link';
import { useSearchContext } from '../context_reducer/context/SearchContext';

const Header = () => {
  const { searchTerm, setSearchTerm } = useSearchContext();
  const navigate = useNavigate();
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const searchSubmit = (e) => {
    e.preventDefault();
    navigate('/products');
  };

  const [showMenu, setShowMenu] = useState(false);
  const [auth, setAuth] = useAuth();
  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    });
    localStorage.removeItem('auth');
    setShowMenu(false);
    toast.success('Logout Successful');
  };
  return (
    <div className='z-30 header relative w-full pb-20' id='top'>
      <div className='fixed w-full bg-indigo-600'>
        <div className='container_my '>
          <div className='flex justify-between items-center flex-row py-1 md:py-3'>
            <div className='basis-1/4'>
              <HashLink
                to={'/#top'}
                smooth
                className='logo pe-3 text-white font-bold text-[50px] leading-none flex items-center'
              >
                <span>e</span>
                <span className='font-mono italic text-2xl'>Shop</span>
              </HashLink>
            </div>
            <div className='basis-1/2'>
              <form
                className='w-full flex px-0 md:px-10'
                onSubmit={searchSubmit}
              >
                <input
                  className='w-full p-1 md:p-2 focus:outline-none'
                  type='text'
                  name='search'
                  placeholder='Search Product'
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <button
                  type='submit'
                  className='w-10 bg-indigo-100 transition-all hover:bg-orange-500 hover:text-white flex justify-center items-center'
                >
                  <TbSearch className='size-5' />
                </button>
              </form>
            </div>
            <div className='basis-1/4'>
              <ul className='flex justify-end items-center text-white'>
                <li className='order-1 mx-3 cursor-pointer hover:text-sky-200'>
                  <NavLink to={'/cart'}>
                    <MdOutlineShoppingCart size={25} />
                  </NavLink>
                </li>
                <li className='order-2 cursor-pointer hover:text-sky-200'>
                  <span onClick={() => setShowMenu(!showMenu)}>
                    <GiHamburgerMenu size={25} />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* site menu */}
      <div
        className={`site-menu fixed top-0 right-0 z-50 h-screen overflow-hidden transition-transform duration-500 ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        } w-80 bg-white shadow-xl shadow-sky-200 rounded-l-2xl`}
      >
        <div className='h-full overflow-y-auto p-6'>
          <div>
            <div className='user-info relative'>
              <div className='hide-menu flex right-2 top-2 absolute justify-end'>
                <span
                  className='text-white cursor-pointer rounded-full p-1 hover:bg-rose-500  transition duration-500 '
                  onClick={() => setShowMenu(false)}
                >
                  <RxCross2 size={25} />
                </span>
              </div>
              <div className='w-full h-32 rounded-md bg-slate-400 flex justify-start items-center'>
                <div className='p-img w-20 h-20 rounded-full mx-2 flex justify-center items-center bg-white text-sky-500 order-1'>
                  <img
                    src={
                      auth?.user ? auth?.user?.image[0]?.url : './default.jpg'
                    }
                    alt='image'
                    className='rounded-full w-20 h-20 p-1'
                  />
                </div>
                <div className='p-name order-2 font-semibold text-white'>
                  <h3>{auth?.user ? auth?.user?.name : 'name'}</h3>
                  <span>
                    #{auth?.user ? auth?.user?._id.slice(0, 8) : '#####'}
                  </span>
                </div>
              </div>
            </div>
            <hr />

            <div className='account-manage my-3'>
              <ul>
                <li>
                  <HashLink
                    to={'/#top'}
                    smooth
                    onClick={() => setShowMenu(false)}
                    className='flex justify-start items-center py-1 my-1'
                  >
                    <span className='bg-indigo-600 me-2 p-2 text-white rounded-full'>
                      <HiHome size={17} />
                    </span>
                    <span className='hover:text-sky-500'>Home</span>
                  </HashLink>
                </li>
                <li>
                  <HashLink
                    to={'products/#top'}
                    smooth
                    onClick={() => setShowMenu(false)}
                    className='flex justify-start items-center py-1 my-1'
                  >
                    <span className='bg-orange-600 me-2 p-2 text-white rounded-full'>
                      <TfiLayoutGrid3 size={17} />
                    </span>
                    <span className='hover:text-sky-500'>Products</span>
                  </HashLink>
                </li>
                <li>
                  <HashLink
                    smooth
                    to={`/dashboard/${
                      auth?.user?.role === 1
                        ? 'admin/profile/#top'
                        : 'user/profile/#top'
                    }`}
                    onClick={() => setShowMenu(false)}
                    className='flex justify-start items-center py-1 my-1'
                  >
                    <span className='bg-sky-500 me-2 p-2 text-white rounded-full'>
                      <VscAccount size={17} />
                    </span>
                    <span className='hover:text-sky-500'> Profile</span>
                  </HashLink>
                </li>
                <li>
                  <HashLink
                    to={'/my_order/#top'}
                    smooth
                    onClick={() => setShowMenu(false)}
                    className='flex justify-start items-center py-1 my-1'
                  >
                    <span className='bg-rose-500 me-2 p-2 text-white rounded-full'>
                      <LuClipboardList size={17} />
                    </span>
                    <span className='hover:text-sky-500'> My Order</span>
                  </HashLink>
                </li>
                <li>
                  <HashLink
                    to={'/my_wishlist/#top'}
                    smooth
                    onClick={() => setShowMenu(false)}
                    className='flex justify-start items-center py-1 my-1'
                  >
                    <span className='bg-violet-500 me-2 p-2 text-white rounded-full'>
                      <GiSelfLove size={17} />
                    </span>
                    <span className='hover:text-sky-500'> My Wishlist</span>
                  </HashLink>
                </li>
                <li>
                  <HashLink
                    smooth
                    to={'/contact/#top'}
                    onClick={() => setShowMenu(false)}
                    className='flex justify-start items-center py-1'
                  >
                    <span className='bg-cyan-500 me-2 p-2 text-white rounded-full'>
                      <FiPhoneCall size={17} />
                    </span>
                    <span className='hover:text-sky-500'>Contact</span>
                  </HashLink>
                </li>
                <li>
                  <HashLink
                    smooth
                    to={'/about/#top'}
                    onClick={() => setShowMenu(false)}
                    className='flex justify-start items-center py-1'
                  >
                    <span className='bg-lime-500 me-2 p-2 text-white rounded-full'>
                      <FaUsersBetweenLines size={17} />
                    </span>
                    <span className='hover:text-sky-500'>About Us</span>
                  </HashLink>
                </li>
                <li>
                  <HashLink
                    smooth
                    to={'/return_policy/#top'}
                    onClick={() => setShowMenu(false)}
                    className='flex justify-start items-center py-1'
                  >
                    <span className='bg-teal-500 me-2 p-2 text-white rounded-full'>
                      <MdAssignmentReturn size={17} />
                    </span>
                    <span className='hover:text-sky-500'>Return Policy</span>
                  </HashLink>
                </li>
              </ul>
            </div>
            <hr />

            <hr />
            <div className='logout my-3 w-full flex text-center'>
              {auth?.user ? (
                <button
                  onClick={() => handleLogOut()}
                  className='bg-red-500 uppercase w-full text-white p-2.5 text-md rounded-md font-semibold hover:bg-red-600'
                >
                  Log Out
                </button>
              ) : (
                <HashLink
                  smooth
                  to={`/login/#top`}
                  onClick={() => setShowMenu(false)}
                  className='bg-green-500 uppercase w-full text-white p-2.5 text-md rounded-md font-semibold hover:bg-green-600'
                >
                  Login
                </HashLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
