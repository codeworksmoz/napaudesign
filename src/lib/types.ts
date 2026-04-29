/**
 * @fileOverview Definições de tipos e interfaces para o ecossistema Napau.
 */

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
  eventTitle?: string;
  eventSubtitle?: string;
  eventDesc?: string;
  camisetaTitle?: string;
  camisetaDesc?: string;
  boloTitle?: string;
  boloDesc?: string;
  boloWhatIs?: string;
  boloTypesJson?: string;
  instagramLink?: string;
  facebookLink?: string;
  tiktokLink?: string;
  whatsappNumber?: string;
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
