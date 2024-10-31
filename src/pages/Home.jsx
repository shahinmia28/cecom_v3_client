import React from 'react';
import Hero from '../components/Hero';
import Trust from '../components/Trust';
import AllProductsSection from '../components/AllProductsSection';
import FeatureProduct from '../components/FeatureProduct';
import Services from '../components/Services';
import ImageSlider from '../components/ImageSlider';

const Home = () => {
  return (
    <div>
      <Hero />
      {/* <ImageSlider /> */}
      {/* <Trust /> */}
      <FeatureProduct />
      <AllProductsSection />
      <Services />
    </div>
  );
};

export default Home;
