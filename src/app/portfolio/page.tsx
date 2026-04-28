"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PortfolioCard } from '@/components/PortfolioCard';
import { Project } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';
import { Sparkles, Loader2, Filter } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>(['Todos']);
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

      if (data) {
        setProjects(data as Project[]);
        // Extrair categorias únicas do banco de dados
        const uniqueCategories = Array.from(new Set(data.map((p: any) => p.category))).filter(Boolean);
        setCategories(['Todos', ...uniqueCategories]);
      }
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
    <div className="flex flex-col min-h-screen bg-[#FAF7F4]">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] border border-primary/20">
              <Filter size={12} /> Galeria Exclusiva
            </div>
            <h1 className="text-4xl md:text-7xl font-headline font-bold tracking-tight drop-shadow-sm">Nosso Portfólio</h1>
            <p className="text-lg text-muted-foreground font-light leading-relaxed italic">
              Explore nossa galeria especializada em topos de bolo exclusivos e camisetas personalizadas com acabamento premium.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border",
                  activeCategory === category 
                    ? "bg-primary text-white border-primary shadow-xl scale-105" 
                    : "bg-white text-muted-foreground border-border hover:border-primary/50 hover:text-primary shadow-sm"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <Loader2 className="animate-spin text-primary" size={48} />
              <p className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest">A carregar galeria...</p>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProjects.map(project => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center space-y-6 bg-white rounded-[3rem] border-2 border-dashed border-primary/10 px-6 shadow-sm">
              <Sparkles size={48} className="mx-auto text-primary/30" />
              <div className="space-y-4">
                <p className="text-2xl font-headline font-bold text-primary">Novas criações a caminho</p>
                <p className="text-sm text-muted-foreground font-light italic max-w-md mx-auto">Estamos a preparar peças exclusivas para esta categoria. Volte em breve na Napau!</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
