-- SCHEMA SQL PARA SUPABASE - NAPAU DESIGN & ARTE

-- 1. Tabela: home_content
CREATE TABLE public.home_content (
  id bigint PRIMARY KEY DEFAULT 1,
  "heroTitle" text DEFAULT 'A Arte de Personalizar Momentos',
  "heroSubtitle" text DEFAULT 'Especialistas em topos de bolo criativos e camisetas exclusivas.',
  "heroImage" text,
  "serviceBoloDesc" text,
  "serviceBoloImages" text[] DEFAULT '{}',
  "serviceCamisetaDesc" text,
  "serviceCamisetaImages" text[] DEFAULT '{}',
  "serviceFormacaoDesc" text,
  created_at timestamp with time zone DEFAULT now()
);

-- 2. Tabela: projects
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  description text,
  imageurl text,
  year text DEFAULT '2025',
  active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

-- 3. Tabela: flyers
CREATE TABLE public.flyers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  preco text DEFAULT '0 MT',
  data text DEFAULT 'A anunciar',
  local text DEFAULT 'Maputo',
  contactos text DEFAULT '+258 84 761 5871',
  listaesquerda text[] DEFAULT '{}',
  listadireita text[] DEFAULT '{}',
  imageurl text,
  ativo boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- 4. Tabela: registrations
CREATE TABLE public.registrations (
  id text PRIMARY KEY,
  courseid uuid REFERENCES public.flyers(id),
  coursetitle text,
  studentname text NOT NULL,
  studentemail text NOT NULL,
  studentphone text NOT NULL,
  doctype text NOT NULL,
  docnumber text NOT NULL,
  registrationdate timestamp with time zone DEFAULT now(),
  status text DEFAULT 'Pendente',
  created_at timestamp with time zone DEFAULT now()
);

-- 5. STORAGE BUCKET
-- Certifique-se de criar o bucket "produtos" no dashboard e ativar acesso público.
