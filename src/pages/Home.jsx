import React from 'react';
import Hero from '../components/Hero';
import Trust from '../components/Trust';
import AllProductsSection from '../components/AllProductsSection';
import FeatureProduct from '../components/FeatureProduct';
import Services from '../components/Services';

const Home = () => {
  return (
    <div>
      <Hero />
      {/* <Trust /> */}
      <FeatureProduct />
      <AllProductsSection />
      <Services />
      <div className='h-screen'>hh</div>
    </div>
  );
};

export default Home;
