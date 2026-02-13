import React from 'react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { Instagram, ArrowRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-20 bg-[#fbfbfb] min-h-screen px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-20 flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-4">
            <MapPin size={14} className="text-[#b91c1c]" />
            <span className="text-[#b91c1c] text-[10px] font-black uppercase tracking-[0.4em]">
              Homemade Archive
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-stone-900 tracking-tight">
            The <span className="italic text-stone-400 font-light">Collection.</span>
          </h1>
          <p className="text-stone-400 text-[10px] uppercase tracking-[0.2em] mt-4 font-bold">
            Handcrafted in India
          </p>
          <div className="h-[1px] w-12 bg-stone-200 mt-8" />
        </header>

        {/* Masonry-Style Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-10">
          {products.map((item, index) => (
            <motion.div
              key={item.id}
              /* UPDATED: Changed from whileInView to animate for immediate loading */
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.08, // Staggered entrance for a premium feel
                duration: 0.5,
                ease: "easeOut"
              }}
              onClick={() => navigate(`/product/${item.id}`)}
              className="break-inside-avoid group cursor-pointer"
            >
              {/* Card Container */}
              <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-stone-100 transition-all duration-500 hover:shadow-2xl hover:shadow-stone-200/60">
                <div className="relative overflow-hidden rounded-[1.5rem] bg-stone-50">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager" /* Ensures images prioritize loading */
                  />
                  
                  {/* View Detail Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 md:translate-y-4 opacity-100 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl flex justify-between items-center shadow-xl">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#b91c1c]">View Detail</span>
                      <ArrowRight size={14} className="text-[#b91c1c]" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 px-2 pb-2">
                  <div className="space-y-1">
                    <h3 className="text-xl md:text-2xl font-serif text-stone-900 leading-tight group-hover:text-[#b91c1c] transition-colors">
                      {item.name}
                    </h3>
                    
                    <p className="text-[11px] font-medium text-stone-400 uppercase tracking-widest italic">
                      Dimensions: {item.size}
                    </p>
                    
                    <div className="flex justify-between items-end pt-3">
                      <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">
                        {item.category}
                      </p>
                      <span className="text-xl md:text-2xl font-black text-stone-900">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Social Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 text-center"
        >
          <div className="inline-flex flex-col items-center p-12 bg-white rounded-[3rem] border border-stone-100 shadow-sm w-full max-w-2xl mx-auto">
            <Instagram className="text-[#b91c1c] mb-6" size={24} />
            <h2 className="text-3xl font-serif text-stone-900 mb-4 tracking-tight">Follow the process</h2>
            <p className="text-stone-500 text-sm mb-8">Handmade in India • 2026</p>
            <a 
              href={import.meta.env.VITE_INSTAGRAM_URL || "#"} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-3 px-8 py-3 bg-stone-900 text-white rounded-full font-bold hover:bg-[#b91c1c] transition-all uppercase text-[10px] tracking-widest"
            >
              <span>@miorahcrafts</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Gallery;