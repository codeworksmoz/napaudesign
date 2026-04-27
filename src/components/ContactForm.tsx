
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Mensagem Enviada",
        description: "Recebemos sua mensagem e entraremos em contato em breve.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest px-1">Nome Completo</label>
          <Input 
            required 
            placeholder="Seu nome" 
            className="bg-white/50 border-border focus:ring-primary focus:border-primary rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest px-1">E-mail</label>
          <Input 
            required 
            type="email" 
            placeholder="seu@email.com" 
            className="bg-white/50 border-border focus:ring-primary focus:border-primary rounded-xl"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest px-1">Assunto</label>
        <Input 
          required 
          placeholder="Novo projeto de branding" 
          className="bg-white/50 border-border focus:ring-primary focus:border-primary rounded-xl"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest px-1">Mensagem</label>
        <Textarea 
          required 
          placeholder="Conte-nos sobre sua visão..." 
          rows={5}
          className="bg-white/50 border-border focus:ring-primary focus:border-primary rounded-xl resize-none"
        />
      </div>
      <Button 
        type="submit" 
        disabled={loading}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-xl font-semibold text-lg gold-shimmer shadow-lg flex gap-2 items-center justify-center group"
      >
        {loading ? "Enviando..." : (
          <>
            Enviar Mensagem 
            <Send size={18} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </Button>
    </form>
  );
};
