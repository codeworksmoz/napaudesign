// lib/upload.ts
import { supabase } from './supabase';

export async function uploadImagem(arquivo: File): Promise<string | null> {
  try {
    const extensao = arquivo.name.split('.').pop() ?? 'jpg';
    const nomeArquivo = `${Date.now()}-${Math.random().toString(36).substring(7)}.${extensao}`;

    const { data, error } = await supabase.storage
      .from('produtos')
      .upload(nomeArquivo, arquivo, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Erro no upload:', error.message);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from('produtos')
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  } catch (erro) {
    console.error('Erro:', erro);
    return null;
  }
}
