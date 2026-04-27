
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Início', href: '/' },
  { name: 'Portfólio', href: '/portfolio' },
  { name: 'Sobre', href: '/#about' },
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

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo size={50} className="transition-transform duration-300 group-hover:scale-110" />
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
                "text-xs font-medium uppercase tracking-widest transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
          <a 
            href="https://wa.me/258847615871"
            target="_blank"
            className="bg-primary text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest gold-shimmer transition-all shadow-md hover:shadow-lg"
          >
            Orçamento
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          className="md:hidden text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button 
          className="absolute top-6 right-6 text-primary"
          onClick={() => setIsOpen(false)}
        >
          <X size={32} />
        </button>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className={cn(
              "text-3xl font-headline transition-colors hover:text-primary",
              pathname === link.href ? "text-primary" : "text-muted-foreground"
            )}
          >
            {link.name}
          </Link>
        ))}
        <a 
          href="https://wa.me/258847615871"
          target="_blank"
          onClick={() => setIsOpen(false)}
          className="mt-4 bg-primary text-white px-10 py-4 rounded-full text-lg font-headline shadow-lg"
        >
          WhatsApp
        </a>
      </div>
    </nav>
  );
};
