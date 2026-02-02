import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Earth } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-32 pb-20 bg-[#fafaf9] min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=800" 
                alt="Artisan at work" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-600/10 rounded-full blur-3xl -z-10" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-emerald-700 font-bold tracking-[0.3em] text-[10px] uppercase">Our Philosophy</span>
            <h1 className="text-5xl font-serif text-stone-900 leading-tight">Crafting with <br/>Patience & Soul.</h1>
            <p className="text-stone-600 leading-relaxed text-lg">
              Miorah was born out of a desire to return to the slow, intentional beauty of handmade objects. In a world of mass production, we believe in the "perfect imperfections" that only human hands can create.
            </p>
            <p className="text-stone-500 italic">
              "Every piece tells a story of the earth it came from and the hands that shaped it."
            </p>
          </motion.div>
        </section>

        {/* Values Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 py-20 border-t border-stone-200">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Earth size={20} className="text-emerald-700" />
            </div>
            <h3 className="text-xl font-serif text-stone-900">Earth First</h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              We source our raw materials locally and sustainably, ensuring that our footprint is as light as our designs.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Sparkles size={20} className="text-emerald-700" />
            </div>
            <h3 className="text-xl font-serif text-stone-900">Timeless Design</h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              Our aesthetic blends ancient techniques with modern minimalism to create pieces that never go out of style.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Heart size={20} className="text-emerald-700" />
            </div>
            <h3 className="text-xl font-serif text-stone-900">Made for Living</h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              Every item is crafted to be used, held, and cherished in the quiet moments of your daily life.
            </p>
          </div>
        </section>

        {/* Studio Invite */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-12 bg-stone-900 rounded-3xl text-center text-white"
        >
          <h2 className="text-3xl font-serif mb-6">Have a custom project in mind?</h2>
          <p className="text-stone-400 mb-8 max-w-lg mx-auto">
            We love collaborating on bespoke pieces for homes, studios, and galleries. Let's create something together.
          </p>
          <button 
            onClick={() => window.location.href = '/contact'}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full font-bold transition-all"
          >
            Get in Touch
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default About;