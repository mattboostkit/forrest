import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

export function NotFound() {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would redirect to search results
    window.location.href = `/blog?search=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <>
      <SEO 
        title="Page Not Found | Forrest HR" 
        description="The page you are looking for doesn't exist. Return to the Forrest HR homepage."
      />
      
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-lg w-full text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
              The page you are looking for might have been removed, had its name changed, 
              or is temporarily unavailable.
            </p>
          </div>
          
          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex w-full max-w-md mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search our site..."
                aria-label="Search our site"
                className="flex-grow px-4 py-3 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button 
                type="submit"
                aria-label="Submit search"
                className="bg-primary text-white px-4 py-3 rounded-r-md hover:bg-primary-dark transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors"
              aria-label="Return to homepage"
            >
              <Home className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 bg-white text-primary border border-primary px-6 py-3 rounded-md hover:bg-gray-50 transition-colors"
              aria-label="Contact us for help"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Contact Support</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
