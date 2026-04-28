
"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PortfolioCard } from '@/components/PortfolioCard';
import { Project, HomeContent, DEFAULT_HOME_CONTENT } from '@/lib/portfolio-data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Cake, Shirt, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

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
      const { data: homeData } = await supabase.from('home_content').select('*').eq('id', 1).maybeSingle();
      if (homeData) setHome({
        hero_title: homeData.heroTitle || DEFAULT_HOME_CONTENT.hero_title,
        hero_subtitle: homeData.heroSubtitle || DEFAULT_HOME_CONTENT.hero_subtitle,
        hero_image: homeData.heroImage || DEFAULT_HOME_CONTENT.hero_image,
        service_bolo_desc: homeData.serviceBoloDesc || DEFAULT_HOME_CONTENT.service_bolo_desc,
        service_bolo_images: homeData.serviceBoloImages || DEFAULT_HOME_CONTENT.service_bolo_images,
        service_camiseta_desc: homeData.serviceCamisetaDesc || DEFAULT_HOME_CONTENT.service_camiseta_desc,
        service_camiseta_images: homeData.serviceCamisetaImages || DEFAULT_HOME_CONTENT.service_camiseta_images,
        service_formacao_desc: homeData.serviceFormacaoDesc || DEFAULT_HOME_CONTENT.service_formacao_desc,
      });

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
        {/* HERO SECTION */}
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden bg-secondary/5">
          <div className="absolute inset-0 z-0">
            {home.hero_image ? (
              <Image 
                src={home.hero_image} 
                alt="Napau Design" 
                fill 
                className="object-cover opacity-30" 
                priority 
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/10" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 px-6">
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.3em] border border-primary/20 backdrop-blur-md">
              <Sparkles size={14} className="animate-pulse" />
              Criatividade em Moçambique por Codworks
            </div>
            <h1 className="text-5xl md:text-8xl font-headline font-bold leading-none tracking-tighter">
              {home.hero_title}
            </h1>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl mx-auto italic font-light leading-relaxed">
              {home.hero_subtitle}
            </p>
            <div className="flex flex-wrap gap-6 justify-center pt-6">
              <Button asChild className="rounded-full px-12 py-8 text-lg font-bold gold-shimmer shadow-2xl hover:scale-105 transition-transform">
                <Link href="/portfolio">Explorar Portfólio</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-12 py-8 text-lg bg-white/50 backdrop-blur-sm border-primary/20 hover:bg-white transition-all">
                <Link href="/cursos">Agenda de Cursos</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION WITH CAROUSELS */}
        <section className="py-24 px-6 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-24">
            
            {/* Topos de Bolo */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 order-2 lg:order-1">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Cake size={36} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-headline font-bold">Topos de Bolo</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                    {home.service_bolo_desc}
                  </p>
                </div>
                <Button asChild className="rounded-xl px-8 py-6 font-bold" variant="outline">
                  <Link href="/portfolio?category=Topos de Bolo">Ver Galeria Completa</Link>
                </Button>
              </div>
              <div className="order-1 lg:order-2">
                <Carousel 
                  opts={{ loop: true }} 
                  plugins={[Autoplay({ delay: 4000 })]}
                  className="w-full max-w-xl mx-auto"
                >
                  <CarouselContent>
                    {(home.service_bolo_images && home.service_bolo_images.length > 0 ? home.service_bolo_images : [home.hero_image]).map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-square relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                          <Image src={img} alt={`Topo de Bolo ${index}`} fill className="object-cover" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center gap-4 mt-6">
                    <CarouselPrevious className="static translate-y-0" />
                    <CarouselNext className="static translate-y-0" />
                  </div>
                </Carousel>
              </div>
            </div>

            {/* Camisetas Personalizadas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="">
                <Carousel 
                  opts={{ loop: true }} 
                  plugins={[Autoplay({ delay: 4500 })]}
                  className="w-full max-w-xl mx-auto"
                >
                  <CarouselContent>
                    {(home.service_camiseta_images && home.service_camiseta_images.length > 0 ? home.service_camiseta_images : [home.hero_image]).map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-square relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                          <Image src={img} alt={`Camiseta ${index}`} fill className="object-cover" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center gap-4 mt-6">
                    <CarouselPrevious className="static translate-y-0" />
                    <CarouselNext className="static translate-y-0" />
                  </div>
                </Carousel>
              </div>
              <div className="space-y-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Shirt size={36} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-headline font-bold">Camisetas Personalizadas</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                    {home.service_camiseta_desc}
                  </p>
                </div>
                <Button asChild className="rounded-xl px-8 py-6 font-bold" variant="outline">
                  <Link href="/portfolio?category=Camisetas">Explorar Designs</Link>
                </Button>
              </div>
            </div>

          </div>
        </section>

        {/* RECENT PROJECTS */}
        <section className="py-24 px-6 bg-secondary/5">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 text-center md:text-left">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-headline font-bold">Portfólio Recente</h2>
                <p className="text-muted-foreground italic">Dê uma olhadela no que temos criado ultimamente.</p>
              </div>
              <Button asChild variant="link" className="text-primary font-bold text-lg flex gap-2 group">
                <Link href="/portfolio">Ver Galeria Completa <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {projects.length > 0 ? (
                projects.map(p => <PortfolioCard key={p.id} project={p} />)
              ) : (
                <div className="col-span-full py-20 text-center opacity-40 italic">A carregar trabalhos...</div>
              )}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-32 px-6 bg-primary text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <Image 
              src={home.hero_image} 
              alt="Background Pattern" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="max-w-4xl mx-auto space-y-10 relative z-10">
            <h2 className="text-5xl md:text-7xl font-headline font-bold leading-tight">Vamos dar vida à sua ideia?</h2>
            <p className="text-primary-foreground/90 text-xl md:text-2xl font-light">
              Estamos prontos para criar um design único que combine com a sua celebração.
            </p>
            <div className="pt-6">
              <Button asChild className="bg-white text-primary hover:bg-white/90 rounded-full px-16 py-10 text-2xl font-bold shadow-2xl transition-all hover:scale-105">
                <a href="https://wa.me/258847615871" target="_blank">Falar com a Napau no WhatsApp</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
