# portfolio

Home do meu portfólio, feita com Vue 3 + TypeScript + Vite.

## rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## build de produção

```bash
npm run build
npm run preview   # pra conferir o build localmente antes de subir
```

O build sai em `dist/` — é essa pasta que vai pro deploy (Vercel, Netlify, GitHub Pages, etc).

## estrutura

```
src/
├── components/     componentes de UI, cada um com uma responsabilidade
├── composables/    lógica reutilizável (por enquanto só o scramble de texto)
├── data/           conteúdo da home (posts, projetos, stack, links)
├── types/          interfaces TypeScript do conteúdo
├── utils/          funções puras (formatação de data)
├── views/          páginas (só HomeView por enquanto)
├── router/         rotas
├── App.vue         layout raiz (nav + view atual + footer)
└── main.ts         entry point
```

## pendências / próximos passos

- [ ] as rotas `/experiencia`, `/projetos` e `/blog` ainda não existem como
      páginas de verdade — o router só tem a home registrada. O link do
      nav pra elas por enquanto não vai encontrar rota (dá 404 do
      vue-router). Dá pra seguir o mesmo padrão de `HomeView.vue` pra
      criar as outras views.
- [ ] `/cv-ludmilla.pdf` é um link placeholder em `data/homeContent.ts`
      — precisa colocar o PDF de verdade em `public/cv-ludmilla.pdf`
      (arquivos em `public/` são servidos como estão, sem passar pelo
      bundler).
- [ ] os links de `socialLinks` (linkedin, github) em `homeContent.ts`
      também são placeholder, trocar pelas URLs reais.
- [ ] o toggle de tema escuro (botão ☀/☾ na nav) só troca o ícone —
      ainda não aplica o tema escuro de verdade. As cores do dark mode
      já existiam num protótipo anterior em HTML puro, dá pra portar
      pra uma segunda camada de CSS custom properties.
- [ ] o seletor de idioma (PT/EN/ES) também é só visual — pra
      funcionar de verdade entra vue-i18n.

## decisões de design (pra quem for mexer depois)

- **CSS scoped por componente**, sem framework de CSS. Os tokens
  (cores, fontes) ficam centralizados em `src/assets/main.css` como
  custom properties (`--signal`, `--ink`, etc.) e cada componente só
  consome via `var(--nome)`.
- **`useTextScramble`** é genérico o bastante pra reusar em qualquer
  texto, não só no nome — só passa o texto e chama `play()`.
- **Dados separados de componentes** (`src/data/`): trocar o conteúdo
  da home não deveria exigir mexer em nenhum `.vue`.
