import { useAuth } from '../context_reducer/context/authContext';
import { NavLink, useNavigate } from 'react-router-dom';
import API from '../components/Api';
import toast from 'react-hot-toast';
import axios from 'axios';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Radio, Checkbox } from 'antd';
import { useCartContext } from '../context_reducer/context/cartContext';
import Amount from '../components/Amount';
import { RxCross2 } from 'react-icons/rx';
import Price from '../components/Price';

const CartPage = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const { cart } = useCartContext();
  const { setDecrement, setIncrement, removeItem } = useCartContext();
  const [deliveryCharge, setDeliveryCharge] = useState([]);

  const [shippingFee, setShippingFee] = useState('');

  // selected Product for order
  const handleSelectProduct = (value, p) => {
    let all = [...selectedProduct];
    if (value) {
      all.push(p);
    } else {
      all = all.filter((c) => {
        return c !== p;
      });
    }
    setSelectedProduct(all);
  };

  // get delivery charge data
  const getDeliveryCharge = async () => {
    try {
      const { data } = await axios.get(`${API}/api/other/delivery-charge`);
      await setDeliveryCharge(data?.deliveryCharge);
      await setShippingFee(data?.deliveryCharge[0]?.insideDhaka);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDeliveryCharge();
  }, []);

  // find selected product for price calculate
  let selectedProductForOrder = [];
  selectedProduct?.map((item) => {
    if (item) {
      return cart.filter((p) => {
        if (p.id === item) {
          return selectedProductForOrder.push(p);
        }
      });
    }
  });

  // total item selected
  let total_item_selected = 0;

  selectedProductForOrder.map((item) => {
    total_item_selected = total_item_selected + item.amount;
  });
  // total item
  let total_item = 0;
  cart.map((item) => {
    total_item = total_item + item.amount;
  });

  // sub total Price
  let subtotal = [];
  selectedProductForOrder.map((item) => {
    subtotal.push(item.product.sell_price * item.amount);
  });
  // final Price calculate
  let finalPrice = 0;
  subtotal.map((item) => {
    finalPrice = finalPrice + item;
  });

  // shipping Fee
  let shipping_fee = selectedProduct?.length < 1 ? 0 : shippingFee;

  // total price
  let totalPrice = finalPrice + shipping_fee;

  // handle check out
  const handleCheckOutWithPayment = async () => {
    try {
      const { data } = await axios.post(`${API}/api/order/order-checkout`, {
        product: selectedProductForOrder,
        user: auth?.user,
        totalPrice: totalPrice,
      });
      if (data) {
        window.location.replace(data.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle check out
  const handleCheckOutWithOutPayment = async () => {
    try {
      const { data } = await axios.post(
        `${API}/api/order/order-checkout-without-payment`,
        {
          product: selectedProductForOrder,
          user: auth?.user,
          totalPrice: totalPrice,
        }
      );
      if (data?.success) {
        // clearCart();
        // if (auth?.user?.role === 1) {
        //   navigate('/dashboard/admin/profile', { state: 'MY_ORDER' });
        // } else {
        //   navigate('/dashboard/user/profile', { state: 'MY_ORDER' });
        // }

        navigate('/#top');
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(cart);
  return (
    <Wrapper>
      <div className='container mx-auto w-[92%] xl:w-[88%] py-4 mb-10'>
        <div className='grid md:grid-cols-3 grid-cols-1 gap-4'>
          {/* product cart */}
          <div className='col-span-2'>
            <div className='border rounded-md my-3 p-2'>
              {total_item ? (
                <span>
                  Total {total_item} item{total_item > 1 ? 's are ' : ' is '}
                  available in your cart | ({total_item_selected} item
                  {total_item_selected > 1 ? 's are ' : ' is '} selected)
                </span>
              ) : (
                <span>Your Cart Is Empty</span>
              )}
            </div>
            {cart
              ?.map((item, i) => {
                return (
                  <Checkbox
                    key={i}
                    onChange={(e) =>
                      handleSelectProduct(e.target.checked, item.id)
                    }
                    className='check-box shadow-inner border hover:border-orange-300 w-full rounded-md p-2 my-2 relative transition-all'
                    id={item?._id}
                  >
                    {/* image */}
                    <div className='min-w-[15%]'>
                      <img
                        src={item?.product?.images[0].url}
                        alt={item?.product?.name}
                        className='border border-orange-200 rounded-sm w-full h-[120px]'
                      />
                    </div>
                    {/* cart body */}
                    <div className='capitalize min-w-full ms-0 lg:min-w-[85%] p-3 lg:ms-3 '>
                      <h5 className='text-md font-bold text-slate-700'>
                        {item?.product?.name}
                      </h5>
                      <div className='w-fit'>
                        <Price p={item?.product} />
                      </div>
                      {/* total */}
                      <div className=' w-fit flex justify-start items-center text-orange-400 border border-orange-400 rounded font-semibold text-md p-1 font-noto-sans-bengali'>
                        <p>৳{item?.product?.sell_price}</p>
                        <p className='mx-1'>x</p>
                        <p>{item?.amount}</p>
                        <p className='mx-1'>=</p>
                        <p className='text-red-500 '>
                          ৳{item?.product?.sell_price * item?.amount}
                        </p>
                      </div>
                      {/* color */}
                      <p
                        className='w-fit my-2 p-1'
                        style={{ background: item?.product?.color }}
                      >
                        {item?.product?.color}
                      </p>

                      {/* total quantity of product */}
                      <Amount
                        amount={item?.amount}
                        setDecrement={() => setDecrement(item?.id)}
                        setIncrement={() => setIncrement(item?.id)}
                      />
                    </div>
                    {/* delete btn */}
                    <button
                      className='border-none text-red-500 text-lg absolute top-3 right-3 hover:text-red-700'
                      onClick={() => removeItem(item?.id)}
                    >
                      <RxCross2 />
                    </button>
                  </Checkbox>
                );
              })
              .reverse()}
          </div>
          {/* order summary */}
          <div className='border rounded-md p-4 my-3 font-noto-sans-bengali'>
            <h5 className='text-lg font-semibold text-slate-700 py-1'>
              Order Summary
            </h5>
            <hr />
            <div>
              <p className='flex justify-between py-1'>
                <span>
                  Subtotal
                  <span className='font-bold ps-1'>
                    ({total_item_selected} item
                    {total_item_selected > 1 && 's'}):
                  </span>
                </span>
                <span>৳{finalPrice}</span>
              </p>
              <p className='flex justify-between py-1'>
                <span>Shipping Fee: </span> <span>৳{shipping_fee}</span>
              </p>
              <hr />
              <p className='flex justify-between py-2'>
                <span className='font-bold'>Total Price :</span>
                <span className='font-bold'>৳{totalPrice}</span>
              </p>
            </div>
            <hr />
            {/*delivery charge */}
            <div className='my-3 '>
              <h4 className='pb-2 font-semibold text-slate-700'>
                Delivery Charge
              </h4>
              <Radio.Group
                onChange={(e) => setShippingFee(e.target.value)}
                value={shippingFee}
                className='flex flex-col justify-between items-start '
              >
                <Radio
                  value={deliveryCharge[0]?.insideDhaka}
                  className='my-2 font-noto-sans-bengali'
                >
                  Inside Dhaka ৳{deliveryCharge[0]?.insideDhaka}
                </Radio>

                <Radio
                  value={deliveryCharge[0]?.outsideDhaka}
                  className='font-noto-sans-bengali'
                >
                  Outside Dhaka ৳{deliveryCharge[0]?.outsideDhaka}
                </Radio>
              </Radio.Group>
            </div>
            <hr />
            {/* payment option */}
            <div className='payment-option my-3'>
              <h4 className='pb-2 font-semibold text-slate-700'>
                Payment Option
              </h4>
              <Radio.Group
                onChange={(e) => setPaymentMethod(e.target.value)}
                value={paymentMethod}
                className='flex flex-col justify-between items-start'
              >
                <Radio value={1} className='my-2'>
                  Cash On Delivery
                </Radio>
                <Radio value={0}>Payment Online</Radio>
              </Radio.Group>
            </div>
            <hr />
            {auth?.user?.address ? (
              <div className='mt-3'>
                <div className='flex justify-between'>
                  <div className='button-to-order m-auto'>
                    <button
                      className='p-2 px-5 rounded-md text-slate-700 bg-green-400 cursor-pointer hover:bg-green-500 uppercase'
                      onClick={() =>
                        paymentMethod === 1
                          ? handleCheckOutWithOutPayment()
                          : handleCheckOutWithPayment()
                      }
                      disabled={
                        !auth?.user?.address ||
                        selectedProductForOrder?.length < 1
                      }
                    >
                      Place Order
                    </button>
                  </div>
                </div>

                <span className='text-center block mt-3 text-red-500'>
                  {selectedProductForOrder?.length === 0 &&
                    'Select product to order'}
                </span>
              </div>
            ) : (
              <div className='my-3 flex justify-center'>
                {auth?.token ? (
                  <button
                    className='p-2 px-5 rounded-md text-slate-700 bg-red-400 cursor-pointer hover:bg-red-500 uppercase'
                    onClick={() =>
                      navigate('/dashboard/user/profile', { state: 'ADDRESS' })
                    }
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className='p-2 px-5 rounded-md text-slate-700 bg-red-400 cursor-pointer hover:bg-red-500 uppercase'
                    onClick={() =>
                      navigate('/login', {
                        state: '/cart',
                      })
                    }
                  >
                    Login to checkout
                  </button>
                )}
              </div>
            )}
            {/* address */}
            <div className='my-3'>
              <span className='pb-2 font-semibold text-slate-700'>
                Delivered To:
              </span>
              <div className='text-slate-500 flex flex-col text-sm'>
                <span className='capitalize'>
                  {auth?.user?.first_name} {auth?.user?.last_name} |{' '}
                  {auth?.user?.phone}
                </span>
                <span className='capitalize'>
                  {auth?.user?.address?.division}, {auth?.user?.address?.city},{' '}
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
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .ant-checkbox-wrapper {
    .ant-checkbox {
      width: 18px;
    }
    span {
      width: 100%;
      display: flex;
      justify-content: start;
      align-items: center;
    }
  }
  /* Small Screen */
  @media (max-width: 772px) {
    span {
      flex-direction: column;
    }
  }
`;
export default CartPage;
