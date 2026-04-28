-- Esquema oficial para Napau Design & Arte (Sincronizado Codworks)

-- 1. home_content (CamelCase)
CREATE TABLE public.home_content (
    id int8 PRIMARY KEY,
    "heroTitle" text,
    "heroSubtitle" text,
    "heroImage" text,
    "serviceBoloDesc" text,
    "serviceBoloImages" text[],
    "serviceCamisetaDesc" text,
    "serviceCamisetaImages" text[],
    "serviceFormacaoDesc" text,
    created_at timestamptz DEFAULT now()
);

-- 2. projects (Lowercase Joined)
CREATE TABLE public.projects (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    category text,
    description text,
    imageurl text,
    year text,
    client_name text,
    materials text,
    active boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
);

-- 3. flyers (Lowercase Joined)
CREATE TABLE public.flyers (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo text NOT NULL,
    preco text,
    data text,
    local text,
    contactos text,
    listaesquerda text[],
    listadireita text[],
    imageurl text,
    ativo boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
);

-- 4. registrations (Lowercase Joined)
CREATE TABLE public.registrations (
    id text PRIMARY KEY,
    courseid uuid REFERENCES public.flyers(id),
    coursetitle text,
    studentname text,
    studentemail text,
    studentphone text,
    doctype text,
    docnumber text,
    docissuedate date,
    docexpirydate date,
    docissueplace text,
    registrationdate timestamptz DEFAULT now(),
    status text DEFAULT 'Pendente',
    created_at timestamptz DEFAULT now()
);

-- Políticas de RLS recomendadas
ALTER TABLE public.home_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Leitura pública para todos
CREATE POLICY "Leitura pública Home" ON public.home_content FOR SELECT USING (true);
CREATE POLICY "Leitura pública Projetos" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Leitura pública Flyers" ON public.flyers FOR SELECT USING (true);
CREATE POLICY "Leitura pública Registos" ON public.registrations FOR SELECT USING (true);

-- Escrita apenas para admin autenticado
CREATE POLICY "Admin escrita Home" ON public.home_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin escrita Projetos" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin escrita Flyers" ON public.flyers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin escrita Registos" ON public.registrations FOR ALL USING (auth.role() = 'authenticated');
