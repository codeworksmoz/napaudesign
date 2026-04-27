
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

export const DEFAULT_HOME_CONTENT: HomeContent = {
  heroTitle: 'A Arte de Personalizar Momentos',
  heroSubtitle: 'Especialistas em tipos de bolo artísticos e camisetas exclusivas. Criamos o que você imagina com perfeição.',
  heroImage: 'https://picsum.photos/seed/napau-hero/1200/800',
  serviceBoloDesc: 'Bolos artísticos, temáticos e personalizados para casamentos e aniversários inesquecíveis.',
  serviceCamisetaDesc: 'Estamparia premium para marcas, eventos e uso pessoal com acabamento superior.',
  serviceFormacaoDesc: 'Cursos profissionais de confeitaria para quem deseja dominar as técnicas mais modernas.'
};

export const DEFAULT_FLYERS: Flyer[] = [
  {
    id: '1',
    titulo: 'Curso de Confeitaria Profissional',
    preco: '4.500 MT',
    data: '14 DE DEZEMBRO',
    local: 'AV. ACORDOS DE LUSAKA, PARAGEM BALTAZAR',
    contactos: '+258 84 761 5871 | 86 791 5871',
    listaEsquerda: [
      "BOLO DE ANIVERSÁRIO COM FOTO",
      "BOLO DE CASAMENTO",
      "BOLO GELADO",
      "BOLO TEMÁTICO",
      "BOLACHINHAS SORTIDAS"
    ],
    listaDireita: [
      "CUP-CAKES PERSONALIZADOS",
      "DRIP-CAKES",
      "FLORESTA NEGRA",
      "ORELHUDOS DE CUSTARDE",
      "SOBREMESAS"
    ],
    imageUrl: 'https://picsum.photos/seed/pastry-class/1000/1200',
    ativo: true
  }
];

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
  }
];
