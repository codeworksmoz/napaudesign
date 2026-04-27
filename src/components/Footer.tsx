
import React from 'react';
import { Logo } from './Logo';
import { Instagram, Linkedin, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-border pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <Logo size={60} />
            <div>
              <h3 className="font-headline font-bold text-xl text-primary tracking-tight">NAPAU</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Design & Arte</p>
            </div>
          </div>
          <p className="text-muted-foreground max-sm leading-relaxed">
            Criando narrativas visuais minimalistas e artísticas que elevam marcas. Sediados no coração da criatividade, dedicados à elegância e ao detalhe.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 rounded-full bg-secondary text-primary hover:bg-primary hover:text-white transition-all">
              <Instagram size={20} />
            </a>
            <a href="#" className="p-2 rounded-full bg-secondary text-primary hover:bg-primary hover:text-white transition-all">
              <Linkedin size={20} />
            </a>
            <a href="#" className="p-2 rounded-full bg-secondary text-primary hover:bg-primary hover:text-white transition-all">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-headline font-semibold text-lg">Links Rápidos</h4>
          <ul className="space-y-3 text-muted-foreground">
            <li><a href="/" className="hover:text-primary transition-colors">Início</a></li>
            <li><a href="/portfolio" className="hover:text-primary transition-colors">Portfólio</a></li>
            <li><a href="/#about" className="hover:text-primary transition-colors">Filosofia</a></li>
            <li><a href="/#contact" className="hover:text-primary transition-colors">Contato</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-headline font-semibold text-lg">Fale Conosco</h4>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin size={18} className="text-primary shrink-0 mt-1" />
              <span>Studio 42, Distrito Criativo<br />Lisboa, Portugal</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-primary shrink-0" />
              <span>ola@napau.design</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest">
        <p>© {new Date().getFullYear()} Napau Design & Arte. Todos os direitos reservados.</p>
        <p>Elegância em cada pixel.</p>
      </div>
    </footer>
  );
};
