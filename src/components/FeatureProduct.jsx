import React from 'react';
import { useProductContext } from '../context_reducer/context/productContext';
import ProductCard from './ProductCard';
import Slider from 'react-slick';

const FeatureProduct = () => {
  const { featureProducts } = useProductContext();

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div id='fetcher_section' className='py-10'>
      <div className='container_my'>
        <div className='py-5'>
          <h3 className='font-bold text-lg text-indigo-900 md:text-2xl mb-3'>
            Our Featured Products:
          </h3>
          <hr />
        </div>
        <div className='slider-container'>
          <Slider {...settings}>
            {featureProducts?.map((p, i) => (
              <div key={i} className='px-2'>
                <ProductCard p={p} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default FeatureProduct;
