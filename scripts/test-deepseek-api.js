// Script to test Deepseek API key

// Import required modules
import fetch from 'node-fetch';

// Deepseek API key from HRPolicy.tsx
const apiKey = 'sk-5022c0f99add4e39a49494b6af219265';

// Test Deepseek API
async function testDeepseekAPI() {
  console.log('\n--- Testing Deepseek API ---');
  
  try {
    console.log('Deepseek API Key (first 10 chars):', apiKey.substring(0, 10) + '...');
    
    // Deepseek API endpoint
    const endpoint = 'https://api.deepseek.com/v1/chat/completions';
    
    // Simple test request
    const requestData = {
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Hello, can you hear me?' }
      ],
      max_tokens: 50
    };
    
    console.log('\nSending test request to Deepseek API...');
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestData)
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('\n✅ Deepseek API key is valid!');
      console.log('Response:', data.choices[0].message.content);
      return true;
    } else {
      const errorData = await response.json();
      throw new Error(`API returned ${response.status}: ${JSON.stringify(errorData)}`);
    }
  } catch (error) {
    console.error('\n❌ Error with Deepseek API:');
    console.error(error.message);
    
    if (error.message.includes('401') || error.message.includes('403')) {
      console.log('\n📋 API Key Troubleshooting Steps:');
      console.log('1. Check if the API key is valid and has not expired');
      console.log('2. Verify that the API key has the necessary permissions');
      console.log('3. Ensure the API key is for the correct environment (production/development)');
      console.log('4. Check if there are any billing issues with your Deepseek account');
    } else if (error.message.includes('404')) {
      console.log('\nThe API endpoint may have changed. Check the Deepseek documentation for the current endpoint.');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.log('\nCould not connect to the Deepseek API. This could be due to:');
      console.log('1. Network connectivity issues');
      console.log('2. The API domain has changed');
      console.log('3. The service is temporarily unavailable');
    }
    
    return false;
  }
}

// Run the test
testDeepseekAPI().catch(console.error);
