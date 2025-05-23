import React from 'react';
import HomeHero from '../component/home/HomeHero';
import Navbar from '../component/shared/Navbar';
import HomeCategories from '../component/home/HomeCategories';
import HomeProductsShowcase from '../component/home/HomeProductsShowcase';
import HomeParallex from '../component/home/HomeParallex';
import HomeCustomerReviews from '../component/home/HomeCustomerReviews';
import Footer from '../component/shared/Footer';
import HomePremiumAccessories from '../component/home/HomePremiumAccessories';

const HomePage = () => {
  return (
    <>
      <HomeHero />
      <HomeCategories />
      <HomePremiumAccessories />
      <HomeProductsShowcase />
      <HomeParallex />
      <HomeCustomerReviews />
    </>
  );
};

export default HomePage;
