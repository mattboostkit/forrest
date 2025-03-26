# Content Migration Scripts

This directory contains scripts for migrating content to and from Sanity CMS.

## Available Scripts

- `migrate-blog-to-sanity.mjs`: Migrates blog data from static files to Sanity CMS
- `upload-images-to-sanity.mjs`: Uploads images to Sanity's asset pipeline

## Running Migrations

Before running any migration script, ensure you have set up the required environment variables in your `.env` file:

```
VITE_SANITY_TOKEN=your_sanity_token
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
```

To run a migration script:

```bash
node scripts/migrations/script-name.mjs
```