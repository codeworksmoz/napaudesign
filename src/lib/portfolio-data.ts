export type Category = 'Todos' | 'Topos de Bolo' | 'Camisetas';

export interface Project {
  id: string;
  title: string;
  category: Category;
  description: string;
  imageurl: string; // ✅ Nome colado em minúsculas
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
  listaesquerda: string[]; // ✅ Nome colado em minúsculas
  listadireita: string[];  // ✅ Nome colado em minúsculas
  imageurl: string;        // ✅ Nome colado em minúsculas
  ativo: boolean;
  created_at?: string;
}

// Frontend utiliza snake_case para facilitar, mapeamos no Admin
export interface HomeContent {
  id?: number;
  hero_title: string;
  hero_subtitle: string;
  hero_image: string;
  service_bolo_desc: string; 
  service_bolo_images: string[]; 
  service_camiseta_desc: string;
  service_camiseta_images: string[]; 
  service_formacao_desc: string;
}

export type DocumentType = 'BI' | 'Passaporte' | 'Carta de Condução' | 'NUIT' | 'Cartão de Eleitor';

export interface Registration {
  id: string; 
  studentname: string;      // ✅ Nome colado em minúsculas
  studentemail: string;     // ✅ Nome colado em minúsculas
  studentphone: string;     // ✅ Nome colado em minúsculas
  courseid: string;         // ✅ Nome colado em minúsculas
  coursetitle: string;      // ✅ Nome colado em minúsculas
  doctype: DocumentType;
  docnumber: string;        // ✅ Nome colado em minúsculas
  docissuedate?: string;
  docexpirydate?: string;
  docissueplace?: string;
  registrationdate: string; // ✅ Nome colado em minúsculas
  status: 'Pendente' | 'Confirmada' | 'Cancelada';
}

export const OFFICIAL_IMAGE = 'https://xywhrhvljrqjzmlznjrv.supabase.co/storage/v1/object/public/produtos/1777400114494-o2faq6.jpg';

export const DEFAULT_HOME_CONTENT: HomeContent = {
  hero_title: 'A Arte de Personalizar Momentos',
  hero_subtitle: 'Especialistas em topos de bolo criativos e camisetas exclusivas. Criamos o detalhe que torna a sua celebração única.',
  hero_image: OFFICIAL_IMAGE,
  service_bolo_desc: 'Topos de bolo personalizados em acrílico, madeira ou papel premium. O detalhe que faltava no seu evento.',
  service_bolo_images: [OFFICIAL_IMAGE],
  service_camiseta_desc: 'Estamparia premium para marcas, eventos e uso pessoal com acabamento superior e duradouro.',
  service_camiseta_images: [OFFICIAL_IMAGE],
  service_formacao_desc: 'Cursos profissionais para quem deseja dominar as técnicas de design e personalização de artigos de festa.'
};
