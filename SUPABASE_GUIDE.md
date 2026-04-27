
# Guia de Integração Supabase - Napau Design & Arte

Este projeto foi construído utilizando `localStorage` para persistência imediata e ultra-rápida. Para migrar para o Supabase no seu deploy Netlify, siga estes passos:

## 1. Configuração do Supabase
Crie as seguintes tabelas no seu painel Supabase:

### Tabela `projects`
- `id`: uuid (primary key)
- `title`: text
- `category`: text (Tipos de Bolo, Camisetas, Design Personalizado, Kits Revenda)
- `description`: text
- `imageUrl`: text
- `year`: text
- `active`: boolean

### Tabela `flyers`
- `id`: uuid (primary key)
- `titulo`: text
- `preco`: text
- `data`: text
- `local`: text
- `contactos`: text
- `listaEsquerda`: text[] (array de strings)
- `listaDireita`: text[] (array de strings)
- `imageUrl`: text
- `ativo`: boolean

### Tabela `home_content`
- `id`: int (pk)
- `heroTitle`: text
- `heroSubtitle`: text
- `heroImage`: text
- `serviceBoloDesc`: text
- `serviceCamisetaDesc`: text
- `serviceFormacaoDesc`: text

## 2. Instalação
No terminal, instale o cliente Supabase:
```bash
npm install @supabase/supabase-js
```

## 3. Substituição do Código
No ficheiro `src/app/admin/page.tsx` e `src/app/page.tsx`:

1.  **Importe o cliente:**
    ```typescript
    import { createClient } from '@supabase/supabase-js'
    const supabase = createClient(URL, KEY)
    ```

2.  **Substitua o `useEffect`:**
    Em vez de:
    ```typescript
    const saved = localStorage.getItem('napau_projects');
    ```
    Use:
    ```typescript
    const { data } = await supabase.from('projects').select('*');
    setProjects(data);
    ```

3.  **Substitua as funções de salvar:**
    Em vez de:
    ```typescript
    localStorage.setItem('napau_projects', JSON.stringify(newList));
    ```
    Use:
    ```typescript
    await supabase.from('projects').upsert(projectData);
    ```

## 4. Deploy no Netlify
1. Conecte o repositório GitHub ao Netlify.
2. Defina as Environment Variables no Netlify:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. O build command deve ser `next build`.
