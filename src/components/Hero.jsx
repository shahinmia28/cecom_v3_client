import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';

const Hero = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    rtl: true,
  };
  return (
    <Wrapper className='w-full h-72 md:h-96  flex justify-start items-center'>
      <div className='order-1 bg-slate-50 z-20 relative h-full hidden md:block md:w-1/4 py-4 ps-10'>
        <ul className='font-semibold text-md  text-slate-600 '>
          <li className='flex justify-between  py-1 pe-4 my-2 cursor-pointer items-center group hover:text-sky-500 '>
            <NavLink to={'/mans-collection'} className=''>
              Man's collection
            </NavLink>
            <span className='hover:text-sky-500 cursor-pointer '>
              <IoIosArrowForward size={20} />
            </span>
            <div className='absolute transition linear duration-500 invisible opacity-0 group-hover:opacity-100 group-hover:visible top-0 inset-full min-w-fit bg-white md:h-96 text-slate-950'>
              <ul className='grid grid-rows-10 grid-flow-col gap-2 p-5 text-sm font-normal'>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Chanel</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Gucci</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Hermes</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Prada</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>
                  Saint Laurent
                </li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Celine</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>JW Anderson</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Dior</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Fendi</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Goyard</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>The Row</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Ree Projects</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Khaite</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>
                  Louis Vuitton
                </li>
              </ul>
            </div>
          </li>
          <li className='flex justify-between py-1 pe-4 my-2 cursor-pointer items-center group hover:text-sky-500 '>
            <NavLink to={'/women-collection'} className=''>
              Women's collection
            </NavLink>
            <span className='hover:text-sky-500 cursor-pointer'>
              <IoIosArrowForward size={20} />
            </span>
            <div className='absolute transition linear duration-500 invisible opacity-0 group-hover:opacity-100 group-hover:visible top-0 inset-full min-w-fit bg-white md:h-96 text-slate-950'>
              <ul className='grid grid-rows-10 grid-flow-col gap-2 p-5 text-sm font-normal'>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Chanel</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Gucci</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Hermes</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Prada</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>
                  Saint Laurent
                </li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Celine</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>JW Anderson</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Dior</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Fendi</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Goyard</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>The Row</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Ree Projects</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Khaite</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>
                  Louis Vuitton
                </li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Celine</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>JW Anderson</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Dior</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Fendi</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Goyard</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>The Row</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Ree Projects</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Khaite</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>
                  Louis Vuitton
                </li>
              </ul>
            </div>
          </li>
          <li className='flex justify-between py-1 pe-4 my-2 cursor-pointer items-center group hover:text-sky-500 '>
            <NavLink to={'/baby-mart'} className=''>
              Baby Mart
            </NavLink>
            <span className='hover:text-sky-500 cursor-pointer'>
              <IoIosArrowForward size={20} />
            </span>
            <div className='absolute transition linear duration-500 invisible opacity-0 group-hover:opacity-100 group-hover:visible top-0 inset-full min-w-fit bg-white md:h-96 text-slate-950'>
              <ul className='grid grid-rows-10 grid-flow-col gap-2 p-5 text-sm font-normal'>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Chanel</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Gucci</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Hermes</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Prada</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>
                  Saint Laurent
                </li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Celine</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>JW Anderson</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Dior</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Fendi</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Goyard</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>The Row</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Ree Projects</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Khaite</li>
              </ul>
            </div>
          </li>
          <li className='flex justify-between py-1 pe-4 my-2 cursor-pointer items-center group hover:text-sky-500 '>
            <NavLink to={'/new-fashion'} className=''>
              New Fashion
            </NavLink>
            <span className='hover:text-sky-500 cursor-pointer'>
              <IoIosArrowForward size={20} />
            </span>
            <div className='absolute transition linear duration-500 invisible opacity-0 group-hover:opacity-100 group-hover:visible top-0 inset-full min-w-fit bg-white md:h-96 text-slate-950'>
              <ul className='grid grid-rows-10 grid-flow-col gap-2 p-5 text-sm font-normal'>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Chanel</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Gucci</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Hermes</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Prada</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>
                  Saint Laurent
                </li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Celine</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>JW Anderson</li>

                <li className='hover:text-sky-500 w-32 p-0.5 '>Celine</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>JW Anderson</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Dior</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Fendi</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Goyard</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>The Row</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Ree Projects</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>Khaite</li>
                <li className='hover:text-sky-500 w-32 p-0.5 '>
                  Louis Vuitton
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div className='order-2  h-full w-full md:w-3/4 '>
        <Slider {...settings} className='h-full w-full sliders overflow-hidden'>
          <div className='w-full'>
            <img src='1.jpg' alt='1' />
          </div>
          <div className='w-full'>
            <img src='2.jpg' alt='2' />
          </div>
          <div className='w-full'>
            <img src='3.jpg' alt='3' />
          </div>
        </Slider>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .sliders {
    img {
      width: 100%;
      height: 100%;
    }
    .slick-dots {
      margin-bottom: 30px;
      li {
        button {
          &::before {
            font-size: 12px;
            color: rgb(0, 174, 255);
          }
        }
      }
    }
  }
`;

export default Hero;
