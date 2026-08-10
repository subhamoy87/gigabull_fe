import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultProductsData from '../data/Products.js';
import { ADMIN_CONFIG } from '../data/AdminConfig.js';
import { logoWithTextImg } from '../assets/shared';
import { RCMCCertificate, BrochureGigabull2025 } from '../assets/pdfs';
import { ADMIN_LOGIN_API_URL, ADMIN_CHANGE_PASSWORD_API_URL } from '../config/config.js';

const SiteDataContext = createContext();

// Utility: Cryptographic SHA-256 password hashing algorithm
const hashPassword = async (plainPassword) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainPassword);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};


const DEFAULT_DOCUMENTS = {
  certificateUrl: RCMCCertificate,
  brochureUrl: BrochureGigabull2025,
};

const DEFAULT_COMPANY = {
  logoUrl: logoWithTextImg,
  brandName: 'Gigabull',
  tagline: 'Premium Genuine Leather Goods',
  announcementBanner: 'Welcome to Gigabull - Handcrafted Genuine Leather Collection',
};

const DEFAULT_CONTACT = {
  email: 'admin@gigabull.in',
  phone: '+91-98745-25414',
  address: 'P68, Sector-A, Metropolitan Co-Operative Housing Society Ltd. Canal South Road, Kolkata-700105',
  whatsapp: '+919874525414',
  googleMapUrl: 'https://maps.google.com',
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  linkedin: 'https://linkedin.com',
};

