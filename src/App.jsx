import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { SiteDataProvider } from './context/SiteDataContext';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import ErrorBoundary from './component/ErrorBoundary';
import MensCollection from './pages/category/MensCollection';
import WomensCollection from './pages/category/WomensCollection';
import AccessoriesCollection from './pages/category/AccessoriesCollection';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ReturnPolicyPage from './pages/ReturnPolicyPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ShippingDeliveryPage from './pages/ShippingDeliveryPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import FAQPage from './pages/FAQPage';
import BrochurePage from './pages/BrochurePage';
import CertificatePage from './pages/CertificatePage';
import AdminPage from './pages/AdminPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <SiteDataProvider>
      <ScrollToTop />
      <Routes>
        {/* Admin Route standalone without main header/footer layout */}
        <Route path='/admin' element={<AdminPage />} />

        {/* Public Routes with MainLayout */}
        <Route
          element={
            <ErrorBoundary>
              <MainLayout />
            </ErrorBoundary>
          }
        >
          <Route path='/' index element={<HomePage />} />
          <Route path='/mens-collection' element={<MensCollection />} />
          <Route path='/womens-collection' element={<WomensCollection />} />
          <Route path='/accessories' element={<AccessoriesCollection />} />
          <Route path='/product/:slug' element={<ProductDetailsPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/faq' element={<FAQPage />} />
          <Route path='/terms' element={<TermsAndConditionsPage />} />
          <Route path='/privacy' element={<PrivacyPolicyPage />} />
          <Route path='/return' element={<ReturnPolicyPage />} />
          <Route path='/shipping' element={<ShippingDeliveryPage />} />
          <Route path='/brochure' element={<BrochurePage />} />
          <Route path='/certificate' element={<CertificatePage />} />
        </Route>
      </Routes>
    </SiteDataProvider>
  );
};

export default App;
