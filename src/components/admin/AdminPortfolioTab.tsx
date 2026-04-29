
"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Filter, Edit3, Trash2 } from 'lucide-react';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { Project, OFFICIAL_IMAGE } from '@/lib/portfolio-data';
import Image from 'next/image';

interface AdminPortfolioTabProps {
  projects: Project[];
  editing: Project | null;
  setEditing: (p: Project | null) => void;
  onSave: (data: Partial<Project>) => void;
  onDelete: (id: string) => void;
}

export function AdminPortfolioTab({ projects, editing, setEditing, onSave, onDelete }: AdminPortfolioTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <Card className="lg:col-span-4 rounded-[2.5rem] p-8 h-fit bg-white shadow-xl border-none">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Filter size={20}/></div>
          <h3 className="font-headline font-bold text-xl text-primary">{editing ? 'Editar Trabalho' : 'Novo Trabalho'}</h3>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          onSave({
            title: formData.get('title') as string,
            category: formData.get('category') as string,
            description: formData.get('description') as string,
            imageurl: formData.get('imageurl') as string,
            year: formData.get('year') as string,
          });
        }} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Título do Trabalho</label>
            <Input name="title" defaultValue={editing?.title || ''} placeholder="Ex: Topo Casamento Clássico" required className="rounded-xl h-12" />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Filtro / Categoria</label>
            <Input name="category" defaultValue={editing?.category || 'Topos de Bolo'} placeholder="Ex: Topos de Bolo" required className="rounded-xl h-12" />
          </div>

          <ImageUpload label="Foto do Trabalho" valor={editing?.imageurl || ''} onChange={(url) => setEditing(editing ? {...editing, imageurl: url} : ({} as any))} />
          <input type="hidden" name="imageurl" value={editing?.imageurl || ''} />

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Ano</label>
            <Input name="year" defaultValue={editing?.year || new Date().getFullYear().toString()} className="rounded-xl h-12" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Descrição Breve</label>
            <Textarea name="description" defaultValue={editing?.description || ''} placeholder="Detalhes técnicos..." className="rounded-xl h-24 resize-none" />
          </div>

          <Button type="submit" className="w-full h-14 rounded-xl gold-shimmer font-bold text-lg">
            {editing ? 'Guardar Alterações' : 'Publicar no Portfólio'}
          </Button>
          {editing && <Button type="button" variant="ghost" onClick={() => setEditing(null)} className="w-full h-12 rounded-xl">Cancelar</Button>}
        </form>
      </Card>

      <Card className="lg:col-span-8 rounded-[2.5rem] overflow-hidden bg-white shadow-xl border-none">
        <div className="p-8 border-b bg-[#FAF7F4]">
          <h3 className="font-headline font-bold text-xl">Filtros Atuais</h3>
        </div>
        <Table>
          <TableHeader className="bg-secondary/5">
            <TableRow>
              <TableHead>Trabalho</TableHead>
              <TableHead>Filtro</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map(p => (
              <TableRow key={p.id} className="hover:bg-secondary/5 transition-colors">
                <TableCell className="font-bold py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden relative border border-primary/10">
                      <Image src={p.imageurl || OFFICIAL_IMAGE} alt="" fill className="object-cover" />
                    </div>
                    {p.title}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-[9px] font-bold uppercase tracking-widest bg-primary/10 text-primary px-4 py-1.5 rounded-full">
                    {p.category}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => setEditing(p)} className="rounded-xl"><Edit3 size={18}/></Button>
                  <Button variant="ghost" size="icon" className="text-destructive rounded-xl" onClick={() => onDelete(p.id)}><Trash2 size={18}/></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
