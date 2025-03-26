# Deployment Guide

## Deploying to Netlify

### Prerequisites

- A GitHub, GitLab, or Bitbucket account where your project is hosted
- A Netlify account (you can sign up for free at [netlify.com](https://www.netlify.com/))
- Your Sanity project credentials

### Setup Steps

1. **Push Your Code to a Git Repository**

```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push
```

2. **Sign Up/Login to Netlify**
   - Go to [netlify.com](https://www.netlify.com/) and sign up or log in
   - Click "Add new site" and select "Import an existing project"

3. **Connect to Your Git Provider**
   - Select your Git provider (GitHub, GitLab, or Bitbucket)
   - Authorize Netlify to access your repositories
   - Select your Forrest repository

4. **Configure Build Settings**

Netlify will automatically detect that this is a Vite project. The `netlify.toml` file in your project root already contains the necessary configuration:

- Build command: `npm run build && cd forrest && npm run build`
- Publish directory: `dist`

These settings will build both your React frontend and Sanity Studio.

5. **Configure Environment Variables**

Add the following environment variables in Netlify (Site settings > Environment variables):

```
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2023-05-03
```

## Deploying Sanity Studio

### Prerequisites

- Sanity CLI installed globally
- Sanity project credentials
- Sanity management token with write access

### Steps

1. **Deploy Sanity Studio**

```bash
cd forrest
npm run deploy
```

2. **Configure CORS Settings**

After deploying, you'll need to configure CORS to allow your Netlify site to communicate with Sanity's API.

#### Option 1: Using Sanity CLI

```bash
# Install Sanity CLI (if not already installed)
npm install -g @sanity/cli

# Log in to your Sanity account
sanity login

# Add your Netlify domain to allowed CORS origins
sanity cors add https://your-netlify-site.netlify.app --credentials

# Verify the configuration
sanity cors list
```

#### Option 2: Using the setup-sanity-cors.js Script

1. Add your Sanity token to .env file:

```
VITE_SANITY_TOKEN=your-sanity-token
VITE_SANITY_PROJECT_ID=your-project-id
```

2. Run the setup script:

```bash
node scripts/setup-sanity-cors.js
```

## Development CORS Configuration

For local development, configure CORS to allow requests from your development server:

```bash
# Add localhost to allowed CORS origins
sanity cors add http://localhost:5173 --credentials
```

## Troubleshooting

### CORS Issues
- Verify that your Netlify domain is correctly added to Sanity CORS origins
- Check that you're using the correct Sanity project ID and dataset
- Ensure your environment variables are properly set in Netlify

### Build Failures
- Check Netlify build logs for specific error messages
- Verify that all dependencies are properly listed in package.json
- Ensure environment variables are correctly set in Netlify's dashboard

### Content Not Updating
- Verify that your Sanity token has the correct permissions
- Check that your queries are using the correct project ID and dataset
- Clear your browser cache and try a hard refresh