# PuppyGuide — Project Manual

## Overview

PuppyGuide is a mobile-first puppy tracker web application built with Next.js, TypeScript, and Tailwind CSS. The initial focus is on **Golden Retrievers**, with the architecture designed to support additional breeds in the future.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Package Manager | npm |
| Version Control | Git / GitHub |

## Repository

- **GitHub:** https://github.com/szymankiewicz1994/puppy-guide
- **Owner:** szymankiewicz1994

## Project Goals

1. Track puppy health, milestones, feeding, and growth for Golden Retrievers
2. Provide a clean mobile-first UI that also works well on desktop
3. Build a breed-agnostic data model from day one so adding new breeds is seamless
4. Keep everything documented and version-controlled on GitHub

## Design Principles

### Mobile-First
- All components are designed for small screens first, then scaled up with Tailwind's `md:` / `lg:` responsive prefixes
- Touch-friendly tap targets (min 44×44px)
- Bottom navigation for mobile, sidebar navigation for desktop

### Breed Extensibility
- Breed-specific data (weight ranges, vaccination schedules, milestones) lives in `/src/data/breeds/`
- A `Breed` interface defines the contract — adding a new breed means adding a new data file
- UI components receive breed config as props and never hardcode Golden Retriever specifics

## Folder Structure

```
puppy-guide/
├── src/
│   ├── app/              # Next.js App Router pages & layouts
│   ├── components/       # Reusable UI components
│   ├── data/
│   │   └── breeds/       # Per-breed config files (golden-retriever.ts, ...)
│   ├── lib/              # Utilities and helpers
│   └── types/            # Shared TypeScript interfaces
├── public/               # Static assets
├── CLAUDE.md             # This file — project manual for AI coding agents
└── README.md             # Public-facing project documentation
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev        # http://localhost:3000

# Type check
npm run lint

# Production build
npm run build
```

## Git Workflow

- `main` — stable, production-ready code
- Feature branches: `feature/<short-description>`
- Commit style: conventional commits (`feat:`, `fix:`, `docs:`, `chore:`)

## Key Conventions

- **Components:** PascalCase, one component per file
- **Files/folders:** kebab-case
- **Types/interfaces:** defined in `/src/types/`, exported and reused — never inline in components
- **Tailwind:** utility-first; no custom CSS unless absolutely necessary
- **No hardcoded breed data** in components — always pull from `/src/data/breeds/`
