import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: Record<string, any>
    ) => void;
  }
}

interface GoogleAnalyticsProps {
  measurementId: string;
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ measurementId }) => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Analytics
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}', { 'send_page_view': false });
    `;
    
    document.head.appendChild(script1);
    document.head.appendChild(script2);

    return () => {
      // Clean up
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, [measurementId]);

  // Track page views
  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', measurementId, {
        page_path: location.pathname + location.search
      });
    }
  }, [location, measurementId]);

  return null; // This component doesn't render anything
};

// Custom hook for tracking events
export const useGoogleAnalytics = () => {
  const trackEvent = (
    eventName: string,
    eventParams?: Record<string, any>
  ) => {
    if (window.gtag) {
      window.gtag('event', eventName, eventParams);
    }
  };

  return { trackEvent };
};

export default GoogleAnalytics;
