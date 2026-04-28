"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PortfolioCard } from '@/components/PortfolioCard';
import { Category, Project } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';
import { Sparkles, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const CATEGORIES: { label: string, value: Category }[] = [
  { label: 'Todos', value: 'Todos' },
  { label: 'Topos de Bolo', value: 'Topos de Bolo' },
  { label: 'Camisetas', value: 'Camisetas' },
  { label: 'Design Personalizado', value: 'Design Personalizado' },
  { label: 'Kits Revenda', value: 'Kits Revenda' }
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarProjetos();
  }, []);

  async function carregarProjetos() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (data) setProjects(data as Project[]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredProjects = activeCategory === 'Todos' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-10 md:space-y-16">
          <div className="space-y-4 md:space-y-6 text-center max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-6xl font-headline font-bold tracking-tight">Nosso Portfólio</h1>
            <p className="text-sm md:text-lg text-muted-foreground font-light font-body">
              Explore nossa galeria de topos de bolo exclusivos e camisetas personalizadas. Cada peça é um reflexo único de criatividade.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {CATEGORIES.map(category => (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={cn(
                  "px-4 py-2 md:px-6 md:py-2 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-widest transition-all duration-300 border",
                  activeCategory === category.value 
                    ? "bg-primary text-white border-primary shadow-md" 
                    : "bg-white text-muted-foreground border-border hover:border-primary/50"
                )}
              >
                {category.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={48} />
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProjects.map(project => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="py-20 md:py-32 text-center space-y-6 bg-secondary/10 rounded-[2rem] border-2 border-dashed border-border/50 px-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                <Sparkles size={32} />
              </div>
              <div className="space-y-2">
                <p className="text-lg md:text-xl text-muted-foreground font-light">Estamos a preparar novidades incríveis para esta categoria.</p>
                <p className="text-xs md:text-sm text-muted-foreground/60 uppercase tracking-widest">Em breve na Napau Design & Arte!</p>
              </div>
              <button 
                onClick={() => setActiveCategory('Todos')}
                className="text-primary font-semibold hover:underline text-sm uppercase tracking-widest"
              >
                Ver Outras Criações
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
