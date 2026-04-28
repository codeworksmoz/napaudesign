
"use client";

import React from 'react';
import { Logo } from './Logo';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-border pt-12 md:pt-16 pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <Logo size={50} />
            <div>
              <h3 className="font-headline font-bold text-lg md:text-xl text-primary tracking-tight">NAPAU</h3>
              <p className="text-[8px] text-muted-foreground uppercase tracking-[0.3em] font-bold">Design & Arte</p>
            </div>
          </div>
          <p className="text-sm md:text-base text-muted-foreground max-w-sm leading-relaxed font-light">
            Especialistas em topos de bolo e camisetas personalizadas em Moçambique. Qualidade e criatividade em cada detalhe para celebrar os seus momentos especiais.
          </p>
          <div className="flex gap-3 md:gap-4">
            <a 
              href="https://instagram.com/napau_design" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-secondary text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="https://facebook.com/napaudesign" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-secondary text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="mailto:napau.culinaria@gmail.com" 
              className="p-2.5 rounded-full bg-secondary text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          <h4 className="font-headline font-semibold text-lg">Menu</h4>
          <ul className="space-y-2 md:space-y-3 text-sm text-muted-foreground font-light">
            <li><a href="/" className="hover:text-primary transition-colors">Início</a></li>
            <li><a href="/portfolio" className="hover:text-primary transition-colors">Portfólio</a></li>
            <li><a href="/cursos" className="hover:text-primary transition-colors">Cursos</a></li>
            <li><a href="/#contact" className="hover:text-primary transition-colors">Orçamento</a></li>
          </ul>
        </div>

        <div className="space-y-4 md:space-y-6">
          <h4 className="font-headline font-semibold text-lg">Contacto</h4>
          <ul className="space-y-2 md:space-y-3 text-sm text-muted-foreground font-light">
            <li className="flex items-start gap-2">
              <MapPin size={18} className="text-primary shrink-0 mt-1" />
              <a 
                href="https://share.google/kS0OXHSEqPLj0kDY0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Av. Acordos de Lusaka, Paragem Baltazar, Maputo
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-primary shrink-0" />
              <a href="tel:+258847615871" className="hover:text-primary transition-colors font-medium">+258 84 761 5871</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-primary shrink-0" />
              <a href="tel:+258867915871" className="hover:text-primary transition-colors font-medium">+258 86 791 5871</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-primary shrink-0" />
              <a href="mailto:napau.culinaria@gmail.com" className="hover:text-primary transition-colors break-all">napau.culinaria@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 md:mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-[0.2em] text-center md:text-left">
        <div className="space-y-1">
          <p>© {new Date().getFullYear()} Napau Design & Arte. Todos os direitos reservados.</p>
          <p className="font-medium text-primary/80 lowercase">Desenvolvido por Codworks (codworksmoz@gmail.com)</p>
        </div>
        <p>Criatividade e Excelência em Moçambique.</p>
      </div>
    </footer>
  );
};
