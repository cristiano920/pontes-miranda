# Guia de Migração para React + Tailwind CSS + TypeScript + shadcn/ui

Este documento descreve como migrar a landing page vanilla (HTML/CSS/JS) da **Pontes Miranda Advogados** para uma arquitetura moderna baseada em **React**, **Tailwind CSS**, **TypeScript** e **shadcn/ui**, utilizando os componentes criados.

---

## 🏛️ Por que a pasta `components/ui` é Importante?

No ecossistema **shadcn/ui**, a pasta `components/ui` (ou `@/components/ui`) é o local padrão para registrar os componentes de interface básicos (primitivos) do projeto (ex: botões, inputs, cards, caixas de diálogo). 

É de extrema importância manter essa estrutura devido aos seguintes pontos:
1. **Configuração do CLI da shadcn/ui:** O arquivo de configuração `components.json` mapeia os caminhos padrão do projeto. Ao executar `npx shadcn@latest add <componente>`, a ferramenta escreve o código diretamente na pasta mapeada (por padrão, `components/ui`). Se a pasta não existir ou os caminhos estiverem desalinhados, os comandos de instalação falharão ou criarão arquivos em locais errados.
2. **Separação de Preocupações (Separation of Concerns):** Organiza e separa os componentes de uso geral (primitivos) dos componentes específicos de páginas (ex: formulários de contato específicos, blocos da Hero, etc.).
3. **Consistência de Importações:** Facilita importações limpas em toda a aplicação (ex: `import { Button } from "@/components/ui/button"`), tornando o código modular, legível e de fácil manutenção.

---

## 🚀 Passo a Passo de Configuração

### 1. Inicializar o Projeto React com TypeScript e Vite
Execute no terminal para iniciar um novo projeto na pasta de sua escolha (ou na pasta atual `./` se estiver vazia):
```bash
npx -y create-vite@latest ./ --template react-ts
```

### 2. Instalar o Tailwind CSS
Instale o Tailwind CSS e suas dependências, depois inicialize o arquivo de configuração:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Configurar o Tailwind no Vite
Ajuste o arquivo `tailwind.config.js` para processar todos os arquivos TypeScript e React:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
E adicione as diretivas do Tailwind no topo do seu arquivo CSS principal (ex: `src/index.css`):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. Configurar Alias de Caminho (Path Aliases `@/`)
Para que as importações `@/` funcionem corretamente, edite o arquivo `tsconfig.json` (ou `tsconfig.app.json`):
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
E instale o pacote `@types/node` para resolver o `path` no arquivo `vite.config.ts`:
```bash
npm install -D @types/node
```
Modifique o `vite.config.ts`:
```typescript
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### 5. Configurar shadcn/ui
Com o projeto estruturado, rode o CLI de inicialização da shadcn/ui:
```bash
npx shadcn@latest init
```
O CLI fará perguntas de configuração. Responda da seguinte forma:
- **Style:** `Default`
- **Base color:** `Slate` (ou a cor de sua preferência)
- **CSS variables:** `Yes`
- **Paths:** Mantenha os caminhos sugeridos (que usarão `@/components` e `@/lib/utils`).

### 6. Instalar Dependências Necessárias
Instale as dependências usadas pelo componente de Tweet (Social Card), pelo botão animado do WhatsApp e outros elementos gráficos:
```bash
npm install lucide-react clsx tailwind-merge framer-motion
```

### 7. Integrar os Componentes Fornecidos
Copie os arquivos criados nesta sessão:
- [social-card.tsx](file:///c:/Users/crist/Documents/Projetos%20Hero%20SD/Pontes%20Miranda/components/ui/social-card.tsx) para `src/components/ui/social-card.tsx`
- [demo.tsx](file:///c:/Users/crist/Documents/Projetos%20Hero%20SD/Pontes%20Miranda/components/ui/demo.tsx) para `src/components/ui/demo.tsx`
- [whatsapp-button.tsx](file:///c:/Users/crist/Documents/Projetos%20Hero%20SD/Pontes%20Miranda/components/ui/whatsapp-button.tsx) para `src/components/ui/whatsapp-button.tsx`

Use os componentes em seu arquivo `src/App.tsx` (ou layout principal) para visualizá-los em funcionamento:
```typescript
import { SocialCardDemo } from './components/ui/demo';
import { WhatsAppButton } from './components/ui/whatsapp-button';

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* ... rest of the landing page ... */}
      <SocialCardDemo />
      <WhatsAppButton />
    </div>
  );
}
```
