// Script to test Sanity token validity

// Import required modules
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Test Sanity token
async function testSanityToken() {
  console.log('\n--- Testing Sanity Token ---');
  
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
    console.log(`- Token (first 10 chars): ${token ? token.substring(0, 10) + '...' : 'N/A'}`);
    
    if (!projectId || !dataset || !token) {
      throw new Error('Missing required Sanity configuration');
    }
    
    // Create Sanity client
    const client = createClient({
      projectId,
      dataset,
      apiVersion: apiVersion || '2023-05-03',
      token,
      useCdn: false,
    });
    
    // Test a simple query that requires authentication
    console.log('\nTesting token with a simple query...');
    const result = await client.fetch('*[_type == "post"][0...1]');
    
    console.log(`\n✅ Token is valid!`);
    console.log(`Query returned ${result.length} results.`);
    
    // Try to create a test document to check write permissions
    console.log('\nTesting write permissions...');
    try {
      const testDoc = {
        _type: 'test',
        _id: `test-${Date.now()}`,
        title: 'Test Document',
        description: 'This is a test document to verify token permissions'
      };
      
      const createResult = await client.create(testDoc);
      console.log(`✅ Write permission confirmed! Created document with ID: ${createResult._id}`);
      
      // Clean up by deleting the test document
      await client.delete(createResult._id);
      console.log(`Deleted test document.`);
    } catch (writeError) {
      if (writeError.message.includes('permission')) {
        console.log(`ℹ️ Token has read-only permissions (this is expected for viewer tokens).`);
      } else {
        console.error(`❌ Error testing write permissions:`, writeError.message);
      }
    }
    
    return true;
  } catch (error) {
    console.error(`\n❌ Error with Sanity token:`);
    
    if (error.statusCode === 401) {
      console.error(`Authentication failed (401 Unauthorized). Your token may be invalid or expired.`);
      console.error(`Error details: ${error.message}`);
      
      console.log('\n📋 Token Troubleshooting Steps:');
      console.log('1. Go to https://www.sanity.io/manage');
      console.log('2. Select your project');
      console.log('3. Go to the API tab');
      console.log('4. Check if your token is still valid');
      console.log('5. If needed, create a new token:');
      console.log('   - Click "Add API token"');
      console.log('   - Name it "Development Token"');
      console.log('   - Set appropriate permissions (Editor for full access, Viewer for read-only)');
      console.log('   - Copy the new token to your .env file');
    } else {
      console.error(error);
    }
    
    return false;
  }
}

// Run the test
testSanityToken().catch(console.error);
