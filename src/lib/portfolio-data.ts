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
  // Novos campos para personalização total
  eventTitle?: string;
  eventSubtitle?: string;
  eventDesc?: string;
  camisetaTitle?: string;
  camisetaDesc?: string;
  boloTitle?: string;
  boloDesc?: string;
  boloWhatIs?: string;
  boloTypesJson?: string; // Armazenado como JSON string para a lista de tipos
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

export const DEFAULT_BOLO_TYPES = [
  { id: 1, title: 'Foto Comestível', price: '150Mt', desc: 'Impressão em papel de arroz com tinta comestível. Pronto em 24h.' },
  { id: 2, title: 'Acrílico Dourado', price: '400Mt', desc: 'Corte a laser em acrílico espelhado ou MDF. Prazo: 2-3 dias.' },
  { id: 3, title: 'Biscuit 3D', price: '350Mt', desc: 'Modelado à mão. Personagens e noivinhos. Prazo: 3-5 dias.' },
  { id: 4, title: 'Flores Naturais', price: '200Mt', desc: 'Rosas e folhagens de verdade. Sofisticado. Pronto em 1 dia.' },
  { id: 5, title: 'Flores de Açúcar', price: '800Mt', desc: 'Flores realistas pétala por pétala. Luxo. Prazo: 5-7 dias.' },
  { id: 6, title: 'Toppers Papel/Balões', price: '100Mt', desc: 'Bandeirinhas e balões mini. Montagem rápida e colorida.' },
];

export const DEFAULT_HOME_CONTENT: HomeContent = {
  heroTitle: 'A Arte de Personalizar Momentos',
  heroSubtitle: 'Especialistas em topos de bolo criativos e camisetas exclusivas. Criamos o detalhe que torna a sua celebração única.',
  heroImage: OFFICIAL_IMAGE,
  serviceBoloDesc: 'Topos de bolo personalizados em acrílico, madeira ou papel premium. O detalhe que faltava no seu evento.',
  serviceBoloImages: [OFFICIAL_IMAGE],
  serviceCamisetaDesc: 'Estamparia premium para marcas, eventos e uso pessoal com acabamento superior e duradouro.',
  serviceCamisetaImages: [OFFICIAL_IMAGE],
  serviceFormacaoDesc: 'Cursos profissionais para quem deseja dominar as técnicas de design e personalização de artigos de festa.',
  eventTitle: 'PERSONALIZE SEU EVENTO',
  eventSubtitle: 'De camisetas a bolos - tudo com a sua cara',
  eventDesc: 'Aqui na Napau você cria produtos únicos pra sua festa. Do look à mesa do bolo, com o mesmo tema.',
  camisetaTitle: '👕 DESIGNER DE CAMISETAS ONLINE',
  camisetaDesc: 'Crie sua estampa direto no site. Nomes, fotos, logos e frases do seu jeito.',
  boloTitle: '🎂 TOPOS DE BOLO PERSONALIZADOS',
  boloDesc: 'O detalhe que transforma seu bolo em protagonista da festa.',
  boloWhatIs: 'É o enfeite decorativo que vai em cima do bolo pra personalizar com tema, nome, idade ou foto especial.',
  boloTypesJson: JSON.stringify(DEFAULT_BOLO_TYPES)
};