import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  type?: string;
  name?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Expert HR Solutions | Forrest HR',
  description = 'Transform your workplace with Forrest HR\'s expert consulting, training, and compliance solutions. UK\'s trusted HR partner since 2010.',
  type = 'website',
  name = 'Forrest HR'
}) => {
  const { pathname } = useLocation();
  const baseUrl = 'https://forresthr.co.uk'; // Replace with your actual domain
  const currentUrl = `${baseUrl}${pathname}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Forrest HR',
    description: 'Expert HR consulting and solutions provider in the UK',
    url: baseUrl,
    logo: 'https://ik.imagekit.io/boostkit/Forrest%20HR/New_Logo.svg?updatedAt=1739819367807',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Business Street',
      addressLocality: 'London',
      addressCountry: 'UK'
    },
    telephone: '+44 20 1234 5678',
    email: 'info@forresthr.co.uk',
    priceRange: '££',
    openingHours: 'Mo-Fr 09:00-17:30',
    sameAs: [
      'https://www.linkedin.com/company/forresthr',
      'https://twitter.com/forresthr',
      'https://facebook.com/forresthr'
    ]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph */}
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://ik.imagekit.io/boostkit/Forrest%20HR/New_Logo.svg?updatedAt=1739819367807" />
      <meta property="og:site_name" content={name} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://ik.imagekit.io/boostkit/Forrest%20HR/New_Logo.svg?updatedAt=1739819367807" />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default SEO;