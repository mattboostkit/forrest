import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import {SanityImageSource} from '@sanity/image-url/lib/types/types';

// Use environment variables with fallbacks
export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'ap5b0e0o';
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
export const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2023-05-03';
export const token = import.meta.env.VITE_SANITY_TOKEN;

console.log('Sanity Configuration:', { 
  projectId, 
  dataset, 
  apiVersion,
  tokenAvailable: !!token,
  tokenLength: token ? token.length : 0
});

// Determine if we're in development mode
const isDevelopment = import.meta.env.DEV || window.location.hostname === 'localhost';
console.log('Development mode:', isDevelopment);

export const client = createClient({
  projectId,
  dataset,
  apiVersion, // use current date (YYYY-MM-DD) to target the latest API version
  useCdn: !isDevelopment, // disable CDN in development to avoid CORS issues
  token: isDevelopment ? token : undefined, // Use token in development
  withCredentials: isDevelopment, // Include credentials in development
});

// Log a test query to verify connection
client.fetch('count(*[_type == "post"])')
  .then(count => {
    console.log(`Successfully connected to Sanity! Found ${count} posts.`);
  })
  .catch(error => {
    console.error('Error connecting to Sanity:', error);
  });

// Helper function for generating image URLs with the Sanity Image Pipeline
const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => {
  if (!source) {
    console.warn('No image source provided to urlFor');
    return '';
  }
  
  try {
    return builder.image(source);
  } catch (error) {
    console.error('Error generating image URL:', error);
    return '';
  }
};

// Helper to determine if we're in preview mode
export function getClient(preview = false) {
  return preview
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        token: token,
      })
    : client;
}
