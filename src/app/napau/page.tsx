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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, Edit3, Settings, Loader2, Plus, Image as ImageIcon, Copy, RefreshCw, X, Cake, Shirt, Upload, Filter, Sparkles, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Project, Flyer, HomeContent, DEFAULT_HOME_CONTENT, Registration, OFFICIAL_IMAGE } from '@/lib/portfolio-data';
import { supabase } from '@/lib/supabase';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { Logo } from '@/components/Logo';
import Image from 'next/image';

export default function NapauAdminPage() {
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [home, setHome] = useState<HomeContent>(DEFAULT_HOME_CONTENT);
  const [library, setLibrary] = useState<{name: string, url: string}[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [loadingLibrary, setLoadingLibrary] = useState(false);
  
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingAuth(false);
      if (session) carregarDados();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) carregarDados();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function carregarDados() {
    setCarregando(true);
    try {
      const { data: homeData } = await supabase.from('home_content').select('*').eq('id', 1).maybeSingle();
      if (homeData) {
        setHome({
          ...DEFAULT_HOME_CONTENT,
          ...homeData
        });
      }

      const { data: projData } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (projData) setProjects(projData as Project[]);

      const { data: flyData } = await supabase.from('flyers').select('*').order('created_at', { ascending: false });
      if (flyData) setFlyers(flyData as Flyer[]);

      const { data: regData } = await supabase.from('registrations').select('*').order('created_at', { ascending: false });
      if (regData) setRegistrations(regData as Registration[]);

      carregarBiblioteca();
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setCarregando(false);
    }
  }

  async function carregarBiblioteca() {
    setLoadingLibrary(true);
    try {
      const { data, error } = await supabase.storage.from('produtos').list('', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' },
      });

      if (error) throw error;

      if (data) {
        const files = data.map(file => ({
          name: file.name,
          url: supabase.storage.from('produtos').getPublicUrl(file.name).data.publicUrl
        }));
        setLibrary(files);
      }
    } catch (e: any) {
      console.error('Erro biblioteca:', e.message);
    } finally {
      setLoadingLibrary(false);
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      if (error) {
        toast({ title: "Acesso Negado", description: "Verifique as suas credenciais.", variant: "destructive" });
      } else {
        toast({ title: "Bem-vindo!", description: "Consola Napau iniciada." });
      }
    } catch (err) {
      toast({ title: "Erro Inesperado", variant: "destructive" });
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const saveHome = async () => {
    try {
      const { error } = await supabase
        .from('home_content')
        .upsert({
          id: 1,
          ...home
        });

      if (error) throw error;
      toast({ title: "✅ Home atualizada!" });
    } catch (e: any) {
      toast({ title: "Erro ao salvar", description: e.message, variant: "destructive" });
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Remover este trabalho do portfólio?')) return;
    try {
      await supabase.from('projects').delete().eq('id', id);
      carregarDados();
      toast({ title: "Trabalho removido." });
    } catch (e) {
      toast({ title: "Erro ao eliminar", variant: "destructive" });
    }
  };

  const addImageToCarousel = (type: 'bolo' | 'camiseta', url: string) => {
    if (!url) return;
    if (type === 'bolo') {
      setHome({ ...home, serviceBoloImages: [...(home.serviceBoloImages || []), url] });
    } else {
      setHome({ ...home, serviceCamisetaImages: [...(home.serviceCamisetaImages || []), url] });
    }
  };

  const removeImageFromCarousel = (type: 'bolo' | 'camiseta', index: number) => {
    if (type === 'bolo') {
      const current = [...(home.serviceBoloImages || [])];
      current.splice(index, 1);
      setHome({ ...home, serviceBoloImages: current });
    } else {
      const current = [...(home.serviceCamisetaImages || [])];
      current.splice(index, 1);
      setHome({ ...home, serviceCamisetaImages: current });
    }
  };

  if (loadingAuth) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={48} /></div>;

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] p-4">
        <Card className="w-full max-w-md border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
          <div className="bg-primary p-10 flex flex-col items-center gap-4 text-white">
            <Logo size={80} className="brightness-0 invert opacity-80" />
            <h1 className="text-2xl font-headline font-bold">Consola Napau</h1>
            <p className="text-[10px] uppercase font-bold tracking-widest opacity-80">Gestão Design & Arte</p>
          </div>
          <CardContent className="p-10 space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <Input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required placeholder="E-mail Administrativo" className="h-14 rounded-2xl" />
              <Input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required placeholder="Palavra-passe" className="h-14 rounded-2xl" />
              <Button type="submit" disabled={loggingIn} className="w-full h-14 rounded-2xl text-lg font-bold gold-shimmer">
                {loggingIn ? <Loader2 className="animate-spin" /> : 'Entrar no Sistema'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F4]">
      <Navbar />
      <main className="flex-grow pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg"><Settings /></div>
              <div>
                <h1 className="text-2xl font-headline font-bold text-[#1A1A1A]">Consola Napau</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Gestão de Conteúdo Profissional</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" className="rounded-xl border-destructive text-destructive hover:bg-destructive/5">Sair</Button>
          </div>

          <Tabs defaultValue="home" className="space-y-6">
            <TabsList className="bg-white p-1 rounded-2xl shadow-sm border h-auto flex gap-1 overflow-x-auto no-scrollbar">
              <TabsTrigger value="home" className="rounded-xl py-4 flex-1">Website Home</TabsTrigger>
              <TabsTrigger value="portfolio" className="rounded-xl py-4 flex-1">Trabalhos (Filtros)</TabsTrigger>
              <TabsTrigger value="library" className="rounded-xl py-4 flex-1">Biblioteca</TabsTrigger>
              <TabsTrigger value="flyers" className="rounded-xl py-4 flex-1">Flyers & Cursos</TabsTrigger>
              <TabsTrigger value="registrations" className="rounded-xl py-4 flex-1">Alunos</TabsTrigger>
            </TabsList>

            <TabsContent value="home">
              <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white">
                <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#FAF7F4] p-8 border-b gap-4">
                  <div>
                    <CardTitle className="text-xl font-headline">Configuração da Home</CardTitle>
                    <p className="text-xs text-muted-foreground">Personalize cada texto, título e passo do processo.</p>
                  </div>
                  <Button onClick={saveHome} className="gold-shimmer px-10 h-14 rounded-2xl w-full md:w-auto font-bold text-lg">Guardar Website</Button>
                </CardHeader>
                <CardContent className="p-8 space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Título do Hero</label>
                        <Input value={home.heroTitle || ''} onChange={(e) => setHome({...home, heroTitle: e.target.value})} className="rounded-xl h-12" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Subtítulo do Hero</label>
                        <Textarea value={home.heroSubtitle || ''} onChange={(e) => setHome({...home, heroSubtitle: e.target.value})} className="rounded-xl h-24 resize-none" />
                      </div>
                    </div>
                    <ImageUpload label="Imagem de Fundo (Hero)" valor={home.heroImage || ''} onChange={(url) => setHome({...home, heroImage: url})} />
                  </div>

                  {/* PERSONALIZE SEU EVENTO ADMIN */}
                  <div className="border-t pt-10 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Sparkles size={20}/></div>
                      <h4 className="font-bold uppercase text-sm text-primary tracking-widest">Personalize seu Evento</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Título da Secção</label>
                          <Input value={home.eventTitle || ''} onChange={(e) => setHome({...home, eventTitle: e.target.value})} className="rounded-xl h-12" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Subtítulo (Curto)</label>
                          <Input value={home.eventSubtitle || ''} onChange={(e) => setHome({...home, eventSubtitle: e.target.value})} className="rounded-xl h-12" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Descrição Emocional</label>
                       <Textarea value={home.eventDesc || ''} onChange={(e) => setHome({...home, eventDesc: e.target.value})} className="rounded-xl h-32 resize-none" />
                    </div>
                  </div>

                  {/* CAMISETAS ADMIN */}
                  <div className="border-t pt-10 space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Shirt size={20}/></div>
                      <h4 className="font-bold uppercase text-sm text-primary tracking-widest">Designer de Camisetas</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Título Principal</label>
                          <Input value={home.camisetaTitle || ''} onChange={(e) => setHome({...home, camisetaTitle: e.target.value})} className="rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Descrição Completa</label>
                          <Textarea value={home.camisetaDesc || ''} onChange={(e) => setHome({...home, camisetaDesc: e.target.value})} className="rounded-xl h-48 resize-none" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Galeria Camisetas</label>
                        <div className="grid grid-cols-4 gap-3">
                          {home.serviceCamisetaImages?.map((img, idx) => (
                            <div key={idx} className="group relative aspect-square rounded-xl overflow-hidden border-2 border-primary/10">
                              <Image src={img} alt="Camiseta" fill className="object-cover" />
                              <button onClick={() => removeImageFromCarousel('camiseta', idx)} className="absolute top-1 right-1 bg-destructive text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
                            </div>
                          ))}
                          <Dialog>
                            <DialogTrigger asChild>
                              <button className="aspect-square rounded-xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center text-primary/40 hover:text-primary transition-all">
                                <Plus size={24} />
                                <span className="text-[8px] font-bold uppercase mt-1">Add</span>
                              </button>
                            </DialogTrigger>
                            <DialogContent className="rounded-[2rem]">
                              <DialogHeader><DialogTitle>Adicionar Foto</DialogTitle></DialogHeader>
                              <div className="p-4 space-y-4">
                                <Input id="new-img-camiseta" placeholder="Cole o link da biblioteca..." className="rounded-xl h-12" />
                                <Button className="w-full rounded-xl h-12 gold-shimmer font-bold" onClick={() => {
                                  const el = document.getElementById('new-img-camiseta') as HTMLInputElement;
                                  if (el.value) { addImageToCarousel('camiseta', el.value); el.value = ''; toast({ title: "Adicionada!" }); }
                                }}>Confirmar</Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BOLOS ADMIN */}
                  <div className="border-t pt-10 space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Cake size={20}/></div>
                      <h4 className="font-bold uppercase text-sm text-primary tracking-widest">Topos de Bolo</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Título Principal</label>
                          <Input value={home.boloTitle || ''} onChange={(e) => setHome({...home, boloTitle: e.target.value})} className="rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Introdução Emocional</label>
                          <Textarea value={home.boloDesc || ''} onChange={(e) => setHome({...home, boloDesc: e.target.value})} className="rounded-xl h-24 resize-none" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">O que é Topo de Bolo?</label>
                          <Textarea value={home.boloWhatIs || ''} onChange={(e) => setHome({...home, boloWhatIs: e.target.value})} className="rounded-xl h-32 resize-none" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Tipos & Preços (JSON)</label>
                          <Textarea value={home.boloTypesJson || ''} onChange={(e) => setHome({...home, boloTypesJson: e.target.value})} className="rounded-xl h-48 font-mono text-xs" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Galeria Bolos</label>
                        <div className="grid grid-cols-4 gap-3">
                          {home.serviceBoloImages?.map((img, idx) => (
                            <div key={idx} className="group relative aspect-square rounded-xl overflow-hidden border-2 border-primary/10">
                              <Image src={img} alt="Bolo" fill className="object-cover" />
                              <button onClick={() => removeImageFromCarousel('bolo', idx)} className="absolute top-1 right-1 bg-destructive text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
                            </div>
                          ))}
                          <Dialog>
                            <DialogTrigger asChild>
                              <button className="aspect-square rounded-xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center text-primary/40 hover:text-primary transition-all">
                                <Plus size={24} />
                                <span className="text-[8px] font-bold uppercase mt-1">Add</span>
                              </button>
                            </DialogTrigger>
                            <DialogContent className="rounded-[2rem]">
                              <DialogHeader><DialogTitle>Adicionar Foto</DialogTitle></DialogHeader>
                              <div className="p-4 space-y-4">
                                <Input id="new-img-bolo" placeholder="Cole o link da biblioteca..." className="rounded-xl h-12" />
                                <Button className="w-full rounded-xl h-12 gold-shimmer font-bold" onClick={() => {
                                  const el = document.getElementById('new-img-bolo') as HTMLInputElement;
                                  if (el.value) { addImageToCarousel('bolo', el.value); el.value = ''; toast({ title: "Adicionada!" }); }
                                }}>Confirmar</Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="portfolio">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <Card className="lg:col-span-4 rounded-[2.5rem] p-8 h-fit bg-white shadow-xl border-none">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Filter size={20}/></div>
                    <h3 className="font-headline font-bold text-xl text-primary">{editingProject ? 'Editar Trabalho' : 'Novo Trabalho'}</h3>
                  </div>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const pData = {
                      title: formData.get('title') as string,
                      category: formData.get('category') as string,
                      description: formData.get('description') as string,
                      imageurl: formData.get('imageurl') as string || editingProject?.imageurl || OFFICIAL_IMAGE,
                      year: formData.get('year') as string,
                      active: true
                    };
                    
                    try {
                      if (editingProject) {
                        await supabase.from('projects').update(pData).eq('id', editingProject.id);
                        toast({ title: "Alterações guardadas!" });
                      } else {
                        await supabase.from('projects').insert([{ ...pData, id: crypto.randomUUID() }]);
                        toast({ title: "Trabalho adicionado!" });
                      }
                      setEditingProject(null);
                      carregarDados();
                    } catch (err) {
                      toast({ title: "Erro ao salvar", variant: "destructive" });
                    }
                  }} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Título do Trabalho</label>
                      <Input name="title" defaultValue={editingProject?.title || ''} placeholder="Ex: Topo Casamento Clássico" required className="rounded-xl h-12" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Filtro / Categoria</label>
                      <Input name="category" defaultValue={editingProject?.category || 'Topos de Bolo'} placeholder="Ex: Topos de Bolo" required className="rounded-xl h-12" />
                    </div>

                    <ImageUpload label="Foto do Trabalho" valor={editingProject?.imageurl || ''} onChange={(url) => setEditingProject(prev => prev ? {...prev, imageurl: url} : ({} as any))} />
                    <input type="hidden" name="imageurl" value={editingProject?.imageurl || ''} />

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Ano</label>
                      <Input name="year" defaultValue={editingProject?.year || new Date().getFullYear().toString()} className="rounded-xl h-12" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Descrição Breve</label>
                      <Textarea name="description" defaultValue={editingProject?.description || ''} placeholder="Detalhes técnicos..." className="rounded-xl h-24 resize-none" />
                    </div>

                    <Button type="submit" className="w-full h-14 rounded-xl gold-shimmer font-bold text-lg">
                      {editingProject ? 'Guardar Alterações' : 'Publicar no Portfólio'}
                    </Button>
                    {editingProject && <Button type="button" variant="ghost" onClick={() => setEditingProject(null)} className="w-full h-12 rounded-xl">Cancelar</Button>}
                  </form>
                </Card>

                <Card className="lg:col-span-8 rounded-[2.5rem] overflow-hidden bg-white shadow-xl border-none">
                  <div className="p-8 border-b bg-[#FAF7F4]">
                    <h3 className="font-headline font-bold text-xl">Filtros Atuais</h3>
                  </div>
                  <Table>
                    <TableHeader className="bg-secondary/5">
                      <TableRow>
                        <TableHead>Trabalho</TableHead>
                        <TableHead>Filtro</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects.map(p => (
                        <TableRow key={p.id} className="hover:bg-secondary/5 transition-colors">
                          <TableCell className="font-bold py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg overflow-hidden relative border border-primary/10">
                                <Image src={p.imageurl || OFFICIAL_IMAGE} alt="" fill className="object-cover" />
                              </div>
                              {p.title}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-[9px] font-bold uppercase tracking-widest bg-primary/10 text-primary px-4 py-1.5 rounded-full">
                              {p.category}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => setEditingProject(p)} className="rounded-xl"><Edit3 size={18}/></Button>
                            <Button variant="ghost" size="icon" className="text-destructive rounded-xl" onClick={() => deleteProject(p.id)}><Trash2 size={18}/></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="library">
              <Card className="rounded-[2.5rem] overflow-hidden bg-white shadow-xl border-none">
                <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center p-8 border-b bg-[#FAF7F4] gap-4">
                  <div>
                    <CardTitle className="text-xl font-headline">Biblioteca Napau</CardTitle>
                    <p className="text-xs text-muted-foreground italic">Use estes links nos carrosséis da Home.</p>
                  </div>
                  <div className="flex gap-3 w-full md:w-auto">
                    <Button onClick={carregarBiblioteca} disabled={loadingLibrary} variant="outline" className="rounded-xl h-12 gap-2 bg-white flex-1 md:flex-none">
                      <RefreshCw className={loadingLibrary ? "animate-spin" : ""} size={16} /> Atualizar
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="rounded-xl h-12 gap-2 gold-shimmer flex-1 md:flex-none">
                          <Upload size={16} /> Fazer Upload
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-[2rem]">
                        <DialogHeader><DialogTitle>Enviar Foto</DialogTitle></DialogHeader>
                        <div className="p-4">
                           <ImageUpload valor="" onChange={(url) => { if(url) { carregarBiblioteca(); toast({ title: "Foto salva!" }); } }} />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {library.map((file, idx) => (
                      <div key={idx} className="group relative aspect-square rounded-[2rem] overflow-hidden border-2 border-primary/5 hover:border-primary/20 transition-all bg-[#FAF7F4] shadow-sm">
                        <Image src={file.url} alt={file.name} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 gap-3">
                          <Button size="sm" variant="secondary" onClick={() => {
                            navigator.clipboard.writeText(file.url);
                            toast({ title: "Link Copiado!" });
                          }} className="rounded-xl h-10 w-full gap-2 font-bold"><Copy size={14} /> Copiar Link</Button>
                          <Button size="sm" variant="destructive" onClick={async () => {
                            if(confirm('Eliminar imagem?')) {
                              const { error } = await supabase.storage.from('produtos').remove([file.name]);
                              if(!error) { carregarBiblioteca(); toast({ title: "Eliminado." }); }
                            }
                          }} className="rounded-xl h-10 w-full gap-2 font-bold"><Trash2 size={14} /> Eliminar</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="flyers">
              <div className="space-y-6">
                <Button onClick={async () => {
                  try {
                    const { error } = await supabase.from('flyers').insert({
                      id: crypto.randomUUID(),
                      titulo: 'Novo Curso',
                      preco: '0 MT',
                      data: 'A anunciar',
                      local: 'Maputo',
                      contactos: '+258 84 761 5871',
                      listaesquerda: ['Tópico 1'],
                      listadireita: ['Tópico 2'],
                      imageurl: OFFICIAL_IMAGE,
                      ativo: false
                    });
                    if (error) throw error;
                    carregarDados();
                    toast({ title: "Flyer rascunho criado!" });
                  } catch (e: any) {
                    toast({ title: "Erro", description: e.message, variant: "destructive" });
                  }
                }} className="gold-shimmer rounded-2xl h-14 px-10 font-bold shadow-xl">Novo Flyer de Curso</Button>
                
                <div className="grid grid-cols-1 gap-6">
                  {flyers.map(f => (
                    <Card key={f.id} className="rounded-[2.5rem] p-8 flex flex-col lg:flex-row justify-between items-start gap-10 bg-white shadow-xl border-none">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <div className="space-y-4">
                          <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Título do Evento</label>
                          <Input value={f.titulo || ''} className="font-bold text-primary rounded-xl h-12" onChange={(e) => setFlyers(flyers.map(item => item.id === f.id ? {...item, titulo: e.target.value} : item))} />
                          <ImageUpload label="Foto do Flyer" valor={f.imageurl || ''} onChange={(url) => setFlyers(flyers.map(item => item.id === f.id ? {...item, imageurl: url} : item))} />
                        </div>
                        <div className="space-y-4">
                           <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                               <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Preço</label>
                               <Input value={f.preco} className="rounded-xl h-12" onChange={(e) => setFlyers(flyers.map(item => item.id === f.id ? {...item, preco: e.target.value} : item))} />
                             </div>
                             <div className="space-y-2">
                               <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Data</label>
                               <Input value={f.data} className="rounded-xl h-12" onChange={(e) => setFlyers(flyers.map(item => item.id === f.id ? {...item, data: e.target.value} : item))} />
                             </div>
                           </div>
                           <Input value={f.local} placeholder="Local" className="rounded-xl h-12" onChange={(e) => setFlyers(flyers.map(item => item.id === f.id ? {...item, local: e.target.value} : item))} />
                           <Input value={f.contactos} placeholder="Contactos" className="rounded-xl h-12" onChange={(e) => setFlyers(flyers.map(item => item.id === f.id ? {...item, contactos: e.target.value} : item))} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 w-full lg:w-48">
                        <Button onClick={async () => { 
                          try {
                            const { error } = await supabase.from('flyers').upsert(f); 
                            if(error) throw error;
                            carregarDados(); 
                            toast({ title: "Curso atualizado!" }); 
                          } catch (e: any) { toast({ title: "Erro ao salvar", variant: "destructive" }); }
                        }} className="rounded-xl h-12 gold-shimmer font-bold">Guardar</Button>
                        <Button variant="outline" className={`rounded-xl h-12 font-bold ${f.ativo ? 'text-primary' : 'text-muted-foreground'}`} onClick={() => setFlyers(flyers.map(item => item.id === f.id ? {...item, ativo: !f.ativo} : item))}>
                          {f.ativo ? '✅ Ativo' : '❌ Inativo'}
                        </Button>
                        <Button variant="ghost" className="text-destructive h-12 rounded-xl" onClick={async () => { if(confirm('Apagar?')) { await supabase.from('flyers').delete().eq('id', f.id); carregarDados(); } }}>Apagar</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="registrations">
              <Card className="rounded-[2.5rem] overflow-hidden bg-white shadow-xl border-none">
                <Table>
                  <TableHeader className="bg-secondary/5"><TableRow><TableHead>Aluno</TableHead><TableHead>Curso</TableHead><TableHead>Documento</TableHead><TableHead>Estado</TableHead></TableRow></TableHeader>
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
                            onChange={async (e) => { 
                              await supabase.from('registrations').update({ status: e.target.value }).eq('id', r.id); 
                              carregarDados(); 
                              toast({ title: "Estado atualizado!" });
                            }}
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
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
