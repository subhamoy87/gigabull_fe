import React, { useEffect } from 'react';
import HomeHero from '../component/home/HomeHero';
import Navbar from '../component/shared/Navbar';
import HomeCategories from '../component/home/HomeCategories';
import HomeProductsShowcase from '../component/home/HomeProductsShowcase';
import HomeParallex from '../component/home/HomeParallex';
import HomeCustomerReviews from '../component/home/HomeCustomerReviews';
import Footer from '../component/shared/Footer';
import HomePremiumAccessories from '../component/home/HomePremiumAccessories';
import { PING_API_URL } from '../config/config';
import axios from 'axios';

const HomePage = () => {
  useEffect(() => {
    const pingServer = async () => {
      try {
        await axios.get(`${PING_API_URL}`);
        console.log('Server ping successful');
      } catch (error) {
        console.error('Ping failed:', error.message);
      }
    };

    pingServer();

    const interval = setInterval(pingServer, 300000);

    return () => clearInterval(interval);
  }, []);

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
