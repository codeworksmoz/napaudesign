
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu ao mudar de rota ou redimensionar
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-[60] transition-all duration-500 px-6 py-4",
          scrolled || isOpen ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group relative z-[70]">
            <Logo size={45} className="transition-transform duration-300 group-hover:scale-110" />
            <div className="flex flex-col leading-none">
              <span className="text-primary font-headline font-bold text-lg tracking-tight hidden sm:block">
                NAPAU
              </span>
              <span className="text-[8px] text-muted-foreground uppercase tracking-[0.3em] hidden sm:block">
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
                  "text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
            <a 
              href="https://wa.me/258847615871"
              target="_blank"
              className="bg-primary text-white px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest gold-shimmer transition-all shadow-lg hover:shadow-primary/20"
            >
              Orçamento
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            className="md:hidden text-primary relative z-[70] p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-[55] bg-background/98 flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-in-out md:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-3xl font-headline font-bold transition-all transform",
                isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                pathname === link.href ? "text-primary scale-110" : "text-muted-foreground hover:text-primary"
              )}
              style={{ transitionDelay: `${NAV_LINKS.indexOf(link) * 100}ms` }}
            >
              {link.name}
            </Link>
          ))}
          <a 
            href="https://wa.me/258847615871"
            target="_blank"
            onClick={() => setIsOpen(false)}
            className="mt-8 bg-primary text-white px-12 py-5 rounded-2xl text-lg font-bold shadow-2xl gold-shimmer"
          >
            WhatsApp
          </a>
        </div>
        
        <div className="absolute bottom-12 text-[10px] text-muted-foreground uppercase tracking-[0.4em]">
          Napau Design & Arte
        </div>
      </div>
    </>
  );
};
