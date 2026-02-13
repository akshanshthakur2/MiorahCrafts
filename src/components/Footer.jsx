import React from 'react';
import { Instagram, MessageCircle, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-stone-100 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Split Layout */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          
          {/* LEFT: Brand & Navigation */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold tracking-tighter text-stone-900">
              Miorah<span className="text-[#b91c1c]">.</span>
            </h2>
            <nav className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
              <a href="/gallery" className="hover:text-[#b91c1c] transition-colors">Archive</a>
              <a href="/about" className="hover:text-[#b91c1c] transition-colors">Process</a>
              <a href="/contact" className="hover:text-[#b91c1c] transition-colors">Inquiry</a>
            </nav>
          </div>

          {/* RIGHT: Personalized Home Workshop Info & Newsletter */}
          <div className="w-full md:w-96 text-right md:text-right flex flex-col items-end">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-900 mb-2">
              The Workshop
            </p>
            <p className="text-stone-500 text-[11px] leading-relaxed mb-6 max-w-[280px]">
              Shaping organic forms by hand from the earth of Lalitpur. <br/> 
              Available for personal commissions and custom handmade gifts.
            </p>
            
            <div className="w-full relative group border-b border-stone-200">
              <input 
                type="email" 
                placeholder="JOIN THE CIRCLE" 
                className="w-full bg-transparent py-2 text-[10px] tracking-widest outline-none focus:placeholder-transparent uppercase text-right"
              />
              <button className="absolute left-0 bottom-2 text-stone-400 hover:text-[#b91c1c]">
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM: Minimal Bar */}
        <div className="pt-8 border-t border-stone-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-8">
            <p className="text-stone-300 text-[9px] font-bold uppercase tracking-[0.3em]">
              © {currentYear} Miorah
            </p>
            <div className="flex gap-4 items-center">
              <a href={import.meta.env.VITE_INSTAGRAM_URL || "#"} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-stone-900 transition-transform hover:-translate-y-1">
                <Instagram size={16} />
              </a>
              <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-stone-900 transition-transform hover:-translate-y-1">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          <div className="flex gap-6 text-[9px] font-bold uppercase tracking-widest text-stone-300">
            <span>Handmade in Lalitpur</span>
            <span className="hidden md:inline">•</span>
            <span>All Rights Reserved</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;