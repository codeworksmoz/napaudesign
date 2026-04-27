
"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Save, GraduationCap, Image as ImageIcon, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PORTFOLIO_PROJECTS, Project } from '@/lib/portfolio-data';

export default function AdminPage() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [curso, setCurso] = useState({
    preco: "4.500 MT",
    data: "14 DE DEZEMBRO",
    local: "AV. ACORDOS DE LUSAKA, PARAGEM BALTAZAR",
    contactos: "+258 84 761 5871 | 86 791 5871",
    listaEsquerda: "",
    listaDireita: ""
  });

  useEffect(() => {
    // Para conectar ao Supabase: substituir por fetch de 'portfolio' e 'cursos'
    const savedProjects = localStorage.getItem('napau_projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(PORTFOLIO_PROJECTS);
    }

    const savedCurso = localStorage.getItem('napau_curso_data');
    if (savedCurso) {
      const data = JSON.parse(savedCurso);
      setCurso({
        ...data,
        listaEsquerda: Array.isArray(data.listaEsquerda) ? data.listaEsquerda.join('\n') : data.listaEsquerda,
        listaDireita: Array.isArray(data.listaDireita) ? data.listaDireita.join('\n') : data.listaDireita,
      });
    } else {
      setCurso(prev => ({
        ...prev,
        listaEsquerda: "BOLO DE ANIVERSÁRIO COM FOTO\nBOLO DE CASAMENTO\nBOLO GELADO\nBOLO TEMÁTICO\nBOLACHINHAS SORTIDAS",
        listaDireita: "CUP-CAKES PERSONALIZADOS\nDRIP-CAKES\nFLORESTA NEGRA\nORELHUDOS DE CUSTARDE\nSOBREMESAS"
      }));
    }
  }, []);

  const saveProjects = (newList: Project[]) => {
    setProjects(newList);
    localStorage.setItem('napau_projects', JSON.stringify(newList));
    toast({ title: "Portfólio atualizado!" });
  };

  const saveCurso = () => {
    const dataToSave = {
      ...curso,
      listaEsquerda: curso.listaEsquerda.split('\n').filter(l => l.trim()),
      listaDireita: curso.listaDireita.split('\n').filter(l => l.trim())
    };
    localStorage.setItem('napau_curso_data', JSON.stringify(dataToSave));
    toast({ title: "Dados do curso salvos!" });
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'Novo Projeto',
      category: 'Tipos de Bolo',
      description: 'Descrição do projeto...',
      imageUrl: 'https://picsum.photos/seed/' + Date.now() + '/800/600',
      year: new Date().getFullYear().toString(),
      active: true
    };
    saveProjects([newProject, ...projects]);
  };

  const deleteProject = (id: string) => {
    saveProjects(projects.filter(p => p.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-headline font-bold">Painel Administrativo</h1>
            <p className="text-muted-foreground text-sm">Gestão local (LocalStorage) - Pronta para Supabase.</p>
          </div>

          <Tabs defaultValue="portfolio" className="space-y-6">
            <TabsList className="bg-white p-1 rounded-xl shadow-sm border h-auto flex flex-wrap gap-1">
              <TabsTrigger value="portfolio" className="rounded-lg py-2.5 px-5 flex gap-2">
                <ImageIcon size={18} /> Portfólio
              </TabsTrigger>
              <TabsTrigger value="curso" className="rounded-lg py-2.5 px-5 flex gap-2">
                <GraduationCap size={18} /> Curso Flyer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="portfolio">
              <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between border-b p-6">
                  <CardTitle className="text-lg">Trabalhos (Tipos de Bolo, Camisetas, etc.)</CardTitle>
                  <Button onClick={addProject} className="bg-primary text-white rounded-xl gap-2">
                    <Plus size={18} /> Adicionar
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/5">
                        <TableHead className="px-6 py-4">Título</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead className="text-right px-6">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell className="px-6 font-medium">{p.title}</TableCell>
                          <TableCell>
                            <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full font-bold uppercase">
                              {p.category}
                            </span>
                          </TableCell>
                          <TableCell className="text-right px-6">
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteProject(p.id)}>
                              <Trash2 size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="curso">
              <Card className="border-none shadow-sm rounded-2xl bg-white">
                <CardHeader className="flex flex-row items-center justify-between border-b p-6">
                  <CardTitle className="text-lg">Conteúdo do Flyer</CardTitle>
                  <Button onClick={saveCurso} className="bg-primary text-white rounded-xl gap-2">
                    <Save size={18} /> Guardar Alterações
                  </Button>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Preço</label>
                      <Input value={curso.preco} onChange={(e) => setCurso({...curso, preco: e.target.value})} className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Data</label>
                      <Input value={curso.data} onChange={(e) => setCurso({...curso, data: e.target.value})} className="rounded-xl" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Lista Esquerda (Um por linha)</label>
                      <Textarea value={curso.listaEsquerda} onChange={(e) => setCurso({...curso, listaEsquerda: e.target.value})} className="rounded-xl h-40" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Lista Direita (Um por linha)</label>
                      <Textarea value={curso.listaDireita} onChange={(e) => setCurso({...curso, listaDireita: e.target.value})} className="rounded-xl h-40" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
