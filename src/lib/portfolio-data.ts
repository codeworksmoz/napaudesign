
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

// Estes dados serão usados como fallback se o localStorage estiver vazio
export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Bolo de Casamento Gold',
    category: 'Tipos de Bolo',
    description: 'Bolo artístico com detalhes em folha de ouro e acabamento premium para casamentos.',
    imageUrl: 'https://picsum.photos/seed/cake1/800/600',
    year: '2024',
    active: true
  },
  {
    id: '2',
    title: 'Camiseta Napau Brand',
    category: 'Camisetas',
    description: 'Personalização têxtil de alta qualidade com a marca Napau Design & Arte.',
    imageUrl: 'https://picsum.photos/seed/tshirt1/800/600',
    year: '2024',
    active: true
  }
];
