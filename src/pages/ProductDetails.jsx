import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Truck, ShieldCheck } from "lucide-react";
import { products } from "../data/products";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="pt-40 text-center font-serif text-stone-500">Piece not found.</div>;
  }

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!WHATSAPP_NUMBER) {
      alert("WhatsApp number is missing in .env configuration.");
      return;
    }

    // Dynamic message with Rupee symbol
    const message = `Hi Miorah! I'm interested in ordering the "${product.name}" (₹${product.price.toLocaleString('en-IN')}). Is it available?`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-10 pt-32 pb-20 px-6 max-w-6xl mx-auto"
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-stone-400 hover:text-[#b91c1c] mb-12 group transition-colors"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Back to Archive</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Product Image */}
        <div className="rounded-[2rem] overflow-hidden bg-stone-100 shadow-sm">
          <img src={product.image} alt={product.name} className="w-full aspect-[4/5] object-cover" />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="border-b border-stone-100 pb-8 mb-8">
            <span className="text-[#b91c1c] text-[10px] font-black uppercase tracking-[0.3em] block mb-4">
              {product.category}
            </span>
            <h1 className="text-5xl font-serif text-stone-900 leading-tight mb-4 tracking-tighter">
              {product.name}
            </h1>
            
            {/* PRICE UPDATED TO RUPEES AND BOLD */}
            <p className="text-3xl text-stone-900 font-bold font-sans">
              ₹{product.price.toLocaleString('en-IN')}
            </p>
          </div>

          <p className="text-stone-500 leading-relaxed mb-10 text-lg">
            {product.description || "An artisanal masterpiece designed for the modern home."}
          </p>

          <button
            onClick={handleWhatsApp}
            className="w-full bg-[#25D366] text-white py-5 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-[#1da851] transition-all shadow-xl shadow-green-100 active:scale-[0.96] uppercase tracking-widest text-xs"
          >
            <MessageCircle size={20} fill="currentColor" className="text-white" />
            <span>Order on WhatsApp</span>
          </button>
          
          <div className="mt-8 flex items-center gap-2 text-stone-400 justify-center">
            <div className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse" />
            <span className="text-[9px] uppercase tracking-widest font-bold">Artisan Online • Fast Response</span>
          </div>

          {/* Service Perks */}
          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100">
              <Truck size={18} className="text-stone-800" />
              <p className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">Fast Pan-India Shipping</p>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100">
              <ShieldCheck size={18} className="text-stone-800" />
              <p className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">100% Genuine Handcrafted</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;