
"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Save, GraduationCap, Image as ImageIcon, Home, Users, Printer, Download, Edit3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Project, Flyer, DEFAULT_FLYERS, HomeContent, DEFAULT_HOME_CONTENT, Category, PORTFOLIO_PROJECTS, Registration } from '@/lib/portfolio-data';

export default function AdminPage() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [home, setHome] = useState<HomeContent>(DEFAULT_HOME_CONTENT);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    // Carregar Portfólio
    const savedProjects = localStorage.getItem('napau_projects');
    setProjects(savedProjects ? JSON.parse(savedProjects) : PORTFOLIO_PROJECTS);

    // Carregar Flyers
    const savedFlyers = localStorage.getItem('napau_flyers');
    setFlyers(savedFlyers ? JSON.parse(savedFlyers) : DEFAULT_FLYERS);

    // Carregar Inscrições
    const savedRegs = localStorage.getItem('napau_registrations');
    setRegistrations(savedRegs ? JSON.parse(savedRegs) : []);

    // Carregar Home
    const savedHome = localStorage.getItem('napau_home_content');
    if (savedHome) setHome(JSON.parse(savedHome));
  }, []);

  const saveHome = () => {
    localStorage.setItem('napau_home_content', JSON.stringify(home));
    toast({ title: "Conteúdo da Home atualizado!" });
  };

  const saveProjects = (newList: Project[]) => {
    setProjects(newList);
    localStorage.setItem('napau_projects', JSON.stringify(newList));
    toast({ title: "Portfólio guardado!" });
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const projectData: Project = {
      id: editingProject?.id || Date.now().toString(),
      title: formData.get('title') as string,
      category: formData.get('category') as Category,
      description: formData.get('description') as string,
      imageUrl: formData.get('imageUrl') as string,
      year: formData.get('year') as string,
      active: true
    };
    if (editingProject) {
      saveProjects(projects.map(p => p.id === editingProject.id ? projectData : p));
      setEditingProject(null);
    } else {
      saveProjects([projectData, ...projects]);
    }
    (e.target as HTMLFormElement).reset();
  };

  const deleteProject = (id: string) => {
    if (confirm('Tem certeza?')) saveProjects(projects.filter(p => p.id !== id));
  };

  const saveFlyers = (newList: Flyer[]) => {
    setFlyers(newList);
    localStorage.setItem('napau_flyers', JSON.stringify(newList));
    toast({ title: "Lista de Flyers atualizada!" });
  };

  const addFlyer = () => {
    const newFlyer: Flyer = {
      id: Date.now().toString(),
      titulo: 'Novo Curso',
      preco: '0 MT',
      data: 'DATA',
      local: 'NAPAU',
      contactos: '+258',
      listaEsquerda: [],
      listaDireita: [],
      imageUrl: 'https://picsum.photos/seed/' + Date.now() + '/800/600',
      ativo: true
    };
    saveFlyers([newFlyer, ...flyers]);
  };

  const updateFlyer = (id: string, field: keyof Flyer, value: any) => {
    const newList = flyers.map(f => f.id === id ? { ...f, [field]: value } : f);
    setFlyers(newList);
  };

  const deleteFlyer = (id: string) => {
    if (confirm('Deseja apagar?')) saveFlyers(flyers.filter(f => f.id !== id));
  };

  const deleteRegistration = (id: string) => {
    if (confirm('Remover esta inscrição?')) {
      const newList = registrations.filter(r => r.id !== id);
      setRegistrations(newList);
      localStorage.setItem('napau_registrations', JSON.stringify(newList));
    }
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-headline font-bold">Painel de Controlo</h1>
              <p className="text-muted-foreground text-sm">Gestão completa da Napau.</p>
            </div>
          </div>

          <Tabs defaultValue="home" className="space-y-6">
            <TabsList className="bg-white p-1 rounded-xl shadow-sm border h-auto flex flex-wrap gap-1">
              <TabsTrigger value="home" className="rounded-lg py-2.5 px-5 flex gap-2"><Home size={18} /> Home</TabsTrigger>
              <TabsTrigger value="portfolio" className="rounded-lg py-2.5 px-5 flex gap-2"><ImageIcon size={18} /> Portfólio</TabsTrigger>
              <TabsTrigger value="flyers" className="rounded-lg py-2.5 px-5 flex gap-2"><GraduationCap size={18} /> Flyers</TabsTrigger>
              <TabsTrigger value="registrations" className="rounded-lg py-2.5 px-5 flex gap-2"><Users size={18} /> Inscrições</TabsTrigger>
            </TabsList>

            <TabsContent value="home">
              <Card className="border-none shadow-sm rounded-2xl bg-white">
                <CardHeader className="flex flex-row items-center justify-between border-b p-6">
                  <CardTitle className="text-lg">Conteúdo da Home</CardTitle>
                  <Button onClick={saveHome} className="bg-primary text-white rounded-xl gap-2"><Save size={18} /> Guardar Home</Button>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase">Título Hero</label>
                      <Input value={home.heroTitle} onChange={(e) => setHome({...home, heroTitle: e.target.value})} className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase">Foto Hero (URL)</label>
                      <Input value={home.heroImage} onChange={(e) => setHome({...home, heroImage: e.target.value})} className="rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase">Subtítulo Hero</label>
                    <Textarea value={home.heroSubtitle} onChange={(e) => setHome({...home, heroSubtitle: e.target.value})} className="rounded-xl h-24" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase">Desc. Bolos</label>
                      <Textarea value={home.serviceBoloDesc} onChange={(e) => setHome({...home, serviceBoloDesc: e.target.value})} className="rounded-xl h-24" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase">Desc. Camisetas</label>
                      <Textarea value={home.serviceCamisetaDesc} onChange={(e) => setHome({...home, serviceCamisetaDesc: e.target.value})} className="rounded-xl h-24" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase">Desc. Formação</label>
                      <Textarea value={home.serviceFormacaoDesc} onChange={(e) => setHome({...home, serviceFormacaoDesc: e.target.value})} className="rounded-xl h-24" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="portfolio">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-1 border-none shadow-sm rounded-2xl bg-white h-fit">
                  <CardHeader><CardTitle className="text-lg">Gerir Trabalho</CardTitle></CardHeader>
                  <CardContent>
                    <form onSubmit={handleProjectSubmit} className="space-y-4">
                      <Input name="title" defaultValue={editingProject?.title} placeholder="Título" required className="rounded-xl" />
                      <select name="category" defaultValue={editingProject?.category || 'Tipos de Bolo'} className="w-full p-2 border rounded-xl bg-white text-sm">
                        <option value="Tipos de Bolo">Tipos de Bolo</option>
                        <option value="Camisetas">Camisetas</option>
                        <option value="Design Personalizado">Design Personalizado</option>
                        <option value="Kits Revenda">Kits Revenda</option>
                      </select>
                      <Input name="year" defaultValue={editingProject?.year || '2024'} placeholder="Ano" required className="rounded-xl" />
                      <Input name="imageUrl" defaultValue={editingProject?.imageUrl} placeholder="URL da Foto" required className="rounded-xl" />
                      <Textarea name="description" defaultValue={editingProject?.description} placeholder="Descrição" required className="rounded-xl h-24" />
                      <Button type="submit" className="w-full rounded-xl">{editingProject ? 'Atualizar' : 'Adicionar'}</Button>
                    </form>
                  </CardContent>
                </Card>
                <Card className="lg:col-span-2 border-none shadow-sm rounded-2xl bg-white overflow-hidden">
                  <Table>
                    <TableHeader><TableRow><TableHead>Info</TableHead><TableHead>Cat</TableHead><TableHead className="text-right">Ações</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {projects.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell><div className="font-medium">{p.title}</div></TableCell>
                          <TableCell><span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full font-bold uppercase">{p.category}</span></TableCell>
                          <TableCell className="text-right flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => setEditingProject(p)}><Edit3 size={16} /></Button>
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteProject(p.id)}><Trash2 size={16} /></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="flyers">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">Flyers Digitais</h3>
                  <Button onClick={addFlyer} className="rounded-xl gap-2"><Plus size={18} /> Novo Flyer</Button>
                </div>
                {flyers.map((flyer) => (
                  <Card key={flyer.id} className="border-none shadow-sm rounded-2xl bg-white">
                    <CardHeader className="flex flex-row items-center justify-between border-b p-6">
                      <Input value={flyer.titulo} onChange={(e) => updateFlyer(flyer.id, 'titulo', e.target.value)} className="font-bold border-none" />
                      <div className="flex gap-2">
                        <Button onClick={() => saveFlyers(flyers)} variant="outline" size="icon" className="rounded-xl"><Save size={16} /></Button>
                        <Button onClick={() => deleteFlyer(flyer.id)} variant="ghost" size="icon" className="text-destructive rounded-xl"><Trash2 size={16} /></Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input value={flyer.preco} onChange={(e) => updateFlyer(flyer.id, 'preco', e.target.value)} placeholder="Preço" className="rounded-xl" />
                      <Input value={flyer.data} onChange={(e) => updateFlyer(flyer.id, 'data', e.target.value)} placeholder="Data" className="rounded-xl" />
                      <Textarea value={flyer.listaEsquerda.join('\n')} onChange={(e) => updateFlyer(flyer.id, 'listaEsquerda', e.target.value.split('\n'))} placeholder="Lista Esquerda" className="rounded-xl" />
                      <Textarea value={flyer.listaDireita.join('\n')} onChange={(e) => updateFlyer(flyer.id, 'listaDireita', e.target.value.split('\n'))} placeholder="Lista Direita" className="rounded-xl" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="registrations">
              <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden print:shadow-none print:border-none">
                <CardHeader className="flex flex-row items-center justify-between border-b p-6 print:hidden">
                  <CardTitle className="text-lg">Lista de Inscritos</CardTitle>
                  <Button onClick={printReport} variant="outline" className="rounded-xl gap-2"><Printer size={18} /> Imprimir Relatório</Button>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID / Aluno</TableHead>
                        <TableHead>Curso</TableHead>
                        <TableHead>Documento</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead className="text-right print:hidden">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {registrations.length > 0 ? registrations.map((r) => (
                        <TableRow key={r.id}>
                          <TableCell>
                            <div className="font-bold text-primary">{r.id}</div>
                            <div className="text-xs">{r.studentName}</div>
                            <div className="text-[10px] text-muted-foreground">{r.studentPhone}</div>
                          </TableCell>
                          <TableCell><div className="text-xs">{r.courseTitle}</div></TableCell>
                          <TableCell><div className="text-xs font-mono">{r.docType}: {r.docNumber}</div></TableCell>
                          <TableCell><div className="text-xs">{new Date(r.registrationDate).toLocaleDateString()}</div></TableCell>
                          <TableCell className="text-right print:hidden">
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteRegistration(r.id)}><Trash2 size={16} /></Button>
                          </TableCell>
                        </TableRow>
                      )) : (
                        <TableRow><TableCell colSpan={5} className="text-center py-10 text-muted-foreground">Nenhuma inscrição registada.</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
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
