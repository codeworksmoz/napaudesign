
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
  
  // Mensagem padrão do WhatsApp
  const waNumber = "258847615871";
  const waMsg = encodeURIComponent("Olá! Vim pelo site da Napau Design & Arte e gostaria de saber mais sobre os vossos serviços e cursos.");
  const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-4 sm:px-6">
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
              Especialistas em tipos de bolo e camisetas exclusivas para celebrar suas histórias com elegância em Moçambique.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 px-4 w-full sm:w-auto">
              <Link 
                href="/portfolio" 
                className="w-full sm:w-auto px-8 md:px-10 py-4 bg-primary text-white rounded-full font-medium text-base md:text-lg gold-shimmer shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                Ver Portfólio
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href={waUrl}
                target="_blank"
                className="w-full sm:w-auto px-8 md:px-10 py-4 bg-white border border-border text-foreground rounded-full font-medium text-base md:text-lg hover:bg-secondary transition-all flex items-center justify-center gap-2"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Course Section (based on flyer) */}
        <section id="cursos" className="py-16 md:py-24 px-4 sm:px-6 bg-secondary/5">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-primary/10 grid grid-cols-1 lg:grid-cols-2">
              <div className="relative aspect-square lg:aspect-auto bg-primary/20">
                <Image 
                  src="https://picsum.photos/seed/confeitaria/800/1000"
                  alt="Curso de Confeitaria Napau"
                  fill
                  className="object-cover"
                  data-ai-hint="pastry course"
                />
                <div className="absolute top-8 left-8 bg-white/90 backdrop-blur px-6 py-3 rounded-2xl shadow-lg border border-primary/20">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-primary">Próxima Turma</p>
                  <p className="text-2xl font-headline font-bold">14 DE DEZEMBRO</p>
                </div>
              </div>
              
              <div className="p-8 md:p-16 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-sm font-semibold text-primary uppercase tracking-[0.3em]">Educação & Arte</h2>
                  <h3 className="text-3xl md:text-5xl font-headline font-bold">Curso de Confeitaria</h3>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    Aulas práticas e muito produtivas com todos os segredos que você precisa para fazer um bolo espetacular. Aprenda a transformar a sua paixão num negócio rentável.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  {[
                    "Bolo de Aniversário com Foto", "Bolo de Casamento", 
                    "Bolo Gelado", "Bolo Temático", 
                    "Bolachinhas Sortidas", "Cup-cakes Personalizados", 
                    "Drip-cakes", "Floresta Negra", 
                    "Orelhudos de Custarde", "Sobremesas"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 size={16} className="text-primary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">Investimento</p>
                    <p className="text-3xl font-headline font-bold text-primary">4.500 MT</p>
                  </div>
                  <Button asChild className="rounded-full px-8 py-6 h-auto gold-shimmer shadow-lg">
                    <a href={waUrl}>Reservar Vaga</a>
                  </Button>
                </div>

                <div className="flex items-start gap-3 text-xs text-muted-foreground pt-4">
                  <MapPin size={16} className="text-primary shrink-0" />
                  <span>Av. Acordos de Lusaka, Paragem Baltazar, Moçambique</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Highlight */}
        <section className="py-12 md:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
            <div className="p-6 md:p-8 rounded-3xl bg-secondary/20 space-y-4 border border-border/50 transition-transform hover:scale-[1.02]">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Cake size={28} />
              </div>
              <h3 className="text-xl md:text-2xl font-headline font-bold">Tipos de Bolo</h3>
              <p className="text-sm md:text-base text-muted-foreground font-light">Designs exclusivos que dão o toque final perfeito à sua celebração com personalização artística.</p>
            </div>
            <div className="p-6 md:p-8 rounded-3xl bg-secondary/20 space-y-4 border border-border/50 transition-transform hover:scale-[1.02]">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                <Shirt size={28} />
              </div>
              <h3 className="text-xl md:text-2xl font-headline font-bold">Camisetas</h3>
              <p className="text-sm md:text-base text-muted-foreground font-light">Personalização de alta qualidade para expressar sua identidade, marca ou eventos especiais.</p>
            </div>
            <div className="p-6 md:p-8 rounded-3xl bg-secondary/20 space-y-4 border border-border/50 transition-transform hover:scale-[1.02] sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-xl md:text-2xl font-headline font-bold">Formação</h3>
              <p className="text-sm md:text-base text-muted-foreground font-light">Cursos profissionais de confeitaria para quem deseja dominar a arte de criar bolos espetaculares.</p>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-12 md:py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto space-y-8 md:space-y-16">
            <div className="text-center space-y-2 md:space-y-4">
              <h2 className="text-[10px] md:text-sm font-semibold text-primary uppercase tracking-[0.3em]">Criações Recentes</h2>
              <h3 className="text-2xl md:text-5xl font-headline font-bold">Galeria de Destaques</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredProjects.map(project => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </div>
            
            <div className="text-center pt-4">
              <Link href="/portfolio" className="inline-flex items-center gap-2 text-primary font-semibold border-b-2 border-primary/20 hover:border-primary transition-all pb-1 text-xs md:text-base">
                Ver Galeria Completa
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 md:py-24 px-4 sm:px-6 bg-secondary/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl order-2 lg:order-1">
              <Image 
                src="https://picsum.photos/seed/napau-about/800/1000"
                alt="Sobre Napau"
                fill
                className="object-cover"
                data-ai-hint="artistic creative"
              />
            </div>
            <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
              <h2 className="text-[10px] md:text-sm font-semibold text-primary uppercase tracking-[0.3em]">Nossa História</h2>
              <h3 className="text-2xl md:text-5xl font-headline font-bold leading-tight">Paixão por Transformar Momentos.</h3>
              <p className="text-sm md:text-lg text-muted-foreground font-light leading-relaxed">
                A Napau Design & Arte nasceu em Moçambique com o propósito de criar memórias inesquecíveis através de produtos personalizados. Atendemos revendedores e clientes individuais com a mesma dedicação e foco na qualidade.
              </p>
              <div className="space-y-4 border-l-2 border-primary/30 pl-4 md:pl-6 italic text-muted-foreground text-xs md:text-base">
                "Cada peça é pensada com dedicação, garantindo que a sua identidade seja celebrada com criatividade e excelência."
              </div>
              <Button asChild className="rounded-full px-6 md:px-8 py-4 md:py-6 text-sm md:text-lg h-auto w-full sm:w-auto">
                <a href={waUrl}>Saber Mais no WhatsApp</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="py-12 md:py-24 px-4 sm:px-6 bg-background">
          <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
            <div className="text-center space-y-2 md:space-y-4">
              <h2 className="text-[10px] md:text-sm font-semibold text-primary uppercase tracking-[0.3em]">Vamos Conversar</h2>
              <h3 className="text-2xl md:text-5xl font-headline font-bold">Peça um Orçamento</h3>
              <p className="text-sm md:text-lg text-muted-foreground font-light px-4">Tem uma ideia especial? Deixe-nos dar vida ao seu projeto personalizado.</p>
            </div>
            <div className="bg-white p-6 md:p-12 rounded-[1.5rem] md:rounded-[2rem] shadow-xl border border-border/50">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
