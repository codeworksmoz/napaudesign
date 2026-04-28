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
import { Trash2, Edit3, Settings, Loader2, Plus, Image as ImageIcon, Copy, RefreshCw, X, Cake, Shirt, Upload } from 'lucide-react';
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
        toast({ title: "Bem-vindo!", description: "Ligado à Consola Codworks." });
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
      toast({ title: "✅ Website atualizado!" });
    } catch (e: any) {
      toast({ title: "Erro ao salvar", description: e.message, variant: "destructive" });
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Remover este trabalho do portfólio?')) return;
    try {
      await supabase.from('projects').delete().eq('id', id);
      carregarDados();
      toast({ title: "Removido." });
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
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A] p-4">
        <Card className="w-full max-w-md border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
          <div className="bg-primary p-10 flex flex-col items-center gap-4 text-white">
            <Logo size={80} className="brightness-0 invert opacity-80" />
            <h1 className="text-2xl font-headline font-bold">Consola Codworks</h1>
            <p className="text-[10px] uppercase font-bold tracking-widest opacity-80">Administração Napau</p>
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
    <div className="flex flex-col min-h-screen bg-secondary/5">
      <Navbar />
      <main className="flex-grow pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg"><Settings /></div>
              <div>
                <h1 className="text-2xl font-headline font-bold text-[#2A2A2A]">Consola Codworks</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Napau Design & Arte</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" className="rounded-xl border-destructive text-destructive hover:bg-destructive/5">Sair</Button>
          </div>

          <Tabs defaultValue="home" className="space-y-6">
            <TabsList className="bg-white p-1 rounded-2xl shadow-sm border h-auto flex gap-1 overflow-x-auto no-scrollbar">
              <TabsTrigger value="home" className="rounded-xl py-4 flex-1">Gestão Home</TabsTrigger>
              <TabsTrigger value="portfolio" className="rounded-xl py-4 flex-1">Portfólio</TabsTrigger>
              <TabsTrigger value="library" className="rounded-xl py-4 flex-1">Biblioteca</TabsTrigger>
              <TabsTrigger value="flyers" className="rounded-xl py-4 flex-1">Flyers</TabsTrigger>
              <TabsTrigger value="registrations" className="rounded-xl py-4 flex-1">Inscrições</TabsTrigger>
            </TabsList>

            <TabsContent value="home">
              <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white">
                <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center bg-secondary/5 p-8 border-b gap-4">
                  <div>
                    <CardTitle className="text-xl font-headline">Configuração do Website</CardTitle>
                    <p className="text-xs text-muted-foreground">Mantenha a página inicial sempre atualizada.</p>
                  </div>
                  <Button onClick={saveHome} className="gold-shimmer px-10 h-14 rounded-2xl w-full md:w-auto font-bold text-lg">Guardar Alterações</Button>
                </CardHeader>
                <CardContent className="p-8 space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Título Principal (Hero)</label>
                        <Input value={home.heroTitle || ''} onChange={(e) => setHome({...home, heroTitle: e.target.value})} className="rounded-xl h-12" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Subtítulo (Hero)</label>
                        <Textarea value={home.heroSubtitle || ''} onChange={(e) => setHome({...home, heroSubtitle: e.target.value})} className="rounded-xl h-24 resize-none" />
                      </div>
                    </div>
                    <ImageUpload label="Imagem de Fundo Principal" valor={home.heroImage || ''} onChange={(url) => setHome({...home, heroImage: url})} />
                  </div>

                  {/* CARROSSEL BOLOS */}
                  <div className="border-t pt-10 space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Cake size={20}/></div>
                      <h4 className="font-bold uppercase text-sm text-primary tracking-widest">Carrossel: Topos de Bolo</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Descrição do Serviço</label>
                        <Textarea value={home.serviceBoloDesc || ''} onChange={(e) => setHome({...home, serviceBoloDesc: e.target.value})} className="rounded-xl h-32 resize-none" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Fotos da Galeria</label>
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
                                <span className="text-[8px] font-bold uppercase mt-1">Add Foto</span>
                              </button>
                            </DialogTrigger>
                            <DialogContent className="rounded-[2rem]">
                              <DialogHeader><DialogTitle>Adicionar ao Carrossel de Bolos</DialogTitle></DialogHeader>
                              <div className="p-4 space-y-4">
                                <p className="text-xs text-muted-foreground italic">Dica: Carregue a foto na aba <strong>Biblioteca</strong> e cole o link aqui.</p>
                                <Input id="new-img-bolo" placeholder="Link da imagem (https://...)" className="rounded-xl h-12" />
                                <Button className="w-full rounded-xl h-12 gold-shimmer font-bold" onClick={() => {
                                  const el = document.getElementById('new-img-bolo') as HTMLInputElement;
                                  addImageToCarousel('bolo', el.value);
                                  el.value = '';
                                  toast({ title: "Adicionado ao carrossel!" });
                                }}>Confirmar</Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CARROSSEL CAMISETAS */}
                  <div className="border-t pt-10 space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Shirt size={20}/></div>
                      <h4 className="font-bold uppercase text-sm text-primary tracking-widest">Carrossel: Camisetas</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Descrição do Serviço</label>
                        <Textarea value={home.serviceCamisetaDesc || ''} onChange={(e) => setHome({...home, serviceCamisetaDesc: e.target.value})} className="rounded-xl h-32 resize-none" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Fotos da Galeria</label>
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
                                <span className="text-[8px] font-bold uppercase mt-1">Add Foto</span>
                              </button>
                            </DialogTrigger>
                            <DialogContent className="rounded-[2rem]">
                              <DialogHeader><DialogTitle>Adicionar ao Carrossel de Camisetas</DialogTitle></DialogHeader>
                              <div className="p-4 space-y-4">
                                <p className="text-xs text-muted-foreground italic">Dica: Carregue a foto na aba <strong>Biblioteca</strong> e cole o link aqui.</p>
                                <Input id="new-img-camiseta" placeholder="Link da imagem (https://...)" className="rounded-xl h-12" />
                                <Button className="w-full rounded-xl h-12 gold-shimmer font-bold" onClick={() => {
                                  const el = document.getElementById('new-img-camiseta') as HTMLInputElement;
                                  addImageToCarousel('camiseta', el.value);
                                  el.value = '';
                                  toast({ title: "Adicionado ao carrossel!" });
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

            {/* PORTFOLIO */}
            <TabsContent value="portfolio">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <Card className="lg:col-span-4 rounded-[2.5rem] p-8 h-fit bg-white shadow-xl border-none">
                  <h3 className="font-headline font-bold mb-6 text-xl text-primary">{editingProject ? 'Editar Trabalho' : 'Novo Trabalho'}</h3>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const pData = {
                      title: formData.get('title') as string,
                      category: formData.get('category') as Category,
                      description: formData.get('description') as string,
                      imageurl: formData.get('imageurl') as string || editingProject?.imageurl || OFFICIAL_IMAGE,
                      year: formData.get('year') as string,
                      active: true
                    };
                    if (editingProject) {
                      await supabase.from('projects').update(pData).eq('id', editingProject.id);
                    } else {
                      await supabase.from('projects').insert([{ ...pData, id: crypto.randomUUID() }]);
                    }
                    setEditingProject(null);
                    carregarDados();
                    toast({ title: "Portfólio guardado!" });
                  }} className="space-y-5">
                    <Input name="title" defaultValue={editingProject?.title || ''} placeholder="Título do Projeto" required className="rounded-xl h-12" />
                    <select name="category" defaultValue={editingProject?.category || 'Topos de Bolo'} className="w-full h-12 px-4 border rounded-xl text-sm outline-none focus:ring-1 ring-primary">
                      <option value="Topos de Bolo">Topos de Bolo</option>
                      <option value="Camisetas">Camisetas</option>
                    </select>
                    <ImageUpload 
                      label="Foto do Trabalho" 
                      valor={editingProject?.imageurl || ''} 
                      onChange={(url) => setEditingProject(prev => prev ? {...prev, imageurl: url} : null)} 
                    />
                    <input type="hidden" name="imageurl" value={editingProject?.imageurl || ''} />
                    <Input name="year" defaultValue={editingProject?.year || new Date().getFullYear().toString()} placeholder="Ano" className="rounded-xl h-12" />
                    <Textarea name="description" defaultValue={editingProject?.description || ''} placeholder="Breve descrição..." className="rounded-xl h-24 resize-none" />
                    <Button type="submit" className="w-full h-14 rounded-xl gold-shimmer font-bold text-lg">Guardar no Site</Button>
                    {editingProject && <Button type="button" variant="ghost" onClick={() => setEditingProject(null)} className="w-full h-12 rounded-xl">Cancelar</Button>}
                  </form>
                </Card>
                <Card className="lg:col-span-8 rounded-[2.5rem] overflow-hidden bg-white shadow-xl border-none">
                  <Table>
                    <TableHeader className="bg-secondary/5"><TableRow><TableHead>Trabalho</TableHead><TableHead>Categoria</TableHead><TableHead className="text-right">Ações</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {projects.map(p => (
                        <TableRow key={p.id} className="hover:bg-secondary/5 transition-colors">
                          <TableCell className="font-bold py-4">{p.title}</TableCell>
                          <TableCell><span className="text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full">{p.category}</span></TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => setEditingProject(p)} className="rounded-lg hover:bg-primary/10 hover:text-primary"><Edit3 size={16}/></Button>
                            <Button variant="ghost" size="icon" className="text-destructive rounded-lg hover:bg-destructive/10" onClick={() => deleteProject(p.id)}><Trash2 size={16}/></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            </TabsContent>

            {/* BIBLIOTECA DE MÉDIA */}
            <TabsContent value="library">
              <Card className="rounded-[2.5rem] overflow-hidden bg-white shadow-xl border-none">
                <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center p-8 border-b bg-secondary/5 gap-4">
                  <div>
                    <CardTitle className="text-xl font-headline">Biblioteca de Média</CardTitle>
                    <p className="text-xs text-muted-foreground italic">Todas as fotos carregadas no Storage 'produtos'.</p>
                  </div>
                  <div className="flex gap-3 w-full md:w-auto">
                    <Button onClick={carregarBiblioteca} disabled={loadingLibrary} variant="outline" className="rounded-xl h-12 gap-2 bg-white flex-1 md:flex-none">
                      <RefreshCw className={loadingLibrary ? "animate-spin" : ""} size={16} /> 
                      Atualizar
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="rounded-xl h-12 gap-2 gold-shimmer flex-1 md:flex-none">
                          <Upload size={16} /> Fazer Upload
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-[2rem]">
                        <DialogHeader><DialogTitle>Enviar Nova Foto</DialogTitle></DialogHeader>
                        <div className="p-4">
                           <ImageUpload valor="" onChange={(url) => { if(url) { carregarBiblioteca(); toast({ title: "Upload concluído!" }); } }} />
                           <p className="text-[10px] text-muted-foreground mt-4 text-center">Após o upload, a foto aparecerá na lista abaixo. Copie o link para usá-la na Home ou Portfólio.</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  {library.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                      {library.map((file, idx) => (
                        <div key={idx} className="group relative aspect-square rounded-[2rem] overflow-hidden border-2 border-primary/5 hover:border-primary/20 transition-all bg-[#FAF7F4] shadow-sm">
                          <Image src={file.url} alt={file.name} fill className="object-cover" />
                          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 gap-3">
                            <p className="text-[8px] text-white/60 truncate w-full text-center mb-1">{file.name}</p>
                            <Button size="sm" variant="secondary" onClick={() => {
                              navigator.clipboard.writeText(file.url);
                              toast({ title: "Link Copiado!", description: "Cole-o agora na secção desejada." });
                            }} className="rounded-xl h-10 w-full gap-2 font-bold"><Copy size={14} /> Link</Button>
                            <Button size="sm" variant="destructive" onClick={async () => {
                              if(confirm('Eliminar esta imagem permanentemente do servidor?')) {
                                const { error } = await supabase.storage.from('produtos').remove([file.name]);
                                if(!error) { carregarBiblioteca(); toast({ title: "Ficheiro eliminado." }); }
                              }
                            }} className="rounded-xl h-10 w-full gap-2 font-bold"><Trash2 size={14} /> Eliminar</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-secondary/5 rounded-3xl border-2 border-dashed border-primary/10">
                       <ImageIcon size={48} className="mx-auto text-primary/20 mb-4" />
                       <p className="text-muted-foreground">Nenhuma imagem na biblioteca.</p>
                       <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2">Clique em "Fazer Upload" para começar.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* FLYERS */}
            <TabsContent value="flyers">
              <div className="space-y-6">
                <Button onClick={async () => {
                  try {
                    const { error } = await supabase.from('flyers').insert({
                      id: crypto.randomUUID(),
                      titulo: 'Novo Curso / Workshop',
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
                    toast({ title: "Rascunho de Flyer criado!" });
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
                            toast({ title: "Guardado!" }); 
                          } catch (e: any) { toast({ title: "Erro ao salvar", description: e.message, variant: "destructive" }); }
                        }} className="rounded-xl h-12 gold-shimmer font-bold">Guardar</Button>
                        <Button variant="outline" className={`rounded-xl h-12 font-bold ${f.ativo ? 'text-primary' : 'text-muted-foreground'}`} onClick={() => setFlyers(flyers.map(item => item.id === f.id ? {...item, ativo: !f.ativo} : item))}>
                          {f.ativo ? '✅ Ativo' : '❌ Inativo'}
                        </Button>
                        <Button variant="ghost" className="text-destructive h-12 rounded-xl" onClick={async () => { if(confirm('Apagar permanentemente?')) { await supabase.from('flyers').delete().eq('id', f.id); carregarDados(); } }}>Apagar</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* INSCRICOES */}
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