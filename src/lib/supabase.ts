import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!supabaseConfigured) {
  console.warn('Supabase credentials missing! Image uploads will fail.');
}

const unconfiguredClient = {
  storage: {
    from: () => ({
      upload: () =>
        Promise.reject(new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable image uploads.')),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
    }),
  },
};

export const supabase = (supabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : unconfiguredClient) as any;