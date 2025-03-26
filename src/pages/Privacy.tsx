import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            How we protect and handle your data
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 -mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-effect p-8 rounded-lg prose prose-lg max-w-none">
            <h2>Introduction</h2>
            <p>
              Forrest HR ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our services.
            </p>

            <h2>Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li>Name and contact information</li>
              <li>Company details</li>
              <li>Employment information</li>
              <li>Communication preferences</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and improve our services</li>
              <li>Communicate with you about our services</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.
            </p>

            <h2>Your Rights</h2>
            <p>Under applicable data protection laws, you have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
            </ul>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              Email: privacy@forresthr.co.uk
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

export { Privacy };
