import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Plus, Minus, Briefcase, GraduationCap, ShieldCheck, Scale } from 'lucide-react';
import { services, testimonials, blogPosts, faqs } from '../data';
import { useState } from 'react';

const Home = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(14, 61, 54, 0.6) 0%, rgba(26, 90, 80, 0.6) 100%), url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight max-w-4xl">
            Comprehensive and
            <br />
            Flexible Business Services
          </h1>
          <p className="text-xl mb-8 max-w-2xl">
            The Forrest Group provides complete, affordable people management and support services for SMEs across London and the South East.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="bg-accent text-primary px-8 py-3 rounded-md text-lg font-medium hover:opacity-90 transition-all inline-flex items-center shadow-lg"
            >
              Book A Free Consultation
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/services"
              className="text-[#3C5956] hover:text-[#3C5956]/80 bg-white/90 px-8 py-3 rounded-md text-lg font-medium hover:opacity-90 transition-all shadow-lg"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-4">An Introduction to Forrest Group</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-600 mb-6">
                The Forrest Group provides comprehensive, flexible, affordable people management and support services for SMEs across London and the South East, delivering a complete seamless solution for your business.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                From HR guidance with employee and employment matters and a wide range of training courses to get the most out of your teams, to health and safety, managed payroll and HR software to streamline your business operations, Forrest Group can work with you every step of the way.
              </p>
              <p className="text-lg text-gray-600">
                Our professional consultants are all experts in their field, offering you the highest level of service that is guaranteed across all our brands.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800"
                alt="Team meeting"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
          <div className="mt-12">
            <p className="text-lg text-gray-600 text-center">
              We have a wide spectrum of clients across many different industries and sizes, from start-ups and SMEs in Kent and Sussex to larger London-based corporations. With our flexible approach, we can offer the right service for your organisation's needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive business solutions tailored to your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 relative backdrop-blur-sm overflow-hidden ${
                  service.id === 'hr-consulting'
                    ? 'bg-gradient-to-br from-emerald-50 to-teal-100 border border-emerald-200/50'
                    : service.id === 'employee-training'
                    ? 'bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200/50'
                    : service.id === 'health-safety'
                    ? 'bg-gradient-to-br from-amber-50 to-yellow-100 border border-amber-200/50'
                    : 'bg-gradient-to-br from-rose-50 to-pink-100 border border-rose-200/50'
                }`}
              >
                <div className="absolute inset-0 opacity-30">
                  <div className={`absolute w-64 h-64 rounded-full filter blur-3xl ${
                    service.id === 'hr-consulting'
                      ? 'bg-emerald-200 -top-32 -right-32'
                      : service.id === 'employee-training'
                      ? 'bg-blue-200 -bottom-32 -left-32'
                      : service.id === 'health-safety'
                      ? 'bg-amber-200 -top-32 -left-32'
                      : 'bg-rose-200 -bottom-32 -right-32'
                  }`}></div>
                </div>
                <div className="relative">
                <div className="mb-4">
                  {service.icon === 'Briefcase' && <Briefcase className="h-12 w-12 text-primary" />}
                  {service.icon === 'GraduationCap' && <GraduationCap className="h-12 w-12 text-primary" />}
                  {service.icon === 'ShieldCheck' && <ShieldCheck className="h-12 w-12 text-primary" />}
                  {service.icon === 'Scale' && <Scale className="h-12 w-12 text-primary" />}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link
                  to={`/services#${service.id}`}
                  className={`font-medium inline-flex items-center ${
                    'text-[#3C5956] hover:text-[#3C5956]/80'
                  }`}
                >
                  Learn more
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="bg-primary text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-primary-dark transition-all inline-flex items-center shadow-lg"
            >
              View All Services
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from businesses we've helped transform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 italic">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Post */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-4">Latest Forrest Insights</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay updated with our latest HR insights and industry trends
            </p>
          </div>

          <div className="glass-effect p-6 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative h-64 lg:h-auto">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <img
                    src={blogPosts[0].author.avatar}
                    alt={blogPosts[0].author.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{blogPosts[0].author.name}</p>
                    <p className="text-sm text-gray-500">{blogPosts[0].author.role}</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{blogPosts[0].title}</h3>
                <p className="text-gray-600 mb-4">{blogPosts[0].excerpt}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span>{new Date(blogPosts[0].date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span className="mx-2">•</span>
                  <span>{blogPosts[0].category}</span>
                </div>
                <Link
                  to={`/blog/${blogPosts[0].id}`}
                  className="text-primary font-medium inline-flex items-center"
                >
                  Read more
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {blogPosts.slice(1, 4).map((post) => (
              <div key={post.id} className="glass-effect rounded-lg overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-primary font-medium inline-flex items-center text-sm"
                  >
                    Read more
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="bg-white text-primary border border-primary px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-50 transition-all inline-flex items-center shadow-sm"
            >
              View All Insights
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Breathe HR Promotion Section */}
      <section className="py-20 bg-[#004952] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* Breathe Logo */}
            <div className="mb-6">
              <img 
                src="https://ik.imagekit.io/boostkit/Forrest%20HR/breathe-logo-white.png" 
                alt="Breathe - Accredited Partner" 
                className="h-16 mx-auto" 
              />
              <p className="text-sm mt-2">Accredited Partner</p>
            </div>
            
            {/* Exclusive Offer Banner */}
            <div className="bg-[#1E88E5] text-white py-3 px-8 rounded-full mb-8 inline-block">
              <h2 className="text-xl font-bold">EXCLUSIVE OFFER</h2>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Streamline your HR with Breathe</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Sign up between 1st March – 31st May and receive exclusive discounts
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-12">
            {/* 20% off Annual */}
            <div className="bg-[#1E88E5] rounded-full p-6 w-56 h-56 flex flex-col items-center justify-center text-center">
              <h3 className="text-3xl font-bold mb-2">20% off</h3>
              <p className="text-lg">
                for a full year with annual accounts
              </p>
            </div>
            
            {/* 20% off Monthly */}
            <div className="bg-[#1E88E5] rounded-full p-6 w-56 h-56 flex flex-col items-center justify-center text-center">
              <h3 className="text-3xl font-bold mb-2">20% off</h3>
              <p className="text-lg">
                for 3 months with monthly accounts
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <Link 
              to="/breathe" 
              className="bg-white text-[#004952] px-8 py-3 rounded-md text-lg font-medium hover:bg-opacity-90 transition-all inline-flex items-center shadow-lg"
            >
              Learn More About This Offer
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <p className="mt-4 text-sm opacity-80">
              *Offer valid for new customers only. Terms and conditions apply.
            </p>
          </div>
        </div>
        
        {/* Removing the curved bottom edge as requested */}
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our services
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="glass-effect rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.question)}
                    className="w-full flex justify-between items-center p-6 text-left"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                    {openFaq === faq.question ? (
                      <Minus className="h-5 w-5 text-primary" />
                    ) : (
                      <Plus className="h-5 w-5 text-primary" />
                    )}
                  </button>
                  {openFaq === faq.question && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Book your free consultation today and discover how we can help your business grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="glass-effect text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-white/20 transition-all inline-flex items-center shadow-lg"
            >
              Book Your Free Consultation
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className="bg-white/10 text-white border border-white/30 px-8 py-3 rounded-md text-lg font-medium hover:bg-white/20 transition-all inline-flex items-center shadow-lg"
            >
              Download Our Brochure
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export { Home };