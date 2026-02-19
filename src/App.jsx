import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Layout & UI
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails'; // Import the new page
import Admin from './pages/Admin';

// Helper to reset scroll position on every page change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#fafaf9]">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            
            {/* Dynamic Route: The ':id' acts as a variable */}
            <Route path="/product/:id" element={<ProductDetails />} />
            
            {/* Fallback to Home if route doesn't exist */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;