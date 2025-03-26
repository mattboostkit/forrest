import React from 'react';
import { Users, Award, Clock, Globe, Download, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { label: 'Years of Experience', value: '15+', icon: Clock },
    { label: 'Satisfied Clients', value: '500+', icon: Users },
    { label: 'Industry Awards', value: '15', icon: Award },
    { label: 'Regions Served', value: '3', icon: Globe },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            Comprehensive business support services across London, Kent & Sussex
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 -mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-effect p-6 rounded-lg text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Overview Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold gradient-text mb-6">The Forrest Group</h2>
              <p className="text-lg text-gray-600 mb-6">
                The Forrest Group of companies provide comprehensive, flexible, affordable people management and support services for SMEs, providing you with a complete seamless solution for your business.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our teams of professional consultants are all experts in their field, offering you the highest level of service that is guaranteed across all our brands.
              </p>
              <p className="text-lg text-gray-600">
                We have a wide spectrum of clients across many different industries and sizes, from start-ups and SMEs in Kent and Sussex to larger London-based corporations. With our flexible approach, we can offer the right service for your organisation's needs.
              </p>
              <div className="mt-8">
                <a 
                  href="https://www.theforrestgroup.co.uk/_files/ugd/11f0fe_3ed1e54d4aa84bf5ab288ee1223f827a.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-accent text-primary px-6 py-3 rounded-md text-lg font-medium hover:opacity-90 transition-all inline-flex items-center shadow-lg"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Our Brochure
                </a>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800"
                alt="Team collaboration"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Excellence',
                description: 'We strive for excellence in everything we do, providing the highest quality service to our clients.',
                icon: '🏆'
              },
              {
                title: 'Integrity',
                description: 'We operate with honesty, transparency, and ethical standards in all our business dealings.',
                icon: '🤝'
              },
              {
                title: 'Innovation',
                description: 'We continuously seek new and better ways to serve our clients and improve our services.',
                icon: '💡'
              },
              {
                title: 'Collaboration',
                description: 'We work closely with our clients, building strong partnerships to achieve shared goals.',
                icon: '👥'
              },
              {
                title: 'Expertise',
                description: 'We maintain the highest levels of professional knowledge and skills in our respective fields.',
                icon: '🧠'
              },
              {
                title: 'Adaptability',
                description: 'We remain flexible and responsive to the changing needs of our clients and the business environment.',
                icon: '🔄'
              }
            ].map((value) => (
              <div key={value.title} className="glass-effect p-8 rounded-lg text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive business support across key areas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Forrest HR Services',
                description: 'ForrestHR provides bespoke outsourced HR support & solutions to small and medium sized businesses.',
                image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800',
                link: '/services#hr-consulting'
              },
              {
                title: 'Forrest Training Academy',
                description: 'Forrest Training Academy provides professional, bespoke training solutions for companies of all sizes.',
                image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
                link: '/services#employee-training'
              },
              {
                title: 'Forrest Health & Safety',
                description: 'The support you need to keep you, your team, your customers and your suppliers safe across a broad range of industries.',
                image: 'https://images.unsplash.com/photo-1581094794329-c8112c4e5190?auto=format&fit=crop&q=80&w=800',
                link: '/services#health-safety'
              },
              {
                title: 'Forrest Payroll',
                description: 'Our fully managed payroll services save small and medium-sized businesses time and money.',
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
                link: '/services#legal'
              }
            ].map((service) => (
              <div key={service.title} className="glass-effect rounded-lg overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link
                    to={service.link}
                    className="text-primary font-medium inline-flex items-center"
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

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our experienced consultants bring a wealth of knowledge to help support your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Emma Richardson',
                role: 'Managing Director',
                image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
                bio: 'Emma brings over 20 years of HR leadership experience, driving organizational excellence across multiple industries.',
                linkedin: 'https://linkedin.com',
                email: 'emma.richardson@forresthr.co.uk'
              },
              {
                name: 'Marcus Chen',
                role: 'Director of HR Strategy',
                image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
                bio: 'Marcus specializes in developing innovative HR strategies that drive business growth and employee engagement.',
                linkedin: 'https://linkedin.com',
                email: 'marcus.chen@forresthr.co.uk'
              },
              {
                name: 'Sophie Martinez',
                role: 'Head of Learning & Development',
                image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400',
                bio: 'Sophie leads our innovative L&D programs, focusing on future-ready workforce development.',
                linkedin: 'https://linkedin.com',
                email: 'sophie.martinez@forresthr.co.uk'
              },
              {
                name: 'Oliver Thompson',
                role: 'Head of Employment Law',
                image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400',
                bio: 'Oliver provides expert guidance on employment law and ensures compliance across all HR operations.',
                linkedin: 'https://linkedin.com',
                email: 'oliver.thompson@forresthr.co.uk'
              },
              {
                name: 'Amara Patel',
                role: 'Employee Relations Director',
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
                bio: 'Amara excels in building strong workplace relationships and developing effective HR policies.',
                linkedin: 'https://linkedin.com',
                email: 'amara.patel@forresthr.co.uk'
              },
              {
                name: 'James O\'Connor',
                role: 'Digital HR Transformation Lead',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
                bio: 'James leads our digital HR initiatives, implementing cutting-edge technology solutions.',
                linkedin: 'https://linkedin.com',
                email: 'james.oconnor@forresthr.co.uk'
              }
            ].map((member) => (
              <div key={member.name} className="glass-effect rounded-lg overflow-hidden">
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary mb-4">{member.role}</p>
                  <p className="text-gray-600 mb-6">{member.bio}</p>
                  <div className="flex gap-4">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#0077B5] text-white px-4 py-2 rounded flex items-center justify-center hover:bg-[#0077B5]/90 transition-colors"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="bg-accent text-primary px-4 py-2 rounded flex items-center justify-center hover:bg-accent/90 transition-colors"
                    >
                      Email {member.name.split(' ')[0]}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="bg-accent text-primary px-6 py-3 rounded-md text-lg font-medium hover:opacity-90 transition-all inline-flex items-center shadow-lg"
            >
              Contact Our Team
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Work With Us?
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
            <a
              href="https://www.theforrestgroup.co.uk/_files/ugd/11f0fe_3ed1e54d4aa84bf5ab288ee1223f827a.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 text-white border border-white/30 px-8 py-3 rounded-md text-lg font-medium hover:bg-white/20 transition-all inline-flex items-center shadow-lg"
            >
              Download Our Brochure
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export { About };