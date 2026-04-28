export type Category = 'Todos' | 'Topos de Bolo' | 'Camisetas';

export interface Project {
  id: string;
  title: string;
  category: Category;
  description: string;
  image_url: string;
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
  lista_esquerda: string[];
  lista_direita: string[];
  image_url: string;
  ativo: boolean;
  created_at?: string;
}

export interface HomeContent {
  id?: number;
  hero_title: string;
  hero_subtitle: string;
  hero_image: string;
  service_bolo_desc: string; 
  service_camiseta_desc: string;
  service_formacao_desc: string;
}

export type DocumentType = 'BI' | 'Passaporte' | 'Carta de Condução' | 'NUIT' | 'Cartão de Eleitor';

export interface Registration {
  id: string; 
  student_name: string;
  student_email: string;
  student_phone: string;
  course_id: string;
  course_title: string;
  doc_type: DocumentType;
  doc_number: string;
  doc_issue_date?: string;
  doc_expiry_date?: string;
  doc_issue_place?: string;
  registration_date: string;
  status: 'Pendente' | 'Confirmada' | 'Cancelada';
}

export const DEFAULT_HOME_CONTENT: HomeContent = {
  hero_title: 'A Arte de Personalizar Momentos',
  hero_subtitle: 'Especialistas em topos de bolo criativos e camisetas exclusivas. Criamos o detalhe que torna a sua celebração única.',
  hero_image: 'https://xywhrhvljrqjzmlznjrv.supabase.co/storage/v1/object/public/produtos/1777400114494-o2faq6.jpg',
  service_bolo_desc: 'Topos de bolo personalizados em acrílico, madeira ou papel premium. O detalhe que faltava no seu evento.',
  service_camiseta_desc: 'Estamparia premium para marcas, eventos e uso pessoal com acabamento superior e duradouro.',
  service_formacao_desc: 'Cursos profissionais para quem deseja dominar as técnicas de design e personalização de artigos de festa.'
};
