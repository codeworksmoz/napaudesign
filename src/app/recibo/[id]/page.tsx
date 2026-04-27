
"use client";

import React, { useEffect, useState } from 'react';
import { Registration } from '@/lib/portfolio-data';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Printer, Download, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ReciboPage() {
  const params = useParams();
  const [reg, setReg] = useState<Registration | null>(null);

  useEffect(() => {
    const registrations: Registration[] = JSON.parse(localStorage.getItem('napau_registrations') || '[]');
    const found = registrations.find(r => r.id === params.id);
    if (found) setReg(found);
  }, [params.id]);

  if (!reg) return <div className="p-20 text-center">Inscrição não encontrada.</div>;

  return (
    <div className="min-h-screen bg-secondary/20 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-[2rem] p-8 md:p-12 space-y-8 border border-primary/10 relative overflow-hidden print:shadow-none print:border-none print:p-0">
        
        {/* Marca de água decorativa */}
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
          <Logo size={200} />
        </div>

        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Logo size={60} />
            <div>
              <h1 className="text-2xl font-headline font-bold text-primary tracking-tight">NAPAU</h1>
              <p className="text-[8px] text-muted-foreground uppercase tracking-[0.3em]">Design & Arte</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">ID de Inscrição</p>
            <p className="text-xl font-headline font-bold text-primary">{reg.id}</p>
          </div>
        </div>

        <div className="border-y border-border py-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase text-muted-foreground tracking-widest flex items-center gap-2">
              <CheckCircle size={14} className="text-primary" />
              Confirmação de Inscrição
            </h2>
            <p className="text-2xl font-headline font-bold">{reg.courseTitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4">
              <div>
                <p className="text-[9px] font-bold text-muted-foreground uppercase">Nome do Aluno</p>
                <p className="font-semibold">{reg.studentName}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-muted-foreground uppercase">Contacto</p>
                <p className="font-semibold">{reg.studentPhone}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-muted-foreground uppercase">Documento ({reg.docType})</p>
                <p className="font-semibold">{reg.docNumber}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[9px] font-bold text-muted-foreground uppercase">Data da Inscrição</p>
                <p className="font-semibold">{new Date(reg.registrationDate).toLocaleDateString('pt-BR')}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-muted-foreground uppercase">Estado</p>
                <p className="font-bold text-primary">{reg.status}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-secondary/10 p-6 rounded-2xl space-y-3">
          <p className="text-xs font-bold text-primary">Instruções Próximas:</p>
          <ul className="text-[10px] text-muted-foreground space-y-1 list-disc pl-4 italic">
            <li>Apresente este recibo (digital ou impresso) no local do curso.</li>
            <li>Certifique-se de que os seus documentos originais estão disponíveis para verificação.</li>
            <li>Para qualquer dúvida, contacte: +258 84 761 5871.</li>
          </ul>
        </div>

        <div className="pt-12 text-center space-y-4 print:hidden">
          <div className="flex gap-4 justify-center">
            <Button onClick={() => window.print()} className="rounded-xl gap-2 bg-primary">
              <Printer size={18} /> Imprimir Recibo
            </Button>
            <Button asChild variant="outline" className="rounded-xl gap-2">
              <Link href="/cursos"><ArrowLeft size={18} /> Voltar aos Cursos</Link>
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground">© {new Date().getFullYear()} Napau Design & Arte - Inscrição Profissional</p>
        </div>
      </div>
    </div>
  );
}
