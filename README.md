# Lara Charantola: aulas e traduções

## 🚀 Sobre o projeto:
...

## 📌 Pré-requisitos:

Antes de começar, certifique-se de ter instalado em sua máquina:

* **Node.js** (versão 18 ou superior) — [Download](https://nodejs.org/)
* **npm** (já vem junto com o Node.js)
* **Git** — [Download](https://git-scm.com/)

Para verificar se já estão instalados, rode no terminal:

```bash
node -v
npm -v
git --version
```

## 📌 Guia de instalação:

*Clonar o repositório*

`git clone <url-do-repositorio>`

*Entrar na pasta do projeto*

`cd english-plataform-web`

*Instalar dependências*

`npm install`

*Rodar o projeto em desenvolvimento*

`npm run dev`

## 📌 Extensões que vão auxiliar no desenvolvimento:

#### vscode - styled-components - transforma o css estático dos componentes em css dinâmico com auto-complete.
#### Eslint - verifica erros de formatação e importação no código
#### Prettier - formata o código ao salvar as alterações
#### GitLens - ajuda a acompanhar o histŕico de commits


## 📌 Convensão para commits:

Neste projeto, utilizamos o padrão de **Conventional Commits**. As mensagens devem seguir a seguinte estrutura:

`tipo: descrição curta`

**Principais tipos:**
* `feat`: Uma nova funcionalidade.
* `fix`: Correção de um erro.
* `docs`: Alterações apenas na documentação.
* `style`: Alterações que não afetam o significado do código (espaços, formatação).
* `refactor`: Alteração de código que não corrige erro nem adiciona funcionalidade.
* `chore`: Atualização de tarefas de build, pacotes, etc. (ex: configurar PWA). 

## 📌 Boas Práticas: Commits Atômicos
Mantenha cada commit focado em uma única alteração lógica. Se você precisa usar a palavra "e" para descrever o que fez, o commit deve ser dividido.

Foco Único: Não misture refatoração, correções e novas funcionalidades no mesmo envio.

Prefira 3 commits pequenos a 1 gigante. Isso facilita o code review.

Exemplo:

❌ feat: adiciona login e altera cores do header

✅ feat: implementa fluxo de login

✅ style: atualiza paleta de cores do header

Dica: Use git add -p para escolher partes específicas de um arquivo para o próximo commit.


## 📌 Padrão de criação de componentes:

Cada componente deve ter sua própria pasta com a seguinte estrutura:

```
components/
└── Button/
    ├── index.tsx       # Componente principal
    └── styles.ts       # Estilos com styled-components
```

* Nome da pasta e do componente em **PascalCase** (ex: `UserCard`, `LoginForm`)
* Estilos sempre em arquivo separado `styles.ts` usando **styled-components**

Exemplo básico:

```tsx
// components/Button/styles.ts
import styled from 'styled-components'

export const Container = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
`
```

```tsx
// components/Button/index.tsx
import { Container } from './styles'

interface ButtonProps {
  label: string
  onClick: () => void
}

function Button({ label, onClick }: ButtonProps) {
  return <Container onClick={onClick}>{label}</Container>
}

export default Button
```

## 📌 Padrão de nomenclatura:

| Item | Padrão | Exemplo |
|------|--------|---------|
| Componentes | PascalCase | `UserCard.tsx` |
| Pastas de componentes | PascalCase | `UserCard/` |
| Pastas de páginas | PascalCase | `Login/` |
| Funções e variáveis | camelCase | `handleSubmit`, `userName` |
| Arquivos de estilo | camelCase | `styles.ts` |
| Constantes globais | UPPER_SNAKE_CASE | `API_BASE_URL` |

## 📌 Tecnologias utilizadas:

* [React](https://react.dev/) — Biblioteca para construção de interfaces
* [TypeScript](https://www.typescriptlang.org/) — Tipagem estática para JavaScript
* [Vite](https://vite.dev/) — Bundler rápido para desenvolvimento
* [styled-components](https://styled-components.com/) — CSS-in-JS para estilização
* [ESLint](https://eslint.org/) — Linter para manter qualidade do código


