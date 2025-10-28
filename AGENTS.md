# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Build/Development Commands

- Build: `npm run build` (astro build)
- Development server: `npm run dev` (astro dev)
- Preview: `npm run preview` (astro preview)
- Lint: `npm run lint` (eslint with --fix for .js/.ts/.tsx/.md)
- Format: `npm run pretty` (prettier for src/**/*.{js,ts,tsx,md,mdx,css,scss})

## Project Structure

- Framework: Astro with @astrojs/solid-js and TailwindCSS
- Data fetching: gitevents-fetch package for GitHub event data
- Deployment: Cloudflare Pages via @astrojs/cloudflare adapter
- Testing: Playwright for e2e tests

## Code Style Guidelines

- Framework: Astro pages (.astro) with SolidJS components (.jsx)
- Formatting:
  - No semicolons (semi: false)
  - Single quotes (singleQuote: true)
  - No trailing commas (trailingComma: none)
  - Always wrap prose (proseWrap: always)
- Component naming: PascalCase for components and their files
- Export style: Named exports preferred (export function Component)
- Styles: Use TailwindCSS classes with clsx for conditionals
- Imports: Framework imports first, then relative imports
- Use conventional commits for all commits

## Event Data

Events and speaker data are fetched from the BoulderJS GitHub organization using
the gitevents-fetch package. This package handles all GitHub API interactions
and returns sorted, structured data. Do not manually sort event data as
gitevents-fetch handles this automatically.