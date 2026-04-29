
"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { Flyer, OFFICIAL_IMAGE } from '@/lib/portfolio-data';

interface AdminFlyersTabProps {
  flyers: Flyer[];
  setFlyers: (f: Flyer[]) => void;
  onNew: () => void;
  onSave: (f: Flyer) => void;
  onDelete: (id: string) => void;
}

export function AdminFlyersTab({ flyers, setFlyers, onNew, onSave, onDelete }: AdminFlyersTabProps) {
  return (
    <div className="space-y-6">
      <Button onClick={onNew} className="gold-shimmer rounded-2xl h-14 px-10 font-bold shadow-xl">Novo Flyer de Curso</Button>
      
      <div className="grid grid-cols-1 gap-6">
        {flyers.map(f => (
          <Card key={f.id} className="rounded-[2.5rem] p-8 flex flex-col lg:flex-row justify-between items-start gap-10 bg-white shadow-xl border-none">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Título do Evento</label>
                <Input value={f.titulo || ''} className="font-bold text-primary rounded-xl h-12" onChange={(e) => setFlyers(flyers.map(item => item.id === f.id ? {...item, titulo: e.target.value} : item))} />
                <ImageUpload label="Foto do Flyer" valor={f.imageurl || ''} onChange={(url) => setFlyers(flyers.map(item => item.id === f.id ? {...item, imageurl: url} : item))} />
              </div>
              <div className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Preço</label>
                     <Input value={f.preco} className="rounded-xl h-12" onChange={(e) => setFlyers(flyers.map(item => item.id === f.id ? {...item, preco: e.target.value} : item))} />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Data</label>
                     <Input value={f.data} className="rounded-xl h-12" onChange={(e) => setFlyers(flyers.map(item => item.id === f.id ? {...item, data: e.target.value} : item))} />
                   </div>
                 </div>
                 <Input value={f.local} placeholder="Local" className="rounded-xl h-12" onChange={(e) => setFlyers(flyers.map(item => item.id === f.id ? {...item, local: e.target.value} : item))} />
                 <Input value={f.contactos} placeholder="Contactos" className="rounded-xl h-12" onChange={(e) => setFlyers(flyers.map(item => item.id === f.id ? {...item, contactos: e.target.value} : item))} />
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full lg:w-48">
              <Button onClick={() => onSave(f)} className="rounded-xl h-12 gold-shimmer font-bold">Guardar</Button>
              <Button variant="outline" className={`rounded-xl h-12 font-bold ${f.ativo ? 'text-primary' : 'text-muted-foreground'}`} onClick={() => setFlyers(flyers.map(item => item.id === f.id ? {...item, ativo: !f.ativo} : item))}>
                {f.ativo ? '✅ Ativo' : '❌ Inativo'}
              </Button>
              <Button variant="ghost" className="text-destructive h-12 rounded-xl" onClick={() => onDelete(f.id)}>Apagar</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
