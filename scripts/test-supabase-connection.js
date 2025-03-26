// Script to test Supabase connection

// Import required modules
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

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
    console.log(`- Anon Key (first 10 chars): ${supabaseAnonKey ? supabaseAnonKey.substring(0, 10) + '...' : 'N/A'}`);
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing required Supabase configuration');
    }
    
    // Test DNS resolution for the Supabase URL
    console.log('\nTesting DNS resolution for Supabase URL...');
    try {
      const { hostname } = new URL(supabaseUrl);
      console.log(`Hostname to resolve: ${hostname}`);
      
      // Use fetch to test if the URL is reachable
      console.log('Attempting to connect to Supabase...');
      const response = await fetch(`${supabaseUrl}/rest/v1/?apikey=${supabaseAnonKey}`);
      
      if (response.ok) {
        console.log(`\n✅ Successfully connected to Supabase!`);
        console.log(`Response status: ${response.status} ${response.statusText}`);
      } else {
        console.log(`\n⚠️ Connected to Supabase, but received an error response.`);
        console.log(`Response status: ${response.status} ${response.statusText}`);
        const errorText = await response.text();
        console.log(`Error details: ${errorText}`);
      }
    } catch (dnsError) {
      console.error(`\n❌ DNS resolution failed for ${supabaseUrl}`);
      console.error(`Error: ${dnsError.message}`);
      console.log('\nThis could indicate:');
      console.log('1. The Supabase project no longer exists');
      console.log('2. The URL is incorrect');
      console.log('3. There might be network connectivity issues');
      throw dnsError;
    }
    
    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Test storage access
    console.log('\nTesting Supabase storage access...');
    try {
      // First, try to list buckets
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      
      if (bucketsError) {
        throw bucketsError;
      }
      
      console.log(`Found ${buckets.length} storage buckets:`);
      buckets.forEach(bucket => {
        console.log(`- ${bucket.name}`);
      });
      
      // Check if 'images' bucket exists
      const imagesBucket = buckets.find(b => b.name === 'images');
      
      if (imagesBucket) {
        console.log('\nTesting access to "images" bucket...');
        const { data: files, error: filesError } = await supabase.storage.from('images').list();
        
        if (filesError) {
          console.log(`⚠️ Could not list files in "images" bucket: ${filesError.message}`);
        } else {
          console.log(`✅ Successfully accessed "images" bucket.`);
          console.log(`Found ${files.length} files in the bucket.`);
        }
      } else {
        console.log('\n⚠️ The "images" bucket does not exist.');
        console.log('You may need to create it in the Supabase dashboard.');
      }
    } catch (storageError) {
      console.error(`\n❌ Error accessing Supabase storage:`);
      console.error(storageError);
    }
    
    return true;
  } catch (error) {
    console.error(`\n❌ Error connecting to Supabase:`);
    console.error(error);
    
    console.log('\n📋 Supabase Troubleshooting Steps:');
    console.log('1. Go to https://app.supabase.io/');
    console.log('2. Select your project');
    console.log('3. Go to Project Settings > API');
    console.log('4. Check the Project URL and anon/public API key');
    console.log('5. Update your .env file with the correct values');
    console.log('6. If the project no longer exists, you may need to create a new one');
    
    return false;
  }
}

// Run the test
testSupabaseConnection().catch(console.error);
