# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Quartz 4.0** static site generator project used to build the KidsCollab website (migrating from Google Sites). It converts Obsidian-style Markdown notes into a full website with graph view, search, dark mode, popover previews, and more.

## Key Commands

- **`npx quartz build --serve`** — Build and serve the site locally (default content dir)
- **`npx quartz build --serve -d docs`** — Build and serve the docs folder specifically
- **`npx quartz build`** — Production build (outputs to `public/`)
- **`npm test`** — Run unit tests (path utilities + depgraph)
- **`npm run check`** — Type-check with TypeScript and run Prettier check
- **`npm run format`** — Format code with Prettier

## Architecture

Quartz uses a plugin-based content processing pipeline:

1. **Transformers** — Parse and transform Markdown content (frontmatter, links, LaTeX, syntax highlighting, table of contents, Obsidian/GitHub-flavored Markdown)
2. **Filters** — Include/exclude pages (e.g., `RemoveDrafts` filters pages marked as drafts)
3. **Emitters** — Generate output files (HTML pages, content index, sitemap, RSS, assets, redirects, 404)

### Key Directories

- `quartz/plugins/` — Plugin system
  - `transformers/` — Markdown parsing/transformation (frontmatter, links, LaTeX, syntax highlighting, ToC, OSM, GFM)
  - `filters/` — Page selection (draft removal)
  - `emitters/` — Output generation (HTML, index, sitemap, RSS, assets, aliases)
- `quartz/components/` — Preact UI components and inline scripts for frontend features
  - `*.tsx` — Server-side rendered components (Graph, Search, Explorer, Breadcrumbs, Backlinks, Darkmode, ToC, etc.)
  - `scripts/` — Client-side TypeScript for interactivity (graph rendering, SPA routing, search, popover, callouts)
  - `styles/` — SCSS styles per component
- `quartz/util/` — Utilities (path handling, logging, theme, context, performance)
- `quartz/i18n/` — Internationalization (20+ locales)
- `quartz/cli/` — CLI argument parsing and handlers
- `quartz.config.ts` — **Primary customization point**: site title, theme colors, typography, plugins, analytics, base URL
- `quartz/layout.ts` — Page layout configuration (which components appear where, if present)
- `content/` — Markdown content directory (if present)
- `public/` — Build output directory
- `docs/` — Quartz project documentation (also serves as example content)

## Version Bumping Rule

- The website version is tracked in `quartz/components/Version.tsx`
- **Every time you patch, add, or configure something** (any code change), bump the PATCH version (e.g., `0.0.6` → `0.0.7`)
- **Always update this value as part of every code change** — do not forget it
- Do NOT touch the git branch naming (e.g., `v4`) — version only goes in `Version.tsx`

### Customization Points

- **`quartz.config.ts`** — Change site identity, theme colors, typography, locale, analytics, and which plugins to enable
- **`quartz.layout.ts`** — Change component placement for index pages, content pages, tag pages, and folder pages (if present)
- **Custom components** — Add `.tsx` files to `quartz/components/` following existing patterns
- **Custom plugins** — Extend interfaces from `quartz/plugins/types.ts`

## Tech Stack

- TypeScript (ESM), Node.js 20+
- esbuild for bundling
- Preact for UI components
- unified / remark / rehype for Markdown processing
- SCSS for styles
- D3.js for graph visualization
- FlexSearch for full-text search
- pixi.js for WebGL graphics
