import React from 'react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { Instagram, Expand } from 'lucide-react';

const Gallery = () => {
  // We can use the product images, or a separate gallery array if you have one.
  return (
    <div className="pt-32 pb-20 bg-[#fafaf9] min-h-screen px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Gallery Header */}
        <header className="mb-16 border-l-2 border-emerald-600 pl-8">
          <h1 className="text-5xl font-serif text-stone-900 mb-4">The Archive</h1>
          <p className="text-stone-500 max-w-md text-sm leading-relaxed tracking-wide">
            A curated collection of past works, studio moments, and the organic textures that inspire our daily craft.
          </p>
        </header>

        {/* Dense Grid - 4 columns for that 'compact' look */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-stone-200"
            >
              {/* Image with slow zoom on hover */}
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
              />

              {/* Minimalist Hover Overlay */}
              <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <p className="text-white/70 text-[10px] uppercase tracking-[0.3em] mb-1">
                  {item.category}
                </p>
                <h3 className="text-white text-sm font-serif">{item.name}</h3>
                <div className="mt-4 w-8 h-[1px] bg-emerald-500 group-hover:w-16 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Link to Socials */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 text-center border-t border-stone-200 pt-16"
        >
          <div className="inline-flex flex-col items-center">
            <Instagram className="text-stone-400 mb-4" size={24} />
            <h2 className="text-2xl font-serif text-stone-900 mb-2">Follow our process</h2>
            <p className="text-stone-500 text-sm mb-8">Get a daily look behind the scenes at our studio.</p>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="px-10 py-3 border border-stone-900 text-stone-900 rounded-full font-bold hover:bg-stone-900 hover:text-white transition-all uppercase text-xs tracking-widest"
            >
              @miorah_crafts
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Gallery;