
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
  { name: 'Contato', href: '/#contact' },
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
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo size={50} className="transition-transform duration-300 group-hover:scale-110" />
          <span className="text-primary font-headline font-semibold text-xl tracking-tight hidden sm:block">
            NAPAU
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/#contact"
            className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-medium gold-shimmer transition-all shadow-md hover:shadow-lg"
          >
            Trabalhe Conosco
          </Link>
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
          "md:hidden fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 ease-in-out",
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
              "text-2xl font-headline transition-colors hover:text-primary",
              pathname === link.href ? "text-primary" : "text-muted-foreground"
            )}
          >
            {link.name}
          </Link>
        ))}
        <Link 
          href="/#contact"
          onClick={() => setIsOpen(false)}
          className="mt-4 bg-primary text-primary-foreground px-8 py-3 rounded-full text-lg font-medium shadow-lg"
        >
          Trabalhe Conosco
        </Link>
      </div>
    </nav>
  );
};
