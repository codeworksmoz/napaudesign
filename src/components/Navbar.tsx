"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { DEFAULT_HOME_CONTENT } from '@/lib/portfolio-data';

const NAV_LINKS = [
  { name: 'Início', href: '/' },
  { name: 'Cursos', href: '/cursos' },
  { name: 'Portfólio', href: '/portfolio' },
  { name: 'Contacto', href: '/#contact' },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [whatsapp, setWhatsapp] = useState(DEFAULT_HOME_CONTENT.whatsappNumber);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    async function fetchContact() {
      const { data } = await supabase.from('home_content').select('whatsappNumber').eq('id', 1).maybeSingle();
      if (data?.whatsappNumber) setWhatsapp(data.whatsappNumber);
    }
    fetchContact();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-[60] transition-all duration-500 px-6 py-4",
          scrolled || isOpen ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-primary/10" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group relative z-[70]">
            <Logo size={45} className="transition-transform duration-500 group-hover:scale-110" />
            <div className="flex flex-col leading-none">
              <span className={cn(
                "font-headline font-bold text-xl tracking-tight transition-all duration-300",
                scrolled || isOpen 
                  ? "text-primary" 
                  : "text-white [text-shadow:0_4px_12px_rgba(0,0,0,0.9),0_2px_4px_rgba(0,0,0,0.8)]"
              )}>
                NAPAU
              </span>
              <span className={cn(
                "text-[8px] uppercase tracking-[0.4em] font-bold transition-all duration-300",
                scrolled || isOpen 
                  ? "text-muted-foreground" 
                  : "text-white/95 [text-shadow:0_4px_10px_rgba(0,0,0,0.9),0_2px_4px_rgba(0,0,0,0.8)]"
              )}>
                Design & Arte
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[9px] font-bold uppercase tracking-[0.3em] transition-all hover:text-primary relative group/link",
                  pathname === link.href 
                    ? "text-primary" 
                    : (scrolled 
                        ? "text-muted-foreground" 
                        : "text-white [text-shadow:0_4px_10px_rgba(0,0,0,0.9),0_2px_4px_rgba(0,0,0,0.8)] hover:text-primary/90")
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1.5 left-0 h-[1.5px] bg-primary transition-all duration-500",
                  pathname === link.href ? "w-full" : "w-0 group-hover/link:w-full"
                )}></span>
              </Link>
            ))}
            <a 
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              className="bg-primary text-white px-10 py-3.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] shadow-xl hover:shadow-primary/40 hover:scale-105 transition-all active:scale-95 gold-shimmer"
            >
              Orçamento
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            className={cn(
              "md:hidden relative z-[70] p-2.5 rounded-full transition-all duration-300",
              scrolled || isOpen 
                ? "text-primary hover:bg-primary/5" 
                : "text-white hover:bg-black/30 [filter:drop-shadow(0_2px_8px_rgba(0,0,0,0.8))]"
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-[55] bg-white flex flex-col items-center justify-center gap-10 transition-all duration-500 ease-in-out md:hidden",
          isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-3xl font-headline font-bold transition-all transform",
                isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
                pathname === link.href ? "text-primary" : "text-muted-foreground hover:text-primary"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.name}
            </Link>
          ))}
          <a 
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            onClick={() => setIsOpen(false)}
            className={cn(
              "mt-4 bg-primary text-white px-12 py-5 rounded-full text-lg font-bold shadow-xl transition-all transform gold-shimmer hover:scale-105",
              isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-90"
            )}
            style={{ transitionDelay: '400ms' }}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
};