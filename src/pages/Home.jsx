import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ArtisanNote from '../components/ArtisanNote';
import { products } from '../data/products';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const featuredIds = [4, 2, 5, 6, 8, 9, 11];
  
  const featuredProducts = featuredIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);

  return (
    <main className="bg-[#fbfbfb] min-h-screen">
      <Hero />
      <ArtisanNote />

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin size={14} className="text-[#b91c1c]" />
              <span className="text-[#b91c1c] text-[10px] font-black uppercase tracking-[0.4em]">
                The India Archive
              </span>
            </div>
            <h2 className="text-5xl md:text-8xl font-serif text-stone-900 tracking-tighter leading-[1.1] md:leading-[0.9]">
              Featured <br />
              <span className="italic text-stone-400 font-light">Crafts.</span>
            </h2>
          </div>
          <button 
            onClick={() => navigate('/gallery')}
            className="group hidden md:flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-stone-900 hover:text-[#b91c1c] transition-colors w-fit"
          >
            Explore All Pieces
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
          {featuredProducts.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/product/${item.id}`)}
              className="group cursor-pointer flex flex-col h-full"
            >
              {/* Product Card Content Remains the Same */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-stone-100 mb-8 shadow-sm border border-stone-100 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-stone-200/60">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 md:translate-y-4 opacity-100 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500">
                  <div className="bg-white/95 backdrop-blur-md p-4 md:p-5 rounded-2xl flex justify-between items-center shadow-xl">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#b91c1c]">View Detail</span>
                    <ArrowRight size={14} className="text-[#b91c1c]" />
                  </div>
                </div>
              </div>

              <div className="px-2 space-y-3 mt-auto">
                <div className="space-y-1">
                  <h3 className="text-2xl md:text-3xl font-serif text-stone-900 leading-tight group-hover:text-[#b91c1c] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[11px] font-medium text-stone-400 uppercase tracking-widest italic">
                    Dimensions: {item.size}
                  </p>
                </div>
                <div className="flex justify-between items-end pt-2">
                  <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-bold">
                    {item.category}
                  </p>
                  <p className="text-2xl md:text-3xl font-black text-stone-900 tracking-tighter">
                    ₹{item.price.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ATTRACTION BUTTON: Centered, Bold, and Dark */}
        <div className="mt-20 flex justify-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/gallery')}
            className="group relative flex items-center gap-6 px-16 py-6 bg-stone-900 text-white rounded-full text-[11px] font-black uppercase tracking-[0.5em] transition-all duration-300 shadow-2xl shadow-stone-300 hover:shadow-stone-400 hover:bg-[#b91c1c]"
          >
            <span>Explore All Products</span>
            <div className="flex items-center justify-center bg-white/10 rounded-full p-2 group-hover:translate-x-2 transition-transform">
               <ArrowRight size={18} />
            </div>
          </motion.button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 md:mt-40 p-10 md:p-24 bg-white rounded-[3rem] md:rounded-[4rem] border border-stone-100 text-center shadow-sm"
        >
          {/* ... Process CTA content ... */}
          <div className="relative z-10">
            <h3 className="text-3xl md:text-6xl font-serif text-stone-900 mb-10 max-w-3xl mx-auto leading-tight tracking-tight">
              Every piece is made by hand <br className="hidden md:block" /> to bring <span className="italic text-[#b91c1c]">soul</span> into your home.
            </h3>
            <button 
              onClick={() => navigate('/about')}
              className="w-full md:w-auto px-14 py-5 bg-stone-900 text-white rounded-full font-black hover:bg-[#b91c1c] transition-all uppercase text-[10px] tracking-[0.4em] shadow-2xl"
            >
              Our Process
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Home;