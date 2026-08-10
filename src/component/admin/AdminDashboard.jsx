import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { convertImageToWebP } from '../../lib/utils';
import {
  LayoutDashboard,
  Package,
  Image as ImageIcon,
  PhoneCall,
  FileText,
  Settings,
  LogOut,
  Plus,
  Search,
  Trash2,
  Edit3,
  Check,
  Upload,
  Download,
  RotateCcw,
  ExternalLink,
  ShieldAlert,
  Save,
  X,
  Layers,
  Sparkles,
  ChevronRight,
  Eye,
  Copy
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const {
    productsData,
    company,
    contact,
    documents,
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
  } = useSiteData();

  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  // Temporary local state for forms
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [productSearch, setProductSearch] = useState('');
  const [showcaseSearchTerm, setShowcaseSearchTerm] = useState('');
  const [showcaseCategoryFilter, setShowcaseCategoryFilter] = useState('All');

  // Product Edit / Create Modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null if adding new or duplicating
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [productForm, setProductForm] = useState({
    category: "Men's Collection",
    name: '',
    slug: '',
    tags: '',
    images: [''],
    details: {
      model_no: '',
      features: '',
      pattern: '',
      card_slots: '',
      cash_compartments: '',
      material: 'Genuine Leather',
      color: '',
      description: '',
    },
  });

  // Password Form state
  const [passForm, setPassForm] = useState({ newPass: '', confirmPass: '' });
  const [passMessage, setPassMessage] = useState({ type: '', text: '' });

  // Compute Total Products
  const totalProductsCount = productsData.reduce((acc, cat) => acc + (cat.products?.length || 0), 0);

  // Filtered Products for Products Tab
  const getFilteredProducts = () => {
    let list = [];
    productsData.forEach((cat) => {
      if (selectedCategoryFilter === 'All' || cat.category === selectedCategoryFilter) {
        cat.products.forEach((p) => {
          list.push({ ...p, categoryName: cat.category });
        });
      }
    });

    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          (p.details?.model_no && p.details.model_no.toLowerCase().includes(q))
      );
    }
    return list;
  };

  // Open Edit Product Modal
  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setIsDuplicate(false);
    setProductForm({
      category: prod.categoryName,
      name: prod.name || '',
      slug: prod.slug || '',
      isShowcase: !!prod.isShowcase,
      tags: Array.isArray(prod.tags) ? prod.tags.join(', ') : (prod.tags || ''),
      images: prod.images && prod.images.length > 0 ? [...prod.images] : [''],
      details: {
        model_no: prod.details?.model_no || '',
        features: prod.details?.features || '',
        pattern: prod.details?.pattern || '',
        card_slots: prod.details?.card_slots !== undefined ? prod.details.card_slots : '',
        cash_compartments: prod.details?.cash_compartments !== undefined ? prod.details.cash_compartments : '',
        material: prod.details?.material || 'Genuine Leather',
        color: prod.details?.color || '',
        description: prod.details?.description || '',
      },
    });
    setIsProductModalOpen(true);
  };

  // Open Duplicate Product Modal
  const handleOpenDuplicateProduct = (prod) => {
    setEditingProduct(null);
    setIsDuplicate(true);
    const baseSlug = prod.slug ? `${prod.slug}-copy` : '';
    setProductForm({
      category: prod.categoryName || "Men's Collection",
      name: prod.name ? `${prod.name} (Copy)` : '',
      slug: baseSlug,
      isShowcase: !!prod.isShowcase,
      tags: Array.isArray(prod.tags) ? prod.tags.join(', ') : (prod.tags || ''),
      images: prod.images && prod.images.length > 0 ? [...prod.images] : [''],
      details: {
        model_no: prod.details?.model_no ? `${prod.details.model_no}-COPY` : '',
        features: prod.details?.features || '',
        pattern: prod.details?.pattern || '',
        card_slots: prod.details?.card_slots !== undefined ? prod.details.card_slots : '',
        cash_compartments: prod.details?.cash_compartments !== undefined ? prod.details.cash_compartments : '',
        material: prod.details?.material || 'Genuine Leather',
        color: prod.details?.color || '',
        description: prod.details?.description || '',
      },
    });
    setIsProductModalOpen(true);
  };

  // Open Add Product Modal
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setIsDuplicate(false);
    setProductForm({
      category: "Men's Collection",
      name: '',
      slug: '',
      isShowcase: false,
      tags: 'leather, wallet, genuine',
      images: [''],
      details: {
        model_no: '',
        features: '',
        pattern: '',
        card_slots: '',
        cash_compartments: '',
        material: 'Genuine Leather',
        color: '',
        description: '',
      },
    });
    setIsProductModalOpen(true);
  };

  // Image Upload Handler (convert to WEBP DataURL using HTML5 Canvas for persistent storage)
  const handleImageFileUpload = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const webpDataUrl = await convertImageToWebP(file);
        const newImages = [...productForm.images];
        newImages[index] = webpDataUrl;
        setProductForm((prev) => ({ ...prev, images: newImages }));
      } catch (err) {
        console.error('Error converting image to WebP:', err);
        const reader = new FileReader();
        reader.onloadend = () => {
          const newImages = [...productForm.images];
          newImages[index] = reader.result;
          setProductForm((prev) => ({ ...prev, images: newImages }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Save Product Form
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!productForm.name) {
      alert('Product name is required');
      return;
    }

    const generatedSlug = productForm.slug.trim()
      ? productForm.slug.trim()
      : productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const tagsArray = typeof productForm.tags === 'string'
      ? productForm.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : productForm.tags;

    // Helper to check if an image reference is an existing local asset on the server/site
    const isLocalAsset = (str) => {
      if (typeof str !== 'string') return false;
      if (str.startsWith('data:image/')) return false;
      if (str.includes('/src/assets/') || str.includes('/assets/')) return true;
      if (str.startsWith('/') || str.startsWith('./') || str.startsWith('../')) return true;
      try {
        if (typeof window !== 'undefined' && window.location) {
          const urlObj = new URL(str, window.location.href);
          if (urlObj.origin === window.location.origin) return true;
        }
      } catch (e) {}
      return false;
    };

    // Convert any raw / non-webp image inputs to WEBP using Browser HTML5 Canvas before uploading
    let processedImages = await Promise.all(
      productForm.images.filter(Boolean).map(async (img) => {
        // Only convert to WebP base64 if it's a new file/dataURL or an external remote URL
        if (typeof img === 'string' && !isLocalAsset(img)) {
          if (img.startsWith('data:image/webp;base64,')) {
            return img;
          }
          if (img.startsWith('data:image/') || img.startsWith('http://') || img.startsWith('https://')) {
            try {
              return await convertImageToWebP(img);
            } catch (err) {
              console.warn('WebP conversion fallback note for image:', err);
              return img;
            }
          }
        }
        return img;
      })
    );

    // Save uploaded Base64 images directly to target category folder on disk
    const hasBase64Images = processedImages.some(
      (img) => typeof img === 'string' && img.startsWith('data:image/')
    );

    if (hasBase64Images) {
      try {
        const res = await fetch('/api/save-product-images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category: productForm.category,
            slug: generatedSlug,
            model_no: productForm.details?.model_no || '',
            color: productForm.details?.color || '',
            images: processedImages,
          }),
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.savedImages)) {
          processedImages = data.savedImages;
        }
      } catch (err) {
        console.warn('Dev API image save note:', err);
      }
    }

    // Clean up removed image files from disk if editing product
    if (editingProduct && Array.isArray(editingProduct.images)) {
      const removedImages = editingProduct.images.filter((oldImg) => !processedImages.includes(oldImg));
      if (removedImages.length > 0) {
        try {
          await fetch('/api/delete-product-images', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              category: editingProduct.categoryName,
              slug: editingProduct.slug,
              imagePaths: removedImages,
            }),
          });
        } catch (err) {
          console.warn('Dev API remove old images note:', err);
        }
      }
    }

    const formattedProduct = {
      name: productForm.name,
      slug: generatedSlug,
      tags: tagsArray,
      isShowcase: !!productForm.isShowcase,
      images: processedImages,
      details: { ...productForm.details },
    };

    if (editingProduct) {
      await updateProduct(editingProduct.categoryName, editingProduct.slug, formattedProduct);
    } else {
      await addProduct(productForm.category, formattedProduct);
    }

    setIsProductModalOpen(false);
    window.location.reload();
  };

  // Handle Logo Upload and overwrite logoWithText.webp on disk
  const handleLogoFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const webpDataUrl = await convertImageToWebP(file);
        updateCompany({ logoUrl: webpDataUrl });
        const res = await fetch('/api/upload-logo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileData: webpDataUrl }),
        });
        const data = await res.json();
        if (data.success) {
          alert('Logo successfully uploaded and saved as "logoWithText.webp" in src/assets/shared/!');
        } else {
          console.error('Logo upload error:', data.error);
        }
      } catch (err) {
        console.warn('Dev API logo upload note:', err);
      }
    }
  };

  // Handle PDF Document Upload (Certificate / Brochure) and overwrite file on disk
  const handlePdfFileUpload = (e, docKey, targetFilename) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        alert('Please select a valid PDF file (.pdf)');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = async () => {
        const fileData = reader.result;
        // 1. Update dynamic state
        updateDocuments({ [docKey]: fileData });

        // 2. Overwrite file on disk in src/assets/pdfs/<targetFilename>
        try {
          const res = await fetch('/api/upload-pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename: targetFilename, fileData }),
          });
          const data = await res.json();
          if (data.success) {
            alert(`File successfully uploaded and saved as "${targetFilename}" inside src/assets/pdfs/!`);
          } else {
            console.error('PDF upload error:', data.error);
          }
        } catch (err) {
          console.warn('Dev API upload note:', err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Password change submission
  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    if (!passForm.newPass) {
      setPassMessage({ type: 'error', text: 'Password cannot be empty.' });
      return;
    }
    if (passForm.newPass !== passForm.confirmPass) {
      setPassMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }
    const res = await changeAdminPassword(passForm.newPass);
    if (res && res.success) {
      setPassMessage({ type: 'success', text: res.message || 'Admin password updated successfully!' });
      setPassForm({ newPass: '', confirmPass: '' });
    } else {
      setPassMessage({ type: 'error', text: 'Failed to update admin password on server.' });
    }
  };

  // Backup Import Handler
  const handleImportFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        importData(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className='min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-amber-500 selection:text-slate-950'>
      {/* SIDEBAR */}
      <aside className='w-full md:w-72 bg-slate-900/90 border-r border-slate-800 flex flex-col justify-between shrink-0'>
        <div>
          {/* Top Brand Header */}
          <div className='p-6 border-b border-slate-800/80 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              {company.logoUrl ? (
                <img src={company.logoUrl} alt='Logo' className='h-8 object-contain bg-white/10 p-1 rounded-lg' />
              ) : (
                <div className='w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-sm'>
                  G
                </div>
              )}
              <div>
                {/* <h2 className='font-bold text-white tracking-wide text-base leading-tight'>
                  {company.brandName || 'Gigabull'}
                </h2> */}
                <span className='font-bold text-white tracking-wide text-base leading-tight'>
                  Admin Panel
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className='p-4 space-y-1.5'>
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'products', label: 'Product Manager', icon: Package, badge: totalProductsCount },
              { id: 'branding', label: 'Branding & Logo', icon: ImageIcon },
              { id: 'contact', label: 'Contact Details', icon: PhoneCall },
              { id: 'settings', label: 'Security & Backup', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${isActive
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                    }`}
                >
                  <div className='flex items-center gap-3'>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-300'
                        }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className='p-4 border-t border-slate-800 space-y-2'>
          <button
            onClick={() => navigate('/')}
            className='w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer'
          >
            <Eye className='w-4 h-4 text-amber-400' /> View Storefront
          </button>
          <button
            onClick={logout}
            className='w-full py-2.5 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer'
          >
            <LogOut className='w-4 h-4' /> Sign Out Admin
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className='flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full'>
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className='space-y-8'>
            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-3xl font-bold text-white tracking-tight'>Dashboard Overview</h1>
                <p className='text-slate-400 text-sm mt-1'>
                  Manage catalog, company branding, text copy, and support details in real-time.
                </p>
              </div>
              <button
                onClick={handleOpenAddProduct}
                className='py-3 px-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition cursor-pointer text-sm'
              >
                <Plus className='w-5 h-5' /> Add New Product
              </button>
            </div>

            {/* Metric Cards Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
              <div className='bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden'>
                <div className='text-amber-400 font-bold text-xs uppercase tracking-wider mb-2'>Total Products</div>
                <div className='text-4xl font-extrabold text-white'>{totalProductsCount}</div>
                <div className='text-slate-400 text-xs mt-2'>Active in Storefront</div>
                <Package className='w-16 h-16 text-slate-800 absolute -right-2 -bottom-2 opacity-50' />
              </div>

              <div className='bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden'>
                <div className='text-amber-400 font-bold text-xs uppercase tracking-wider mb-2'>Categories</div>
                <div className='text-4xl font-extrabold text-white'>{productsData.length}</div>
                <div className='text-slate-400 text-xs mt-2'>Men's, Women's & Accessories</div>
                <Layers className='w-16 h-16 text-slate-800 absolute -right-2 -bottom-2 opacity-50' />
              </div>

              <div className='bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden'>
                <div className='text-amber-400 font-bold text-xs uppercase tracking-wider mb-2'>Support Contact</div>
                <div className='text-base font-semibold text-white truncate'>{contact.email}</div>
                <div className='text-slate-400 text-xs mt-2 truncate'>{contact.phone}</div>
                <PhoneCall className='w-16 h-16 text-slate-800 absolute -right-2 -bottom-2 opacity-50' />
              </div>

              <div className='bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden'>
                <div className='text-amber-400 font-bold text-xs uppercase tracking-wider mb-2'>System Persistence</div>
                <div className='text-base font-semibold text-emerald-400 flex items-center gap-1.5'>
                  <span className='w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse' />
                  LocalStorage Active
                </div>
                <div className='text-slate-400 text-xs mt-2'>Instant Site Syncing</div>
                <Sparkles className='w-16 h-16 text-slate-800 absolute -right-2 -bottom-2 opacity-50' />
              </div>
            </div>

            {/* Quick Action Panels */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4'>
                <h3 className='font-bold text-lg text-white flex items-center gap-2'>
                  <ImageIcon className='w-5 h-5 text-amber-400' /> Company Logo & Branding
                </h3>
                <div className='flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800'>
                  {company.logoUrl ? (
                    <img src={company.logoUrl} alt='Logo' className='h-12 object-contain bg-slate-800 p-2 rounded-lg' />
                  ) : (
                    <div className='h-12 w-12 bg-slate-800 rounded-lg flex items-center justify-center text-slate-500'>
                      No Logo
                    </div>
                  )}
                  <div>
                    <div className='font-bold text-white text-sm'>{company.brandName}</div>
                    <div className='text-slate-400 text-xs'>{company.tagline}</div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('branding')}
                  className='py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition cursor-pointer'
                >
                  Manage Logo & Branding &rarr;
                </button>
              </div>

              <div className='bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4'>
                <h3 className='font-bold text-lg text-white flex items-center gap-2'>
                  <PhoneCall className='w-5 h-5 text-amber-400' /> Reach Us Info
                </h3>
                <div className='bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5 text-xs text-slate-300'>
                  <div><strong className='text-slate-400'>Email:</strong> {contact.email}</div>
                  <div><strong className='text-slate-400'>Phone:</strong> {contact.phone}</div>
                  <div className='truncate'><strong className='text-slate-400'>Address:</strong> {contact.address}</div>
                </div>
                <button
                  onClick={() => setActiveTab('contact')}
                  className='py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition cursor-pointer'
                >
                  Edit Contact Info &rarr;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGER */}
        {activeTab === 'products' && (
          <div className='space-y-6'>
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
              <div>
                <h1 className='text-3xl font-bold text-white tracking-tight'>Product Manager</h1>
                <p className='text-slate-400 text-sm mt-1'>
                  Add, update, or remove products, edit titles, features, and upload custom images.
                </p>
              </div>
              <button
                onClick={handleOpenAddProduct}
                className='py-3 px-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition cursor-pointer text-sm shrink-0'
              >
                <Plus className='w-5 h-5' /> Add New Product
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className='bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4'>
              {/* Categories Filter Pills */}
              <div className='flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0'>
                {['All', "Men's Collection", "Women's Collection", 'Accessories'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoryFilter(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition shrink-0 cursor-pointer ${selectedCategoryFilter === cat
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className='relative w-full md:w-72'>
                <input
                  type='text'
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder='Search product by name/slug...'
                  className='w-full px-4 py-2.5 pl-10 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500'
                />
                <Search className='w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2' />
              </div>
            </div>

            {/* Products Data Table */}
            <div className='bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl'>
              <div className='overflow-x-auto'>
                <table className='w-full text-left text-xs text-slate-300'>
                  <thead className='bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800'>
                    <tr>
                      <th className='p-4'>Image</th>
                      <th className='p-4'>Product Name</th>
                      <th className='p-4'>Category</th>
                      <th className='p-4'>Model No</th>
                      <th className='p-4'>Featured</th>
                      <th className='p-4'>Material</th>
                      <th className='p-4 text-right'>Actions</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-slate-800/80'>
                    {getFilteredProducts().length === 0 ? (
                      <tr>
                        <td colSpan={7} className='p-8 text-center text-slate-500'>
                          No products found matching your search.
                        </td>
                      </tr>
                    ) : (
                      getFilteredProducts().map((prod, idx) => (
                        <tr key={`${prod.slug}-${idx}`} className='hover:bg-slate-800/40 transition'>
                          <td className='p-4'>
                            {prod.images && prod.images[0] ? (
                              <img
                                src={prod.images[0]}
                                alt={prod.name}
                                className='w-12 h-12 object-cover rounded-lg border border-slate-700 bg-slate-950'
                              />
                            ) : (
                              <div className='w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 text-[10px]'>
                                No Img
                              </div>
                            )}
                          </td>
                          <td className='p-4 font-semibold text-white max-w-xs truncate'>
                            {prod.name}
                            <div className='text-[10px] text-slate-400 font-mono font-normal'>/{prod.slug}</div>
                          </td>
                          <td className='p-4'>
                            <span className='px-2 py-1 rounded bg-slate-800 text-amber-400 text-[11px] font-medium border border-slate-700'>
                              {prod.categoryName}
                            </span>
                          </td>
                          <td className='p-4 text-slate-400'>{prod.details?.model_no || 'N/A'}</td>
                          <td className='p-4'>
                            <button
                              type='button'
                              onClick={async () => {
                                await updateProduct(prod.categoryName, prod.slug, {
                                  ...prod,
                                  isShowcase: !prod.isShowcase,
                                });
                                window.location.reload();
                              }}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition cursor-pointer border ${
                                prod.isShowcase
                                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/40 hover:bg-amber-500/20'
                                  : 'bg-slate-950 text-slate-500 border-slate-800 hover:border-slate-700 hover:text-slate-300'
                              }`}
                              title={
                                prod.isShowcase
                                  ? 'Featured on Homepage Showcase (Click to remove)'
                                  : 'Not Featured (Click to add to Homepage Showcase)'
                              }
                            >
                              <span>{prod.isShowcase ? '★ Yes' : '☆ No'}</span>
                            </button>
                          </td>
                          <td className='p-4 text-slate-400'>{prod.details?.material || 'Genuine Leather'}</td>
                          <td className='p-4 text-right space-x-2'>
                            <button
                              onClick={() => handleOpenEditProduct(prod)}
                              className='p-2 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition cursor-pointer'
                              title='Edit Product'
                            >
                              <Edit3 className='w-4 h-4' />
                            </button>
                            <button
                              onClick={() => handleOpenDuplicateProduct(prod)}
                              className='p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg transition cursor-pointer'
                              title='Duplicate Product'
                            >
                              <Copy className='w-4 h-4' />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete "${prod.name}" permanently?`)) {
                                  deleteProduct(prod.categoryName, prod.slug);
                                }
                              }}
                              className='p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 rounded-lg transition cursor-pointer'
                              title='Delete Product'
                            >
                              <Trash2 className='w-4 h-4' />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BRANDING & LOGO */}
        {activeTab === 'branding' && (
          <div className='space-y-6 max-w-3xl'>
            <div>
              <h1 className='text-3xl font-bold text-white tracking-tight'>Branding & Logo Settings</h1>
              <p className='text-slate-400 text-sm mt-1'>
                Update Company Logo, Brand Name, Tagline, and Header Announcement banner.
              </p>
            </div>

            <div className='bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl'>
              {/* Logo Preview & Uploader */}
              <div className='space-y-3'>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-300'>
                  Company Logo Image
                </label>
                <div className='flex flex-col sm:flex-row items-center gap-6 bg-slate-950 p-5 rounded-xl border border-slate-800'>
                  <div className='w-32 h-20 bg-slate-900 rounded-xl border border-slate-700 flex items-center justify-center p-2 shrink-0'>
                    {company.logoUrl ? (
                      <img src={company.logoUrl} alt='Current Logo' className='max-h-full max-w-full object-contain' />
                    ) : (
                      <span className='text-slate-500 text-xs'>No Logo Set</span>
                    )}
                  </div>
                  <div className='space-y-3 w-full'>
                    <div>
                      <span className='text-xs text-slate-400 block mb-1'>Option A: Upload Image File</span>
                      <label className='inline-flex items-center gap-2 py-2 px-4 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold rounded-xl cursor-pointer border border-slate-700 transition'>
                        <Upload className='w-4 h-4' /> Choose Logo File
                        <input type='file' accept='image/*' onChange={handleLogoFileUpload} className='hidden' />
                      </label>
                    </div>
                    <div>
                      <span className='text-xs text-slate-400 block mb-1'>Option B: Logo URL</span>
                      <input
                        type='text'
                        value={company.logoUrl || ''}
                        onChange={(e) => updateCompany({ logoUrl: e.target.value })}
                        placeholder='https://example.com/logo.png'
                        className='w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500'
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Brand Name */}
              <div className='space-y-2'>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-300'>
                  Brand Name
                </label>
                <input
                  type='text'
                  value={company.brandName || ''}
                  onChange={(e) => updateCompany({ brandName: e.target.value })}
                  className='w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500'
                />
              </div>

              {/* Tagline */}
              <div className='space-y-2'>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-300'>
                  Brand Tagline
                </label>
                <input
                  type='text'
                  value={company.tagline || ''}
                  onChange={(e) => updateCompany({ tagline: e.target.value })}
                  className='w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500'
                />
              </div>

              {/* Announcement Banner */}
              <div className='space-y-2'>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-300'>
                  Announcement / Header Notice Banner Text
                </label>
                <input
                  type='text'
                  value={company.announcementBanner || ''}
                  onChange={(e) => updateCompany({ announcementBanner: e.target.value })}
                  className='w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500'
                />
              </div>

              {/* Official PDF Documents Manager (RCMC Certificate & Product Brochure) */}
              <div className='pt-6 border-t border-slate-800 space-y-4'>
                <h3 className='font-bold text-lg text-amber-400 flex items-center justify-between'>
                  <span>PDF Documents Manager</span>
                  <span className='text-xs text-slate-400 font-normal'>RCMC Certificate & Product Brochure</span>
                </h3>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {/* RCMC Certificate Upload */}
                  <div className='bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3'>
                    <div className='flex items-center justify-between'>
                      <span className='text-xs font-bold text-white uppercase tracking-wider'>
                        RCMC Certificate PDF
                      </span>
                      <a
                        href={documents?.certificateUrl}
                        target='_blank'
                        rel='noreferrer'
                        className='text-xs text-amber-400 hover:underline flex items-center gap-1'
                      >
                        <ExternalLink className='w-3.5 h-3.5' /> Preview
                      </a>
                    </div>
                    <p className='text-xs text-slate-400'>
                      Upload a new PDF to replace <code className='text-amber-400'>RCMCCertificate.pdf</code> in <code className='text-slate-300'>src/assets/pdfs/</code>.
                    </p>
                    <label className='inline-flex items-center gap-2 py-2 px-4 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold rounded-xl cursor-pointer border border-slate-700 transition w-full justify-center'>
                      <Upload className='w-4 h-4' /> Upload New Certificate PDF
                      <input
                        type='file'
                        accept='.pdf,application/pdf'
                        onChange={(e) => handlePdfFileUpload(e, 'certificateUrl', 'RCMCCertificate.pdf')}
                        className='hidden'
                      />
                    </label>
                  </div>

                  {/* Product Brochure Upload */}
                  <div className='bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3'>
                    <div className='flex items-center justify-between'>
                      <span className='text-xs font-bold text-white uppercase tracking-wider'>
                        Product Brochure PDF
                      </span>
                      <a
                        href={documents?.brochureUrl}
                        target='_blank'
                        rel='noreferrer'
                        className='text-xs text-amber-400 hover:underline flex items-center gap-1'
                      >
                        <ExternalLink className='w-3.5 h-3.5' /> Preview
                      </a>
                    </div>
                    <p className='text-xs text-slate-400'>
                      Upload a new PDF to replace <code className='text-amber-400'>BrochureGigabull2025.pdf</code> in <code className='text-slate-300'>src/assets/pdfs/</code>.
                    </p>
                    <label className='inline-flex items-center gap-2 py-2 px-4 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold rounded-xl cursor-pointer border border-slate-700 transition w-full justify-center'>
                      <Upload className='w-4 h-4' /> Upload New Brochure PDF
                      <input
                        type='file'
                        accept='.pdf,application/pdf'
                        onChange={(e) => handlePdfFileUpload(e, 'brochureUrl', 'BrochureGigabull2025.pdf')}
                        className='hidden'
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CONTACT & REACH US */}
        {activeTab === 'contact' && (
          <div className='space-y-6 max-w-3xl'>
            <div>
              <h1 className='text-3xl font-bold text-white tracking-tight'>Contact & Reach Us Details</h1>
              <p className='text-slate-400 text-sm mt-1'>
                Update primary support email, phone numbers, office address, and social channels.
              </p>
            </div>

            <div className='bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='block text-xs font-semibold uppercase tracking-wider text-slate-300'>
                    Support Email ID
                  </label>
                  <input
                    type='email'
                    value={contact.email || ''}
                    onChange={(e) => updateContact({ email: e.target.value })}
                    className='w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='block text-xs font-semibold uppercase tracking-wider text-slate-300'>
                    Contact Phone Number
                  </label>
                  <input
                    type='text'
                    value={contact.phone || ''}
                    onChange={(e) => updateContact({ phone: e.target.value })}
                    className='w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-300'>
                  WhatsApp Contact Number
                </label>
                <input
                  type='text'
                  value={contact.whatsapp || ''}
                  onChange={(e) => updateContact({ whatsapp: e.target.value })}
                  className='w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500'
                />
              </div>

              <div className='space-y-2'>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-300'>
                  Full Office / Registered Address
                </label>
                <textarea
                  rows={3}
                  value={contact.address || ''}
                  onChange={(e) => updateContact({ address: e.target.value })}
                  className='w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500'
                />
              </div>

              {/* Social Links */}
              <div className='pt-4 border-t border-slate-800 space-y-4'>
                <h3 className='text-xs font-semibold uppercase tracking-wider text-amber-400'>
                  Social Media Links
                </h3>

                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                  <div className='space-y-1.5'>
                    <label className='text-xs text-slate-400'>Instagram</label>
                    <input
                      type='text'
                      value={contact.instagram || ''}
                      onChange={(e) => updateContact({ instagram: e.target.value })}
                      className='w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500'
                    />
                  </div>

                  <div className='space-y-1.5'>
                    <label className='text-xs text-slate-400'>Facebook</label>
                    <input
                      type='text'
                      value={contact.facebook || ''}
                      onChange={(e) => updateContact({ facebook: e.target.value })}
                      className='w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500'
                    />
                  </div>

                  <div className='space-y-1.5'>
                    <label className='text-xs text-slate-400'>LinkedIn</label>
                    <input
                      type='text'
                      value={contact.linkedin || ''}
                      onChange={(e) => updateContact({ linkedin: e.target.value })}
                      className='w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}



        {/* TAB 6: SECURITY & BACKUP */}
        {activeTab === 'settings' && (
          <div className='space-y-6 max-w-3xl'>
            <div>
              <h1 className='text-3xl font-bold text-white tracking-tight'>Security & Backup Settings</h1>
              <p className='text-slate-400 text-sm mt-1'>
                Change admin password, download database backups, restore JSON files, or reset to defaults.
              </p>
            </div>

            {/* Change Password Card */}
            <div className='bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl'>
              <h3 className='font-bold text-lg text-white flex items-center gap-2'>
                <Settings className='w-5 h-5 text-amber-400' /> Update Security Credential
              </h3>

              <form onSubmit={handlePasswordChangeSubmit} className='space-y-4 max-w-md'>
                <div className='space-y-1.5'>
                  <label className='text-xs text-slate-400'>New Admin Password</label>
                  <input
                    type='password'
                    value={passForm.newPass}
                    onChange={(e) => setPassForm((p) => ({ ...p, newPass: e.target.value }))}
                    placeholder='Enter new password'
                    className='w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white'
                  />
                </div>

                <div className='space-y-1.5'>
                  <label className='text-xs text-slate-400'>Confirm New Password</label>
                  <input
                    type='password'
                    value={passForm.confirmPass}
                    onChange={(e) => setPassForm((p) => ({ ...p, confirmPass: e.target.value }))}
                    placeholder='Confirm new password'
                    className='w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white'
                  />
                </div>

                {passMessage.text && (
                  <div
                    className={`p-3 rounded-xl text-xs font-semibold ${passMessage.type === 'error'
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}
                  >
                    {passMessage.text}
                  </div>
                )}

                <button
                  type='submit'
                  className='py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer'
                >
                  Save New Password
                </button>
              </form>
            </div>

            {/* Backup & Restore Card */}
            <div className='bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl'>
              <h3 className='font-bold text-lg text-white flex items-center gap-2'>
                <Download className='w-5 h-5 text-amber-400' /> Data Backup & Restore
              </h3>
              <p className='text-xs text-slate-400'>
                Export all website content, products, logos, and settings as a backup JSON file or upload a previous backup.
              </p>

              <div className='flex flex-wrap gap-4 pt-2'>
                <button
                  onClick={exportData}
                  className='py-2.5 px-5 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold rounded-xl flex items-center gap-2 border border-slate-700 transition cursor-pointer'
                >
                  <Download className='w-4 h-4' /> Download Backup JSON
                </button>

                <label className='py-2.5 px-5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-2 border border-slate-700 transition cursor-pointer'>
                  <Upload className='w-4 h-4 text-emerald-400' /> Restore from JSON Backup
                  <input type='file' accept='.json' onChange={handleImportFileChange} className='hidden' />
                </label>
              </div>
            </div>

            {/* Factory Reset Danger Zone */}
            <div className='bg-red-950/20 border border-red-500/30 rounded-2xl p-6 space-y-3 shadow-xl'>
              <h3 className='font-bold text-lg text-red-400 flex items-center gap-2'>
                <ShieldAlert className='w-5 h-5' /> Danger Zone - Factory Reset
              </h3>
              <p className='text-xs text-slate-400'>
                Clear all custom changes saved in browser local storage and restore original codebase defaults.
              </p>
              <button
                onClick={resetToDefaults}
                className='py-2.5 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/40 text-xs font-bold rounded-xl flex items-center gap-2 transition cursor-pointer'
              >
                <RotateCcw className='w-4 h-4' /> Reset All Site Data to Factory Defaults
              </button>
            </div>
          </div>
        )}
      </main>

      {/* PRODUCT EDIT / ADD / DUPLICATE MODAL */}
      {isProductModalOpen && (
        <div className='fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto'>
          <div className='bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl my-8'>
            <div className='p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950'>
              <h3 className='font-bold text-xl text-white'>
                {editingProduct
                  ? `Edit Product: ${editingProduct.name}`
                  : isDuplicate
                  ? `Duplicate Product: ${productForm.name}`
                  : 'Add New Product'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className='p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer'
              >
                <X className='w-6 h-6' />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className='p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs text-slate-300'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='space-y-1.5'>
                  <label className='font-semibold text-slate-400'>Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm((p) => ({ ...p, category: e.target.value }))}
                    className='w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white'
                  >
                    <option value="Men's Collection">Men's Collection</option>
                    <option value="Women's Collection">Women's Collection</option>
                    <option value='Accessories'>Accessories</option>
                  </select>
                </div>
                <div className='space-y-1.5'>
                  <label className='font-semibold text-slate-400'>Product Name *</label>
                  <input
                    type='text'
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm((p) => ({ ...p, name: e.target.value }))}
                    className='w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white'
                  />
                </div>
              </div>

              <div className='p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3'>
                <input
                  type='checkbox'
                  id='modalIsShowcase'
                  checked={!!productForm.isShowcase}
                  onChange={(e) => setProductForm((p) => ({ ...p, isShowcase: e.target.checked }))}
                  className='w-4 h-4 text-amber-500 rounded border-slate-700 bg-slate-900 focus:ring-amber-500 cursor-pointer'
                />
                <label htmlFor='modalIsShowcase' className='font-semibold text-amber-400 text-xs cursor-pointer select-none'>
                  Feature product in Homepage Showcase section ("Our Products")
                </label>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                <div className='space-y-1.5'>
                  <label className='font-semibold text-slate-400'>Slug (URL path)</label>
                  <input
                    type='text'
                    value={productForm.slug}
                    onChange={(e) => setProductForm((p) => ({ ...p, slug: e.target.value }))}
                    placeholder='auto-generated-if-empty'
                    className='w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white'
                  />
                </div>

                <div className='space-y-1.5'>
                  <label className='font-semibold text-slate-400'>Model Number / SKU</label>
                  <input
                    type='text'
                    value={productForm.details.model_no}
                    onChange={(e) =>
                      setProductForm((p) => ({
                        ...p,
                        details: { ...p.details, model_no: e.target.value },
                      }))
                    }
                    className='w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white'
                  />
                </div>

                <div className='space-y-1.5'>
                  <label className='font-semibold text-slate-400'>Tags (comma separated)</label>
                  <input
                    type='text'
                    value={productForm.tags}
                    onChange={(e) => setProductForm((p) => ({ ...p, tags: e.target.value }))}
                    placeholder='leather, wallet, genuine'
                    className='w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                <div className='space-y-1.5'>
                  <label className='font-semibold text-slate-400'>Material</label>
                  <input
                    type='text'
                    value={productForm.details.material}
                    onChange={(e) =>
                      setProductForm((p) => ({
                        ...p,
                        details: { ...p.details, material: e.target.value },
                      }))
                    }
                    className='w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white'
                  />
                </div>

                <div className='space-y-1.5'>
                  <label className='font-semibold text-slate-400'>Color / Finish</label>
                  <input
                    type='text'
                    value={productForm.details.color}
                    onChange={(e) =>
                      setProductForm((p) => ({
                        ...p,
                        details: { ...p.details, color: e.target.value },
                      }))
                    }
                    className='w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white'
                  />
                </div>

                <div className='space-y-1.5'>
                  <label className='font-semibold text-slate-400'>Pattern</label>
                  <input
                    type='text'
                    value={productForm.details.pattern}
                    onChange={(e) =>
                      setProductForm((p) => ({
                        ...p,
                        details: { ...p.details, pattern: e.target.value },
                      }))
                    }
                    placeholder='e.g. Solid, Animal Print'
                    className='w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                <div className='space-y-1.5'>
                  <label className='font-semibold text-slate-400'>Card Slots</label>
                  <input
                    type='text'
                    value={productForm.details.card_slots}
                    onChange={(e) =>
                      setProductForm((p) => ({
                        ...p,
                        details: { ...p.details, card_slots: e.target.value },
                      }))
                    }
                    placeholder='e.g. 9'
                    className='w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white'
                  />
                </div>

                <div className='space-y-1.5'>
                  <label className='font-semibold text-slate-400'>Cash Compartments</label>
                  <input
                    type='text'
                    value={productForm.details.cash_compartments}
                    onChange={(e) =>
                      setProductForm((p) => ({
                        ...p,
                        details: { ...p.details, cash_compartments: e.target.value },
                      }))
                    }
                    placeholder='e.g. 2'
                    className='w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white'
                  />
                </div>

                <div className='space-y-1.5'>
                  <label className='font-semibold text-slate-400'>Features</label>
                  <input
                    type='text'
                    value={productForm.details.features}
                    onChange={(e) =>
                      setProductForm((p) => ({
                        ...p,
                        details: { ...p.details, features: e.target.value },
                      }))
                    }
                    placeholder='Key features'
                    className='w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white'
                  />
                </div>
              </div>

              {/* Images Section */}
              <div className='space-y-2 pt-2 border-t border-slate-800'>
                <label className='font-semibold text-amber-400 block'>Product Images</label>
                {productForm.images.map((img, idx) => (
                  <div key={idx} className='flex items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800'>
                    {img ? (
                      <img src={img} alt='Thumb' className='w-10 h-10 object-cover rounded-lg bg-slate-900 border border-slate-700' />
                    ) : (
                      <div className='w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-[9px] text-slate-500'>
                        No Img
                      </div>
                    )}
                    <div className='flex-1 space-y-1'>
                      <input
                        type='text'
                        value={img}
                        onChange={(e) => {
                          const newImgs = [...productForm.images];
                          newImgs[idx] = e.target.value;
                          setProductForm((p) => ({ ...p, images: newImgs }));
                        }}
                        placeholder='Paste Image URL'
                        className='w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-[11px]'
                      />
                      <div className='flex items-center gap-2'>
                        <label className='text-[10px] text-amber-400 hover:underline cursor-pointer flex items-center gap-1'>
                          <Upload className='w-3 h-3' /> Upload Image File
                          <input
                            type='file'
                            accept='image/*'
                            onChange={(e) => handleImageFileUpload(e, idx)}
                            className='hidden'
                          />
                        </label>
                      </div>
                    </div>
                    {productForm.images.length > 1 && (
                      <button
                        type='button'
                        onClick={() => {
                          const newImgs = productForm.images.filter((_, i) => i !== idx);
                          setProductForm((p) => ({ ...p, images: newImgs }));
                        }}
                        className='p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition'
                      >
                        <X className='w-4 h-4' />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type='button'
                  onClick={() => setProductForm((p) => ({ ...p, images: [...p.images, ''] }))}
                  className='py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-amber-400 text-[11px] font-semibold rounded-lg transition cursor-pointer'
                >
                  + Add Another Image
                </button>
              </div>

              {/* Description */}
              <div className='space-y-2 pt-2 border-t border-slate-800'>
                <label className='font-semibold text-slate-400'>Product Description</label>
                <textarea
                  rows={4}
                  value={productForm.details.description}
                  onChange={(e) =>
                    setProductForm((p) => ({
                      ...p,
                      details: { ...p.details, description: e.target.value },
                    }))
                  }
                  className='w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white'
                />
              </div>

              {/* Form Buttons */}
              <div className='pt-4 border-t border-slate-800 flex justify-end gap-3'>
                <button
                  type='button'
                  onClick={() => setIsProductModalOpen(false)}
                  className='py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold cursor-pointer'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='py-2 px-5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-lg cursor-pointer flex items-center gap-1.5'
                >
                  <Save className='w-4 h-4' /> {isDuplicate ? 'Save Duplicated Product' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
