"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Flyer, Registration, DocumentType } from '@/lib/portfolio-data';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2 } from 'lucide-react';
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
    studentname: '',
    studentemail: '',
    studentphone: '',
    doctype: 'BI',
    docnumber: '',
    docissuedate: '',
    docexpirydate: '',
    docissueplace: '',
  });

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

  const generateId = async (): Promise<string> => {
    const now = new Date();
    const dateStr = now.getFullYear().toString() + (now.getMonth() + 1).toString().padStart(2, '0') + now.getDate().toString().padStart(2, '0');
    const hoje = now.toISOString().slice(0, 10);
    const { count } = await supabase.from('registrations').select('*', { count: 'exact', head: true }).gte('registrationdate', `${hoje}T00:00:00`).lte('registrationdate', `${hoje}T23:59:59`);
    return `NP${dateStr}-${(count ?? 0) + 1}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const generatedId = await generateId();
      const newReg: Registration = {
        ...(formData as Registration),
        id: generatedId,
        courseid: course.id,
        coursetitle: course.titulo,
        registrationdate: new Date().toISOString(),
        status: 'Pendente'
      };

      const { error } = await supabase.from('registrations').insert(newReg);

      if (error) throw error;

      localStorage.removeItem(`draft_reg_${course.id}`);
      toast({ title: "Inscrição Realizada!", description: `ID: ${newReg.id}` });
      if (onSuccess) onSuccess(newReg);
      router.push(`/recibo/${newReg.id}`);
    } catch (erro: any) {
      toast({ title: "Erro", description: erro.message, variant: "destructive" });
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto px-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2"><Label>Nome</Label><Input required value={formData.studentname} onChange={(e) => handleChange('studentname', e.target.value)} className="rounded-xl" /></div>
        <div className="space-y-2"><Label>Telefone</Label><Input required type="tel" value={formData.studentphone} onChange={(e) => handleChange('studentphone', e.target.value)} className="rounded-xl" /></div>
      </div>
      <div className="space-y-2"><Label>Email</Label><Input required type="email" value={formData.studentemail} onChange={(e) => handleChange('studentemail', e.target.value)} className="rounded-xl" /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Documento</Label>
          <Select value={formData.doctype} onValueChange={(v) => handleChange('doctype', v as DocumentType)}>
            <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="BI">BI</SelectItem>
              <SelectItem value="Passaporte">Passaporte</SelectItem>
              <SelectItem value="Carta de Condução">Carta de Condução</SelectItem>
              <SelectItem value="NUIT">NUIT</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2"><Label>Número</Label><Input required value={formData.docnumber} onChange={(e) => handleChange('docnumber', e.target.value)} className="rounded-xl" /></div>
      </div>
      <Button type="submit" disabled={loading} className="w-full py-6 rounded-xl text-lg font-bold gold-shimmer shadow-lg">
        {loading ? <Loader2 className="animate-spin" /> : <><CheckCircle2 className="mr-2" /> Gerar Recibo</>}
      </Button>
    </form>
  );
};
