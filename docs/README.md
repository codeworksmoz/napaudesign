# Guia de Migração de Dados - Napau Design & Arte

Este documento detalha como transitar da persistência atual em `localStorage` para uma base de dados real (SQL ou NoSQL).

## 1. Estrutura de Tabelas Recomendada

Para manter a compatibilidade com o código atual, crie as seguintes tabelas:

### Tabela `projects` (Portfólio)
- `id`: UUID ou String (Chave Primária)
- `title`: String
- `category`: String (Enum: 'Tipos de Bolo', 'Camisetas', etc.)
- `description`: Text
- `imageUrl`: Text
- `year`: String
- `active`: Boolean

### Tabela `flyers` (Cursos)
- `id`: UUID ou String
- `titulo`: String
- `preco`: String
- `data`: String
- `local`: String
- `listaEsquerda`: Array de Strings (ou tabela relacionada)
- `listaDireita`: Array de Strings
- `imageUrl`: Text
- `ativo`: Boolean

### Tabela `registrations` (Inscrições)
- `id`: String (NP-YYYYMMDD-X)
- `studentName`: String
- `studentPhone`: String
- `studentEmail`: String
- `courseTitle`: String
- `docType`: String
- `docNumber`: String
- `registrationDate`: Timestamp
- `status`: String

## 2. Ficheiros a Editar

### A. `src/app/napau/page.tsx` (Painel Administrativo)
**O que mudar:**
1. No `useEffect`, substitua a leitura do `localStorage` por uma chamada `async` à sua API ou SDK.
2. Nas funções `saveHome`, `saveProjects` e `saveFlyers`, substitua `localStorage.setItem` por comandos `insert` ou `upsert`.

### B. `src/app/page.tsx` e `src/app/cursos/page.tsx`
**O que mudar:**
Substitua a lógica de carregamento no `useEffect` para buscar os dados diretamente da base de dados assim que a página montar.

### C. `src/components/RegistrationForm.tsx`
**O que mudar:**
A função `handleSubmit` deve enviar o objeto `newReg` para a tabela de `registrations` em vez de apenas guardá-lo localmente.

## 3. Exemplo de Substituição (Padrão)

**Antes (Local):**
```typescript
const saved = localStorage.getItem('chave');
setData(JSON.parse(saved));
```

**Depois (Base de Dados - Ex: Supabase):**
```typescript
const { data, error } = await supabase.from('tabela').select('*');
if (!error) setData(data);
```

## 4. Deploy no Netlify
1. Conecte o repositório GitHub ao Netlify.
2. Configure as Variáveis de Ambiente (ENV) no painel do Netlify para as chaves da sua base de dados.
3. O comando de build é `next build`.
