
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
import { Plus, Trash2, Save, GraduationCap, Image as ImageIcon, Home, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PORTFOLIO_PROJECTS, Project, Flyer, DEFAULT_FLYERS, HomeContent, DEFAULT_HOME_CONTENT } from '@/lib/portfolio-data';

export default function AdminPage() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const [home, setHome] = useState<HomeContent>(DEFAULT_HOME_CONTENT);

  useEffect(() => {
    // Carregar Portfólio
    const savedProjects = localStorage.getItem('napau_projects');
    setProjects(savedProjects ? JSON.parse(savedProjects) : PORTFOLIO_PROJECTS);

    // Carregar Flyers
    const savedFlyers = localStorage.getItem('napau_flyers');
    setFlyers(savedFlyers ? JSON.parse(savedFlyers) : DEFAULT_FLYERS);

    // Carregar Home
    const savedHome = localStorage.getItem('napau_home_content');
    if (savedHome) setHome(JSON.parse(savedHome));
  }, []);

  // Funções Home
  const saveHome = () => {
    localStorage.setItem('napau_home_content', JSON.stringify(home));
    toast({ title: "Conteúdo da Home atualizado!" });
  };

  // Funções Portfólio
  const saveProjects = (newList: Project[]) => {
    setProjects(newList);
    localStorage.setItem('napau_projects', JSON.stringify(newList));
    toast({ title: "Portfólio guardado!" });
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'Novo Trabalho',
      category: 'Tipos de Bolo',
      description: 'Descrição do trabalho...',
      imageUrl: 'https://picsum.photos/seed/' + Date.now() + '/800/600',
      year: new Date().getFullYear().toString(),
      active: true
    };
    saveProjects([newProject, ...projects]);
  };

  // Funções Flyers
  const saveFlyers = (newList: Flyer[]) => {
    setFlyers(newList);
    localStorage.setItem('napau_flyers', JSON.stringify(newList));
    toast({ title: "Lista de Flyers atualizada!" });
  };

  const addFlyer = () => {
    const newFlyer: Flyer = {
      id: Date.now().toString(),
      titulo: 'Novo Curso de Confeitaria',
      preco: '4.500 MT',
      data: 'NOVA DATA',
      local: 'ENDEREÇO DA NAPAU',
      contactos: '+258 84 761 5871',
      listaEsquerda: ['ITEM 1', 'ITEM 2'],
      listaDireita: ['ITEM 3', 'ITEM 4'],
      imageUrl: 'https://picsum.photos/seed/course-' + Date.now() + '/800/600',
      ativo: true
    };
    saveFlyers([newFlyer, ...flyers]);
  };

  const updateFlyer = (id: string, field: keyof Flyer, value: any) => {
    const newList = flyers.map(f => f.id === id ? { ...f, [field]: value } : f);
    setFlyers(newList);
  };

  const deleteFlyer = (id: string) => {
    saveFlyers(flyers.filter(f => f.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-headline font-bold">Painel de Controlo</h1>
            <p className="text-muted-foreground text-sm">Gestão completa de conteúdos (LocalStorage).</p>
          </div>

          <Tabs defaultValue="home" className="space-y-6">
            <TabsList className="bg-white p-1 rounded-xl shadow-sm border h-auto flex flex-wrap gap-1">
              <TabsTrigger value="home" className="rounded-lg py-2.5 px-5 flex gap-2"><Home size={18} /> Home</TabsTrigger>
              <TabsTrigger value="portfolio" className="rounded-lg py-2.5 px-5 flex gap-2"><ImageIcon size={18} /> Portfólio</TabsTrigger>
              <TabsTrigger value="flyers" className="rounded-lg py-2.5 px-5 flex gap-2"><GraduationCap size={18} /> Flyers/Cursos</TabsTrigger>
            </TabsList>

            <TabsContent value="home">
              <Card className="border-none shadow-sm rounded-2xl bg-white">
                <CardHeader className="flex flex-row items-center justify-between border-b p-6">
                  <CardTitle className="text-lg">Conteúdo da Página Inicial</CardTitle>
                  <Button onClick={saveHome} className="bg-primary text-white rounded-xl gap-2"><Save size={18} /> Guardar Home</Button>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Título Hero</label>
                      <Input value={home.heroTitle} onChange={(e) => setHome({...home, heroTitle: e.target.value})} className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Foto Hero (URL)</label>
                      <Input value={home.heroImage} onChange={(e) => setHome({...home, heroImage: e.target.value})} className="rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Subtítulo Hero</label>
                    <Textarea value={home.heroSubtitle} onChange={(e) => setHome({...home, heroSubtitle: e.target.value})} className="rounded-xl h-24" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Desc. Tipos de Bolo</label>
                      <Textarea value={home.serviceBoloDesc} onChange={(e) => setHome({...home, serviceBoloDesc: e.target.value})} className="rounded-xl h-24" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Desc. Camisetas</label>
                      <Textarea value={home.serviceCamisetaDesc} onChange={(e) => setHome({...home, serviceCamisetaDesc: e.target.value})} className="rounded-xl h-24" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Desc. Formação</label>
                      <Textarea value={home.serviceFormacaoDesc} onChange={(e) => setHome({...home, serviceFormacaoDesc: e.target.value})} className="rounded-xl h-24" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="portfolio">
              <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between border-b p-6">
                  <CardTitle className="text-lg">Trabalhos & Galeria</CardTitle>
                  <Button onClick={addProject} className="bg-primary text-white rounded-xl gap-2"><Plus size={18} /> Novo Item</Button>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader><TableRow><TableHead className="px-6">Título</TableHead><TableHead>Categoria</TableHead><TableHead className="text-right px-6">Ações</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {projects.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell className="px-6 font-medium">{p.title}</TableCell>
                          <TableCell><span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full font-bold uppercase">{p.category}</span></TableCell>
                          <TableCell className="text-right px-6">
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => saveProjects(projects.filter(item => item.id !== p.id))}><Trash2 size={16} /></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="flyers">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">Gestão de Flyers Digitais</h3>
                  <Button onClick={addFlyer} className="rounded-xl gap-2"><Plus size={18} /> Criar Novo Flyer</Button>
                </div>

                {flyers.map((flyer) => (
                  <Card key={flyer.id} className="border-none shadow-sm rounded-2xl bg-white">
                    <CardHeader className="flex flex-row items-center justify-between border-b p-6">
                      <Input 
                        value={flyer.titulo} 
                        onChange={(e) => updateFlyer(flyer.id, 'titulo', e.target.value)}
                        className="text-lg font-bold border-none p-0 focus-visible:ring-0 bg-transparent h-auto"
                      />
                      <div className="flex gap-2">
                        <Button onClick={() => saveFlyers(flyers)} variant="outline" className="rounded-xl"><Save size={16} /></Button>
                        <Button onClick={() => deleteFlyer(flyer.id)} variant="ghost" className="text-destructive rounded-xl"><Trash2 size={16} /></Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">Preço</label>
                          <Input value={flyer.preco} onChange={(e) => updateFlyer(flyer.id, 'preco', e.target.value)} className="rounded-xl" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">Data</label>
                          <Input value={flyer.data} onChange={(e) => updateFlyer(flyer.id, 'data', e.target.value)} className="rounded-xl" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">Foto do Curso (URL)</label>
                          <Input value={flyer.imageUrl} onChange={(e) => updateFlyer(flyer.id, 'imageUrl', e.target.value)} className="rounded-xl" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">Lista Esquerda (Linha a linha)</label>
                          <Textarea 
                            value={flyer.listaEsquerda.join('\n')} 
                            onChange={(e) => updateFlyer(flyer.id, 'listaEsquerda', e.target.value.split('\n'))}
                            className="rounded-xl h-32"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">Lista Direita (Linha a linha)</label>
                          <Textarea 
                            value={flyer.listaDireita.join('\n')} 
                            onChange={(e) => updateFlyer(flyer.id, 'listaDireita', e.target.value.split('\n'))}
                            className="rounded-xl h-32"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
