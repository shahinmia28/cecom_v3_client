import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context_reducer/context/authContext';
import moment from 'moment';
import { Select } from 'antd';
import API from '../../components/Api';

import toast from 'react-hot-toast';
import { RxCross2 } from 'react-icons/rx';
import Price from '../../components/Price';
import { NavLink } from 'react-router-dom';
const { Option } = Select;

const AllOrder = () => {
  const [status, setStatus] = useState([
    'Not Process',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancel',
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${API}/api/order/all-orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelOrder = async (_id) => {
    let sure = windows.alert('are you sure?');
    console.log(sure);
    try {
      if (sure) {
        const { data } = await axios.delete(
          `${API}/api/product/cancel-order/${_id}`
        );
        toast.success(data?.message);
        if (auth?.token) getOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(`${API}/api/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='px-3'>
      {orders?.map((o, i) => {
        return (
          <div
            key={i}
            className='border border-orange-300 shadow rounded-md my-5 p-2'
          >
            <div className='grid grid-cols-3 gap-3'>
              <div>
                <div className='my-2 font-semibold p-2 text-center border'>
                  <p>Order Details</p>
                </div>
                <div className='flex my-2 p-2 capitalize items-center justify-start border'>
                  <span className='font-semibold'>Status:</span>
                  <span>
                    <Select
                      variant={false}
                      onChange={(value) => handleChange(o._id, value)}
                      defaultValue={o?.status}
                    >
                      {status.map((s, i) => (
                        <Option key={i} value={s}>
                          {s}
                        </Option>
                      ))}
                    </Select>
                  </span>
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
                      {o?.buyer?.first_name} {o?.buyer?.last_name} |{' '}
                      {o?.buyer?.phone}
                    </span>
                    <span> {o?.buyer?.email}</span>
                    <span className='capitalize'>
                      {o?.buyer?.address?.division}, {o?.buyer?.address?.city},{' '}
                      {o?.buyer?.address?.village},{' '}
                      {o?.buyer?.address?.post_code}
                    </span>
                  </div>
                </div>
                {/* cancel */}
                <div>
                  <RxCross2
                    className='text-red-500 hover:bg-red-500 hover:text-white rounded-md text-2xl p-1 cursor-pointer '
                    onClick={() => handleCancelOrder(o?._id)}
                  />
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
          </div>
        );
      })}
    </div>
  );
};

export default AllOrder;
