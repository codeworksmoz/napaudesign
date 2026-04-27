
"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PortfolioCard } from '@/components/PortfolioCard';
import { ContactForm } from '@/components/ContactForm';
import { PORTFOLIO_PROJECTS, Project } from '@/lib/portfolio-data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Cake, Shirt, GraduationCap, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('napau_projects');
    setProjects(saved ? JSON.parse(saved).slice(0, 3) : PORTFOLIO_PROJECTS.slice(0, 3));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Mobile-First */}
        <section className="relative min-h-[80svh] flex items-center justify-center overflow-hidden px-4 py-20">
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://picsum.photos/seed/napau/1200/800"
              alt="Napau"
              fill
              className="object-cover opacity-10"
              priority
            />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
              <Sparkles size={14} />
              Design & Arte em Moçambique
            </div>
            <h1 className="text-4xl md:text-7xl font-headline font-bold leading-tight">
              A Arte de Personalizar <span className="text-primary italic">Momentos</span>.
            </h1>
            <p className="text-muted-foreground text-sm md:text-lg font-light max-w-2xl mx-auto">
              Especialistas em tipos de bolo e camisetas exclusivas. Criamos conexões através da criatividade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="rounded-full px-8 py-6 text-lg gold-shimmer shadow-lg">
                <Link href="/portfolio">Ver Portfólio</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-8 py-6 text-lg">
                <Link href="/cursos">Aprender Confeitaria</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* O Que Fazemos */}
        <section className="py-16 md:py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-headline font-bold">O Que Fazemos</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-secondary/10 space-y-4 border border-border">
                <Cake className="text-primary" size={32} />
                <h4 className="text-xl font-headline font-bold">Tipos de Bolo</h4>
                <p className="text-sm text-muted-foreground font-light">Bolos artísticos e personalizados para qualquer tipo de evento.</p>
              </div>
              <div className="p-8 rounded-3xl bg-secondary/10 space-y-4 border border-border">
                <Shirt className="text-primary" size={32} />
                <h4 className="text-xl font-headline font-bold">Camisetas</h4>
                <p className="text-sm text-muted-foreground font-light">Estamparia de alta qualidade para marcas e uso pessoal.</p>
              </div>
              <div className="p-8 rounded-3xl bg-secondary/10 space-y-4 border border-border">
                <GraduationCap className="text-primary" size={32} />
                <h4 className="text-xl font-headline font-bold">Cursos</h4>
                <p className="text-sm text-muted-foreground font-light">Formação profissional para quem quer dominar a confeitaria.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Portfólio Inicial */}
        <section className="py-16 md:py-24 px-4 bg-secondary/5">
          <div className="max-w-7xl mx-auto space-y-12">
            <h3 className="text-2xl md:text-4xl font-headline font-bold text-center">Criações Recentes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map(p => (
                <PortfolioCard key={p.id} project={p} />
              ))}
            </div>
            <div className="text-center">
              <Link href="/portfolio" className="text-primary font-bold border-b border-primary/20 pb-1">Ver galeria completa</Link>
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section id="contact" className="py-16 md:py-24 px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-headline font-bold">Peça um Orçamento</h2>
              <p className="text-muted-foreground font-light">Dê vida à sua visão criativa hoje mesmo.</p>
            </div>
            <div className="bg-white p-6 md:p-12 rounded-[2.5rem] shadow-xl border border-border">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
