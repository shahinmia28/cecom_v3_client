import styled from 'styled-components';
import { TbTruckDelivery } from 'react-icons/tb';
import { MdSecurity } from 'react-icons/md';
import { GiReceiveMoney } from 'react-icons/gi';
import { RiSecurePaymentLine } from 'react-icons/ri';

const Services = () => {
  return (
    <Wrapper>
      <div className='container_my py-8'>
        <div className='md:grid md:grid-cols-3 md:gap-10'>
          <div className='bg-slate-50 shadow-md hover:shadow-inner py-6 mb-7 md:mb-0 shadow-slate-200 rounded-3xl flex md:flex-col justify-center items-center text-center'>
            <TbTruckDelivery className=' text-indigo-600 size-20 p-5 bg-white rounded-full' />
            <h3 className='text-lg'>Supper fast and free delivery</h3>
          </div>
          {/* serveices -2 */}
          <div className='bg-transparent md:grid md:grid-rows-2 md:gap-10'>
            <div className='bg-slate-50 py-6 mb-7 md:mb-0 shadow-md hover:shadow-inner shadow-slate-200 rounded-3xl flex justify-center items-center text-center'>
              <MdSecurity className='me-2 text-indigo-600 size-20 p-5 bg-white rounded-full' />
              <h3 className='text-lg'>non-contact shipping</h3>
            </div>
            <div className='bg-slate-50 py-6 mb-7 md:mb-0 shadow-md hover:shadow-inner shadow-slate-200 rounded-3xl flex justify-center items-center text-center'>
              <GiReceiveMoney className='me-2 text-indigo-600 size-20 p-5 bg-white rounded-full' />
              <h3 className='text-lg'>money-back guaranteed </h3>
            </div>
          </div>

          <div className='bg-slate-50 shadow-md hover:shadow-inner  py-6 shadow-slate-200 rounded-3xl flex md:flex-col justify-center items-center text-center'>
            <RiSecurePaymentLine className=' text-indigo-600 size-20 p-5 bg-white rounded-full' />
            <h3 className='text-lg'>supper secure payment system </h3>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .services-1,
  .services-2,
  .services-3 {
    width: auto;
    height: 30rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    background: #f6f8fa;
    text-align: center;
    border-radius: 2rem;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  }
  .services-2 {
    gap: 4rem;
    background-color: transparent;
    box-shadow: none;
    .services-colum-2 {
      background: #f6f8fa;
      display: flex;
      flex-direction: row;
      flex: 1;
      justify-content: center;
      align-items: center;
      border-radius: 2rem;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    }
  }
`;
export default Services;
