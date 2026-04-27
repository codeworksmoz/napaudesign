
import React from 'react';
import { Logo } from './Logo';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-border pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <Logo size={60} />
            <div>
              <h3 className="font-headline font-bold text-xl text-primary tracking-tight">NAPAU</h3>
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em]">Design & Arte</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-sm leading-relaxed font-light">
            Especialistas em topos de bolo e camisetas personalizadas. Qualidade e criatividade em cada detalhe para celebrar seus momentos especiais.
          </p>
          <div className="flex gap-4">
            <a href="https://instagram.com/napau_design" target="_blank" className="p-2 rounded-full bg-secondary text-primary hover:bg-primary hover:text-white transition-all">
              <Instagram size={20} />
            </a>
            <a href="https://facebook.com/napaudesign" target="_blank" className="p-2 rounded-full bg-secondary text-primary hover:bg-primary hover:text-white transition-all">
              <Facebook size={20} />
            </a>
            <a href="mailto:napau.culinaria@gmail.com" className="p-2 rounded-full bg-secondary text-primary hover:bg-primary hover:text-white transition-all">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-headline font-semibold text-lg">Links</h4>
          <ul className="space-y-3 text-sm text-muted-foreground font-light">
            <li><a href="/" className="hover:text-primary transition-colors">Início</a></li>
            <li><a href="/portfolio" className="hover:text-primary transition-colors">Portfólio</a></li>
            <li><a href="/#about" className="hover:text-primary transition-colors">Sobre Nós</a></li>
            <li><a href="/#contact" className="hover:text-primary transition-colors">Orçamento</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-headline font-semibold text-lg">Contacto</h4>
          <ul className="space-y-3 text-sm text-muted-foreground font-light">
            <li className="flex items-start gap-2">
              <MapPin size={18} className="text-primary shrink-0 mt-1" />
              <span>📍 Moçambique</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-primary shrink-0" />
              <span>+258 84 761 5871</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-primary shrink-0" />
              <span>napau.culinaria@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
        <p>© {new Date().getFullYear()} Napau Design & Arte. Todos os direitos reservados.</p>
        <p>Desenvolvido com carinho em Moçambique.</p>
      </div>
    </footer>
  );
};
