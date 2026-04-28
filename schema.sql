
-- SQL para Napau Design & Arte (Executar no SQL Editor do Supabase)

-- 1. Tabela de Conteúdo da Home (Campos camelCase conforme solicitado)
CREATE TABLE IF NOT EXISTS home_content (
  id bigint PRIMARY KEY DEFAULT 1,
  heroTitle text,
  heroSubtitle text,
  heroImage text,
  serviceBoloDesc text,
  serviceBoloImages text[], -- Array de URLs para o carrossel de bolos
  serviceCamisetaDesc text,
  serviceCamisetaImages text[], -- Array de URLs para o carrossel de camisetas
  serviceFormacaoDesc text,
  updated_at timestamptz DEFAULT now()
);

-- Inserir registo inicial se não existir
INSERT INTO home_content (id, heroTitle, heroSubtitle, heroImage)
VALUES (1, 'A Arte de Personalizar Momentos', 'Especialistas em topos de bolo e camisetas.', 'https://xywhrhvljrqjzmlznjrv.supabase.co/storage/v1/object/public/produtos/1777400114494-o2faq6.jpg')
ON CONFLICT (id) DO NOTHING;

-- 2. Tabela de Projetos (Portfólio)
CREATE TABLE IF NOT EXISTS projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  category text, -- 'Topos de Bolo' ou 'Camisetas'
  description text,
  image_url text,
  year text,
  client_name text,
  materials text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- 3. Tabela de Flyers (Cursos)
CREATE TABLE IF NOT EXISTS flyers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo text NOT NULL,
  preco text,
  data text,
  local text,
  contactos text,
  lista_esquerda text[],
  lista_direita text[],
  image_url text,
  ativo boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 4. Tabela de Inscrições
CREATE TABLE IF NOT EXISTS registrations (
  id text PRIMARY KEY, -- Formato NP-YYYYMMDD-X
  student_name text NOT NULL,
  student_email text,
  student_phone text,
  course_id uuid REFERENCES flyers(id),
  course_title text,
  doc_type text,
  doc_number text,
  doc_issue_date date,
  doc_expiry_date date,
  doc_issue_place text,
  registration_date timestamptz DEFAULT now(),
  status text DEFAULT 'Pendente'
);

-- Habilitar RLS (Row Level Security) - Nota: O administrador deve configurar as políticas no painel do Supabase.
