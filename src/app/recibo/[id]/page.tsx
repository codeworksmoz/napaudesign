
"use client";

import React, { useEffect, useState } from 'react';
import { Registration } from '@/lib/portfolio-data';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Printer, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { supabase } from '@/lib/supabase';

export default function ReciboPage() {
  const params = useParams();
  const [reg, setReg] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    carregarInscricao();
    setCurrentUrl(window.location.href);
  }, [params.id]);

  async function carregarInscricao() {
    const rawId = Array.isArray(params.id) ? params.id.join('/') : params.id;
    if (!rawId) return;

    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('id', rawId)
        .single();

      if (data) setReg(data as Registration);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <Loader2 className="animate-spin text-primary" size={48} />
      <p className="mt-4 text-muted-foreground font-medium">A buscar comprovativo...</p>
    </div>
  );

  if (!reg) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-4">
      <Logo size={80} className="opacity-20" />
      <h2 className="text-2xl font-headline font-bold">Inscrição não encontrada</h2>
      <p className="text-muted-foreground">O ID fornecido não existe na nossa base de dados.</p>
      <Button asChild className="rounded-xl">
        <Link href="/cursos">Voltar aos Cursos</Link>
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary/20 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-[2.5rem] p-8 md:p-12 space-y-8 border border-primary/10 relative overflow-hidden print:shadow-none print:border-none print:p-0">
        
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
          <Logo size={200} />
        </div>

        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Logo size={60} />
            <div>
              <h1 className="text-2xl font-headline font-bold text-primary tracking-tight">NAPAU</h1>
              <p className="text-[8px] text-muted-foreground uppercase tracking-[0.3em] font-bold">Design & Arte</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">ID de Inscrição</p>
            <p className="text-xl font-headline font-bold text-primary">{reg.id}</p>
          </div>
        </div>

        <div className="border-y border-border py-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="space-y-2 flex-1">
              <h2 className="text-sm font-bold uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                <CheckCircle size={14} className="text-primary" />
                Confirmação de Inscrição
              </h2>
              <p className="text-2xl font-headline font-bold text-foreground">{reg.courseTitle}</p>
            </div>
            
            <div className="bg-white p-3 border-2 border-primary/10 rounded-2xl shadow-sm print:shadow-none">
              {currentUrl && (
                <QRCodeSVG 
                  value={currentUrl} 
                  size={120} 
                  level="H"
                />
              )}
              <p className="text-[7px] text-center mt-2 uppercase font-bold text-primary/60">Validar Online</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4">
              <div>
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Nome do Aluno</p>
                <p className="font-bold text-lg">{reg.studentName}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Documento ({reg.docType})</p>
                <p className="font-mono font-bold">{reg.docNumber}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Data de Emissão</p>
                <p className="font-semibold">{new Date(reg.registrationDate).toLocaleDateString('pt-MZ')}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Estado</p>
                <p className="font-bold text-primary uppercase text-xs">{reg.status}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-secondary/10 p-6 rounded-3xl">
          <p className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Instruções:</p>
          <ul className="text-[10px] text-muted-foreground space-y-1 mt-2 list-disc pl-4 italic">
            <li>Apresente este recibo no dia do curso.</li>
            <li>O pagamento deve ser concluído via M-Pesa/E-Mola.</li>
            <li>Contacto: +258 84 761 5871.</li>
          </ul>
        </div>

        <div className="pt-8 text-center space-y-6 print:hidden">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => window.print()} className="rounded-xl gap-2 bg-primary h-14 px-8 font-bold shadow-xl gold-shimmer">
              <Printer size={20} /> Guardar Recibo PDF
            </Button>
            <Button asChild variant="outline" className="rounded-xl gap-2 h-14 px-8 font-bold">
              <Link href="/cursos"><ArrowLeft size={20} /> Voltar</Link>
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em]">© Napau Design & Arte - Maputo</p>
        </div>
      </div>
    </div>
  );
}
