# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Build/Development Commands

- Build: `npm run build` (vinxi build)
- Development server: `npm run dev` (vinxi dev)
- Production server: `npm run start` (vinxi start)
- Lint: `npm run lint` (eslint with --fix for .js/.ts/.tsx/.md)
- Format: `npm run pretty` (prettier for src/\*_/_.{js,ts,tsx,md,mdx,css,scss})

## Code Style Guidelines

- Framework: SolidJS with @solidjs/start and TailwindCSS
- Path aliases: Use `~/` for src/ directory imports
- Formatting:
  - No semicolons (semi: false)
  - Single quotes (singleQuote: true)
  - No trailing commas (trailingComma: none)
  - Always wrap prose (proseWrap: always)
- Component naming: PascalCase for components and their files
- Export style: Named exports preferred (export function Component)
- Props handling: Use SolidJS splitProps for component props
- Styles: Use TailwindCSS classes with clsx for conditionals
- Imports: Framework imports first, then relative imports
- Error handling: N/A (no specific pattern found)
