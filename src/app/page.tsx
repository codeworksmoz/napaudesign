"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PortfolioCard } from '@/components/PortfolioCard';
import { Project, HomeContent, DEFAULT_HOME_CONTENT, OFFICIAL_IMAGE } from '@/lib/portfolio-data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Cake, Shirt, Loader2, Star } from 'lucide-react';
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
      if (homeData) {
        setHome({
          heroTitle: homeData.heroTitle || DEFAULT_HOME_CONTENT.heroTitle,
          heroSubtitle: homeData.heroSubtitle || DEFAULT_HOME_CONTENT.heroSubtitle,
          heroImage: homeData.heroImage || DEFAULT_HOME_CONTENT.heroImage,
          serviceBoloDesc: homeData.serviceBoloDesc || DEFAULT_HOME_CONTENT.serviceBoloDesc,
          serviceBoloImages: homeData.serviceBoloImages || DEFAULT_HOME_CONTENT.serviceBoloImages,
          serviceCamisetaDesc: homeData.serviceCamisetaDesc || DEFAULT_HOME_CONTENT.serviceCamisetaDesc,
          serviceCamisetaImages: homeData.serviceCamisetaImages || DEFAULT_HOME_CONTENT.serviceCamisetaImages,
          serviceFormacaoDesc: homeData.serviceFormacaoDesc || DEFAULT_HOME_CONTENT.serviceFormacaoDesc,
        });
      }

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
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden bg-[#1A1A1A]">
          <div className="absolute inset-0 z-0">
            <Image 
              src={home.heroImage || OFFICIAL_IMAGE} 
              alt="Napau Design Background" 
              fill 
              className="object-cover opacity-40 scale-105" 
              priority 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10 px-6">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/20 text-white text-[11px] font-bold uppercase tracking-[0.4em] border border-primary/30 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Star size={14} className="text-primary fill-primary" />
              Codworks Design Moz
            </div>
            <h1 className="text-5xl md:text-9xl font-headline font-bold text-white leading-[0.9] tracking-tighter drop-shadow-2xl animate-in fade-in zoom-in-95 duration-1000 delay-200">
              {home.heroTitle}
            </h1>
            <p className="text-gray-300 text-lg md:text-2xl max-w-2xl mx-auto italic font-light leading-relaxed animate-in fade-in slide-in-from-top-4 duration-1000 delay-500">
              {home.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-6 justify-center pt-10 animate-in fade-in zoom-in-90 duration-1000 delay-700">
              <Button asChild className="rounded-full px-14 py-8 text-lg font-bold gold-shimmer shadow-2xl hover:scale-105 transition-all">
                <Link href="/portfolio">Ver Portfólio</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-14 py-8 text-lg text-white border-white/20 hover:bg-white/10 backdrop-blur-sm transition-all">
                <Link href="/cursos">Inscrição Cursos</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* TOPOS DE BOLO SECTION */}
        <section className="py-32 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
                <div className="inline-block p-4 rounded-3xl bg-secondary/30 text-primary">
                  <Cake size={48} strokeWidth={1.5} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-[#2A2A2A]">
                    Topos de Bolo <br /><span className="text-primary">Artísticos</span>
                  </h2>
                  <div className="w-20 h-1.5 bg-primary rounded-full" />
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {home.serviceBoloDesc}
                  </p>
                </div>
                <div className="pt-4">
                  <Button asChild className="rounded-2xl px-10 py-7 font-bold text-lg group" variant="default">
                    <Link href="/portfolio?category=Topos de Bolo">
                      Explorar Galeria <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-primary/5 rounded-[4rem] blur-2xl group-hover:bg-primary/10 transition-colors" />
                  <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 5000 })]} className="w-full relative z-10">
                    <CarouselContent>
                      {(home.serviceBoloImages && home.serviceBoloImages.length > 0 ? home.serviceBoloImages : [OFFICIAL_IMAGE]).map((img, index) => (
                        <CarouselItem key={index}>
                          <div className="aspect-[4/5] md:aspect-square relative rounded-[3.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-[12px] border-white">
                            <Image src={img} alt={`Topos de Bolo Napau ${index}`} fill className="object-cover" />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="absolute bottom-10 left-10 flex gap-4">
                      <CarouselPrevious className="relative left-0 top-0 translate-y-0 h-14 w-14 bg-white/90 backdrop-blur shadow-xl hover:bg-primary hover:text-white transition-all border-none" />
                      <CarouselNext className="relative right-0 top-0 translate-y-0 h-14 w-14 bg-white/90 backdrop-blur shadow-xl hover:bg-primary hover:text-white transition-all border-none" />
                    </div>
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CAMISETAS SECTION */}
        <section className="py-32 px-6 bg-[#FAF7F4]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-primary/5 rounded-[4rem] blur-2xl group-hover:bg-primary/10 transition-colors" />
                  <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 5500 })]} className="w-full relative z-10">
                    <CarouselContent>
                      {(home.serviceCamisetaImages && home.serviceCamisetaImages.length > 0 ? home.serviceCamisetaImages : [OFFICIAL_IMAGE]).map((img, index) => (
                        <CarouselItem key={index}>
                          <div className="aspect-[4/5] md:aspect-square relative rounded-[3.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-[12px] border-white">
                            <Image src={img} alt={`Camisetas Napau ${index}`} fill className="object-cover" />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="absolute bottom-10 right-10 flex gap-4">
                      <CarouselPrevious className="relative left-0 top-0 translate-y-0 h-14 w-14 bg-white/90 backdrop-blur shadow-xl hover:bg-primary hover:text-white transition-all border-none" />
                      <CarouselNext className="relative right-0 top-0 translate-y-0 h-14 w-14 bg-white/90 backdrop-blur shadow-xl hover:bg-primary hover:text-white transition-all border-none" />
                    </div>
                  </Carousel>
                </div>
              </div>
              <div className="lg:col-span-5 space-y-8">
                <div className="inline-block p-4 rounded-3xl bg-primary/10 text-primary">
                  <Shirt size={48} strokeWidth={1.5} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-[#2A2A2A]">
                    Camisetas <br /><span className="text-primary">Exclusivas</span>
                  </h2>
                  <div className="w-20 h-1.5 bg-primary rounded-full" />
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {home.serviceCamisetaDesc}
                  </p>
                </div>
                <div className="pt-4">
                  <Button asChild className="rounded-2xl px-10 py-7 font-bold text-lg group bg-[#2A2A2A] hover:bg-[#1A1A1A]" variant="default">
                    <Link href="/portfolio?category=Camisetas">
                      Ver Coleção <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RECENT PORTFOLIO */}
        <section className="py-32 px-6 bg-white">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-headline font-bold">Destaques Recentes</h2>
              <p className="text-muted-foreground text-lg italic">Uma amostra do que temos criado no atelier.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {projects.map(p => <PortfolioCard key={p.id} project={p} />)}
            </div>
            <div className="text-center pt-10">
              <Button asChild variant="ghost" className="text-primary font-bold text-lg hover:bg-primary/5 rounded-full px-12">
                <Link href="/portfolio">Ver Portfólio Completo <ArrowRight size={20} className="ml-2" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-40 px-6 bg-primary text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image src={home.heroImage || OFFICIAL_IMAGE} alt="Pattern Napau" fill className="object-cover scale-150 rotate-12" />
          </div>
          <div className="max-w-4xl mx-auto space-y-12 relative z-10">
            <h2 className="text-5xl md:text-8xl font-headline font-bold leading-[0.9] tracking-tighter">Pronto para elevar sua celebração?</h2>
            <p className="text-white/80 text-xl max-w-2xl mx-auto font-light">
              Fale connosco hoje para um orçamento personalizado e transforme a sua visão em arte.
            </p>
            <div className="pt-6">
              <Button asChild className="bg-white text-primary hover:bg-white/90 rounded-full px-20 py-10 text-3xl font-bold shadow-[0_24px_48px_-12px_rgba(0,0,0,0.3)] transition-all hover:scale-105 active:scale-95">
                <a href="https://wa.me/258847615871" target="_blank">Falar no WhatsApp</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
