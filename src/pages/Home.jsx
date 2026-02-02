import Hero from '../components/hero';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const Home = () => {
  // Animation variants for the grid items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Items pop in one by one
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <main className="bg-[#fafaf9] min-h-screen">
      <Hero />

      {/* 1. Curated Selection Header */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-800">
              <Sparkles size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Season 2026</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-stone-900 tracking-tighter">
              The <span className="italic text-stone-400">Shop.</span>
            </h2>
          </div>
          
          <p className="max-w-xs text-stone-500 text-sm leading-relaxed border-l border-stone-200 pl-6">
            A celebration of organic textures and human touch. Each piece is unique, numbered, and signed.
          </p>
        </motion.div>
      </section>

      {/* 2. Interactive Product Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-12 lg:gap-x-8"
        >
          {products.map((p) => (
            <motion.div key={p.id} variants={itemVariants}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. Aesthetic "Boutique" Banner */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto bg-stone-900 rounded-[2rem] p-12 md:p-24 overflow-hidden relative">
          <div className="relative z-10 flex flex-col items-center text-center">
            <h3 className="text-white text-4xl md:text-6xl font-serif mb-8">
              Want a custom <br className="hidden md:block"/> masterpiece?
            </h3>
            <button className="group flex items-center gap-3 bg-white text-stone-900 px-8 py-4 rounded-full font-bold hover:bg-[#b91c1c] hover:text-white transition-all duration-300">
              Inquire on WhatsApp <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          {/* Subtle background decoration for the banner */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-900/20 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#b91c1c]/10 blur-[100px] rounded-full" />
        </div>
      </section>

    </main>
  );
};

export default Home;