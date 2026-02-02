import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Truck, RefreshCw } from "lucide-react";
import { products } from "../data/products";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const WHATSAPP_NUMBER = process.env.VITE_WHATSAPP_NUMBER;

  // Find the product by ID from your data
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="pt-40 text-center font-serif">Product not found.</div>
    );
  }

  const handleWhatsApp = () => {
    const message = `Hi Miorah! I'm interested in the "${product.name}" ($${product.price}). Is this still available?`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-20 px-6 max-w-5xl mx-auto"
    >
      {/* Dynamic Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors mb-12 group"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="text-sm font-medium uppercase tracking-widest">
          Back to Collection
        </span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Image Gallery Column */}
        <div className="w-full lg:max-h-[70vh] rounded-3xl overflow-hidden bg-stone-100 shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full aspect-[3/4] object-cover object-center"
          />
        </div>

        {/* Content Column */}
        <div className="flex flex-col h-full">
          <div className="border-b border-stone-200 pb-8 mb-8">
            <span className="text-emerald-700 text-xs font-bold uppercase tracking-[0.2em]">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mt-4 mb-2">
              {product.name}
            </h1>
            <p className="text-2xl text-stone-800 font-light italic">
              ${product.price}
            </p>
          </div>

          <p className="text-stone-500 leading-relaxed mb-10 text-lg">
            {product.description ||
              "A masterfully crafted piece designed for the modern home, emphasizing organic textures and sustainable materials."}
          </p>

          <button
            onClick={handleWhatsApp}
            className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-emerald-800 transition-all shadow-xl shadow-stone-200 active:scale-[0.98]"
          >
            <MessageCircle size={22} />
            Inquire via WhatsApp
          </button>

          {/* Service Info */}
          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-stone-100">
              <Truck size={20} className="text-emerald-600" />
              <div>
                <p className="text-sm font-bold text-stone-800">
                  Global Shipping
                </p>
                <p className="text-xs text-stone-500">
                  Carefully packed for a safe journey.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-stone-100">
              <RefreshCw size={20} className="text-emerald-600" />
              <div>
                <p className="text-sm font-bold text-stone-800">Unique Item</p>
                <p className="text-xs text-stone-500">
                  Every craft has its own natural variation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
