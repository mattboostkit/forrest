import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const LOGO_URL = 'https://ik.imagekit.io/boostkit/Forrest%20HR/New_Logo.svg?updatedAt=1739819367807';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Tools', href: '/tools' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="glass-effect fixed w-full z-50 shadow-lg py-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img 
                src={LOGO_URL} 
                alt="Forrest HR" 
                className="h-16 w-auto"
              />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  isActive(item.href)
                    ? 'gradient-text border-secondary'
                    : 'text-gray-600 hover:text-primary border-transparent'
                } inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}
            <button className="bg-accent text-white px-6 py-3 rounded-md text-base font-medium hover:bg-accent/90 transition-all duration-200 shadow-lg">
              Book A Free HR Audit
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  isActive(item.href)
                    ? 'bg-primary-light border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                } block pl-3 pr-4 py-2 border-l-4 text-lg font-medium`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              <button className="w-full bg-accent text-white px-4 py-2 rounded-md text-base font-medium hover:bg-accent/90 transition-all duration-200">
                Book A Free HR Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
