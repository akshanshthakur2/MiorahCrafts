import React, { useState, useEffect } from 'react'; // Added useState & useEffect
import { motion } from 'framer-motion';
// Removed: import { products } from '../data/products'; 
import { Instagram, ArrowRight, MapPin, Loader2 } from 'lucide-react'; // Added Loader icon
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
  const navigate = useNavigate();
  
  // 1. New State for dynamic data
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch data from your local server
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Miorah DB Fetch Error:", error);
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="pt-32 pb-20 bg-[#fbfbfb] min-h-screen px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Remains the same */}
        <header className="mb-24 flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-4">
            <MapPin size={14} className="text-[#b91c1c]" />
            <span className="text-[#b91c1c] text-[10px] font-black uppercase tracking-[0.4em]">
              Homemade Archive
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif text-stone-900 tracking-tighter leading-none">
            The <span className="italic text-stone-400 font-light">Collection.</span>
          </h1>
          <p className="text-stone-400 text-[11px] uppercase tracking-[0.3em] mt-6 font-bold">
            Handcrafted in India • 2026
          </p>
          <div className="h-[1px] w-20 bg-stone-200 mt-10" />
        </header>

        {/* 3. Loading State UI */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-stone-300 mb-4" size={40} />
            <p className="text-stone-400 uppercase tracking-widest text-[10px] font-bold">Loading Archive...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {products.map((item, index) => (
              <motion.div
                key={item._id} // Changed from item.id to item._id (MongoDB format)
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.08, 
                  duration: 0.8,
                  ease: "easeOut"
                }}
                onClick={() => navigate(`/product/${item._id}`)} // Updated to _id
                className="flex flex-col group cursor-pointer"
              >
                {/* Product Card Container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-stone-100 mb-8 shadow-sm border border-stone-100 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="eager"
                  />
                  
                  {/* View Detail Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl flex justify-between items-center shadow-xl border border-white/20">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#b91c1c]">View Detail</span>
                      <ArrowRight size={14} className="text-[#b91c1c]" />
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-grow px-2">
                  <h3 className="text-3xl font-serif text-stone-900 leading-tight group-hover:text-[#b91c1c] transition-colors">
                    {item.name}
                  </h3>
                  
                  <p className="text-[12px] font-medium text-stone-400 uppercase tracking-[0.2em] italic mt-3">
                    Dimensions: {item.size}
                  </p>
                  
                  <div className="mt-8 pt-6 border-t border-stone-100 flex justify-between items-center">
                    <p className="text-[10px] text-stone-400 uppercase tracking-[0.3em] font-bold">
                      {item.category}
                    </p>
                    <span className="text-3xl font-black text-stone-900 tracking-tighter">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom Social Section Remains the same */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40 text-center"
        >
          <div className="inline-flex flex-col items-center p-16 bg-white rounded-[4rem] border border-stone-100 shadow-sm w-full max-w-3xl mx-auto">
            <Instagram className="text-[#b91c1c] mb-8" size={32} />
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6 tracking-tight">Follow the process</h2>
            <p className="text-stone-500 text-base mb-10 max-w-sm mx-auto font-light leading-relaxed">
              Every creation has a story. Watch how we bring soul into our handmade crafts.
            </p>
            <a 
              href={import.meta.env.VITE_INSTAGRAM_URL || "#"} 
              target="_blank" 
              rel="noreferrer"
              className="group flex items-center gap-4 px-12 py-5 bg-stone-900 text-white rounded-full font-black hover:bg-[#b91c1c] transition-all uppercase text-[10px] tracking-[0.4em] shadow-2xl"
            >
              <span>@miorahcrafts</span>
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Gallery;