import React, { useState } from 'react';
import { FileCheck, CheckCircle, AlertCircle, Loader2, Download, Copy } from 'lucide-react';
import axios from 'axios';

export const HRPolicy = () => {
  const [formData, setFormData] = useState({
    policyType: 'leave',
    companyName: '',
    industry: '',
    companySize: 'medium',
    region: 'england',
    additionalInfo: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: ''
  });

  const [result, setResult] = useState({
    policyContent: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.industry) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Please fill in all required fields.'
      });
      return;
    }

    setStatus({
      loading: true,
      success: false,
      error: false,
      message: 'Generating your HR policy...'
    });

    try {
      // Deepseek API key - in a production app, this would be stored in environment variables
      const apiKey = 'sk-5022c0f99add4e39a49494b6af219265';
      
      // Prepare the prompt based on the form data
      const prompt = generatePrompt(formData);
      
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
      
      setResult({
        policyContent: policyContent
      });

      setStatus({
        loading: false,
        success: true,
        error: false,
        message: 'Your HR policy has been generated successfully!'
      });
    } catch (error: any) {
      console.error('API Error:', error);
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: error.response?.data?.error?.message || 'An error occurred while generating your policy. Please try again.'
      });
    }
  };

  // Helper function to generate the prompt for the API
  const generatePrompt = (data: typeof formData) => {
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
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.policyContent);
  };

  const downloadPolicy = () => {
    const policyTypeFormatted = formData.policyType.charAt(0).toUpperCase() + formData.policyType.slice(1);
    const filename = `${formData.companyName.replace(/\s+/g, '-')}-${formData.policyType}-Policy.md`.toLowerCase();
    
    const element = document.createElement('a');
    const file = new Blob([result.policyContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-accent to-accent-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">HR Policy Generator</h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            Create customised HR policies compliant with UK employment law
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-effect p-8 rounded-lg mb-16">
            {status.success ? (
              <div className="space-y-8">
                <div className="text-center">
                  <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                  <h2 className="text-3xl font-bold gradient-text mb-4">Success!</h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                    {status.message}
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <button
                      onClick={downloadPolicy}
                      className="bg-primary text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-primary/90 transition-all inline-flex items-center shadow-lg"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download Policy
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="bg-secondary text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-secondary/90 transition-all inline-flex items-center shadow-lg"
                    >
                      <Copy className="mr-2 h-5 w-5" />
                      Copy to Clipboard
                    </button>
                  </div>
                </div>

                <div className="glass-effect p-6 rounded-lg">
                  <div className="bg-gray-50 p-6 rounded-md h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800">
                      {result.policyContent}
                    </pre>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <button
                    onClick={() => {
                      setStatus({
                        loading: false,
                        success: false,
                        error: false,
                        message: ''
                      });
                      setResult({
                        policyContent: ''
                      });
                    }}
                    className="bg-accent text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-accent/90 transition-all"
                  >
                    Generate Another Policy
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold gradient-text mb-6">Generate HR Policy</h2>
                  <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                    Create customised HR policies tailored to your company size, industry, and specific requirements. All policies are compliant with current UK employment law.
                  </p>
                </div>

                {status.error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-start">
                    <AlertCircle className="h-5 w-5 text-error mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-error">{status.message}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Policy Type */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Policy Type</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className={`p-6 rounded-lg cursor-pointer transition-all ${
                        formData.policyType === 'leave' 
                          ? 'bg-primary text-white shadow-lg' 
                          : 'bg-white hover:bg-gray-50 border border-gray-200'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, policyType: 'leave' }))}>
                        <h4 className="text-lg font-semibold mb-2">Annual Leave Policy</h4>
                        <p className={`text-sm ${formData.policyType === 'leave' ? 'text-white/90' : 'text-gray-600'}`}>
                          Guidelines for requesting, approving, and managing employee annual leave entitlements.
                        </p>
                      </div>
                      
                      <div className={`p-6 rounded-lg cursor-pointer transition-all ${
                        formData.policyType === 'disciplinary' 
                          ? 'bg-primary text-white shadow-lg' 
                          : 'bg-white hover:bg-gray-50 border border-gray-200'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, policyType: 'disciplinary' }))}>
                        <h4 className="text-lg font-semibold mb-2">Disciplinary Procedure</h4>
                        <p className={`text-sm ${formData.policyType === 'disciplinary' ? 'text-white/90' : 'text-gray-600'}`}>
                          Framework for addressing employee misconduct and performance issues.
                        </p>
                      </div>
                      
                      <div className={`p-6 rounded-lg cursor-pointer transition-all ${
                        formData.policyType === 'remote' 
                          ? 'bg-primary text-white shadow-lg' 
                          : 'bg-white hover:bg-gray-50 border border-gray-200'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, policyType: 'remote' }))}>
                        <h4 className="text-lg font-semibold mb-2">Remote Working Policy</h4>
                        <p className={`text-sm ${formData.policyType === 'remote' ? 'text-white/90' : 'text-gray-600'}`}>
                          Guidelines for employees working remotely, including expectations and requirements.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Company Details */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Company Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. Acme Corporation Ltd"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                          Industry *
                        </label>
                        <input
                          type="text"
                          id="industry"
                          name="industry"
                          value={formData.industry}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. Technology, Retail, Healthcare"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-1">
                          Company Size
                        </label>
                        <select
                          id="companySize"
                          name="companySize"
                          value={formData.companySize}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          <option value="small">Small (1-49 employees)</option>
                          <option value="medium">Medium (50-249 employees)</option>
                          <option value="large">Large (250+ employees)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                          UK Region
                        </label>
                        <select
                          id="region"
                          name="region"
                          value={formData.region}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          <option value="england">England & Wales</option>
                          <option value="scotland">Scotland</option>
                          <option value="northern-ireland">Northern Ireland</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Information (Optional)
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Add any specific requirements or information you'd like to include in the policy"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                      style={{ maxHeight: '120px' }}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center mt-8 mb-8 sticky bottom-4">
                    <button
                      type="submit"
                      disabled={status.loading}
                      className="bg-accent text-white px-10 py-4 rounded-md text-xl font-medium hover:bg-accent/90 transition-all inline-flex items-center shadow-xl disabled:opacity-70 border-2 border-white"
                      style={{ boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.2)' }}
                    >
                      {status.loading ? (
                        <>
                          <Loader2 className="animate-spin mr-2 h-5 w-5" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <FileCheck className="mr-2 h-5 w-5" />
                          Generate HR Policy
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered tool creates customised HR policies tailored to your specific business needs using advanced AI technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-effect p-6 rounded-lg text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Enter Your Details</h3>
              <p className="text-gray-600">
                Provide information about your company, industry, and specific requirements.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Generation</h3>
              <p className="text-gray-600">
                Our AI creates a customised policy based on current UK employment law and best practices.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Download & Use</h3>
              <p className="text-gray-600">
                Download your policy in Markdown format, ready to use in your business.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
