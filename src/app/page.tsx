"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PortfolioCard } from '@/components/PortfolioCard';
import { Project, HomeContent, DEFAULT_HOME_CONTENT, OFFICIAL_IMAGE, DEFAULT_BOLO_TYPES } from '@/lib/portfolio-data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Cake, Shirt, Loader2, Star, GraduationCap, CheckCircle, HelpCircle, Sparkles, ShoppingBag, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Autoplay from 'embla-carousel-autoplay';
import { ProcessSection } from '@/components/ProcessSection';
import { SocialProofStrip } from '@/components/SocialProofStrip';
import { Logo } from '@/components/Logo';

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
          ...DEFAULT_HOME_CONTENT,
          ...homeData
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

  const boloTypes = home.boloTypesJson ? JSON.parse(home.boloTypesJson) : DEFAULT_BOLO_TYPES;

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
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0A0A0A]" />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 px-6">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 text-white text-[10px] font-bold uppercase tracking-[0.5em] border border-white/20 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Star size={12} className="text-primary fill-primary" />
              Exclusividade & Arte em Maputo
            </div>
            <h1 className="text-4xl md:text-7xl font-headline font-bold text-white leading-tight tracking-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-1000 delay-200">
              {home.heroTitle}
            </h1>
            <p className="text-gray-100 text-base md:text-xl max-w-xl mx-auto italic font-light leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-top-4 duration-1000 delay-500">
              {home.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-6 animate-in fade-in zoom-in-90 duration-1000 delay-700">
              <Button asChild className="rounded-full px-10 py-6 text-sm font-bold gold-shimmer shadow-2xl hover:scale-105 transition-all">
                <Link href="/portfolio">Explorar Portfólio</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-10 py-6 text-sm text-white border-white/40 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all shadow-lg">
                <Link href="/cursos">Ver Cursos</Link>
              </Button>
            </div>
          </div>
        </section>

        <SocialProofStrip />

        {/* PERSONALIZE SEU EVENTO INTRO */}
        <section className="py-24 px-6 bg-white relative overflow-hidden">
           <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
             <Logo size={400} />
           </div>
           <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                <Sparkles size={14} /> {home.eventTitle}
              </div>
              <h2 className="text-3xl md:text-5xl font-headline font-bold text-[#1A1A1A]">{home.eventSubtitle}</h2>
              <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
              <p className="text-lg text-muted-foreground leading-relaxed italic max-w-3xl mx-auto whitespace-pre-line">
                {home.eventDesc}
              </p>
           </div>
        </section>

        {/* DESIGNER DE CAMISETAS DETALHADO */}
        <section className="py-24 px-6 bg-[#FAF7F4]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 5000 })]} className="w-full relative z-10">
                  <CarouselContent>
                    {(home.serviceCamisetaImages?.length ? home.serviceCamisetaImages : [OFFICIAL_IMAGE]).map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-[4/3] relative rounded-[2rem] overflow-hidden shadow-2xl border-[10px] border-white">
                          <Image src={img} alt={`Camisetas Napau ${index}`} fill className="object-cover" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
              
              <div className="space-y-8 order-1 lg:order-2">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-5xl font-headline font-bold tracking-tight text-[#1A1A1A]">
                    {home.camisetaTitle}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                    {home.camisetaDesc}
                  </p>
                </div>

                <div className="bg-white p-8 rounded-[2rem] space-y-6 shadow-sm border border-primary/5">
                  <h4 className="font-bold uppercase text-[10px] tracking-[0.3em] text-primary">📋 É simples de pedir:</h4>
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0">1</div>
                      <p className="text-sm font-medium">Escolhe o modelo — Algodão premium ou Dry-Fit</p>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0">2</div>
                      <p className="text-sm font-medium">Partilha a sua ideia pelo WhatsApp (nome, foto ou frase)</p>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0">3</div>
                      <p className="text-sm font-medium">Recebe em casa ou levanta no nosso atelier</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="text-[10px] text-muted-foreground font-bold uppercase">🎯 Pedidos a partir de 1 unidade • DTG & Sublimação</p>
                  </div>
                </div>

                <Button asChild className="rounded-xl px-10 py-8 text-lg font-bold group gold-shimmer shadow-xl">
                  <a href="https://wa.me/258847615871?text=Olá! Gostaria de criar uma camiseta personalizada.">
                    Criar minha camiseta agora <Wand2 size={20} className="ml-2 group-hover:rotate-12 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* TOPOS DE BOLO DETALHADO */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-5xl font-headline font-bold tracking-tight text-[#1A1A1A]">
                    {home.boloTitle}
                  </h2>
                  <p className="text-lg text-primary font-bold italic leading-relaxed">
                    {home.boloDesc}
                  </p>
                  <div className="p-6 bg-[#FAF7F4] rounded-3xl border border-primary/10 shadow-sm">
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      <HelpCircle size={16} className="inline mr-2 text-primary" />
                      {home.boloWhatIs}
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                  <Star size={14} /> Os Favoritos de Moçambique
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {boloTypes.map((type: any, idx: number) => (
                    <div key={idx} className="bg-[#FAF7F4] p-6 rounded-3xl border border-primary/5 hover:border-primary/20 transition-all group shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-headline font-bold text-primary group-hover:scale-105 transition-transform">{idx + 1}. {type.title}</h5>
                        <span className="text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded-full">{type.price}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-snug italic">{type.desc}</p>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 flex flex-col gap-4">
                   <div className="bg-primary/5 p-8 rounded-[2rem] space-y-6 shadow-sm border border-primary/5">
                    <h4 className="font-bold uppercase text-[10px] tracking-[0.3em] text-primary">📲 Como Encomendar:</h4>
                    <div className="space-y-4">
                      <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0">1</div>
                        <p className="text-sm font-medium">Escolha o tipo que mais combina com a festa</p>
                      </div>
                      <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0">2</div>
                        <p className="text-sm font-medium">Envie foto, nome ou tema pelo WhatsApp</p>
                      </div>
                      <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0">3</div>
                        <p className="text-sm font-medium">Levante na loja ou peça entrega ao domicílio</p>
                      </div>
                    </div>
                  </div>

                   <Button asChild className="rounded-xl px-10 py-8 text-lg font-bold group gold-shimmer shadow-xl mt-4">
                    <a href="https://wa.me/258847615871?text=Olá! Gostaria de encomendar um topo de bolo.">
                      Encomendar meu topo <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <p className="text-center text-xs font-bold text-primary italic">
                    💡 Dica Napau: Combine a sua camiseta com o topo de bolo no mesmo tema!
                  </p>
                </div>
              </div>

              <div className="relative h-full flex flex-col justify-center">
                <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 5000 })]} className="w-full relative z-10">
                  <CarouselContent>
                    {(home.serviceBoloImages?.length ? home.serviceBoloImages : [OFFICIAL_IMAGE]).map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-[4/5] relative rounded-[2rem] overflow-hidden shadow-2xl border-[10px] border-[#FAF7F4]">
                          <Image src={img} alt={`Topos de Bolo Napau ${index}`} fill className="object-cover" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="absolute -bottom-8 right-8 flex gap-2">
                    <CarouselPrevious className="relative left-0 top-0 translate-y-0 h-12 w-12 bg-white shadow-xl border-none hover:bg-primary hover:text-white transition-all" />
                    <CarouselNext className="relative right-0 top-0 translate-y-0 h-12 w-12 bg-white shadow-xl border-none hover:bg-primary hover:text-white transition-all" />
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
        </section>

        <ProcessSection />

        {/* DESTAQUES DO PORTFÓLIO */}
        <section className="py-24 px-6 bg-[#FAF7F4]">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-headline font-bold text-[#1A1A1A]">Arte Recente</h2>
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
              <Button asChild variant="outline" className="text-primary border-primary font-bold text-base hover:bg-primary hover:text-white rounded-full px-12 h-14 transition-all">
                <Link href="/portfolio">Ver Portfólio Completo <ArrowRight size={18} className="ml-2" /></Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-white">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-flex p-3 bg-primary/10 rounded-2xl text-primary mb-2">
                <HelpCircle size={32} />
              </div>
              <h2 className="text-3xl md:text-5xl font-headline font-bold text-[#1A1A1A]">Dúvidas Frequentes</h2>
              <p className="text-muted-foreground italic">Tudo o que precisa de saber para encomendar a sua arte.</p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b-primary/10">
                <AccordionTrigger className="font-headline font-bold text-lg text-left hover:text-primary transition-colors">Qual é o prazo médio de entrega?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Para topos de bolo personalizados, o prazo varia entre 24h (Foto Comestível) e 7 dias (Flores de Açúcar). Camisetas exclusivas levam de 3 a 7 dias úteis.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b-primary/10">
                <AccordionTrigger className="font-headline font-bold text-lg text-left hover:text-primary transition-colors">Fazem entregas fora de Maputo?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Sim! Fazemos entregas em todo o território nacional via transportadoras parceiras. Os custos de envio variam consoante a província.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b-primary/10">
                <AccordionTrigger className="font-headline font-bold text-lg text-left hover:text-primary transition-colors">Quais as formas de pagamento aceites?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Aceitamos pagamentos via M-Pesa, E-Mola, transferência bancária (BCI, Standard Bank) e numerário no atelier.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section className="py-32 px-6 bg-primary text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image src={home.heroImage || OFFICIAL_IMAGE} alt="Pattern Napau" fill className="object-cover scale-110" />
          </div>
          <div className="max-w-3xl mx-auto space-y-10 relative z-10">
            <h2 className="text-4xl md:text-6xl font-headline font-bold leading-tight tracking-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.4)]">A sua ideia merece tornar-se arte.</h2>
            <p className="text-white/90 text-lg max-w-xl mx-auto font-light leading-relaxed">
              Fale connosco hoje para um orçamento personalizado ou inscreva-se nos nossos cursos.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button asChild className="bg-white text-primary hover:bg-white/90 rounded-full px-12 py-8 text-xl font-bold shadow-2xl transition-all hover:scale-105">
                <a href="https://wa.me/258847615871" target="_blank">Contactar WhatsApp</a>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/20 bg-white/5 backdrop-blur-sm rounded-full px-10 py-8 text-lg font-bold shadow-lg">
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
