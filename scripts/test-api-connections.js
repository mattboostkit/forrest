// Script to test API connections for Sanity and Supabase

// Import required modules
import { createClient as createSanityClient } from '@sanity/client';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Test Sanity connection
async function testSanityConnection() {
  console.log('\n--- Testing Sanity Connection ---');
  
  try {
    // Get Sanity configuration from environment variables
    const projectId = process.env.VITE_SANITY_PROJECT_ID;
    const dataset = process.env.VITE_SANITY_DATASET;
    const apiVersion = process.env.VITE_SANITY_API_VERSION;
    const token = process.env.VITE_SANITY_TOKEN;
    
    console.log('Sanity Configuration:');
    console.log(`- Project ID: ${projectId}`);
    console.log(`- Dataset: ${dataset}`);
    console.log(`- API Version: ${apiVersion}`);
    console.log(`- Token available: ${!!token}`);
    
    if (!projectId || !dataset) {
      throw new Error('Missing required Sanity configuration');
    }
    
    // Create Sanity client
    const client = createSanityClient({
      projectId,
      dataset,
      apiVersion: apiVersion || '2023-05-03',
      token,
      useCdn: false,
    });
    
    // Test query to count posts
    const postCount = await client.fetch('count(*[_type == "post"])');
    console.log(`\n✅ Successfully connected to Sanity!`);
    console.log(`Found ${postCount} posts in the "${dataset}" dataset.`);
    
    // Test query to get categories
    const categories = await client.fetch('*[_type == "category"] | order(title asc) { _id, title }');
    console.log(`Found ${categories.length} categories:`);
    categories.forEach(category => {
      console.log(`- ${category.title}`);
    });
    
    return true;
  } catch (error) {
    console.error(`\n❌ Error connecting to Sanity:`);
    console.error(error);
    return false;
  }
}

// Test Supabase connection
async function testSupabaseConnection() {
  console.log('\n--- Testing Supabase Connection ---');
  
  try {
    // Get Supabase configuration from environment variables
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
    
    console.log('Supabase Configuration:');
    console.log(`- URL: ${supabaseUrl}`);
    console.log(`- Anon Key available: ${!!supabaseAnonKey}`);
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing required Supabase configuration');
    }
    
    // Create Supabase client
    const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);
    
    // Test storage bucket access
    const { data, error } = await supabase.storage.getBucket('images');
    
    if (error) {
      if (error.message.includes('The resource was not found')) {
        // Try listing buckets instead
        const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
        
        if (bucketsError) {
          throw bucketsError;
        }
        
        console.log(`\n✅ Successfully connected to Supabase!`);
        console.log(`Found ${buckets.length} storage buckets:`);
        buckets.forEach(bucket => {
          console.log(`- ${bucket.name}`);
        });
        
        console.log('\nNote: The "images" bucket was not found. You may need to create it.');
      } else {
        throw error;
      }
    } else {
      console.log(`\n✅ Successfully connected to Supabase!`);
      console.log(`Found the "images" bucket.`);
      
      // Try listing files in the images bucket
      const { data: files, error: filesError } = await supabase.storage.from('images').list();
      
      if (filesError) {
        console.log(`Could not list files: ${filesError.message}`);
      } else {
        console.log(`Found ${files.length} files in the "images" bucket.`);
      }
    }
    
    return true;
  } catch (error) {
    console.error(`\n❌ Error connecting to Supabase:`);
    console.error(error);
    return false;
  }
}

// Main function to run all tests
async function runTests() {
  console.log('=== API Connection Tests ===');
  
  const sanitySuccess = await testSanityConnection();
  const supabaseSuccess = await testSupabaseConnection();
  
  console.log('\n=== Test Results ===');
  console.log(`Sanity: ${sanitySuccess ? '✅ Connected' : '❌ Failed'}`);
  console.log(`Supabase: ${supabaseSuccess ? '✅ Connected' : '❌ Failed'}`);
  
  if (sanitySuccess && supabaseSuccess) {
    console.log('\n🎉 All API connections are working correctly!');
  } else {
    console.log('\n⚠️ Some API connections failed. Please check the errors above.');
  }
}

// Run the tests
runTests().catch(console.error);
