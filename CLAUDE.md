# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run pretty

# Run Playwright tests (starts dev server automatically)
npx playwright test

# Install Playwright browsers
npm run pw
```

## Architecture Overview

### Framework & Deployment

This is an Astro SSR (Server-Side Rendered) application configured with:
- **Output mode**: `server` (not static)
- **Adapter**: `@astrojs/cloudflare` for Cloudflare Pages deployment
- **UI Framework**: SolidJS via `@astrojs/solid-js` for interactive components
- **Styling**: Tailwind CSS v4 via Vite plugin

### Data Fetching Architecture

**Critical**: All event, talk, and speaker data comes from the BoulderJS GitHub organization using the `gitevents-fetch` package. This is NOT a REST API or traditional database.

#### How Data Flows

1. **GitHub as Database**: Events are GitHub issues in the `boulder-js/events` repository with structured data in issue bodies
2. **gitevents-fetch Package**: Handles all GitHub GraphQL queries and returns typed, sorted data
3. **src/lib/events.js**: Transforms gitevents-fetch data into UI-friendly format
4. **Pages**: Fetch data server-side in Astro page frontmatter using `await` calls

#### Key Data Functions (src/lib/events.js)

- `fetchUpcomingEvents()` - Gets open events with future dates
- `fetchPastEvents()` - Gets closed events
- `getSpeakers(events)` - Extracts unique speakers from event data
- `fetchTeamMembers(org, teamSlug)` - Gets GitHub org team members

**If you need additional data fields**, they must be added to the gitevents-fetch package (external dependency).

### Environment Variables

Required for development (see .env.example):

- `GH_PAT` - GitHub Personal Access Token with:
  - Resource owner: boulder-js
  - Repository Access: Public Repositories (read only)
  - Organization permissions: Members (read only)

Create token at: https://github.com/settings/personal-access-tokens/new

### Project Structure

```
src/
├── components/          # SolidJS components (client-side interactive)
│   ├── BackgroundImage.jsx
│   ├── DiamondIcon.jsx
│   ├── Footer.jsx
│   └── Header.jsx
├── layouts/            # Astro layouts
│   └── BaseLayout.astro   # Main layout with HTML structure, meta tags
├── lib/               # Data fetching utilities
│   └── events.js      # Wraps gitevents-fetch, transforms data
└── pages/             # Astro pages (file-based routing)
    └── index.astro    # Homepage with server-side data fetching

tests/                 # Playwright e2e tests
```

### Component Hydration

Components use Astro's client directives:
- `client:load` - Hydrate immediately on page load (used for Header, Footer)
- Components without directives render as static HTML

### Styling Approach

- Tailwind CSS v4 configured via Vite plugin (not PostCSS)
- Utility-first classes applied directly in templates
- Design system uses blue/indigo color palette for BoulderJS branding
- Dark mode support via `dark:` variants

## Testing

Playwright configuration (playwright.config.js):
- Test directory: `./tests`
- Runs dev server automatically on `http://localhost:4321`
- Single browser: Chromium
- CI mode: 2 retries, sequential execution

## Deployment

- Deployed to Cloudflare Pages
- Adapter handles SSR with Cloudflare Workers runtime
- Image service: `compile` mode
- Compatibility date must be set for Cloudflare Workers API compatibility

## Common Patterns

### Adding a New Page

1. Create file in `src/pages/` (e.g., `about.astro`)
2. Import BaseLayout
3. Fetch data in frontmatter if needed
4. Use Astro template syntax in page body

### Fetching Event Data

```javascript
---
import { fetchUpcomingEvents } from '../lib/events.js'
const events = await fetchUpcomingEvents()
---
```

### Creating Interactive Components

1. Create `.jsx` file in `src/components/`
2. Use SolidJS syntax (signals, createEffect, etc.)
3. Import and use with `client:load` or other directive in Astro pages

## Important Notes

- Node.js >= 20 required (see engines in package.json)
- Astro uses top-level await in page frontmatter (runs server-side)
- SolidJS components are reactive (different from React)
- GitHub API rate limits apply - use GH_PAT to increase limits
- Event data structure is defined by gitevents-fetch package schema
