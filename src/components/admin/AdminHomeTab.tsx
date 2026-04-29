"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sparkles, Shirt, Cake, Plus, X, Instagram, Facebook, Share2, Phone } from 'lucide-react';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { HomeContent } from '@/lib/portfolio-data';
import Image from 'next/image';

interface AdminHomeTabProps {
  home: HomeContent;
  setHome: (home: HomeContent) => void;
  onSave: () => void;
  onAddImage: (type: 'bolo' | 'camiseta', url: string) => void;
  onRemoveImage: (type: 'bolo' | 'camiseta', index: number) => void;
}

export function AdminHomeTab({ home, setHome, onSave, onAddImage, onRemoveImage }: AdminHomeTabProps) {
  return (
    <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white">
      <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#FAF7F4] p-8 border-b gap-4">
        <div>
          <CardTitle className="text-xl font-headline">Configuração da Home</CardTitle>
          <p className="text-xs text-muted-foreground">Personalize cada texto, título e passo do processo.</p>
        </div>
        <Button onClick={onSave} className="gold-shimmer px-10 h-14 rounded-2xl w-full md:w-auto font-bold text-lg">Guardar Website</Button>
      </CardHeader>
      <CardContent className="p-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Título do Hero</label>
              <Input value={home.heroTitle || ''} onChange={(e) => setHome({...home, heroTitle: e.target.value})} className="rounded-xl h-12" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Subtítulo do Hero</label>
              <Textarea value={home.heroSubtitle || ''} onChange={(e) => setHome({...home, heroSubtitle: e.target.value})} className="rounded-xl h-24 resize-none" />
            </div>
          </div>
          <ImageUpload label="Imagem de Fundo (Hero)" valor={home.heroImage || ''} onChange={(url) => setHome({...home, heroImage: url})} />
        </div>

        {/* CONTACTOS E REDES SOCIAIS ADMIN */}
        <div className="border-t pt-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Share2 size={20}/></div>
            <h4 className="font-bold uppercase text-sm text-primary tracking-widest">Contactos & Redes Sociais</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                  <Phone size={12} className="text-green-600" /> WhatsApp Oficial (Apenas números)
                </label>
                <Input 
                  value={home.whatsappNumber || ''} 
                  onChange={(e) => setHome({...home, whatsappNumber: e.target.value.replace(/\D/g, '')})} 
                  placeholder="258847615871" 
                  className="rounded-xl h-12 font-mono" 
                />
                <p className="text-[9px] text-muted-foreground">Ex: 258847615871 (Sem espaços ou símbolos)</p>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                  <Instagram size={12} className="text-pink-600" /> Link Instagram
                </label>
                <Input value={home.instagramLink || ''} onChange={(e) => setHome({...home, instagramLink: e.target.value})} placeholder="https://instagram.com/..." className="rounded-xl h-12" />
             </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                  <Facebook size={12} className="text-blue-600" /> Link Facebook
                </label>
                <Input value={home.facebookLink || ''} onChange={(e) => setHome({...home, facebookLink: e.target.value})} placeholder="https://facebook.com/..." className="rounded-xl h-12" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                  <svg size="12" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .81.11V9.42a7.27 7.27 0 0 0-1.01-.07 6.36 6.36 0 0 0-6.36 6.36 6.36 6.36 0 0 0 6.36 6.36 6.36 6.36 0 0 0 6.36-6.36V7.95a12.53 12.53 0 0 0 3.95 1.07V6.69z"/></svg> Link TikTok
                </label>
                <Input value={home.tiktokLink || ''} onChange={(e) => setHome({...home, tiktokLink: e.target.value})} placeholder="https://tiktok.com/@..." className="rounded-xl h-12" />
             </div>
          </div>
        </div>

        {/* PERSONALIZE SEU EVENTO ADMIN */}
        <div className="border-t pt-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Sparkles size={20}/></div>
            <h4 className="font-bold uppercase text-sm text-primary tracking-widest">Personalize seu Evento</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Título da Secção</label>
                <Input value={home.eventTitle || ''} onChange={(e) => setHome({...home, eventTitle: e.target.value})} className="rounded-xl h-12" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Subtítulo (Curto)</label>
                <Input value={home.eventSubtitle || ''} onChange={(e) => setHome({...home, eventSubtitle: e.target.value})} className="rounded-xl h-12" />
             </div>
          </div>
          <div className="space-y-2">
             <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Descrição Emocional</label>
             <Textarea value={home.eventDesc || ''} onChange={(e) => setHome({...home, eventDesc: e.target.value})} className="rounded-xl h-32 resize-none" />
          </div>
        </div>

        {/* CAMISETAS ADMIN */}
        <div className="border-t pt-10 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Shirt size={20}/></div>
            <h4 className="font-bold uppercase text-sm text-primary tracking-widest">Designer de Camisetas</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Título Principal</label>
                <Input value={home.camisetaTitle || ''} onChange={(e) => setHome({...home, camisetaTitle: e.target.value})} className="rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Descrição Completa</label>
                <Textarea value={home.camisetaDesc || ''} onChange={(e) => setHome({...home, camisetaDesc: e.target.value})} className="rounded-xl h-48 resize-none" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Galeria Camisetas</label>
              <div className="grid grid-cols-4 gap-3">
                {home.serviceCamisetaImages?.map((img, idx) => (
                  <div key={idx} className="group relative aspect-square rounded-xl overflow-hidden border-2 border-primary/10">
                    <Image src={img} alt="Camiseta" fill className="object-cover" />
                    <button onClick={() => onRemoveImage('camiseta', idx)} className="absolute top-1 right-1 bg-destructive text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
                  </div>
                ))}
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="aspect-square rounded-xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center text-primary/40 hover:text-primary transition-all">
                      <Plus size={24} />
                      <span className="text-[8px] font-bold uppercase mt-1">Add</span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="rounded-[2rem]">
                    <DialogHeader><DialogTitle>Adicionar Foto</DialogTitle></DialogHeader>
                    <div className="p-4 space-y-4">
                      <Input id="new-img-camiseta" placeholder="Cole o link da biblioteca..." className="rounded-xl h-12" />
                      <Button className="w-full rounded-xl h-12 gold-shimmer font-bold" onClick={() => {
                        const el = document.getElementById('new-img-camiseta') as HTMLInputElement;
                        if (el.value) { onAddImage('camiseta', el.value); el.value = ''; }
                      }}>Confirmar</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        {/* BOLOS ADMIN */}
        <div className="border-t pt-10 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Cake size={20}/></div>
            <h4 className="font-bold uppercase text-sm text-primary tracking-widest">Topos de Bolo</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Título Principal</label>
                <Input value={home.boloTitle || ''} onChange={(e) => setHome({...home, boloTitle: e.target.value})} className="rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Introdução Emocional</label>
                <Textarea value={home.boloDesc || ''} onChange={(e) => setHome({...home, boloDesc: e.target.value})} className="rounded-xl h-24 resize-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">O que é Topo de Bolo?</label>
                <Textarea value={home.boloWhatIs || ''} onChange={(e) => setHome({...home, boloWhatIs: e.target.value})} className="rounded-xl h-32 resize-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Tipos & Preços (JSON)</label>
                <Textarea value={home.boloTypesJson || ''} onChange={(e) => setHome({...home, boloTypesJson: e.target.value})} className="rounded-xl h-48 font-mono text-xs" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Galeria Bolos</label>
              <div className="grid grid-cols-4 gap-3">
                {home.serviceBoloImages?.map((img, idx) => (
                  <div key={idx} className="group relative aspect-square rounded-xl overflow-hidden border-2 border-primary/10">
                    <Image src={img} alt="Bolo" fill className="object-cover" />
                    <button onClick={() => onRemoveImage('bolo', idx)} className="absolute top-1 right-1 bg-destructive text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
                  </div>
                ))}
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="aspect-square rounded-xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center text-primary/40 hover:text-primary transition-all">
                      <Plus size={24} />
                      <span className="text-[8px] font-bold uppercase mt-1">Add</span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="rounded-[2rem]">
                    <DialogHeader><DialogTitle>Adicionar Foto</DialogTitle></DialogHeader>
                    <div className="p-4 space-y-4">
                      <Input id="new-img-bolo" placeholder="Cole o link da biblioteca..." className="rounded-xl h-12" />
                      <Button className="w-full rounded-xl h-12 gold-shimmer font-bold" onClick={() => {
                        const el = document.getElementById('new-img-bolo') as HTMLInputElement;
                        if (el.value) { onAddImage('bolo', el.value); el.value = ''; }
                      }}>Confirmar</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}