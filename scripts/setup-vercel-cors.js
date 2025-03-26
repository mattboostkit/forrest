// This script helps you set up CORS for your Sanity project with Vercel
// Run with: node scripts/setup-vercel-cors.js

import { exec } from 'child_process';
import * as readline from 'readline';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m'
};

console.log(`${colors.blue}
========================================
  Sanity CORS Configuration for Vercel
========================================
${colors.reset}`);

console.log(`${colors.yellow}This script will help you configure CORS for your Sanity project with Vercel.${colors.reset}\n`);

// Check if Sanity CLI is installed
const checkSanityCLI = () => {
  return new Promise((resolve) => {
    exec('sanity --version', (error) => {
      if (error) {
        console.log(`${colors.red}Sanity CLI is not installed. Installing...${colors.reset}`);
        exec('npm install -g @sanity/cli', (err, stdout, stderr) => {
          if (err) {
            console.error(`${colors.red}Error installing Sanity CLI: ${stderr}${colors.reset}`);
            resolve(false);
          } else {
            console.log(`${colors.green}Sanity CLI installed successfully!${colors.reset}`);
            resolve(true);
          }
        });
      } else {
        console.log(`${colors.green}Sanity CLI is already installed.${colors.reset}`);
        resolve(true);
      }
    });
  });
};

// Login to Sanity
const loginToSanity = () => {
  return new Promise((resolve) => {
    console.log(`${colors.yellow}\nYou need to log in to your Sanity account.${colors.reset}`);
    rl.question(`${colors.blue}Do you want to log in now? (y/n): ${colors.reset}`, (answer) => {
      if (answer.toLowerCase() === 'y') {
        console.log(`${colors.yellow}Opening Sanity login...${colors.reset}`);
        exec('sanity login', (error, stdout, stderr) => {
          if (error) {
            console.error(`${colors.red}Error logging in: ${stderr}${colors.reset}`);
            resolve(false);
          } else {
            console.log(`${colors.green}Login successful!${colors.reset}`);
            resolve(true);
          }
        });
      } else {
        console.log(`${colors.yellow}Skipping login. You'll need to log in manually later.${colors.reset}`);
        resolve(false);
      }
    });
  });
};

// Add CORS origin
const addCORSOrigin = (origin) => {
  return new Promise((resolve) => {
    console.log(`${colors.yellow}\nAdding CORS origin: ${origin}${colors.reset}`);
    exec(`sanity cors add ${origin} --credentials`, (error, stdout, stderr) => {
      if (error) {
        console.error(`${colors.red}Error adding CORS origin: ${stderr}${colors.reset}`);
        resolve(false);
      } else {
        console.log(`${colors.green}CORS origin added successfully!${colors.reset}`);
        resolve(true);
      }
    });
  });
};

// Create Vercel environment variables file
const createVercelEnvFile = (projectId, dataset, token) => {
  const vercelEnvPath = path.join(__dirname, '..', '.vercel', 'project.json');
  const vercelEnvDir = path.join(__dirname, '..', '.vercel');
  
  try {
    if (!fs.existsSync(vercelEnvDir)) {
      fs.mkdirSync(vercelEnvDir, { recursive: true });
    }
    
    const envContent = {
      "projectId": "your-vercel-project-id", // This will be replaced by Vercel CLI
      "orgId": "your-vercel-org-id", // This will be replaced by Vercel CLI
      "settings": {
        "framework": "vite",
        "buildCommand": "npm run build && cd forrest && npm run build",
        "outputDirectory": "dist",
        "devCommand": "npm run dev"
      },
      "env": {
        "VITE_SANITY_PROJECT_ID": projectId,
        "VITE_SANITY_DATASET": dataset,
        "VITE_SANITY_API_VERSION": "2023-05-03",
        "VITE_SANITY_TOKEN": token
      }
    };
    
    fs.writeFileSync(vercelEnvPath, JSON.stringify(envContent, null, 2));
    console.log(`${colors.green}Vercel environment configuration created!${colors.reset}`);
    return true;
  } catch (error) {
    console.error(`${colors.red}Error creating Vercel environment configuration: ${error.message}${colors.reset}`);
    return false;
  }
};

