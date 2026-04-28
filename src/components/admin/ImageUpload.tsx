'use client';

import { useState, useRef, useEffect } from 'react';
import { uploadImagem } from '@/lib/upload';
import { Upload, X, Loader2, RefreshCw } from 'lucide-react';

interface ImageUploadProps {
  valor: string;
  onChange: (url: string) => void;
  className?: string;
  label?: string;
}

export function ImageUpload({ valor, onChange, className = '', label }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(valor || '');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sincronizar preview com valor externo se mudar lá fora
  useEffect(() => {
    setPreview(valor || '');
  }, [valor]);

  const processarArquivo = async (arquivo: File) => {
    setCarregando(true);
    setErro(null);

    const resultado = await uploadImagem(arquivo);

    if (resultado.url) {
      onChange(resultado.url);
      setPreview(resultado.url);
    } else {
      setErro(resultado.erro);
    }

    setCarregando(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0];
    if (arquivo) processarArquivo(arquivo);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview('');
    onChange('');
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!carregando) {
      inputRef.current?.click();
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {label && <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">{label}</label>}
      
      <div
        className={`
          relative aspect-video rounded-3xl border-2 border-dashed 
          overflow-hidden transition-all duration-300 group cursor-pointer
          ${carregando ? 'opacity-70 pointer-events-none' : 'hover:border-primary/50 bg-secondary/5'}
          ${preview ? 'border-primary/20' : 'border-border'}
        `}
        onClick={handleTriggerClick}
      >
        {preview ? (
          <>
            <img src={preview} alt="Upload Preview" className="w-full h-full object-cover" />
            
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <div className="bg-white text-primary p-3 rounded-2xl shadow-xl hover:scale-110 transition-transform">
                <RefreshCw size={20} />
              </div>
              <button
                type="button"
                onClick={handleRemove}
                className="bg-destructive text-white p-3 rounded-2xl shadow-xl hover:scale-110 transition-transform"
                title="Remover"
              >
                <X size={20} />
              </button>
            </div>

            {carregando && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-white">
                  <Loader2 className="animate-spin" size={32} />
                  <span className="text-xs font-bold uppercase tracking-widest">A enviar...</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-4 p-8">
            <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              {carregando ? <Loader2 className="animate-spin" /> : <Upload size={32} />}
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-foreground">Clique para selecionar</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">PNG, JPG ou WEBP (Max 5MB)</p>
            </div>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {erro && <p className="text-destructive text-[10px] font-bold uppercase">{erro}</p>}
    </div>
  );
}