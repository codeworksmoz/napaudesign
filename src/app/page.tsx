
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PortfolioCard } from '@/components/PortfolioCard';
import { ContactForm } from '@/components/ContactForm';
import { PORTFOLIO_PROJECTS } from '@/lib/portfolio-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Palette, Zap } from 'lucide-react';

export default function Home() {
  const featuredProjects = PORTFOLIO_PROJECTS.slice(0, 3);
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-main')?.imageUrl || 'https://picsum.photos/seed/hero/1200/800';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image 
              src={heroImage}
              alt="Napau Studio Workspace"
              fill
              className="object-cover opacity-20 scale-105"
              priority
              data-ai-hint="studio workspace"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background"></div>
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest border border-primary/20 animate-pulse">
              <Sparkles size={14} />
              Award Winning Design Studio
            </div>
            
            <h1 className="text-5xl md:text-8xl font-headline font-bold leading-tight tracking-tight">
              Where <span className="text-primary italic">Art</span> Meets <br />
              <span className="text-accent">Intentional</span> Design.
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
              We translate your vision into minimalist, elegant, and timeless visual experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                href="/portfolio" 
                className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-medium text-lg gold-shimmer shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                Explore Our Portfolio
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/#contact" 
                className="w-full sm:w-auto px-8 py-4 bg-white border border-border text-foreground rounded-full font-medium text-lg hover:bg-secondary transition-all flex items-center justify-center gap-2"
              >
                Start Your Journey
              </Link>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
            <div className="w-1 h-12 rounded-full bg-gradient-to-b from-primary to-transparent opacity-50"></div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-primary uppercase tracking-[0.3em]">Selected Portfolio</h2>
                <h3 className="text-4xl md:text-5xl font-headline font-bold">Featured Creations</h3>
              </div>
              <Link href="/portfolio" className="group flex items-center gap-2 text-primary font-semibold border-b-2 border-primary/20 hover:border-primary transition-all pb-1">
                Explore Full Portfolio
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProjects.map(project => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section id="about" className="py-24 px-6 bg-secondary/30">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square">
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>
              <Image 
                src="https://picsum.photos/seed/philosophy/800/800"
                alt="Our Philosophy"
                fill
                className="object-cover rounded-3xl shadow-2xl z-10"
                data-ai-hint="artistic design"
              />
            </div>
            
            <div className="space-y-8">
              <h2 className="text-sm font-semibold text-primary uppercase tracking-[0.3em]">Our Philosophy</h2>
              <h3 className="text-4xl md:text-5xl font-headline font-bold leading-tight">Artistic Soul, <br />Systematic Precision.</h3>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                At Napau, we believe that design is the bridge between human emotion and commercial function. We don't just create visuals; we craft experiences that breathe.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Palette size={24} />
                  </div>
                  <h4 className="font-headline font-semibold text-lg">Minimalist Aesthetic</h4>
                  <p className="text-sm text-muted-foreground font-light">Removing the unnecessary to let the essential shine through.</p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                    <Zap size={24} />
                  </div>
                  <h4 className="font-headline font-semibold text-lg">Dynamic Energy</h4>
                  <p className="text-sm text-muted-foreground font-light">Infusing every project with movement and artistic vibrancy.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform origin-top-right"></div>
          
          <div className="max-w-4xl mx-auto relative z-10 space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-sm font-semibold text-primary uppercase tracking-[0.3em]">Work With Us</h2>
              <h3 className="text-4xl md:text-5xl font-headline font-bold">Start Your Journey</h3>
              <p className="text-lg text-muted-foreground font-light">Whether it's a new brand identity or a complex digital platform, we're ready to create magic with you.</p>
            </div>
            
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-border/50">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
