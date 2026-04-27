
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
        <section className="relative min-h-[90svh] flex items-center justify-center overflow-hidden px-4 sm:px-6">
          <div className="absolute inset-0 z-0">
            <Image 
              src={heroImage}
              alt="Espaço Criativo Napau"
              fill
              className="object-cover opacity-20 scale-105"
              priority
              data-ai-hint="creative workspace"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 md:space-y-8 pt-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 text-primary text-[10px] md:text-xs font-semibold uppercase tracking-widest border border-primary/20 mx-auto">
              <Sparkles size={14} />
              Qualidade e Criatividade em cada detalhe
            </div>
            
            <h1 className="text-3xl xs:text-5xl md:text-8xl font-headline font-bold leading-tight tracking-tight px-2">
              Transformamos Momentos em <br className="hidden md:block" />
              <span className="text-primary italic">Arte Personalizada</span>.
            </h1>
            
            <p className="text-sm md:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto leading-relaxed px-4">
              Especialistas em tipos de bolo e camisetas exclusivas em Moçambique. Atendemos revendedores e clientes individuais que buscam excelência.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 px-4 w-full sm:w-auto">
              <Link 
                href="/portfolio" 
                className="w-full sm:w-auto px-8 md:px-10 py-4 bg-primary text-white rounded-full font-medium text-base md:text-lg gold-shimmer shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                Ver Criatividade
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/cursos"
                className="w-full sm:w-auto px-8 md:px-10 py-4 bg-white border border-border text-foreground rounded-full font-medium text-base md:text-lg hover:bg-secondary transition-all flex items-center justify-center gap-2"
              >
                O que pode aprender?
              </Link>
            </div>
          </div>
        </section>

        {/* What We Do - Services */}
        <section className="py-16 md:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-[10px] md:text-sm font-semibold text-primary uppercase tracking-[0.3em]">O Que Fazemos</h2>
              <h3 className="text-2xl md:text-5xl font-headline font-bold">Nossas Especialidades</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
              <div className="p-8 rounded-[2rem] bg-secondary/10 space-y-6 border border-border/50 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                  <Cake size={32} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl md:text-2xl font-headline font-bold">Tipos de Bolo</h4>
                  <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                    Personalização artística para todas as ocasiões. De aniversários a casamentos, cada bolo é uma peça única de design.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-[2rem] bg-secondary/10 space-y-6 border border-border/50 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                  <Shirt size={32} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl md:text-2xl font-headline font-bold">Camisetas</h4>
                  <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                    Alta qualidade em personalização têxtil. Ideal para marcas, eventos ou para quem deseja expressar sua identidade única.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-[2rem] bg-secondary/10 space-y-6 border border-border/50 transition-all hover:shadow-xl hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                  <GraduationCap size={32} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl md:text-2xl font-headline font-bold">Formação</h4>
                  <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                    Transmitimos o nosso "saber-fazer". Cursos práticos de confeitaria para quem quer dominar a arte de criar bolos espetaculares.
                  </p>
                  <Link href="/cursos" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline">
                    Ver todos os cursos <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teaser for Courses */}
        <section className="py-16 md:py-24 px-4 sm:px-6 bg-secondary/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-[10px] md:text-sm font-semibold text-primary uppercase tracking-[0.3em]">Formação Profissional</h2>
                <h3 className="text-2xl md:text-5xl font-headline font-bold">O Que Pode Aprender Connosco?</h3>
                <p className="text-sm md:text-lg text-muted-foreground font-light leading-relaxed">
                  Não apenas criamos, nós ensinamos. Os nossos cursos são desenhados para transformar amadores em profissionais da confeitaria, focando em técnicas práticas e segredos do mercado.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-border/50">
                  <CheckCircle2 size={20} className="text-primary" />
                  <span className="text-sm font-medium">Bolos de Casamento</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-border/50">
                  <CheckCircle2 size={20} className="text-primary" />
                  <span className="text-sm font-medium">Técnicas de Drip-cakes</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-border/50">
                  <CheckCircle2 size={20} className="text-primary" />
                  <span className="text-sm font-medium">Decoração Temática</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-border/50">
                  <CheckCircle2 size={20} className="text-primary" />
                  <span className="text-sm font-medium">Gestão de Confeitaria</span>
                </div>
              </div>

              <Button asChild className="rounded-full px-8 py-6 h-auto gold-shimmer shadow-lg">
                <Link href="/cursos">Explorar Todos os Cursos</Link>
              </Button>
            </div>
            
            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image 
                src="https://picsum.photos/seed/learning/800/800"
                alt="Aprendendo na Napau"
                fill
                className="object-cover"
                data-ai-hint="pastry class"
              />
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-16 md:py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-[10px] md:text-sm font-semibold text-primary uppercase tracking-[0.3em]">Nossas Criações</h2>
              <h3 className="text-2xl md:text-5xl font-headline font-bold">Destaques do Portfólio</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
        <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 bg-background">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-[10px] md:text-sm font-semibold text-primary uppercase tracking-[0.3em]">Vamos Conversar</h2>
              <h3 className="text-2xl md:text-5xl font-headline font-bold">Peça um Orçamento</h3>
              <p className="text-sm md:text-lg text-muted-foreground font-light px-4">Deixe-nos dar vida ao seu projeto personalizado.</p>
            </div>
            <div className="bg-white p-6 md:p-12 rounded-[2rem] shadow-xl border border-border/50">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
