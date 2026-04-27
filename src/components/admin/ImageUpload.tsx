// components/admin/ImageUpload.tsx
'use client';

import { useState, useRef, useCallback } from 'react';
import { uploadImagem } from '@/lib/upload';
import { Upload, X, Loader2, ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  valor: string;
  onChange: (url: string) => void;
  className?: string;
}

export function ImageUpload({ valor, onChange, className = '' }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(valor);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [arrastando, setArrastando] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Atualizar preview quando valor externo muda
  if (valor !== preview && !carregando) {
    setPreview(valor);
  }

  const processarArquivo = useCallback(async (arquivo: File) => {
    setCarregando(true);
    setErro(null);

    // Mostrar preview local imediatamente
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(arquivo);

    // Fazer upload
    const resultado = await uploadImagem(arquivo);

    if (resultado.url) {
      onChange(resultado.url);
      setPreview(resultado.url);
    } else {
      setErro(resultado.erro);
      setPreview(valor); // Reverter preview
    }

    setCarregando(false);
  }, [onChange, valor]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0];
    if (arquivo) {
      processarArquivo(arquivo);
    }
  };

  const handleClick = () => {
    if (!carregando) {
      inputRef.current?.click();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setArrastando(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setArrastando(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setArrastando(false);

    const arquivo = e.dataTransfer.files?.[0];
    if (arquivo) {
      processarArquivo(arquivo);
    }
  };

  const handleRemover = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview('');
    onChange('');
    setErro(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Área de Upload */}
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative aspect-video rounded-xl border-2 border-dashed 
          cursor-pointer overflow-hidden transition-all duration-200
          ${arrastando 
            ? 'border-primary bg-primary/5 scale-[1.02]' 
            : 'border-gray-300 hover:border-primary/50 hover:bg-secondary/5'
          }
          ${carregando ? 'pointer-events-none opacity-70' : ''}
        `}
      >
        {preview ? (
          <>
            {/* Imagem com preview */}
            <img
              src={preview}
              alt="Preview do upload"
              className="w-full h-full object-cover"
            />
            
            {/* Botão remover */}
            <button
              type="button"
              onClick={handleRemover}
              className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all hover:scale-110 z-10"
              title="Remover imagem"
            >
              <X size={16} />
            </button>

            {/* Overlay de carregamento */}
            {carregando && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="bg-white rounded-xl px-4 py-2 flex items-center gap-2 shadow-lg">
                  <Loader2 className="animate-spin text-primary" size={20} />
                  <span className="text-sm font-medium">A fazer upload...</span>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Estado vazio */
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6">
            {carregando ? (
              <>
                <Loader2 className="animate-spin mb-3" size={36} />
                <span className="text-sm font-medium">A fazer upload...</span>
              </>
            ) : (
              <>
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <Upload size={24} />
                </div>
                <span className="text-sm font-medium text-center">
                  Clique ou arraste uma imagem
                </span>
                <span className="text-xs text-gray-400 mt-1">
                  JPG, PNG, WEBP ou GIF (máx. 5MB)
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Input escondido */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Mensagem de erro */}
      {erro && (
        <p className="text-red-500 text-xs flex items-center gap-1">
          <X size={12} />
          {erro}
        </p>
      )}

      {/* URL atual (se existir) */}
      {preview && !carregando && (
        <p className="text-xs text-gray-400 truncate">
          {preview.length > 60 ? preview.substring(0, 60) + '...' : preview}
        </p>
      )}
    </div>
  );
}
