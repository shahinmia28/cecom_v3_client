import Slider from 'react-slick';
import { TbTruckReturn, TbReplace } from 'react-icons/tb';
import { SiAuthelia } from 'react-icons/si';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { FaHandHoldingUsd } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';

import { HashLink } from 'react-router-hash-link';
const Trust = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 5,
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 7000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  return (
    <div className='shadow-lg w-full bg-white'>
      <div className='container_my'>
        <div className='slider-container'>
          <Slider {...settings}>
            <div>
              <HashLink
                smooth
                to={'/ask/#emi'}
                className='item-container flex-col flex items-center justify-center h-40 cursor-pointer group'
              >
                <span className='bg-orange-500 order-1 text-white p-4 rounded-full '>
                  <FaHandHoldingUsd className='size-8  md:size-12' />
                </span>
                <span className='order-2 group-hover:text-sky-500 pt-2 uppercase font-bold text-xs md:text-base'>
                  36 Months EMI
                </span>
              </HashLink>
            </div>
            <div>
              <HashLink
                smooth
                to={'/ask/#return'}
                className='item-container flex-col flex items-center justify-center h-40 cursor-pointer group'
              >
                <span className='bg-orange-500 order-1 text-white p-4 rounded-full '>
                  <TbTruckReturn className='size-8  md:size-12' />
                </span>
                <span className='order-2 group-hover:text-sky-500 pt-2 uppercase font-bold text-xs md:text-base'>
                  Easy return
                </span>
              </HashLink>
            </div>
            <div>
              <HashLink
                smooth
                to={'/ask/#warranty'}
                className='item-container flex-col flex items-center justify-center h-40 cursor-pointer group'
              >
                <span className='bg-orange-500 order-1 text-white p-4 rounded-full '>
                  <TbReplace className='size-8  md:size-12' />
                </span>

                <span className='order-2 group-hover:text-sky-500 pt-2 uppercase font-bold text-xs md:text-base'>
                  Warranty
                </span>
              </HashLink>
            </div>
            <div>
              <HashLink
                smooth
                to={'/ask/#authentic'}
                className='item-container flex-col flex items-center justify-center h-40 cursor-pointer group'
              >
                <span className='bg-orange-500 order-1 text-white p-4 rounded-full '>
                  <SiAuthelia className='size-8  md:size-12' />
                </span>
                <span className='order-2 group-hover:text-sky-500 pt-2 uppercase font-bold text-xs md:text-base'>
                  100% Authentic
                </span>
              </HashLink>
            </div>
            <div>
              <HashLink
                smooth
                to={'/ask/#delivery'}
                className='item-container flex-col flex items-center justify-center h-40 cursor-pointer group'
              >
                <span className='bg-orange-500 order-1 text-white p-4 rounded-full '>
                  <TbTruckDelivery className='size-8  md:size-12' />
                </span>
                <span className='order-2 group-hover:text-sky-500 pt-2 uppercase font-bold text-xs md:text-base'>
                  Fast Delivery
                </span>
              </HashLink>
            </div>
            <div>
              <HashLink
                smooth
                to={'/ask/#payment'}
                className='item-container flex-col flex items-center justify-center h-40 cursor-pointer group'
              >
                <span className='bg-orange-500 order-1 text-white p-4 rounded-full '>
                  <RiSecurePaymentLine className='size-8  md:size-12' />
                </span>
                <span className='order-2 group-hover:text-sky-500 pt-2 uppercase font-bold text-xs md:text-base'>
                  Secure Payment
                </span>
              </HashLink>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Trust;
