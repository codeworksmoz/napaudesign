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
import { Plus, Trash2, Save, GraduationCap, Image as ImageIcon, Home, Users, Printer, Edit3, Settings, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Project, Flyer, HomeContent, DEFAULT_HOME_CONTENT, Category, Registration } from '@/lib/portfolio-data';
import { supabase } from '@/lib/supabase';
import { ImageUpload } from '@/components/admin/ImageUpload';

export default function NapauAdminPage() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [home, setHome] = useState<HomeContent>(DEFAULT_HOME_CONTENT);
  const [carregando, setCarregando] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    setCarregando(true);
    try {
      const { data: homeData } = await supabase.from('home_content').select('*').single();
      if (homeData) setHome(homeData);

      const { data: projData } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (projData) setProjects(projData as Project[]);

      const { data: flyData } = await supabase.from('flyers').select('*').order('created_at', { ascending: false });
      if (flyData) setFlyers(flyData as Flyer[]);

      const { data: regData } = await supabase.from('registrations').select('*').order('registrationDate', { ascending: false });
      if (regData) setRegistrations(regData as Registration[]);

    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setCarregando(false);
    }
  }

  const saveHome = async () => {
    try {
      const { error } = await supabase.from('home_content').upsert(home);
      if (error) throw error;
      toast({ title: "Conteúdo da Home atualizado!" });
    } catch (e: any) {
      toast({ title: "Erro ao salvar Home", description: e.message, variant: "destructive" });
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const projectData = {
      title: formData.get('title') as string,
      category: formData.get('category') as Category,
      description: formData.get('description') as string,
      imageUrl: formData.get('imageUrl') as string,
      year: formData.get('year') as string,
      active: true
    };

    try {
      if (editingProject) {
        const { error } = await supabase.from('projects').update(projectData).eq('id', editingProject.id);
        if (error) throw error;
        toast({ title: "Projeto atualizado!" });
      } else {
        const { error } = await supabase.from('projects').insert(projectData);
        if (error) throw error;
        toast({ title: "Projeto adicionado!" });
      }
      setEditingProject(null);
      (e.target as HTMLFormElement).reset();
      carregarDados();
    } catch (e: any) {
      toast({ title: "Erro ao salvar projeto", description: e.message, variant: "destructive" });
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Tem certeza?')) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      carregarDados();
      toast({ title: "Projeto removido!" });
    } catch (e: any) {
      toast({ title: "Erro ao apagar", description: e.message, variant: "destructive" });
    }
  };

  const saveFlyer = async (flyer: Flyer) => {
    try {
      const { error } = await supabase.from('flyers').upsert(flyer);
      if (error) throw error;
      toast({ title: "Flyer guardado!" });
      carregarDados();
    } catch (e: any) {
      toast({ title: "Erro ao salvar flyer", description: e.message, variant: "destructive" });
    }
  };

  const addFlyer = async () => {
    const newFlyer = {
      titulo: 'Novo Curso/Workshop',
      preco: '0 MT',
      data: 'DATA',
      local: 'NAPAU',
      contactos: '+258',
      listaEsquerda: [],
      listaDireita: [],
      imageUrl: '',
      ativo: true
    };
    try {
      const { error } = await supabase.from('flyers').insert(newFlyer);
      if (error) throw error;
      carregarDados();
    } catch (e: any) {
      console.error(e);
    }
  };

  const updateFlyerLocal = (id: string, field: keyof Flyer, value: any) => {
    setFlyers(flyers.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const deleteFlyer = async (id: string) => {
    if (!confirm('Deseja apagar?')) return;
    try {
      const { error } = await supabase.from('flyers').delete().eq('id', id);
      if (error) throw error;
      carregarDados();
    } catch (e: any) {
      console.error(e);
    }
  };

  const deleteRegistration = async (id: string) => {
    if (!confirm('Remover esta inscrição?')) return;
    try {
      const { error } = await supabase.from('registrations').delete().eq('id', id);
      if (error) throw error;
      carregarDados();
      toast({ title: "Inscrição removida!" });
    } catch (e: any) {
      console.error(e);
    }
  };

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

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
                <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">Painel Administrativo</p>
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
                  <Button onClick={saveHome} className="bg-primary text-white rounded-xl gap-2 px-8 py-6 font-bold shadow-lg gold-shimmer">
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
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary px-1">Foto Hero</label>
                      <ImageUpload valor={home.heroImage} onChange={(url) => setHome({...home, heroImage: url})} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary px-1">Subtítulo Hero</label>
                    <Textarea value={home.heroSubtitle} onChange={(e) => setHome({...home, heroSubtitle: e.target.value})} className="rounded-xl h-24 resize-none" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary px-1">Desc. Topos de Bolo</label>
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
                  <CardHeader className="bg-secondary/5 rounded-t-[2rem]"><CardTitle className="text-lg">{editingProject ? 'Editar Trabalho' : 'Novo Trabalho'}</CardTitle></CardHeader>
                  <CardContent className="p-6">
                    <form onSubmit={handleProjectSubmit} className="space-y-4">
                      <Input name="title" defaultValue={editingProject?.title} placeholder="Título do Trabalho" required className="rounded-xl" />
                      <select name="category" defaultValue={editingProject?.category || 'Topos de Bolo'} className="w-full p-3 border rounded-xl bg-white text-sm font-medium outline-none">
                        <option value="Topos de Bolo">Topos de Bolo</option>
                        <option value="Camisetas">Camisetas</option>
                      </select>
                      <Input name="year" defaultValue={editingProject?.year || '2024'} placeholder="Ano" required className="rounded-xl" />
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-primary px-1">Imagem</label>
                        <ImageUpload 
                          valor={editingProject?.imageUrl || ''} 
                          onChange={(url) => setEditingProject(prev => prev ? {...prev, imageUrl: url} : null)} 
                        />
                      </div>
                      <Textarea name="description" defaultValue={editingProject?.description} placeholder="Descrição curta..." required className="rounded-xl h-24 resize-none" />
                      <Button type="submit" className="w-full rounded-xl py-6 font-bold shadow-md">
                        {editingProject ? 'Atualizar' : 'Adicionar ao Portfólio'}
                      </Button>
                      {editingProject && (
                        <Button type="button" variant="ghost" onClick={() => setEditingProject(null)} className="w-full">Cancelar</Button>
                      )}
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
                            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setEditingProject(p)}><Edit3 size={16} /></Button>
                            <Button variant="ghost" size="icon" className="text-destructive rounded-full" onClick={() => deleteProject(p.id)}><Trash2 size={16} /></Button>
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
                    <h3 className="text-xl font-bold font-headline">Cursos & Workshops</h3>
                    <p className="text-xs text-muted-foreground">Gestão de inscrições e catálogo.</p>
                  </div>
                  <Button onClick={addFlyer} className="rounded-xl gap-2 px-6 py-6 font-bold"><Plus size={18} /> Criar Novo Flyer</Button>
                </div>
                {flyers.map((flyer) => (
                  <Card key={flyer.id} className="border-none shadow-xl rounded-[2rem] bg-white overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between border-b bg-secondary/5 p-6">
                      <Input value={flyer.titulo} onChange={(e) => updateFlyerLocal(flyer.id, 'titulo', e.target.value)} className="font-bold border-none text-lg bg-transparent focus:ring-0" />
                      <div className="flex gap-2">
                        <Button onClick={() => saveFlyer(flyer)} variant="outline" size="icon" className="rounded-xl hover:bg-primary hover:text-white"><Save size={16} /></Button>
                        <Button onClick={() => deleteFlyer(flyer.id)} variant="ghost" size="icon" className="text-destructive rounded-xl"><Trash2 size={16} /></Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="registrations" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Card className="border-none shadow-xl rounded-[2rem] bg-white overflow-hidden print:shadow-none">
                <CardHeader className="flex flex-row items-center justify-between border-b bg-secondary/5 p-8 print:hidden">
                  <CardTitle className="text-xl">Lista de Inscritos</CardTitle>
                  <Button onClick={() => window.print()} variant="outline" className="rounded-xl gap-2 font-bold"><Printer size={18} /> Gerar PDF</Button>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-secondary/5">
                      <TableRow>
                        <TableHead>Aluno / ID</TableHead>
                        <TableHead>Workshop/Curso</TableHead>
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
                            <Button variant="ghost" size="icon" className="text-destructive rounded-full" onClick={() => deleteRegistration(r.id)}><Trash2 size={16} /></Button>
                          </TableCell>
                        </TableRow>
                      )) : (
                        <TableRow><TableCell colSpan={4} className="text-center py-20">Aguardando as primeiras inscrições...</TableCell></TableRow>
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
