
"use client";

import React from 'react';
import Image from 'next/image';
import { Project } from '@/lib/portfolio-data';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, Calendar } from 'lucide-react';

interface PortfolioCardProps {
  project: Project;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ project }) => {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-border/30">
      <div className="aspect-[4/3] relative overflow-hidden">
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-secondary/20 flex items-center justify-center text-muted-foreground">Sem imagem</div>
        )}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-primary transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
            <ArrowUpRight size={24} />
          </div>
        </div>
      </div>
      <div className="p-8 space-y-4">
        <div className="flex justify-between items-start">
          <Badge variant="secondary" className="font-bold px-4 py-1.5 rounded-full text-[10px] uppercase tracking-wider bg-primary/10 text-primary border-none">
            {project.category}
          </Badge>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold uppercase">
            <Calendar size={12} />
            {project.year}
          </div>
        </div>
        <h3 className="text-xl font-headline font-bold group-hover:text-primary transition-colors">{project.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 font-light leading-relaxed">{project.description}</p>
      </div>
    </div>
  );
};
