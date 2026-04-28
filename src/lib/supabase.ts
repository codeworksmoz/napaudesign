// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// URL fornecida pelo utilizador
const supabaseUrl = 'https://xywhrhvljrqjzmlznjrv.supabase.co';

/**
 * A chave anónima (Anon Key) deve ser configurada no ficheiro .env ou nas variáveis de ambiente do Netlify.
 * Nome da variável: NEXT_PUBLIC_SUPABASE_ANON_KEY
 * Se a chave não for encontrada, usamos uma string vazia para evitar erro de inicialização imediata,
 * permitindo que a app carregue mas falhe graciosamente nas chamadas.
 */
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
