# BoulderJS Website

BoulderJS Website is the official website for the BoulderJS JavaScript community
and meetup group in Boulder, Colorado. This platform showcases upcoming events,
features speakers, and provides community resources.

## Technology Stack

- **Framework**: SolidJS with @solidjs/start (a Solid meta-framework)
- **Styling**: Tailwind CSS
- **Data Fetching**: Uses @gitevents/fetch to pull event data from GitHub
- **Deployment**: Configured for Cloudflare Pages via Wrangler

## Key Features

- Events management and display
- Speaker profiles and information
- Responsive design with Tailwind CSS
- Community resources and social links
- Photo gallery of past events

## Development Setup

### GitHub Access

- Go to https://github.com/settings/personal-access-tokens/new
- Select "boulder-js" as the Resource owner. If you don't see it, please reach
  out to us on Discord
- Select "Public Repositories" as Repository access
- Select "Members" - Read only as Organization access
- Select "Team Discussions" - Read only as Organization access
- Request the token

### Environment Variables

Copy `.env.example` to `.env` and fill in the `GH_PAT` variable with the token
you generated above.
