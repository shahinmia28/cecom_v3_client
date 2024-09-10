import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context_reducer/context/authContext';
import API from '../../components/Api';
import moment from 'moment';
import toast from 'react-hot-toast';
import { RxCross2 } from 'react-icons/rx';
import styled from 'styled-components';
import Price from '../../components/Price';
import { NavLink } from 'react-router-dom';

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [message, setMessage] = useState('');

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${API}/api/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelOrder = async (_id) => {
    try {
      const { data } = await axios.delete(
        `${API}/api/product/cancel-order/${_id}`
      );
      toast.success(data?.message);
      if (auth?.token) getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  const notCancel = () => {
    setMessage(
      "You can't cancel this order right now. You can return the product from your door. Thanks"
    );
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <div className='px-2'>
      {orders?.length === 0 ? (
        <div className='flex h-screen justify-center items-center text-slate-500'>
          <h4>No Order Found </h4>
        </div>
      ) : (
        <>
          {orders?.map((o, i) => {
            return (
              <div
                key={i}
                className='grid grid-cols-3 gap-3 rounded-md  border border-orange-400 shadow my-4 p-3'
              >
                <div>
                  <div className='mb-3'>
                    <div className='my-2 p-2 font-semibold text-center border'>
                      <p>Order Details</p>
                    </div>
                    <div className='flex my-2 p-2 capitalize items-center justify-start border'>
                      <span className='font-semibold'>Status:</span>
                      <span className='ms-1'>{o?.status}</span>
                    </div>

                    <div className='flex my-2 p-2 items-center justify-start border'>
                      <span className='font-semibold'>Order Date :</span>
                      <p className='capitalize italic ms-2'>
                        {moment(o?.createdAt).fromNow()} /
                        <span className='font-bold text-orange-500 ms-1'>
                          {o?.createdAt.slice(0, 10)}
                        </span>
                      </p>
                    </div>
                    <div className='flex my-2 p-2 items-center justify-start border'>
                      <span className=' font-semibold'>Total Price:</span>
                      <span className='text-red-500 font-bold font-noto-sans-bengali ms-2'>
                        ৳{o?.totalPrice}
                      </span>
                    </div>

                    <div className='flex my-2 p-2 items-center justify-start border'>
                      <span className='font-semibold'>Payment:</span>
                      <span className='ms-2'>
                        {o?.payment ? (
                          <p className='text-xs'>
                            <span>SUCCESS</span>
                            <br />
                            <span>TRX_ID: {o?.transaction_id}</span>
                          </p>
                        ) : (
                          'Cash On Delivery'
                        )}
                      </span>
                    </div>

                    {/* address */}
                    <div className='my-2 border p-2'>
                      <span className='pb-2 font-semibold text-slate-700'>
                        Delivered To:
                      </span>
                      <div className='text-slate-500 flex flex-col text-sm'>
                        <span className='capitalize'>
                          {auth?.user?.first_name} {auth?.user?.last_name} |{' '}
                          {auth?.user?.phone}
                        </span>
                        <span className='capitalize'>
                          {auth?.user?.address?.division},{' '}
                          {auth?.user?.address?.city},{' '}
                          {auth?.user?.address?.village},{' '}
                          {auth?.user?.address?.post_code}
                        </span>
                        <NavLink
                          to={{
                            pathname: `/dashboard/${
                              auth?.user?.role === 1 ? 'admin' : 'user'
                            }/profile`,
                          }}
                          state={'ADDRESS'}
                          className='text-red-500 cursor-pointer hover:underline'
                        >
                          Change
                        </NavLink>
                      </div>
                    </div>

                    <div>
                      <RxCross2
                        className='text-red-500 hover:bg-red-500 hover:text-white rounded-md text-2xl p-1 cursor-pointer'
                        onClick={() => {
                          if (
                            o?.status === 'Shipped' ||
                            o?.status === 'Delivered'
                          ) {
                            notCancel();
                            console.log('cancel');
                          } else {
                            handleCancelOrder(o?._id);
                          }
                        }}
                      />
                      <br />
                      <span>{message}</span>
                    </div>
                  </div>
                </div>
                <div className='col-span-2'>
                  {o?.products?.map((p, i) => (
                    <div
                      key={i}
                      className='border my-2 rounded-md flex justify-start items-center p-1'
                    >
                      <div className='flex items-center'>
                        <img
                          src={p?.product?.images[0]?.url}
                          alt={p?.product.name}
                          width='80px'
                          height='80px'
                          className='border rounded-md'
                        />
                      </div>
                      <div className='ms-5  w-full'>
                        <h6 className='capitalize font-semibold'>
                          {p?.product.name}
                        </h6>

                        <div className='flex justify-between items-center '>
                          <div className='w-fit'>
                            <Price p={p?.product} />
                          </div>
                          <div className='flex items-center '>
                            <p
                              className='w-fit px-1 me-3'
                              style={{ background: p?.product?.color }}
                            >
                              {p?.product?.color}
                            </p>
                            <p className='text-sm font-bold'>QTY: {p.amount}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default MyOrder;
