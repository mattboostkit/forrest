import React, { useState } from 'react';
import { services } from '../data';
import { 
  ChevronRight, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const [activeTab, setActiveTab] = useState(services[0].id);

  const activeService = services.find(service => service.id === activeTab);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Comprehensive business support services across London, Kent & Sussex
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-effect p-8 rounded-lg mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold gradient-text mb-6">The Forrest Group</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                The Forrest Group of companies provide comprehensive, flexible, affordable people management and support services for SMEs, providing you with a complete seamless solution for your business. Our teams of professional consultants are all experts in their field, offering you the highest level of service that is guaranteed across all our brands.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map(service => (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`p-6 rounded-lg text-left transition-all h-full flex flex-col ${
                    activeTab === service.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-full mr-4 ${
                      activeTab === service.id ? 'bg-white/20' : 'bg-primary/10'
                    }`}>
                      <service.icon className={`h-6 w-6 ${
                        activeTab === service.id ? 'text-white' : 'text-primary'
                      }`} />
                    </div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <p className={`${
                    activeTab === service.id ? 'text-white/90' : 'text-gray-600'
                  } mt-auto`}>
                    {service.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Active Service Details */}
      {activeService && (
        <section className="py-10" id={activeService.id}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold gradient-text mb-6">{activeService.title}</h2>
                <p className="text-lg text-gray-600 mb-8">
                  {activeService.longDescription || activeService.description}
                </p>
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">What We Offer:</h3>
                  <ul className="space-y-3">
                    {activeService.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contact"
                    className="bg-primary text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-primary-dark transition-all inline-flex items-center shadow-lg"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Book a Consultation
                  </Link>
                  <a
                    href="https://www.theforrestgroup.co.uk/_files/ugd/11f0fe_3ed1e54d4aa84bf5ab288ee1223f827a.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accent text-primary px-6 py-3 rounded-md text-lg font-medium hover:opacity-90 transition-all inline-flex items-center shadow-lg"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Brochure
                  </a>
                </div>
              </div>
              <div className="relative">
                {activeService.id === 'hr-consulting' ? (
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-100 rounded-lg h-96 flex items-center justify-center">
                    <div className="text-center p-8">
                      <activeService.icon className="h-24 w-24 text-primary opacity-30 mx-auto mb-6" />
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Strategic HR Solutions</h3>
                      <p className="text-gray-600 max-w-md">
                        Our HR consulting services provide tailored solutions to help your business thrive. 
                        From organizational development to employee relations, we've got you covered.
                      </p>
                    </div>
                  </div>
                ) : activeService.id === 'employee-training' ? (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg h-96 flex items-center justify-center">
                    <div className="text-center p-8">
                      <activeService.icon className="h-24 w-24 text-primary opacity-30 mx-auto mb-6" />
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Professional Development</h3>
                      <p className="text-gray-600 max-w-md">
                        Our training programs are designed to enhance skills, boost productivity, and 
                        create a more engaged workforce. Invest in your team's growth with our expert-led courses.
                      </p>
                    </div>
                  </div>
                ) : activeService.id === 'health-safety' ? (
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-lg h-96 flex items-center justify-center">
                    <div className="text-center p-8">
                      <activeService.icon className="h-24 w-24 text-primary opacity-30 mx-auto mb-6" />
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Workplace Safety</h3>
                      <p className="text-gray-600 max-w-md">
                        Protect your employees and business with our comprehensive health & safety services.
                        We help you create a safer workplace while ensuring full regulatory compliance.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-rose-50 to-pink-100 rounded-lg h-96 flex items-center justify-center">
                    <div className="text-center p-8">
                      <activeService.icon className="h-24 w-24 text-primary opacity-30 mx-auto mb-6" />
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Legal Expertise</h3>
                      <p className="text-gray-600 max-w-md">
                        Navigate complex employment laws with confidence. Our legal experts provide 
                        guidance and support to protect your business and ensure compliance.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Service Packages */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-4">Our Service Packages</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible solutions tailored to your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Essential HR',
                price: 'From £150/month',
                description: 'Perfect for small businesses needing fundamental HR support',
                features: [
                  'HR compliance review',
                  'Contract templates',
                  'Basic policy development',
                  'Email & phone support (10 hours)',
                  'Monthly HR newsletter'
                ],
                popular: false
              },
              {
                title: 'Business HR',
                price: 'From £350/month',
                description: 'Comprehensive HR support for growing businesses',
                features: [
                  'Everything in Essential HR',
                  'Unlimited phone & email support',
                  'Quarterly on-site visits',
                  'Employee handbook development',
                  'Performance management tools',
                  'Recruitment assistance'
                ],
                popular: true
              },
              {
                title: 'Enterprise HR',
                price: 'Custom pricing',
                description: 'Full-service HR solution for established businesses',
                features: [
                  'Everything in Business HR',
                  'Dedicated HR consultant',
                  'Monthly on-site visits',
                  'Strategic HR planning',
                  'Employee engagement programs',
                  'Training & development solutions',
                  'HR systems implementation'
                ],
                popular: false
              }
            ].map((pkg) => (
              <div 
                key={pkg.title} 
                className={`glass-effect p-8 rounded-lg relative ${
                  pkg.popular ? 'border-2 border-primary' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
                <div className="text-primary text-2xl font-bold mb-4">{pkg.price}</div>
                <p className="text-gray-600 mb-6">{pkg.description}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`w-full py-3 rounded-md text-center font-medium transition-all inline-block ${
                    pkg.popular 
                      ? 'bg-primary text-white hover:bg-primary-dark' 
                      : 'bg-accent text-primary hover:opacity-90'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how we've helped businesses like yours
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Streamlining HR for a Growing Tech Startup',
                company: 'TechNova Solutions',
                description: 'Implemented comprehensive HR systems and policies for a rapidly expanding tech company, reducing administrative workload by 40% and improving employee satisfaction scores by 25%.',
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'
              },
              {
                title: 'Transforming Employee Training Programs',
                company: 'Meridian Retail Group',
                description: 'Developed and delivered custom training programs for 200+ retail staff, resulting in a 30% increase in sales performance and 15% reduction in staff turnover within six months.',
                image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
              },
              {
                title: 'Health & Safety Compliance Overhaul',
                company: 'Pinnacle Manufacturing',
                description: 'Conducted comprehensive health & safety audit and implemented new protocols, reducing workplace incidents by 75% and avoiding potential regulatory penalties.',
                image: 'https://images.unsplash.com/photo-1581094794329-c8112c4e5190?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
              },
              {
                title: 'Payroll Optimization for Multi-Branch Business',
                company: 'Heritage Hospitality Group',
                description: 'Streamlined payroll processes across 12 locations, saving 20 hours of administrative time per month and ensuring 100% compliance with tax regulations.',
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
              }
            ].map((study) => (
              <div key={study.title} className="glass-effect rounded-lg overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-1">{study.title}</h3>
                      <p className="text-white/80">{study.company}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{study.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Common questions about our services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                question: 'How quickly can you start providing HR support?',
                answer: 'We can typically begin providing support within 1-2 business days of signing our service agreement. For urgent matters, we offer expedited onboarding processes.'
              },
              {
                question: 'Do you work with businesses of all sizes?',
                answer: 'Yes, we work with businesses of all sizes, from startups to established enterprises. Our service packages are designed to scale with your needs.'
              },
              {
                question: 'Can you help with specific HR projects rather than ongoing support?',
                answer: 'Absolutely. In addition to our monthly service packages, we offer project-based services for specific needs such as employee handbook development, HR audits, or recruitment campaigns.'
              },
              {
                question: 'What geographic areas do you serve?',
                answer: 'We primarily serve businesses in London, Kent, and Sussex. However, we can provide remote support to businesses throughout the UK.'
              },
              {
                question: 'How do your training programs work?',
                answer: 'Our training programs can be delivered on-site at your location or virtually. We offer both standardized training modules and custom-developed programs tailored to your specific needs.'
              },
              {
                question: 'What makes Forrest Group different from other HR consultancies?',
                answer: 'Our integrated approach sets us apart. We provide comprehensive business support across HR, training, health & safety, and payroll, offering a seamless solution rather than fragmented services.'
              }
            ].map((faq, index) => (
              <div key={index} className="glass-effect p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Book your free consultation today and discover how our services can help your business thrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="glass-effect text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-white/20 transition-all inline-flex items-center shadow-lg"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book Your Free Consultation
            </Link>
            <Link
              to="/about"
              className="bg-white/10 text-white border border-white/30 px-8 py-3 rounded-md text-lg font-medium hover:bg-white/20 transition-all inline-flex items-center shadow-lg"
            >
              <ArrowRight className="mr-2 h-5 w-5" />
              Learn About Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export { Services };