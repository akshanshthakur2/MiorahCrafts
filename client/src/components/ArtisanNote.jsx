import React from "react";
import { motion } from "framer-motion";

const ArtisanNote = () => {
  return (
    <section className="py-20 md:py-30 bg-[#fbfbfb] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-20">
          
          {/* Left Block: Bold Branding Title */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-10 bg-[#b91c1c]" />
              <span className="text-[#b91c1c] text-[10px] font-black uppercase tracking-[0.4em]">
                Origin Note
              </span>
            </div>
            
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif text-stone-900 leading-[0.85] tracking-tighter">
              Crafted <br /> 
              with <span className="text-[#b91c1c] italic">Soul.</span>
            </h2>
          </motion.div>

          {/* Right Block: Simplified Philosophy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 lg:pt-16"
          >
            <div className="space-y-8 max-w-lg">
              <p className="text-stone-600 text-xl md:text-2xl leading-relaxed font-serif italic border-l-2 border-stone-200 pl-6">
                "I believe in the beauty of things made slowly. Every item is shaped by hand in my home workshop in India."
              </p>
              
              <div className="space-y-6">
                <p className="text-stone-400 text-base md:text-lg leading-relaxed font-light">
                  Ensuring that no two pieces are ever identical, we embrace the 
                  perfect imperfections that only human hands can create. 
                  This is 100% homemade art, designed for the conscious collector.
                </p>

                {/* Simplified Bottom Badge */}
                <div className="pt-6 flex items-center gap-4 border-t border-stone-100">
                  <div className="w-2 h-2 bg-[#b91c1c] rounded-full" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-900">
                    100% Homemade • India • Artisanal
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArtisanNote;