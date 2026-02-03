import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Home, Leaf, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-20 bg-[#fbfbfb] min-h-screen px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Hero Section - The Personal Touch */}
        <header className="mb-24 text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#b91c1c] font-black tracking-[0.4em] uppercase text-[10px] mb-6 block"
          >
            Our Story
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-serif text-stone-900 mb-8 tracking-tighter leading-[0.9]"
          >
            Made by hand. <br />
            <span className="italic text-stone-400 font-light">In my home.</span>
          </motion.h1>
          <div className="h-[1px] w-20 bg-stone-200 mx-auto mt-12" />
        </header>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[3rem] overflow-hidden shadow-2xl shadow-stone-200/50"
          >
            <img 
              src="https://images.unsplash.com/photo-1565191999001-551c187427bb?q=80&w=800" 
              alt="Handmade process" 
              className="w-full h-auto"
            />
          </motion.div>
          
          <div className="space-y-8">
            <h2 className="text-4xl font-serif text-stone-900 leading-tight">
              A journey from <br/> <span className="text-[#b91c1c] italic">Lalitpur</span> to your living space.
            </h2>
            <div className="space-y-6 text-stone-500 text-lg leading-relaxed">
              <p>
                Miorah Crafts started as a simple passion project in my home workshop in Lalitpur. What began as an exploration of clay and texture has grown into a collection of pieces designed to bring warmth and soul into modern homes.
              </p>
              <p>
                I don't use assembly lines or industrial machinery. Every curve is shaped by my hands, and every imperfection is a deliberate celebration of the organic process.
              </p>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            {
              icon: <Home className="text-[#b91c1c]" />,
              title: "Homemade",
              desc: "Crafted entirely within a home environment in Lalitpur, ensuring every piece receives personal attention."
            },
            {
              icon: <Heart className="text-[#b91c1c]" />,
              title: "Heartfelt",
              desc: "I create objects that I would want in my own space—pieces that carry a story and a pulse."
            },
            {
              icon: <Leaf className="text-[#b91c1c]" />,
              title: "Sustainable",
              desc: "Using locally sourced materials and eco-friendly methods to minimize our footprint on the earth."
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-white rounded-[2.5rem] border border-stone-100 shadow-sm"
            >
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-xl font-serif text-stone-900 mb-4">{item.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-stone-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-500 via-transparent to-transparent" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif mb-8 tracking-tight">
              Ready to explore <br/> the <span className="italic font-light">Archive?</span>
            </h2>
            <button 
              onClick={() => navigate('/gallery')}
              className="inline-flex items-center gap-3 px-10 py-4 bg-white text-stone-900 rounded-full font-bold hover:bg-[#b91c1c] hover:text-white transition-all uppercase text-[10px] tracking-widest shadow-xl"
            >
              View Collection
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;