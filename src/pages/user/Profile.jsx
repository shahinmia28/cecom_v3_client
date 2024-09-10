import { VscAccount } from 'react-icons/vsc';
import { MdOutlineReviews } from 'react-icons/md';
import { GrLocation } from 'react-icons/gr';
import { LuClipboardList } from 'react-icons/lu';
import { MdPayment } from 'react-icons/md';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import Account from './Account';
import MyOrder from './MyOrder';
import MyReview from './MyReview';
import PaymentMethod from './PaymentMethod';
import Knowledge from './Knowledge';
import Address from './Address';
import { useLocation } from 'react-router-dom';

const Profile = () => {
  const [data, setData] = useState('MANAGE_ACCOUNT');

  const location = useLocation();

  useEffect(() => {
    location?.state !== null
      ? setData(location?.state)
      : setData('MANAGE_ACCOUNT');
  }, [location]);

  const showData = () => {
    switch (data) {
      case 'MANAGE_ACCOUNT':
        return <Account />;
      case 'MY_ORDER':
        return <MyOrder />;
      case 'MY_REVIEW':
        return <MyReview />;
      case 'PAYMENT_METHODS':
        return <PaymentMethod />;
      case 'KNOWLEDGE':
        return <Knowledge />;
      case 'ADDRESS':
        return <Address />;
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
                <li
                  className={`px-4 py-3 bg-slate-50 hover:bg-slate-100 hover:text-orange-600 flex justify-start items-center border-y group cursor-pointer ${
                    data === 'MANAGE_ACCOUNT' && 'text-orange-600'
                  }`}
                  onClick={() => setData('MANAGE_ACCOUNT')}
                >
                  <span className='bg-slate-200 rounded-full p-3 me-2 group-hover:bg-orange-600 group-hover:text-white'>
                    <VscAccount size={22} />
                  </span>
                  <span className='text-md'>Manage Account</span>
                </li>
                <li
                  className={`px-4 py-3 bg-slate-50 hover:bg-slate-100 hover:text-orange-600 flex justify-start items-center border-b group cursor-pointer ${
                    data === 'MY_ORDER' && 'text-orange-600'
                  }`}
                  onClick={() => setData('MY_ORDER')}
                >
                  <span className='bg-slate-200 rounded-full p-3 me-2 group-hover:bg-orange-600 group-hover:text-white'>
                    <LuClipboardList size={22} />
                  </span>
                  <span className='text-md'>My Order</span>
                </li>
                <li
                  className={`px-4 py-3 bg-slate-50 hover:bg-slate-100 hover:text-orange-600 flex justify-start items-center border-b group cursor-pointer ${
                    data === 'MY_REVIEW' && 'text-orange-600'
                  }`}
                  onClick={() => setData('MY_REVIEW')}
                >
                  <span className='bg-slate-200 rounded-full p-3 me-2 group-hover:bg-orange-600 group-hover:text-white'>
                    <MdOutlineReviews size={22} />
                  </span>
                  <span className='text-md'>My Product Review</span>
                </li>
                <li
                  className={`px-4 py-3 bg-slate-50 hover:bg-slate-100 hover:text-orange-600 flex justify-start items-center border-b group cursor-pointer ${
                    data === 'ADDRESS' && 'text-orange-600'
                  }`}
                  onClick={() => setData('ADDRESS')}
                >
                  <span className='bg-slate-200 rounded-full p-3 me-2 group-hover:bg-orange-600 group-hover:text-white'>
                    <GrLocation size={22} />
                  </span>
                  <span className='text-md'>Manage Address</span>
                </li>
                <li
                  className={`px-4 py-3 bg-slate-50 hover:bg-slate-100 hover:text-orange-600 flex justify-start items-center border-b group cursor-pointer ${
                    data === 'PAYMENT_METHODS' && 'text-orange-600'
                  }`}
                  onClick={() => setData('PAYMENT_METHODS')}
                >
                  <span className='bg-slate-200 rounded-full p-3 me-2 group-hover:bg-orange-600 group-hover:text-white'>
                    <MdPayment size={22} />
                  </span>
                  <span className='text-md'>Saved Payment Methods</span>
                </li>
                <li
                  className={`px-4 py-3 bg-slate-50 hover:bg-slate-100 hover:text-orange-600 flex justify-start items-center border-b group cursor-pointer ${
                    data === 'KNOWLEDGE' && 'text-orange-600'
                  }`}
                  onClick={() => setData('KNOWLEDGE')}
                >
                  <span className='bg-slate-200 rounded-full p-3 me-2 group-hover:bg-orange-600 group-hover:text-white'>
                    <RiQuestionAnswerLine size={22} />
                  </span>
                  <span className='text-md'>Help & Knowledge</span>
                </li>
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

export default Profile;
