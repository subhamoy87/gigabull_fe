import React from 'react';
import { useSiteData } from '../context/SiteDataContext';
import AdminLogin from '../component/admin/AdminLogin';
import AdminDashboard from '../component/admin/AdminDashboard';

const AdminPage = () => {
  const { isAuthenticated } = useSiteData();

  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />;
};

export default AdminPage;
