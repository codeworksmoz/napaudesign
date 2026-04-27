
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

  // Persistência local (Rascunho)
  useEffect(() => {
    const savedDraft = localStorage.getItem(`draft_reg_${course.id}`);
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft));
    }
  }, [course.id]);

  useEffect(() => {
    localStorage.setItem(`draft_reg_${course.id}`, JSON.stringify(formData));
  }, [formData, course.id]);

  const handleChange = (field: keyof Registration, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateId = () => {
    const now = new Date();
    // Formato: NP20240427 (ano mês dia)
    const dateStr = now.getFullYear().toString() + 
                    (now.getMonth() + 1).toString().padStart(2, '0') + 
                    now.getDate().toString().padStart(2, '0');
    
    const registrations: Registration[] = JSON.parse(localStorage.getItem('napau_registrations') || '[]');
    const todayCount = registrations.filter(r => r.registrationDate.startsWith(now.toISOString().slice(0, 10))).length + 1;
    
    // O ID com barra "/" cria sub-segmentos na URL, por isso usamos um traço "-" para o ID técnico
    // mas guardamos no formato visual se preferir. Para evitar 404, usamos o traço no ID da URL.
    return `NP${dateStr}-${todayCount}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const generatedId = generateId();
      const newReg: Registration = {
        ...(formData as Registration),
        id: generatedId,
        courseId: course.id,
        courseTitle: course.titulo,
        registrationDate: new Date().toISOString(),
        status: 'Pendente'
      };

      const registrations = JSON.parse(localStorage.getItem('napau_registrations') || '[]');
      localStorage.setItem('napau_registrations', JSON.stringify([newReg, ...registrations]));
      
      // Limpar rascunho
      localStorage.removeItem(`draft_reg_${course.id}`);
      
      toast({
        title: "Inscrição Realizada!",
        description: `O seu ID é ${newReg.id}. Guarde este número.`,
      });

      if (onSuccess) onSuccess(newReg);
      setLoading(false);
      
      // Redirecionar para recibo
      router.push(`/recibo/${newReg.id}`);
    }, 1500);
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
            placeholder="+258"
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
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Tipo de Documento</Label>
          <Select value={formData.docType} onValueChange={(v) => handleChange('docType', v)}>
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
            />
          </div>
        </>
      )}

      <Button type="submit" disabled={loading} className="w-full py-6 rounded-xl text-lg font-bold gold-shimmer shadow-lg">
        {loading ? <Loader2 className="animate-spin" /> : <><CheckCircle2 className="mr-2" /> Finalizar e Gerar Recibo</>}
      </Button>
    </form>
  );
};
