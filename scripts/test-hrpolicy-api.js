// Script to test the Deepseek API integration in the HRPolicy component

// Import required modules
import axios from 'axios';

// Deepseek API key from HRPolicy.tsx
const apiKey = 'sk-5022c0f99add4e39a49494b6af219265';

// Test function to generate a policy using the Deepseek API
async function testDeepseekPolicyGeneration() {
  console.log('\n--- Testing Deepseek API for HR Policy Generation ---');
  
  try {
    // Sample form data
    const formData = {
      policyType: 'leave',
      companyName: 'Test Company Ltd',
      industry: 'Technology',
      companySize: 'medium',
      region: 'england',
      additionalInfo: 'This is a test policy generation.'
    };
    
    // Generate the prompt based on the form data
    const prompt = generatePrompt(formData);
    
    console.log('Generated prompt:');
    console.log(prompt);
    
    console.log('\nSending request to Deepseek API...');
    
    // Make the API call to Deepseek
    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: 'deepseek-chat',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert HR consultant specializing in creating professional, legally compliant HR policies for UK businesses. Your task is to generate a comprehensive, well-structured HR policy based on the information provided. Format the policy in Markdown with clear headings, bullet points, and sections.' 
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 4000,
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );
    
    // Extract the policy content from the API response
    const policyContent = response.data.choices[0].message.content;
    
    console.log('\n✅ Successfully generated HR policy using Deepseek API!');
    console.log('\nPolicy preview (first 300 characters):');
    console.log(policyContent.substring(0, 300) + '...');
    
    return true;
  } catch (error) {
    console.error('\n❌ Error generating HR policy:');
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(`Status: ${error.response.status}`);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from the server');
      console.error(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    
    console.log('\n📋 Troubleshooting Steps:');
    console.log('1. Check if the Deepseek API key is valid');
    console.log('2. Verify that the API endpoint is correct');
    console.log('3. Ensure you have sufficient credits/quota for the API');
    console.log('4. Check your network connection');
    
    return false;
  }
}

// Helper function to generate the prompt for the API
function generatePrompt(data) {
  let policyTypeText = '';
  switch (data.policyType) {
    case 'leave':
      policyTypeText = 'Annual Leave Policy';
      break;
    case 'disciplinary':
      policyTypeText = 'Disciplinary Procedure';
      break;
    case 'remote':
      policyTypeText = 'Remote Working Policy';
      break;
  }

  let companySizeText = '';
  switch (data.companySize) {
    case 'small':
      companySizeText = 'small (1-49 employees)';
      break;
    case 'medium':
      companySizeText = 'medium (50-249 employees)';
      break;
    case 'large':
      companySizeText = 'large (250+ employees)';
      break;
  }

  let regionText = '';
  switch (data.region) {
    case 'england':
      regionText = 'England & Wales';
      break;
    case 'scotland':
      regionText = 'Scotland';
      break;
    case 'northern-ireland':
      regionText = 'Northern Ireland';
      break;
  }

  return `Please create a comprehensive ${policyTypeText} for a ${companySizeText} ${data.industry} company called "${data.companyName}" based in ${regionText}. 
  
The policy should be compliant with current UK employment law and include all necessary sections and details appropriate for this type of policy.

${data.additionalInfo ? `Additional information to consider: ${data.additionalInfo}` : ''}

Format the policy in Markdown with clear headings, bullet points where appropriate, and well-structured sections. Include the current date at the end of the document.`;
}

// Run the test
testDeepseekPolicyGeneration().catch(console.error);
