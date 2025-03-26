import React, { useState } from 'react';
import { Users, Search, CheckCircle, AlertCircle, Loader2, Download, Copy } from 'lucide-react';

const InterviewQuestions = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    industry: '',
    experienceLevel: 'mid',
    questionType: 'all',
    numberOfQuestions: '10'
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: ''
  });

  const [results, setResults] = useState<{
    questions: Array<{
      question: string;
      answerGuidance: string;
      category: string;
    }>;
  }>({
    questions: []
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
    
    if (!formData.jobTitle || !formData.industry) {
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
      message: 'Generating interview questions...'
    });

    try {
      // In a real implementation, this would call the Deepseek API
      // For now, we'll simulate a response after a delay
      const apiKey = 'sk-5022c0f99add4e39a49494b6af219265'; // This would be securely stored in a real app
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Sample response data (in a real app, this would come from the API)
      const sampleQuestions = [
        {
          question: `Can you describe your experience with ${formData.jobTitle.toLowerCase()} roles in the ${formData.industry} sector?`,
          answerGuidance: `Focus on specific achievements and responsibilities in previous ${formData.jobTitle.toLowerCase()} positions. Highlight projects relevant to ${formData.industry}, quantify results where possible, and explain how your experience aligns with the company's needs. Mention any industry-specific challenges you've overcome.`,
          category: 'Experience'
        },
        {
          question: `What do you consider to be the biggest challenges facing the ${formData.industry} industry today, and how would you address them in this role?`,
          answerGuidance: `Demonstrate your industry knowledge by identifying 2-3 current challenges (e.g., regulatory changes, technological disruption, market trends). For each challenge, outline a practical approach you would take to address it, drawing on your experience and skills. Show forward-thinking and problem-solving abilities.`,
          category: 'Industry Knowledge'
        },
        {
          question: `Describe a situation where you had to implement a significant change or improvement in a previous ${formData.jobTitle.toLowerCase()} role. What was your approach and what were the results?`,
          answerGuidance: `Use the STAR method (Situation, Task, Action, Result) to structure your answer. Choose an example that demonstrates leadership, innovation, or problem-solving relevant to the role. Explain your specific contribution, the challenges you faced, and quantify the positive outcomes achieved.`,
          category: 'Behavioural'
        },
        {
          question: `How do you prioritise tasks and manage your time effectively when handling multiple projects with competing deadlines?`,
          answerGuidance: `Outline your specific time management system or methodology. Describe tools you use (digital or otherwise), how you assess task importance/urgency, and provide an example of successfully juggling multiple priorities. Emphasise your ability to remain calm under pressure and deliver quality work on time.`,
          category: 'Work Style'
        },
        {
          question: `What approaches do you take to build effective working relationships with colleagues, stakeholders, and clients?`,
          answerGuidance: `Discuss your communication style, active listening skills, and how you adapt your approach to different personalities. Provide examples of successfully building rapport with challenging stakeholders or turning around difficult relationships. Highlight your emotional intelligence and conflict resolution abilities.`,
          category: 'Interpersonal Skills'
        },
        {
          question: `Can you explain a complex ${formData.industry} concept or process in simple terms, as if you were speaking to someone with no industry background?`,
          answerGuidance: `Choose a genuinely complex concept relevant to the role and break it down using simple language, analogies, and real-world examples. Avoid jargon and demonstrate your communication skills by being concise and clear. This tests both your technical knowledge and ability to communicate with non-specialists.`,
          category: 'Communication'
        },
        {
          question: `Describe a significant mistake or failure you've experienced in your career. How did you handle it and what did you learn?`,
          answerGuidance: `Select a genuine professional mistake that isn't catastrophic. Take ownership without making excuses, explain how you addressed the consequences, and most importantly, detail the specific lessons learned and how they've improved your approach since. This demonstrates accountability, resilience, and growth mindset.`,
          category: 'Self-awareness'
        },
        {
          question: `What specific skills or experiences make you particularly suitable for this ${formData.jobTitle} position in our organisation?`,
          answerGuidance: `Align your answer with the job description and company values. Highlight 3-4 key strengths directly relevant to the role, providing evidence for each. Research the company thoroughly beforehand to understand their challenges and culture, then explain how your unique combination of skills addresses their specific needs.`,
          category: 'Fit'
        },
        {
          question: `How do you stay current with industry trends, technologies, and best practices relevant to ${formData.jobTitle} roles?`,
          answerGuidance: `Name specific industry publications, professional associations, courses, conferences, and networking groups you engage with. Mention recent learning experiences and how you've applied new knowledge in practice. This demonstrates your commitment to professional development and passion for the field.`,
          category: 'Professional Development'
        },
        {
          question: `Where do you see yourself professionally in five years, and how does this role fit into your career plan?`,
          answerGuidance: `Strike a balance between ambition and realism. Outline a logical progression that shows commitment to the company and role while demonstrating drive. Research the typical career path in the organization and align your answer accordingly. Emphasise how you hope to grow and add increasing value rather than just climbing titles.`,
          category: 'Career Goals'
        }
      ];

      setResults({
        questions: sampleQuestions
      });

      setStatus({
        loading: false,
        success: true,
        error: false,
        message: 'Your interview questions have been generated successfully!'
      });
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: 'An error occurred while generating your questions. Please try again.'
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadQuestions = () => {
    let content = `# Interview Questions for ${formData.jobTitle} in ${formData.industry}\n\n`;
    
    results.questions.forEach((item, index) => {
      content += `## Question ${index + 1}: ${item.category}\n`;
      content += `${item.question}\n\n`;
      content += `### Answer Guidance:\n`;
      content += `${item.answerGuidance}\n\n`;
      content += `---\n\n`;
    });
    
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `interview-questions-${formData.jobTitle.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-secondary to-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Interview Question Generator</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Generate tailored interview questions with answer guidance for UK job roles
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
                  <button
                    onClick={downloadQuestions}
                    className="bg-secondary text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-secondary/90 transition-all inline-flex items-center shadow-lg"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download All Questions
                  </button>
                </div>

                <div className="space-y-6">
                  {results.questions.map((item, index) => (
                    <div key={index} className="glass-effect p-6 rounded-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-sm font-medium rounded-full mb-2">
                            {item.category}
                          </span>
                          <h3 className="text-xl font-bold text-gray-900">{item.question}</h3>
                        </div>
                        <button
                          onClick={() => copyToClipboard(item.question)}
                          className="p-2 text-gray-500 hover:text-primary transition-colors"
                          title="Copy question"
                        >
                          <Copy className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-semibold text-primary mb-2">Answer Guidance:</h4>
                        <p className="text-gray-700">{item.answerGuidance}</p>
                      </div>
                    </div>
                  ))}
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
                      setResults({
                        questions: []
                      });
                    }}
                    className="bg-primary text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-primary/90 transition-all"
                  >
                    Generate New Questions
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold gradient-text mb-6">Generate Interview Questions</h2>
                  <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                    Create tailored interview questions with answer guidance based on job role, industry, and experience level. Perfect for both interviewers and candidates preparing for UK job interviews.
                  </p>
                </div>

                {status.error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-start">
                    <AlertCircle className="h-5 w-5 text-error mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-error">{status.message}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Job Details */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Job Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                          Job Title *
                        </label>
                        <input
                          type="text"
                          id="jobTitle"
                          name="jobTitle"
                          value={formData.jobTitle}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. Marketing Manager"
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
                          placeholder="e.g. Financial Services"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Question Preferences */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Question Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">
                          Experience Level
                        </label>
                        <select
                          id="experienceLevel"
                          name="experienceLevel"
                          value={formData.experienceLevel}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          <option value="entry">Entry Level (0-2 years)</option>
                          <option value="mid">Mid Level (3-5 years)</option>
                          <option value="senior">Senior Level (6-10 years)</option>
                          <option value="executive">Executive Level (10+ years)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="questionType" className="block text-sm font-medium text-gray-700 mb-1">
                          Question Types
                        </label>
                        <select
                          id="questionType"
                          name="questionType"
                          value={formData.questionType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          <option value="all">All Types</option>
                          <option value="technical">Technical Skills</option>
                          <option value="behavioral">Behavioural/Competency</option>
                          <option value="situational">Situational</option>
                          <option value="cultural">Cultural Fit</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="numberOfQuestions" className="block text-sm font-medium text-gray-700 mb-1">
                          Number of Questions
                        </label>
                        <select
                          id="numberOfQuestions"
                          name="numberOfQuestions"
                          value={formData.numberOfQuestions}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          <option value="5">5 Questions</option>
                          <option value="10">10 Questions</option>
                          <option value="15">15 Questions</option>
                          <option value="20">20 Questions</option>
                        </select>
                      </div>
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
                          <Search className="mr-2 h-5 w-5" />
                          Generate Interview Questions
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
              Our AI-powered tool creates tailored interview questions with answer guidance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Specify Job Details',
                description: 'Enter the job title, industry, and experience level to customise the questions.'
              },
              {
                title: 'AI Generation',
                description: 'Our AI analyses UK job market requirements to create relevant, insightful questions.'
              },
              {
                title: 'Get Complete Guidance',
                description: 'Receive not just questions, but detailed answer guidance to help prepare effectively.'
              }
            ].map((step, index) => (
              <div key={index} className="glass-effect p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 text-secondary text-xl font-bold mb-4">
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
            <h2 className="text-3xl font-bold gradient-text mb-4">UK Interview Success Tips</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert advice for excelling in job interviews in the UK market
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-effect p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-primary mb-4">For Interviewers</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Structure interviews consistently for all candidates to ensure fairness</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Use a mix of competency, technical, and cultural fit questions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Allow sufficient time for candidates to ask their own questions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Take detailed notes during interviews for objective comparison</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Be aware of unconscious bias and focus on skills and experience</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Provide clear information about next steps in the hiring process</span>
                </li>
              </ul>
            </div>
            
            <div className="glass-effect p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-primary mb-4">For Candidates</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Research the company thoroughly, including recent news and developments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Prepare examples using the STAR method (Situation, Task, Action, Result)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Practice your answers but avoid sounding overly rehearsed</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Prepare thoughtful questions that demonstrate your interest and research</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Dress professionally, even for virtual interviews</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Send a thank-you email within 24 hours of your interview</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export { InterviewQuestions };
