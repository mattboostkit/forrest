# Sanity Studio Documentation

This document provides detailed information about the Sanity Studio configuration for the Forrest blog platform, including setup instructions, content modeling, and workflow guidelines for developers.

## Overview

Sanity Studio is a customizable content management interface that connects to the Sanity backend. In this project, it's configured to manage blog posts, authors, categories, and tags.

## Setup Instructions

### Local Development Setup

1. Navigate to the Sanity Studio directory:

```bash
cd forrest
```

2. Install dependencies (if not already done):

```bash
npm install
```

3. Start the Sanity Studio development server:

```bash
npm run dev
```

4. Access the Studio at http://localhost:3333

### Authentication

You'll need to log in with a Sanity account that has access to the project. If you don't have access, contact the project administrator.

## Content Structure

The Sanity Studio is configured with the following content types:

### Blog Posts (`post`)
- Title
- Slug (URL-friendly identifier)
- Author (reference to author document)
- Main image
- Categories (references to category documents)
- Tags (references to tag documents)
- Publication date
- Excerpt
- Body content (using Portable Text format)
- SEO metadata

### Authors (`author`)
- Name
- Slug
- Image
- Bio

### Categories (`category`)
- Title
- Description

### Tags (`tag`)
- Title
- Description

## Schema Configuration

The content schemas are defined in the `sanity-schemas` directory and imported into the Sanity Studio configuration. The main schema files are:

- `post.ts`: Blog post schema
- `author.ts`: Author schema
- `category.ts`: Category schema
- `tag.ts`: Tag schema
- `blockContent.ts`: Rich text editor configuration

## Custom Desk Structure

The Sanity Studio desk structure is customized in `forrest/structure/deskStructure.ts`. This defines how content is organized in the Studio interface.

## Validation Rules

Validation rules are implemented for various fields to ensure data integrity. For example, the slug validation in `forrest/utils/slugValidation.ts` ensures that slugs don't contain spaces.

## Working with Images

Images uploaded to Sanity are stored in their CDN. The project uses `@sanity/image-url` to generate image URLs with transformations (resizing, cropping, etc.).

Example usage in the frontend:

```typescript
import {urlFor} from '../lib/sanity';

// In a component
<img src={urlFor(post.mainImage).width(800).url()} alt={post.title} />
```

## Portable Text

Blog post content uses Portable Text, a rich text format that can be serialized to React components. The project uses `@portabletext/react` for rendering.

Example usage in the frontend:

```typescript
import {PortableText} from '@portabletext/react';

// In a component
<PortableText value={post.body} />
```

## Workflow for Multiple Developers

### Best Practices

1. **Schema Changes**:
   - Discuss schema changes with the team before implementation
   - Document any changes in comments
   - Test schema changes thoroughly before deployment

2. **Content Editing**:
   - Use the draft feature for work in progress
   - Preview content before publishing
   - Use consistent naming conventions for assets

3. **Deployment**:
   - Deploy schema changes separately from content changes
   - Communicate deployments to the team
   - Verify the studio works correctly after deployment

### Common Issues and Solutions

#### CORS Errors

If you encounter CORS errors when connecting to Sanity:

1. Verify your CORS settings in the Sanity management console
2. Run the CORS setup script: `node scripts/setup-sanity-cors.js`
3. Check that your environment variables are correctly set

See [SANITY-CORS-SETUP.md](../SANITY-CORS-SETUP.md) for detailed instructions.

#### Token Authentication

For development, you'll need a read token (or write token for content management). To create a token:

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Navigate to the API tab
4. Create a new token with appropriate permissions
5. Add the token to your `.env` file

## Extending Sanity Studio

### Custom Input Components

Custom input components can be added in the `forrest/components/inputs` directory.

### Custom Preview Components

Custom preview components can be added in the `forrest/components/previews` directory.

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Portable Text Documentation](https://www.sanity.io/docs/portable-text)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity Exchange (Community)](https://www.sanity.io/exchange)