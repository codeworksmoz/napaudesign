"use client";

import React from 'react';
import Image from 'next/image';
import { Project, OFFICIAL_IMAGE } from '@/lib/portfolio-data';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, Calendar, User, Hammer } from 'lucide-react';

interface PortfolioCardProps {
  project: Project;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ project }) => {
  return (
    <div className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-border/30">
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={project.imageurl || OFFICIAL_IMAGE}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 shadow-2xl">
            <ArrowUpRight size={28} />
          </div>
        </div>
        <div className="absolute top-6 left-6">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-md text-primary font-bold px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest border-none shadow-lg">
            {project.category}
          </Badge>
        </div>
      </div>
      
      <div className="p-8 space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-headline font-bold group-hover:text-primary transition-colors leading-tight">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 font-light leading-relaxed italic">
            {project.description}
          </p>
        </div>

        <div className="pt-4 border-t border-border/50 grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
              <Calendar size={12} className="text-primary" /> Ano
            </span>
            <p className="text-xs font-semibold">{project.year}</p>
          </div>
          {project.materials && (
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                <Hammer size={12} className="text-primary" /> Materiais
              </span>
              <p className="text-xs font-semibold truncate">{project.materials}</p>
            </div>
          )}
        </div>

        {project.client_name && (
          <div className="flex items-center gap-2 pt-2">
            <User size={12} className="text-primary" />
            <span className="text-[10px] font-medium text-muted-foreground">Cliente: {project.client_name}</span>
          </div>
        )}
      </div>
    </div>
  );
};
