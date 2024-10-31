import React from 'react';
import { HashLink } from 'react-router-hash-link/dist/react-router-hash-link.cjs.production';
import { footerMenu } from './Data';
import { TbCurrentLocation } from 'react-icons/tb';
import { IoCallOutline, IoMailOutline, IoLogoYoutube } from 'react-icons/io5';
import { FaFacebook } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { FaLinkedin } from 'react-icons/fa6';
import { IoLogoWhatsapp } from 'react-icons/io';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='container_my'>
        <div className='footer_context grid grid-cols-1 md:grid-cols-3 gap-3 my-12 rounded-3xl overflow-hidden'>
          <div className='footer_menu'>
            <div className='grid grid-cols-2 gap-4 bg-slate-600 p-5 h-full rounded-3xl text-center '>
              {footerMenu?.map((curMenu, i) => (
                <HashLink
                  key={i}
                  to={curMenu?.title}
                  className={`text-indigo-950 bg-indigo-50 p-2  w-full rounded-xl h-full flex items-center justify-center hover:bg-indigo-100 hover:text-indigo-600`}
                >
                  <span>{curMenu?.name}</span>
                </HashLink>
              ))}
            </div>
          </div>
          <div className='contact '>
            <div className='bg-indigo-100 text-slate-950 h-full  rounded-3xl p-5'>
              <p className='flex justify-start items-center  mb-2'>
                <span className='p-2'>
                  <IoCallOutline className='h-full size-5 ' />
                </span>
                <span className='text-indigo-800'>+8801777-296933</span>
              </p>
              <p className='flex justify-start items-center  mb-2'>
                <span className='p-2'>
                  <IoMailOutline className='h-full size-5 ' />
                </span>
                <span className='text-indigo-800'>contact@eshop.com</span>
              </p>
              <p className='flex justify-start items-center mb-2'>
                <span className='p-2'>
                  <TbCurrentLocation className='h-full text-indigo-950 size-5 ' />
                </span>
                <span className='text-indigo-800'>
                  eShop House, Tangail, Dhaka, Bangladesh
                </span>
              </p>
              <p className='flex justify-between items-center mb-2 '>
                <a href='https://facebook.com' target='blank' className='p-2'>
                  <FaFacebook className='h-full size-8 text-indigo-600  hover:opacity-80' />
                </a>
                <a
                  href='https://www.instagram.com/'
                  target='blank'
                  className='p-2'
                >
                  <RiInstagramFill className='h-full size-8 text-orange-500 hover:opacity-80' />
                </a>
                <a href='https://youtube.com' target='blank' className='p-2'>
                  <IoLogoYoutube className='h-full size-8 text-red-500  hover:opacity-80 ' />
                </a>
                <a href='https://whatsapp.com' target='blank' className='p-2'>
                  <IoLogoWhatsapp className='h-full size-8 text-lime-500  hover:opacity-80' />
                </a>
                <a href='https://linkedin.com' target='blank' className='p-2'>
                  <FaLinkedin className='h-full size-8 text-blue-600  hover:opacity-80' />
                </a>
              </p>
            </div>
          </div>
          <div className='q_faq '>
            <div className='form  bg-slate-600 h-full rounded-3xl'>
              <form action='#' className='flex flex-col p-5'>
                <input
                  type='text'
                  placeholder='Full Name'
                  className='my-1 p-1.5 rounded-lg outline-none bg-indigo-50'
                />
                <input
                  type='email'
                  placeholder='Email'
                  className='p-1.5 rounded-lg outline-none bg-indigo-50'
                />
                <textarea
                  name='message'
                  id=''
                  rows='3'
                  className='my-1 p-1.5 rounded-lg outline-none bg-indigo-50'
                  placeholder='Ask Your Question Here...'
                ></textarea>
                <button className='my-1 p-1.5 rounded-lg bg-indigo-50 uppercase text-slate-500 hover:text-indigo-600  hover:bg-indigo-100'>
                  Sent
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='copy_right text-center text-white bg-indigo-800 p-5'>
        &copy; All right reserved by eShop
      </div>
    </div>
  );
};

export default Footer;
