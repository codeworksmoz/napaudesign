
"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Registration } from '@/lib/portfolio-data';

interface AdminRegistrationsTabProps {
  registrations: Registration[];
  onStatusChange: (id: string, newStatus: string) => void;
}

export function AdminRegistrationsTab({ registrations, onStatusChange }: AdminRegistrationsTabProps) {
  return (
    <Card className="rounded-[2.5rem] overflow-hidden bg-white shadow-xl border-none">
      <Table>
        <TableHeader className="bg-secondary/5">
          <TableRow>
            <TableHead>Aluno</TableHead>
            <TableHead>Curso</TableHead>
            <TableHead>Documento</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registrations.map(r => (
            <TableRow key={r.id} className="hover:bg-secondary/5">
              <TableCell className="py-4">
                <p className="font-bold">{r.studentname}</p>
                <p className="text-[10px] text-muted-foreground">{r.studentphone}</p>
              </TableCell>
              <TableCell><p className="font-bold text-primary">{r.coursetitle}</p></TableCell>
              <TableCell><p className="text-xs">{r.doctype}: {r.docnumber}</p></TableCell>
              <TableCell>
                <select 
                  value={r.status} 
                  className="bg-primary/10 border-none rounded-lg px-2 py-1 text-[10px] font-bold text-primary outline-none" 
                  onChange={(e) => onStatusChange(r.id, e.target.value)}
                >
                  <option value="Pendente">🟡 Pendente</option>
                  <option value="Confirmada">🟢 Confirmada</option>
                  <option value="Cancelada">🔴 Cancelada</option>
                </select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
