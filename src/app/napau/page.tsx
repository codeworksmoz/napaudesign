
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
import { Plus, Trash2, Save, GraduationCap, Image as ImageIcon, Home, Users, Printer, Edit3, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Project, Flyer, DEFAULT_FLYERS, HomeContent, DEFAULT_HOME_CONTENT, Category, PORTFOLIO_PROJECTS, Registration } from '@/lib/portfolio-data';

export default function NapauAdminPage() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [home, setHome] = useState<HomeContent>(DEFAULT_HOME_CONTENT);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    // Carregar dados salvos ou defaults
    const savedProjects = localStorage.getItem('napau_projects');
    setProjects(savedProjects ? JSON.parse(savedProjects) : PORTFOLIO_PROJECTS);

    const savedFlyers = localStorage.getItem('napau_flyers');
    setFlyers(savedFlyers ? JSON.parse(savedFlyers) : DEFAULT_FLYERS);

    const savedRegs = localStorage.getItem('napau_registrations');
    setRegistrations(savedRegs ? JSON.parse(savedRegs) : []);

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

  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      <Navbar />
      <main className="flex-grow pt-28 pb-16 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Settings size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-headline font-bold text-foreground">Gestão Napau</h1>
                <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">Acesso Restrito</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="home" className="space-y-6">
            <TabsList className="bg-white p-1 rounded-2xl shadow-sm border h-auto flex flex-wrap gap-1">
              <TabsTrigger value="home" className="rounded-xl py-3 px-6 flex gap-2"><Home size={18} /> Home</TabsTrigger>
              <TabsTrigger value="portfolio" className="rounded-xl py-3 px-6 flex gap-2"><ImageIcon size={18} /> Portfólio</TabsTrigger>
              <TabsTrigger value="flyers" className="rounded-xl py-3 px-6 flex gap-2"><GraduationCap size={18} /> Flyers</TabsTrigger>
              <TabsTrigger value="registrations" className="rounded-xl py-3 px-6 flex gap-2"><Users size={18} /> Inscrições</TabsTrigger>
            </TabsList>

            <TabsContent value="home" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Card className="border-none shadow-xl rounded-[2rem] bg-white overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between border-b bg-secondary/5 p-8">
                  <CardTitle className="text-xl">Conteúdo da Home</CardTitle>
                  <Button onClick={saveHome} className="bg-primary text-white rounded-xl gap-2 px-8 py-6 font-bold shadow-lg gold-shimmer hover:scale-105 transition-transform">
                    <Save size={18} /> Guardar Alterações
                  </Button>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary px-1">Título Hero</label>
                      <Input value={home.heroTitle} onChange={(e) => setHome({...home, heroTitle: e.target.value})} className="rounded-xl h-12" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary px-1">Foto Hero (URL)</label>
                      <Input value={home.heroImage} onChange={(e) => setHome({...home, heroImage: e.target.value})} className="rounded-xl h-12" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary px-1">Subtítulo Hero</label>
                    <Textarea value={home.heroSubtitle} onChange={(e) => setHome({...home, heroSubtitle: e.target.value})} className="rounded-xl h-24 resize-none" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary px-1">Desc. Tipos de Bolo</label>
                      <Textarea value={home.serviceBoloDesc} onChange={(e) => setHome({...home, serviceBoloDesc: e.target.value})} className="rounded-xl h-28 resize-none" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary px-1">Desc. Camisetas</label>
                      <Textarea value={home.serviceCamisetaDesc} onChange={(e) => setHome({...home, serviceCamisetaDesc: e.target.value})} className="rounded-xl h-28 resize-none" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary px-1">Desc. Formação</label>
                      <Textarea value={home.serviceFormacaoDesc} onChange={(e) => setHome({...home, serviceFormacaoDesc: e.target.value})} className="rounded-xl h-28 resize-none" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="portfolio" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <Card className="lg:col-span-4 border-none shadow-xl rounded-[2rem] bg-white h-fit">
                  <CardHeader className="bg-secondary/5 rounded-t-[2rem]"><CardTitle className="text-lg">Gerir Trabalho</CardTitle></CardHeader>
                  <CardContent className="p-6">
                    <form onSubmit={handleProjectSubmit} className="space-y-4">
                      <Input name="title" defaultValue={editingProject?.title} placeholder="Título do Projeto" required className="rounded-xl" />
                      <select name="category" defaultValue={editingProject?.category || 'Tipos de Bolo'} className="w-full p-3 border rounded-xl bg-white text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none">
                        <option value="Tipos de Bolo">Tipos de Bolo</option>
                        <option value="Camisetas">Camisetas</option>
                        <option value="Design Personalizado">Design Personalizado</option>
                        <option value="Kits Revenda">Kits Revenda</option>
                      </select>
                      <Input name="year" defaultValue={editingProject?.year || '2024'} placeholder="Ano" required className="rounded-xl" />
                      <Input name="imageUrl" defaultValue={editingProject?.imageUrl} placeholder="URL da Foto" required className="rounded-xl" />
                      <Textarea name="description" defaultValue={editingProject?.description} placeholder="Breve descrição..." required className="rounded-xl h-24 resize-none" />
                      <Button type="submit" className="w-full rounded-xl py-6 font-bold shadow-md">{editingProject ? 'Atualizar Projeto' : 'Adicionar ao Portfólio'}</Button>
                    </form>
                  </CardContent>
                </Card>
                <Card className="lg:col-span-8 border-none shadow-xl rounded-[2rem] bg-white overflow-hidden">
                  <Table>
                    <TableHeader className="bg-secondary/5"><TableRow><TableHead>Trabalho</TableHead><TableHead>Categoria</TableHead><TableHead className="text-right">Ações</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {projects.map((p) => (
                        <TableRow key={p.id} className="hover:bg-secondary/5 transition-colors">
                          <TableCell><div className="font-bold text-foreground">{p.title}</div><div className="text-[10px] text-muted-foreground uppercase">{p.year}</div></TableCell>
                          <TableCell><span className="text-[9px] bg-primary/10 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-widest">{p.category}</span></TableCell>
                          <TableCell className="text-right flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary" onClick={() => setEditingProject(p)}><Edit3 size={16} /></Button>
                            <Button variant="ghost" size="icon" className="text-destructive rounded-full hover:bg-destructive/10" onClick={() => deleteProject(p.id)}><Trash2 size={16} /></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="flyers" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-8">
                <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm">
                  <div>
                    <h3 className="text-xl font-bold font-headline">Catálogo de Cursos</h3>
                    <p className="text-xs text-muted-foreground">Cada flyer será exibido com destaque na plataforma.</p>
                  </div>
                  <Button onClick={addFlyer} className="rounded-xl gap-2 px-6 py-6 font-bold"><Plus size={18} /> Criar Novo Flyer</Button>
                </div>
                {flyers.map((flyer) => (
                  <Card key={flyer.id} className="border-none shadow-xl rounded-[2rem] bg-white overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between border-b bg-secondary/5 p-6">
                      <Input value={flyer.titulo} onChange={(e) => updateFlyer(flyer.id, 'titulo', e.target.value)} className="font-bold border-none text-lg bg-transparent focus:ring-0" />
                      <div className="flex gap-2">
                        <Button onClick={() => saveFlyers(flyers)} variant="outline" size="icon" className="rounded-xl hover:bg-primary hover:text-white transition-all"><Save size={16} /></Button>
                        <Button onClick={() => deleteFlyer(flyer.id)} variant="ghost" size="icon" className="text-destructive rounded-xl hover:bg-destructive/10"><Trash2 size={16} /></Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-primary">Preço</label>
                            <Input value={flyer.preco} onChange={(e) => updateFlyer(flyer.id, 'preco', e.target.value)} className="rounded-xl" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-primary">Data</label>
                            <Input value={flyer.data} onChange={(e) => updateFlyer(flyer.id, 'data', e.target.value)} className="rounded-xl" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-primary">Local</label>
                          <Input value={flyer.local} onChange={(e) => updateFlyer(flyer.id, 'local', e.target.value)} className="rounded-xl" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-primary">Lista Esquerda</label>
                          <Textarea value={flyer.listaEsquerda.join('\n')} onChange={(e) => updateFlyer(flyer.id, 'listaEsquerda', e.target.value.split('\n'))} className="rounded-xl h-24 text-xs font-mono" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-primary">Lista Direita</label>
                          <Textarea value={flyer.listaDireita.join('\n')} onChange={(e) => updateFlyer(flyer.id, 'listaDireita', e.target.value.split('\n'))} className="rounded-xl h-24 text-xs font-mono" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="registrations" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Card className="border-none shadow-xl rounded-[2rem] bg-white overflow-hidden print:shadow-none print:border-none">
                <CardHeader className="flex flex-row items-center justify-between border-b bg-secondary/5 p-8 print:hidden">
                  <CardTitle className="text-xl">Inscritos Registados</CardTitle>
                  <Button onClick={() => window.print()} variant="outline" className="rounded-xl gap-2 font-bold hover:bg-primary hover:text-white transition-all">
                    <Printer size={18} /> Imprimir Relatório PDF
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-secondary/5">
                      <TableRow>
                        <TableHead>Identificação</TableHead>
                        <TableHead>Curso</TableHead>
                        <TableHead>Documentação</TableHead>
                        <TableHead className="text-right print:hidden">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {registrations.length > 0 ? registrations.map((r) => (
                        <TableRow key={r.id} className="hover:bg-secondary/5">
                          <TableCell>
                            <div className="font-bold text-primary">{r.id}</div>
                            <div className="font-medium">{r.studentName}</div>
                            <div className="text-[10px] text-muted-foreground font-mono">{r.studentPhone}</div>
                          </TableCell>
                          <TableCell><div className="text-xs font-semibold">{r.courseTitle}</div></TableCell>
                          <TableCell><div className="text-[10px] font-bold">{r.docType}</div><div className="text-[10px] text-muted-foreground font-mono">{r.docNumber}</div></TableCell>
                          <TableCell className="text-right print:hidden">
                            <Button variant="ghost" size="icon" className="text-destructive rounded-full hover:bg-destructive/10" onClick={() => deleteRegistration(r.id)}><Trash2 size={16} /></Button>
                          </TableCell>
                        </TableRow>
                      )) : (
                        <TableRow><TableCell colSpan={4} className="text-center py-20 text-muted-foreground font-light italic">Aguardando as primeiras inscrições...</TableCell></TableRow>
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
