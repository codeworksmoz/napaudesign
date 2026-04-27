
"use client";

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { PORTFOLIO_PROJECTS } from '@/lib/portfolio-data';
import { Plus, Edit, Trash2, LayoutDashboard, Image as ImageIcon, MessageSquare, Settings } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/10">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Admin Sidebar - Hidden on small screens or stacked */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-2">
                <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1 no-scrollbar">
                  <button className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary font-medium rounded-xl text-left whitespace-nowrap lg:whitespace-normal">
                    <LayoutDashboard size={20} />
                    <span className="text-xs md:text-sm">Visão Geral</span>
                  </button>
                  <button className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-secondary/50 rounded-xl text-left transition-colors whitespace-nowrap lg:whitespace-normal">
                    <ImageIcon size={20} />
                    <span className="text-xs md:text-sm">Projetos</span>
                  </button>
                  <button className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-secondary/50 rounded-xl text-left transition-colors whitespace-nowrap lg:whitespace-normal">
                    <MessageSquare size={20} />
                    <span className="text-xs md:text-sm">Mensagens</span>
                  </button>
                  <button className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-secondary/50 rounded-xl text-left transition-colors whitespace-nowrap lg:whitespace-normal">
                    <Settings size={20} />
                    <span className="text-xs md:text-sm">Definições</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-headline font-bold">Gestão do Portfólio</h1>
                <p className="text-sm md:text-base text-muted-foreground">Gerencie seus trabalhos criativos e vitrines de clientes.</p>
              </div>
              <Button className="w-full sm:w-auto bg-primary text-white flex gap-2 items-center rounded-xl gold-shimmer h-12 px-6 shadow-md">
                <Plus size={20} />
                Novo Projeto
              </Button>
            </div>

            <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
              <CardHeader className="border-b border-border/50 p-4 md:p-6">
                <CardTitle className="text-lg md:text-xl">Projetos Existentes</CardTitle>
                <CardDescription className="text-xs md:text-sm">Total de {PORTFOLIO_PROJECTS.length} projetos exibidos no site.</CardDescription>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent bg-secondary/20">
                      <TableHead className="font-semibold uppercase tracking-widest text-[10px] md:text-xs px-4 md:px-6">Projeto</TableHead>
                      <TableHead className="font-semibold uppercase tracking-widest text-[10px] md:text-xs">Categoria</TableHead>
                      <TableHead className="font-semibold uppercase tracking-widest text-[10px] md:text-xs hidden sm:table-cell">Ano</TableHead>
                      <TableHead className="font-semibold uppercase tracking-widest text-[10px] md:text-xs text-right px-4 md:px-6">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {PORTFOLIO_PROJECTS.map((project) => (
                      <TableRow key={project.id} className="hover:bg-secondary/10 transition-colors">
                        <TableCell className="px-4 md:px-6 font-medium text-xs md:text-sm">{project.title}</TableCell>
                        <TableCell>
                          <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-[9px] md:text-[10px] uppercase font-bold tracking-tighter">
                            {project.category}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-xs md:text-sm hidden sm:table-cell">{project.year}</TableCell>
                        <TableCell className="text-right px-4 md:px-6">
                          <div className="flex justify-end gap-1 md:gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                              <Edit size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50">
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              <Card className="border-none shadow-sm rounded-2xl bg-primary text-white">
                <CardContent className="p-5 md:p-6">
                  <p className="text-primary-foreground/70 uppercase tracking-widest text-[10px] font-semibold">Total de Projetos</p>
                  <h3 className="text-3xl md:text-4xl font-headline font-bold mt-1">24</h3>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm rounded-2xl bg-accent text-white">
                <CardContent className="p-5 md:p-6">
                  <p className="text-white/70 uppercase tracking-widest text-[10px] font-semibold">Mensagens Pendentes</p>
                  <h3 className="text-3xl md:text-4xl font-headline font-bold mt-1">12</h3>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm rounded-2xl bg-white">
                <CardContent className="p-5 md:p-6">
                  <p className="text-muted-foreground uppercase tracking-widest text-[10px] font-semibold">Visitantes Hoje</p>
                  <h3 className="text-3xl md:text-4xl font-headline font-bold mt-1 text-primary">156</h3>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
