import React from 'react';
import Navbar from '../component/shared/Navbar';
import Footer from '../component/shared/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
