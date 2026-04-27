
"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PortfolioCard } from '@/components/PortfolioCard';
import { PORTFOLIO_PROJECTS, Category } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

const CATEGORIES: { label: string, value: Category }[] = [
  { label: 'Todos', value: 'Todos' },
  { label: 'Tipos de Bolo', value: 'Tipos de Bolo' },
  { label: 'Camisetas', value: 'Camisetas' },
  { label: 'Design Personalizado', value: 'Design Personalizado' },
  { label: 'Kits Revenda', value: 'Kits Revenda' }
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');

  const filteredProjects = activeCategory === 'Todos' 
    ? PORTFOLIO_PROJECTS 
    : PORTFOLIO_PROJECTS.filter(p => p.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
          <div className="space-y-4 md:space-y-6 text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">Nosso Portfólio</h1>
            <p className="text-base md:text-lg text-muted-foreground font-light font-body">
              Explore nossa galeria de tipos de bolo e camisetas personalizadas. Cada peça é um reflexo único de criatividade e atenção aos detalhes em Moçambique.
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map(project => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-24 md:py-32 text-center space-y-4">
              <p className="text-lg md:text-xl text-muted-foreground font-light">Nenhum projeto encontrado nesta categoria ainda.</p>
              <button 
                onClick={() => setActiveCategory('Todos')}
                className="text-primary font-semibold hover:underline"
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
