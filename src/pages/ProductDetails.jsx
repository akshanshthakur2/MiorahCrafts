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
    return (
      <div className="pt-40 text-center font-serif text-stone-500">
        Piece not found.
      </div>
    );
  }

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!WHATSAPP_NUMBER) {
      alert("WhatsApp number is missing in .env configuration.");
      return;
    }

    // Dynamic message with Rupee symbol
    const message = `Hi Miorah! I'm interested in ordering the "${product.name}" (₹${product.price.toLocaleString("en-IN")}). Is it available?`;
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
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
          Back to Archive
        </span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Product Image */}
        <div className="rounded-[2rem] overflow-hidden bg-stone-100 shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-[4/5] object-cover"
          />
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
              ₹{product.price.toLocaleString("en-IN")}
            </p>
          </div>

          <p className="text-stone-500 leading-relaxed mb-10 text-lg">
            {product.description ||
              "An artisanal masterpiece designed for the modern home."}
          </p>

          <button
      onClick={handleWhatsApp}
      className="w-full bg-[#25D366] text-white py-5 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-[#1da851] transition-all shadow-xl shadow-green-100 active:scale-[0.96] uppercase tracking-widest text-xs"
    >
      {/* Real WhatsApp SVG Icon */}
      <svg 
        viewBox="0 0 24 24" 
        width="20" 
        height="20" 
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.55 4.197 1.592 6.015L0 24l6.149-1.613a11.773 11.773 0 005.912 1.594h.005c6.634 0 12.048-5.414 12.048-12.05a11.75 11.75 0 00-3.489-8.492z"/>
      </svg>
      <span className="font-black">Order on WhatsApp</span>
    </button>

          <div className="mt-8 flex items-center gap-2 text-stone-400 justify-center">
            <div className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse" />
            <span className="text-[9px] uppercase tracking-widest font-bold">
              Artisan Online • Fast Response
            </span>
          </div>

          {/* Service Perks */}
          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100">
              <Truck size={18} className="text-stone-800" />
              <p className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                Fast Pan-India Shipping
              </p>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100">
              <ShieldCheck size={18} className="text-stone-800" />
              <p className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                100% Genuine Handcrafted
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
