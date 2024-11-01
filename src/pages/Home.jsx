import React from 'react';
import Hero from '../components/Hero';
import Trust from '../components/Trust';
import AllProductsSection from '../components/AllProductsSection';
import FeatureProduct from '../components/FeatureProduct';
import Services from '../components/Services';
import ImageSlider from '../components/ImageSlider';
import Video from '../components/Video';

const Home = () => {
  return (
    <div>
      <Hero />
      {/* <ImageSlider /> */}
      {/* <Trust /> */}
      <FeatureProduct />
      <AllProductsSection />
      <Video />
      <Services />
    </div>
  );
};

export default Home;
