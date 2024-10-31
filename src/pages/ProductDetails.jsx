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
  const [product, setProduct] = useState(null); // Initialize as null
  const { addToCart } = useCartContext();

  const [mainImg, setMainImg] = useState('');
  const [amount, setAmount] = useState(1);
  const [more, setMore] = useState(false);
  const [hover, setHover] = useState(null);
  const [showReview, setShowReview] = useState(false);

  // review data
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const user_id = auth?.user?._id;
  // console.log(user_id);

  const setDecrement = () => {
    setAmount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const setIncrement = () => {
    setAmount((prev) =>
      prev < (product?.quantity || 0) ? prev + 1 : product?.quantity
    );
  };

  // Get product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/product/get-single/${params.slug}`
      );
      setProduct(data?.product || null);
      if (data?.product) {
        getSimilarProducts(data.product._id, data.product.category._id);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to fetch product details.');
    }
  };

  // Get similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${API}/api/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products || []);
    } catch (error) {
      console.error('Error fetching similar products:', error);
      toast.error('Failed to fetch similar products.');
    }
  };

  // Handle review submission
  const handleReview = async (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      toast.error('Please provide a rating and a comment.');
      return;
    }
    if (rating < 1 || rating > 5) {
      toast.error('Rating must be between 1 and 5.');
      return;
    }
    try {
      const { data } = await axios.post(
        `${API}/api/product/review/${product._id}`,
        {
          user_id,
          rating,
          comment,
        }
      );
      if (data?.success) {
        toast.success(data.message);
        getProduct(); // Refresh product details
      } else {
        toast.error(data?.message || 'Failed to submit review.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error(
        'An error occurred while submitting your review. Please try again later.'
      );
      console.log(user, rating, comment);
    }
  };

  // Calculate average rating and review distribution
  const totalReviews = product?.reviews?.length || 0;
  const totalRating =
    product?.reviews?.reduce((acc, review) => acc + review.rating, 0) || 0;
  const stars = totalReviews ? totalRating / totalReviews : 0;

  const ratingCounts = [0, 0, 0, 0, 0]; // For ratings 1 to 5
  product?.reviews?.forEach(({ rating }) => {
    if (rating >= 1 && rating <= 5) {
      ratingCounts[rating - 1]++;
    }
  });

  // Delete review (admin only)
  const handleDeleteReviews = async (comment_id) => {
    const product_id = product?._id;
    try {
      const { data } = await axios.post(`${API}/api/product/delete_review`, {
        comment_id,
        product_id,
      });
      if (data?.success) {
        toast.success(data?.message);
        getProduct();
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete the review.');
    }
  };

  // Initial fetch for product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Set main image
  useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImg(product.images[0]?.url);
    }
  }, [product]);

  return (
    <div className='product_details py-10'>
      <div className='container_my'>
        {product ? (
          <>
            <div className='md:grid md:grid-cols-2 gap-10'>
              <div>
                <div className='w-full bg-slate-300'>
                  <img
                    src={mainImg}
                    alt='main-img'
                    className='w-full max-h-80 border border-orange-500'
                  />
                </div>
                <div className='flex justify-start items-center py-2'>
                  {product.images?.map((img, i) => (
                    <img
                      key={i}
                      src={img.url}
                      className='w-16 h-16 border border-orange-500 me-2 cursor-pointer'
                      alt={product.name}
                      onClick={() => setMainImg(img.url)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className='capitalize font-bold text-xl text-slate-700'>
                  {product.name}
                </h3>
                <div className='flex justify-start items-center my-2'>
                  <span className='me-2 font-semibold text-xl'>
                    {totalReviews ? stars.toFixed(2) : '0.00'}
                  </span>
                  <Star stars={stars} fill={'md'} outline={'md'} />
                  <span className='totalReviews text-slate-500'>
                    ({totalReviews})
                  </span>
                </div>
                <Price p={product} />
                <hr />
                <pre
                  style={{ whiteSpace: 'pre-wrap' }}
                  className='text-justify py-3 text-sm leading-relaxed font-thin font-noto-sans-bengali'
                >
                  {!more
                    ? product.description.substring(0, 150)
                    : product.description}
                  <span
                    onClick={() => setMore(!more)}
                    className='more ms-1 cursor-pointer text-slate-500'
                  >
                    {!more ? 'more...' : 'less'}
                  </span>
                </pre>
                <p
                  style={{ background: product.color }}
                  className='p-1 me-2 my-2 max-w-fit text-white'
                >
                  {product.color}
                </p>
                <div className='flex justify-between items-center my-4'>
                  <Amount
                    amount={amount}
                    setDecrement={setDecrement}
                    setIncrement={setIncrement}
                  />
                  <div className='flex justify-start items-center font-semibold'>
                    <p>৳ {product.sell_price}</p>
                    <p className='mx-2'>x</p>
                    <p>{amount}</p>
                    <p className='mx-2'>=</p>
                    <p className='text-red-500'>
                      ৳ {product.sell_price * amount}
                    </p>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4 my-3 font-semibold text-white'>
                  <button
                    className='p-2 bg-orange-500'
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
            {/* Rating and Review Section */}
            <div>
              <div className='rating-chart my-5'>
                <h4 className='text-lg font-semibold text-slate-700 py-2'>
                  Rating Chart ({totalReviews}):
                </h4>
                <hr />
                <div className='container_my md:w-1/2 m-auto py-5'>
                  {ratingCounts.map((count, index) => (
                    <div
                      key={index}
                      className='w-full md:grid md:grid-cols-8 gap-2 my-1'
                    >
                      <div className='md:col-span-2'>
                        <Star stars={5 - index} fill={'xl'} outline={'xl'} />
                      </div>
                      <div className='md:col-span-6 flex justify-start items-center'>
                        <div className='h-3 w-full bg-zinc-200 rounded-xl'>
                          <div
                            className='h-3 bg-orange-400 rounded-xl'
                            style={{
                              width: totalReviews
                                ? `${(count / totalReviews) * 100}%`
                                : '0%',
                            }}
                          />
                        </div>
                        <div className='font-bold pb-1 text-slate-500 ms-2'>
                          ({count})
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Review Section */}
              <div className='show-review my-5'>
                <p
                  className='text-lg uppercase font-semibold text-slate-700 py-2 cursor-pointer hover:underline'
                  onClick={() => setShowReview(!showReview)}
                >
                  {showReview ? 'Hide' : 'Show'} ({totalReviews}) Reviews for (
                  {product.name}) :
                </p>
                <hr />
                <div className={showReview ? 'visible' : 'hidden'}>
                  {totalReviews ? (
                    product.reviews.map((review, i) => {
                      console.log(review.user.image[0].url);
                      return (
                        <div
                          key={i}
                          className='text-slate-600 relative border rounded border-orange-200 my-3 p-4 flex items-center'
                        >
                          <div className='me-6'>
                            <img
                              src={review?.user?.image[0]?.url}
                              alt='user'
                              className='w-20 rounded-full border border-orange-200 bg-slate-200 h-20'
                            />
                          </div>
                          <div>
                            <span className='absolute right-3 bg-slate-700 text-red-500 p-1 border-red-500 rounded-full hover:border cursor-pointer top-3'>
                              {auth?.user?.role === 1 && (
                                <RxCross2
                                  fill={18}
                                  onClick={() =>
                                    handleDeleteReviews(review._id)
                                  }
                                />
                              )}
                            </span>
                            <p className='capitalize font-semibold'>
                              {review?.user?.first_name} {''}
                              {review?.user?.last_name}
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
              {/* Review Form */}
              <div className='review-form my-5 text-slate-600'>
                <form
                  className='border border-orange-200 rounded p-5'
                  onSubmit={handleReview}
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
                      {[...Array(5)].map((_, index) => {
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
                              size={20}
                              color={
                                currentRating <= (hover || rating)
                                  ? '#ffbb00'
                                  : '#71717a'
                              }
                              onMouseEnter={() => setHover(currentRating)}
                              onMouseLeave={() => setHover(0)}
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
                      className='flex justify-start items-center mb-2'
                    >
                      <span className='text-red-500 text-2xl me-1'>*</span> Your
                      Comments:
                    </label>
                    <textarea
                      name='review'
                      rows='7'
                      className='border border-slate-300 rounded p-3 focus:outline-none'
                      placeholder={`This ${product.name} ...`}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <button
                    type='submit'
                    className={`my-3 border py-2 px-5 border-orange-400 rounded text-orange-400 hover:bg-orange-50 ${
                      !auth?.user && 'cursor-not-allowed'
                    }`}
                    disabled={!auth?.user}
                  >
                    Submit
                  </button>
                  {!auth?.user && (
                    <span className='text-danger my-2'>
                      (* You have to login for submitting Review)
                    </span>
                  )}
                </form>
              </div>
              {/* Similar Products */}
              <div className='similar-products'>
                <p className='text-lg font-semibold text-slate-700 py-2'>
                  Similar Products:
                </p>
                <hr />
                {relatedProducts.length < 1 && (
                  <p className='text-center'>No Similar Products found</p>
                )}
                <div className='product-wrap grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-5'>
                  {relatedProducts.map((p) => (
                    <div key={p._id}>
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>
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
