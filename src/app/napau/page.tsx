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
import { Trash2, Edit3, Settings, Loader2, MessageCircle, Plus, Image as ImageIcon, Copy, Check, RefreshCw, X, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Project, Flyer, HomeContent, DEFAULT_HOME_CONTENT, Category, Registration, OFFICIAL_IMAGE } from '@/lib/portfolio-data';
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
  const [tempImageUrl, setTempImageUrl] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

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
          heroTitle: homeData.heroTitle || '',
          heroSubtitle: homeData.heroSubtitle || '',
          heroImage: homeData.heroImage || '',
          serviceBoloDesc: homeData.serviceBoloDesc || '',
          serviceBoloImages: homeData.serviceBoloImages || [],
          serviceCamisetaDesc: homeData.serviceCamisetaDesc || '',
          serviceCamisetaImages: homeData.serviceCamisetaImages || [],
          serviceFormacaoDesc: homeData.serviceFormacaoDesc || '',
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
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' },
      });

      if (data) {
        const files = data.map(file => ({
          name: file.name,
          url: supabase.storage.from('produtos').getPublicUrl(file.name).data.publicUrl
        }));
        setLibrary(files);
      }
    } catch (e) {
      console.error(e);
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
        toast({ title: "Erro de Acesso", description: "Credenciais inválidas.", variant: "destructive" });
      } else {
        toast({ title: "Bem-vindo!", description: "Acesso autorizado à Codworks Console." });
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
    toast({ title: "Sessão Terminada" });
  };

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
          serviceBoloImages: home.serviceBoloImages,
          serviceCamisetaDesc: home.serviceCamisetaDesc,
          serviceCamisetaImages: home.serviceCamisetaImages,
          serviceFormacaoDesc: home.serviceFormacaoDesc,
        });

      if (error) throw error;
      toast({ title: "✅ Home atualizada com sucesso!" });
    } catch (e: any) {
      toast({ title: "Erro ao salvar", description: e.message, variant: "destructive" });
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const projectData = {
      title: (formData.get('title') as string) || '',
      category: (formData.get('category') as Category) || 'Topos de Bolo',
      description: (formData.get('description') as string) || '',
      imageurl: tempImageUrl || editingProject?.imageurl || OFFICIAL_IMAGE,
      year: (formData.get('year') as string) || new Date().getFullYear().toString(),
      client_name: (formData.get('client_name') as string) || '',
      materials: (formData.get('materials') as string) || '',
      active: true
    };

    try {
      if (editingProject) {
        const { error } = await supabase.from('projects').update(projectData).eq('id', editingProject.id);
        if (error) throw error;
        toast({ title: "Trabalho atualizado!" });
      } else {
        const { error } = await supabase.from('projects').insert(projectData);
        if (error) throw error;
        toast({ title: "Novo trabalho publicado!" });
      }
      setEditingProject(null);
      setTempImageUrl('');
      carregarDados();
    } catch (e: any) {
      toast({ title: "Erro", description: e.message, variant: "destructive" });
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Eliminar do portfólio?')) return;
    try {
      await supabase.from('projects').delete().eq('id', id);
      carregarDados();
      toast({ title: "Removido do portfólio." });
    } catch (e) {
      toast({ title: "Erro ao remover", variant: "destructive" });
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    toast({ title: "Link copiado!" });
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const addImageToCarousel = (type: 'bolo' | 'camiseta', url: string) => {
    if (!url) return;
    if (type === 'bolo') {
      const current = home.serviceBoloImages || [];
      setHome({ ...home, serviceBoloImages: [...current, url] });
    } else {
      const current = home.serviceCamisetaImages || [];
      setHome({ ...home, serviceCamisetaImages: [...current, url] });
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
      <div className="min-h-screen flex items-center justify-center bg-secondary/10 p-4">
        <Card className="w-full max-w-md border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
          <div className="bg-primary p-10 flex flex-col items-center gap-4 text-white">
            <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md">
              <Logo size={80} className="brightness-0 invert" />
            </div>
            <h1 className="text-2xl font-headline font-bold">Codworks Console</h1>
            <p className="text-[10px] uppercase font-bold tracking-widest opacity-80">Gestão Napau</p>
          </div>
          <CardContent className="p-10 space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <Input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required placeholder="E-mail Admin" className="h-14 rounded-2xl" />
              <Input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required placeholder="Password" className="h-14 rounded-2xl" />
              <Button type="submit" disabled={loggingIn} className="w-full h-14 rounded-2xl text-lg font-bold gold-shimmer">
                {loggingIn ? <Loader2 className="animate-spin" /> : 'Aceder'}
              </Button>
            </form>
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline mx-auto block">Problemas de Acesso? Suporte Codworks</button>
              </DialogTrigger>
              <DialogContent className="rounded-3xl border-none shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-primary font-headline text-2xl">Suporte Codworks</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <p className="text-sm text-muted-foreground italic">Garantimos assistência técnica no prazo de 48h.</p>
                  <div className="space-y-3">
                    <Button asChild variant="outline" className="w-full h-12 rounded-xl gap-2 border-primary text-primary hover:bg-primary/5">
                      <a href="https://wa.me/258855920773" target="_blank"><MessageCircle size={18} /> WhatsApp Codworks</a>
                    </Button>
                    <Button asChild variant="ghost" className="w-full h-12 rounded-xl gap-2 text-muted-foreground">
                      <a href="mailto:codworksmoz@gmail.com"><ImageIcon size={18} /> Email: codworksmoz@gmail.com</a>
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      <Navbar />
      <main className="flex-grow pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white"><Settings /></div>
              <div>
                <h1 className="text-2xl font-headline font-bold">Consola Codworks</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Napau Design & Arte</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" className="rounded-xl border-destructive text-destructive hover:bg-destructive/5">Sair</Button>
          </div>

          <Tabs defaultValue="home" className="space-y-6">
            <TabsList className="bg-white p-1 rounded-2xl shadow-sm border h-auto flex gap-1 overflow-x-auto no-scrollbar">
              <TabsTrigger value="home" className="rounded-xl py-4 flex-1">Home</TabsTrigger>
              <TabsTrigger value="portfolio" className="rounded-xl py-4 flex-1">Portfólio</TabsTrigger>
              <TabsTrigger value="library" className="rounded-xl py-4 flex-1">Biblioteca</TabsTrigger>
              <TabsTrigger value="flyers" className="rounded-xl py-4 flex-1">Cursos</TabsTrigger>
              <TabsTrigger value="registrations" className="rounded-xl py-4 flex-1">Inscrições</TabsTrigger>
            </TabsList>

            <TabsContent value="home">
              <Card className="rounded-[2rem] border-none shadow-xl overflow-hidden">
                <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center bg-secondary/5 p-8 border-b gap-4">
                  <div>
                    <CardTitle className="text-xl">Conteúdo da Página Inicial</CardTitle>
                    <p className="text-xs text-muted-foreground">Personalize o que os seus clientes veem ao entrar no site.</p>
                  </div>
                  <Button onClick={saveHome} className="gold-shimmer px-8 rounded-xl w-full md:w-auto">Guardar Alterações</Button>
                </CardHeader>
                <CardContent className="p-8 space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground">Título de Impacto (Hero)</label>
                        <Input 
                          value={home.heroTitle || ''} 
                          onChange={(e) => setHome({...home, heroTitle: e.target.value})} 
                          className="rounded-xl" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground">Subtítulo Descritivo</label>
                        <Textarea 
                          value={home.heroSubtitle || ''} 
                          onChange={(e) => setHome({...home, heroSubtitle: e.target.value})} 
                          className="rounded-xl resize-none h-32" 
                        />
                      </div>
                    </div>
                    <ImageUpload 
                      label="Imagem de Fundo Principal" 
                      valor={home.heroImage || ''} 
                      onChange={(url) => setHome({...home, heroImage: url})} 
                    />
                  </div>

                  <div className="border-t pt-8 space-y-6">
                    <div className="flex items-center gap-2 text-primary">
                      <Plus size={20}/>
                      <h4 className="font-bold uppercase text-sm tracking-widest">Serviço: Topos de Bolo</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="text-xs font-bold uppercase text-muted-foreground">Descrição do Serviço</label>
                        <Textarea 
                          value={home.serviceBoloDesc || ''} 
                          onChange={(e) => setHome({...home, serviceBoloDesc: e.target.value})} 
                          className="rounded-xl h-40" 
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-xs font-bold uppercase text-muted-foreground">Galeria do Carrossel</label>
                        <div className="grid grid-cols-3 gap-2">
                          {home.serviceBoloImages?.map((img, idx) => (
                            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border">
                              <Image src={img} alt="Bolo" fill className="object-cover" />
                              <button onClick={() => removeImageFromCarousel('bolo', idx)} className="absolute top-1 right-1 bg-destructive text-white p-1 rounded-full shadow-lg"><X size={10} /></button>
                            </div>
                          ))}
                          <Dialog>
                            <DialogTrigger asChild><button className="aspect-square rounded-lg border-2 border-dashed flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary"><Plus size={20} /></button></DialogTrigger>
                            <DialogContent className="rounded-3xl">
                              <DialogHeader><DialogTitle>Adicionar Foto</DialogTitle></DialogHeader>
                              <div className="space-y-4 py-4">
                                <Input id="new-img-bolo" placeholder="Cole o URL aqui" className="rounded-xl" />
                                <Button className="w-full rounded-xl" onClick={() => {
                                  const input = document.getElementById('new-img-bolo') as HTMLInputElement;
                                  addImageToCarousel('bolo', input.value);
                                  input.value = '';
                                }}>Adicionar</Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-8 space-y-6">
                    <div className="flex items-center gap-2 text-primary">
                      <Plus size={20}/>
                      <h4 className="font-bold uppercase text-sm tracking-widest">Serviço: Camisetas</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="text-xs font-bold uppercase text-muted-foreground">Descrição do Serviço</label>
                        <Textarea 
                          value={home.serviceCamisetaDesc || ''} 
                          onChange={(e) => setHome({...home, serviceCamisetaDesc: e.target.value})} 
                          className="rounded-xl h-40" 
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-xs font-bold uppercase text-muted-foreground">Galeria do Carrossel</label>
                        <div className="grid grid-cols-3 gap-2">
                          {home.serviceCamisetaImages?.map((img, idx) => (
                            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border">
                              <Image src={img} alt="Camiseta" fill className="object-cover" />
                              <button onClick={() => removeImageFromCarousel('camiseta', idx)} className="absolute top-1 right-1 bg-destructive text-white p-1 rounded-full shadow-lg"><X size={10} /></button>
                            </div>
                          ))}
                          <Dialog>
                            <DialogTrigger asChild><button className="aspect-square rounded-lg border-2 border-dashed flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary"><Plus size={20} /></button></DialogTrigger>
                            <DialogContent className="rounded-3xl">
                              <DialogHeader><DialogTitle>Adicionar Foto</DialogTitle></DialogHeader>
                              <div className="space-y-4 py-4">
                                <Input id="new-img-camiseta" placeholder="Cole o URL aqui" className="rounded-xl" />
                                <Button className="w-full rounded-xl" onClick={() => {
                                  const input = document.getElementById('new-img-camiseta') as HTMLInputElement;
                                  addImageToCarousel('camiseta', input.value);
                                  input.value = '';
                                }}>Adicionar</Button>
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
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <Card className="lg:col-span-4 rounded-[2rem] p-8 border-none shadow-lg bg-white h-fit">
                  <h3 className="font-bold mb-6 uppercase text-[10px] tracking-widest text-primary flex items-center gap-2">
                    {editingProject ? <Edit3 size={14}/> : <Plus size={14}/>} {editingProject ? 'Editar Projeto' : 'Novo Projeto'}
                  </h3>
                  <form onSubmit={handleProjectSubmit} className="space-y-5">
                    <Input name="title" value={editingProject?.title || ''} onChange={(e) => editingProject && setEditingProject({...editingProject, title: e.target.value})} placeholder="Título do Trabalho" required className="rounded-xl" />
                    <select name="category" value={editingProject?.category || 'Topos de Bolo'} onChange={(e) => editingProject && setEditingProject({...editingProject, category: e.target.value as Category})} className="w-full p-3 border rounded-xl bg-white text-sm">
                      <option value="Topos de Bolo">Topos de Bolo</option>
                      <option value="Camisetas">Camisetas</option>
                    </select>
                    <ImageUpload 
                      label="Foto Principal" 
                      valor={tempImageUrl || editingProject?.imageurl || ''} 
                      onChange={(url) => {
                        setTempImageUrl(url);
                        if (editingProject) setEditingProject({...editingProject, imageurl: url});
                      }} 
                    />
                    <Input name="year" value={editingProject?.year || ''} onChange={(e) => editingProject && setEditingProject({...editingProject, year: e.target.value})} placeholder="Ano" className="rounded-xl" />
                    <Input name="client_name" value={editingProject?.client_name || ''} onChange={(e) => editingProject && setEditingProject({...editingProject, client_name: e.target.value})} placeholder="Cliente (Opcional)" className="rounded-xl" />
                    <Input name="materials" value={editingProject?.materials || ''} onChange={(e) => editingProject && setEditingProject({...editingProject, materials: e.target.value})} placeholder="Materiais" className="rounded-xl" />
                    <Textarea name="description" value={editingProject?.description || ''} onChange={(e) => editingProject && setEditingProject({...editingProject, description: e.target.value})} placeholder="Descrição..." className="rounded-xl resize-none h-24" />
                    <Button type="submit" className="w-full rounded-xl gold-shimmer h-12 font-bold">
                      {editingProject ? 'Atualizar' : 'Publicar'}
                    </Button>
                    {editingProject && <Button type="button" variant="ghost" onClick={() => { setEditingProject(null); setTempImageUrl(''); }} className="w-full">Cancelar</Button>}
                  </form>
                </Card>
                <Card className="lg:col-span-8 rounded-[2rem] border-none shadow-lg overflow-hidden bg-white">
                  <Table>
                    <TableHeader className="bg-secondary/5">
                      <TableRow>
                        <TableHead>Trabalho</TableHead>
                        <TableHead>Detalhes</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects.map(p => (
                        <TableRow key={p.id}>
                          <TableCell className="font-bold text-primary">{p.title}</TableCell>
                          <TableCell className="text-[10px] uppercase font-medium">
                            {p.category} | {p.year}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => { setEditingProject(p); setTempImageUrl(p.imageurl); }} className="text-primary hover:bg-primary/10"><Edit3 size={16}/></Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => deleteProject(p.id)}><Trash2 size={16}/></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="library">
              <Card className="rounded-[2rem] border-none shadow-xl overflow-hidden bg-white">
                <CardHeader className="flex flex-row justify-between items-center p-8 border-b">
                  <div><CardTitle className="text-xl">Biblioteca</CardTitle></div>
                  <Button onClick={carregarBiblioteca} disabled={loadingLibrary} variant="outline" className="rounded-xl gap-2"><RefreshCw className={loadingLibrary ? "animate-spin" : ""} size={16} /> Atualizar</Button>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {library.map((file, idx) => (
                      <div key={idx} className="group flex flex-col bg-secondary/5 rounded-2xl overflow-hidden border">
                        <div className="relative aspect-square">
                          <Image src={file.url} alt={file.name} fill className="object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button size="sm" variant="secondary" onClick={() => copyToClipboard(file.url)} className="rounded-lg gap-2">{copiedUrl === file.url ? <Check size={14} /> : <Copy size={14} />} Link</Button>
                          </div>
                        </div>
                        <div className="p-3 bg-white">
                          <Button variant="outline" size="sm" className="w-full text-[10px] h-8 rounded-lg uppercase font-bold" onClick={() => copyToClipboard(file.url)}>Copiar URL</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="flyers">
              <div className="space-y-4">
                <Button onClick={async () => {
                  const newFlyer = {
                    titulo: 'Novo Curso',
                    preco: '0 MT',
                    data: 'A anunciar',
                    local: 'Estúdio Napau',
                    contactos: '+258 84 761 5871',
                    listaesquerda: ['Técnica base'],
                    listadireita: ['Acabamento'],
                    imageurl: OFFICIAL_IMAGE,
                    ativo: false
                  };
                  await supabase.from('flyers').insert(newFlyer);
                  carregarDados();
                }} className="gold-shimmer rounded-xl h-12 px-8 font-bold">Novo Flyer</Button>
                <div className="grid grid-cols-1 gap-4">
                  {flyers.map(f => (
                    <Card key={f.id} className="rounded-[2rem] p-6 border-none shadow-lg flex flex-col md:flex-row justify-between items-center gap-6 bg-white">
                      <div className="flex-1 space-y-4 w-full">
                        <Input value={f.titulo || ''} className="font-bold text-primary rounded-xl" onChange={(e) => setFlyers(flyers.map(item => item.id === f.id ? {...item, titulo: e.target.value} : item))} />
                        <ImageUpload valor={f.imageurl || ''} onChange={(url) => setFlyers(flyers.map(item => item.id === f.id ? {...item, imageurl: url} : item))} />
                      </div>
                      <div className="flex flex-col gap-2 w-full md:w-auto">
                        <Button onClick={async () => { await supabase.from('flyers').upsert(f); carregarDados(); }} className="rounded-xl gold-shimmer">Gravar</Button>
                        <Button variant="outline" className="rounded-xl" onClick={() => setFlyers(flyers.map(item => item.id === f.id ? {...item, ativo: !f.ativo} : item))}>{f.ativo ? 'Ocultar' : 'Ativar'}</Button>
                        <Button variant="ghost" className="text-destructive rounded-xl" onClick={async () => { if(confirm('Apagar?')) { await supabase.from('flyers').delete().eq('id', f.id); carregarDados(); } }}>Apagar</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="registrations">
              <Card className="rounded-[2rem] border-none shadow-lg overflow-hidden bg-white">
                <Table>
                  <TableHeader className="bg-secondary/5">
                    <TableRow>
                      <TableHead>Aluno</TableHead>
                      <TableHead>Curso</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registrations.map(r => (
                      <TableRow key={r.id}>
                        <TableCell><span className="font-bold">{r.studentname}</span></TableCell>
                        <TableCell className="text-sm">{r.coursetitle}</TableCell>
                        <TableCell>
                          <select value={r.status} className="bg-transparent border-none text-xs font-bold text-primary" onChange={async (e) => { await supabase.from('registrations').update({ status: e.target.value }).eq('id', r.id); carregarDados(); }}>
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
