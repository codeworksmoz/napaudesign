// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// URL fornecida pelo utilizador
const supabaseUrl = 'https://xywhrhvljrqjzmlznjrv.supabase.co';

/**
 * A chave anónima (Anon Key) deve ser configurada no ficheiro .env ou nas variáveis de ambiente do Netlify.
 * Nome da variável: NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'SUPABASE_KEY_PENDENTE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
