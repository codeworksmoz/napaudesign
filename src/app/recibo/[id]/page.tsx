
"use client";

import React, { useEffect, useState } from 'react';
import { Registration } from '@/lib/portfolio-data';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Printer, Download, CheckCircle, ArrowLeft, DownloadCloud } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';

export default function ReciboPage() {
  const params = useParams();
  const [reg, setReg] = useState<Registration | null>(null);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    // Pegar o ID da URL. O useParams pode retornar o ID como string ou array dependendo da rota.
    const id = Array.isArray(params.id) ? params.id.join('/') : params.id;
    
    const registrations: Registration[] = JSON.parse(localStorage.getItem('napau_registrations') || '[]');
    const found = registrations.find(r => r.id === id);
    if (found) setReg(found);
    
    // Pegar URL para o QR Code
    setCurrentUrl(window.location.href);
  }, [params.id]);

  if (!reg) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-4">
      <Logo size={80} className="opacity-20 animate-pulse" />
      <h2 className="text-2xl font-headline font-bold">Inscrição não encontrada</h2>
      <p className="text-muted-foreground">Verifique se o ID está correto ou se a inscrição foi concluída.</p>
      <Button asChild className="rounded-xl">
        <Link href="/cursos">Voltar aos Cursos</Link>
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary/20 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-[2.5rem] p-8 md:p-12 space-y-8 border border-primary/10 relative overflow-hidden print:shadow-none print:border-none print:p-0">
        
        {/* Marca de água decorativa */}
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
            <p className="text-xl font-headline font-bold text-primary">{reg.id.replace('-', '/')}</p>
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
            
            {/* QR Code de Validação */}
            <div className="bg-white p-3 border-2 border-primary/10 rounded-2xl shadow-sm print:shadow-none">
              {currentUrl && (
                <QRCodeSVG 
                  value={currentUrl} 
                  size={120} 
                  level="H"
                  includeMargin={false}
                />
              )}
              <p className="text-[7px] text-center mt-2 uppercase font-bold text-primary/60 tracking-tighter">Validar Documento Online</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4">
              <div>
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Nome do Aluno</p>
                <p className="font-bold text-lg">{reg.studentName}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Contacto Móvel</p>
                <p className="font-semibold">{reg.studentPhone}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Documento ({reg.docType})</p>
                <p className="font-mono font-bold">{reg.docNumber}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Data de Emissão</p>
                <p className="font-semibold">{new Date(reg.registrationDate).toLocaleDateString('pt-BR')}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Estado da Vaga</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <p className="font-bold text-primary uppercase text-xs">{reg.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-secondary/10 p-8 rounded-3xl flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1 space-y-3">
            <p className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Instruções de Pagamento:</p>
            <ul className="text-[10px] text-muted-foreground space-y-2 list-disc pl-4 italic leading-relaxed">
              <li>Apresente este recibo (digital ou impresso) no dia do curso para validação.</li>
              <li>O pagamento deve ser concluído conforme as instruções enviadas para o contacto fornecido.</li>
              <li>Para assistência imediata, contacte a Napau: <strong>+258 84 761 5871</strong>.</li>
            </ul>
          </div>
          <div className="text-center md:text-right text-[8px] text-muted-foreground/60 max-w-[150px] uppercase font-bold tracking-widest">
            Documento gerado digitalmente pela plataforma Napau Design & Arte.
          </div>
        </div>

        <div className="pt-12 text-center space-y-6 print:hidden">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => window.print()} className="rounded-xl gap-2 bg-primary h-14 px-8 font-bold shadow-xl gold-shimmer">
              <Printer size={20} /> Imprimir / Guardar PDF
            </Button>
            <Button asChild variant="outline" className="rounded-xl gap-2 h-14 px-8 font-bold border-primary/20">
              <Link href="/cursos"><ArrowLeft size={20} /> Voltar aos Cursos</Link>
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em]">© {new Date().getFullYear()} Napau Design & Arte - Maputo</p>
        </div>
      </div>
    </div>
  );
}
