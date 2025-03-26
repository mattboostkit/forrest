# Vercel Deployment Guide

This guide will walk you through deploying the Forrest HR website to Vercel and configuring Sanity Studio.

## Prerequisites

- A GitHub, GitLab, or Bitbucket account where your project is hosted
- A Vercel account (you can sign up for free at [vercel.com](https://vercel.com/))
- Your Sanity project credentials (already configured in the project)

## Deployment Steps

### 1. Push Your Code to a Git Repository

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push
```

### 2. Sign Up/Login to Vercel

- Go to [vercel.com](https://vercel.com/) and sign up or log in
- Click "Add New Project" on your dashboard

### 3. Import Your Git Repository

- Select your Git provider (GitHub, GitLab, or Bitbucket)
- Authorize Vercel to access your repositories
- Select your Forrest repository

### 4. Configure Project Settings

Vercel will automatically detect that this is a Vite project. The `vercel.json` file in your project root already contains the necessary configuration:

- Build Command: `npm run build && cd forrest && npm run build`
- Output Directory: `dist`
- Framework Preset: `vite`

These settings will build both your React frontend and Sanity Studio.

### 5. Configure Environment Variables

Add the following environment variables in Vercel (Project Settings > Environment Variables):

```
VITE_SANITY_PROJECT_ID=ap5b0e0o
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2023-05-03
```

If you need preview mode functionality, also add:

```
VITE_SANITY_PREVIEW_SECRET=your-preview-secret
VITE_SANITY_TOKEN=your-sanity-token
```

### 6. Deploy

Click "Deploy" and wait for the build to complete. Vercel will provide you with a deployment URL once finished.

## Deploying Sanity Studio

### 1. Deploy Sanity Studio

```bash
npm run sanity:deploy
```

This will deploy the Sanity Studio to Sanity's servers, making it accessible at `https://forrest.sanity.studio/`.

### 2. Configure CORS Settings

After deploying to Vercel, you'll need to configure CORS to allow your Vercel site to communicate with Sanity's API.

#### Using the Setup Script

We've created a script to help you configure CORS for Vercel:

```bash
node scripts/setup-vercel-cors.js
```

Follow the prompts to:
1. Log in to your Sanity account
2. Add your Vercel domain to allowed CORS origins
3. Create a read token for Vercel

#### Manual Configuration

If you prefer to configure CORS manually:

```bash
# Install Sanity CLI (if not already installed)
npm install -g @sanity/cli

# Log in to your Sanity account
sanity login

# Add your Vercel domain to allowed CORS origins
sanity cors add https://your-vercel-site.vercel.app --credentials

# Verify the configuration
sanity cors list
```

## Vercel Specific Features

### Automatic Previews

Vercel automatically creates preview deployments for pull requests. To ensure these previews can access your Sanity content:

1. Add the preview domains to your CORS settings:
```bash
sanity cors add https://your-project-git-branch-name.vercel.app --credentials
```

2. Consider using a wildcard for all preview deployments:
```bash
sanity cors add https://*.vercel.app --credentials
```

### Environment Variables per Branch

You can configure different environment variables for production, preview, and development environments in Vercel's project settings.

## Troubleshooting

### CORS Issues
- Verify that your Vercel domain is correctly added to Sanity CORS origins
- Check that you're using the correct Sanity project ID and dataset
- Ensure your environment variables are properly set in Vercel's dashboard

### Build Failures
- Check Vercel build logs for specific error messages
- Verify that all dependencies are properly listed in package.json
- Ensure environment variables are correctly set in Vercel's dashboard

### Content Not Updating
- Verify that your Sanity token has the correct permissions
- Check that your queries are using the correct project ID and dataset
- Clear your browser cache and try a hard refresh

## Monitoring and Analytics

Vercel provides built-in analytics and monitoring tools:

1. **Analytics**: Enable Analytics in your Vercel project settings to track page views, performance metrics, and more.

2. **Monitoring**: Set up status checks and alerts for your deployment.

3. **Logs**: View build and runtime logs directly in the Vercel dashboard.

## Next Steps

After successful deployment:

1. Set up a custom domain in Vercel project settings
2. Configure SSL/TLS certificates (automatically handled by Vercel)
3. Set up redirects for any old URLs (if migrating from another platform)
4. Test your site thoroughly on different devices and browsers
