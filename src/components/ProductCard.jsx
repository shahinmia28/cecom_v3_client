import { LiaCartPlusSolid } from 'react-icons/lia';
import { NavLink, useNavigate } from 'react-router-dom';
import Star from './Star';
import Price from './Price';
import toast from 'react-hot-toast';
import { useCartContext } from '../context_reducer/context/cartContext';

const ProductCard = ({ p }) => {
  const { addToCart } = useCartContext();
  const navigate = useNavigate();

  let totalRating;
  const totalReviews = p?.reviews?.length;

  if (totalReviews !== 0) {
    totalRating = p?.reviews
      ?.map((curElem) => curElem.rating)
      .reduce((a, b) => a + b);
  }
  const stars = totalRating / totalReviews;

  return (
    <div
      className='item-wrap relative p-2 flex flex-col justify-between group transition-all border border-slate-300 h-80 md:h-96 hover:shadow-lg'
      id={p._id}
    >
      <NavLink to={`/product_details/${p?.slug}`} className='z-10'>
        <div className='item'>
          <div className='img h-40 md:h-52'>
            <img className='w-full h-full' src={p?.images[0].url} alt='img' />
          </div>
          <div className='body h-20 md:h-28  flex flex-col justify-between'>
            <p className='font-semibold text-xs md:text-sm capitalize'>
              {p?.name}
            </p>
            {/* price */}
            <Price p={p} />
            {/* ratting */}
            <div className='flex items-center justify-start py-2'>
              <Star stars={stars} fill={'sm'} outline={'md'} />
              <span className='text-slate-500 ps-3'>({totalReviews})</span>
            </div>
          </div>
        </div>
      </NavLink>
      <button
        onClick={() => {
          addToCart({ id: p._id, amount: 1, product: p });
          navigate('/cart');
        }}
        className='border-sky-500 border transition-all p-1 uppercase
           text-sky-500 hover:bg-sky-500 hover:text-white z-20
            text-center'
      >
        Buy Now
      </button>
      <button
        className='animate-bounce absolute top-4 right-2 border border-red-500 text-red-500 rounded-full p-2  invisible group-hover:visible hover:bg-red-500 hover:text-white hover:animate-none z-30'
        onClick={() => {
          addToCart({ id: p._id, amount: 1, product: p });
          toast.success('Product Added To Cart Successfully');
        }}
      >
        <LiaCartPlusSolid size={25} />
      </button>
    </div>
  );
};

export default ProductCard;
