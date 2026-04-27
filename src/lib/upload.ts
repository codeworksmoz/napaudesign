// lib/upload.ts
import { supabase } from './supabase';

const BUCKET_NAME = 'produtos';
const TAMANHO_MAXIMO = 5 * 1024 * 1024; // 5MB
const TIPOS_PERMITIDOS = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

interface ResultadoUpload {
  url: string | null;
  erro: string | null;
}

/**
 * Faz upload de uma imagem para o Supabase Storage
 * @param arquivo - Ficheiro de imagem selecionado
 * @returns URL pública da imagem ou null se falhar
 */
export async function uploadImagem(arquivo: File): Promise<ResultadoUpload> {
  try {
    // Validar tipo
    if (!TIPOS_PERMITIDOS.includes(arquivo.type)) {
      return {
        url: null,
        erro: 'Formato não permitido. Use JPG, PNG, WEBP ou GIF.',
      };
    }

    // Validar tamanho
    if (arquivo.size > TAMANHO_MAXIMO) {
      return {
        url: null,
        erro: 'Imagem muito grande. Máximo 5MB.',
      };
    }

    // Gerar nome único
    const extensao = arquivo.name.split('.').pop() ?? 'jpg';
    const timestamp = Date.now();
    const aleatorio = Math.random().toString(36).substring(2, 8);
    const nomeArquivo = `${timestamp}-${aleatorio}.${extensao}`;

    // Fazer upload
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(nomeArquivo, arquivo, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Erro no upload:', error.message);
      return {
        url: null,
        erro: `Falha ao fazer upload: ${error.message}`,
      };
    }

    // Obter URL pública
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    return {
      url: urlData.publicUrl,
      erro: null,
    };

  } catch (erro) {
    console.error('Erro inesperado no upload:', erro);
    return {
      url: null,
      erro: 'Erro inesperado. Tente novamente.',
    };
  }
}

/**
 * Remove uma imagem do Storage
 * @param urlPublica - URL pública completa da imagem
 */
export async function deletarImagem(urlPublica: string): Promise<boolean> {
  try {
    // Extrair caminho do ficheiro da URL
    // Ex: https://xxx.supabase.co/storage/v1/object/public/produtos/123-abc.jpg
    const url = new URL(urlPublica);
    const partes = url.pathname.split(`/public/${BUCKET_NAME}/`);
    
    if (partes.length < 2) {
      console.error('URL inválida para deleção');
      return false;
    }

    const caminho = partes[1];

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([caminho]);

    if (error) {
      console.error('Erro ao deletar:', error.message);
      return false;
    }

    return true;
  } catch (erro) {
    console.error('Erro ao deletar imagem:', erro);
    return false;
  }
}
