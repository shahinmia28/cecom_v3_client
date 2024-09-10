import { FaStarHalfAlt, FaStar } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';

const Star = ({ stars, fill, outline }) => {
  return (
    <div className='flex justify-start items-center py-1'>
      {Array.from({ length: 5 }, (elem, index) => {
        return (
          <div key={index}>
            {stars >= index + 1 ? (
              <FaStar
                className={`me-1 text-orange-400 text-xs md:text-${fill}`}
              />
            ) : stars >= index + 0.5 ? (
              <FaStarHalfAlt
                className={`me-1 text-orange-400 text-xs md:text-${fill}`}
              />
            ) : (
              <AiOutlineStar
                className={`me-1 mb-[-2px] text-zinc-500 text-sm md:text-${outline}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Star;
