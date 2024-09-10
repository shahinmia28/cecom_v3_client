import { useEffect, useState } from 'react';
import Account from '../user/Account';
import MyReview from '../user/MyReview';
import PaymentMethod from '../user/PaymentMethod';
import Knowledge from '../user/Knowledge';
import CreateCategory from './CreateCategory';
import CreateProduct from './CreateProduct';
import CreateCompany from './CreateCompany';
import DeliveryCharge from './DeliveryCharge';
import { useLocation } from 'react-router-dom';
import AllOrder from './AllOrder';
import { adminMenuList } from '../../components/Data';

const AdminProfile = () => {
  const [data, setData] = useState('MANAGE_ACCOUNT');
  const location = useLocation();

  useEffect(() => {
    location?.state !== null
      ? setData(location?.state)
      : setData('MANAGE_ACCOUNT');
  }, []);

  // console.log(data);

  const showData = () => {
    switch (data) {
      case 'MANAGE_ACCOUNT':
        return <Account />;
      case 'ALL_ORDER':
        return <AllOrder />;
      case 'MY_REVIEW':
        return <MyReview />;
      case 'PAYMENT_METHODS':
        return <PaymentMethod />;
      case 'KNOWLEDGE':
        return <Knowledge />;
      case 'CATEGORY':
        return <CreateCategory />;
      case 'COMPANY':
        return <CreateCompany />;
      case 'PRODUCT':
        return <CreateProduct />;
      case 'DELIVERY_CHARGE':
        return <DeliveryCharge />;
    }
  };
  return (
    <div id='user_profile' className='relative'>
      <div className='lg:grid lg:grid-cols-4 h-screen'>
        <div className='h-full invisible lg:visible lg:col-span-1 z-10'>
          <div className='bg-white h-full w-1/4 fixed p-2 pt-24  top-0 left-0'>
            <div className='menu_wrap w-full h-full bg-white overflow-auto rounded-sm shadow_my'>
              <h2 className='title font-bold text-2xl text-center py-5'>
                My Account
              </h2>
              <ul className='text-slate-800'>
                {adminMenuList?.map((item, i) => {
                  const { name, title, icon: Icon } = item;
                  return (
                    <li
                      key={i}
                      className={`px-4 py-3 bg-slate-50 hover:bg-slate-100 hover:text-orange-600 flex justify-start items-center border-b group cursor-pointer ${
                        data === title && 'text-orange-600'
                      }`}
                      onClick={() => setData(title)}
                    >
                      <span className='bg-slate-200 rounded-full p-3 me-2 group-hover:bg-orange-600 group-hover:text-white'>
                        <Icon size={22} />
                      </span>
                      <span className='text-md'>{name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className='h-full col-span-3 z-10'>
          <div className='bg-white h-full w-full lg:w-3/4 fixed p-2 pt-24  top-0 right-0'>
            <div className='menu_wrap h-full bg-white overflow-auto rounded-sm shadow_my'>
              {showData()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
