
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

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-[60] transition-all duration-500 px-6 py-5",
          scrolled || isOpen ? "bg-background/95 backdrop-blur-xl shadow-lg border-b border-primary/5" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group relative z-[70]">
            <Logo size={50} className="transition-transform duration-500 group-hover:scale-110" />
            <div className="flex flex-col leading-none">
              <span className="text-primary font-headline font-bold text-xl tracking-tight hidden sm:block">
                NAPAU
              </span>
              <span className="text-[8px] text-muted-foreground uppercase tracking-[0.4em] hidden sm:block font-bold">
                Design & Arte
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.25em] transition-all hover:text-primary relative group/link",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300",
                  pathname === link.href ? "w-full" : "w-0 group-hover/link:w-full"
                )}></span>
              </Link>
            ))}
            <a 
              href="https://wa.me/258847615871"
              target="_blank"
              className="bg-primary text-white px-8 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] gold-shimmer transition-all shadow-xl hover:shadow-primary/30 hover:-translate-y-1"
            >
              Orçamento
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            className="md:hidden text-primary relative z-[70] p-2 hover:bg-primary/10 rounded-full transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={36} /> : <Menu size={36} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-[55] bg-background flex flex-col items-center justify-center gap-12 transition-all duration-700 ease-in-out md:hidden",
          isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center gap-10">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-4xl font-headline font-bold transition-all transform",
                isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
                pathname === link.href ? "text-primary scale-110" : "text-muted-foreground hover:text-primary"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.name}
            </Link>
          ))}
          <a 
            href="https://wa.me/258847615871"
            target="_blank"
            onClick={() => setIsOpen(false)}
            className={cn(
              "mt-8 bg-primary text-white px-14 py-6 rounded-3xl text-xl font-bold shadow-2xl gold-shimmer transition-all transform",
              isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-90"
            )}
            style={{ transitionDelay: '400ms' }}
          >
            Falar no WhatsApp
          </a>
        </div>
        
        <div className="absolute bottom-16 text-[10px] text-muted-foreground uppercase tracking-[0.5em] font-bold opacity-50">
          Napau Design & Arte
        </div>
      </div>
    </>
  );
};
