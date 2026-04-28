
"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PortfolioCard } from '@/components/PortfolioCard';
import { Logo } from '@/components/Logo';
import { Project, HomeContent, Flyer, DEFAULT_HOME_CONTENT } from '@/lib/portfolio-data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Cake, Shirt, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [home, setHome] = useState<HomeContent>(DEFAULT_HOME_CONTENT);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    setCarregando(true);
    try {
      const { data: homeData } = await supabase.from('home_content').select('*').single();
      if (homeData) setHome(homeData);

      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false })
        .limit(3);
      if (projectsData) setProjects(projectsData as Project[]);

    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setCarregando(false);
    }
  }

  if (carregando) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <Logo size={80} className="mx-auto opacity-20 animate-pulse" />
            <Loader2 className="animate-spin mx-auto text-primary" size={32} />
            <p className="text-muted-foreground text-sm uppercase tracking-widest">A carregar Napau...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* HERO SECTION - Espaçamento otimizado para eliminar o vazio no topo */}
        <section className="relative min-h-[50vh] flex flex-col items-center justify-start pt-20 pb-10 overflow-hidden">
          <div className="absolute inset-0 z-0">
            {home.heroImage ? (
              <Image 
                src={home.heroImage}
                alt="Napau Design Background"
                fill
                className="object-cover opacity-10 scale-105"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/10" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-transparent to-background"></div>
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4 px-6 mt-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] border border-primary/20 backdrop-blur-sm">
              <Sparkles size={14} className="animate-pulse" />
              Criatividade em Moçambique
            </div>
            <h1 className="text-4xl md:text-7xl font-headline font-bold leading-[1.1] tracking-tight text-foreground">
              {home.heroTitle}
            </h1>
            <p className="text-muted-foreground text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed italic">
              {home.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild className="rounded-full px-10 py-7 text-lg font-bold gold-shimmer shadow-xl">
                <Link href="/portfolio">Ver Galeria</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-10 py-7 text-lg font-bold border-primary/30 hover:bg-primary/5 bg-white/50 backdrop-blur-sm">
                <Link href="/cursos">Cursos & Formação</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION - Foco em Topos de Bolo e Camisetas */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-headline font-bold tracking-tight">Especialidades Napau</h2>
              <div className="w-16 h-1 bg-primary/30 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
              {[
                { icon: Cake, title: "Topos de Bolo", desc: home.serviceBoloDesc },
                { icon: Shirt, title: "Camisetas Personalizadas", desc: home.serviceCamisetaDesc }
              ].map((service, i) => (
                <div key={i} className="p-8 rounded-[2rem] bg-secondary/5 space-y-6 border border-border/40 hover:shadow-lg transition-all duration-500 group hover:-translate-y-1 hover:bg-white">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <service.icon size={28} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl md:text-2xl font-headline font-bold">{service.title}</h4>
                    <p className="text-muted-foreground leading-relaxed font-light text-base">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PORTFOLIO HIGHLIGHT */}
        <section className="py-16 px-6 bg-secondary/5">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
              <div className="space-y-1">
                <h3 className="text-3xl md:text-5xl font-headline font-bold">Criações Recentes</h3>
              </div>
              <Button asChild variant="link" className="text-primary font-bold text-lg p-0 h-auto flex items-center gap-2 group">
                <Link href="/portfolio">
                  Ver Tudo
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.length > 0 ? projects.map(p => (
                <PortfolioCard key={p.id} project={p} />
              )) : (
                <div className="col-span-full py-16 text-center">
                  <Logo size={60} className="mx-auto opacity-10" />
                  <p className="text-muted-foreground mt-4 uppercase tracking-widest text-xs font-bold">
                    Novas peças em breve...
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CONTACT CTA */}
        <section id="contact" className="py-20 px-6 bg-primary text-white text-center overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            {home.heroImage && <Image src={home.heroImage} alt="Background Texture" fill className="object-cover" />}
          </div>
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl md:text-6xl font-headline font-bold leading-tight">Vamos criar algo único?</h2>
            <p className="text-primary-foreground/90 text-lg font-light">Peça o seu orçamento para topos de bolo exclusivos ou camisetas premium.</p>
            <div className="pt-4">
              <Button asChild className="bg-white text-primary hover:bg-white/90 rounded-full px-12 py-8 text-xl font-bold shadow-2xl transition-all hover:scale-105">
                <a 
                  href="https://wa.me/258847615871"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
