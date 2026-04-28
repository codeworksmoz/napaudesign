export type Category = 'Todos' | string;

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageurl: string;
  year: string;
  active: boolean;
  created_at?: string;
  client_name?: string;
  materials?: string;
}

export interface Flyer {
  id: string;
  titulo: string;
  preco: string;
  data: string;
  local: string;
  contactos: string;
  listaesquerda: string[];
  listadireita: string[];
  imageurl: string;
  ativo: boolean;
  created_at?: string;
}

export interface HomeContent {
  id?: number;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  serviceBoloDesc: string; 
  serviceBoloImages: string[]; 
  serviceCamisetaDesc: string;
  serviceCamisetaImages: string[]; 
  serviceFormacaoDesc: string;
}

export type DocumentType = 'BI' | 'Passaporte' | 'Carta de Condução' | 'NUIT' | 'Cartão de Eleitor';

export interface Registration {
  id: string; 
  studentname: string;      
  studentemail: string;     
  studentphone: string;     
  courseid: string;         
  coursetitle: string;      
  doctype: DocumentType;
  docnumber: string;        
  registrationdate: string; 
  status: 'Pendente' | 'Confirmada' | 'Cancelada';
}

export const OFFICIAL_IMAGE = 'https://xywhrhvljrqjzmlznjrv.supabase.co/storage/v1/object/public/produtos/1777400114494-o2faq6.jpg';

export const DEFAULT_HOME_CONTENT: HomeContent = {
  heroTitle: 'A Arte de Personalizar Momentos',
  heroSubtitle: 'Especialistas em topos de bolo criativos e camisetas exclusivas. Criamos o detalhe que torna a sua celebração única.',
  heroImage: OFFICIAL_IMAGE,
  serviceBoloDesc: 'Topos de bolo personalizados em acrílico, madeira ou papel premium. O detalhe que faltava no seu evento.',
  serviceBoloImages: [OFFICIAL_IMAGE],
  serviceCamisetaDesc: 'Estamparia premium para marcas, eventos e uso pessoal com acabamento superior e duradouro.',
  serviceCamisetaImages: [OFFICIAL_IMAGE],
  serviceFormacaoDesc: 'Cursos profissionais para quem deseja dominar as técnicas de design e personalização de artigos de festa.'
};
