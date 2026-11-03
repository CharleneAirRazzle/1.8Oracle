import { supabase, type User, type Reading } from '@/lib/supabase';
import { getSignById, getRandomSlogan, type Sign } from '@/data/signs';

export type DrawResult = {
  reading: Reading;
  sign: Sign;
  isNew: boolean;
};

function todayDateString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export async function getTodayReading(userId: string): Promise<Reading | null> {
  const today = todayDateString();
  const { data, error } = await supabase
    .from('readings')
    .select('*')
    .eq('user_id', userId)
    .eq('date', today)
    .maybeSingle();

  if (error) {
    console.error('Failed to fetch today reading:', error.message);
    return null;
  }
  return data as Reading | null;
}

export async function drawToday(user: User): Promise<DrawResult | null> {
  const today = todayDateString();

  const existing = await getTodayReading(user.id);
  if (existing) {
    const sign = getSignById(existing.hexagram_id);
    if (!sign) return null;
    return {
      reading: existing,
      sign,
      isNew: false,
    };
  }

  const hexagramId = Math.floor(Math.random() * 8) + 1;
  const sign = getSignById(hexagramId);
  if (!sign) return null;

  const slogan = getRandomSlogan(sign);

  const { data: reading, error: readErr } = await supabase
    .from('readings')
    .insert({
      user_id: user.id,
      date: today,
      hexagram_id: hexagramId,
      daily_slogan: slogan,
    })
    .select('*')
    .maybeSingle();

  if (readErr || !reading) {
    console.error('Failed to insert reading:', readErr?.message);
    return null;
  }

  return {
    reading: reading as Reading,
    sign,
    isNew: true,
  };
}
