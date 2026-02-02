import React from 'react';
import { Instagram, Twitter, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-stone-200 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-serif font-bold italic tracking-tight mb-4">
              Miorah.
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed">
              Crafting timeless pieces that bring the soul of artisanal work into your modern living space.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-stone-900 mb-4 uppercase tracking-widest text-xs">Shop</h4>
            <ul className="space-y-2 text-sm text-stone-600">
              <li><a href="/" className="hover:text-emerald-700 transition-colors">All Collections</a></li>
              <li><a href="/gallery" className="hover:text-emerald-700 transition-colors">New Arrivals</a></li>
              <li><a href="/about" className="hover:text-emerald-700 transition-colors">Our Process</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-stone-900 mb-4 uppercase tracking-widest text-xs">Support</h4>
            <ul className="space-y-2 text-sm text-stone-600">
              <li><a href="/contact" className="hover:text-emerald-700 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-emerald-700 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-emerald-700 transition-colors">WhatsApp FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-stone-900 mb-4 uppercase tracking-widest text-xs">Newsletter</h4>
            <p className="text-sm text-stone-500 mb-4">Join for early access to new drops.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-stone-100 border-none rounded-full px-4 py-2 text-sm w-full focus:ring-1 focus:ring-emerald-500 outline-none"
              />
              <button className="bg-stone-900 text-white p-2 rounded-full hover:bg-stone-700 transition-all">
                <Mail size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-400 text-xs">
            © {currentYear} Miorah Crafts. Designed for the modern home.
          </p>
          
          <div className="flex gap-6 text-stone-400">
            <a href="#" className="hover:text-emerald-600 transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-emerald-600 transition-colors"><Twitter size={20} /></a>
            <div className="flex items-center gap-1 text-xs">
              <MapPin size={14} />
              <span>Handcrafted in [City Name]</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;