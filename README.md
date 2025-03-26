# Forrest HR Website

A modern HR consulting website for The Forrest Group, built with React, Vite, TypeScript, and Sanity CMS.

## Project Overview

The Forrest HR website is a comprehensive platform for an HR consulting company that provides services to SMEs across London and the South East. The website includes:

- Company information and services
- Blog system powered by Sanity CMS
- Contact forms and testimonials
- Responsive design with Tailwind CSS

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **CMS**: Sanity.io
- **Additional Backend**: Supabase

## Project Structure

- `/src`: React frontend code
  - `/components`: Reusable UI components
  - `/pages`: Page components
  - `/lib`: Utility functions and API clients
  - `/types`: TypeScript type definitions
- `/forrest`: Sanity Studio configuration (primary)
  - `/schemaTypes`: Sanity content schemas
  - `/structure`: Custom desk structure
- `/public`: Static assets
- `/docs`: Documentation

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd forrest
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit the `.env` file with your Sanity project details (already configured with project ID `ap5b0e0o`).

### Development

1. Start the frontend development server:
```bash
npm run dev
```

2. Start the Sanity Studio development server:
```bash
npm run sanity
```

The frontend will be available at http://localhost:5173 and Sanity Studio at http://localhost:3333.

## Deployment

### Deploying Sanity Studio

```bash
npm run sanity:deploy
```

This will deploy the Sanity Studio to Sanity's servers, making it accessible at `https://forrest.sanity.studio/`.

## Sanity CMS Setup

The project uses Sanity.io as its content management system. The Sanity Studio is configured in the `/forrest` directory.

### Content Types

- **Posts**: Blog articles
- **Authors**: Content creators
- **Categories**: Content categorization
- **Tags**: Additional content classification

### Managing Content

1. Access the Sanity Studio at http://localhost:3333 during development or at https://forrest.sanity.studio/ after deployment.
2. Log in with your Sanity credentials.
3. Create and manage content using the intuitive interface.

## SEO Implementation

The website includes comprehensive SEO features:

- Meta tags for all pages
- Open Graph and Twitter Card support
- Structured data (Schema.org)
- Sitemap and robots.txt

For more details, see [docs/seo-implementation.md](docs/seo-implementation.md).

## Additional Documentation

- [Sanity Setup Guide](docs/sanity-setup-guide.md)
- [SEO Implementation](docs/seo-implementation.md)

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
