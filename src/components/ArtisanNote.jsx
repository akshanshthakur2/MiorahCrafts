import React from "react";
import { motion } from "framer-motion";

const ArtisanNote = () => {
  return (
    <section className="py-22 bg-[#fbfbfb] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Homemade Visual Placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Floating Label - Updated to India */}
          <div className="absolute -bottom-6 -right-6 bg-stone-900 text-white p-8 rounded-[2rem] hidden md:block shadow-2xl">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60 mb-2">
              Origin
            </p>
            <p className="font-serif italic text-xl">Handmade in India</p>
          </div>
        </motion.div>

        {/* Right Side: The Personal Story */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="space-y-10"
        >
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-[#b91c1c]" />
            <span className="text-[#b91c1c] text-[10px] font-black uppercase tracking-[0.4em]">
              Homemade Products
            </span>
          </div>

          <h2 className="text-5xl md:text-8xl font-serif text-stone-900 leading-[0.9] tracking-tighter">
            Handcrafted <br /> with{" "}
            <span className="text-[#b91c1c] italic">Patience.</span>
          </h2>

          <div className="space-y-8 text-stone-500 text-lg md:text-xl leading-relaxed max-w-md font-light">
            <p>
              I believe in the beauty of things made slowly. Every item in this
              collection is shaped by hand in my home workshop in India,
              ensuring that no two pieces are ever identical.
            </p>

            {/* Updated Secondary Label */}
            <div className="pt-6 border-t border-stone-100">
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-stone-400">
                Made in India • 100% Homemade • Artisanal
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArtisanNote;
