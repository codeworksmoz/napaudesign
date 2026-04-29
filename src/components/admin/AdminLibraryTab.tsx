
"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RefreshCw, Upload, Copy, Trash2 } from 'lucide-react';
import { ImageUpload } from '@/components/admin/ImageUpload';
import Image from 'next/image';

interface AdminLibraryTabProps {
  library: {name: string, url: string}[];
  loading: boolean;
  onRefresh: () => void;
  onDelete: (name: string) => void;
  onCopy: (url: string) => void;
}

export function AdminLibraryTab({ library, loading, onRefresh, onDelete, onCopy }: AdminLibraryTabProps) {
  return (
    <Card className="rounded-[2.5rem] overflow-hidden bg-white shadow-xl border-none">
      <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center p-8 border-b bg-[#FAF7F4] gap-4">
        <div>
          <CardTitle className="text-xl font-headline">Biblioteca Napau</CardTitle>
          <p className="text-xs text-muted-foreground italic">Use estes links nos carrosséis da Home.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button onClick={onRefresh} disabled={loading} variant="outline" className="rounded-xl h-12 gap-2 bg-white flex-1 md:flex-none">
            <RefreshCw className={loading ? "animate-spin" : ""} size={16} /> Atualizar
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-xl h-12 gap-2 gold-shimmer flex-1 md:flex-none">
                <Upload size={16} /> Fazer Upload
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[2rem]">
              <DialogHeader><DialogTitle>Enviar Foto</DialogTitle></DialogHeader>
              <div className="p-4">
                 <ImageUpload valor="" onChange={(url) => { if(url) onRefresh(); }} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {library.map((file, idx) => (
            <div key={idx} className="group relative aspect-square rounded-[2rem] overflow-hidden border-2 border-primary/5 hover:border-primary/20 transition-all bg-[#FAF7F4] shadow-sm">
              <Image src={file.url} alt={file.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 gap-3">
                <Button size="sm" variant="secondary" onClick={() => onCopy(file.url)} className="rounded-xl h-10 w-full gap-2 font-bold"><Copy size={14} /> Copiar Link</Button>
                <Button size="sm" variant="destructive" onClick={() => onDelete(file.name)} className="rounded-xl h-10 w-full gap-2 font-bold"><Trash2 size={14} /> Eliminar</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
