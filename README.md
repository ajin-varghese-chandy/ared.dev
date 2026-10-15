# ared.dev

Single-page portfolio for Ajin Varghese Chandy. Next.js 16 App Router + Tailwind CSS 4, fully static, no database, no backend.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command         | Purpose            |
| --------------- | ------------------ |
| `npm run dev`   | Development server |
| `npm run build` | Production build   |
| `npm run start` | Serve the build    |
| `npm run lint`  | ESLint             |

No environment variables are required.

## Editing content

All copy lives in one file: [`lib/content.ts`](lib/content.ts). Update your name, intro, projects, stack, and social links there — no CMS, no admin panel.

## Project structure

```
app/
  layout.tsx      Root layout, font, metadata, JSON-LD
  page.tsx        The single page
  globals.css     Design tokens and base styles
lib/
  content.ts      All site content
```

## Design

Minimal terminal / hacker aesthetic. Near-black background with a faint green
scanline, one green accent (`#00ff57`), and JetBrains Mono for everything —
headings, body, and labels. Sections are prefixed like shell commands
(`$ ls ./projects`, `$ cat ./stack.txt`) and headings end on a blinking caret.

Tokens live in `app/globals.css` under `@theme`. Motion is limited to the caret,
which stops blinking under `prefers-reduced-motion: reduce`.
