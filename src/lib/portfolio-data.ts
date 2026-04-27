
import { PlaceHolderImages } from './placeholder-images';

export type Category = 'All' | 'Branding' | 'Web Design' | 'Illustration' | 'Packaging';

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
    title: 'Aura Boutique',
    category: 'Branding',
    description: 'Uma identidade minimalista para um hotel boutique de luxo focado em experiências sensoriais.',
    imageUrl: PlaceHolderImages.find(img => img.id === 'branding-1')?.imageUrl || 'https://picsum.photos/seed/1/800/600',
    year: '2023',
  },
  {
    id: '2',
    title: 'Flora Botanicals',
    category: 'Packaging',
    description: 'Design de embalagens orgânicas para uma linha premium de cuidados com a pele sustentável.',
    imageUrl: PlaceHolderImages.find(img => img.id === 'branding-2')?.imageUrl || 'https://picsum.photos/seed/2/800/600',
    year: '2024',
  },
  {
    id: '3',
    title: 'Ethereal Spaces',
    category: 'Web Design',
    description: 'Design de experiência digital para um escritório de arquitetura de vanguarda.',
    imageUrl: PlaceHolderImages.find(img => img.id === 'web-1')?.imageUrl || 'https://picsum.photos/seed/3/800/600',
    year: '2023',
  },
  {
    id: '4',
    title: 'Organic Forms',
    category: 'Illustration',
    description: 'Uma série de ilustrações digitais explorando a fluidez da natureza.',
    imageUrl: PlaceHolderImages.find(img => img.id === 'illustration-1')?.imageUrl || 'https://picsum.photos/seed/4/800/600',
    year: '2022',
  },
  {
    id: '5',
    title: 'Velvet Roast',
    category: 'Branding',
    description: 'Identidade de marca e linguagem visual para uma casa de cafés especiais.',
    imageUrl: PlaceHolderImages.find(img => img.id === 'branding-3')?.imageUrl || 'https://picsum.photos/seed/5/800/600',
    year: '2024',
  },
  {
    id: '6',
    title: 'Studio Lumière',
    category: 'Web Design',
    description: 'Desenvolvimento de portfólio para um fotógrafo editorial de alta moda.',
    imageUrl: PlaceHolderImages.find(img => img.id === 'web-2')?.imageUrl || 'https://picsum.photos/seed/6/800/600',
    year: '2023',
  },
];
