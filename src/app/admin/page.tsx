
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
import { PORTFOLIO_PROJECTS } from '@/lib/portfolio-data';
import { Plus, Edit, Trash2, LayoutDashboard, Image as ImageIcon, MessageSquare, Settings, GraduationCap, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Dados guardados!",
        description: "As alterações foram publicadas com sucesso.",
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary/10">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-4xl font-headline font-bold">Painel de Controlo</h1>
              <p className="text-sm md:text-base text-muted-foreground">Administre o conteúdo da Napau Design & Arte.</p>
            </div>
            <Button onClick={handleSave} disabled={loading} className="w-full sm:w-auto bg-primary text-white gold-shimmer rounded-xl h-12 px-8 shadow-lg">
              {loading ? "A guardar..." : "Publicar Alterações"}
            </Button>
          </div>

          <Tabs defaultValue="geral" className="space-y-8">
            <TabsList className="bg-white p-1 rounded-2xl shadow-sm border h-auto flex flex-wrap gap-1">
              <TabsTrigger value="geral" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white flex gap-2">
                <LayoutDashboard size={18} /> Geral
              </TabsTrigger>
              <TabsTrigger value="projetos" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white flex gap-2">
                <ImageIcon size={18} /> Projetos
              </TabsTrigger>
              <TabsTrigger value="curso" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white flex gap-2">
                <GraduationCap size={18} /> Curso
              </TabsTrigger>
              <TabsTrigger value="contactos" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white flex gap-2">
                <Phone size={18} /> Contactos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="geral">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-sm rounded-2xl bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg">Site Status</CardTitle>
                    <CardDescription>Informação em tempo real.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-muted-foreground">Projetos Ativos</span>
                      <span className="font-bold">{PORTFOLIO_PROJECTS.length}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-muted-foreground">Mensagens Hoje</span>
                      <span className="font-bold">12</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-muted-foreground">Última atualização</span>
                      <span className="font-bold text-xs uppercase">Hoje, 10:45</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2 border-none shadow-sm rounded-2xl bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg">Configuração da Marca</CardTitle>
                    <CardDescription>Nome e Slogan do site.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground">Nome do Negócio</label>
                        <Input defaultValue="Napau Design & Arte" className="rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground">Slogan Principal</label>
                        <Input defaultValue="Qualidade e criatividade em cada detalhe" className="rounded-xl" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Breve Descrição (Sobre)</label>
                      <Textarea 
                        defaultValue="A Napau Design & Arte nasceu em Moçambique com o propósito de criar memórias inesquecíveis..."
                        className="rounded-xl min-h-[120px]" 
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="curso">
              <Card className="border-none shadow-sm rounded-2xl bg-white">
                <CardHeader>
                  <CardTitle className="text-xl">Gestão do Curso de Confeitaria</CardTitle>
                  <CardDescription>Edite as informações exibidas no flyer virtual do site.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground">Preço do Curso (MT)</label>
                        <Input defaultValue="4.500Mt" className="rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground">Data de Início</label>
                        <Input defaultValue="14 DE DEZEMBRO" className="rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground">Localização</label>
                        <Input defaultValue="Av. Acordos de Lusaka, Paragem Baltazar" className="rounded-xl" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Lista de Conteúdos (Um por linha)</label>
                      <Textarea 
                        defaultValue={"Bolo de Aniversário com Foto\nBolo de Casamento\nBolo Gelado\nBolo Temático\nBolachinhas Sortidas\nCup-cakes Personalizados\nDrip-cakes\nFloresta Negra\nOrelhudos de Custarde\nSobreimesas"}
                        className="rounded-xl min-h-[200px]" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Texto de Apresentação</label>
                    <Textarea 
                      defaultValue="AULAS PRATICAS E MUITO PRODUTIVAS COM TODOS OS SEGREDOS QUE VOCÊ PRECISA PARA FAZER UM BOLO ESPETACULAR."
                      className="rounded-xl"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contactos">
              <Card className="border-none shadow-sm rounded-2xl bg-white">
                <CardHeader>
                  <CardTitle className="text-xl">Canais de Atendimento</CardTitle>
                  <CardDescription>Configure como os clientes o contactam.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">WhatsApp Primário</label>
                      <Input defaultValue="+258 84 761 5871" className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">WhatsApp Secundário</label>
                      <Input defaultValue="86 791 5871" className="rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Mensagem Padrão (WhatsApp)</label>
                    <Textarea 
                      defaultValue="Olá! Vim pelo site da Napau Design & Arte e gostaria de saber mais sobre os vossos serviços e cursos."
                      className="rounded-xl h-24"
                    />
                    <p className="text-[10px] text-muted-foreground italic">Esta mensagem será enviada automaticamente quando o cliente clicar no botão do WhatsApp.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Instagram (URL)</label>
                      <Input defaultValue="https://instagram.com/napau_design" className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">TikTok (URL)</label>
                      <Input defaultValue="https://tiktok.com/@napau_design" className="rounded-xl" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projetos">
              <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
                <CardHeader className="flex flex-row items-center justify-between border-b p-6">
                  <div>
                    <CardTitle className="text-xl">Gestão de Portfólio</CardTitle>
                    <CardDescription>Adicione ou remova trabalhos da galeria.</CardDescription>
                  </div>
                  <Button className="bg-primary text-white rounded-xl flex gap-2">
                    <Plus size={18} /> Adicionar
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent bg-secondary/10">
                        <TableHead className="px-6">Projeto</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead className="text-right px-6">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {PORTFOLIO_PROJECTS.map((project) => (
                        <TableRow key={project.id} className="hover:bg-secondary/5 transition-colors">
                          <TableCell className="px-6 font-medium">{project.title}</TableCell>
                          <TableCell>
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] uppercase font-bold">
                              {project.category}
                            </span>
                          </TableCell>
                          <TableCell className="text-right px-6">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500">
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                                <Trash2 size={16} />
                              </Button>
                            </div>
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
}
