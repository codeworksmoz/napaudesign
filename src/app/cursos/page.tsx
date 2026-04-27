"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import { CheckCircle2, Calendar, Wallet, GraduationCap, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Flyer } from '@/lib/portfolio-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { RegistrationForm } from '@/components/RegistrationForm';
import { supabase } from '@/lib/supabase';

export default function CursosPage() {
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const [carregando, setCarregando] = useState(true);

  // ✅ Carregar flyers do Supabase
  useEffect(() => {
    carregarFlyers();
  }, []);

  async function carregarFlyers() {
    setCarregando(true);
    try {
      const { data, error } = await supabase
        .from('flyers')
        .select('*')
        .eq('ativo', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao carregar flyers:', error.message);
        setFlyers([]);
      } else if (data) {
        setFlyers(data as Flyer[]);
      }
    } catch (erro) {
      console.error('Erro inesperado:', erro);
      setFlyers([]);
    } finally {
      setCarregando(false);
    }
  }

  // ✅ Função chamada após inscrição bem-sucedida
  const handleInscricaoSucesso = (reg: any) => {
    console.log('✅ Inscrição realizada:', reg.id);
    // Opcional: atualizar contagem de inscritos, etc.
  };

  // Estado de carregamento
  if (carregando) {
    return (
      <div className="flex flex-col min-h-screen bg-secondary/5">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto animate-pulse">
              <GraduationCap size={40} className="text-primary/40" />
            </div>
            <Loader2 className="animate-spin mx-auto text-primary" size={32} />
            <p className="text-muted-foreground text-sm uppercase tracking-widest font-medium">
              A carregar cursos...
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const activeFlyers = flyers.filter(f => f.ativo);

  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* CABEÇALHO */}
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
              <GraduationCap size={16} />
              Educação Napau
            </div>
            <h1 className="text-4xl md:text-7xl font-headline font-bold">Cursos & Formação</h1>
            <p className="text-lg text-muted-foreground font-light leading-relaxed italic">
              Aprenda as técnicas mais modernas da confeitaria profissional com quem entende do assunto.
            </p>
          </div>

          {/* LISTA DE FLYERS */}
          <div className="space-y-24">
            {activeFlyers.length > 0 ? activeFlyers.map((flyer) => (
              <div 
                key={flyer.id} 
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-primary/10 grid grid-cols-1 lg:grid-cols-2"
              >
                {/* Imagem do Flyer */}
                <div className="relative aspect-square lg:aspect-auto h-full min-h-[400px] bg-secondary/10">
                  {flyer.imageUrl ? (
                    <Image 
                      src={flyer.imageUrl}
                      alt={flyer.titulo}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <GraduationCap size={64} className="text-muted-foreground/20" />
                    </div>
                  )}
                </div>

                {/* Conteúdo do Flyer */}
                <div className="p-8 md:p-16 space-y-10">
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-4xl font-headline font-bold text-primary">
                      {flyer.titulo}
                    </h3>
                    <p className="text-lg font-headline font-semibold">
                      Aprenda a fazer:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                      <div className="space-y-3">
                        {flyer.listaEsquerda?.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-xs text-muted-foreground">
                            <CheckCircle2 size={16} className="text-primary shrink-0" />
                            <span className="font-bold">{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3">
                        {flyer.listaDireita?.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-xs text-muted-foreground">
                            <CheckCircle2 size={16} className="text-primary shrink-0" />
                            <span className="font-bold">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Informações: Preço e Data */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-y border-border">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Wallet size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                          Investimento
                        </p>
                        <p className="text-2xl font-headline font-bold text-primary">
                          {flyer.preco || 'Sob consulta'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                          Próxima Turma
                        </p>
                        <p className="text-2xl font-headline font-bold">
                          {flyer.data || 'A anunciar'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Informações adicionais */}
                  {flyer.local && (
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="font-bold uppercase text-[10px] tracking-widest">Local:</span>
                      <span>{flyer.local}</span>
                    </div>
                  )}
                  
                  {flyer.contactos && (
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="font-bold uppercase text-[10px] tracking-widest">Contactos:</span>
                      <span>{flyer.contactos}</span>
                    </div>
                  )}

                  {/* Botão de Inscrição */}
                  <div className="space-y-6">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full py-8 rounded-2xl text-lg font-bold gold-shimmer shadow-xl">
                          <span className="flex items-center justify-center gap-3">
                            Reservar Minha Vaga
                            <ArrowRight size={20} />
                          </span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] rounded-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-headline text-primary">
                            Inscrição no Curso
                          </DialogTitle>
                          <DialogDescription>
                            Preencha os seus dados para gerar o seu número de inscrição (ID). 
                            O preenchimento é guardado automaticamente se precisar de recarregar a página.
                          </DialogDescription>
                        </DialogHeader>
                        <RegistrationForm 
                          course={flyer} 
                          onSuccess={handleInscricaoSucesso} 
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            )) : (
              /* Estado vazio */
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-primary/20">
                <GraduationCap size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground text-lg">
                  De momento não temos turmas abertas.
                </p>
                <p className="text-muted-foreground/60 text-sm mt-2">
                  Fique atento às novidades ou entre em contacto connosco!
                </p>
                <Button asChild variant="link" className="mt-4">
                  <a 
                    href="https://wa.me/258847615871?text=Olá! Gostaria de saber mais sobre os próximos cursos da Napau."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Falar no WhatsApp <ArrowRight size={16} className="ml-2" />
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
