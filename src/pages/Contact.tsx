import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Linkedin, 
  Facebook, 
  Twitter, 
  Instagram,
  CheckCircle2
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send the form data to a server
    // For now, we'll just simulate a successful submission
    setFormStatus({
      submitted: true,
      error: false,
      message: 'Thank you for your message. We will be in touch shortly!'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Get in touch with our team of HR experts to discuss how we can help your business
          </p>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-20 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="glass-effect p-8 rounded-lg">
              <h2 className="text-3xl font-bold gradient-text mb-8">Get In Touch</h2>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start">
                  <div className="p-3 bg-primary/10 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Office Location</h3>
                    <p className="text-gray-600">
                      Forrest Group<br />
                      Unit 3, Swanley Centre<br />
                      London Road<br />
                      Swanley, Kent<br />
                      BR8 7TG
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-primary/10 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">
                      <a href="tel:+441322520305" className="hover:text-primary transition-colors">
                        01322 520 305
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-primary/10 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:info@forresthr.co.uk" className="hover:text-primary transition-colors">
                        info@forresthr.co.uk
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-primary/10 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 5:30 PM<br />
                      Saturday - Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.linkedin.com/company/forresthr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-[#0077B5] rounded-full text-white hover:opacity-90 transition-opacity"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://www.facebook.com/forresthr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-[#1877F2] rounded-full text-white hover:opacity-90 transition-opacity"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://twitter.com/forresthr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-[#1DA1F2] rounded-full text-white hover:opacity-90 transition-opacity"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://www.instagram.com/forresthr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] rounded-full text-white hover:opacity-90 transition-opacity"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="glass-effect p-8 rounded-lg">
              <h2 className="text-3xl font-bold gradient-text mb-8">Send Us a Message</h2>
              
              {formStatus.submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">{formStatus.message}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                      Service You're Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="">Please select</option>
                      <option value="hr-consulting">HR Consulting</option>
                      <option value="employee-training">Employee Training</option>
                      <option value="health-safety">Health & Safety</option>
                      <option value="legal">Legal Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-primary text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-primary-dark transition-all inline-flex items-center justify-center shadow-lg"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </button>
                    <p className="text-sm text-gray-500 mt-3">
                      Fields marked with * are required
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-effect p-4 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.0146950936404!2d0.17070337678788244!3d51.45127717180641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8ae1e2cebd2a7%3A0x1a1c9ebf46fc3b9c!2sSwanley%20Shopping%20Centre!5e0!3m2!1sen!2suk!4v1698767851818!5m2!1sen!2suk"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Forrest Group Office Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Common questions about contacting us
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                question: 'How quickly will you respond to my inquiry?',
                answer: 'We aim to respond to all inquiries within 24 business hours. For urgent matters, please call our office directly.'
              },
              {
                question: 'Do you offer free consultations?',
                answer: 'Yes, we offer a free initial consultation to discuss your business needs and how we can help. This can be conducted in person, over the phone, or via video call.'
              },
              {
                question: 'Can I schedule a meeting at your office?',
                answer: 'Absolutely! We welcome clients to our office in Swanley. Please contact us to schedule an appointment at a time that works for you.'
              },
              {
                question: 'Do you serve businesses outside of Kent and London?',
                answer: 'While our physical office is in Kent, we serve clients throughout the UK. Many of our services can be delivered remotely.'
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
    </div>
  );
}

export { Contact };