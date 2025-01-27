import { Database } from '@/lib/types';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://arbfxjrrmyqpbiqbdeyz.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY!;

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
