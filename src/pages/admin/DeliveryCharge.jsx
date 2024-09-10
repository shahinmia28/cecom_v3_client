import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import API from '../../components/Api';

const DeliveryCharge = () => {
  const [deliveryCharge, setDeliveryCharge] = useState([]);

  const [insideDhaka, setInsideDhaka] = useState('');
  const [outsideDhaka, setOutsideDhaka] = useState('');

  const handleSubmit = async (e) => {
    try {
      const { data } = await axios.post(`${API}/api/other/delivery-charge`, {
        insideDhaka,
        outsideDhaka,
      });
      if (data?.success) {
        toast.success(data?.message);
        getDeliveryCharge();
      } else {
        toast.error(data?.error);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  const getDeliveryCharge = async () => {
    try {
      const { data } = await axios.get(`${API}/api/other/delivery-charge`);
      setDeliveryCharge(data.deliveryCharge);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDeliveryCharge();
  }, []);

  return (
    <div className='container-my p-3'>
      <form onSubmit={handleSubmit} className='p-4 w-2/3 m-auto capitalize'>
        <h4 className='text-slate-700 font-semibold text-center'>
          Manage Delivery Charge
        </h4>
        <div className='flex flex-col lg:flex-row justify-start items-center border border-slate-400 rounded-md my-3 overflow-hidden'>
          <label
            htmlFor='email'
            className='p-2 w-full lg:w-1/2 m-0 font-semibold'
          >
            Inside Dhaka city:
          </label>
          <input
            type='number'
            value={insideDhaka}
            onChange={(e) => setInsideDhaka(e.target.value)}
            className='border-none m-0 p-2 w-full lg:w-1/2 focus:outline-slate-300'
            placeholder={`Delivery Charge ${deliveryCharge[0]?.insideDhaka} Taka`}
            required
          />
        </div>
        <div className='flex flex-col lg:flex-row justify-start items-center border border-slate-400 rounded-md my-3 overflow-hidden '>
          <label
            htmlFor='email'
            className='p-2 w-full lg:w-1/2 m-0 font-semibold'
          >
            Outside Dhaka city:
          </label>
          <input
            type='number'
            value={outsideDhaka}
            onChange={(e) => setOutsideDhaka(e.target.value)}
            className='border-none m-0 p-2 w-full lg:w-1/2 focus:outline-slate-300'
            placeholder={`Delivery Charge ${deliveryCharge[0]?.outsideDhaka} Taka`}
            required
          />
        </div>
        <button
          type='submit'
          className='bg-green-400 p-2 px-5 rounded-md hover:bg-green-500 uppercase'
        >
          Update Delivery Charge
        </button>
      </form>
    </div>
  );
};
export default DeliveryCharge;
