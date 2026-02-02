import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-300 px-6 py-4 ${
      scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo - Kept exactly as you had it */}
        <Link to="/" className="text-2xl font-serif font-bold italic tracking-tighter text-stone-900 relative z-[110]">
          Miorah<span className="text-emerald-600">.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-emerald-600 ${
                location.pathname === link.path ? 'text-emerald-700' : 'text-stone-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-6">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-stone-600 hover:text-stone-900 transition-colors">
              <Instagram size={20} />
            </a>
            <button className="flex items-center gap-2 bg-stone-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-emerald-800 transition-all">
              <MessageCircle size={16} />
              <span>WhatsApp Shop</span>
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4 relative z-[110]">
          <a href="https://instagram.com" className="text-stone-900">
            <Instagram size={22} />
          </a>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-stone-900 p-1"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-white z-[105] p-6 md:hidden flex flex-col pt-24 shadow-xl"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-serif ${
                    location.pathname === link.path ? 'text-emerald-700' : 'text-stone-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-stone-100 mt-4" />
              <button className="w-full flex justify-center items-center gap-3 bg-stone-900 text-white py-4 rounded-2xl font-bold mt-4 shadow-lg active:scale-95 transition-transform">
                <MessageCircle size={20} />
                Chat with Weaver
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;