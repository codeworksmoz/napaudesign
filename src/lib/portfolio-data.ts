
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
    description: 'A minimalist identity for a luxury boutique hotel focused on sensory experiences.',
    imageUrl: PlaceHolderImages.find(img => img.id === 'branding-1')?.imageUrl || 'https://picsum.photos/seed/1/800/600',
    year: '2023',
  },
  {
    id: '2',
    title: 'Flora Botanicals',
    category: 'Packaging',
    description: 'Organic packaging design for a premium sustainable skincare line.',
    imageUrl: PlaceHolderImages.find(img => img.id === 'branding-2')?.imageUrl || 'https://picsum.photos/seed/2/800/600',
    year: '2024',
  },
  {
    id: '3',
    title: 'Ethereal Spaces',
    category: 'Web Design',
    description: 'Digital experience design for an avant-garde architecture firm.',
    imageUrl: PlaceHolderImages.find(img => img.id === 'web-1')?.imageUrl || 'https://picsum.photos/seed/3/800/600',
    year: '2023',
  },
  {
    id: '4',
    title: 'Organic Forms',
    category: 'Illustration',
    description: 'A series of digital illustrations exploring the fluidity of nature.',
    imageUrl: PlaceHolderImages.find(img => img.id === 'illustration-1')?.imageUrl || 'https://picsum.photos/seed/4/800/600',
    year: '2022',
  },
  {
    id: '5',
    title: 'Velvet Roast',
    category: 'Branding',
    description: 'Brand identity and visual language for a specialty coffee house.',
    imageUrl: PlaceHolderImages.find(img => img.id === 'branding-3')?.imageUrl || 'https://picsum.photos/seed/5/800/600',
    year: '2024',
  },
  {
    id: '6',
    title: 'Studio Lumière',
    category: 'Web Design',
    description: 'Portfolio development for a high-fashion editorial photographer.',
    imageUrl: PlaceHolderImages.find(img => img.id === 'web-2')?.imageUrl || 'https://picsum.photos/seed/6/800/600',
    year: '2023',
  },
];
