
"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Logo } from '@/components/Logo';

interface AdminLoginFormProps {
  email: string;
  setEmail: (val: string) => void;
  pass: string;
  setPass: (val: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function AdminLoginForm({ email, setEmail, pass, setPass, loading, onSubmit }: AdminLoginFormProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] p-4">
      <Card className="w-full max-w-md border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
        <div className="bg-primary p-10 flex flex-col items-center gap-4 text-white">
          <Logo size={80} className="brightness-0 invert opacity-80" />
          <h1 className="text-2xl font-headline font-bold">Consola Napau</h1>
          <p className="text-[10px] uppercase font-bold tracking-widest opacity-80">Gestão Design & Arte</p>
        </div>
        <CardContent className="p-10 space-y-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-muted-foreground ml-1">E-mail Administrativo</label>
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="exemplo@napau.com" 
                className="h-14 rounded-2xl" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-muted-foreground ml-1">Palavra-passe</label>
              <Input 
                type="password" 
                value={pass} 
                onChange={(e) => setPass(e.target.value)} 
                required 
                placeholder="••••••••" 
                className="h-14 rounded-2xl" 
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-14 rounded-2xl text-lg font-bold gold-shimmer mt-4">
              {loading ? <Loader2 className="animate-spin" /> : 'Entrar no Sistema'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
