
"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, LayoutDashboard, Image as ImageIcon, Phone, GraduationCap, Save, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Simulação de dados (serão geridos via Firestore)
  const [projects, setProjects] = useState([
    { id: '1', title: 'Bolo de Casamento Gold', category: 'Tipos de Bolo', year: '2024', active: true },
    { id: '2', title: 'Camiseta Napau Brand', category: 'Camisetas', year: '2024', active: true },
  ]);

  const handleSave = (section: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: `Alterações em "${section}" guardadas!`,
        description: "Os dados foram atualizados com sucesso.",
      });
    }, 800);
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
    toast({
      title: "Projeto removido",
      variant: "destructive",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-headline font-bold">Administração Napau</h1>
              <p className="text-muted-foreground text-sm">Gerencie o conteúdo do site em tempo real.</p>
            </div>
          </div>

          <Tabs defaultValue="portfolio" className="space-y-6">
            <TabsList className="bg-white p-1 rounded-xl shadow-sm border h-auto flex flex-wrap gap-1">
              <TabsTrigger value="portfolio" className="rounded-lg py-2.5 px-5 flex gap-2">
                <ImageIcon size={18} /> Portfólio
              </TabsTrigger>
              <TabsTrigger value="curso" className="rounded-lg py-2.5 px-5 flex gap-2">
                <GraduationCap size={18} /> Cursos
              </TabsTrigger>
              <TabsTrigger value="config" className="rounded-lg py-2.5 px-5 flex gap-2">
                <Phone size={18} /> Contactos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="portfolio">
              <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
                <CardHeader className="flex flex-row items-center justify-between border-b p-6">
                  <div>
                    <CardTitle className="text-lg">Trabalhos Publicados</CardTitle>
                    <CardDescription>Gerencie fotos em Tipos de Bolo, Camisetas, Design e Revenda.</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-primary text-white rounded-xl flex gap-2 h-11 px-5 gold-shimmer">
                        <Plus size={18} /> Novo Trabalho
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] rounded-3xl">
                      <DialogHeader>
                        <DialogTitle>Adicionar ao Portfólio</DialogTitle>
                        <DialogDescription>Escolha a imagem e defina os detalhes do projeto.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-5 py-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase text-muted-foreground">Foto do Produto</label>
                          <div className="border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-secondary/10 transition-colors">
                            <Camera className="text-muted-foreground" size={32} />
                            <span className="text-xs text-muted-foreground">Clique para selecionar imagem</span>
                          </div>
                          <Input placeholder="Ou cole a URL da imagem..." className="rounded-xl mt-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-muted-foreground">Título</label>
                            <Input placeholder="Ex: Bolo de Casamento" className="rounded-xl" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-muted-foreground">Categoria</label>
                            <Select defaultValue="Tipos de Bolo">
                              <SelectTrigger className="rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Tipos de Bolo">Tipos de Bolo</SelectItem>
                                <SelectItem value="Camisetas">Camisetas</SelectItem>
                                <SelectItem value="Design Personalizado">Design Personalizado</SelectItem>
                                <SelectItem value="Kits Revenda">Kits Revenda</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button className="bg-primary text-white rounded-xl w-full h-12" onClick={() => handleSave("Portfólio")}>
                          Publicar agora
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-secondary/5">
                          <TableHead className="px-6 py-4">Item</TableHead>
                          <TableHead>Categoria</TableHead>
                          <TableHead className="text-right px-6">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects.map((p) => (
                          <TableRow key={p.id}>
                            <TableCell className="px-6 font-medium">{p.title}</TableCell>
                            <TableCell>
                              <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full font-bold uppercase">
                                {p.category}
                              </span>
                            </TableCell>
                            <TableCell className="text-right px-6">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-primary"><Edit size={16} /></Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteProject(p.id)}><Trash2 size={16} /></Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="curso">
              <Card className="border-none shadow-sm rounded-2xl bg-white">
                <CardHeader className="flex flex-row items-center justify-between border-b p-6">
                  <div>
                    <CardTitle className="text-lg">Dados do Flyer do Curso</CardTitle>
                    <CardDescription>Edite preços, datas e conteúdos programáticos.</CardDescription>
                  </div>
                  <Button onClick={() => handleSave("Curso")} className="bg-primary text-white rounded-xl flex gap-2 h-10 px-5 gold-shimmer">
                    <Save size={18} /> Guardar
                  </Button>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Preço do Curso</label>
                      <Input defaultValue="4.500 MT" className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Próxima Data</label>
                      <Input defaultValue="14 DE DEZEMBRO" className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Localização</label>
                      <Input defaultValue="AV. ACORDOS DE LUSAKA, PARAGEM BALTAZAR" className="rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Conteúdo Programático (Lado Esquerdo)</label>
                    <Textarea defaultValue="BOLO DE ANIVERSÁRIO COM FOTO&#10;BOLO DE CASAMENTO&#10;BOLO GELADO&#10;BOLO TEMÁTICO&#10;BOLACHINHAS SORTIDAS" className="rounded-xl h-32" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Conteúdo Programático (Lado Direito)</label>
                    <Textarea defaultValue="CUP-CAKES PERSONALIZADOS&#10;DRIP-CAKES&#10;FLORESTA NEGRA&#10;ORELHUDOS DE CUSTARDE&#10;SOBREMESAS" className="rounded-xl h-32" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="config">
              <Card className="border-none shadow-sm rounded-2xl bg-white">
                <CardHeader className="flex flex-row items-center justify-between border-b p-6">
                  <div>
                    <CardTitle className="text-lg">Contactos & WhatsApp</CardTitle>
                    <CardDescription>Configure os canais de atendimento.</CardDescription>
                  </div>
                  <Button onClick={() => handleSave("Contactos")} className="bg-primary text-white rounded-xl flex gap-2 h-10 px-5 gold-shimmer">
                    <Save size={18} /> Guardar
                  </Button>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">WhatsApp Principal</label>
                      <Input defaultValue="+258 84 761 5871" className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Email de Atendimento</label>
                      <Input defaultValue="napau.culinaria@gmail.com" className="rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Mensagem Padrão do WhatsApp</label>
                    <Textarea 
                      defaultValue="Olá! Vim pelo site da Napau Design & Arte e gostaria de saber mais sobre os vossos serviços e cursos."
                      className="rounded-xl h-24" 
                    />
                    <p className="text-[10px] text-muted-foreground italic">Esta mensagem ajuda a identificar que o cliente veio através do seu site.</p>
                  </div>
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
