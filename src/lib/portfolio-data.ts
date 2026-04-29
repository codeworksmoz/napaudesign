import { HomeContent, Project, Flyer, Registration, DocumentType, Category } from './types';

// Re-exportar tipos para manter compatibilidade com componentes existentes
export type { HomeContent, Project, Flyer, Registration, DocumentType, Category };

export const OFFICIAL_IMAGE = 'https://xywhrhvljrqjzmlznjrv.supabase.co/storage/v1/object/public/produtos/1777400114494-o2faq6.jpg';

export const DEFAULT_BOLO_TYPES = [
  { id: 1, title: 'Foto Comestível', price: '150Mt', desc: 'A sua foto favorita impressa em papel de arroz com tinta comestível. Perfeito para aniversários e surpresas. Pronto em 24h.' },
  { id: 2, title: 'Acrílico Dourado', price: '400Mt', desc: 'Corte a laser em acrílico espelhado dourado ou MDF. Elegante, reutilizável e lindo. O preferido dos 15 anos e casamentos. Prazo: 2-3 dias.' },
  { id: 3, title: 'Biscuit 3D', price: '350Mt', desc: 'Modelado à mão. Personagens, flores, noivinhos — tudo em biscuit ou pasta americana. 100% comestível. Prazo: 3-5 dias.' },
  { id: 4, title: 'Flores Naturais', price: '200Mt', desc: 'Rosas e folhagens de verdade. Perfeito para bolos rústicos, casamentos e celebrações ao ar livre. Pronto em 1 dia.' },
  { id: 5, title: 'Flores de Açúcar', price: '800Mt', desc: 'Cada pétala é feita à mão. Réplicas realistas que não murcham. Para casamentos de luxo. Prazo: 5-7 dias.' },
  { id: 6, title: 'Toppers de Papel', price: '100Mt', desc: 'Bandeirinhas, plaquinhas e mini balões em palito. Rápido, colorido e divertido para festas infantis. Montagem imediata.' },
];

export const DEFAULT_HOME_CONTENT: HomeContent = {
  heroTitle: 'A Arte de Personalizar Momentos',
  heroSubtitle: 'Especialistas em topos de bolo criativos e camisetas exclusivas. Criamos o detalhe que torna a sua celebração única.',
  heroImage: OFFICIAL_IMAGE,
  serviceBoloDesc: 'Topos de bolo personalizados em acrílico, madeira ou papel premium.',
  serviceBoloImages: [OFFICIAL_IMAGE],
  serviceCamisetaDesc: 'Estamparia premium para marcas, eventos e uso pessoal.',
  serviceCamisetaImages: [OFFICIAL_IMAGE],
  serviceFormacaoDesc: 'Cursos profissionais para dominar o design de festas.',
  eventTitle: 'PERSONALIZE SEU EVENTO',
  eventSubtitle: 'De camisetas a bolos, tudo com a sua cara.',
  eventDesc: 'A sua festa merece ser única — e a Napau existe para isso. Cada detalhe do seu evento conta uma história. Seja no look que veste ou na mesa do bolo, a gente transforma a sua ideia em algo que ninguém vai esquecer.',
  camisetaTitle: '👕 CAMISETAS QUE TÊM A SUA ESSÊNCIA',
  camisetaDesc: 'Já pensou entrar na sua própria festa vestindo uma camiseta criada exclusivamente para você? Seja para aniversário, casamento, evento corporativo ou aquele brinde especial — a gente faz acontecer.\n\n✨ Porque as pessoas amam:\n· Estampas que contam a sua história\n· Modelos confortáveis que vestem bem\n· Qualidade que se sente ao tocar',
  boloTitle: '🎂 TOPOS DE BOLO QUE FAZEM PARAR A FESTA',
  boloDesc: 'Sabe aquele momento em que todos se aproximam da mesa do bolo? É ali que a magia acontece. O topo de bolo é a joia da coroa da sua celebração.',
  boloWhatIs: 'O que é um topo de bolo? É a peça decorativa que vai no topo do bolo — e que faz toda a diferença. Pode levar nome, idade, foto, tema ou simplesmente ser uma obra de arte comestível que arranca suspiros.',
  boloTypesJson: JSON.stringify(DEFAULT_BOLO_TYPES),
  instagramLink: 'https://instagram.com/napau_design',
  facebookLink: 'https://facebook.com/napaudesign',
  tiktokLink: 'https://tiktok.com/@napau_design',
  whatsappNumber: '258847615871'
};
