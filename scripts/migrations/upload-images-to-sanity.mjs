/**
 * Script to upload images to Sanity from URLs
 * 
 * To use this script:
 * 1. Make sure your .env file has your Sanity token: VITE_SANITY_TOKEN=your-token
 * 2. Run the script: node scripts/upload-images-to-sanity.mjs
 */

import dotenv from 'dotenv';
import { createClient } from '@sanity/client';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

// Load environment variables
dotenv.config();

// Initialize Sanity client
const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'ap5b0e0o',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  token: process.env.VITE_SANITY_TOKEN,
  useCdn: false,
  apiVersion: process.env.VITE_SANITY_API_VERSION || '2023-05-03',
});

console.log('Sanity client initialized with:');
console.log('- Project ID:', process.env.VITE_SANITY_PROJECT_ID || 'ap5b0e0o');
console.log('- Dataset:', process.env.VITE_SANITY_DATASET || 'production');
console.log('- API Version:', process.env.VITE_SANITY_API_VERSION || '2023-05-03');
console.log('- Token available:', !!process.env.VITE_SANITY_TOKEN);

// Function to upload an image from a URL to Sanity
async function uploadImageFromUrl(imageUrl) {
  try {
    console.log(`Fetching image from URL: ${imageUrl}`);
    
    // Fetch the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    
    // Get the image buffer
    const imageBuffer = await response.buffer();
    
    // Get the file extension from the URL
    const fileExtension = imageUrl.split('.').pop().split('?')[0] || 'jpg';
    
    // Upload the image to Sanity
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: `image-${uuidv4()}.${fileExtension}`,
    });
    
    console.log(`Successfully uploaded image: ${asset._id}`);
    return asset;
  } catch (error) {
    console.error(`Error uploading image from URL ${imageUrl}:`, error);
    return null;
  }
}

// Function to update a post with the uploaded image
async function updatePostWithImage(postId, imageAsset) {
  try {
    console.log(`Updating post ${postId} with image ${imageAsset._id}`);
    
    // Update the post
    await client
      .patch(postId)
      .set({
        mainImage: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id,
          },
        },
      })
      .commit();
    
    console.log(`Successfully updated post ${postId} with image`);
    return true;
  } catch (error) {
    console.error(`Error updating post ${postId} with image:`, error);
    return false;
  }
}

// Main function to upload images for all posts
async function uploadImagesForPosts() {
  try {
    console.log('Fetching posts with image URLs...');
    
    // Get all posts with mainImageUrl
    const posts = await client.fetch(`
      *[_type == "post" && defined(mainImageUrl)] {
        _id,
        title,
        mainImageUrl
      }
    `);
    
    console.log(`Found ${posts.length} posts with image URLs`);
    
    // Process each post
    for (const post of posts) {
      console.log(`Processing post: ${post.title}`);
      
      if (!post.mainImageUrl) {
        console.log(`No image URL for post ${post.title}, skipping...`);
        continue;
      }
      
      // Upload the image
      const imageAsset = await uploadImageFromUrl(post.mainImageUrl);
      if (!imageAsset) {
        console.log(`Failed to upload image for post ${post.title}, skipping...`);
        continue;
      }
      
      // Update the post with the image
      await updatePostWithImage(post._id, imageAsset);
    }
    
    console.log('Image upload process completed!');
  } catch (error) {
    console.error('Error uploading images for posts:', error);
  }
}

// Function to upload images for authors
async function uploadImagesForAuthors() {
  try {
    console.log('Fetching authors with avatar URLs in bio...');
    
    // Get all authors with bio containing "Avatar URL:"
    const authors = await client.fetch(`
      *[_type == "author" && bio match "Avatar URL:*"] {
        _id,
        name,
        bio
      }
    `);
    
    console.log(`Found ${authors.length} authors with avatar URLs`);
    
    // Process each author
    for (const author of authors) {
      console.log(`Processing author: ${author.name}`);
      
      // Extract the avatar URL from the bio
      const avatarUrlMatch = author.bio.match(/Avatar URL: (https?:\/\/[^\s]+)/);
      if (!avatarUrlMatch || !avatarUrlMatch[1]) {
        console.log(`No avatar URL found in bio for author ${author.name}, skipping...`);
        continue;
      }
      
      const avatarUrl = avatarUrlMatch[1];
      
      // Upload the image
      const imageAsset = await uploadImageFromUrl(avatarUrl);
      if (!imageAsset) {
        console.log(`Failed to upload avatar for author ${author.name}, skipping...`);
        continue;
      }
      
      // Update the author with the image
      try {
        console.log(`Updating author ${author._id} with image ${imageAsset._id}`);
        
        // Update the author
        await client
          .patch(author._id)
          .set({
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageAsset._id,
              },
            },
          })
          .commit();
        
        console.log(`Successfully updated author ${author.name} with image`);
      } catch (error) {
        console.error(`Error updating author ${author.name} with image:`, error);
      }
    }
    
    console.log('Author image upload process completed!');
  } catch (error) {
    console.error('Error uploading images for authors:', error);
  }
}

// Run the main functions
async function main() {
  await uploadImagesForPosts();
  await uploadImagesForAuthors();
  console.log('All image uploads completed!');
}

main();
