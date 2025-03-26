import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ChevronRight } from 'lucide-react';

const Breathe = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Exclusive Breathe HR Offer | Forrest Group" 
        description="Sign up between 1st March – 31st May and receive 20% off Breathe HR accounts. Streamline your HR with Breathe." 
      />
      
      {/* Hero Section with Teal Background */}
      <section className="py-16 bg-[#004952] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Breathe Logo */}
            <div className="mb-8">
              <img 
                src="https://ik.imagekit.io/boostkit/Forrest%20HR/breathe-logo-white.png" 
                alt="Breathe - Accredited Partner" 
                className="h-16" 
              />
              <p className="text-sm mt-2">Accredited Partner</p>
            </div>
            
            {/* Exclusive Offer Banner */}
            <div className="bg-[#1E88E5] text-white py-3 px-8 rounded-full mb-8">
              <h2 className="text-xl font-bold">EXCLUSIVE OFFER</h2>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Streamline your HR
              <br />
              <span className="text-5xl md:text-7xl">with Breathe</span>
            </h1>
            
            {/* Sign up period */}
            <div className="mb-12">
              <p className="text-xl">
                Sign up between 1st March – 31st May
                <br />
                and receive:
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Offer Details Section */}
      <section className="py-16 bg-[#004952] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
            {/* 20% off Annual */}
            <div className="bg-[#1E88E5] rounded-full p-8 w-64 h-64 flex flex-col items-center justify-center text-center">
              <h3 className="text-4xl font-bold mb-2">20% off</h3>
              <p className="text-lg">
                for a full year when you opt for an annual account.
              </p>
            </div>
            
            {/* 20% off Monthly */}
            <div className="bg-[#1E88E5] rounded-full p-8 w-64 h-64 flex flex-col items-center justify-center text-center">
              <h3 className="text-4xl font-bold mb-2">20% off</h3>
              <p className="text-lg">
                for 3 months when you choose a monthly Breathe HR account.
              </p>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="mt-16 text-center">
            <Link 
              to="/contact" 
              className="bg-white text-[#004952] px-8 py-4 rounded-md text-xl font-medium hover:bg-opacity-90 transition-all inline-flex items-center shadow-lg"
            >
              Contact Us To Get Started
            </Link>
            <p className="mt-4 text-sm opacity-80">
              *Offer valid for new customers only. Terms and conditions apply.
            </p>
          </div>
        </div>
        
        {/* Curved Bottom Edge - Removing as requested */}
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-6">Why Choose Breathe HR?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Breathe HR software helps you save time, reduce admin, and improve how you manage your people.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold text-primary mb-3">Streamline HR Processes</h3>
              <p className="text-gray-600">
                Automate routine tasks, reduce paperwork, and free up time to focus on what matters most - your people.
              </p>
            </div>
            
            {/* Benefit 2 */}
            <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold text-primary mb-3">Centralize Employee Data</h3>
              <p className="text-gray-600">
                Keep all your employee information in one secure, easily accessible place with powerful reporting tools.
              </p>
            </div>
            
            {/* Benefit 3 */}
            <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold text-primary mb-3">Improve Compliance</h3>
              <p className="text-gray-600">
                Stay compliant with current legislation and maintain accurate records for all your HR processes.
              </p>
            </div>
          </div>
          
          {/* Added button to navigate to Breathe page */}
          <div className="text-center mt-12">
            <Link
              to="/breathe"
              className="bg-white text-primary border border-primary px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-50 transition-all inline-flex items-center shadow-sm"
            >
              Learn More About Breathe HR
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          {/* Forrest Group Logo */}
          <div className="mt-16 text-center">
            <img 
              src="https://ik.imagekit.io/boostkit/Forrest%20HR/forrest-group-logo.png" 
              alt="Forrest Group" 
              className="h-20 mx-auto" 
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export { Breathe };