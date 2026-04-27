
import { PlaceHolderImages } from './placeholder-images';

export type Category = 'Todos' | 'Topos de Bolo' | 'Camisetas' | 'Design Personalizado' | 'Kits Revenda';

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
    title: 'Topo de Bolo Aniversário Real',
    category: 'Topos de Bolo',
    description: 'Design exclusivo em papel laminado dourado para celebração de 15 anos.',
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
    category: 'Topos de Bolo',
    description: 'Topo de bolo em acrílico rose gold com nomes personalizados para noivado.',
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
