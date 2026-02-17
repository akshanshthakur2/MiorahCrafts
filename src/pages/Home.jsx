import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ArtisanNote from '../components/ArtisanNote';
import { products } from '../data/products';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  // Explicitly defined IDs
  const featuredIds = [4, 2, 5, 6, 8, 9];
  
  const featuredProducts = featuredIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);

  return (
    <main className="bg-[#fbfbfb] min-h-screen w-full">
      <Hero />
      <ArtisanNote />

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-32">
        {/* CENTERED HEADER */}
        <header className="flex flex-col items-center text-center mb-20 md:mb-28">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center space-y-4"
          >
            <div className="flex items-center gap-3 justify-center">
              <MapPin size={14} className="text-[#b91c1c]" />
              <span className="text-[#b91c1c] text-[10px] font-black uppercase tracking-[0.4em]">
                The India Archive
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-serif text-stone-900 tracking-tighter leading-none">
              Featured <br />
              <span className="italic text-stone-400 font-light">Crafts.</span>
            </h2>
            <div className="h-[1px] w-20 bg-stone-200 mt-8" />
          </motion.div>
        </header>

        {/* 3-COLUMN GRID FIX: 
            Changed 'xl:grid-cols-4' to 'lg:grid-cols-3' for a wider 3-piece row.
        */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {featuredProducts.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              onClick={() => navigate(`/product/${item.id}`)}
              className="flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-stone-100 mb-8 shadow-sm border border-stone-100 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute bottom-6 left-6 right-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl flex justify-between items-center shadow-xl">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#b91c1c]">View Detail</span>
                    <ArrowRight size={14} className="text-[#b91c1c]" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col flex-grow px-2">
                <h3 className="text-3xl font-serif text-stone-900 leading-tight group-hover:text-[#b91c1c] transition-colors">
                  {item.name}
                </h3>
                <p className="text-[12px] font-medium text-stone-400 uppercase tracking-[0.2em] italic mt-3">
                  {item.size}
                </p>
                
                <div className="mt-8 pt-6 border-t border-stone-100 flex justify-between items-center">
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.3em]">
                    {item.category}
                  </span>
                  <span className="text-3xl font-black text-stone-900 tracking-tighter">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore Button */}
        <div className="mt-32 flex justify-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/gallery')}
            className="group flex items-center gap-8 px-20 py-7 bg-stone-900 text-white rounded-full text-[11px] font-black uppercase tracking-[0.5em] shadow-2xl hover:bg-[#b91c1c] transition-all duration-500"
          >
            Explore Full Archive
            <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform duration-500" />
          </motion.button>
        </div>
      </section>
    </main>
  );
};

export default Home;