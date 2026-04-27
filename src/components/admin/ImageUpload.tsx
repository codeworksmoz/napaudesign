// components/admin/ImageUpload.tsx
'use client';

import { useState, useRef } from 'react';
import { uploadImagem } from '@/lib/upload';
import { Loader2, Upload, X } from 'lucide-react';

interface ImageUploadProps {
  valor: string;
  onChange: (url: string) => void;
}

export function ImageUpload({ valor, onChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(valor);
  const [carregando, setCarregando] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;

    setCarregando(true);
    const url = await uploadImagem(arquivo);
    
    if (url) {
      setPreview(url);
      onChange(url);
    }
    
    setCarregando(false);
  }

  function remover() {
    setPreview('');
    onChange('');
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        className="relative aspect-video rounded-xl border-2 border-dashed border-gray-300 hover:border-primary cursor-pointer overflow-hidden transition-colors"
      >
        {preview ? (
          <>
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); remover(); }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            {carregando ? (
              <Loader2 className="animate-spin" size={32} />
            ) : (
              <>
                <Upload size={32} />
                <span className="text-sm mt-2">Clique para fazer upload</span>
              </>
            )}
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}
