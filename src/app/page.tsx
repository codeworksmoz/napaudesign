
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PortfolioCard } from '@/components/PortfolioCard';
import { ContactForm } from '@/components/ContactForm';
import { PORTFOLIO_PROJECTS } from '@/lib/portfolio-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Cake, Shirt, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const featuredProjects = PORTFOLIO_PROJECTS.slice(0, 3);
  const heroImage = PlaceHolderImages.find(img => img.id === 'studio-main')?.imageUrl || 'https://picsum.photos/seed/napau/1200/800';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image 
              src={heroImage}
              alt="Espaço Criativo Napau"
              fill
              className="object-cover opacity-15 scale-105"
              priority
              data-ai-hint="creative workspace"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest border border-primary/20">
              <Sparkles size={14} />
              Qualidade e Criatividade em cada detalhe
            </div>
            
            <h1 className="text-5xl md:text-8xl font-headline font-bold leading-tight tracking-tight">
              Transformamos Momentos em <br />
              <span className="text-primary italic">Arte Personalizada</span>.
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto leading-relaxed">
              Especialistas em topos de bolo e camisetas exclusivas para celebrar suas histórias com elegância.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                href="/portfolio" 
                className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-full font-medium text-lg gold-shimmer shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                Ver Portfólio
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="https://wa.me/258847615871" 
                target="_blank"
                className="w-full sm:w-auto px-10 py-4 bg-white border border-border text-foreground rounded-full font-medium text-lg hover:bg-secondary transition-all flex items-center justify-center gap-2"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Services Highlight */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 rounded-3xl bg-secondary/20 space-y-4 border border-border/50">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Cake size={28} />
              </div>
              <h3 className="text-2xl font-headline font-bold">Topos de Bolo</h3>
              <p className="text-muted-foreground font-light">Designs exclusivos que dão o toque final perfeito à sua celebração.</p>
            </div>
            <div className="p-8 rounded-3xl bg-secondary/20 space-y-4 border border-border/50">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                <Shirt size={28} />
              </div>
              <h3 className="text-2xl font-headline font-bold">Camisetas</h3>
              <p className="text-muted-foreground font-light">Personalização com alta qualidade para expressar sua identidade ou marca.</p>
            </div>
            <div className="p-8 rounded-3xl bg-secondary/20 space-y-4 border border-border/50">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Users size={28} />
              </div>
              <h3 className="text-2xl font-headline font-bold">Revendedores</h3>
              <p className="text-muted-foreground font-light">Condições especiais para quem quer levar a arte da Napau para o seu próprio negócio.</p>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-sm font-semibold text-primary uppercase tracking-[0.3em]">Criações Recentes</h2>
              <h3 className="text-4xl md:text-5xl font-headline font-bold">Galeria de Destaques</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProjects.map(project => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </div>
            
            <div className="text-center">
              <Link href="/portfolio" className="inline-flex items-center gap-2 text-primary font-semibold border-b-2 border-primary/20 hover:border-primary transition-all pb-1">
                Ver Galeria Completa
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 bg-secondary/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://picsum.photos/seed/napau-about/800/1000"
                alt="Sobre Napau"
                fill
                className="object-cover"
                data-ai-hint="artistic creative"
              />
            </div>
            <div className="space-y-8">
              <h2 className="text-sm font-semibold text-primary uppercase tracking-[0.3em]">Nossa História</h2>
              <h3 className="text-4xl md:text-5xl font-headline font-bold leading-tight">Paixão por Transformar Momentos.</h3>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                A Napau Design & Arte nasceu em Moçambique com o propósito de criar memórias inesquecíveis através de produtos personalizados. Atendemos revendedores e clientes individuais com a mesma dedicação e foco na qualidade.
              </p>
              <div className="space-y-4 border-l-2 border-primary/30 pl-6 italic text-muted-foreground">
                "Cada peça é pensada com dedicação, garantindo que a sua identidade seja celebrada com criatividade."
              </div>
              <Button asChild className="rounded-full px-8 py-6 text-lg h-auto">
                <a href="https://wa.me/258847615871">Saber Mais no WhatsApp</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="py-24 px-6 bg-background">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-sm font-semibold text-primary uppercase tracking-[0.3em]">Vamos Conversar</h2>
              <h3 className="text-4xl md:text-5xl font-headline font-bold">Peça um Orçamento</h3>
              <p className="text-lg text-muted-foreground font-light">Tem uma ideia especial? Deixe-nos dar vida ao seu projeto personalizado.</p>
            </div>
            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-border/50">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
