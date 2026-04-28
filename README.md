

## 📄 `README.md`

```markdown
# 🎨 Napau Design & Arte

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://napaudesign.netlify.app)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)

**Plataforma profissional digital** para a Napau Design & Arte — especializada em **topos de bolo artísticos** e **camisetas personalizadas** em Moçambique.

<div align="center">
  <img src="https://napaudesign.netlify.app/og-image.jpg" alt="Napau Design & Arte Preview" width="600" />
</div>

---

## ✨ Funcionalidades

### 🖥️ Site Público
- **Hero Section** dinâmica com imagem de fundo e conteúdo editável
- **Galeria de Portfólio** com lightbox e filtros por categoria
- **Página de Cursos** com flyers interativos e formulário de inscrição
- **Design Responsivo** otimizado para mobile, tablet e desktop
- **Otimização de Imagens** via `next/image` para carregamento rápido
- **WhatsApp Direct** — botão flutuante para contacto imediato

### 🔐 Painel Administrativo (`/napau`)
- **Autenticação Segura** via Supabase Auth (email + senha)
- **Gestão de Conteúdo** — editar textos, imagens e descrições da Home
- **Portfólio CRUD** — adicionar, editar e remover trabalhos com upload de fotos
- **Flyers de Cursos** — criar e gerir cursos com listas de tópicos, preços e datas
- **Inscrições** — visualizar, imprimir e gerir alunos registados
- **Suporte Integrado** — contacto direto via email e WhatsApp com a Codworks

### ⚡ Performance
- **Server Components** do Next.js para carregamento ultrarrápido
- **Cache Inteligente** de dados do Supabase
- **Imagens Responsivas** com formatos modernos (WebP)

---

## 🛠️ Stack Tecnológica

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| [Next.js](https://nextjs.org/) | 15.5 | Framework React com SSR/SSG |
| [React](https://react.dev/) | 19.2 | Biblioteca de UI |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Tipagem estática |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4 | Estilos utilitários |
| [Supabase](https://supabase.com/) | 2.49 | Backend (Auth, DB, Storage) |
| [shadcn/ui](https://ui.shadcn.com/) | Latest | Componentes de UI |
| [Radix UI](https://www.radix-ui.com/) | Latest | Primitivas acessíveis |
| [Lucide Icons](https://lucide.dev/) | Latest | Ícones modernos |
| [React Hook Form](https://react-hook-form.com/) | 7.54 | Formulários performantes |
| [Zod](https://zod.dev/) | 3.24 | Validação de esquemas |
| [Recharts](https://recharts.org/) | 2.15 | Gráficos (dashboard) |
| [QRCode.react](https://www.npmjs.com/package/qrcode.react) | 4.1 | Geração de QR Codes |

---

## 📁 Estrutura do Projeto

```
napau-site/
├── public/                         # Ficheiros estáticos
│   └── og-image.jpg               # Imagem de partilha social
├── src/
│   ├── app/                        # Rotas do Next.js (App Router)
│   │   ├── page.tsx                # Página inicial
│   │   ├── portfolio/page.tsx      # Galeria de portfólio
│   │   ├── cursos/page.tsx         # Página de cursos
│   │   ├── napau/page.tsx          # 🔒 Painel administrativo
│   │   └── recibo/[id]/page.tsx    # Recibo de inscrição
│   ├── components/                 # Componentes React
│   │   ├── admin/                  # Componentes do painel
│   │   │   └── ImageUpload.tsx     # Upload de imagens
│   │   ├── ui/                     # Componentes shadcn/ui
│   │   ├── Navbar.tsx              # Navegação principal
│   │   ├── Footer.tsx              # Rodapé
│   │   ├── PortfolioCard.tsx       # Card de portfólio
│   │   ├── RegistrationForm.tsx    # Formulário de inscrição
│   │   └── Logo.tsx                # Logo da Napau
│   ├── lib/                        # Utilitários e serviços
│   │   ├── supabase.ts             # Cliente Supabase
│   │   ├── upload.ts               # Serviço de upload de imagens
│   │   └── portfolio-data.ts       # Tipos e dados padrão
│   └── hooks/                      # Custom hooks
│       └── use-toast.ts            # Hook de notificações
├── .env.local                      # Variáveis de ambiente
├── schema.sql                      # Schema do banco de dados
├── tailwind.config.ts              # Configuração do Tailwind
├── tsconfig.json                   # Configuração do TypeScript
├── next.config.js                  # Configuração do Next.js
└── package.json                    # Dependências
```

---

## 🚀 Deploy (Netlify)

A plataforma está configurada para deploy automático no **Netlify** via integração com GitHub.

### Configuração de Build:
- **Build Command:** `npm run build`
- **Publish Directory:** `.next`
- **Node Version:** `20.x`



## 🔒 Segurança

- **Row Level Security (RLS)** — Todas as tabelas protegidas por políticas
- **Autenticação JWT** — Tokens seguros via Supabase Auth
- **Upload Restrito** — Apenas administradores autenticados podem fazer upload
- **HTTPS Obrigatório** — Forçado pelo Netlify e Supabase

---

## 📊 Base de Dados (Supabase)

### Tabelas:
| Tabela | Descrição |
|--------|-----------|
| `home_content` | Conteúdo editável da página inicial |
| `projects` | Portfólio de trabalhos |
| `flyers` | Cursos e workshops |
| `registrations` | Inscrições de alunos |
| `visitas` | Estatísticas de visitas |

### Storage:
| Bucket | Uso |
|--------|-----|
| `produtos` | Imagens do portfólio e flyers |

---

## 👩‍💻 Desenvolvimento

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/napau-site.git
cd napau-site

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Editar .env.local com as chaves do Supabase

# Iniciar servidor de desenvolvimento
npm run dev

# Aceder em http://localhost:9002
```

---


---

## 📞 Suporte Técnico

Desenvolvido com dedicação por **Codworks**.

| Canal | Contacto |
|-------|----------|
| 📧 Email | [codworksmoz@gmail.com](mailto:codworksmoz@gmail.com) |
| 💬 WhatsApp | [+258 85 592 0773](https://wa.me/258855920773) |

---

## 📄 Licença

Este projeto é propriedade da **Napau Design & Arte**.  
Código desenvolvido exclusivamente por **Codworks**.  
Todos os direitos reservados © 2025.

---

<div align="center">
  <p>
    Feito com ❤️ em Moçambique por <strong>Codworks</strong>
  </p>
</div>
```

---

## ✅ Como Usar

1. Substitui `your-badge-id` no badge do Netlify (se quiseres)
2. Substitui `seu-usuario` no link do GitHub
3. Adiciona uma imagem `og-image.jpg` na pasta `public/`
4. Faz commit e push

O README fica profissional, completo e pronto para mostrar a qualquer cliente ou recrutador! 🚀
