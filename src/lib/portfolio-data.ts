export type Category = 'Todos' | 'Topos de Bolo' | 'Camisetas' | 'Design Personalizado' | 'Kits Revenda';

export interface Project {
  id: string;
  title: string;
  category: Category;
  description: string;
  imageUrl: string;
  year: string;
  active: boolean;
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
}

export interface HomeContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  serviceBoloDesc: string;
  serviceCamisetaDesc: string;
  serviceFormacaoDesc: string;
}

export type DocumentType = 'BI' | 'Passaporte' | 'Carta de Condução' | 'NUIT' | 'Cartão de Eleitor';

export interface Registration {
  id: string; // NP[YYYYMMDD]/[index]
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
  serviceBoloDesc: 'Topos de bolo personalizados em acrílico, madeira ou papel premium para dar o toque final perfeito à sua festa.',
  serviceCamisetaDesc: 'Estamparia premium para marcas, eventos e uso pessoal com acabamento superior e duradouro.',
  serviceFormacaoDesc: 'Cursos profissionais para quem deseja dominar as técnicas de design e personalização de artigos de festa.'
};

export const DEFAULT_FLYERS: Flyer[] = [
  {
    id: '1',
    titulo: 'Workshop de Topos de Bolo Criativos',
    preco: '3.500 MT',
    data: 'Em breve',
    local: 'AV. ACORDOS DE LUSAKA, PARAGEM BALTAZAR',
    contactos: '+258 84 761 5871',
    listaEsquerda: [
      "DESIGN DE TOPOS 3D",
      "CORTE EM ACRÍLICO",
      "MONTAGEM DE CAMADAS",
      "TOPOS COM LED",
      "TÉCNICAS DE PAPELARIA"
    ],
    listaDireita: [
      "ACABAMENTOS DOURADOS",
      "FONTES E TIPOGRAFIA",
      "PRECIFICAÇÃO",
      "FORNECEDORES",
      "MARKETING CRIATIVO"
    ],
    imageUrl: 'https://picsum.photos/seed/topper-class/1000/1200',
    ativo: true
  }
];

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Topo de Bolo Casamento Moderno',
    category: 'Topos de Bolo',
    description: 'Topo de bolo personalizado em acrílico dourado espelhado com o nome dos noivos.',
    imageUrl: 'https://picsum.photos/seed/topper-gold/800/600',
    year: '2024',
    active: true
  },
  {
    id: '2',
    title: 'Camiseta Napau Signature',
    category: 'Camisetas',
    description: 'Design exclusivo Napau com impressão de alta definição.',
    imageUrl: 'https://picsum.photos/seed/tshirt-napau/800/600',
    year: '2024',
    active: true
  }
];
