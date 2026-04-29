"use client";

import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { DEFAULT_HOME_CONTENT } from '@/lib/portfolio-data';

export const Footer: React.FC = () => {
  const [whatsapp, setWhatsapp] = useState(DEFAULT_HOME_CONTENT.whatsappNumber);

  useEffect(() => {
    async function fetchContact() {
      const { data } = await supabase.from('home_content').select('whatsappNumber').eq('id', 1).maybeSingle();
      if (data?.whatsappNumber) setWhatsapp(data.whatsappNumber);
    }
    fetchContact();
  }, []);

  // Formatar número para exibição amigável: +258 84 761 5871
  const formattedPhone = whatsapp?.startsWith('258') 
    ? `+258 ${whatsapp.slice(3, 5)} ${whatsapp.slice(5, 8)} ${whatsapp.slice(8)}`
    : whatsapp;

  return (
    <footer className="bg-white border-t border-border pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <Logo size={50} />
            <div>
              <h3 className="font-headline font-bold text-xl text-primary tracking-tight">NAPAU</h3>
              <p className="text-[8px] text-muted-foreground uppercase tracking-[0.3em] font-bold">Design & Arte</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-sm leading-relaxed font-light">
            Especialistas em topos de bolo e camisetas personalizadas em Moçambique. Qualidade e criatividade em cada detalhe para celebrar os seus momentos especiais.
          </p>
          <div className="flex gap-4">
            <a href="https://instagram.com/napau_design" target="_blank" className="p-2.5 rounded-full bg-secondary text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
              <Instagram size={20} />
            </a>
            <a href="https://facebook.com/napaudesign" target="_blank" className="p-2.5 rounded-full bg-secondary text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
              <Facebook size={20} />
            </a>
            <a href="mailto:napau.culinaria@gmail.com" className="p-2.5 rounded-full bg-secondary text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-headline font-semibold text-lg">Menu</h4>
          <ul className="space-y-3 text-sm text-muted-foreground font-light">
            <li><a href="/" className="hover:text-primary transition-colors">Início</a></li>
            <li><a href="/portfolio" className="hover:text-primary transition-colors">Portfólio</a></li>
            <li><a href="/cursos" className="hover:text-primary transition-colors">Cursos</a></li>
            <li><a href="/#contact" className="hover:text-primary transition-colors">Orçamento</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-headline font-semibold text-lg">Contacto</h4>
          <ul className="space-y-3 text-sm text-muted-foreground font-light">
            <li className="flex items-start gap-2">
              <MapPin size={18} className="text-primary shrink-0 mt-1" />
              <a href="https://share.google/kS0OXHSEqPLj0kDY0" target="_blank" className="hover:text-primary transition-colors">
                Av. Acordos de Lusaka, Paragem Baltazar, Maputo
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-primary shrink-0" />
              <a href={`tel:+${whatsapp}`} className="hover:text-primary transition-colors font-medium">
                {formattedPhone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-primary shrink-0" />
              <a href="mailto:napau.culinaria@gmail.com" className="hover:text-primary transition-colors">napau.culinaria@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
        <p>© {new Date().getFullYear()} Napau Design & Arte. Todos os direitos reservados.</p>
        <p className="font-medium text-primary/80 lowercase">Desenvolvido por Codworks (codworksmoz@gmail.com)</p>
      </div>
    </footer>
  );
};