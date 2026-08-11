import { createClient } from '@supabase/supabase-js';

// Environment variables or fallback defaults
let rawUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-project.supabase.co';

// Sanitize URL: Remove any trailing /rest/v1 or trailing slashes automatically
const supabaseUrl = rawUrl.trim().replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '');
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key-here').trim();

// Helper to check if actual credentials have been configured
export const isSupabaseConfigured = () => {
  return (
    supabaseUrl &&
    supabaseUrl !== 'https://your-supabase-project.supabase.co' &&
    supabaseAnonKey &&
    supabaseAnonKey !== 'your-supabase-anon-key-here'
  );
};

// Initialize Supabase Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
