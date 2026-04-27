
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PortfolioCard } from '@/components/PortfolioCard';
import { ContactForm } from '@/components/ContactForm';
import { PORTFOLIO_PROJECTS } from '@/lib/portfolio-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Cake, Shirt, Users, GraduationCap, MapPin, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const featuredProjects = PORTFOLIO_PROJECTS.slice(0, 3);
  const heroImage = PlaceHolderImages.find(img => img.id === 'studio-main')?.imageUrl || 'https://picsum.photos/seed/napau/1200/800';
  
  const waNumber = "258847615871";
  const waMsg = encodeURIComponent("Olá! Vim pelo site da Napau Design & Arte e gostaria de saber mais sobre os vossos serviços.");
  const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[90svh] flex items-center justify-center overflow-hidden px-4">
          <div className="absolute inset-0 z-0">
            <Image 
              src={heroImage}
              alt="Espaço Criativo Napau"
              fill
              className="object-cover opacity-20 scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 md:space-y-8 pt-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] md:text-xs font-semibold uppercase tracking-widest border border-primary/20 mx-auto">
              <Sparkles size={14} />
              Qualidade e Criatividade em cada detalhe
            </div>
            
            <h1 className="text-4xl md:text-8xl font-headline font-bold leading-tight tracking-tight">
              A Arte de <br className="hidden md:block" />
              <span className="text-primary italic">Personalizar</span> Momentos.
            </h1>
            
            <p className="text-sm md:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto leading-relaxed px-4">
              Especialistas em tipos de bolo e camisetas exclusivas em Moçambique. Atendemos revendedores e clientes que buscam excelência.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 px-4">
              <Link 
                href="/portfolio" 
                className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-full font-medium text-lg gold-shimmer shadow-lg flex items-center justify-center gap-2 group"
              >
                Ver Portfólio
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/cursos"
                className="w-full sm:w-auto px-10 py-4 bg-white border border-border text-foreground rounded-full font-medium text-lg hover:bg-secondary transition-all flex items-center justify-center gap-2"
              >
                Cursos & Formação
              </Link>
            </div>
          </div>
        </section>

        {/* What We Do - Services */}
        <section className="py-16 md:py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-[10px] font-semibold text-primary uppercase tracking-[0.3em]">O Que Fazemos</h2>
              <h3 className="text-3xl md:text-5xl font-headline font-bold">Nossas Especialidades</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="p-8 rounded-[2rem] bg-secondary/10 space-y-6 border border-border/50">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                  <Cake size={32} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-headline font-bold">Tipos de Bolo</h4>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    Personalização artística para todas as ocasiões. De aniversários a casamentos, cada detalhe conta.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-[2rem] bg-secondary/10 space-y-6 border border-border/50">
                <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                  <Shirt size={32} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-headline font-bold">Camisetas</h4>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    Alta qualidade em personalização têxtil para marcas, eventos ou uso individual.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-[2rem] bg-secondary/10 space-y-6 border border-border/50">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                  <GraduationCap size={32} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-headline font-bold">Formação</h4>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    Transmitimos o nosso "saber-fazer" através de cursos práticos e muito produtivos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Learn Section */}
        <section className="py-16 md:py-24 px-4 bg-secondary/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <h2 className="text-[10px] font-semibold text-primary uppercase tracking-[0.3em]">Educação Profissional</h2>
                <h3 className="text-3xl md:text-5xl font-headline font-bold">O Que Pode Aprender Connosco?</h3>
                <p className="text-muted-foreground text-lg font-light leading-relaxed">
                  Não apenas criamos, nós ensinamos. Os nossos cursos são desenhados para transformar amadores em profissionais da confeitaria.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-border/50">
                  <CheckCircle2 size={20} className="text-primary" />
                  <span className="text-sm font-medium">Bolos de Casamento</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-border/50">
                  <CheckCircle2 size={20} className="text-primary" />
                  <span className="text-sm font-medium">Cup-cakes & Drip-cakes</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-border/50">
                  <CheckCircle2 size={20} className="text-primary" />
                  <span className="text-sm font-medium">Bolachinhas Sortidas</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-border/50">
                  <CheckCircle2 size={20} className="text-primary" />
                  <span className="text-sm font-medium">Segredos de Decoração</span>
                </div>
              </div>

              <Button asChild className="rounded-full px-8 py-6 h-auto gold-shimmer shadow-lg">
                <Link href="/cursos">Explorar Formação Profissional</Link>
              </Button>
            </div>
            
            <div className="relative aspect-video lg:aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl order-1 lg:order-2">
              <Image 
                src="https://picsum.photos/seed/pastry-class-2/800/800"
                alt="Formação na Napau"
                fill
                className="object-cover"
                data-ai-hint="confectionery class"
              />
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-[10px] font-semibold text-primary uppercase tracking-[0.3em]">Portfólio</h2>
              <h3 className="text-3xl md:text-5xl font-headline font-bold">Criações Recentes</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProjects.map(project => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </div>
            
            <div className="text-center">
              <Link href="/portfolio" className="inline-flex items-center gap-2 text-primary font-semibold border-b-2 border-primary/20 hover:border-primary transition-all pb-1">
                Ver Galeria Completa <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="py-16 md:py-24 px-4 bg-background">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-[10px] font-semibold text-primary uppercase tracking-[0.3em]">Fale Connosco</h2>
              <h3 className="text-3xl md:text-5xl font-headline font-bold">Peça o Seu Orçamento</h3>
              <p className="text-muted-foreground font-light px-4">Estamos prontos para dar vida à sua visão criativa.</p>
            </div>
            <div className="bg-white p-6 md:p-12 rounded-[2.5rem] shadow-xl border border-border/50">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
