
"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash2, Save, GraduationCap, Image as ImageIcon, Home, Users, Printer, Edit3, Settings, Loader2, LogIn, LogOut, Lock, MessageCircle, Mail, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Project, Flyer, HomeContent, DEFAULT_HOME_CONTENT, Category, Registration } from '@/lib/portfolio-data';
import { supabase } from '@/lib/supabase';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { Logo } from '@/components/Logo';

export default function NapauAdminPage() {
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Estados do Suporte
  const [supportName, setSupportName] = useState('');
  const [supportIssue, setSupportIssue] = useState('');

  const [projects, setProjects] = useState<Project[]>([]);
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [home, setHome] = useState<HomeContent>(DEFAULT_HOME_CONTENT);
  const [carregando, setCarregando] = useState(true);
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
      const { data: homeData } = await supabase.from('home_content').select('*').maybeSingle();
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    if (error) {
      toast({
        title: "Erro de Acesso",
        description: "Credenciais inválidas. Verifique os seus dados.",
        variant: "destructive",
      });
    } else {
      toast({ title: "Bem-vindo!", description: "Acesso autorizado com sucesso." });
    }
    setLoggingIn(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const handleSupportEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Suporte Napau: Problema de Acesso - ${supportName}`);
    const body = encodeURIComponent(`Olá CodeWorks,\n\nEstou com dificuldades em aceder ao painel administrativo da Napau.\n\nDetalhes:\nNome: ${supportName}\nEmail usado: ${loginEmail}\nProblema: ${supportIssue}\n\nSolicito suporte para restabelecer o acesso.`);
    window.location.href = `mailto:codeworksmoz@gmail.com?subject=${subject}&body=${body}`;
    toast({ title: "A abrir Gmail...", description: "Prepare o envio do seu e-mail de suporte." });
  };

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
        toast({ title: "Trabalho atualizado!" });
      } else {
        const { error } = await supabase.from('projects').insert(projectData);
        if (error) throw error;
        toast({ title: "Novo trabalho publicado!" });
      }
      setEditingProject(null);
      (e.target as HTMLFormElement).reset();
      carregarDados();
    } catch (e: any) {
      toast({ title: "Erro ao salvar", description: e.message, variant: "destructive" });
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Eliminar este trabalho do portfólio?')) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      carregarDados();
      toast({ title: "Trabalho removido." });
    } catch (e: any) {
      toast({ title: "Erro ao apagar", description: e.message, variant: "destructive" });
    }
  };

  const saveFlyer = async (flyer: Flyer) => {
    try {
      const { error } = await supabase.from('flyers').upsert(flyer);
      if (error) throw error;
      toast({ title: "Dados do curso guardados!" });
      carregarDados();
    } catch (e: any) {
      toast({ title: "Erro ao salvar flyer", description: e.message, variant: "destructive" });
    }
  };

  const addFlyer = async () => {
    const newFlyer = {
      titulo: 'Novo Curso de Personalização',
      preco: '0 MT',
      data: 'A definir',
      local: 'Estúdio Napau',
      contactos: '+258 84 761 5871',
      listaEsquerda: ['Design de Topos', 'Técnicas Base'],
      listaDireita: ['Estamparia Térmica', 'Acabamentos'],
      imageUrl: '',
      ativo: false
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
    if (!confirm('Apagar este curso permanentemente?')) return;
    try {
      const { error } = await supabase.from('flyers').delete().eq('id', id);
      if (error) throw error;
      carregarDados();
    } catch (e: any) {
      console.error(e);
    }
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/10 p-4">
        <Card className="w-full max-w-md border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
          <div className="bg-primary p-10 flex flex-col items-center gap-4 text-white">
            <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md">
              <Logo size={80} className="brightness-0 invert" />
            </div>
            <div className="text-center space-y-1">
              <h1 className="text-2xl font-headline font-bold">Gestão Napau</h1>
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-80">Login Administrativo</p>
            </div>
          </div>
          <CardContent className="p-10 space-y-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">E-mail</label>
                <div className="relative">
                  <Input 
                    type="email" 
                    value={loginEmail} 
                    onChange={(e) => setLoginEmail(e.target.value)} 
                    required 
                    placeholder="admin@napau.co.mz"
                    className="pl-10 h-14 rounded-2xl border-secondary"
                  />
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Palavra-passe</label>
                <div className="relative">
                  <Input 
                    type="password" 
                    value={loginPassword} 
                    onChange={(e) => setLoginPassword(e.target.value)} 
                    required 
                    placeholder="••••••••"
                    className="pl-10 h-14 rounded-2xl border-secondary"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                </div>
              </div>
              <Button 
                type="submit" 
                disabled={loggingIn} 
                className="w-full h-14 rounded-2xl text-lg font-bold gold-shimmer shadow-lg"
              >
                {loggingIn ? <Loader2 className="animate-spin" /> : <span className="flex items-center gap-2">Aceder ao Painel <LogIn size={20} /></span>}
              </Button>
            </form>

            <div className="pt-6 border-t border-secondary/20 text-center">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline flex items-center justify-center gap-2 mx-auto">
                    <HelpCircle size={14} /> Problemas de Acesso? Suporte CodeWorks
                  </button>
                </DialogTrigger>
                <DialogContent className="rounded-[2rem] sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-headline text-primary">Suporte Técnico CodeWorks</DialogTitle>
                    <DialogDescription className="text-xs uppercase tracking-widest font-bold text-muted-foreground mt-2">
                      Assistência garantida em até 48 horas.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSupportEmail} className="space-y-6 py-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest">Seu Nome</label>
                      <Input 
                        required 
                        value={supportName} 
                        onChange={(e) => setSupportName(e.target.value)}
                        placeholder="Nome do administrador"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest">Descreva o Problema</label>
                      <Textarea 
                        required 
                        value={supportIssue} 
                        onChange={(e) => setSupportIssue(e.target.value)}
                        placeholder="Ex: Não consigo recuperar a password..."
                        className="rounded-xl resize-none h-24"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Button type="submit" className="rounded-xl h-12 gap-2 font-bold bg-primary hover:bg-primary/90">
                        <Mail size={18} /> Enviar via Gmail
                      </Button>
                      <Button asChild variant="outline" className="rounded-xl h-12 gap-2 font-bold border-green-500 text-green-600 hover:bg-green-50">
                        <a 
                          href="https://wa.me/258855920773?text=Olá CodeWorks! Preciso de suporte no painel administrativo da Napau Design." 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <MessageCircle size={18} /> WhatsApp Direto
                        </a>
                      </Button>
                    </div>
                  </form>
                  <div className="text-center pt-2">
                    <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest italic">
                      Desenvolvido por CodeWorks (codeworksmoz@gmail.com)
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      <Navbar />
      <main className="flex-grow pt-28 pb-16 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Settings size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-headline font-bold text-foreground tracking-tight">Consola Napau</h1>
                <p className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] font-bold">Gestão de Topos de Bolo & Camisetas</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" className="rounded-xl gap-2 border-destructive/20 text-destructive hover:bg-destructive hover:text-white transition-all font-bold">
              <LogOut size={18} /> Terminar Sessão
            </Button>
          </div>

          <Tabs defaultValue="home" className="space-y-6">
            <TabsList className="bg-white p-1 rounded-2xl shadow-sm border h-auto flex flex-wrap gap-1">
              <TabsTrigger value="home" className="rounded-xl py-4 px-8 flex gap-2 font-bold"><Home size={18} /> Home</TabsTrigger>
              <TabsTrigger value="portfolio" className="rounded-xl py-4 px-8 flex gap-2 font-bold"><ImageIcon size={18} /> Portfólio</TabsTrigger>
              <TabsTrigger value="flyers" className="rounded-xl py-4 px-8 flex gap-2 font-bold"><GraduationCap size={18} /> Flyers</TabsTrigger>
              <TabsTrigger value="registrations" className="rounded-xl py-4 px-8 flex gap-2 font-bold"><Users size={18} /> Inscrições</TabsTrigger>
            </TabsList>

            <TabsContent value="home" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Card className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between border-b bg-secondary/5 p-8">
                  <div>
                    <CardTitle className="text-2xl font-headline">Configuração Principal</CardTitle>
                    <CardDescription>Ajuste o impacto visual da sua montra digital.</CardDescription>
                  </div>
                  <Button onClick={saveHome} className="bg-primary text-white rounded-xl gap-2 px-10 py-7 font-bold shadow-lg gold-shimmer">
                    <Save size={20} /> Guardar Tudo
                  </Button>
                </CardHeader>
                <CardContent className="p-8 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary px-1">Título Hero</label>
                      <Input value={home.heroTitle} onChange={(e) => setHome({...home, heroTitle: e.target.value})} className="rounded-2xl h-14 border-secondary/40 text-lg font-headline font-bold" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary px-1">Imagem Principal</label>
                      <ImageUpload valor={home.heroImage} onChange={(url) => setHome({...home, heroImage: url})} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary px-1">Subtítulo Estratégico</label>
                    <Textarea value={home.heroSubtitle} onChange={(e) => setHome({...home, heroSubtitle: e.target.value})} className="rounded-2xl h-28 resize-none border-secondary/40 italic text-lg" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-secondary/20">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary px-1">Serviço: Topos de Bolo</label>
                      <Textarea value={home.serviceBoloDesc} onChange={(e) => setHome({...home, serviceBoloDesc: e.target.value})} className="rounded-2xl h-32 resize-none border-secondary/40 text-sm leading-relaxed" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary px-1">Serviço: Camisetas</label>
                      <Textarea value={home.serviceCamisetaDesc} onChange={(e) => setHome({...home, serviceCamisetaDesc: e.target.value})} className="rounded-2xl h-32 resize-none border-secondary/40 text-sm leading-relaxed" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary px-1">Serviço: Formação</label>
                      <Textarea value={home.serviceFormacaoDesc} onChange={(e) => setHome({...home, serviceFormacaoDesc: e.target.value})} className="rounded-2xl h-32 resize-none border-secondary/40 text-sm leading-relaxed" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="portfolio" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <Card className="lg:col-span-4 border-none shadow-xl rounded-[2.5rem] bg-white h-fit overflow-hidden">
                  <CardHeader className="bg-secondary/5 p-8 border-b">
                    <CardTitle className="text-xl font-headline">{editingProject ? 'Editar Trabalho' : 'Novo Trabalho'}</CardTitle>
                    <CardDescription>Adicione peças exclusivas à galeria.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form onSubmit={handleProjectSubmit} className="space-y-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Título</label>
                        <Input name="title" defaultValue={editingProject?.title} placeholder="Ex: Topo de Casamento 3D" required className="rounded-xl h-12" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Categoria</label>
                        <select name="category" defaultValue={editingProject?.category || 'Topos de Bolo'} className="w-full p-3 border rounded-xl bg-white text-sm font-bold outline-none border-secondary/40">
                          <option value="Topos de Bolo">Topos de Bolo</option>
                          <option value="Camisetas">Camisetas</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Ano</label>
                        <Input name="year" defaultValue={editingProject?.year || '2024'} placeholder="Ex: 2024" required className="rounded-xl h-12" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary px-1">Fotografia</label>
                        <ImageUpload 
                          valor={editingProject?.imageUrl || ''} 
                          onChange={(url) => setEditingProject(prev => prev ? {...prev, imageUrl: url} : null)} 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Resumo</label>
                        <Textarea name="description" defaultValue={editingProject?.description} placeholder="Materiais, técnicas usadas..." required className="rounded-xl h-24 resize-none border-secondary/40" />
                      </div>
                      <Button type="submit" className="w-full rounded-2xl py-8 font-bold shadow-md text-lg">
                        {editingProject ? 'Atualizar Peça' : 'Publicar Peça'}
                      </Button>
                      {editingProject && (
                        <Button type="button" variant="ghost" onClick={() => setEditingProject(null)} className="w-full font-bold">Cancelar</Button>
                      )}
                    </form>
                  </CardContent>
                </Card>
                <Card className="lg:col-span-8 border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden">
                  <Table>
                    <TableHeader className="bg-secondary/5">
                      <TableRow className="border-b-secondary/20">
                        <TableHead className="font-bold uppercase text-[10px] tracking-widest p-6">Trabalho</TableHead>
                        <TableHead className="font-bold uppercase text-[10px] tracking-widest">Nicho</TableHead>
                        <TableHead className="text-right font-bold uppercase text-[10px] tracking-widest p-6">Acções</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects.map((p) => (
                        <TableRow key={p.id} className="hover:bg-secondary/5 transition-colors border-b-secondary/10">
                          <TableCell className="p-6">
                            <div className="font-bold text-foreground text-lg">{p.title}</div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{p.year}</div>
                          </TableCell>
                          <TableCell>
                            <span className="text-[9px] bg-primary/10 text-primary px-4 py-1.5 rounded-full font-bold uppercase tracking-widest">
                              {p.category}
                            </span>
                          </TableCell>
                          <TableCell className="text-right p-6">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary" onClick={() => setEditingProject(p)}><Edit3 size={18} /></Button>
                              <Button variant="ghost" size="icon" className="text-destructive rounded-full hover:bg-destructive/10" onClick={() => deleteProject(p.id)}><Trash2 size={18} /></Button>
                            </div>
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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-8 rounded-[2.5rem] shadow-sm border border-secondary/20 gap-4">
                  <div>
                    <h3 className="text-2xl font-bold font-headline">Cursos & Workshops</h3>
                    <p className="text-sm text-muted-foreground">Gerencie as turmas ativas de formação.</p>
                  </div>
                  <Button onClick={addFlyer} className="rounded-2xl gap-2 px-8 py-7 font-bold shadow-lg gold-shimmer h-auto">
                    <Plus size={20} /> Adicionar Novo Flyer
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-8">
                  {flyers.map((flyer) => (
                    <Card key={flyer.id} className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden">
                      <CardHeader className="flex flex-row items-center justify-between border-b bg-secondary/5 p-8">
                        <div className="flex-1 max-w-2xl">
                          <Input 
                            value={flyer.titulo} 
                            onChange={(e) => updateFlyerLocal(flyer.id, 'titulo', e.target.value)} 
                            className="font-headline font-bold border-none text-2xl bg-transparent focus:ring-0 h-auto p-0"
                          />
                        </div>
                        <div className="flex gap-3">
                          <Button onClick={() => saveFlyer(flyer)} className="rounded-2xl gap-2 px-6 h-12 font-bold shadow-md">
                            <Save size={18} /> Gravar
                          </Button>
                          <Button onClick={() => deleteFlyer(flyer.id)} variant="outline" size="icon" className="text-destructive border-destructive/20 rounded-2xl h-12 w-12">
                            <Trash2 size={20} />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-8 grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Preço sugerido</label>
                            <Input value={flyer.preco} onChange={(e) => updateFlyerLocal(flyer.id, 'preco', e.target.value)} className="rounded-xl" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Data Estimada</label>
                            <Input value={flyer.data} onChange={(e) => updateFlyerLocal(flyer.id, 'data', e.target.value)} className="rounded-xl" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Flyer (Capa)</label>
                            <ImageUpload valor={flyer.imageUrl} onChange={(url) => updateFlyerLocal(flyer.id, 'imageUrl', url)} />
                          </div>
                        </div>
                        <div className="md:col-span-2 space-y-6">
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Local</label>
                              <Input value={flyer.local} onChange={(e) => updateFlyerLocal(flyer.id, 'local', e.target.value)} className="rounded-xl" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Contacto</label>
                              <Input value={flyer.contactos} onChange={(e) => updateFlyerLocal(flyer.id, 'contactos', e.target.value)} className="rounded-xl" />
                            </div>
                          </div>
                          <div className="flex items-center gap-3 py-4 border-t">
                            <div className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${flyer.ativo ? 'bg-primary' : 'bg-muted'}`} 
                                 onClick={() => updateFlyerLocal(flyer.id, 'ativo', !flyer.ativo)}>
                              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${flyer.ativo ? 'left-7' : 'left-1'}`} />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest">{flyer.ativo ? 'Visível no Site' : 'Oculto'}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="registrations" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Card className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden print:shadow-none">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b bg-secondary/5 p-8 gap-4 print:hidden">
                  <div>
                    <CardTitle className="text-2xl font-headline">Inscrições</CardTitle>
                    <CardDescription>Lista oficial de alunos registados.</CardDescription>
                  </div>
                  <Button onClick={() => window.print()} variant="outline" className="rounded-2xl h-14 px-8 gap-2 font-bold">
                    <Printer size={20} /> Imprimir Lista
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-secondary/5">
                      <TableRow>
                        <TableHead className="font-bold uppercase text-[10px] tracking-widest p-6">Aluno / ID</TableHead>
                        <TableHead className="font-bold uppercase text-[10px] tracking-widest">Curso</TableHead>
                        <TableHead className="font-bold uppercase text-[10px] tracking-widest">Documentação</TableHead>
                        <TableHead className="text-right font-bold uppercase text-[10px] tracking-widest p-6 print:hidden">Acções</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {registrations.map((r) => (
                        <TableRow key={r.id}>
                          <TableCell className="p-6">
                            <div className="font-bold text-primary">{r.id}</div>
                            <div className="font-headline font-bold">{r.studentName}</div>
                            <div className="text-[10px] text-muted-foreground">{r.studentPhone}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm font-bold">{r.courseTitle}</div>
                            <div className="text-[9px] text-muted-foreground uppercase">{new Date(r.registrationDate).toLocaleDateString()}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-[10px] font-bold uppercase text-primary">{r.docType}</div>
                            <div className="text-[10px] text-muted-foreground">{r.docNumber}</div>
                          </TableCell>
                          <TableCell className="text-right p-6 print:hidden">
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteRegistration(r.id)}>
                              <Trash2 size={18} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
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

  async function deleteRegistration(id: string) {
    if (!confirm('Remover esta inscrição?')) return;
    try {
      const { error } = await supabase.from('registrations').delete().eq('id', id);
      if (error) throw error;
      carregarDados();
    } catch (e: any) {
      console.error(e);
    }
  }
}
