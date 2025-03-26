# Sanity Setup and Configuration Guide

## Overview

The Forrest blog has been integrated with Sanity, a headless CMS that allows for easy content management. The integration includes:

- Rich text formatting with Portable Text
- Image galleries
- Preview mode for draft content
- Category and tag filtering

## Initial Setup

### 1. Create a Sanity Project

If you haven't already, create a new Sanity project:

```bash
# Install the Sanity CLI
npm install -g @sanity/cli

# Create a new project
mkdir sanity-studio
cd sanity-studio
sanity init
```

During the initialization, you'll be asked to:
- Create a new project or use an existing one
- Give your project a name
- Use the default dataset configuration
- Choose a project template (select "Blog" if available)

### 2. Copy Schema Files

Copy the schema files from the `sanity-schemas` directory to your Sanity Studio project's `schemas` directory:

```bash
cp -r ../sanity-schemas/* ./schemas/
```

Update your Sanity Studio's `schema.js` file to import and use these schemas.

### 3. Configure Environment Variables

Create a `.env` file in the root of your React project with the following variables:

```
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2023-05-03
```

Replace `your-project-id` with your actual Sanity project ID.

### 4. Install Dependencies

In your React project, install the required dependencies:

```bash
npm install @sanity/client @sanity/image-url @portabletext/react
```

### 5. Run the Migration Script

To migrate your existing blog data to Sanity, create a `.env` file in the root directory with your Sanity token:

```
VITE_SANITY_TOKEN=your-sanity-token
```

Then run the migration script:

```bash
node scripts/migrate-to-sanity.js
```

Note: You'll need to manually upload images to Sanity after running the migration script.

## CORS Configuration

### Local Development

1. **Install Sanity CLI globally** (if not already installed):
```bash
npm install -g @sanity/cli
```

2. **Log in to your Sanity account**:
```bash
sanity login
```

3. **Configure CORS for local development**:
```bash
sanity cors add http://localhost:5173 --credentials
```

4. **Create a read-only token**:
- Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
- Select your project
- Navigate to API tab
- Click "Add API token"
- Name it "Development Token"
- Set permissions to "Viewer" (read-only)
- Copy the token

5. **Add the token to your environment variables**:
```
VITE_SANITY_TOKEN=your_token_here
```

## Usage

### Creating and Editing Content

1. Start your Sanity Studio:
```bash
cd sanity-studio
sanity start
```

2. Open the studio in your browser (usually at http://localhost:3333)
3. Use the studio to create and edit blog posts, authors, categories, and tags

### Rich Text Features

The Portable Text integration supports:
- Headings (H1-H4)
- Bold, italic, and underlined text
- Lists (bullet and numbered)
- Code blocks
- Images with captions
- Image galleries
- Callouts (info, warning, success)
- Links (internal and external)

## Troubleshooting

### Images Not Loading
If images are not loading, check:
1. That the image URLs are correctly formatted
2. That the Sanity project ID and dataset are correct in your environment variables
3. That the images have been uploaded to Sanity

### Content Not Updating
If content changes in Sanity are not reflected in your app:
1. Check that you're fetching the latest data (not using cached data)
2. Verify that your queries are correct
3. Make sure you're not in preview mode when trying to view published content

## Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Portable Text Documentation](https://www.sanity.io/docs/portable-text)
- [GROQ Query Language](https://www.sanity.io/docs/groq)