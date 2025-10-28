# BoulderJS Website

The official website for the BoulderJS JavaScript community and meetup group in
Boulder, Colorado. This platform showcases upcoming events, features speakers,
and provides community resources.

## Technology Stack

- **Framework**: Astro with @astrojs/solid-js
- **Styling**: Tailwind CSS v4
- **Data Fetching**: gitevents-fetch package to pull event data from GitHub
- **Deployment**: Cloudflare Pages via @astrojs/cloudflare adapter
- **Testing**: Playwright for e2e tests

## Key Features

- Events management and display
- Speaker profiles with GitHub integration
- Responsive design with Tailwind CSS
- Community resources and social links
- Server-side data fetching for optimal performance

## Development Setup

### Prerequisites

- Node.js >= 20
- npm

### GitHub Access

To fetch event data during development, you'll need a GitHub Personal Access
Token:

1. Go to https://github.com/settings/personal-access-tokens/new
2. Select "boulder-js" as the Resource owner (if you don't see it, reach out on
   Discord)
3. Select "Public Repositories" as Repository access
4. Select the following organization permissions:
   - Members: Read-only
   - Team Discussions: Read-only
5. Request the token

### Environment Variables

Copy `.env.example` to `.env` and add your `GH_PAT`:

```bash
GH_PAT=your_github_token_here
```

### Event Data

All event, talk, and speaker data is fetched from the BoulderJS GitHub
organization using the [gitevents-fetch](https://github.com/gitevents/fetch)
package. This library handles all GitHub API GraphQL queries and returns
structured, sorted data.

If you need additional data fields from GitHub, please open a PR to the
gitevents-fetch library.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Format code
npm run pretty
```

## Project Structure

```
src/
├── components/     # SolidJS components
│   ├── BackgroundImage.jsx
│   ├── DiamondIcon.jsx
│   ├── Footer.jsx
│   └── Header.jsx
├── layouts/        # Astro layouts
│   └── BaseLayout.astro
├── lib/           # Utility libraries
│   └── events.js  # Event data fetching
└── pages/         # Astro pages (routes)
    └── index.astro
```

## Deployment

The site is deployed to Cloudflare Pages. The deployment is configured via the
`@astrojs/cloudflare` adapter and runs automatically on pushes to the main
branch.
