
"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PortfolioCard } from '@/components/PortfolioCard';
import { Project, HomeContent, DEFAULT_HOME_CONTENT, OFFICIAL_IMAGE } from '@/lib/portfolio-data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Cake, Shirt, Loader2, Star, GraduationCap, CheckCircle, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Autoplay from 'embla-carousel-autoplay';
import { ProcessSection } from '@/components/ProcessSection';
import { SocialProofStrip } from '@/components/SocialProofStrip';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [home, setHome] = useState<HomeContent>(DEFAULT_HOME_CONTENT);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative h-[85vh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0A]">
          <div className="absolute inset-0 z-0">
            <Image 
              src={home.heroImage || OFFICIAL_IMAGE} 
              alt="Napau Design Background" 
              fill 
              className="object-cover opacity-60" 
              priority 
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#0A0A0A]" />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 px-6">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 text-white text-[10px] font-bold uppercase tracking-[0.5em] border border-white/10 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Star size={12} className="text-primary fill-primary" />
              Exclusividade & Arte em Maputo
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

        {/* PROVA SOCIAL STRIP */}
        <SocialProofStrip />

        {/* TRÊS PILARES - CARDS RÁPIDOS */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-[#FAF7F4] p-10 rounded-[2.5rem] border border-primary/5 hover:border-primary/20 transition-all text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto group-hover:scale-110 transition-transform">
                <Cake size={32} />
              </div>
              <h3 className="text-xl font-headline font-bold">Topos de Bolo</h3>
              <p className="text-sm text-muted-foreground">Peças em acrílico e madeira para eventos inesquecíveis.</p>
              <Link href="/portfolio?category=Topos de Bolo" className="inline-flex items-center text-primary font-bold text-xs uppercase tracking-widest gap-2 pt-2">
                Ver Galeria <ArrowRight size={14} />
              </Link>
            </div>
            <div className="group bg-[#FAF7F4] p-10 rounded-[2.5rem] border border-primary/5 hover:border-primary/20 transition-all text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto group-hover:scale-110 transition-transform">
                <Shirt size={32} />
              </div>
              <h3 className="text-xl font-headline font-bold">Camisetas</h3>
              <p className="text-sm text-muted-foreground">Estamparia premium com design exclusivo para si.</p>
              <Link href="/portfolio?category=Camisetas" className="inline-flex items-center text-primary font-bold text-xs uppercase tracking-widest gap-2 pt-2">
                Ver Coleção <ArrowRight size={14} />
              </Link>
            </div>
            <div className="group bg-[#FAF7F4] p-10 rounded-[2.5rem] border border-primary/5 hover:border-primary/20 transition-all text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto group-hover:scale-110 transition-transform">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-xl font-headline font-bold">Cursos</h3>
              <p className="text-sm text-muted-foreground">Aprenda as técnicas do atelier com quem faz.</p>
              <Link href="/cursos" className="inline-flex items-center text-primary font-bold text-xs uppercase tracking-widest gap-2 pt-2">
                Saber Mais <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* DETALHES TOPOS DE BOLO */}
        <section className="py-24 px-6 bg-[#FAF7F4]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-headline font-bold tracking-tight text-[#1A1A1A]">
                  Topos de Bolo <br /><span className="text-primary italic">Inesquecíveis</span>
                </h2>
                <div className="w-16 h-1 bg-primary rounded-full" />
                <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                  {home.serviceBoloDesc}
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm font-medium"><CheckCircle size={18} className="text-primary" /> Acabamento em Laser</div>
                  <div className="flex items-center gap-3 text-sm font-medium"><CheckCircle size={18} className="text-primary" /> Design 100% Personalizado</div>
                  <div className="flex items-center gap-3 text-sm font-medium"><CheckCircle size={18} className="text-primary" /> Entrega Rápida em Maputo</div>
                </div>
                <div className="pt-6">
                  <Button asChild className="rounded-xl px-8 py-6 font-bold text-base group" variant="default">
                    <Link href="/portfolio?category=Topos de Bolo">
                      Ver Trabalhos <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 5000 })]} className="w-full relative z-10">
                  <CarouselContent>
                    {(home.serviceBoloImages?.length ? home.serviceBoloImages : [OFFICIAL_IMAGE]).map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-[4/3] relative rounded-[2rem] overflow-hidden shadow-2xl border-[10px] border-white">
                          <Image src={img} alt={`Topos de Bolo Napau ${index}`} fill className="object-cover" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="absolute -bottom-8 right-8 flex gap-2">
                    <CarouselPrevious className="relative left-0 top-0 translate-y-0 h-12 w-12 bg-white shadow-xl border-none" />
                    <CarouselNext className="relative right-0 top-0 translate-y-0 h-12 w-12 bg-white shadow-xl border-none" />
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
        </section>

        {/* COMO TRABALHAMOS */}
        <ProcessSection />

        {/* DESTAQUES DO PORTFÓLIO */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-headline font-bold">Arte Recente</h2>
              <p className="text-muted-foreground text-base italic max-w-lg mx-auto">Confira as últimas criações que saíram do nosso atelier direto para o coração dos nossos clientes.</p>
            </div>
            {carregando ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {projects.map(p => <PortfolioCard key={p.id} project={p} />)}
              </div>
            )}
            <div className="text-center pt-8">
              <Button asChild variant="ghost" className="text-primary font-bold text-base hover:bg-primary/5 rounded-full px-12 h-14">
                <Link href="/portfolio">Ver Portfólio Completo <ArrowRight size={18} className="ml-2" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-24 px-6 bg-[#FAF7F4]">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-flex p-3 bg-primary/10 rounded-2xl text-primary mb-2">
                <HelpCircle size={32} />
              </div>
              <h2 className="text-3xl md:text-5xl font-headline font-bold">Dúvidas Frequentes</h2>
              <p className="text-muted-foreground italic">Tudo o que precisa de saber para encomendar a sua arte.</p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b-primary/10">
                <AccordionTrigger className="font-headline font-bold text-lg text-left">Qual é o prazo médio de entrega?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Para topos de bolo personalizados, o prazo médio é de 3 a 5 dias úteis após a aprovação do design. Camisetas exclusivas podem levar de 5 a 7 dias, dependendo da complexidade.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b-primary/10">
                <AccordionTrigger className="font-headline font-bold text-lg text-left">Fazem entregas fora de Maputo?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Sim! Fazemos entregas em todo o território nacional via transportadoras parceiras. Os custos de envio variam consoante a província.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b-primary/10">
                <AccordionTrigger className="font-headline font-bold text-lg text-left">Quais as formas de pagamento aceites?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Aceitamos pagamentos via M-Pesa, E-Mola, transferência bancária (BCI, Standard Bank) e pagamentos em numerário no nosso atelier em Maputo.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-b-primary/10">
                <AccordionTrigger className="font-headline font-bold text-lg text-left">Posso levar o meu próprio design para a camiseta?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Com certeza! Pode enviar-nos a sua ideia ou ficheiro e nós adaptamos para garantir que o resultado final na estamparia seja perfeito e duradouro.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-32 px-6 bg-primary text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image src={home.heroImage || OFFICIAL_IMAGE} alt="Pattern Napau" fill className="object-cover scale-110" />
          </div>
          <div className="max-w-3xl mx-auto space-y-10 relative z-10">
            <h2 className="text-4xl md:text-6xl font-headline font-bold leading-tight tracking-tight drop-shadow-xl">A sua ideia merece tornar-se arte.</h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto font-light leading-relaxed">
              Fale connosco hoje para um orçamento personalizado ou inscreva-se nos nossos cursos.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button asChild className="bg-white text-primary hover:bg-white/90 rounded-full px-12 py-8 text-xl font-bold shadow-xl transition-all hover:scale-105">
                <a href="https://wa.me/258847615871" target="_blank">Contactar WhatsApp</a>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-10 py-8 text-lg font-bold">
                <Link href="/cursos">Ver Cursos</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
