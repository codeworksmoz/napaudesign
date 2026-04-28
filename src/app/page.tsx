
"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PortfolioCard } from '@/components/PortfolioCard';
import { Logo } from '@/components/Logo';
import { Project, HomeContent, DEFAULT_HOME_CONTENT } from '@/lib/portfolio-data';
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
      const { data: homeData } = await supabase.from('home_content').select('*').eq('id', 1).single();
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
          <Loader2 className="animate-spin text-primary" size={32} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <section className="relative min-h-[60vh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden bg-secondary/5">
          <div className="absolute inset-0 z-0">
            {home.hero_image ? (
              <Image src={home.hero_image} alt="Napau" fill className="object-cover opacity-10" priority />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/10" />
            )}
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 px-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] border border-primary/20 backdrop-blur-sm">
              <Sparkles size={14} className="animate-pulse" />
              Criatividade em Moçambique por Codworks
            </div>
            <h1 className="text-4xl md:text-7xl font-headline font-bold leading-tight">{home.hero_title}</h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto italic">{home.hero_subtitle}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild className="rounded-full px-10 py-7 text-lg gold-shimmer shadow-xl">
                <Link href="/portfolio">Ver Galeria</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-10 py-7 text-lg bg-white/50 backdrop-blur-sm">
                <Link href="/cursos">Cursos & Formação</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-10 rounded-[2.5rem] bg-secondary/5 border border-border/40 hover:bg-white transition-all shadow-sm group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform"><Cake size={32} /></div>
              <h3 className="text-2xl font-headline font-bold mb-4">Topos de Bolo</h3>
              <p className="text-muted-foreground leading-relaxed">{home.service_bolo_desc}</p>
            </div>
            <div className="p-10 rounded-[2.5rem] bg-secondary/5 border border-border/40 hover:bg-white transition-all shadow-sm group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform"><Shirt size={32} /></div>
              <h3 className="text-2xl font-headline font-bold mb-4">Camisetas Personalizadas</h3>
              <p className="text-muted-foreground leading-relaxed">{home.service_camiseta_desc}</p>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-secondary/5">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex justify-between items-end">
              <h2 className="text-3xl md:text-5xl font-headline font-bold">Portfólio Recente</h2>
              <Button asChild variant="link" className="text-primary font-bold flex gap-2"><Link href="/portfolio">Ver Tudo <ArrowRight size={18} /></Link></Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map(p => <PortfolioCard key={p.id} project={p} />)}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-primary text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">{home.hero_image && <Image src={home.hero_image} alt="Pattern" fill className="object-cover" />}</div>
          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <h2 className="text-4xl md:text-6xl font-headline font-bold">Vamos criar algo único?</h2>
            <p className="text-primary-foreground/90 text-xl font-light">Peça o seu orçamento via WhatsApp para a Codworks assegurar o seu design.</p>
            <Button asChild className="bg-white text-primary hover:bg-white/90 rounded-full px-12 py-8 text-xl font-bold shadow-2xl transition-all hover:scale-105">
              <a href="https://wa.me/258847615871" target="_blank">Falar com a Napau</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
