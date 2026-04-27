
"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PortfolioCard } from '@/components/PortfolioCard';
import { PORTFOLIO_PROJECTS, Category } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

const CATEGORIES: Category[] = ['All', 'Branding', 'Web Design', 'Illustration', 'Packaging'];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredProjects = activeCategory === 'All' 
    ? PORTFOLIO_PROJECTS 
    : PORTFOLIO_PROJECTS.filter(p => p.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-6 text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">Our Portfolio</h1>
            <p className="text-lg text-muted-foreground font-light">
              Explore our curated selection of projects, where each creation is a unique blend of strategy and artistic expression.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                  activeCategory === category 
                    ? "bg-primary text-white border-primary shadow-md" 
                    : "bg-white text-muted-foreground border-border hover:border-primary/50"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-32 text-center space-y-4">
              <p className="text-xl text-muted-foreground font-light">No projects found in this category yet.</p>
              <button 
                onClick={() => setActiveCategory('All')}
                className="text-primary font-semibold hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
