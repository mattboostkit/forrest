/**
 * Migration script to transfer blog data from static data to Sanity
 * 
 * To use this script:
 * 1. Install the required dependencies: npm install @sanity/client dotenv
 * 2. Make sure your .env file has your Sanity token: VITE_SANITY_TOKEN=your-token
 * 3. Run the script: node scripts/migrate-to-sanity.js
 */

import dotenv from 'dotenv';
import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Import the static blog data
import { blogPosts } from '../src/data/index.js';

// Initialize Sanity client
const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'x0xbj86q',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  token: process.env.VITE_SANITY_TOKEN,
  useCdn: false,
  apiVersion: process.env.VITE_SANITY_API_VERSION || '2023-05-03',
});

console.log('Sanity client initialized with:');
console.log('- Project ID:', process.env.VITE_SANITY_PROJECT_ID || 'x0xbj86q');
console.log('- Dataset:', process.env.VITE_SANITY_DATASET || 'production');
console.log('- API Version:', process.env.VITE_SANITY_API_VERSION || '2023-05-03');
console.log('- Token available:', !!process.env.VITE_SANITY_TOKEN);

// Function to create authors
async function createAuthors() {
  console.log('Creating authors...');
  const authors = {};
  
  for (const post of blogPosts) {
    if (!authors[post.author.name]) {
      try {
        // Check if author already exists
        const existingAuthor = await client.fetch(
          `*[_type == "author" && name == $name][0]`,
          { name: post.author.name }
        );
        
        if (existingAuthor) {
          console.log(`Author ${post.author.name} already exists`);
          authors[post.author.name] = existingAuthor._id;
          continue;
        }
        
        // Create author if not exists
        const author = {
          _type: 'author',
          name: post.author.name,
          role: post.author.role,
        };
        
        // Create an image asset from the URL
        if (post.author.avatar) {
          try {
            const imageAsset = await client.assets.upload('image', 
              await fetch(post.author.avatar).then(res => res.blob()), 
              { filename: `author-${post.author.name.toLowerCase().replace(/\s+/g, '-')}.jpg` }
            );
            
            author.image = {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageAsset._id
              }
            };
          } catch (imageError) {
            console.error(`Error uploading author image for ${post.author.name}:`, imageError);
          }
        }
        
        const result = await client.create(author);
        console.log(`Created author: ${post.author.name}`);
        authors[post.author.name] = result._id;
      } catch (error) {
        console.error(`Error creating author ${post.author.name}:`, error);
      }
    }
  }
  
  return authors;
}

// Function to create categories
async function createCategories() {
  console.log('Creating categories...');
  const categories = {};
  
  for (const post of blogPosts) {
    if (!categories[post.category]) {
      try {
        // Check if category already exists
        const existingCategory = await client.fetch(
          `*[_type == "category" && title == $title][0]`,
          { title: post.category }
        );
        
        if (existingCategory) {
          console.log(`Category ${post.category} already exists`);
          categories[post.category] = existingCategory._id;
          continue;
        }
        
        // Create category if not exists
        const category = {
          _type: 'category',
          title: post.category,
          description: `Articles about ${post.category}`,
        };
        
        const result = await client.create(category);
        console.log(`Created category: ${post.category}`);
        categories[post.category] = result._id;
      } catch (error) {
        console.error(`Error creating category ${post.category}:`, error);
      }
    }
  }
  
  return categories;
}

// Function to create tags
async function createTags() {
  console.log('Creating tags...');
  const tags = {};
  
  for (const post of blogPosts) {
    for (const tag of post.tags) {
      if (!tags[tag]) {
        try {
          // Check if tag already exists
          const existingTag = await client.fetch(
            `*[_type == "tag" && title == $title][0]`,
            { title: tag }
          );
          
          if (existingTag) {
            console.log(`Tag ${tag} already exists`);
            tags[tag] = existingTag._id;
            continue;
          }
          
          // Create tag if not exists
          const tagDoc = {
            _type: 'tag',
            title: tag,
          };
          
          const result = await client.create(tagDoc);
          console.log(`Created tag: ${tag}`);
          tags[tag] = result._id;
        } catch (error) {
          console.error(`Error creating tag ${tag}:`, error);
        }
      }
    }
  }
  
  return tags;
}

// Main migration function
async function migrateContent() {
  try {
    console.log('Starting migration...');
    
    const authors = await createAuthors();
    const categories = await createCategories();
    const tags = await createTags();
    
    console.log('Creating blog posts...');
    for (const post of blogPosts) {
      try {
        // Check if post already exists
        const existingPost = await client.fetch(
          `*[_type == "post" && title == $title][0]`,
          { title: post.title }
        );
        
        if (existingPost) {
          console.log(`Post "${post.title}" already exists`);
          continue;
        }
        
        // Create a slug from the post ID or title
        const slug = post.id.toString() || post.title.toLowerCase().replace(/\s+/g, '-');
        
        // Convert the content to a block
        const blockContent = [{
          _type: 'block',
          style: 'normal',
          _key: 'content-block',
          markDefs: [],
          children: [{
            _type: 'span',
            _key: 'content-span',
            text: post.content,
            marks: [],
          }],
        }];
        
        // Create post object
        const blogPost = {
          _type: 'post',
          title: post.title,
          slug: {
            _type: 'slug',
            current: slug,
          },
          author: {
            _type: 'reference',
            _ref: authors[post.author.name],
          },
          publishedAt: new Date(post.date).toISOString(),
          excerpt: post.excerpt,
          body: blockContent,
          categories: [{
            _type: 'reference',
            _ref: categories[post.category],
          }],
        };
        
        // Upload and add the main image
        if (post.image) {
          try {
            const imageAsset = await client.assets.upload('image', 
              await fetch(post.image).then(res => res.blob()), 
              { filename: `post-${slug}.jpg` }
            );
            
            blogPost.mainImage = {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageAsset._id
              }
            };
          } catch (imageError) {
            console.error(`Error uploading post image for "${post.title}":`, imageError);
          }
        }
        
        await client.create(blogPost);
        console.log(`Migrated post: ${post.title}`);
      } catch (error) {
        console.error(`Error migrating post "${post.title}":`, error);
      }
    }
    
    console.log('Migration completed successfully!');
    console.log('');
    console.log('NOTE: This script has created the basic content structure in Sanity.');
    console.log('You will need to manually enhance the rich text content in the Sanity Studio if needed.');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrateContent();
