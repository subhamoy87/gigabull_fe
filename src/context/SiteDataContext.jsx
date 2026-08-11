import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultProductsData from '../data/Products.js';
import { ADMIN_CONFIG } from '../data/AdminConfig.js';
import { logoWithTextImg } from '../assets/shared';
// import { RCMCCertificate, BrochureGigabull2025 } from '../assets/pdfs'; // Local PDF fallback import (disabled)
import { ADMIN_LOGIN_API_URL, ADMIN_CHANGE_PASSWORD_API_URL, PRODUCTS_API_URL, SAVE_PRODUCTS_API_URL, DOCUMENTS_API_URL, SAVE_DOCUMENTS_API_URL } from '../config/config.js';
import { getIDBItem, setIDBItem } from '../utils/idbStorage';
import { supabase, isSupabaseConfigured, getSupabaseStorageUrl } from '../config/supabaseClient';

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
  certificateName: 'RCMC Certificate.pdf',
  certificateUrl: getSupabaseStorageUrl('pdfs/rcmc-certificate.pdf'), // || RCMCCertificate,
  brochureName: 'Brochure Gigabull.pdf',
  brochureUrl: getSupabaseStorageUrl('pdfs/gigabull-brochure.pdf'), // || BrochureGigabull2025,
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
  // 1. Products Data State (Pre-populated catalog + Admin CRUD overrides)
  const [productsData, setProductsData] = useState(() => {
    try {
      const storedProducts = localStorage.getItem('gigabull_products');
      if (storedProducts) {
        const parsed = JSON.parse(storedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return defaultProductsData;
    } catch (e) {
      return defaultProductsData;
    }
  });

  // 2. Company Info State
  const [company, setCompany] = useState(() => {
    try {
      const storedCompany = localStorage.getItem('gigabull_company');
      return storedCompany ? JSON.parse(storedCompany) : DEFAULT_COMPANY;
    } catch (e) {
      return DEFAULT_COMPANY;
    }
  });

  // 3. Contact State (Static frontend default contact info)
  const contact = DEFAULT_CONTACT;

  // 5. Documents State (PDFs for Certificate and Brochure)
  const [documents, setDocuments] = useState(() => {
    try {
      const storedDocs = localStorage.getItem('gigabull_documents_meta');
      return storedDocs ? { ...DEFAULT_DOCUMENTS, ...JSON.parse(storedDocs) } : DEFAULT_DOCUMENTS;
    } catch (e) {
      return DEFAULT_DOCUMENTS;
    }
  });

  // Helper: Fetch products from Supabase database
  const fetchSupabaseProducts = async () => {
    if (!isSupabaseConfigured()) return null;
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (error || !data || data.length === 0) return null;

      const categoryMap = {};
      data.forEach((row) => {
        const cat = row.category || "Men's Collection";
        if (!categoryMap[cat]) {
          categoryMap[cat] = { category: cat, products: [] };
        }
        categoryMap[cat].products.push({
          name: row.name,
          slug: row.slug,
          tags: row.tags || [],
          isModelImage: row.is_model_image,
          isShowcase: row.is_showcase,
          images: row.images || [],
          details: row.details || {},
        });
      });
      return Object.values(categoryMap);
    } catch (err) {
      console.warn('Error fetching Supabase products:', err);
      return null;
    }
  };

  // Helper: Fetch site settings (company, documents, admin config) from Supabase
  const fetchSupabaseSettings = async () => {
    if (!isSupabaseConfigured()) return;
    try {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (error || !data) return;
      data.forEach((row) => {
        if (row.key === 'company' && row.data) setCompany((prev) => ({ ...prev, ...row.data }));
        if (row.key === 'documents' && row.data) setDocuments((prev) => ({ ...prev, ...row.data }));
      });
    } catch (err) {
      console.warn('Error fetching Supabase settings:', err);
    }
  };

  // Supabase Initial Fetch & Real-Time Sync Subscriptions
  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const initSupabase = async () => {
      const prods = await fetchSupabaseProducts();
      if (prods && prods.length > 0) {
        setProductsData(prods);
      }
      await fetchSupabaseSettings();
    };
    initSupabase();

    // Realtime channel for products table
    const productChannel = supabase
      .channel('public:products')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, async () => {
        const updated = await fetchSupabaseProducts();
        if (updated) setProductsData(updated);
      })
      .subscribe();

    // Realtime channel for site_settings table
    const settingsChannel = supabase
      .channel('public:site_settings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, async () => {
        await fetchSupabaseSettings();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(productChannel);
      supabase.removeChannel(settingsChannel);
    };
  }, []);

  // Load IndexedDB documents on mount
  useEffect(() => {
    const loadIDBDocuments = async () => {
      try {
        const certName = await getIDBItem('certificateName');
        const certUrl = await getIDBItem('certificateUrl');
        const brochureName = await getIDBItem('brochureName');
        const brochureUrl = await getIDBItem('brochureUrl');

        if (certName || brochureName || certUrl || brochureUrl) {
          setDocuments((prev) => ({
            ...prev,
            certificateName: certName || prev.certificateName,
            certificateUrl: certUrl || prev.certificateUrl,
            brochureName: brochureName || prev.brochureName,
            brochureUrl: brochureUrl || prev.brochureUrl,
          }));
        }
      } catch (err) {
        console.warn('Error loading IDB documents:', err);
      }
    };
    loadIDBDocuments();
  }, []);

  // Fetch server documents on component mount
  useEffect(() => {
    const fetchServerDocuments = async () => {
      try {
        const res = await fetch(`${DOCUMENTS_API_URL}?t=${Date.now()}`, { cache: 'no-store' });
        const data = await res.json();
        if (res.ok && data.success && data.documents) {
          setDocuments((prev) => ({
            ...prev,
            ...data.documents,
          }));
        }
      } catch (err) {
        console.warn('Could not fetch documents from server, using local fallback:', err);
      }
    };
    fetchServerDocuments();
  }, []);

  // 6. Admin Authentication & Session State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('gigabull_admin_session') === 'true';
  });

  // Clear legacy localStorage & sessionStorage document keys to eliminate stale cache
  useEffect(() => {
    localStorage.removeItem('gigabull_documents');
    sessionStorage.removeItem('gigabull_session_cert');
    sessionStorage.removeItem('gigabull_session_brochure');
    localStorage.removeItem('gigabull_admin_password');
    localStorage.removeItem('gigabull_admin_password_hash');
    localStorage.removeItem('gigabull_page_content');
    localStorage.removeItem('gigabull_contact');
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('gigabull_products', JSON.stringify(productsData));
    } catch (e) {
      console.error('Error saving products data', e);
    }
  }, [productsData]);

  useEffect(() => {
    try {
      localStorage.setItem('gigabull_company', JSON.stringify(company));
    } catch (e) {
      console.error('Error saving company data', e);
    }
  }, [company]);

  useEffect(() => {
    try {
      localStorage.setItem('gigabull_documents_meta', JSON.stringify(documents));
    } catch (e) {
      console.error('Error saving documents meta', e);
    }
    if (documents.certificateName) {
      setIDBItem('certificateName', documents.certificateName);
    }
    if (documents.certificateUrl) {
      setIDBItem('certificateUrl', documents.certificateUrl);
    }
    if (documents.brochureName) {
      setIDBItem('brochureName', documents.brochureName);
    }
    if (documents.brochureUrl) {
      setIDBItem('brochureUrl', documents.brochureUrl);
    }
  }, [documents]);

  // Option 1 Admin Authentication (Supabase DB + Local Fallback)
  const login = async (password) => {
    const inputHash = await hashPassword(password);

    // 1. Try Supabase site_settings table ('admin_config')
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('data')
          .eq('key', 'admin_config')
          .single();

        if (data && data.data && data.data.passwordHash) {
          if (inputHash === data.data.passwordHash) {
            sessionStorage.setItem('gigabull_admin_session', 'true');
            setIsAuthenticated(true);
            return true;
          }
        }
      } catch (err) {
        console.warn('Supabase admin login check error:', err);
      }
    }

    // 2. Server-side API endpoint fallback
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
    }

    // 3. Static ADMIN_CONFIG fallback
    if (inputHash === ADMIN_CONFIG.passwordHash) {
      sessionStorage.setItem('gigabull_admin_session', 'true');
      setIsAuthenticated(true);
      return true;
    }

    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('gigabull_admin_session');
    setIsAuthenticated(false);
  };

  // Change Admin Password (updates Supabase site_settings 'admin_config')
  const changeAdminPassword = async (newPass) => {
    const newHash = await hashPassword(newPass);

    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('site_settings')
          .upsert({
            key: 'admin_config',
            data: { passwordHash: newHash },
          }, { onConflict: 'key' });
      } catch (err) {
        console.warn('Error saving password hash to Supabase:', err);
      }
    }

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

    return { success: true, message: 'Admin password hash updated successfully' };
  };

  const saveProductsToDisk = async (newProductsData) => {
    try {
      await fetch(SAVE_PRODUCTS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productsData: newProductsData }),
      });
    } catch (err) {
      console.warn('Error saving products to server:', err);
    }
  };

  // Products CRUD (Supabase + Local Disk + State)
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

    // Save to Supabase DB
    if (isSupabaseConfigured()) {
      try {
        const cleanImages = (cleanProduct.images || []).map((img) => typeof img === 'string' ? img : String(img));
        await supabase
          .from('products')
          .upsert({
            slug: productSlug,
            category: categoryName,
            name: cleanProduct.name,
            tags: cleanProduct.tags || [],
            is_model_image: !!cleanProduct.isModelImage,
            is_showcase: !!cleanProduct.isShowcase,
            images: cleanImages,
            details: cleanProduct.details || {},
          }, { onConflict: 'slug' });
      } catch (err) {
        console.warn('Supabase product update error:', err);
      }
    }

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

    // Save to Supabase DB
    if (isSupabaseConfigured()) {
      try {
        const cleanImages = (newProduct.images || []).map((img) => typeof img === 'string' ? img : String(img));
        await supabase
          .from('products')
          .upsert({
            slug: newProduct.slug,
            category: categoryName,
            name: newProduct.name,
            tags: newProduct.tags || [],
            is_model_image: !!newProduct.isModelImage,
            is_showcase: !!newProduct.isShowcase,
            images: cleanImages,
            details: newProduct.details || {},
          }, { onConflict: 'slug' });
      } catch (err) {
        console.warn('Supabase product add error:', err);
      }
    }

    if (nextData.length > 0) {
      await saveProductsToDisk(nextData);
    }
  };

  const deleteProduct = async (categoryName, productSlug) => {
    let imagesToDelete = [];
    productsData.forEach((cat) => {
      if (cat.category === categoryName) {
        const found = cat.products.find((p) => p.slug === productSlug);
        if (found && Array.isArray(found.images)) {
          imagesToDelete = found.images;
        }
      }
    });

    // Delete from Supabase DB
    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('products')
          .delete()
          .eq('slug', productSlug);
      } catch (err) {
        console.warn('Supabase product delete error:', err);
      }
    }

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

  const updateCompany = async (updates) => {
    setCompany((prev) => {
      const nextCompany = { ...prev, ...updates };
      if (isSupabaseConfigured()) {
        supabase
          .from('site_settings')
          .upsert({ key: 'company', data: nextCompany }, { onConflict: 'key' })
          .catch((err) => console.warn('Error saving company to Supabase:', err));
      }
      return nextCompany;
    });
  };

  const updateDocuments = async (updates) => {
    try {
      if (updates.certificateUrl) {
        await deleteIDBItem('certificateUrl');
        await setIDBItem('certificateUrl', updates.certificateUrl);
      }
      if (updates.certificateName) {
        await deleteIDBItem('certificateName');
        await setIDBItem('certificateName', updates.certificateName);
      }
      if (updates.brochureUrl) {
        await deleteIDBItem('brochureUrl');
        await setIDBItem('brochureUrl', updates.brochureUrl);
      }
      if (updates.brochureName) {
        await deleteIDBItem('brochureName');
        await setIDBItem('brochureName', updates.brochureName);
      }
    } catch (err) {
      console.warn('IDB purge and save note:', err);
    }

    setDocuments((prev) => {
      const nextDocs = { ...prev, ...updates };
      if (isSupabaseConfigured()) {
        supabase
          .from('site_settings')
          .upsert({ key: 'documents', data: nextDocs }, { onConflict: 'key' })
          .catch((err) => console.warn('Error saving documents to Supabase:', err));
      }
      fetch(SAVE_DOCUMENTS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documents: nextDocs }),
      }).catch((err) => console.warn('Error saving documents to server:', err));
      return nextDocs;
    });
  };

  // Upload PDF file to Supabase Storage Bucket ('site-documents') with automatic overwrite
  const uploadPdfToSupabase = async (file, docType) => {
    if (!isSupabaseConfigured()) {
      return { success: false, message: 'Supabase credentials not configured in .env' };
    }

    try {
      // Fixed storage path for each document type to ensure overwriting in place
      const filePath = docType === 'certificate' ? 'pdfs/rcmc-certificate.pdf' : 'pdfs/gigabull-brochure.pdf';

      // 1. Upload & Overwrite in place with explicit PDF content-type
      const { data, error } = await supabase.storage
        .from('site-documents')
        .upload(filePath, file, {
          cacheControl: '0',
          contentType: 'application/pdf',
          upsert: true,
        });

      if (error) throw error;

      // 2. Get Public URL
      const { data: urlData } = supabase.storage
        .from('site-documents')
        .getPublicUrl(filePath);

      // Append timestamp query parameter to bust browser cache on updates
      const publicUrl = `${urlData.publicUrl}?t=${Date.now()}`;

      const docUpdates = docType === 'certificate'
        ? { certificateUrl: publicUrl, certificateName: file.name }
        : { brochureUrl: publicUrl, brochureName: file.name };

      await updateDocuments(docUpdates);

      return { success: true, url: publicUrl, fileName: file.name };
    } catch (err) {
      console.error('Supabase PDF upload error:', err);
      return { success: false, error: err.message };
    }
  };

  // Backup & Reset
  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all site data, products, and documents to defaults?')) {
      localStorage.removeItem('gigabull_products');
      localStorage.removeItem('gigabull_company');
      localStorage.removeItem('gigabull_contact');
      localStorage.removeItem('gigabull_page_content');
      localStorage.removeItem('gigabull_documents');
      localStorage.removeItem('gigabull_admin_password_hash');
      setProductsData(defaultProductsData);
      setCompany(DEFAULT_COMPANY);
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
        updateDocuments,
        uploadPdfToSupabase,
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