// Main function
const main = async () => {
  try {
    // Step 1: Check if Sanity CLI is installed
    const cliInstalled = await checkSanityCLI();
    if (!cliInstalled) {
      console.log(`${colors.red}Please install Sanity CLI manually with: npm install -g @sanity/cli${colors.reset}`);
      rl.close();
      return;
    }
    
    // Step 2: Login to Sanity
    await loginToSanity();
    
    // Step 3: Get Sanity project details
    const sanityConfigPath = path.join(__dirname, '..', 'forrest', 'sanity.config.ts');
    let projectId = '';
    let dataset = '';
    
    if (fs.existsSync(sanityConfigPath)) {
      const configContent = fs.readFileSync(sanityConfigPath, 'utf8');
      const projectIdMatch = configContent.match(/projectId:\s*['"]([^'"]+)['"]/);
      const datasetMatch = configContent.match(/dataset:\s*['"]([^'"]+)['"]/);
      
      if (projectIdMatch && projectIdMatch[1]) {
        projectId = projectIdMatch[1];
        console.log(`${colors.green}Found Sanity Project ID: ${projectId}${colors.reset}`);
      }
      
      if (datasetMatch && datasetMatch[1]) {
        dataset = datasetMatch[1];
        console.log(`${colors.green}Found Sanity Dataset: ${dataset}${colors.reset}`);
      }
    }
    
    if (!projectId) {
      rl.question(`${colors.blue}\nEnter your Sanity Project ID: ${colors.reset}`, (answer) => {
        projectId = answer;
      });
    }
    
    if (!dataset) {
      rl.question(`${colors.blue}\nEnter your Sanity Dataset (default: production): ${colors.reset}`, (answer) => {
        dataset = answer || 'production';
      });
    }
    
    // Step 4: Add CORS origin for Vercel
    rl.question(`${colors.blue}\nEnter your Vercel deployment URL (e.g., https://your-project.vercel.app): ${colors.reset}`, async (origin) => {
      if (!origin) {
        console.log(`${colors.red}Vercel URL is required.${colors.reset}`);
        rl.close();
        return;
      }
      
      await addCORSOrigin(origin);
      
      // Also add the preview URL
      const previewOrigin = origin.replace('.vercel.app', '.vercel.app');
      await addCORSOrigin(previewOrigin);
      
      // Step 5: Add token to Vercel environment
      console.log(`${colors.yellow}\nYou need to create a read token in the Sanity management console:${colors.reset}`);
      console.log(`${colors.blue}1. Go to https://www.sanity.io/manage${colors.reset}`);
      console.log(`${colors.blue}2. Select your project${colors.reset}`);
      console.log(`${colors.blue}3. Go to API tab${colors.reset}`);
      console.log(`${colors.blue}4. Click "Add API token"${colors.reset}`);
      console.log(`${colors.blue}5. Name it "Vercel Production Token"${colors.reset}`);
      console.log(`${colors.blue}6. Set permissions to "Viewer" (read-only)${colors.reset}`);
      console.log(`${colors.blue}7. Copy the token${colors.reset}`);
      
      rl.question(`${colors.blue}\nEnter your Sanity token (leave empty to skip): ${colors.reset}`, (token) => {
        if (token) {
          createVercelEnvFile(projectId, dataset, token);
        } else {
          console.log(`${colors.yellow}Skipping token update. You'll need to add it manually to your Vercel environment variables.${colors.reset}`);
        }
        
        console.log(`\n${colors.green}===========================================`);
        console.log(`  Vercel CORS Configuration Completed!`);
        console.log(`============================================${colors.reset}`);
        console.log(`${colors.blue}\nNext steps:${colors.reset}`);
        console.log(`${colors.blue}1. Install Vercel CLI if you haven't already: npm install -g vercel${colors.reset}`);
        console.log(`${colors.blue}2. Run 'vercel' to link your project to Vercel${colors.reset}`);
        console.log(`${colors.blue}3. Set the following environment variables in your Vercel project settings:${colors.reset}`);
        console.log(`${colors.blue}   - VITE_SANITY_PROJECT_ID=${projectId}${colors.reset}`);
        console.log(`${colors.blue}   - VITE_SANITY_DATASET=${dataset}${colors.reset}`);
        console.log(`${colors.blue}   - VITE_SANITY_API_VERSION=2023-05-03${colors.reset}`);
        console.log(`${colors.blue}   - VITE_SANITY_TOKEN=your-token${colors.reset}`);
        
        rl.close();
      });
    });
  } catch (error) {
    console.error(`${colors.red}An error occurred: ${error.message}${colors.reset}`);
    rl.close();
  }
};

main();
