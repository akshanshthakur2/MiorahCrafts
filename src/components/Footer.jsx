import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Official WhatsApp SVG for brand consistency
  const WhatsAppIcon = ({ size = 16 }) => (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.55 4.197 1.592 6.015L0 24l6.149-1.613a11.773 11.773 0 005.912 1.594h.005c6.634 0 12.048-5.414 12.048-12.05a11.75 11.75 0 00-3.489-8.492z"/>
    </svg>
  );

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

          {/* RIGHT: Workshop Info & Newsletter */}
          <div className="w-full md:w-96 text-right md:text-right flex flex-col items-end">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-900 mb-2">
              The Workshop
            </p>
            <p className="text-stone-500 text-[11px] leading-relaxed mb-6 max-w-[280px]">
              Shaping organic forms by hand from the earth of India. <br/> 
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
              <a 
                href={import.meta.env.VITE_INSTAGRAM_URL || "#"} 
                target="_blank" 
                rel="noreferrer" 
                className="text-stone-400 hover:text-stone-900 transition-transform hover:-translate-y-1"
              >
                <Instagram size={16} />
              </a>
              <a 
                href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`} 
                target="_blank" 
                rel="noreferrer" 
                className="text-stone-400 hover:text-stone-900 transition-transform hover:-translate-y-1"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          <div className="flex gap-6 text-[9px] font-bold uppercase tracking-widest text-stone-300">
            <span>Handmade in India</span>
            <span className="hidden md:inline">•</span>
            <span>All Rights Reserved</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;