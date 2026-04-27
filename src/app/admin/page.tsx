
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
import { PORTFOLIO_PROJECTS, Category } from '@/lib/portfolio-data';
import { Plus, Edit, Trash2, LayoutDashboard, Image as ImageIcon, MessageSquare, Settings, GraduationCap, Phone, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState(PORTFOLIO_PROJECTS);

  const handleSave = (section: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: `Alterações em "${section}" guardadas!`,
        description: "Os dados foram atualizados e publicados com sucesso.",
      });
    }, 1000);
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
    toast({
      title: "Projeto removido",
      description: "O item foi retirado do portfólio público.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary/10">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-4xl font-headline font-bold">Painel de Controlo</h1>
              <p className="text-sm md:text-base text-muted-foreground">Administre o conteúdo da Napau Design & Arte em tempo real.</p>
            </div>
          </div>

          <Tabs defaultValue="projetos" className="space-y-8">
            <TabsList className="bg-white p-1 rounded-2xl shadow-sm border h-auto flex flex-wrap gap-1">
              <TabsTrigger value="projetos" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white flex gap-2">
                <ImageIcon size={18} /> Portfólio
              </TabsTrigger>
              <TabsTrigger value="curso" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white flex gap-2">
                <GraduationCap size={18} /> Curso
              </TabsTrigger>
              <TabsTrigger value="geral" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white flex gap-2">
                <LayoutDashboard size={18} /> Marca
              </TabsTrigger>
              <TabsTrigger value="contactos" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white flex gap-2">
                <Phone size={18} /> Contactos
              </TabsTrigger>
            </TabsList>

            {/* Gestão de Portfólio */}
            <TabsContent value="projetos">
              <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b p-6 gap-4">
                  <div>
                    <CardTitle className="text-xl">Gestão de Portfólio</CardTitle>
                    <CardDescription>Adicione ou edite projetos nas categorias: Tipos de Bolo, Camisetas, Design Personalizado e Kits Revenda.</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-primary text-white rounded-xl flex gap-2 h-12 px-6 gold-shimmer shadow-md">
                        <Plus size={18} /> Adicionar Novo Projeto
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] rounded-3xl">
                      <DialogHeader>
                        <DialogTitle>Novo Trabalho</DialogTitle>
                        <DialogDescription>Preencha os dados para adicionar à galeria pública.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase text-muted-foreground">Título do Projeto</label>
                          <Input placeholder="Ex: Bolo de Casamento Elegante" className="rounded-xl" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase text-muted-foreground">Categoria</label>
                          <Select defaultValue="Tipos de Bolo">
                            <SelectTrigger className="rounded-xl">
                              <SelectValue placeholder="Selecione a categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Tipos de Bolo">Tipos de Bolo</SelectItem>
                              <SelectItem value="Camisetas">Camisetas</SelectItem>
                              <SelectItem value="Design Personalizado">Design Personalizado</SelectItem>
                              <SelectItem value="Kits Revenda">Kits Revenda</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase text-muted-foreground">Descrição</label>
                          <Textarea placeholder="Breve descrição do trabalho..." className="rounded-xl" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase text-muted-foreground">URL da Imagem</label>
                          <Input placeholder="https://..." className="rounded-xl" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="bg-primary text-white rounded-xl w-full h-12" onClick={() => handleSave("Portfólio")}>
                          Publicar no Site
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent bg-secondary/10">
                          <TableHead className="px-6">Projeto</TableHead>
                          <TableHead>Categoria</TableHead>
                          <TableHead>Ano</TableHead>
                          <TableHead className="text-right px-6">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects.map((project) => (
                          <TableRow key={project.id} className="hover:bg-secondary/5 transition-colors">
                            <TableCell className="px-6 font-medium">{project.title}</TableCell>
                            <TableCell>
                              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] uppercase font-bold border border-primary/20">
                                {project.category}
                              </span>
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">{project.year}</TableCell>
                            <TableCell className="text-right px-6">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon" className="h-9 w-9 text-blue-500 hover:bg-blue-50">
                                  <Edit size={16} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-9 w-9 text-red-500 hover:bg-red-50" onClick={() => deleteProject(project.id)}>
                                  <Trash2 size={16} />
                                </Button>
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

            {/* Gestão do Curso */}
            <TabsContent value="curso">
              <Card className="border-none shadow-sm rounded-2xl bg-white">
                <CardHeader className="flex flex-row items-center justify-between border-b p-6">
                  <div>
                    <CardTitle className="text-xl">Informação do Curso</CardTitle>
                    <CardDescription>Edite os dados que aparecem no flyer digital e na página de cursos.</CardDescription>
                  </div>
                  <Button onClick={() => handleSave("Curso")} className="bg-primary text-white rounded-xl flex gap-2 h-10 px-6 gold-shimmer">
                    <Save size={18} /> Guardar
                  </Button>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground">Preço do Curso</label>
                        <Input defaultValue="4.500 MT" className="rounded-xl h-12" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground">Data da Próxima Turma</label>
                        <Input defaultValue="14 DE DEZEMBRO" className="rounded-xl h-12" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground">Local das Aulas</label>
                        <Input defaultValue="AV. ACORDOS DE LUSAKA, PARAGEM BALTAZAR" className="rounded-xl h-12" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Conteúdos Programáticos (Um por linha)</label>
                      <Textarea 
                        defaultValue={"BOLO DE ANIVERSÁRIO COM FOTO\nBOLO DE CASAMENTO\nBOLO GELADO\nBOLO TEMÁTICO\nBOLACHINHAS SORTIDAS\nCUP-CAKES PERSONALIZADOS\nDRIP-CAKES\nFLORESTA NEGRA\nORELHUDOS DE CUSTARDE\nSOBREMESAS"}
                        className="rounded-xl min-h-[220px] leading-relaxed" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Texto de Apresentação (Flyer)</label>
                    <Textarea 
                      defaultValue="AULAS PRATICAS E MUITO PRODUTIVAS COM TODOS OS SEGREDOS QUE VOCÊ PRECISA PARA FAZER UM BOLO ESPETACULAR."
                      className="rounded-xl h-24"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Configurações de Marca */}
            <TabsContent value="geral">
              <Card className="border-none shadow-sm rounded-2xl bg-white">
                <CardHeader className="flex flex-row items-center justify-between border-b p-6">
                  <div>
                    <CardTitle className="text-xl">Identidade da Marca</CardTitle>
                    <CardDescription>Nome, Slogan e Bio da Napau.</CardDescription>
                  </div>
                  <Button onClick={() => handleSave("Marca")} className="bg-primary text-white rounded-xl flex gap-2 h-10 px-6 gold-shimmer">
                    <Save size={18} /> Guardar
                  </Button>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Nome do Negócio</label>
                      <Input defaultValue="Napau Design & Arte" className="rounded-xl h-12" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Slogan Principal</label>
                      <Input defaultValue="Qualidade e criatividade em cada detalhe" className="rounded-xl h-12" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Descrição Sobre Nós</label>
                    <Textarea 
                      defaultValue="A Napau Design & Arte nasceu em Moçambique com o propósito de criar memórias inesquecíveis através de designs exclusivos em bolos e vestuário personalizado."
                      className="rounded-xl min-h-[120px]" 
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contactos */}
            <TabsContent value="contactos">
              <Card className="border-none shadow-sm rounded-2xl bg-white">
                <CardHeader className="flex flex-row items-center justify-between border-b p-6">
                  <div>
                    <CardTitle className="text-xl">Canais de Atendimento</CardTitle>
                    <CardDescription>Configure como os clientes chegam até si.</CardDescription>
                  </div>
                  <Button onClick={() => handleSave("Contactos")} className="bg-primary text-white rounded-xl flex gap-2 h-10 px-6 gold-shimmer">
                    <Save size={18} /> Guardar
                  </Button>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground">WhatsApp Principal</label>
                        <Input defaultValue="+258 84 761 5871" className="rounded-xl h-12" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground">WhatsApp Secundário</label>
                        <Input defaultValue="+258 86 791 5871" className="rounded-xl h-12" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Mensagem Padrão (WhatsApp)</label>
                      <Textarea 
                        defaultValue="Olá! Vim pelo site da Napau Design & Arte e gostaria de saber mais sobre os vossos serviços e cursos."
                        className="rounded-xl min-h-[124px]"
                      />
                      <p className="text-[10px] text-muted-foreground italic">Esta mensagem aparecerá automaticamente para o cliente quando clicar no botão do WhatsApp.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Instagram</label>
                      <Input defaultValue="https://instagram.com/napau_design" className="rounded-xl h-12" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">TikTok</label>
                      <Input defaultValue="https://tiktok.com/@napau_design" className="rounded-xl h-12" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Facebook</label>
                      <Input defaultValue="https://facebook.com/napaudesign" className="rounded-xl h-12" />
                    </div>
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
