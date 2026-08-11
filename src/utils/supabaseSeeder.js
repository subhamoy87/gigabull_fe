import { supabase, isSupabaseConfigured } from '../config/supabaseClient';
import defaultProductsData from '../data/Products.js';
import { ADMIN_CONFIG } from '../data/AdminConfig.js';

/**
 * Seed initial catalog & site settings into Supabase database
 */
export const seedSupabaseCatalog = async () => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase credentials not set in .env. Skipping seeder.');
    return { success: false, message: 'Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file' };
  }

  try {
    // 1. Flatten categories into product rows
    const productRows = [];
    defaultProductsData.forEach((catObj) => {
      const categoryName = catObj.category;
      (catObj.products || []).forEach((prod) => {
        const cleanImages = (prod.images || []).map((img) => {
          if (typeof img === 'string') return img;
          return String(img);
        });

        const modelVal = prod.model || prod.details?.model_no || prod.details?.model || '';

        productRows.push({
          slug: prod.slug,
          category: categoryName,
          name: prod.name,
          model: modelVal,
          tags: prod.tags || [],
          is_model_image: !!prod.isModelImage,
          is_showcase: !!prod.isShowcase,
          images: cleanImages,
          details: {
            ...prod.details,
            model_no: modelVal,
          },
        });
      });
    });

    // 2. Upsert products into 'products' table
    const { error: prodError } = await supabase
      .from('products')
      .upsert(productRows, { onConflict: 'slug' });

    if (prodError) {
      console.error('Error seeding products to Supabase:', prodError);
      throw prodError;
    }

    // 3. Upsert admin config password hash into 'site_settings'
    const { error: settingsError } = await supabase
      .from('site_settings')
      .upsert([
        {
          key: 'admin_config',
          data: { passwordHash: ADMIN_CONFIG.passwordHash },
        },
      ], { onConflict: 'key' });

    if (settingsError) {
      console.error('Error seeding site_settings to Supabase:', settingsError);
    }

    return {
      success: true,
      message: `Successfully seeded ${productRows.length} products into your Supabase database!`,
    };
  } catch (err) {
    console.error('Supabase seeding error:', err);
    return { success: false, error: err.message };
  }
};
