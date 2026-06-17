# Template TypeScript Acadêmico

Este repositório é um template simples para projetos acadêmicos em TypeScript com Node.js. A ideia é oferecer uma base enxuta, com tipagem estrita, organização clara de arquivos e comandos prontos para desenvolvimento, build e lint.

## O que inclui

- TypeScript com `strict` ativado
- Execução em ambiente Node.js moderno
- Suporte a variáveis de ambiente com `dotenv`
- Alias de importação `@/` apontando para `src/`
- Verificação e formatação com ESLint e Prettier
- Saída de build em `build/`

## Estrutura

```text
.
├── src/
│   ├── main.ts
│   └── lib/
│       └── stdio.ts
├── types/
│   └── env.d.ts
├── package.json
└── tsconfig.json
```

## Requisitos

- Node.js 20 ou superior
- npm, pnpm ou yarn

## Instalação

```bash
npm install
```

## Scripts

- `npm run dev`: executa o projeto diretamente com `tsx`
- `npm run build`: limpa a pasta `build/`, compila o TypeScript e ajusta os aliases
- `npm run start`: executa a versão compilada em `build/main.js`
- `npm run lint`: verifica o código com ESLint
- `npm run lint:fix`: corrige problemas automaticamente com ESLint
- `npm run format`: formata os arquivos com Prettier
- `npm run format:check`: confere se a formatação está correta

## Como usar

O ponto de entrada atual é `src/main.ts`. Ele já carrega `dotenv/config` e serve como exemplo inicial para testar o ambiente e a leitura de variáveis de ambiente.

Para criar seu trabalho acadêmico, substitua o conteúdo de `main.ts` pela lógica do projeto e organize novas funções, classes ou módulos dentro de `src/`. Se precisar de importações mais limpas, use o alias `@/` para apontar para arquivos internos.

## Variáveis de ambiente

O template já inclui o tipo `NODE_ENV` em `types/env.d.ts`. Caso seu trabalho use outras variáveis, adicione novos campos nessa interface para manter a tipagem alinhada.

## Convenções

- Mantenha a tipagem explícita sempre que fizer sentido
- Prefira módulos pequenos e reutilizáveis
- Deixe lógica de apresentação, domínio e infraestrutura separadas quando o trabalho crescer
- Rode `lint` e `format` antes de entregar o projeto

## Licença

MIT
