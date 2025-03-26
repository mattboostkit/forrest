// This script helps you set up CORS for your Sanity project
// Run with: node scripts/setup-sanity-cors.js

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
  Sanity CORS Configuration Assistant
========================================
${colors.reset}`);

console.log(`${colors.yellow}This script will help you configure CORS for your Sanity project.${colors.reset}\n`);

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

// Update .env file with token
const updateEnvFile = (token) => {
  const envPath = path.join(__dirname, '..', '.env');
  
  try {
    let envContent = '';
    
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
      
      // Replace or add VITE_SANITY_TOKEN
      if (envContent.includes('VITE_SANITY_TOKEN=')) {
        envContent = envContent.replace(/VITE_SANITY_TOKEN=.*(\r?\n|$)/g, `VITE_SANITY_TOKEN=${token}$1`);
      } else {
        envContent += `\nVITE_SANITY_TOKEN=${token}\n`;
      }
    } else {
      envContent = `VITE_SANITY_TOKEN=${token}\n`;
    }
    
    fs.writeFileSync(envPath, envContent);
    console.log(`${colors.green}Token added to .env file!${colors.reset}`);
    return true;
  } catch (error) {
    console.error(`${colors.red}Error updating .env file: ${error.message}${colors.reset}`);
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
    
    // Step 3: Add CORS origin
    rl.question(`${colors.blue}\nEnter your development URL (default: http://localhost:5173): ${colors.reset}`, async (origin) => {
      const corsOrigin = origin || 'http://localhost:5173';
      await addCORSOrigin(corsOrigin);
      
      // Step 4: Add token to .env
      console.log(`${colors.yellow}\nYou need to create a read token in the Sanity management console:${colors.reset}`);
      console.log(`${colors.blue}1. Go to https://www.sanity.io/manage${colors.reset}`);
      console.log(`${colors.blue}2. Select your project${colors.reset}`);
      console.log(`${colors.blue}3. Go to API tab${colors.reset}`);
      console.log(`${colors.blue}4. Click "Add API token"${colors.reset}`);
      console.log(`${colors.blue}5. Name it "Development Token"${colors.reset}`);
      console.log(`${colors.blue}6. Set permissions to "Viewer" (read-only)${colors.reset}`);
      console.log(`${colors.blue}7. Copy the token${colors.reset}`);
      
      rl.question(`${colors.blue}\nEnter your Sanity token (leave empty to skip): ${colors.reset}`, (token) => {
        if (token) {
          updateEnvFile(token);
        } else {
          console.log(`${colors.yellow}Skipping token update. You'll need to add it manually to your .env file.${colors.reset}`);
        }
        
        console.log(`\n${colors.green}===========================================`);
        console.log(`  CORS Configuration Completed!`);
        console.log(`============================================${colors.reset}`);
        console.log(`${colors.blue}\nNext steps:${colors.reset}`);
        console.log(`${colors.blue}1. Restart your development server${colors.reset}`);
        console.log(`${colors.blue}2. If you skipped any steps, complete them manually${colors.reset}`);
        console.log(`${colors.blue}3. Check the SANITY-CORS-SETUP.md file for more information${colors.reset}`);
        
        rl.close();
      });
    });
  } catch (error) {
    console.error(`${colors.red}An error occurred: ${error.message}${colors.reset}`);
    rl.close();
  }
};

main();
