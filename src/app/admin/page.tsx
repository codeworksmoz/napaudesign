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
import { Plus, Trash2, Save, GraduationCap, Image as ImageIcon, Home, Users, Printer, Edit3, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Project, Flyer, HomeContent, Category, Registration } from '@/lib/portfolio-data';
import { supabase } from '@/lib/supabase';
import { ImageUpload } from '@/components/admin/ImageUpload';

export default function AdminPage() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [home, setHome] = useState<HomeContent>({
    heroTitle: '',
    heroSubtitle: '',
    heroImage: '',
    serviceBoloDesc: '',
    serviceCamisetaDesc: '',
    serviceFormacaoDesc: '',
  });
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [carregando, setCarregando] = useState(true);

  // ✅ Carregar tudo do Supabase
  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    setCarregando(true);
    try {
      // Projetos
      const { data: projetosData } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (projetosData) {
        setProjects(projetosData as Project[]);
      }

      // Flyers
      const { data: flyersData } = await supabase
        .from('flyers')
        .select('*')
        .order('created_at', { ascending: false });

      if (flyersData) {
        setFlyers(flyersData as Flyer[]);
      }

      // Inscrições
      const { data: regsData } = await supabase
        .from('registrations')
        .select('*')
        .order('registrationDate', { ascending: false });

      if (regsData) {
        setRegistrations(regsData as Registration[]);
      }

      // Home
      const { data: homeData } = await supabase
        .from('home_content')
        .select('*')
        .single();

      if (homeData) {
        setHome({
          heroTitle: homeData.heroTitle || '',
          heroSubtitle: homeData.heroSubtitle || '',
          heroImage: homeData.heroImage || '',
          serviceBoloDesc: homeData.serviceBoloDesc || '',
          serviceCamisetaDesc: homeData.serviceCamisetaDesc || '',
          serviceFormacaoDesc: homeData.serviceFormacaoDesc || '',
        });
      }
    } catch (erro) {
      console.error('Erro ao carregar dados:', erro);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados.",
        variant: "destructive",
      });
    } finally {
      setCarregando(false);
    }
  }

  // ✅ Guardar Home no Supabase
  const saveHome = async () => {
    try {
      const { error } = await supabase
        .from('home_content')
        .upsert({
          id: 1,
          heroTitle: home.heroTitle,
          heroSubtitle: home.heroSubtitle,
          heroImage: home.heroImage,
          serviceBoloDesc: home.serviceBoloDesc,
          serviceCamisetaDesc: home.serviceCamisetaDesc,
          serviceFormacaoDesc: home.serviceFormacaoDesc,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast({ title: "✅ Home atualizada com sucesso!" });
    } catch (erro) {
      console.error('Erro ao guardar home:', erro);
      toast({
        title: "Erro",
        description: "Falha ao guardar. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  // ✅ Guardar/Atualizar Projeto no Supabase
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const projectData: Project = {
      id: editingProject?.id || Date.now().toString(),
      title: formData.get('title') as string,
      category: formData.get('category') as Category,
      description: formData.get('description') as string,
      imageUrl: formData.get('imageUrl') as string,
      year: formData.get('year') as string,
      active: true,
    };

    try {
      const { error } = await supabase
        .from('projects')
        .upsert(projectData);

      if (error) throw error;

      if (editingProject) {
        setProjects(prev => prev.map(p => p.id === editingProject.id ? projectData : p));
        setEditingProject(null);
        toast({ title: "✅ Projeto atualizado!" });
      } else {
        setProjects(prev => [projectData, ...prev]);
        toast({ title: "✅ Projeto adicionado!" });
      }

      (e.target as HTMLFormElement).reset();
    } catch (erro) {
      console.error('Erro ao guardar projeto:', erro);
      toast({
        title: "Erro",
        description: "Falha ao guardar projeto.",
        variant: "destructive",
      });
    }
  };

  // ✅ Deletar Projeto
  const deleteProject = async (id: string) => {
    if (!confirm('Tem certeza que deseja eliminar este projeto?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProjects(prev => prev.filter(p => p.id !== id));
      toast({ title: "🗑️ Projeto removido!" });
    } catch (erro) {
      console.error('Erro ao deletar:', erro);
      toast({
        title: "Erro",
        description: "Falha ao remover projeto.",
        variant: "destructive",
      });
    }
  };

  // ✅ Guardar Flyers
  const saveFlyers = async (newList: Flyer[]) => {
    setFlyers(newList);
    
    try {
      for (const flyer of newList) {
        const { error } = await supabase
          .from('flyers')
          .upsert(flyer);

        if (error) throw error;
      }
      
      toast({ title: "✅ Flyers guardados!" });
    } catch (erro) {
      console.error('Erro ao guardar flyers:', erro);
      toast({
        title: "Erro",
        description: "Falha ao guardar flyers.",
        variant: "destructive",
      });
    }
  };

  // ✅ Adicionar Flyer
  const addFlyer = async () => {
    const newFlyer: Flyer = {
      id: Date.now().toString(),
      titulo: 'Novo Curso',
      preco: '0 MT',
      data: 'DATA',
      local: 'NAPAU',
      contactos: '+258 84 761 5871',
      listaEsquerda: ['Item 1', 'Item 2', 'Item 3'],
      listaDireita: ['Item 4', 'Item 5', 'Item 6'],
      imageUrl: '',
      ativo: true,
    };

    try {
      const { error } = await supabase
        .from('flyers')
        .insert(newFlyer);

      if (error) throw error;

      setFlyers(prev => [newFlyer, ...prev]);
      toast({ title: "✅ Novo flyer criado!" });
    } catch (erro) {
      console.error('Erro ao criar flyer:', erro);
      toast({
        title: "Erro",
        description: "Falha ao criar flyer.",
        variant: "destructive",
      });
    }
  };

  // ✅ Atualizar campo do Flyer (local, guarda depois)
  const updateFlyer = (id: string, field: keyof Flyer, value: any) => {
    setFlyers(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  // ✅ Deletar Flyer
  const deleteFlyer = async (id: string) => {
    if (!confirm('Deseja apagar este flyer?')) return;

    try {
      const { error } = await supabase
        .from('flyers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setFlyers(prev => prev.filter(f => f.id !== id));
      toast({ title: "🗑️ Flyer removido!" });
    } catch (erro) {
      console.error('Erro ao deletar flyer:', erro);
      toast({
        title: "Erro",
        description: "Falha ao remover flyer.",
        variant: "destructive",
      });
    }
  };

  // ✅ Deletar Inscrição
  const deleteRegistration = async (id: string) => {
    if (!confirm('Remover esta inscrição permanentemente?')) return;

    try {
      const { error } = await supabase
        .from('registrations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setRegistrations(prev => prev.filter(r => r.id !== id));
      toast({ title: "🗑️ Inscrição removida!" });
    } catch (erro) {
      console.error('Erro ao deletar inscrição:', erro);
      toast({
        title: "Erro",
        description: "Falha ao remover inscrição.",
        variant: "destructive",
      });
    }
  };

  const printReport = () => {
    window.print();
  };

  if (carregando) {
    return (
      <div className="flex flex-col min-h-screen bg-secondary/5">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="animate-spin mx-auto" size={48} />
            <p className="text-muted-foreground">A carregar painel...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-headline font-bold">Painel de Controlo</h1>
              <p className="text-muted-foreground text-sm">Gestão completa da Napau Design & Arte.</p>
            </div>
          </div>

          <Tabs defaultValue="home" className="space-y-6">
            <TabsList className="bg-white p-1 rounded-xl shadow-sm border h-auto flex flex-wrap gap-1">
              <TabsTrigger value="home" className="rounded-lg py-2.5 px-5 flex gap-2"><Home size={18} /> Home</TabsTrigger>
              <TabsTrigger value="portfolio" className="rounded-lg py-2.5 px-5 flex gap-2"><ImageIcon size={18} /> Portfólio</TabsTrigger>
              <TabsTrigger value="flyers" className="rounded-lg py-2.5 px-5 flex gap-2"><GraduationCap size={18} /> Flyers</TabsTrigger>
              <TabsTrigger value="registrations" className="rounded-lg py-2.5 px-5 flex gap-2"><Users size={18} /> Inscrições</TabsTrigger>
            </TabsList>

            {/* HOME */}
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
                      <label className="text-xs font-bold uppercase">Foto Hero</label>
                      <ImageUpload 
                        valor={home.heroImage} 
                        onChange={(url) => setHome({...home, heroImage: url})} 
                      />
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

            {/* PORTFÓLIO */}
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
                      
                      {/* ✅ Upload de imagem real */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase">Foto do Trabalho</label>
                        <ImageUpload 
                          valor={editingProject?.imageUrl || ''} 
                          onChange={() => {}} 
                        />
                        <Input name="imageUrl" defaultValue={editingProject?.imageUrl} placeholder="Ou cole a URL da foto" className="rounded-xl" />
                      </div>

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

            {/* FLYERS */}
            <TabsContent value="flyers">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">Flyers Digitais</h3>
                  <Button onClick={addFlyer} className="rounded-xl gap-2"><Plus size={18} /> Novo Flyer</Button>
                </div>
                {flyers.map((flyer) => (
                  <Card key={flyer.id} className="border-none shadow-sm rounded-2xl bg-white">
                    <CardHeader className="flex flex-row items-center justify-between border-b p-6">
                      <Input value={flyer.titulo} onChange={(e) => updateFlyer(flyer.id, 'titulo', e.target.value)} className="font-bold border-none text-lg" />
                      <div className="flex gap-2">
                        <Button onClick={() => saveFlyers(flyers)} variant="outline" size="icon" className="rounded-xl"><Save size={16} /></Button>
                        <Button onClick={() => deleteFlyer(flyer.id)} variant="ghost" size="icon" className="text-destructive rounded-xl"><Trash2 size={16} /></Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <Input value={flyer.preco} onChange={(e) => updateFlyer(flyer.id, 'preco', e.target.value)} placeholder="Preço" className="rounded-xl" />
                        <Input value={flyer.data} onChange={(e) => updateFlyer(flyer.id, 'data', e.target.value)} placeholder="Data" className="rounded-xl" />
                        <Input value={flyer.local} onChange={(e) => updateFlyer(flyer.id, 'local', e.target.value)} placeholder="Local" className="rounded-xl" />
                        <Input value={flyer.contactos} onChange={(e) => updateFlyer(flyer.id, 'contactos', e.target.value)} placeholder="Contactos" className="rounded-xl" />
                        <ImageUpload 
                          valor={flyer.imageUrl} 
                          onChange={(url) => updateFlyer(flyer.id, 'imageUrl', url)} 
                        />
                      </div>
                      <div className="space-y-4">
                        <Textarea 
                          value={flyer.listaEsquerda.join('\n')} 
                          onChange={(e) => updateFlyer(flyer.id, 'listaEsquerda', e.target.value.split('\n'))} 
                          placeholder="Lista Esquerda (1 item por linha)" 
                          className="rounded-xl h-32" 
                        />
                        <Textarea 
                          value={flyer.listaDireita.join('\n')} 
                          onChange={(e) => updateFlyer(flyer.id, 'listaDireita', e.target.value.split('\n'))} 
                          placeholder="Lista Direita (1 item por linha)" 
                          className="rounded-xl h-32" 
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* INSCRIÇÕES */}
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
                          <TableCell><div className="text-xs">{new Date(r.registrationDate).toLocaleDateString('pt-MZ')}</div></TableCell>
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
