import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Terms of Service</h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            Our commitment to you and what we expect in return
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 -mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-effect p-8 rounded-lg prose prose-lg max-w-none">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using Forrest HR's services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>

            <h2>2. Description of Services</h2>
            <p>
              Forrest HR provides HR consulting, training, and compliance services to businesses in the UK. Our services include but are not limited to:
            </p>
            <ul>
              <li>HR Consulting</li>
              <li>Employee Training</li>
              <li>Health & Safety Compliance</li>
              <li>Legal Advisory Services</li>
            </ul>

            <h2>3. Professional Services Agreement</h2>
            <p>
              All consulting services are provided under a Professional Services Agreement that will be provided separately and must be signed before work commences.
            </p>

            <h2>4. Fees and Payment</h2>
            <p>
              Fees for our services will be outlined in your service agreement. Payment terms are strictly 30 days from invoice date unless otherwise agreed in writing.
            </p>

            <h2>5. Confidentiality</h2>
            <p>
              We maintain strict confidentiality of all client information and expect the same regarding our proprietary information and materials.
            </p>

            <h2>6. Intellectual Property</h2>
            <p>
              All materials, methodologies, and deliverables provided by Forrest HR remain our intellectual property unless explicitly stated otherwise in writing.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              Our liability is limited to the fees paid for the specific services in question. We are not liable for indirect, consequential, or special damages.
            </p>

            <h2>8. Termination</h2>
            <p>
              Either party may terminate services with 30 days written notice unless otherwise specified in your service agreement.
            </p>

            <h2>9. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of the United Kingdom.
            </p>

            <h2>10. Contact Information</h2>
            <p>
              For any questions regarding these terms, please contact us at:
              <br />
              Email: legal@forresthr.co.uk
              <br />
              Address: 123 Business Street, London, UK
            </p>

            <p className="text-sm text-gray-500 mt-8">
              Last updated: March 15, 2024
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export { Terms };