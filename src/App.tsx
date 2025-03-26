import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Services } from './pages/Services';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Breathe } from './pages/Breathe';
import { NotFound } from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import GoogleAnalytics from './components/GoogleAnalytics';

function App() {
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID as string;
  
  return (
    <Router>
      <ScrollToTop />
      {gaId && <GoogleAnalytics measurementId={gaId} />}
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/breathe" element={<Breathe />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
