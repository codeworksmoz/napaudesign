"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Flyer, Registration, DocumentType } from '@/lib/portfolio-data';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FileText, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface RegistrationFormProps {
  course: Flyer;
  onSuccess?: (reg: Registration) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ course, onSuccess }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Registration>>({
    studentName: '',
    studentEmail: '',
    studentPhone: '',
    docType: 'BI',
    docNumber: '',
    docIssueDate: '',
    docExpiryDate: '',
    docIssuePlace: '',
  });

  // ✅ Persistência local do rascunho (mantida para não perder dados ao recarregar)
  useEffect(() => {
    const savedDraft = localStorage.getItem(`draft_reg_${course.id}`);
    if (savedDraft) {
      try {
        setFormData(JSON.parse(savedDraft));
      } catch {
        localStorage.removeItem(`draft_reg_${course.id}`);
      }
    }
  }, [course.id]);

  useEffect(() => {
    localStorage.setItem(`draft_reg_${course.id}`, JSON.stringify(formData));
  }, [formData, course.id]);

  const handleChange = (field: keyof Registration, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  /**
   * Gera ID único da inscrição
   * Formato: NP20260427-1 (NP + ano mês dia + contador do dia)
   */
  const generateId = async (): Promise<string> => {
    const now = new Date();
    const dateStr = now.getFullYear().toString() + 
                    (now.getMonth() + 1).toString().padStart(2, '0') + 
                    now.getDate().toString().padStart(2, '0');
    
    // ✅ Contar inscrições de hoje via Supabase
    const hoje = now.toISOString().slice(0, 10);
    const { count, error } = await supabase
      .from('registrations')
      .select('*', { count: 'exact', head: true })
      .gte('registrationDate', `${hoje}T00:00:00`)
      .lte('registrationDate', `${hoje}T23:59:59`);

    const todayCount = (count ?? 0) + 1;
    return `NP${dateStr}-${todayCount}`;
  };

  /**
   * ✅ Submeter inscrição para o Supabase
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const generatedId = await generateId();
      
      const newReg: Registration = {
        ...(formData as Registration),
        id: generatedId,
        courseId: course.id,
        courseTitle: course.titulo,
        registrationDate: new Date().toISOString(),
        status: 'Pendente'
      };

      // ✅ Inserir no Supabase
      const { error } = await supabase
        .from('registrations')
        .insert({
          id: newReg.id,
          courseId: newReg.courseId,
          courseTitle: newReg.courseTitle,
          studentName: newReg.studentName,
          studentEmail: newReg.studentEmail,
          studentPhone: newReg.studentPhone,
          docType: newReg.docType,
          docNumber: newReg.docNumber,
          docIssueDate: newReg.docIssueDate || null,
          docExpiryDate: newReg.docExpiryDate || null,
          docIssuePlace: newReg.docIssuePlace || null,
          registrationDate: newReg.registrationDate,
          status: newReg.status,
        });

      if (error) {
        console.error('Erro ao guardar inscrição:', error.message);
        toast({
          title: "Erro",
          description: "Não foi possível completar a inscrição. Tente novamente.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Limpar rascunho local
      localStorage.removeItem(`draft_reg_${course.id}`);
      
      toast({
        title: "🎉 Inscrição Realizada!",
        description: `O seu ID é ${newReg.id}. Guarde este número para referência.`,
      });

      if (onSuccess) onSuccess(newReg);
      
      // Redirecionar para recibo
      router.push(`/recibo/${newReg.id}`);
      
    } catch (erro) {
      console.error('Erro inesperado:', erro);
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const needsDates = formData.docType !== 'Cartão de Eleitor';

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto px-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Nome Completo</Label>
          <Input 
            required 
            value={formData.studentName} 
            onChange={(e) => handleChange('studentName', e.target.value)}
            className="rounded-xl"
            placeholder="Seu nome completo"
          />
        </div>
        <div className="space-y-2">
          <Label>Telefone</Label>
          <Input 
            required 
            type="tel"
            value={formData.studentPhone} 
            onChange={(e) => handleChange('studentPhone', e.target.value)}
            className="rounded-xl"
            placeholder="+258 84 000 0000"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Email</Label>
        <Input 
          required 
          type="email"
          value={formData.studentEmail} 
          onChange={(e) => handleChange('studentEmail', e.target.value)}
          className="rounded-xl"
          placeholder="seu@email.com"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Tipo de Documento</Label>
          <Select value={formData.docType} onValueChange={(v) => handleChange('docType', v as DocumentType)}>
            <SelectTrigger className="rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BI">BI (Bilhete de Identidade)</SelectItem>
              <SelectItem value="Passaporte">Passaporte</SelectItem>
              <SelectItem value="Carta de Condução">Carta de Condução</SelectItem>
              <SelectItem value="NUIT">NUIT</SelectItem>
              <SelectItem value="Cartão de Eleitor">Cartão de Eleitor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Número do Documento</Label>
          <Input 
            required 
            value={formData.docNumber} 
            onChange={(e) => handleChange('docNumber', e.target.value)}
            className="rounded-xl"
            placeholder="Nº do documento"
          />
        </div>
      </div>

      {needsDates && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data de Emissão (Opcional)</Label>
              <Input 
                type="date"
                value={formData.docIssueDate} 
                onChange={(e) => handleChange('docIssueDate', e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label>Data de Validade (Opcional)</Label>
              <Input 
                type="date"
                value={formData.docExpiryDate} 
                onChange={(e) => handleChange('docExpiryDate', e.target.value)}
                className="rounded-xl"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Local de Emissão (Opcional)</Label>
            <Input 
              value={formData.docIssuePlace} 
              onChange={(e) => handleChange('docIssuePlace', e.target.value)}
              className="rounded-xl"
              placeholder="Ex: Maputo"
            />
          </div>
        </>
      )}

      <Button 
        type="submit" 
        disabled={loading} 
        className="w-full py-6 rounded-xl text-lg font-bold gold-shimmer shadow-lg"
      >
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <CheckCircle2 className="mr-2" /> 
            Finalizar e Gerar Recibo
          </>
        )}
      </Button>
    </form>
  );
};
