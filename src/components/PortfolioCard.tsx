
"use client";

import React from 'react';
import Image from 'next/image';
import { Project } from '@/lib/portfolio-data';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';

interface PortfolioCardProps {
  project: Project;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ project }) => {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border/50">
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          data-ai-hint="portfolio design"
        />
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <ArrowUpRight size={24} />
          </div>
        </div>
      </div>
      <div className="p-6 space-y-3">
        <div className="flex justify-between items-start">
          <Badge variant="secondary" className="font-medium px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">
            {project.category}
          </Badge>
          <span className="text-xs text-muted-foreground font-medium">{project.year}</span>
        </div>
        <div>
          <h3 className="text-xl font-headline font-semibold group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1 font-light leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
};
