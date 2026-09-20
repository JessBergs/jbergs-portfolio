# Jessica Bergs - Portfolio Website

A modern, minimalist portfolio website built with React, TypeScript, and Vite.

## Tech Stack

- **React 19.0** (latest stable)
- **TypeScript 5.7**
- **Vite 6.0** for fast development and building
- **Tailwind CSS v4** for styling
- **React Router 7** for navigation
- **Lucide React** for icons
- **Zod** for schema validation

## Prerequisites

- Node.js 24.0.0 or higher
- npm 10.0.0 or higher

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to GitHub Pages

### Option 1: GitHub Actions (Recommended)

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the `main` branch.

1. Go to your repository settings
2. Navigate to Pages → Source
3. Select "GitHub Actions" as the source
4. Push to main branch, and the site will be automatically deployed

### Option 2: Manual Deployment

```bash
npm run deploy
```

This builds the project and deploys the `dist` folder to the `gh-pages` branch.

## Project Structure

```
src/
├── components/
│   ├── Hero.tsx       # Hero section with name and intro
│   ├── About.tsx      # About section with bio and skills
│   ├── Projects.tsx   # Project cards/tiles
│   ├── Footer.tsx     # Footer with links
│   └── Layout.tsx     # Main layout wrapper
├── pages/
│   ├── Home.tsx       # Home page
│   └── ProjectDetail.tsx  # Individual project details page
├── types/
│   └── Project.ts     # TypeScript types and schemas
├── App.tsx            # Main app component with routing
├── main.tsx           # Entry point
└── index.css          # Global styles with Tailwind
```

## Customization

- **Colors**: Tailwind CSS v4 theme configuration in [src/index.css](src/index.css)
- **Font**: Using Montserrat from Google Fonts (closest alternative to Proxima Nova)
- **Projects**: Edit the projects data in [src/data/projects.json](src/data/projects.json)
- **Content**: Update text in component files in [src/components/](src/components/) and [src/pages/](src/pages/)
- **Types**: Project types and schemas defined in [src/types/Project.ts](src/types/Project.ts)

## Features

- **Routing**: Client-side routing with React Router for smooth page transitions
- **Type Safety**: Zod schemas for runtime validation and TypeScript types
- **Icons**: Lucide React for consistent, lightweight icons
- **Responsive Design**: Tailwind CSS utilities for mobile-first responsive design

## Notes

- **Proxima Nova**: This font is not available on Google Fonts. Montserrat is used as a close alternative. If you have a Proxima Nova license, you can add it via custom fonts.
- **Base URL**: The Vite config is set with `base: '/jbergs-portfolio/'` for GitHub Pages. Update this if deploying elsewhere.
- **Tailwind CSS v4**: This project uses the latest Tailwind CSS v4 with the new @tailwindcss/vite plugin.
