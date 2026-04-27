export type Category = 'Todos' | 'Tipos de Bolo' | 'Camisetas' | 'Design Personalizado' | 'Kits Revenda';

export interface Project {
  id: string;
  title: string;
  category: Category;
  description: string;
  imageUrl: string;
  year: string;
  active: boolean;
}

export const CATEGORIES: { label: string; value: Category }[] = [
  { label: 'Todos', value: 'Todos' },
  { label: 'Tipos de Bolo', value: 'Tipos de Bolo' },
  { label: 'Camisetas', value: 'Camisetas' },
  { label: 'Design Personalizado', value: 'Design Personalizado' },
  { label: 'Kits Revenda', value: 'Kits Revenda' }
];

// Fallback inicial para o site
export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Bolo de Casamento Gold',
    category: 'Tipos de Bolo',
    description: 'Bolo artístico com detalhes em folha de ouro e acabamento premium.',
    imageUrl: 'https://picsum.photos/seed/cake-gold/800/600',
    year: '2024',
    active: true
  },
  {
    id: '2',
    title: 'Camiseta Napau Signature',
    category: 'Camisetas',
    description: 'Design exclusivo Napau com tecido de alta qualidade.',
    imageUrl: 'https://picsum.photos/seed/tshirt-napau/800/600',
    year: '2024',
    active: true
  },
  {
    id: '3',
    title: 'Bolo Temático Safari',
    category: 'Tipos de Bolo',
    description: 'Bolo artístico esculpido para aniversários infantis.',
    imageUrl: 'https://picsum.photos/seed/cake-safari/800/600',
    year: '2024',
    active: true
  }
];
