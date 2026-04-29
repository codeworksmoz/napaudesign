
"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Project, Flyer, HomeContent, DEFAULT_HOME_CONTENT, Registration, OFFICIAL_IMAGE } from '@/lib/portfolio-data';
import { supabase } from '@/lib/supabase';

// Novos componentes refatorados
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';
import { AdminHomeTab } from '@/components/admin/AdminHomeTab';
import { AdminPortfolioTab } from '@/components/admin/AdminPortfolioTab';
import { AdminLibraryTab } from '@/components/admin/AdminLibraryTab';
import { AdminFlyersTab } from '@/components/admin/AdminFlyersTab';
import { AdminRegistrationsTab } from '@/components/admin/AdminRegistrationsTab';

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
      if (homeData) setHome({ ...DEFAULT_HOME_CONTENT, ...homeData });

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
      const { data, error } = await supabase.storage.from('produtos').list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });
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
      const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword });
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
      const { error } = await supabase.from('home_content').upsert({ id: 1, ...home });
      if (error) throw error;
      toast({ title: "✅ Home atualizada!" });
    } catch (e: any) {
      toast({ title: "Erro ao salvar", description: e.message, variant: "destructive" });
    }
  };

  const handleSaveProject = async (data: Partial<Project>) => {
    try {
      if (editingProject) {
        await supabase.from('projects').update(data).eq('id', editingProject.id);
        toast({ title: "Alterações guardadas!" });
      } else {
        await supabase.from('projects').insert([{ ...data, id: crypto.randomUUID(), active: true }]);
        toast({ title: "Trabalho adicionado!" });
      }
      setEditingProject(null);
      carregarDados();
    } catch (err) {
      toast({ title: "Erro ao salvar", variant: "destructive" });
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Remover este trabalho do portfólio?')) return;
    try {
      await supabase.from('projects').delete().eq('id', id);
      carregarDados();
      toast({ title: "Trabalho removido." });
    } catch (e) {
      toast({ title: "Erro ao eliminar", variant: "destructive" });
    }
  };

  const handleNewFlyer = async () => {
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
  };

  const handleSaveFlyer = async (f: Flyer) => {
    try {
      const { error } = await supabase.from('flyers').upsert(f); 
      if(error) throw error;
      carregarDados(); 
      toast({ title: "Curso atualizado!" }); 
    } catch (e: any) { toast({ title: "Erro ao salvar", variant: "destructive" }); }
  };

  const handleDeleteFlyer = async (id: string) => {
    if(confirm('Apagar este curso permanentemente?')) {
      await supabase.from('flyers').delete().eq('id', id);
      carregarDados();
      toast({ title: "Curso removido." });
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    await supabase.from('registrations').update({ status: newStatus }).eq('id', id); 
    carregarDados(); 
    toast({ title: "Estado atualizado!" });
  };

  const handleAddImageToCarousel = (type: 'bolo' | 'camiseta', url: string) => {
    if (!url) return;
    if (type === 'bolo') {
      setHome({ ...home, serviceBoloImages: [...(home.serviceBoloImages || []), url] });
    } else {
      setHome({ ...home, serviceCamisetaImages: [...(home.serviceCamisetaImages || []), url] });
    }
    toast({ title: "Adicionada à galeria!" });
  };

  const handleRemoveImageFromCarousel = (type: 'bolo' | 'camiseta', index: number) => {
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

  const handleDeleteLibraryFile = async (name: string) => {
    if(confirm('Eliminar imagem permanentemente da biblioteca?')) {
      const { error } = await supabase.storage.from('produtos').remove([name]);
      if(!error) { carregarBiblioteca(); toast({ title: "Ficheiro eliminado." }); }
    }
  };

  if (loadingAuth) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={48} /></div>;

  if (!session) {
    return (
      <AdminLoginForm 
        email={loginEmail} 
        setEmail={setLoginEmail} 
        pass={loginPassword} 
        setPass={setLoginPassword} 
        loading={loggingIn} 
        onSubmit={handleLogin} 
      />
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
              <AdminHomeTab 
                home={home} 
                setHome={setHome} 
                onSave={saveHome} 
                onAddImage={handleAddImageToCarousel} 
                onRemoveImage={handleRemoveImageFromCarousel} 
              />
            </TabsContent>

            <TabsContent value="portfolio">
              <AdminPortfolioTab 
                projects={projects} 
                editing={editingProject} 
                setEditing={setEditingProject} 
                onSave={handleSaveProject} 
                onDelete={handleDeleteProject} 
              />
            </TabsContent>

            <TabsContent value="library">
              <AdminLibraryTab 
                library={library} 
                loading={loadingLibrary} 
                onRefresh={carregarBiblioteca} 
                onDelete={handleDeleteLibraryFile} 
                onCopy={(url) => { navigator.clipboard.writeText(url); toast({ title: "Link Copiado!" }); }} 
              />
            </TabsContent>

            <TabsContent value="flyers">
              <AdminFlyersTab 
                flyers={flyers} 
                setFlyers={setFlyers} 
                onNew={handleNewFlyer} 
                onSave={handleSaveFlyer} 
                onDelete={handleDeleteFlyer} 
              />
            </TabsContent>

            <TabsContent value="registrations">
              <AdminRegistrationsTab 
                registrations={registrations} 
                onStatusChange={handleStatusChange} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
