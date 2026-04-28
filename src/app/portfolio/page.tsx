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
  { label: 'Camisetas', value: 'Camisetas' }
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
      console.error('Erro ao buscar projetos:', error);
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
      
      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-6 text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-7xl font-headline font-bold tracking-tight">Nosso Portfólio</h1>
            <p className="text-lg text-muted-foreground font-light">
              Explore nossa galeria especializada em topos de bolo exclusivos e camisetas personalizadas.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map(category => (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={cn(
                  "px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border",
                  activeCategory === category.value 
                    ? "bg-primary text-white border-primary shadow-lg" 
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map(project => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center space-y-6 bg-secondary/5 rounded-[3rem] border-2 border-dashed border-primary/10 px-6">
              <Sparkles size={48} className="mx-auto text-primary/30" />
              <div className="space-y-2">
                <p className="text-xl text-muted-foreground font-light">Estamos a preparar novas criações para esta categoria.</p>
                <p className="text-xs text-muted-foreground/60 uppercase tracking-widest font-bold">Em breve na Napau!</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