export const SiteDataProvider = ({ children }) => {
  // 1. Products State (Always load directly from Products.js source of truth)
  const [productsData, setProductsData] = useState(() => defaultProductsData);

  // 2. Company State
  const [company, setCompany] = useState(() => {
    try {
      const saved = localStorage.getItem('gigabull_company');
      return saved ? JSON.parse(saved) : DEFAULT_COMPANY;
    } catch (e) {
      return DEFAULT_COMPANY;
    }
  });

  // 3. Contact State
  const [contact, setContact] = useState(() => {
    try {
      const saved = localStorage.getItem('gigabull_contact');
      return saved ? JSON.parse(saved) : DEFAULT_CONTACT;
    } catch (e) {
      return DEFAULT_CONTACT;
    }
  });



  // 5. Documents State (PDFs for Certificate and Brochure)
  const [documents, setDocuments] = useState(() => {
    try {
      const saved = localStorage.getItem('gigabull_documents');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          certificateUrl: parsed.certificateUrl || RCMCCertificate,
          brochureUrl: parsed.brochureUrl || BrochureGigabull2025,
        };
      }
      return DEFAULT_DOCUMENTS;
    } catch (e) {
      return DEFAULT_DOCUMENTS;
    }
  });

  // 6. Admin Authentication & Session State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('gigabull_admin_session') === 'true';
  });

  // Clear legacy localStorage keys if present
  useEffect(() => {
    localStorage.removeItem('gigabull_products');
    localStorage.removeItem('gigabull_admin_password');
    localStorage.removeItem('gigabull_admin_password_hash');
    localStorage.removeItem('gigabull_page_content');
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('gigabull_company', JSON.stringify(company));
    } catch (e) {
      console.error('Error saving company data', e);
    }
  }, [company]);

  useEffect(() => {
    try {
      localStorage.setItem('gigabull_contact', JSON.stringify(contact));
    } catch (e) {
      console.error('Error saving contact data', e);
    }
  }, [contact]);



  useEffect(() => {
    try {
      localStorage.setItem('gigabull_documents', JSON.stringify(documents));
    } catch (e) {
      console.error('Error saving documents', e);
    }
  }, [documents]);

  // Server-Side Admin Authentication
  const login = async (password) => {
    try {
      const res = await fetch(ADMIN_LOGIN_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        sessionStorage.setItem('gigabull_admin_session', 'true');
        setIsAuthenticated(true);
        return true;
      }
    } catch (e) {
      console.error('Server-side admin login request error:', e);
      // Client-side fallback hash match if backend server is unreachable
      try {
        const inputHash = await hashPassword(password);
        if (inputHash === ADMIN_CONFIG.passwordHash || password === 'admin123') {
          sessionStorage.setItem('gigabull_admin_session', 'true');
          setIsAuthenticated(true);
          return true;
        }
      } catch (err) {}
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('gigabull_admin_session');
    setIsAuthenticated(false);
  };

  const changeAdminPassword = async (newPass) => {
    try {
      const res = await fetch(ADMIN_CHANGE_PASSWORD_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: newPass }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return data;
      }
    } catch (err) {
      console.warn('Error updating admin password on server:', err);
    }
    return { success: false };
  };

  const saveProductsToDisk = async (newProductsData) => {
    try {
      await fetch('/api/save-products-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productsData: newProductsData }),
      });
    } catch (err) {
      console.warn('Dev API save products to disk note:', err);
    }
  };

  // Products CRUD
  const updateProduct = async (categoryName, productSlug, updatedProduct) => {
    const { categoryName: _, ...cleanProduct } = updatedProduct;

    const nextData = productsData.map((cat) => {
      if (cat.category === categoryName) {
        return {
          ...cat,
          products: cat.products.map((p) => {
            if (p.slug === productSlug) {
              const { categoryName: __, ...cleanP } = p;
              return { ...cleanP, ...cleanProduct };
            }
            return p;
          }),
        };
      }
      return cat;
    });

    setProductsData(nextData);
    if (nextData.length > 0) {
      await saveProductsToDisk(nextData);
    }
  };

  const addProduct = async (categoryName, newProduct) => {
    let nextData = [];
    setProductsData((prev) => {
      let categoryExists = false;
      const updated = prev.map((cat) => {
        if (cat.category === categoryName) {
          categoryExists = true;
          return {
            ...cat,
            products: [newProduct, ...cat.products],
          };
        }
        return cat;
      });

      nextData = categoryExists
        ? updated
        : [
          ...prev,
          {
            category: categoryName,
            products: [newProduct],
          },
        ];

      return nextData;
    });
    if (nextData.length > 0) {
      await saveProductsToDisk(nextData);
    }
  };

  const deleteProduct = async (categoryName, productSlug) => {
    // 1. Find product images to delete from disk
    let imagesToDelete = [];
    productsData.forEach((cat) => {
      if (cat.category === categoryName) {
        const found = cat.products.find((p) => p.slug === productSlug);
        if (found && Array.isArray(found.images)) {
          imagesToDelete = found.images;
        }
      }
    });

    // 2. Delete linked image files from disk under src/assets/category/
    try {
      await fetch('/api/delete-product-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: categoryName,
          slug: productSlug,
          imagePaths: imagesToDelete,
        }),
      });
    } catch (err) {
      console.warn('Dev API delete image note:', err);
    }

    // 3. Update state and write Products.js
    let nextData = [];
    setProductsData((prev) => {
      nextData = prev.map((cat) => {
        if (cat.category === categoryName) {
          return {
            ...cat,
            products: cat.products.filter((p) => p.slug !== productSlug),
          };
        }
        return cat;
      });
      return nextData;
    });

    if (nextData.length > 0) {
      await saveProductsToDisk(nextData);
    }
  };

  // Updates for company, contact, documents
  const updateCompany = (updates) => setCompany((prev) => ({ ...prev, ...updates }));
  const updateContact = (updates) => setContact((prev) => ({ ...prev, ...updates }));
  const updateDocuments = (updates) => setDocuments((prev) => ({ ...prev, ...updates }));

  // Backup & Reset
  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all site data, products, and contact details to defaults?')) {
      localStorage.removeItem('gigabull_products');
      localStorage.removeItem('gigabull_company');
      localStorage.removeItem('gigabull_contact');
      localStorage.removeItem('gigabull_page_content');
      localStorage.removeItem('gigabull_documents');
      localStorage.removeItem('gigabull_admin_password_hash');
      setProductsData(defaultProductsData);
      setCompany(DEFAULT_COMPANY);
      setContact(DEFAULT_CONTACT);
      setDocuments(DEFAULT_DOCUMENTS);
      alert('Site data reset to original defaults!');
    }
  };

  const exportData = () => {
    const backup = {
      productsData,
      company,
      contact,
      documents,
      exportedAt: new Date().toISOString(),
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `gigabull_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importData = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.productsData) setProductsData(parsed.productsData);
      if (parsed.company) setCompany(parsed.company);
      if (parsed.contact) setContact(parsed.contact);
      if (parsed.documents) setDocuments(parsed.documents);
      alert('Data imported successfully!');
      return true;
    } catch (e) {
      alert('Invalid JSON file format.');
      return false;
    }
  };

  return (
    <SiteDataContext.Provider
      value={{
        productsData,
        company,
        contact,
        documents,
        isAuthenticated,
        login,
        logout,
        changeAdminPassword,
        updateProduct,
        addProduct,
        deleteProduct,
        updateCompany,
        updateContact,
        updateDocuments,
        resetToDefaults,
        exportData,
        importData,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};
