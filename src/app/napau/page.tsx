
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
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
      const { data: homeData } = await supabase.from('home_content').select('*').eq('id', 1).single();
      if (homeData) setHome(homeData);

      const { data: projData } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (projData) setProjects(projData as Project[]);

      const { data: flyData } = await supabase.from('flyers').select('*').order('created_at', { ascending: false });
      if (flyData) setFlyers(flyData as Flyer[]);

      const { data: regData } = await supabase.from('registrations').select('*').order('created_at', { ascending: false });
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
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) {
        toast({
          title: "Erro de Acesso",
          description: "Credenciais inválidas ou e-mail não confirmado.",
          variant: "destructive",
        });
      } else if (data.session) {
        toast({ title: "Bem-vindo", description: "Acesso autorizado ao painel Codworks." });
      }
    } catch (err: any) {
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

  const handleSupportEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Suporte Napau Codworks: ${supportName}`);
    const body = encodeURIComponent(`Nome: ${supportName}\nEmail: ${loginEmail}\nProblema: ${supportIssue}`);
    window.location.href = `mailto:codworksmoz@gmail.com?subject=${subject}&body=${body}`;
    toast({ title: "A abrir Gmail...", description: "Envie o seu pedido de suporte." });
  };

  const saveHome = async () => {
    try {
      const { error } = await supabase
        .from('home_content')
        .upsert({
          id: 1,
          hero_title: home.hero_title,
          hero_subtitle: home.hero_subtitle,
          hero_image: home.hero_image,
          service_bolo_desc: home.service_bolo_desc,
          service_camiseta_desc: home.service_camiseta_desc,
          service_formacao_desc: home.service_formacao_desc,
          updated_at: new Date().toISOString(),
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
      title: formData.get('title') as string,
      category: formData.get('category') as Category,
      description: formData.get('description') as string,
      image_url: editingProject?.image_url || formData.get('image_url') as string,
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
      carregarDados();
    } catch (e: any) {
      toast({ title: "Erro", description: e.message, variant: "destructive" });
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Eliminar do portfólio?')) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      carregarDados();
      toast({ title: "Removido." });
    } catch (e: any) {
      toast({ title: "Erro", variant: "destructive" });
    }
  };

  const saveFlyer = async (flyer: Flyer) => {
    try {
      const { error } = await supabase.from('flyers').upsert({
        ...flyer,
        updated_at: new Date().toISOString()
      });
      if (error) throw error;
      toast({ title: "Curso guardado!" });
      carregarDados();
    } catch (e: any) {
      toast({ title: "Erro ao salvar", variant: "destructive" });
    }
  };

  const addFlyer = async () => {
    const newFlyer = {
      titulo: 'Novo Curso',
      preco: '0 MT',
      data: 'A definir',
      local: 'Estúdio Napau',
      contactos: '+258 84 761 5871',
      lista_esquerda: ['Técnica 1'],
      lista_direita: ['Técnica 2'],
      image_url: '',
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

  if (loadingAuth) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={48} /></div>;

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/10 p-4">
        <Card className="w-full max-w-md border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
          <div className="bg-primary p-10 flex flex-col items-center gap-4 text-white">
            <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md">
              <Logo size={80} className="brightness-0 invert" />
            </div>
            <h1 className="text-2xl font-headline font-bold">Gestão Napau</h1>
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
              <DialogContent className="rounded-3xl">
                <DialogHeader><DialogTitle>Suporte Codworks</DialogTitle></DialogHeader>
                <form onSubmit={handleSupportEmail} className="space-y-4 py-4">
                  <Input required value={supportName} onChange={(e) => setSupportName(e.target.value)} placeholder="Seu Nome" />
                  <Textarea required value={supportIssue} onChange={(e) => setSupportIssue(e.target.value)} placeholder="Descreva o problema" />
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">Gmail</Button>
                    <Button asChild variant="outline" className="flex-1"><a href="https://wa.me/258855920773" target="_blank">WhatsApp</a></Button>
                  </div>
                </form>
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
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white"><Settings /></div>
              <h1 className="text-2xl font-headline font-bold">Consola Codworks</h1>
            </div>
            <Button onClick={handleLogout} variant="outline" className="rounded-xl border-destructive text-destructive">Sair</Button>
          </div>

          <Tabs defaultValue="home" className="space-y-6">
            <TabsList className="bg-white p-1 rounded-2xl shadow-sm border h-auto flex gap-1">
              <TabsTrigger value="home" className="rounded-xl py-4 flex-1">Home</TabsTrigger>
              <TabsTrigger value="portfolio" className="rounded-xl py-4 flex-1">Portfólio</TabsTrigger>
              <TabsTrigger value="flyers" className="rounded-xl py-4 flex-1">Cursos</TabsTrigger>
              <TabsTrigger value="registrations" className="rounded-xl py-4 flex-1">Inscrições</TabsTrigger>
            </TabsList>

            <TabsContent value="home">
              <Card className="rounded-[2rem] border-none shadow-xl overflow-hidden">
                <CardHeader className="flex flex-row justify-between items-center bg-secondary/5 p-8 border-b">
                  <CardTitle>Conteúdo do Site</CardTitle>
                  <Button onClick={saveHome} className="gold-shimmer px-8">Guardar Alterações</Button>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input value={home.hero_title} onChange={(e) => setHome({...home, hero_title: e.target.value})} placeholder="Título Hero" />
                    <ImageUpload valor={home.hero_image} onChange={(url) => setHome({...home, hero_image: url})} />
                  </div>
                  <Textarea value={home.hero_subtitle} onChange={(e) => setHome({...home, hero_subtitle: e.target.value})} placeholder="Subtítulo Hero" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Textarea value={home.service_bolo_desc} onChange={(e) => setHome({...home, service_bolo_desc: e.target.value})} placeholder="Descrição Topos de Bolo" />
                    <Textarea value={home.service_camiseta_desc} onChange={(e) => setHome({...home, service_camiseta_desc: e.target.value})} placeholder="Descrição Camisetas" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="portfolio">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <Card className="lg:col-span-4 rounded-[2rem] p-8 border-none shadow-lg">
                  <form onSubmit={handleProjectSubmit} className="space-y-4">
                    <Input name="title" defaultValue={editingProject?.title} placeholder="Título do Trabalho" required />
                    <select name="category" defaultValue={editingProject?.category} className="w-full p-2 border rounded-xl bg-white">
                      <option value="Topos de Bolo">Topos de Bolo</option>
                      <option value="Camisetas">Camisetas</option>
                    </select>
                    <ImageUpload valor={editingProject?.image_url || ''} onChange={(url) => setEditingProject(prev => prev ? {...prev, image_url: url} : null)} />
                    <Input name="year" defaultValue={editingProject?.year} placeholder="Ano" />
                    <Textarea name="description" defaultValue={editingProject?.description} placeholder="Descrição" />
                    <Button type="submit" className="w-full rounded-xl">Publicar</Button>
                  </form>
                </Card>
                <Card className="lg:col-span-8 rounded-[2rem] border-none shadow-lg overflow-hidden">
                  <Table>
                    <TableHeader className="bg-secondary/5"><TableRow><TableHead>Trabalho</TableHead><TableHead>Categoria</TableHead><TableHead className="text-right">Acções</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {projects.map(p => (
                        <TableRow key={p.id}>
                          <TableCell className="font-bold">{p.title}</TableCell>
                          <TableCell>{p.category}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => setEditingProject(p)}><Edit3 size={16}/></Button>
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteProject(p.id)}><Trash2 size={16}/></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="flyers">
              <div className="space-y-4">
                <Button onClick={addFlyer} className="gold-shimmer">Novo Flyer</Button>
                {flyers.map(f => (
                  <Card key={f.id} className="rounded-[2rem] p-6 border-none shadow-lg flex justify-between items-center">
                    <Input value={f.titulo} className="max-w-xs border-none font-bold" onChange={(e) => setFlyers(flyers.map(item => item.id === f.id ? {...item, titulo: e.target.value} : item))} />
                    <div className="flex gap-2">
                      <Button onClick={() => saveFlyer(f)}>Gravar</Button>
                      <Button variant="outline" className="text-destructive" onClick={() => { if(confirm('Apagar?')) supabase.from('flyers').delete().eq('id', f.id).then(() => carregarDados()) }}>Apagar</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="registrations">
              <Card className="rounded-[2rem] border-none shadow-lg overflow-hidden">
                <Table>
                  <TableHeader className="bg-secondary/5"><TableRow><TableHead>ID/Aluno</TableHead><TableHead>Curso</TableHead><TableHead>Estado</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {registrations.map(r => (
                      <TableRow key={r.id}>
                        <TableCell><span className="text-primary font-bold">{r.id}</span><br/>{r.student_name}</TableCell>
                        <TableCell>{r.course_title}</TableCell>
                        <TableCell>{r.status}</TableCell>
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
