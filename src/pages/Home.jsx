import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/hero';
import ArtisanNote from '../components/ArtisanNote';
import { products } from '../data/products';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="bg-[#fbfbfb] min-h-screen">
      {/* 3D Interactive Hero */}
      <Hero />
      
      {/* Homemade Story Section */}
      <ArtisanNote />

      {/* Featured Collection Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin size={14} className="text-[#b91c1c]" />
              <span className="text-[#b91c1c] text-[10px] font-black uppercase tracking-[0.4em]">
                Lalitpur Archive
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-stone-900 tracking-tighter">
              Featured <span className="italic text-stone-400 font-light">Crafts.</span>
            </h2>
          </div>
          <button 
            onClick={() => navigate('/gallery')}
            className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-900 hover:text-[#b91c1c] transition-colors"
          >
            Explore All Pieces
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </header>

        {/* Home Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.slice(0, 6).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/product/${item.id}`)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-stone-100 mb-6 shadow-sm border border-stone-100 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-stone-200/50">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#b91c1c]">View Detail</span>
                    <ArrowRight size={14} className="text-[#b91c1c]" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-start px-2">
                <div>
                  <h3 className="text-lg font-serif text-stone-900 mb-1">{item.name}</h3>
                  <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-medium">{item.category}</p>
                </div>
                <p className="text-lg font-bold text-stone-900">
                  ₹{item.price.toLocaleString('en-IN')}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Personal Note / Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 md:p-24 bg-white rounded-[4rem] border border-stone-100 text-center shadow-sm"
        >
          <h3 className="text-3xl md:text-5xl font-serif text-stone-900 mb-8 max-w-2xl mx-auto leading-tight">
            Every piece is made by hand <br/> to bring <span className="italic text-[#b91c1c]">soul</span> into your home.
          </h3>
          <button 
            onClick={() => navigate('/about')}
            className="px-12 py-4 bg-stone-900 text-white rounded-full font-bold hover:bg-[#b91c1c] transition-all uppercase text-[10px] tracking-[0.3em] shadow-lg shadow-stone-200"
          >
            Learn About Our Process
          </button>
        </motion.div>
      </section>
    </main>
  );
};

export default Home;