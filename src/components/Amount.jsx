import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';

const Amount = ({ amount, setDecrement, setIncrement }) => {
  return (
    <div className='w-fit flex items-center justify-between'>
      <button
        className='md:text-xl text-lg m-0 p-0 border-none opacity-70 bg-transparent text-orange-400 text-center hover:opacity-100'
        onClick={() => setDecrement()}
      >
        <FaMinusCircle />
      </button>
      <p className=' text-orange-400 p-0 mx-2 font-semibold text-md md:text-lg md:mx-4 '>
        {amount}
      </p>
      <button
        className='md:text-xl text-lg m-0 p-0 border-none opacity-70 bg-transparent text-orange-400 text-center hover:opacity-100'
        onClick={() => setIncrement()}
      >
        <FaPlusCircle />
      </button>
    </div>
  );
};

export default Amount;
