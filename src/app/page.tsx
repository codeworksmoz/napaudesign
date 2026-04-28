
"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PortfolioCard } from '@/components/PortfolioCard';
import { Project, HomeContent, DEFAULT_HOME_CONTENT, OFFICIAL_IMAGE } from '@/lib/portfolio-data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Cake, Shirt, Loader2, Star } from 'lucide-react';
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
        {/* HERO SECTION - REDUZIDO PARA 75% DA ALTURA */}
        <section className="relative h-[75vh] min-h-[500px] flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0A]">
          <div className="absolute inset-0 z-0">
            <Image 
              src={home.heroImage || OFFICIAL_IMAGE} 
              alt="Napau Design Background" 
              fill 
              className="object-cover opacity-60 scale-100" 
              priority 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0A0A0A]" />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 px-6">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 text-white text-[10px] font-bold uppercase tracking-[0.5em] border border-white/10 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Star size={12} className="text-primary fill-primary" />
              Exclusividade & Arte
            </div>
            <h1 className="text-4xl md:text-7xl font-headline font-bold text-white leading-tight tracking-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-1000 delay-200">
              {home.heroTitle}
            </h1>
            <p className="text-gray-200 text-base md:text-xl max-w-xl mx-auto italic font-light leading-relaxed drop-shadow-md animate-in fade-in slide-in-from-top-4 duration-1000 delay-500">
              {home.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-6 animate-in fade-in zoom-in-90 duration-1000 delay-700">
              <Button asChild className="rounded-full px-10 py-6 text-sm font-bold gold-shimmer shadow-2xl hover:scale-105 transition-all">
                <Link href="/portfolio">Explorar Portfólio</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-10 py-6 text-sm text-white border-white/30 hover:bg-white/10 backdrop-blur-sm transition-all">
                <Link href="/cursos">Ver Cursos</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* TOPOS DE BOLO SECTION - REDUZIDO ASPECT RATIO */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 order-2 lg:order-1">
                <div className="inline-block p-3 rounded-2xl bg-secondary/30 text-primary">
                  <Cake size={32} strokeWidth={1.5} />
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-5xl font-headline font-bold tracking-tight text-[#1A1A1A]">
                    Topos de Bolo <br /><span className="text-primary italic">Personalizados</span>
                  </h2>
                  <div className="w-16 h-1 bg-primary rounded-full" />
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                    {home.serviceBoloDesc}
                  </p>
                </div>
                <div className="pt-2">
                  <Button asChild className="rounded-xl px-8 py-6 font-bold text-base group" variant="default">
                    <Link href="/portfolio?category=Topos de Bolo">
                      Ver Galeria <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative group max-w-lg mx-auto">
                  <div className="absolute -inset-2 bg-primary/5 rounded-[2rem] blur-xl" />
                  <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 5000 })]} className="w-full relative z-10">
                    <CarouselContent>
                      {(home.serviceBoloImages && home.serviceBoloImages.length > 0 ? home.serviceBoloImages : [OFFICIAL_IMAGE]).map((img, index) => (
                        <CarouselItem key={index}>
                          <div className="aspect-[4/3] relative rounded-[2rem] overflow-hidden shadow-xl border-[8px] border-white">
                            <Image src={img} alt={`Topos de Bolo Napau ${index}`} fill className="object-cover" />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="absolute bottom-6 left-6 flex gap-2">
                      <CarouselPrevious className="relative left-0 top-0 translate-y-0 h-10 w-10 bg-white/90 backdrop-blur shadow-lg border-none" />
                      <CarouselNext className="relative right-0 top-0 translate-y-0 h-10 w-10 bg-white/90 backdrop-blur shadow-lg border-none" />
                    </div>
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CAMISETAS SECTION - REDUZIDO ASPECT RATIO */}
        <section className="py-24 px-6 bg-[#FAF7F4]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-1">
                <div className="relative group max-w-lg mx-auto">
                  <div className="absolute -inset-2 bg-primary/5 rounded-[2rem] blur-xl" />
                  <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 5500 })]} className="w-full relative z-10">
                    <CarouselContent>
                      {(home.serviceCamisetaImages && home.serviceCamisetaImages.length > 0 ? home.serviceCamisetaImages : [OFFICIAL_IMAGE]).map((img, index) => (
                        <CarouselItem key={index}>
                          <div className="aspect-[4/3] relative rounded-[2rem] overflow-hidden shadow-xl border-[8px] border-white">
                            <Image src={img} alt={`Camisetas Napau ${index}`} fill className="object-cover" />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="absolute bottom-6 right-6 flex gap-2">
                      <CarouselPrevious className="relative left-0 top-0 translate-y-0 h-10 w-10 bg-white/90 backdrop-blur shadow-lg border-none" />
                      <CarouselNext className="relative right-0 top-0 translate-y-0 h-10 w-10 bg-white/90 backdrop-blur shadow-lg border-none" />
                    </div>
                  </Carousel>
                </div>
              </div>
              <div className="space-y-6 lg:order-2">
                <div className="inline-block p-3 rounded-2xl bg-primary/10 text-primary">
                  <Shirt size={32} strokeWidth={1.5} />
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-5xl font-headline font-bold tracking-tight text-[#1A1A1A]">
                    Camisetas <br /><span className="text-primary italic">Exclusivas</span>
                  </h2>
                  <div className="w-16 h-1 bg-primary rounded-full" />
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                    {home.serviceCamisetaDesc}
                  </p>
                </div>
                <div className="pt-2">
                  <Button asChild className="rounded-xl px-8 py-6 font-bold text-base group bg-[#1A1A1A] hover:bg-black" variant="default">
                    <Link href="/portfolio?category=Camisetas">
                      Ver Coleção <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RECENT PORTFOLIO */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-5xl font-headline font-bold">Destaques</h2>
              <p className="text-muted-foreground text-base italic">Criações recentes no nosso atelier.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map(p => <PortfolioCard key={p.id} project={p} />)}
            </div>
            <div className="text-center pt-8">
              <Button asChild variant="ghost" className="text-primary font-bold text-base hover:bg-primary/5 rounded-full px-10">
                <Link href="/portfolio">Ver Tudo <ArrowRight size={18} className="ml-2" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA SECTION - MAIS COMPACTO */}
        <section className="py-32 px-6 bg-primary text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image src={home.heroImage || OFFICIAL_IMAGE} alt="Pattern Napau" fill className="object-cover scale-125" />
          </div>
          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <h2 className="text-4xl md:text-6xl font-headline font-bold leading-tight tracking-tight drop-shadow-lg">A sua ideia merece tornar-se arte.</h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto font-light leading-relaxed">
              Fale connosco hoje para um orçamento personalizado e exclusivo.
            </p>
            <div className="pt-4">
              <Button asChild className="bg-white text-primary hover:bg-white/90 rounded-full px-14 py-8 text-xl font-bold shadow-xl transition-all hover:scale-105">
                <a href="https://wa.me/258847615871" target="_blank">Contactar WhatsApp</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
