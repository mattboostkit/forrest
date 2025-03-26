import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, FileCheck, ChevronRight } from 'lucide-react';

const Tools = () => {
  const tools = [
    {
      id: 'cv-generator',
      title: 'CV & Cover Letter Generator',
      description: 'Upload your CV and job specification to get a customised CV and cover letter tailored to the role.',
      icon: FileText,
      color: 'from-blue-500 to-cyan-400',
      path: '/tools/cv-generator'
    },
    {
      id: 'interview-questions',
      title: 'Interview Question Generator',
      description: 'Get structured interview questions based on job role and experience level, with guidance on what to cover in your responses.',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      path: '/tools/interview-questions'
    },
    {
      id: 'hr-policy',
      title: 'HR Policy Generator',
      description: 'Create customised HR policy templates for leave policies, disciplinary procedures, and more based on your industry and company size.',
      icon: FileCheck,
      color: 'from-amber-500 to-orange-500',
      path: '/tools/hr-policy'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">AI-Powered HR Tools</h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Leverage the power of AI to streamline your HR processes and enhance your job search
          </p>
        </div>
      </section>

      {/* Tools Overview */}
      <section className="py-20 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-effect p-8 rounded-lg mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold gradient-text mb-6">Our AI Tools</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                Our suite of AI-powered tools is designed specifically for the UK job market, helping both employers and job seekers navigate the complexities of modern HR processes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tools.map(tool => (
                <div 
                  key={tool.id}
                  className="glass-effect rounded-lg overflow-hidden transition-all hover:shadow-lg"
                >
                  <div className={`bg-gradient-to-r ${tool.color} p-6 text-white`}>
                    <tool.icon className="h-12 w-12 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{tool.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-6">{tool.description}</p>
                    <Link
                      to={tool.path}
                      className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
                    >
                      Try this tool
                      <ChevronRight className="ml-1 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-4">Why Use Our AI Tools?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed specifically for the UK job market
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'UK-Specific Content',
                description: 'All our tools are tailored to UK employment practices, terminology, and legal requirements.'
              },
              {
                title: 'Time-Saving',
                description: 'Automate time-consuming tasks like CV customisation, interview preparation, and policy drafting.'
              },
              {
                title: 'Industry-Specific',
                description: 'Get results tailored to your specific industry, company size, and requirements.'
              },
              {
                title: 'Constantly Updated',
                description: 'Our AI models are regularly updated to reflect the latest trends and best practices in UK employment.'
              }
            ].map((feature, index) => (
              <div key={index} className="glass-effect p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-4">What Users Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from professionals who have used our AI tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The CV Generator helped me tailor my application perfectly for a senior role. I received an interview invitation within days!",
                name: "Sarah Johnson",
                role: "Marketing Professional, London"
              },
              {
                quote: "As a hiring manager, the Interview Question Generator has saved me hours of preparation time while ensuring I ask relevant, insightful questions.",
                name: "James Wilson",
                role: "HR Director, Manchester"
              },
              {
                quote: "The HR Policy Generator created a comprehensive leave policy for our startup in minutes, ensuring we're fully compliant with UK regulations.",
                name: "Emily Roberts",
                role: "Founder, Edinburgh"
              }
            ].map((testimonial, index) => (
              <div key={index} className="glass-effect p-6 rounded-lg">
                <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Try Our AI Tools?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Choose a tool to get started and experience the power of AI-assisted HR processes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map(tool => (
              <Link
                key={tool.id}
                to={tool.path}
                className="bg-white/10 text-white border border-white/30 px-6 py-3 rounded-md text-lg font-medium hover:bg-white/20 transition-all inline-flex items-center shadow-lg"
              >
                <tool.icon className="mr-2 h-5 w-5" />
                {tool.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export { Tools };
