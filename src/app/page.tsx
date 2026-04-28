"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PortfolioCard } from '@/components/PortfolioCard';
import { Project, HomeContent, DEFAULT_HOME_CONTENT, OFFICIAL_IMAGE } from '@/lib/portfolio-data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Cake, Shirt, Loader2 } from 'lucide-react';
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
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden bg-secondary/5">
          <div className="absolute inset-0 z-0">
            <Image src={home.heroImage || OFFICIAL_IMAGE} alt="Napau Design" fill className="object-cover opacity-30" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 px-6">
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.3em] border border-primary/20 backdrop-blur-md">
              <Sparkles size={14} className="animate-pulse" />
              Codworks Design & Excellence
            </div>
            <h1 className="text-5xl md:text-8xl font-headline font-bold leading-none tracking-tighter">{home.heroTitle}</h1>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl mx-auto italic font-light leading-relaxed">{home.heroSubtitle}</p>
            <div className="flex flex-wrap gap-6 justify-center pt-6">
              <Button asChild className="rounded-full px-12 py-8 text-lg font-bold gold-shimmer shadow-2xl hover:scale-105 transition-transform"><Link href="/portfolio">Portfólio</Link></Button>
              <Button asChild variant="outline" className="rounded-full px-12 py-8 text-lg bg-white/50 backdrop-blur-sm border-primary/20 hover:bg-white"><Link href="/cursos">Cursos</Link></Button>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 order-2 lg:order-1">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary"><Cake size={36} /></div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-headline font-bold">Topos de Bolo</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">{home.serviceBoloDesc}</p>
                </div>
                <Button asChild className="rounded-xl px-8 py-6 font-bold" variant="outline"><Link href="/portfolio?category=Topos de Bolo">Ver Mais</Link></Button>
              </div>
              <div className="order-1 lg:order-2">
                <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 4000 })]} className="w-full max-w-xl mx-auto">
                  <CarouselContent>
                    {(home.serviceBoloImages && home.serviceBoloImages.length > 0 ? home.serviceBoloImages : [OFFICIAL_IMAGE]).map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-square relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                          <Image src={img} alt={`Bolo ${index}`} fill className="object-cover" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center gap-4 mt-6"><CarouselPrevious className="static translate-y-0" /><CarouselNext className="static translate-y-0" /></div>
                </Carousel>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 4500 })]} className="w-full max-w-xl mx-auto">
                  <CarouselContent>
                    {(home.serviceCamisetaImages && home.serviceCamisetaImages.length > 0 ? home.serviceCamisetaImages : [OFFICIAL_IMAGE]).map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-square relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                          <Image src={img} alt={`Camiseta ${index}`} fill className="object-cover" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center gap-4 mt-6"><CarouselPrevious className="static translate-y-0" /><CarouselNext className="static translate-y-0" /></div>
                </Carousel>
              </div>
              <div className="space-y-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary"><Shirt size={36} /></div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-headline font-bold">Camisetas</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">{home.serviceCamisetaDesc}</p>
                </div>
                <Button asChild className="rounded-xl px-8 py-6 font-bold" variant="outline"><Link href="/portfolio?category=Camisetas">Ver Mais</Link></Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-secondary/5">
          <div className="max-w-7xl mx-auto space-y-16">
            <h2 className="text-4xl md:text-6xl font-headline font-bold text-center">Portfólio Recente</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {projects.map(p => <PortfolioCard key={p.id} project={p} />)}
            </div>
          </div>
        </section>

        <section className="py-32 px-6 bg-primary text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-15"><Image src={home.heroImage || OFFICIAL_IMAGE} alt="Pattern" fill className="object-cover" /></div>
          <div className="max-w-4xl mx-auto space-y-10 relative z-10">
            <h2 className="text-5xl md:text-7xl font-headline font-bold leading-tight">Vamos criar algo único?</h2>
            <Button asChild className="bg-white text-primary hover:bg-white/90 rounded-full px-16 py-10 text-2xl font-bold shadow-2xl transition-all hover:scale-105">
              <a href="https://wa.me/258847615871" target="_blank">Falar no WhatsApp</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
