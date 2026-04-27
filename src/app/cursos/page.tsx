
"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import { CheckCircle2, Calendar, Wallet, GraduationCap, ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Flyer, DEFAULT_FLYERS } from '@/lib/portfolio-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { RegistrationForm } from '@/components/RegistrationForm';

export default function CursosPage() {
  const [flyers, setFlyers] = useState<Flyer[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('napau_flyers');
    if (saved) {
      setFlyers(JSON.parse(saved));
    } else {
      setFlyers(DEFAULT_FLYERS);
    }
  }, []);

  const activeFlyers = flyers.filter(f => f.ativo);

  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
              <GraduationCap size={16} />
              Educação Napau
            </div>
            <h1 className="text-4xl md:text-7xl font-headline font-bold">Cursos & Formação</h1>
            <p className="text-lg text-muted-foreground font-light leading-relaxed italic">
              Aprenda as técnicas mais modernas da confeitaria profissional com quem entende do assunto.
            </p>
          </div>

          <div className="space-y-24">
            {activeFlyers.length > 0 ? activeFlyers.map((flyer) => (
              <div key={flyer.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-primary/10 grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-square lg:aspect-auto h-full min-h-[400px]">
                  <Image 
                    src={flyer.imageUrl}
                    alt={flyer.titulo}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-8 md:p-16 space-y-10">
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-4xl font-headline font-bold text-primary">{flyer.titulo}</h3>
                    <p className="text-lg font-headline font-semibold">Aprenda a fazer:</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                      <div className="space-y-3">
                        {flyer.listaEsquerda.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-xs text-muted-foreground">
                            <CheckCircle2 size={16} className="text-primary shrink-0" />
                            <span className="font-bold">{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3">
                        {flyer.listaDireita.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-xs text-muted-foreground">
                            <CheckCircle2 size={16} className="text-primary shrink-0" />
                            <span className="font-bold">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-y border-border">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Wallet size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Investimento</p>
                        <p className="text-2xl font-headline font-bold text-primary">{flyer.preco}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Próxima Turma</p>
                        <p className="text-2xl font-headline font-bold">{flyer.data}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full py-8 rounded-2xl text-lg font-bold gold-shimmer shadow-xl">
                          <span className="flex items-center justify-center gap-3">
                            Reservar Minha Vaga
                            <ArrowRight size={20} />
                          </span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] rounded-3xl">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-headline text-primary">Inscrição no Curso</DialogTitle>
                          <DialogDescription>
                            Preencha os seus dados para gerar o seu número de inscrição (ID). 
                            O preenchimento é guardado automaticamente se precisar de recarregar a página.
                          </DialogDescription>
                        </DialogHeader>
                        <RegistrationForm course={flyer} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed">
                <p className="text-muted-foreground">De momento não temos turmas abertas. Fique atento às novidades!</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
