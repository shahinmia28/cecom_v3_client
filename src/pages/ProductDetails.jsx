import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { RxCross2 } from 'react-icons/rx';
import { FaStar } from 'react-icons/fa';
import API from '../components/Api';
import { useAuth } from '../context_reducer/context/authContext';
import Amount from '../components/Amount';
import Star from '../components/Star';
import ProductCard from '../components/ProductCard';
import { useCartContext } from '../context_reducer/context/cartContext';
import Price from '../components/Price';

const ProductDetails = () => {
  const [auth] = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [product, setProduct] = useState({});

  const { addToCart } = useCartContext();

  const [mainImg, setMainImg] = useState('');

  const [amount, setAmount] = useState(1);
  const [more, setMore] = useState(false);

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(null);

  const [hover, setHover] = useState(null);
  const [showReview, setShowReview] = useState(false);

  const setDecrement = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };
  const setIncrement = () => {
    amount < product?.quantity
      ? setAmount(amount + 1)
      : setAmount(product?.quantity);
  };

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/product/get-single/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${API}/api/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // review handleReview
  const handleReview = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `${API}/api/product/review/${product._id}`,
      {
        user: auth.user.name,
        user_email: auth.user.email,
        rating,
        comment,
      }
    );
    if (data?.success) {
      toast.success(data?.message);
      getProduct();
    }
  };

  let totalRating;
  const totalReviews = product?.reviews?.length;
  if (totalReviews !== 0) {
    totalRating = product?.reviews
      ?.map((curElem) => curElem.rating)
      .reduce((a, b) => a + b);
  }
  let stars = totalRating / totalReviews;
  const rating5 = [];
  const rating4 = [];
  const rating3 = [];
  const rating2 = [];
  const rating1 = [];
  if (totalReviews !== 0) {
    product?.reviews?.map((curElem) => {
      switch (curElem.rating) {
        case 5:
          return rating5.push(curElem.rating);
        case 4:
          return rating4.push(curElem.rating);
        case 3:
          return rating3.push(curElem.rating);
        case 2:
          return rating2.push(curElem.rating);
        case 1:
          return rating1.push(curElem.rating);
      }
    });
  }

  // const per = (rating2.length / totalReviews) * 100;

  // delete review only for admin
  const handleDeleteReviews = async (comment_id) => {
    const product_id = product?._id;
    const { data } = await axios.post(`${API}/api/product/delete_review`, {
      comment_id,
      product_id,
    });
    if (data?.success) {
      toast.success(data?.message);
      getProduct();
    }
  };

  //initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //initial main ing
  useEffect(() => {
    if (product.images) {
      setMainImg(product?.images[0].url);
    }
  }, [product]);

  return (
    <div className='product_details py-10'>
      <div className='container_my'>
        {product._id !== undefined ? (
          <>
            {/* Product Details */}
            <div className='md:grid md:grid-cols-2 gap-10'>
              {/* image section */}
              <div>
                <div className='w-full bg-slate-300 '>
                  <img
                    src={mainImg}
                    alt='main-img'
                    className='w-full max-h-80 border border-orange-500'
                  />
                </div>
                <div className='flex justify-start items-center py-2'>
                  {product?.images?.map((img, i) => (
                    <img
                      key={i}
                      src={img?.url}
                      className='w-16 h-16 border border-orange-500 me-2'
                      alt={product?.name}
                      onClick={() => setMainImg(img?.url)}
                    />
                  ))}
                </div>
              </div>
              {/* details info section */}
              <div>
                <h3 className='capitalize font-bold text-xl text-slate-700'>
                  {product?.name}
                </h3>
                {/* ratting star */}
                <div className='flex justify-start items-center my-2'>
                  <span className='me-2 font-semibold text-xl'>
                    {totalReviews !== 0
                      ? stars - Math.floor(stars) === 0
                        ? stars + '.00'
                        : stars.toString().slice(0, 4)
                      : '0.00'}
                  </span>
                  <Star stars={stars} fill={'md'} outline={'md'} />
                  <span className='totalReviews text-slate-500'>
                    ({totalReviews})
                  </span>
                </div>
                {/* Price */}
                <Price p={product} />
                <hr />
                {/* description */}
                <pre className='text-slate-700 my-2 h-20'>
                  {!more
                    ? product?.description?.substring(0, 150)
                    : product?.description}
                  <span
                    onClick={() => {
                      setMore(!more);
                    }}
                    className='more ms-1'
                  >
                    {!more ? 'show more...' : 'show less'}
                  </span>
                </pre>
                {/* color */}
                <p
                  style={{ background: product?.color }}
                  className='p-1 me-2 my-2 max-w-fit text-white '
                >
                  {product?.color}
                </p>
                {/* amount total price */}
                <div className='flex justify-between items-center my-4'>
                  <div className='count-amount'>
                    <Amount
                      amount={amount}
                      setDecrement={setDecrement}
                      setIncrement={setIncrement}
                    />
                  </div>
                  <div className='flex justify-start items-center font-semibold text-lg text-slate-600'>
                    <p>{product?.sell_price}$ </p>
                    <p className='mx-2'>x</p>
                    <p>{amount}</p>
                    <p className='mx-2'>=</p>
                    <p className='text-red-500'>
                      {product?.sell_price * amount}$
                    </p>
                  </div>
                </div>

                <hr />
                {/* button */}
                <div className='grid grid-cols-2 gap-4 my-3 font-semibold text-white'>
                  <button
                    className='p-2  bg-orange-500'
                    onClick={() => {
                      addToCart({ id: product._id, amount, product });
                      navigate('/cart');
                    }}
                  >
                    BUY NOW
                  </button>

                  <button
                    className='p-2 bg-sky-500'
                    onClick={() => {
                      addToCart({ id: product._id, amount, product });
                      toast.success('Product Added To Cart Successfully');
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
            {/* review + ratting section */}
            {/* rating chart */}
            <div>
              <div className='rating-chart my-5'>
                <h4 className='text-lg font-semibold text-slate-700 py-2'>
                  Rating Chart ({totalReviews}) :
                </h4>
                <hr />
                <div className='container_my md:w-1/2 m-auto py-5'>
                  {/* 1 */}
                  <div className='w-full md:grid md:grid-cols-5 gap-2 my-1'>
                    <div className='w-fit'>
                      <Star stars={5} fill={'xl'} outline={'2xl'} />
                    </div>
                    <div className='md:col-span-4 flex justify-start items-center'>
                      <div className='h-3 w-full bg-zinc-200 rounded-xl'>
                        <div
                          className={`h-3 bg-orange-400 rounded-xl`}
                          style={{
                            width:
                              totalReviews !== 0
                                ? `${(rating5.length / totalReviews) * 100}%`
                                : '0%',
                          }}
                        ></div>
                      </div>
                      <div className='font-bold pb-1 text-slate-500 ms-2'>
                        ({rating5?.length})
                      </div>
                    </div>
                  </div>
                  {/* 2 */}
                  <div className='w-full md:grid md:grid-cols-5 gap-2 my-1'>
                    <div className='w-fit'>
                      <Star stars={4} fill={'xl'} outline={'xl'} />
                    </div>
                    <div className='md:col-span-4 flex justify-start items-center'>
                      <div className='h-3 w-full bg-zinc-200 rounded-xl'>
                        <div
                          className='h-3 bg-orange-400 rounded-xl'
                          style={{
                            width:
                              totalReviews !== 0
                                ? `${(rating4.length / totalReviews) * 100}%`
                                : '0%',
                          }}
                        ></div>
                      </div>
                      <div className='font-bold pb-1 text-slate-500 ms-2'>
                        ({rating4?.length})
                      </div>
                    </div>
                  </div>
                  {/* 3 */}
                  <div className='w-full md:grid md:grid-cols-5 gap-2 my-1'>
                    <div className='w-fit'>
                      <Star stars={3} fill={'xl'} outline={'xl'} />
                    </div>
                    <div className='md:col-span-4 flex justify-start items-center'>
                      <div className='h-3 w-full bg-zinc-200 rounded-xl'>
                        <div
                          className='h-3 bg-orange-400 rounded-xl'
                          style={{
                            width:
                              totalReviews !== 0
                                ? `${(rating3.length / totalReviews) * 100}%`
                                : '0%',
                          }}
                        ></div>
                      </div>
                      <div className='font-bold pb-1 text-slate-500 ms-2'>
                        ({rating3?.length})
                      </div>
                    </div>
                  </div>
                  {/* 4 */}
                  <div className='w-full md:grid md:grid-cols-5 gap-2 my-1'>
                    <div className='w-fit'>
                      <Star stars={2} fill={'xl'} outline={'xl'} />
                    </div>
                    <div className='md:col-span-4 flex justify-start items-center'>
                      <div className='h-3 w-full bg-zinc-200 rounded-xl'>
                        <div
                          className='h-3 bg-orange-400 rounded-xl'
                          style={{
                            width:
                              totalReviews !== 0
                                ? `${(rating2.length / totalReviews) * 100}%`
                                : '0%',
                          }}
                        ></div>
                      </div>
                      <div className='font-bold pb-1 text-slate-500 ms-2'>
                        ({rating2?.length})
                      </div>
                    </div>
                  </div>
                  {/* 5 */}
                  <div className='w-full md:grid md:grid-cols-5 gap-2 my-1'>
                    <div className='w-fit'>
                      <Star stars={1} fill={'xl'} outline={'xl'} />
                    </div>
                    <div className='md:col-span-4 flex justify-start items-center'>
                      <div className='h-3 w-full bg-zinc-200 rounded-xl'>
                        <div
                          className='h-3 bg-orange-400 rounded-xl'
                          style={{
                            width:
                              totalReviews !== 0
                                ? `${(rating1.length / totalReviews) * 100}%`
                                : '0%',
                          }}
                        ></div>
                      </div>
                      <div className='font-bold text-slate-500 ms-2'>
                        ({rating1?.length})
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Show review section */}
              <div className='show-review my-5'>
                <p
                  className='text-lg uppercase font-semibold text-slate-700 py-2 cursor-pointer hover:underline'
                  onClick={() => setShowReview(!showReview)}
                >
                  {showReview ? 'Hide' : 'Show'} ({totalReviews}) Reviews for (
                  {product?.name}) :
                </p>
                <hr />
                <div className={showReview ? 'visible' : 'hidden'}>
                  {totalReviews !== 0 ? (
                    product?.reviews?.map((review, i) => {
                      return (
                        <div
                          key={i}
                          className='text-slate-600 border rounded border-orange-200 my-3 p-4 flex flex-row items-center justify-start relative'
                        >
                          <div className='me-6'>
                            <img
                              src='/images/user.png'
                              alt='user'
                              className='w-20 rounded-full border border-orange-200 bg-slate-200 h-20'
                            />
                          </div>
                          <div>
                            <span className='absolute right-3 text-red-500 p-1 border-red-500 rounded-full hover:border cursor-pointer top-3'>
                              {auth?.user?.role === 1 && (
                                <RxCross2
                                  fill={18}
                                  onClick={() =>
                                    handleDeleteReviews(review._id)
                                  }
                                />
                              )}
                            </span>
                            <p className='capitalize font-semibold '>
                              {review?.user ? review?.user : 'USER'}
                            </p>
                            <Star
                              stars={review.rating}
                              fill={15}
                              outline={17}
                            />
                            <p>( {review.comment} )</p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className='text-slate-600'>No Review Found</p>
                  )}
                </div>
              </div>
              {/* rete this product section */}
              <div className='review-form my-5 text-slate-600'>
                <form
                  className='border border-orange-200 rounded p-5'
                  onSubmit={(e) => handleReview(e)}
                >
                  <p className='text-lg uppercase font-semibold text-slate-700 py-2'>
                    Add Product's Review:
                  </p>

                  <div className='flex justify-start items-center'>
                    <span className='flex justify-start items-center'>
                      <span className='text-red-500 text-2xl me-1'>*</span> Your
                      Rating:
                    </span>
                    <span className='flex justify-start items-center ms-1'>
                      {[...Array(5)].map((star, index) => {
                        const currentRating = index + 1;
                        return (
                          <label key={index}>
                            <input
                              type='radio'
                              name='rating'
                              value={currentRating}
                              onClick={() => setRating(currentRating)}
                              required
                              className='hidden'
                            />
                            <FaStar
                              fill={20}
                              color={
                                currentRating <= (hover || rating)
                                  ? '#ffbb00'
                                  : '#71717a'
                              }
                              onMouseEnter={() => setHover(currentRating)}
                              onMouseLeave={() => setHover(null)}
                              className='cursor-pointer'
                            />
                          </label>
                        );
                      })}
                    </span>
                  </div>

                  <div className='flex flex-col'>
                    <label
                      htmlFor='review'
                      className='flex justify-start items-center mb-2 '
                    >
                      <span className='text-red-500 text-2xl me-1'>*</span>
                      Your Comments:
                    </label>
                    <textarea
                      name='review'
                      rows='7'
                      className='border border-slate-300 rounded p-3 focus:outline-none'
                      placeholder={`This ${product?.name} ...`}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <button
                    type='submit'
                    className={`${
                      !auth?.user && 'cursor-not-allowed'
                    } my-3 border py-2 px-5 border-orange-400 rounded text-orange-400 hover:bg-orange-50`}
                    disabled={auth?.user ? false : true}
                  >
                    Submit
                  </button>
                  <br />
                  {!auth?.user && (
                    <span className='text-danger my-2'>
                      (* You have to login for submitting Review)
                    </span>
                  )}
                </form>
              </div>
              {/* similar product */}
              <div className='similar-products'>
                <div>
                  <p className='text-lg font-semibold text-slate-700 py-2'>
                    Similar Products:
                  </p>
                  <hr />
                  {relatedProducts?.length < 1 && (
                    <p className='text-center'>No Similar Products found</p>
                  )}
                </div>
                <div className='product-wrap grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-5'>
                  {relatedProducts?.map((p) => (
                    <div key={p._id}>
                      <ProductCard p={p} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>
            {/* loading img */}
            <figure className='loading' style={{ minHeight: '80vh' }}>
              <img src='./loading.gif' alt='loading' />
            </figure>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
