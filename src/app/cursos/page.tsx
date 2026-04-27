
"use client";

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import { CheckCircle2, MapPin, Users, Calendar, Wallet, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CursosPage() {
  // Nota: Estes dados virão do Firestore no futuro. 
  // Por agora, usamos os dados reais do flyer fornecido.
  const cursoData = {
    preco: "4.500 MT",
    data: "14 DE DEZEMBRO",
    local: "AV. ACORDOS DE LUSAKA, PARAGEM BALTAZAR",
    contactos: "+258 84 761 5871 | 86 791 5871",
    listaEsquerda: [
      "Bolo de Aniversário com Foto",
      "Bolo de Casamento",
      "Bolo Gelado",
      "Bolo Temático",
      "Bolachinhas Sortidas"
    ],
    listaDireita: [
      "Cup-cakes Personalizados",
      "Drip-cakes",
      "Floresta Negra",
      "Orelhudos de Custarde",
      "Sobremesas"
    ]
  };

  const waNumber = "258847615871";
  const waMsg = encodeURIComponent("Olá! Vim pelo site da Napau Design & Arte e gostaria de saber mais sobre o Curso de Confeitaria.");
  const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`;

  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-24">
          
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
              <GraduationCap size={16} />
              Formação Profissional Napau
            </div>
            <h1 className="text-4xl md:text-7xl font-headline font-bold">Curso de Confeitaria</h1>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              AULAS PRÁTICAS E MUITO PRODUTIVAS COM TODOS OS SEGREDOS QUE VOCÊ PRECISA PARA FAZER UM BOLO ESPETACULAR.
            </p>
          </div>

          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-primary/10 grid grid-cols-1 lg:grid-cols-2">
            <div className="relative aspect-square lg:aspect-auto">
              <Image 
                src="https://picsum.photos/seed/pastry-class/1000/1200"
                alt="Curso de Confeitaria"
                fill
                className="object-cover"
                data-ai-hint="pastry chef"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent lg:hidden"></div>
              <div className="absolute bottom-8 left-8 text-white lg:hidden">
                <p className="text-xs uppercase font-bold tracking-widest opacity-80">Aprenda a fazer</p>
                <h2 className="text-3xl font-headline font-bold">A Arte da Confeitaria</h2>
              </div>
            </div>

            <div className="p-8 md:p-16 space-y-10">
              <div className="space-y-6">
                <h3 className="text-2xl md:text-4xl font-headline font-bold">O que vai aprender?</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  <div className="space-y-4">
                    {cursoData.listaEsquerda.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 size={18} className="text-primary shrink-0" />
                        <span className="uppercase font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {cursoData.listaDireita.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 size={18} className="text-primary shrink-0" />
                        <span className="uppercase font-medium">{item}</span>
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
                    <p className="text-2xl font-headline font-bold text-primary">{cursoData.preco}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Próxima Turma</p>
                    <p className="text-2xl font-headline font-bold">{cursoData.data}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <MapPin size={20} className="text-primary shrink-0" />
                    <span className="font-medium uppercase">{cursoData.local}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Users size={20} className="text-primary shrink-0" />
                    <span className="font-medium">{cursoData.contactos}</span>
                  </div>
                </div>
                
                <Button asChild className="w-full py-8 rounded-2xl text-lg font-bold gold-shimmer shadow-xl">
                  <a href={waUrl} className="flex items-center justify-center gap-3">
                    Reservar Minha Vaga Agora
                    <ArrowRight size={20} />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
