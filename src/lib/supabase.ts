import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qljsairpnbwlyoroswqi.supabase.co';
const supabaseAnonKey = 'sb_publishable_m_hDTKTRyZj2JEcqgOciPQ_o4W1NdAo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type User = {
  id: string;
  username: string;
  created_at: string;
};

export type Reading = {
  id: string;
  user_id: string;
  date: string;
  hexagram_id: number;
  daily_slogan: string | null;
};
