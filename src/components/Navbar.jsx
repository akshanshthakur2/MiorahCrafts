import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Env variables
  const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;
  const INSTAGRAM_URL = import.meta.env.VITE_INSTAGRAM_URL;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank");
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Real WhatsApp SVG Icon
  const WhatsAppIcon = ({ size = 20 }) => (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.55 4.197 1.592 6.015L0 24l6.149-1.613a11.773 11.773 0 005.912 1.594h.005c6.634 0 12.048-5.414 12.048-12.05a11.75 11.75 0 00-3.489-8.492z"/>
    </svg>
  );

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-300 px-6 py-4 ${
      scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-serif font-bold italic tracking-tighter text-stone-900 relative z-[110]">
          Miorah<span className="text-[#b91c1c]">.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors hover:text-[#b91c1c] ${
                location.pathname === link.path ? 'text-[#b91c1c]' : 'text-stone-500'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-5 border-l border-stone-200 pl-10">
            <a 
              href={INSTAGRAM_URL} 
              target="_blank" 
              rel="noreferrer" 
              className="text-stone-400 hover:text-stone-900 transition-colors"
            >
              <Instagram size={18} />
            </a>
            <button 
              onClick={handleWhatsAppClick}
              className="text-stone-400 hover:text-[#25D366] transition-colors"
              aria-label="Chat on WhatsApp"
            >
              <WhatsAppIcon size={18} />
            </button>
            <button 
              onClick={handleWhatsAppClick}
              className="flex items-center gap-2 bg-stone-900 text-white px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#b91c1c] transition-all"
            >
              <span>Shop</span>
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-5 relative z-[110]">
          <button onClick={handleWhatsAppClick} className="text-stone-900">
            <WhatsAppIcon size={20} />
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-stone-900"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-white z-[105] p-6 md:hidden flex flex-col pt-32"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-4xl font-serif ${
                    location.pathname === link.path ? 'text-[#b91c1c]' : 'text-stone-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="mt-10 pt-10 border-t border-stone-100 flex flex-col gap-6">
                 <div className="flex gap-6">
                    <a href={INSTAGRAM_URL} className="flex items-center gap-2 text-stone-400 font-bold uppercase text-[10px] tracking-widest">
                       <Instagram size={18} /> Instagram
                    </a>
                    <button onClick={handleWhatsAppClick} className="flex items-center gap-2 text-stone-400 font-bold uppercase text-[10px] tracking-widest">
                       <WhatsAppIcon size={18} /> WhatsApp
                    </button>
                 </div>
                 <button 
                   onClick={handleWhatsAppClick}
                   className="w-full flex justify-center items-center gap-3 bg-stone-900 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl active:scale-95 transition-transform"
                 >
                   Open Shop
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;