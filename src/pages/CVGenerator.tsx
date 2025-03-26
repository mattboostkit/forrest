import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const CVGenerator = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    jobTitle: '',
    industry: '',
    experienceLevel: 'mid',
    customizeLevel: 'moderate'
  });

  const [files, setFiles] = useState({
    cv: null as File | null,
    jobSpec: null as File | null
  });

  const [fileContents, setFileContents] = useState({
    cv: '',
    jobSpec: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: ''
  });

  const [results, setResults] = useState({
    cv: '',
    coverLetter: ''
  });

  const cvInputRef = useRef<HTMLInputElement>(null);
  const jobSpecInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'cv' | 'jobSpec') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFiles(prev => ({
        ...prev,
        [fileType]: file
      }));

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const target = event.target as FileReader;
        if (target && typeof target.result === 'string') {
          setFileContents(prev => ({
            ...prev,
            [fileType]: target.result
          }));
        }
      };
      reader.readAsText(file);
    }
  };

  const triggerFileInput = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!files.cv || !files.jobSpec) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Please upload both your CV and the job specification.'
      });
      return;
    }

    setStatus({
      loading: true,
      success: false,
      error: false,
      message: 'Generating your customised CV and cover letter...'
    });

    try {
      // In a real implementation, this would call the Deepseek API
      // For now, we'll simulate a response after a delay
      const apiKey = 'sk-5022c0f99add4e39a49494b6af219265'; // This would be securely stored in a real app
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Sample response data (in a real app, this would come from the API)
      const sampleCV = `# ${formData.name}
**${formData.email} | ${formData.phone}**

## Professional Summary
Experienced ${formData.jobTitle} with a proven track record in the ${formData.industry} sector. Skilled in strategic planning, team leadership, and delivering measurable results.

## Work Experience
### Senior ${formData.jobTitle}
XYZ Company, London
January 2020 - Present

- Led cross-functional teams to deliver projects on time and within budget
- Implemented new processes that increased efficiency by 25%
- Managed client relationships resulting in 95% retention rate

### ${formData.jobTitle}
ABC Corporation, Manchester
March 2017 - December 2019

- Developed and executed strategic initiatives that drove 30% revenue growth
- Supervised a team of 5 professionals, providing mentorship and guidance
- Collaborated with stakeholders to ensure alignment with business objectives

## Education
### MBA, Business Administration
University of London
2015 - 2017

### BSc, Business Management
University of Manchester
2011 - 2015

## Skills
- Strategic Planning
- Team Leadership
- Project Management
- Stakeholder Management
- Budget Administration
- Performance Analysis`;

      const sampleCoverLetter = `Dear Hiring Manager,

I am writing to express my interest in the ${formData.jobTitle} position at your company, as advertised. With over 5 years of experience in the ${formData.industry} industry, I believe I have the skills and expertise to make a significant contribution to your team.

Throughout my career, I have demonstrated a strong ability to lead teams, manage projects, and deliver results. In my current role as Senior ${formData.jobTitle} at XYZ Company, I have successfully implemented strategies that have increased efficiency and maintained high client retention rates.

I am particularly drawn to your company because of its reputation for innovation and commitment to excellence. I am confident that my experience in strategic planning, team leadership, and project management aligns perfectly with the requirements outlined in the job specification.

I am excited about the opportunity to bring my unique blend of skills and experience to your organization and would welcome the chance to discuss how I can contribute to your team's success.

Thank you for considering my application. I look forward to the possibility of discussing this opportunity with you further.

Sincerely,
${formData.name}`;

      setResults({
        cv: sampleCV,
        coverLetter: sampleCoverLetter
      });

      setStatus({
        loading: false,
        success: true,
        error: false,
        message: 'Your customised CV and cover letter have been generated successfully!'
      });
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: 'An error occurred while generating your documents. Please try again.'
      });
    }
  };

  const downloadDocument = (content: string, filename: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">CV & Cover Letter Generator</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Tailor your CV and create a compelling cover letter for your dream job in the UK market
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* CV Result */}
                  <div className="glass-effect p-6 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-bold text-primary">Your Tailored CV</h3>
                      <button 
                        onClick={() => downloadDocument(results.cv, 'tailored-cv.md')}
                        className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-all"
                      >
                        Download
                      </button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800">
                        {results.cv}
                      </pre>
                    </div>
                  </div>

                  {/* Cover Letter Result */}
                  <div className="glass-effect p-6 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-bold text-primary">Your Cover Letter</h3>
                      <button 
                        onClick={() => downloadDocument(results.coverLetter, 'cover-letter.md')}
                        className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-all"
                      >
                        Download
                      </button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800">
                        {results.coverLetter}
                      </pre>
                    </div>
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
                      setFiles({
                        cv: null,
                        jobSpec: null
                      });
                      setFileContents({
                        cv: '',
                        jobSpec: ''
                      });
                    }}
                    className="bg-secondary text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-secondary/90 transition-all"
                  >
                    Generate Another CV
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold gradient-text mb-6">Customise Your CV & Cover Letter</h2>
                  <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                    Upload your existing CV and the job specification to get a tailored CV and cover letter that highlights your relevant skills and experience for the specific role.
                  </p>
                </div>

                {status.error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-start">
                    <AlertCircle className="h-5 w-5 text-error mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-error">{status.message}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>

                      <div>
                        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                          Current/Target Job Title *
                        </label>
                        <input
                          type="text"
                          id="jobTitle"
                          name="jobTitle"
                          value={formData.jobTitle}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Job Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">
                          Experience Level *
                        </label>
                        <select
                          id="experienceLevel"
                          name="experienceLevel"
                          value={formData.experienceLevel}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          <option value="entry">Entry Level (0-2 years)</option>
                          <option value="mid">Mid Level (3-5 years)</option>
                          <option value="senior">Senior Level (6-10 years)</option>
                          <option value="executive">Executive Level (10+ years)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* File Uploads */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload Documents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Current CV *
                        </label>
                        <input
                          type="file"
                          ref={cvInputRef}
                          onChange={(e) => handleFileChange(e, 'cv')}
                          accept=".pdf,.doc,.docx,.txt"
                          className="hidden"
                        />
                        <div 
                          onClick={() => triggerFileInput(cvInputRef)}
                          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                            files.cv ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-primary hover:bg-blue-50'
                          }`}
                        >
                          {files.cv ? (
                            <div className="flex flex-col items-center">
                              <CheckCircle className="h-8 w-8 text-success mb-2" />
                              <p className="text-gray-700 font-medium">{files.cv.name}</p>
                              <p className="text-gray-500 text-sm mt-1">
                                {(files.cv.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <Upload className="h-8 w-8 text-gray-400 mb-2" />
                              <p className="text-gray-700 font-medium">Upload your CV</p>
                              <p className="text-gray-500 text-sm mt-1">
                                PDF, DOC, DOCX or TXT (Max 5MB)
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job Specification *
                        </label>
                        <input
                          type="file"
                          ref={jobSpecInputRef}
                          onChange={(e) => handleFileChange(e, 'jobSpec')}
                          accept=".pdf,.doc,.docx,.txt"
                          className="hidden"
                        />
                        <div 
                          onClick={() => triggerFileInput(jobSpecInputRef)}
                          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                            files.jobSpec ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-primary hover:bg-blue-50'
                          }`}
                        >
                          {files.jobSpec ? (
                            <div className="flex flex-col items-center">
                              <CheckCircle className="h-8 w-8 text-success mb-2" />
                              <p className="text-gray-700 font-medium">{files.jobSpec.name}</p>
                              <p className="text-gray-500 text-sm mt-1">
                                {(files.jobSpec.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <FileText className="h-8 w-8 text-gray-400 mb-2" />
                              <p className="text-gray-700 font-medium">Upload job specification</p>
                              <p className="text-gray-500 text-sm mt-1">
                                PDF, DOC, DOCX or TXT (Max 5MB)
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Customization Options */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Customisation Options</h3>
                    <div>
                      <label htmlFor="customizeLevel" className="block text-sm font-medium text-gray-700 mb-1">
                        Customisation Level
                      </label>
                      <select
                        id="customizeLevel"
                        name="customizeLevel"
                        value={formData.customizeLevel}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                      >
                        <option value="light">Light - Minor adjustments to match keywords</option>
                        <option value="moderate">Moderate - Restructure content to highlight relevant experience</option>
                        <option value="extensive">Extensive - Comprehensive rewrite to match job requirements</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={status.loading}
                      className="bg-primary text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-primary/90 transition-all inline-flex items-center shadow-lg disabled:opacity-70"
                    >
                      {status.loading ? (
                        <>
                          <Loader2 className="animate-spin mr-2 h-5 w-5" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <FileText className="mr-2 h-5 w-5" />
                          Generate CV & Cover Letter
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
              Our AI-powered tool analyses your CV and the job specification to create tailored documents
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Upload Your Documents',
                description: 'Upload your current CV and the job specification you\'re applying for.'
              },
              {
                title: 'AI Analysis',
                description: 'Our AI analyses both documents to identify key requirements and match them with your skills and experience.'
              },
              {
                title: 'Get Tailored Results',
                description: 'Receive a customised CV and cover letter that highlights your relevant qualifications for the specific role.'
              }
            ].map((step, index) => (
              <div key={index} className="glass-effect p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-primary text-xl font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-4">UK CV & Cover Letter Tips</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert advice for creating effective job application documents in the UK
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-effect p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-primary mb-4">CV Best Practices</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Keep your CV to 2 pages maximum for most roles</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Use a professional, clean layout with clear section headings</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Include a professional profile or personal statement at the top</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">List your work experience in reverse chronological order</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Quantify achievements with specific numbers and results</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Tailor your skills section to match the job requirements</span>
                </li>
              </ul>
            </div>
            
            <div className="glass-effect p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-primary mb-4">Cover Letter Guidelines</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Address the letter to a specific person when possible</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Keep it concise - no more than one page</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Explain why you're interested in the role and company</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Highlight 2-3 key achievements relevant to the position</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Use a professional closing and include your contact details</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Proofread carefully for spelling and grammar errors</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export { CVGenerator };
