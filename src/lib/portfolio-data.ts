
import { PlaceHolderImages } from './placeholder-images';

export type Category = 'Todos' | 'Tipos de Bolo' | 'Camisetas' | 'Design Personalizado' | 'Kits Revenda';

export interface Project {
  id: string;
  title: string;
  category: Category;
  description: string;
  imageUrl: string;
  year: string;
}

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Design de Tipos de Bolo Aniversário',
    category: 'Tipos de Bolo',
    description: 'Personalização exclusiva para celebrações de 15 anos com acabamentos premium.',
    imageUrl: PlaceHolderImages.find(img => img.id === 'cake-topper-1')?.imageUrl || 'https://picsum.photos/seed/1/800/600',
    year: '2024',
  },
  {
    id: '2',
    title: 'Coleção Camisetas Criativas',
    category: 'Camisetas',
    description: 'Estampas personalizadas para o dia-a-dia com foco em mensagens inspiradoras.',
    imageUrl: PlaceHolderImages.find(img => img.id === 'tshirt-1')?.imageUrl || 'https://picsum.photos/seed/2/800/600',
    year: '2024',
  },
  {
    id: '3',
    title: 'Kit Noivado Elegante',
    category: 'Tipos de Bolo',
    description: 'Criações personalizadas para bolos de noivado em acrílico e materiais nobres.',
    imageUrl: PlaceHolderImages.find(img => img.id === 'cake-topper-2')?.imageUrl || 'https://picsum.photos/seed/3/800/600',
    year: '2023',
  },
  {
    id: '4',
    title: 'Uniformes Corporativos Artísticos',
    category: 'Camisetas',
    description: 'Camisetas personalizadas para empresas que buscam um toque criativo na sua marca.',
    imageUrl: PlaceHolderImages.find(img => img.id === 'tshirt-2')?.imageUrl || 'https://picsum.photos/seed/4/800/600',
    year: '2023',
  },
];
