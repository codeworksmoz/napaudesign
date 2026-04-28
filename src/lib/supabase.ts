// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// URL fornecida pelo utilizador
const supabaseUrl = 'https://xywhrhvljrqjzmlznjrv.supabase.co';
// A chave anónima deve ser configurada nas variáveis de ambiente do Netlify para segurança
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
