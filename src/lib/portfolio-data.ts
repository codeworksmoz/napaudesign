
export type Category = 'Todos' | 'Topos de Bolo' | 'Camisetas';

export interface Project {
  id: string;
  title: string;
  category: Category;
  description: string;
  imageUrl: string;
  year: string;
  active: boolean;
  created_at?: string;
}

export interface Flyer {
  id: string;
  titulo: string;
  preco: string;
  data: string;
  local: string;
  contactos: string;
  listaEsquerda: string[];
  listaDireita: string[];
  imageUrl: string;
  ativo: boolean;
  created_at?: string;
}

export interface HomeContent {
  id?: number;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  serviceBoloDesc: string; 
  serviceCamisetaDesc: string;
  serviceFormacaoDesc: string;
}

export type DocumentType = 'BI' | 'Passaporte' | 'Carta de Condução' | 'NUIT' | 'Cartão de Eleitor';

export interface Registration {
  id: string; 
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseId: string;
  courseTitle: string;
  docType: DocumentType;
  docNumber: string;
  docIssueDate?: string;
  docExpiryDate?: string;
  docIssuePlace?: string;
  registrationDate: string;
  status: 'Pendente' | 'Confirmada' | 'Cancelada';
}

export const DEFAULT_HOME_CONTENT: HomeContent = {
  heroTitle: 'A Arte de Personalizar Momentos',
  heroSubtitle: 'Especialistas em topos de bolo criativos e camisetas exclusivas. Criamos o detalhe que torna a sua celebração única.',
  heroImage: 'https://picsum.photos/seed/napau-hero/1200/800',
  serviceBoloDesc: 'Topos de bolo personalizados em acrílico, madeira ou papel premium. O detalhe que faltava no seu evento.',
  serviceCamisetaDesc: 'Estamparia premium para marcas, eventos e uso pessoal com acabamento superior e duradouro.',
  serviceFormacaoDesc: 'Cursos profissionais para quem deseja dominar as técnicas de design e personalização de artigos de festa.'
};
