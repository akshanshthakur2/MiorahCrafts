import React from 'react';
import { motion } from 'framer-motion';

const ArtisanNote = () => {
  return (
    <section className="py-22 bg-[#fbfbfb] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Homemade Visual */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-stone-100 bg-white p-4">
            <img 
              src="https://i.pinimg.com/736x/05/5b/7a/055b7ae236604da8ebb52f94e02ae809.jpg" 
              alt="Handmade process in Lalitpur" 
              className="w-full h-full rounded-[2.5rem] object-cover"
            />
          </div>
          
          {/* Floating Label */}
          <div className="absolute -bottom-6 -right-6 bg-stone-900 text-white p-8 rounded-[2rem] hidden md:block shadow-xl">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60 mb-2">Location</p>
            <p className="font-serif italic text-xl">Lalitpur, Nepal</p>
          </div>
        </motion.div>

        {/* Right Side: The Personal Story */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-[#b91c1c]" />
            <span className="text-[#b91c1c] text-[10px] font-black uppercase tracking-[0.4em]">Personal Atelier</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-serif text-stone-900 leading-none tracking-tighter">
            Handcrafted <br /> with <span className="text-[#b91c1c] italic">Patience.</span>
          </h2>
          
          <div className="space-y-6 text-stone-500 text-lg leading-relaxed max-w-md">
            <p>
              I believe in the beauty of things made slowly. Every item in this collection is shaped by hand in my home workshop, ensuring that no two pieces are ever identical.
            </p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-stone-400">
              Made in Lalitpur • 100% Homemade • Sustainable
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ArtisanNote;