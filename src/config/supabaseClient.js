import { createClient } from '@supabase/supabase-js';

// Environment variables or fallback defaults for initial setup
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key-here';

// Helper to check if actual credentials have been configured in .env
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
