"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PortfolioCard } from '@/components/PortfolioCard';
import { PORTFOLIO_PROJECTS, Project } from '@/lib/portfolio-data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Cake, Shirt, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Carregamento ultra-rápido via LocalStorage ou Fallback
    const saved = localStorage.getItem('napau_projects');
    setProjects(saved ? JSON.parse(saved).slice(0, 3) : PORTFOLIO_PROJECTS.slice(0, 3));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section - Mobile First */}
        <section className="relative min-h-[90svh] flex items-center justify-center overflow-hidden px-4 py-20">
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://picsum.photos/seed/napau-hero/1200/800"
              alt="Napau Design"
              fill
              className="object-cover opacity-20"
              priority
              data-ai-hint="luxury design studio"
            />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] border border-primary/20">
              <Sparkles size={14} />
              Criatividade em Moçambique
            </div>
            <h1 className="text-4xl md:text-7xl font-headline font-bold leading-[1.1]">
              A Arte de Personalizar <span className="text-primary italic">Momentos</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Especialistas em tipos de bolo artísticos e camisetas exclusivas. Criamos o que você imagina com perfeição.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild className="rounded-2xl px-10 py-7 text-lg font-bold gold-shimmer shadow-xl">
                <Link href="/portfolio">Ver Portfólio</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-2xl px-10 py-7 text-lg font-bold border-primary/20 hover:bg-primary/5">
                <Link href="/cursos">Aprender Confeitaria</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* O Que Fazemos - Services Focus */}
        <section className="py-20 md:py-32 px-4 bg-white">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-headline font-bold">O Que Fazemos</h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="p-10 rounded-[2.5rem] bg-secondary/5 space-y-6 border border-border/50 hover:shadow-2xl transition-all duration-500 group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Cake size={32} />
                </div>
                <h4 className="text-2xl font-headline font-bold">Tipos de Bolo</h4>
                <p className="text-muted-foreground leading-relaxed font-light">Bolos artísticos, temáticos e personalizados para casamentos e aniversários inesquecíveis.</p>
              </div>

              <div className="p-10 rounded-[2.5rem] bg-secondary/5 space-y-6 border border-border/50 hover:shadow-2xl transition-all duration-500 group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Shirt size={32} />
                </div>
                <h4 className="text-2xl font-headline font-bold">Camisetas</h4>
                <p className="text-muted-foreground leading-relaxed font-light">Estamparia premium para marcas, eventos e uso pessoal com acabamento superior.</p>
              </div>

              <div className="p-10 rounded-[2.5rem] bg-secondary/5 space-y-6 border border-border/50 hover:shadow-2xl transition-all duration-500 group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <GraduationCap size={32} />
                </div>
                <h4 className="text-2xl font-headline font-bold">Formação</h4>
                <p className="text-muted-foreground leading-relaxed font-light">Cursos profissionais de confeitaria para quem deseja dominar as técnicas mais modernas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Work Preview */}
        <section className="py-20 md:py-32 px-4 bg-secondary/5">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="space-y-4">
                <h3 className="text-3xl md:text-5xl font-headline font-bold">Criações Recentes</h3>
                <p className="text-muted-foreground font-light max-w-md">Uma amostra do que temos criado no nosso estúdio em Moçambique.</p>
              </div>
              <Button asChild variant="link" className="text-primary font-bold text-lg p-0 h-auto flex items-center gap-2 group">
                <Link href="/portfolio">
                  Ver portfólio completo
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map(p => (
                <PortfolioCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 md:py-32 px-4 bg-primary text-white text-center overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <Image src="https://picsum.photos/seed/napau-bg/1200/800" alt="" fill className="object-cover" />
          </div>
          <div className="max-w-3xl mx-auto space-y-10 relative z-10">
            <h2 className="text-4xl md:text-6xl font-headline font-bold">Pronto para dar vida à sua visão?</h2>
            <p className="text-primary-foreground/80 text-lg font-light leading-relaxed">
              Estamos prontos para criar algo extraordinário para si. Entre em contacto agora para um orçamento gratuito.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-white text-primary hover:bg-white/90 rounded-2xl px-12 py-8 text-xl font-bold shadow-2xl">
                <a href="https://wa.me/258847615871">Falar no WhatsApp</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}