"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PortfolioCard } from '@/components/PortfolioCard';
import { Logo } from '@/components/Logo';
import { Project, HomeContent, Flyer } from '@/lib/portfolio-data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Cake, Shirt, GraduationCap, Calendar, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [home, setHome] = useState<HomeContent>({
    heroTitle: 'Napau Design & Arte',
    heroSubtitle: 'Qualidade e criatividade em cada detalhe',
    heroImage: '',
    serviceBoloDesc: '',
    serviceCamisetaDesc: '',
    serviceFormacaoDesc: '',
  });
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const [carregando, setCarregando] = useState(true);

  // ✅ Carregar dados do Supabase
  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    setCarregando(true);
    try {
      // Home
      const { data: homeData } = await supabase
        .from('home_content')
        .select('*')
        .single();

      if (homeData) {
        setHome({
          heroTitle: homeData.heroTitle || 'Napau Design & Arte',
          heroSubtitle: homeData.heroSubtitle || 'Qualidade e criatividade em cada detalhe',
          heroImage: homeData.heroImage || '',
          serviceBoloDesc: homeData.serviceBoloDesc || '',
          serviceCamisetaDesc: homeData.serviceCamisetaDesc || '',
          serviceFormacaoDesc: homeData.serviceFormacaoDesc || '',
        });
      }

      // Projetos ativos (apenas 3 para a home)
      const { data: projetosData } = await supabase
        .from('projects')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (projetosData) {
        setProjects(projetosData as Project[]);
      }

      // Flyers ativos
      const { data: flyersData } = await supabase
        .from('flyers')
        .select('*')
        .eq('ativo', true)
        .order('created_at', { ascending: false });

      if (flyersData) {
        setFlyers(flyersData as Flyer[]);
      }
    } catch (erro) {
      console.error('Erro ao carregar dados da home:', erro);
    } finally {
      setCarregando(false);
    }
  }

  const activeFlyers = flyers.filter(f => f.ativo);

  // Estado de carregamento inicial
  if (carregando) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <Logo size={80} className="mx-auto opacity-20 animate-pulse" />
            <Loader2 className="animate-spin mx-auto text-primary" size={32} />
            <p className="text-muted-foreground text-sm uppercase tracking-widest">A carregar...</p>
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
        {/* HERO SECTION */}
        <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden pt-16 md:pt-20">
          <div className="absolute inset-0 z-0">
            {home.heroImage ? (
              <Image 
                src={home.heroImage}
                alt="Napau Design Background"
                fill
                className="object-cover opacity-20 scale-105"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/20" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background"></div>
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4 px-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.25em] border border-primary/20 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-700">
              <Sparkles size={14} className="animate-pulse" />
              Criatividade em Moçambique
            </div>
            <h1 className="text-5xl md:text-8xl font-headline font-bold leading-[0.95] tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
              {home.heroTitle}
            </h1>
            <p className="text-muted-foreground text-lg md:text-2xl font-light max-w-2xl mx-auto leading-relaxed italic animate-in fade-in duration-1000 delay-300">
              {home.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4 animate-in fade-in zoom-in-95 duration-1000 delay-500">
              <Button asChild className="rounded-[1.5rem] px-12 py-8 text-lg font-bold gold-shimmer shadow-2xl hover:scale-105 transition-transform active:scale-95">
                <Link href="/portfolio">Explorar Portfólio</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-[1.5rem] px-12 py-8 text-lg font-bold border-primary/30 hover:bg-primary/5 bg-white/40 backdrop-blur-sm hover:scale-105 transition-transform active:scale-95">
                <Link href="/cursos">Cursos & Formação</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FLYER HIGHLIGHT */}
        {activeFlyers.length > 0 && (
          <section className="py-16 px-6 bg-secondary/10 border-y border-primary/5">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1 space-y-8">
                  <div className="space-y-4">
                    <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] flex items-center gap-2 bg-white/50 w-fit px-4 py-2 rounded-full border border-primary/10">
                      <GraduationCap size={16} /> Próxima Formação
                    </span>
                    <h2 className="text-4xl md:text-7xl font-headline font-bold text-foreground leading-tight">{activeFlyers[0].titulo}</h2>
                    <p className="text-muted-foreground font-light text-xl leading-relaxed italic border-l-4 border-primary/30 pl-6">
                      &quot;Domine a arte da confeitaria com as técnicas exclusivas da Napau.&quot;
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-center gap-5 p-6 bg-white rounded-[2rem] shadow-sm border border-primary/5 group hover:border-primary/20 transition-all hover:shadow-xl">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">Início</p>
                        <p className="font-bold text-lg">{activeFlyers[0].data}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 p-6 bg-white rounded-[2rem] shadow-sm border border-primary/5 group hover:border-primary/20 transition-all hover:shadow-xl">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">Local</p>
                        <p className="font-bold text-sm leading-tight text-primary">{activeFlyers[0].local}</p>
                      </div>
                    </div>
                  </div>

                  <Button asChild className="rounded-[1.5rem] px-12 py-8 text-xl font-bold gold-shimmer shadow-lg">
                    <Link href="/cursos" className="flex items-center gap-3">
                      Garantir Minha Vaga <ArrowRight size={24} />
                    </Link>
                  </Button>
                </div>
                
                <div className="flex-1 relative aspect-[4/5] w-full max-w-md lg:max-w-none rounded-[3rem] overflow-hidden shadow-2xl border-[8px] border-white group">
                  {activeFlyers[0].imageUrl ? (
                    <Image 
                      src={activeFlyers[0].imageUrl} 
                      alt={activeFlyers[0].titulo} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary/30 flex items-center justify-center">
                      <GraduationCap size={64} className="text-muted-foreground/30" />
                    </div>
                  )}
                  <div className="absolute top-8 right-8 bg-primary/90 text-white px-8 py-4 rounded-[1.5rem] font-bold shadow-2xl text-xl backdrop-blur-md animate-bounce">
                    {activeFlyers[0].preco}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SERVICES SECTION */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-headline font-bold tracking-tight">O Que Fazemos</h2>
              <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed">
                Elevamos cada celebração ao estatuto de arte através de designs únicos e exclusivos.
              </p>
              <div className="w-20 h-1 bg-primary/30 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                { icon: Cake, title: "Tipos de Bolo", desc: home.serviceBoloDesc },
                { icon: Shirt, title: "Camisetas", desc: home.serviceCamisetaDesc },
                { icon: GraduationCap, title: "Formação", desc: home.serviceFormacaoDesc }
              ].map((service, i) => (
                <div key={i} className="p-10 rounded-[3rem] bg-secondary/5 space-y-6 border border-border/40 hover:shadow-2xl transition-all duration-700 group hover:-translate-y-4 hover:bg-white">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:rotate-12 transition-transform shadow-sm">
                    <service.icon size={40} />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-2xl md:text-3xl font-headline font-bold">{service.title}</h4>
                    <p className="text-muted-foreground leading-relaxed font-light text-lg">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PORTFOLIO HIGHLIGHT */}
        <section className="py-20 px-6 bg-secondary/5">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
              <div className="space-y-4">
                <h3 className="text-4xl md:text-8xl font-headline font-bold leading-[0.9]">Criações Recentes</h3>
                <p className="text-muted-foreground font-light text-xl max-w-md italic border-l-4 border-primary/30 pl-8">
                  A nossa paixão é transformar a sua imaginação em realidade tangível.
                </p>
              </div>
              <Button asChild variant="link" className="text-primary font-bold text-2xl p-0 h-auto flex items-center gap-3 group mb-2">
                <Link href="/portfolio">
                  Galeria Completa
                  <ArrowRight size={28} className="group-hover:translate-x-3 transition-transform" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {projects.length > 0 ? projects.map(p => (
                <PortfolioCard key={p.id} project={p} />
              )) : (
                <div className="col-span-full py-20 text-center">
                  <Logo size={80} className="mx-auto opacity-10" />
                  <p className="text-muted-foreground mt-6 uppercase tracking-[0.4em] text-xs font-bold">
                    Nenhum projeto publicado ainda.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CONTACT CTA */}
        <section id="contact" className="py-24 md:py-32 px-6 bg-primary text-white text-center overflow-hidden relative">
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            {home.heroImage ? (
              <Image src={home.heroImage} alt="Background Texture" fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-t from-black/20 to-transparent" />
            )}
          </div>
          <div className="max-w-4xl mx-auto space-y-10 relative z-10">
            <h2 className="text-5xl md:text-8xl font-headline font-bold leading-[1] tracking-tight">Pronto para dar vida à sua visão?</h2>
            <p className="text-primary-foreground/90 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto italic">
              Seja para um bolo inesquecível ou uma marca de camisetas exclusiva, a Napau é a sua parceira criativa em Moçambique.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
              <Button asChild className="bg-white text-primary hover:bg-white/95 rounded-[2rem] px-14 py-8 text-2xl font-bold shadow-2xl transition-all hover:scale-105 active:scale-95 group">
                <a 
                  href={`https://wa.me/258847615871?text=${encodeURIComponent('Olá! Vim pelo site da Napau Design & Arte e gostaria de solicitar um orçamento personalizado.')}`}
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
